import { supabase } from '@/adapters/api/supabase.ts';

// interface BookServiceInterface {
// 	getBooks<T = any>(): Promise<T>;
// }

// use my http client
/*
export class BooksServiceByHttpClient {
	constructor(private readonly httpClient: HttpClient) {}

	async getBooks(): Promise<any> {
		try {
			const data = await this.httpClient.get(
				`/rest/v1/books?apikey=${this.httpClient.apiKey}`,
			);
			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}
*/

// use supabase client
class BooksService {

	async getBooks(): Promise<any> {
		try {
			const { data, error } = await supabase.from('books').select('*');

			if (error) {
				console.error('Books could not be loaded');
				throw new Error(error.message);
			}

			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}

export const booksService = new BooksService();
