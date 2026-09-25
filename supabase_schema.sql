-- Supabase PostgreSQL Schema for Carcino Foundation Platform

-- 1. Users Profile Table (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.users_profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Read Articles Tracking Table
CREATE TABLE IF NOT EXISTS public.user_read_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users_profile(id) ON DELETE CASCADE,
    article_id TEXT NOT NULL,
    article_title TEXT,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, article_id)
);

-- 3. Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    email_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_read_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users Profile Policies
CREATE POLICY "Allow users to read their own profile" 
    ON public.users_profile FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profile" 
    ON public.users_profile FOR UPDATE USING (auth.uid() = id);

-- Read Articles Policies
CREATE POLICY "Allow users to view their read articles" 
    ON public.user_read_articles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their read articles" 
    ON public.user_read_articles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their read articles" 
    ON public.user_read_articles FOR DELETE USING (auth.uid() = user_id);

-- Contact Submissions Policies (Public Insert & Read allowed for reporting)
CREATE POLICY "Allow anyone to submit contact form" 
    ON public.contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to contact_submissions" 
    ON public.contact_submissions FOR SELECT USING (true);

-- Function to handle new user signup automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users_profile (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
