import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ngdmigkflbtlofbpiyeb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZG1pZ2tmbGJ0bG9mYnBpeWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjQ0MzMsImV4cCI6MjAxNDUwMDQzM30.sn1paGRbe3Kiqx-FSOnUALdDEuazX_v22TqGtHQsKO0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase