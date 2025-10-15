import { createClient } from '@supabase/supabase-js';

import { Database } from './types';

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
