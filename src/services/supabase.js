import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jsigjgoaphbiwielsuaq.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzaWdqZ29hcGhiaXdpZWxzdWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5MDc4NTIsImV4cCI6MjAxMTQ4Mzg1Mn0.FbNHrilO9n5ew10X2i_WwhtkIuRsk1l71iJ5HTlaUpQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
