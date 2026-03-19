import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const isConfigured =
  supabaseUrl.startsWith("https://") && supabaseAnonKey.length > 0;

let supabase: SupabaseClient | null = null;

if (isConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
