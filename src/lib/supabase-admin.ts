import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const isConfigured =
  supabaseUrl.startsWith("https://") && serviceRoleKey.length > 0;

let supabaseAdmin: SupabaseClient | null = null;

if (isConfigured) {
  supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
}

export { supabaseAdmin };
