import { NaverAPiClient } from '@/adapters/api/fetch.ts';
import { supabase } from '@/adapters/api/supabase-client.ts';
import { API_SUPABASE, API_SUPABASE_FUNCTIONS } from '@/constants/index.ts';
import {
	BookDataFromServer,
	BookDataFromTitleSearch,
	BookDataToServer,
	BookFileToServer,
	BooksPreviewModel,
} from '@/features/books/books.model.ts';
import { BookTitleSearchData } from '@/features/books/types.ts';

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

export interface BookServiceInterface {
	searchBook: (
		query: string,
		start: number,
		display: number,
	) => Promise<{
		items: BookDataFromTitleSearch[];
		display: number;
		lastBuildDate: string;
		start: number;
		total: number;
	}>;

	getBooks: (
		start: number,
		display: number,
	) => Promise<{
		books: BooksPreviewModel[];
		start: number;
		total: number;
	}>;

	getBook: (id: number) => Promise<BookDataFromServer>;

	createBook: (newBook: BookDataToServer, imageFiles?: BookFileToServer) => any;

	editBook: ({
		id,
		editedBook,
		backup,
		imageFiles,
	}: {
		id: number;
		editedBook: BookDataToServer;
		backup: BookDataToServer;
		imageFiles?: BookFileToServer;
	}) => Promise<void>;

	deleteBook: (id?: number) => Promise<null | undefined>;

	uploadImage: (imageFiles?: BookFileToServer) => any;

	deleteImage: (imageName?: string) => any;
}

const naverBookSearchClient = new NaverAPiClient(
	API_SUPABASE_FUNCTIONS.NAVER_BOOK_SEARCH_URL,
	'/functions/v1/naver-book-search',
);
// const naverBookSearchClient = new NaverAPiClient({baseUrl:API_NAVER.BASE_URL, resource:'/search/book.json', options: {id:API_NAVER.BOOK_SEARCH_ID, pw:API_NAVER.BOOK_SEARCH_PW}})

class BookService {
	readonly endpoint = 'books';
	readonly remoteStorage = 'book-images';

	constructor(private readonly baseURL: string) {}
	// constructor(  private readonly baseURL : string, private readonly apiKey : string){}

	// search api
	async searchBook(query: string, start: number = 1, display: number = 10) {
		const response = await naverBookSearchClient.get(
			`?query=${query}&display=${display}&start=${start}`,
		);

		if (!response.ok)
			throw {
				status: response.status,
				statusText: response.statusText,
				message: 'naverBookSearchClient could not search data.',
			};

		const data = (await response.json()) as BookTitleSearchData;

		const books = data?.items?.map(book => new BookDataFromTitleSearch(book));

		return { ...data, items: books };
	}

	// data fetch api
	async getBooks(start: number = 0, display: number = 10) {
		// try {
		const { data, error, count } = await supabase
			.from(this.endpoint)
			.select(`*, member(full_name,avatar_url)`, { count: 'exact' })
			.order('created_at', { ascending: false })
			.range(start, start + display - 1);

		if (error) {
			console.error(error);
			throw new Error('Books could not be loaded');
		}

		const books = data?.map(data => new BooksPreviewModel(data));

		return { books, start, total: count ?? 0 };
		// 에러를 처리한다는게, catch 해서 적절하게 뷰로 피드백 제공하는거니까
		// 뷰 레이어에서 try catch로 처리하는게 나을려나? -> 리액트 쿼리로 한 번에 view logic을 처리하는게 나을 듯!?

		// } catch (error) {
		// 	console.error(error);
		// 	return [];
		// }
	}

	async getBook(bookId: number) {
		const { data, error } = await supabase
			.from(this.endpoint)
			.select(`*, member(full_name,avatar_url,grade,id)`)
			.eq('id', bookId)
			.single();

		if (error) {
			console.error(error);
			throw new Error('The book could not be loaded');
		}

		const book = new BookDataFromServer(data);

		return book;
	}

