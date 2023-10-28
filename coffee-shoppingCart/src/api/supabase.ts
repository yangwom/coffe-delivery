import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
    "https://oqfwkzpsykdacebwlgyc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZndrenBzeWtkYWNlYndsZ3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQyMjUwMTEsImV4cCI6MTk2OTgwMTAxMX0.2FC-1LYiQsDrCSE_W5DLaEBCGlw2qLs2XRRQiQ_gvpE"
)

export default supabase