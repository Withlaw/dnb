import { createClient } from '@supabase/supabase-js';

import { API_SUPABASE } from '@/constants/index.ts';
import { Database } from '@/adapters/api/database.types.ts';

const supabaseUrl = API_SUPABASE.BASE_URL;
const supabaseKey = API_SUPABASE.KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