	async createBook(newBook: BookDataToServer, imageFiles?: BookFileToServer) {
		const { imageFileUrl } = this.getImageNameAndPath(imageFiles);
		// newBook.user_image_url = imageFileUrl ?? '';

		const insertNewBook = supabase
			.from(this.endpoint)
			.insert([
				{
					...newBook,
					user_image_url: imageFileUrl ?? '',
				},
			])
			.select()
			.single(); // insert에 배열을 전달하는 것에 주의할 것. 한 번에 여러 books를 보낼 수 있음.
		const uploadImageFile = this.uploadImage(imageFiles);

		const [insertNewBookResponse, uploadImageFileResponse] = await Promise.all([
			insertNewBook,
			uploadImageFile,
		]);

		if (insertNewBookResponse.error || uploadImageFileResponse?.error) {
			// createBook error handling

			/*
      if(insertNewBookResponse.data) this.deleteBook(insertNewBookResponse.data.id) // table에 추가 된 책 정보 삭제 
      if(uploadImageFileResponse && uploadImageFileResponse.data) this.deleteImage(uploadImageFileResponse.data.path) // 버킷에 업로드된 이미지 파일 삭제

      console.error(insertNewBookResponse.error, uploadImageFileResponse?.error);
      */
			Promise.allSettled([
				this.deleteBook(insertNewBookResponse?.data?.id),
				this.deleteImage(uploadImageFileResponse?.data?.path),
			]);

			throw new Error('Book could not be created');
		}

		return insertNewBookResponse.data;
		/*
    const [imageFileName, imageFileUrl] = this.getImageNameAndPath(imageFiles);
    
    if (imageFileName) newBook.image_url += '&' + imageFileUrl; // 이미지 파일이 존재하면 기본 이미지와 파일 이미지 url 합침.

    const insertNewBook = supabase.from(this.endpoint).insert([newBook]).select();  // insert에 배열을 전달하는 것에 주의할 것. 한 번에 여러 books를 보낼 수 있음.
    const uploadImageFile = this.uploadImage(imageFiles);

    let insertNewBookResponse, uploadImageFileResponse;
    try {
      const [res1, res2] = await Promise.all([insertNewBook, uploadImageFile]);
      insertNewBookResponse = res1;
      uploadImageFileResponse = res2;

      if(insertNewBookResponse.error) {
        // insert new book error handling
        console.error(insertNewBookResponse.error);
        throw new Error('Book could not be deleted'); 
      }

      console.log('creat book: ', insertNewBookResponse, 'upload image: ', uploadImageFileResponse);

      return insertNewBookResponse.data;
      
    } catch (error) {
      if(insertNewBookResponse?.data) this.deleteBook(insertNewBookResponse!.data[0].id) // table에 추가 된 책 정보 삭제 
      if(uploadImageFileResponse) this.deleteImage(uploadImageFileResponse.path) // 버킷에 업로드된 이미지 파일 삭제


      throw error;
    }
*/
	}

	async editBook({
		id,
		editedBook,
		backup,
		imageFiles,
	}: {
		id: number;
		editedBook: BookDataToServer;
		backup: BookDataToServer;
		imageFiles?: BookFileToServer;
	}) {
		const { imageFileUrl } = this.getImageNameAndPath(imageFiles);
		if (imageFileUrl) editedBook.user_image_url = imageFileUrl;

		const updateQuery = (data: BookDataToServer) =>
			supabase.from(this.endpoint).update(data).eq('id', id).select().single();
		const uploadQuery = this.uploadImage(imageFiles);

		const [updateResponse, uploadResponse] = await Promise.all([
			updateQuery(editedBook),
			uploadQuery,
		]);

		if (updateResponse.error || uploadResponse?.error) {
			Promise.allSettled([
				updateQuery(backup),
				this.deleteImage(uploadResponse?.data?.path),
			]);

			throw new Error('Book could not be updated');
		}

		/*
    const { error, data } = await supabase.from(this.endpoint).update(editedBook).eq('id', id);
  
    if (error) {
      console.error(error);
      throw new Error('Book could not be edited');
    }

    const uploadImageFileResponse = await this.uploadImage(imageFiles);

    if (uploadImageFileResponse?.error) {
      console.log('image falies: ', backup, data)
      if(data) supabase.from(this.endpoint).update(backup).eq('id', id); // 이미지 파일 업로드 실패시 백업 데이터로 db 업데이트
      
      console.error(uploadImageFileResponse?.error);
      throw new Error('Book image files could not be edited');
    }

    return 1;
    */
	}

	async deleteBook(id?: number) {
		if (!id) return null;

		const { error } = await supabase.from(this.endpoint).delete().eq('id', id);

		if (error) {
			console.error(error);
			throw new Error('Book could not be deleted');
		}
	}

	// file api
	uploadImage(imageFiles?: BookFileToServer) {
		if (!imageFiles) return null;

		const { imageFileName } = this.getImageNameAndPath(imageFiles);

		/*
    const { data, error } = await supabase
    .storage
    .from('book-images2')
    .upload(imageFileName!, imageFiles.files[0]) 

    if (error) {
      console.error(error);
      throw new Error('Book image could not be uploaded');
    }

    return data;
*/
		// 현재는 이미지 1개만 업로드 가능함.
		// 업로드할 이미지 없을 수도 있으니 나중에 분기처리하기.
		// 파일 업로드는 항상 form data insert query와 함께 실행되므로 여기에서 에러 처리를 해줄 필요가 없음.

		return supabase.storage
			.from(this.remoteStorage)
			.upload(imageFileName!, imageFiles.files[0]);
	}

	deleteImage(imageName?: string) {
		if (!imageName) return null;

		/*
    const { data, error } = await supabase.storage.from('book-images').remove([imageName]);

    if (error) {
      console.error(error);
      throw new Error('Book image could not be deleted');
    }

    return data;
    */
		return supabase.storage.from(this.remoteStorage).remove([imageName]);
	}

	private getImageNameAndPath(imageFiles?: BookFileToServer) {
		const imageFileName = imageFiles?.getFileNames()[0]; // 현재는 이미지 1개만 업로드 가능함.
		const imageFileUrl = imageFileName
			? `${this.baseURL}/storage/v1/object/public/book-images/${imageFileName}`
			: null;

		return { imageFileName, imageFileUrl };
	}
}

export const booksService = new BookService(API_SUPABASE.BASE_URL);
