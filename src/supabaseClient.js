import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nppoqetkoejcnunlaize.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcG9xZXRrb2VqY251bmxhaXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTUzNjMsImV4cCI6MjA2NDc3MTM2M30.7jLXxKi8FtknytsHBsx3KQJyXwS68fMOgL0U62EPFAo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
