import { createClient } from '@supabase/supabase-js';

import { HttpClient } from '@/adapters/api/http-client.ts';
import { API_SUPABASE } from '@/constants/index.ts';

const supabaseUrl = API_SUPABASE.BASE_URL;
const supabaseKey = API_SUPABASE.KEY;

// use supabase client library
export const supabase = createClient(supabaseUrl, supabaseKey);
