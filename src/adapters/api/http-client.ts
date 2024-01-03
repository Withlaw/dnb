import { SupabaseClient } from '@supabase/supabase-js';

export interface HttpClient {
	readonly baseURL: string;
	readonly apiKey?: string;

	get<T = any>(endpoint: string): Promise<T>;
	// post<T = any>(endpoint: string, payload?: BodyInit | null): Promise<T>;
	// delete(endpoint: string): Promise<Response>;
	// post<T, U>(endpoint: string, payload?: U): Promise<T | any>;
}

// use fetch api

// use axios

// use supabase
