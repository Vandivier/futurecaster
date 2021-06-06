import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceSecret = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_SECRET || '';

export const supabase = createClient(supabaseUrl, supabaseServiceSecret);
