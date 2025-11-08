
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uaittuakaznrbzbhldvk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhaXR0dWFrYXpucmJ6YmhsZHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTUwMDUsImV4cCI6MjA3Nzk5MTAwNX0.t-t_dJNXIxhy061pxEJEtNhR0ge_zMIpIjKKYn2X9uI'
export const supabase = createClient(supabaseUrl, supabaseKey)