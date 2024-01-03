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
  readonly endpoint = 'books';

  async getBooks () {
		// try {
			const { data, error } = await supabase.from(this.endpoint).select('*');

			if (error) {
				console.error(error);
				throw new Error('Books could not be loaded');
			}

			return data;
    // 에러를 처리한다는게, catch 해서 적절하게 뷰로 피드백 제공하는거니까 
    // 뷰 레이어에서 try catch로 처리하는게 나을려나?

		// } catch (error) {
		// 	console.error(error);
		// 	return [];
		// }
	}

  async deleteBook(id:string) {
      const { error } = await supabase.from(this.endpoint+'1').delete().eq('id', id);

      if (error) {
				console.error(error);
				throw new Error('Book could not be deleted');
			}
  }
}

export const booksService = new BooksService();
