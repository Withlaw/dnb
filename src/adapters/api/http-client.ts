export interface HttpClient {
	get<T = any>(endpoint: string): Promise<T>;
	// post<T = any>(endpoint: string, payload?: BodyInit | null): Promise<T>;
	// delete(endpoint: string): Promise<Response>;
	// post<T, U>(endpoint: string, payload?: U): Promise<T | any>;
}

// use fetch api

// use axios

// use supabase

/*
export class SupabaseClient implements HttpClient {
	private readonly fetcher: SupabaseClient;

	constructor(fetcher: SupabaseClient) {
		this.fetcher = fetcher;
	}

	async get<T = any>(endpoint: string): Promise<T | Response> {
		try {
			const res = await this.fetcher.get<T>(this.baseURL + endpoint);
			// if (res.status !== 200) throw new Error("http response failed");

			const { data } = res;
			return data;
		} catch (error) {
			throw error;
		}
	}
}
*/
