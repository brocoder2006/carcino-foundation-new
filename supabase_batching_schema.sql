-- Supabase PostgreSQL Batching Schema for Carcino Foundation Registrations
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create registration_batches Table
CREATE TABLE IF NOT EXISTS public.registration_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_number SERIAL UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'GENERATED', 'SENT', 'FAILED')),
    registration_count INT NOT NULL DEFAULT 0 CHECK (registration_count >= 0 AND registration_count <= 10),
    excel_file_path TEXT,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL CHECK (source IN ('CONTACT', 'OPPORTUNITY')),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    opportunity_title TEXT,
    category TEXT,
    message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    batch_id UUID NOT NULL REFERENCES public.registration_batches(id) ON DELETE CASCADE,
    sequence_in_batch INT NOT NULL CHECK (sequence_in_batch >= 1 AND sequence_in_batch <= 10),
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_registrations_batch_id ON public.registrations(batch_id);
CREATE INDEX IF NOT EXISTS idx_registrations_source ON public.registrations(source);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registration_batches_status ON public.registration_batches(status);

-- 4. Row Level Security (RLS)
ALTER TABLE public.registration_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public insert via API / RPC functions
CREATE POLICY "Allow public insert to registrations" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role full access to batches" ON public.registration_batches FOR ALL USING (true);
CREATE POLICY "Allow service role full access to registrations" ON public.registrations FOR ALL USING (true);

-- 5. Stored Procedure for Atomic Batching
CREATE OR REPLACE FUNCTION public.submit_registration(
    p_source TEXT,
    p_full_name TEXT,
    p_email TEXT,
    p_phone TEXT DEFAULT NULL,
    p_opportunity_title TEXT DEFAULT NULL,
    p_category TEXT DEFAULT NULL,
    p_message TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'::jsonb,
    p_idempotency_key TEXT DEFAULT NULL,
    p_batch_size INT DEFAULT 10
)
RETURNS TABLE (
    registration_id UUID,
    batch_id UUID,
    batch_number INT,
    sequence_in_batch INT,
    is_batch_complete BOOLEAN,
    current_count INT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_batch_id UUID;
    v_batch_number INT;
    v_current_count INT;
    v_sequence INT;
    v_reg_id UUID;
    v_is_complete BOOLEAN := FALSE;
BEGIN
    -- Check idempotency if key provided
    IF p_idempotency_key IS NOT NULL THEN
        SELECT r.id, r.batch_id, b.batch_number, r.sequence_in_batch, (b.registration_count >= p_batch_size), b.registration_count
        INTO v_reg_id, v_batch_id, v_batch_number, v_sequence, v_is_complete, v_current_count
        FROM public.registrations r
        JOIN public.registration_batches b ON r.batch_id = b.id
        WHERE r.idempotency_key = p_idempotency_key;

        IF FOUND THEN
            RETURN QUERY SELECT v_reg_id, v_batch_id, v_batch_number, v_sequence, v_is_complete, v_current_count;
            RETURN;
        END IF;
    END IF;

    -- Acquire or create PENDING batch with row lock
    SELECT id, batch_number, registration_count
    INTO v_batch_id, v_batch_number, v_current_count
    FROM public.registration_batches
    WHERE status = 'PENDING' AND registration_count < p_batch_size
    ORDER BY created_at ASC
    LIMIT 1
    FOR UPDATE;

    -- If no pending batch exists, create a new one
    IF NOT FOUND THEN
        INSERT INTO public.registration_batches (status, registration_count)
        VALUES ('PENDING', 0)
        RETURNING id, batch_number, registration_count INTO v_batch_id, v_batch_number, v_current_count;
    END IF;

    -- Sequence number inside batch
    v_sequence := v_current_count + 1;

    -- Insert registration
    INSERT INTO public.registrations (
        source, full_name, email, phone, opportunity_title, category, message, metadata, batch_id, sequence_in_batch, idempotency_key
    )
    VALUES (
        p_source, p_full_name, p_email, p_phone, p_opportunity_title, p_category, p_message, p_metadata, v_batch_id, v_sequence, p_idempotency_key
    )
    RETURNING id INTO v_reg_id;

    -- Update batch count
    UPDATE public.registration_batches
    SET registration_count = v_sequence,
        updated_at = timezone('utc'::text, now())
    WHERE id = v_batch_id;

    -- Check if batch reached size target (10)
    IF v_sequence >= p_batch_size THEN
        v_is_complete := TRUE;
        UPDATE public.registration_batches
        SET status = 'PROCESSING'
        WHERE id = v_batch_id;
    END IF;

    RETURN QUERY SELECT v_reg_id, v_batch_id, v_batch_number, v_sequence, v_is_complete, v_sequence;
END;
$$;
