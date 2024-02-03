import { createClient } from '@supabase/supabase-js';

import { API_SUPABASE } from '@/constants/index.ts';
import type { Database } from '@/types/database.type.ts';

const supabaseUrl = API_SUPABASE.BASE_URL;
const supabaseKey = API_SUPABASE.KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
