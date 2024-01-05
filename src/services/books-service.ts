import { NaverAPiClient } from '@/adapters/api/fetch.ts';
import { supabase } from '@/adapters/api/supabase.ts';
import { API_NAVER } from '@/constants/index.ts';

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

const naverBookSearchClient = new NaverAPiClient('/search/book.json', {id:API_NAVER.BOOK_SEARCH_ID, pw:API_NAVER.BOOK_SEARCH_PW})

class BooksService {
  readonly endpoint = 'books';

  async searchBook<T>(query:string, start:number=1, display:number=10) {
    const response = await naverBookSearchClient.get(`?query=${query}&display=${display}&start=${start}`);

    if (!response.ok) throw ({ status: response.status, statusText: response.statusText, message: "naverBookSearchClient could not search data."});
    
    const data = await response.json() as T;

    return data;

    // 어떻게 추상화해야할까..
  }

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

  async createBook(newBook?:any) {
    const { data, error } = await supabase.from('books').insert([{
      author: 'createTest',
      description: 'createTest',
      fee: 1000,
      image_url: '',
      merchant_id: 1,
      publisher: 'createTest',
      title: 'createTest',
      id:11,
      created_at:'10',
    },]).select();
    // insert에 배열을 전달하는 것에 주의할 것. 한 번에 여러 books를 보낼 수 있음.

  if (error) {
    console.error(error);
    throw new Error('Book could not be created');
  }
  return data;

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
