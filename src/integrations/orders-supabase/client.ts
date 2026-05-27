import { createClient } from '@supabase/supabase-js';

const ORDERS_SUPABASE_URL =
  import.meta.env.VITE_ORDERS_SUPABASE_URL ||
  'https://udeibydlmuuoecxfyxjt.supabase.co';

const ORDERS_SUPABASE_ANON_KEY =
  import.meta.env.VITE_ORDERS_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZWlieWRsbXV1b2VjeGZ5eGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyOTY3NzQsImV4cCI6MjA5MTg3Mjc3NH0.8-bjuB701x6cyI0sJpIBJPya4Ekugfu4R_fNj1X1YHM';

/**
 * Secondary Supabase client used exclusively for the new "pedidos" project
 * (udeibydlmuuoecxfyxjt). Auth/session is intentionally NOT persisted here —
 * the main Supabase client (src/integrations/supabase/client.ts) handles login.
 */
export const ordersSupabase = createClient(
  ORDERS_SUPABASE_URL,
  ORDERS_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);