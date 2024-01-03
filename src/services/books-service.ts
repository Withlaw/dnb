import { HttpClient } from '@/adapters/api/http-client.ts';
import { supabase } from '@/adapters/api/supabase.ts';

export class BooksService {
	// constructor(private readonly httpClient: HttpClient) {}

	async getBooks(): Promise<any> {
		try {
			const { data, error } = await supabase.from('books').select('*');
			if (error) {
				console.error('Books could not be loaded', error);
				throw new Error(error.message);
			}

			return data;
		} catch (error) {
			console.error('books service error: ', error);
			return [];
		}
	}
}

export const booksService = new BooksService();
