# Supabase Database Schemas & Migrations

This folder contains the database schema definitions and table migrations for The Carcino Foundation website.

## Files

- `schemas/supabase_schema.sql`: Core schema definitions (contacts, partnerships, volunteers, user activity logs, and RLS policies).
- `schemas/supabase_batching_schema.sql`: Batching queue schema for registrations and background processing.

## Setup Instructions

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Run `schemas/supabase_schema.sql` to initialize tables and row-level security policies.
4. Run `schemas/supabase_batching_schema.sql` if batching is enabled for forms.
