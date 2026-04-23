/*
 * Supabase Configuration for Lumina Dentistry
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Replace the URL and KEY below with your project credentials
 * 3. Run this SQL in the Supabase SQL Editor:
 *
 *   CREATE TABLE IF NOT EXISTS appointments (
 *     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *     patient_name TEXT NOT NULL,
 *     patient_email TEXT NOT NULL,
 *     patient_phone TEXT NOT NULL,
 *     service TEXT NOT NULL,
 *     appointment_date DATE NOT NULL,
 *     appointment_time TIME NOT NULL,
 *     message TEXT,
 *     status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
 *     created_at TIMESTAMPTZ DEFAULT now()
 *   );
 *   ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "Anyone can insert" ON appointments FOR INSERT WITH CHECK (true);
 *   CREATE POLICY "Auth can read" ON appointments FOR SELECT USING (auth.role() = 'authenticated');
 *   CREATE POLICY "Auth can update" ON appointments FOR UPDATE USING (auth.role() = 'authenticated');
 */

const SUPABASE_URL = 'https://tdytjeyuelokidnavwqg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXRqZXl1ZWxva2lkbmF2d3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MDUwNjYsImV4cCI6MjA5MjA4MTA2Nn0.D5pdAqRWj2pv4KTRNWdBt6OvFlhjTwyWnVEi3dykobw';

let supabaseClient = null;

function getSupabase() {
    if (!supabaseClient && typeof window.supabase !== 'undefined') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
}
