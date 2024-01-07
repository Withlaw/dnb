import { NaverAPiClient } from '@/adapters/api/fetch.ts';
import { supabase } from '@/adapters/api/supabase.ts';
import { API_NAVER, API_SUPABASE  } from '@/constants/index.ts';
import { BookDataFromServer, BookDataToServer, BookFileToServer } from '@/features/books/books.model.ts';

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

  constructor(  private readonly baseURL : string, private readonly apiKey : string){}

  
  async searchBook<T>(query:string, start:number=1, display:number=10) {
    const response = await naverBookSearchClient.get(`?query=${query}&display=${display}&start=${start}`);

    if (!response.ok) throw ({ status: response.status, statusText: response.statusText, message: "naverBookSearchClient could not search data."});
    
    const data = await response.json() as T;

    return data;

    // 어떻게 추상화해야할까..
  }

  // data api 
  async getBook(bookId:number) {
    const { data, error } = await supabase
    .from('books')
    .select('*').eq('id', bookId);

    if (error) {
      console.error(error);
      throw new Error('The book could not be loaded');
    }

    const book = new BookDataFromServer(data[0]);
    return book
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

  async createBook(newBook:BookDataToServer, imageFiles?:BookFileToServer) {
    const [imageFileName, imageFileUrl] = this.getImageNameAndPath(imageFiles);
    
    if (imageFileName) newBook.image_url += '&' + imageFileUrl; // 이미지 파일이 존재하면 기본 이미지와 파일 이미지 url 합침.

    const insertNewBook = supabase.from(this.endpoint).insert([newBook]).select();  // insert에 배열을 전달하는 것에 주의할 것. 한 번에 여러 books를 보낼 수 있음.
    const uploadImageFile = this.uploadImage(imageFiles);

    const [insertNewBookResponse, uploadImageFileResponse] = await Promise.all([insertNewBook, uploadImageFile])

    if (insertNewBookResponse.error || uploadImageFileResponse?.error) {
      // createBook error handling

      if(insertNewBookResponse.data) this.deleteBook(insertNewBookResponse.data[0].id) // table에 추가 된 책 정보 삭제 
      if(uploadImageFileResponse && uploadImageFileResponse.data) this.deleteImage(uploadImageFileResponse.data.path) // 버킷에 업로드된 이미지 파일 삭제

      console.error('creat book error: ', insertNewBookResponse.error, 'upload image error: ', uploadImageFileResponse?.error);
      
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

  async deleteBook(id:number) {
      const { error } = await supabase.from(this.endpoint).delete().eq('id', id);

      if (error) {
				console.error(error);
				throw new Error('Book could not be deleted');
			}
  }

  // file api
  async uploadImage(imageFiles?:BookFileToServer) {
    if(!imageFiles) return null;

    // * 현재는 이미지 1개만 업로드 가능함.
    const [imageFileName] = this.getImageNameAndPath(imageFiles);

    // const { data, error } = await supabase
    return await supabase
    .storage
    .from('book-images')
    .upload(imageFileName!, imageFiles.files[0]) // 업로드할 이미지 없을 수도 있으니 나중에 분기처리하기.


    // if (error) {
    //   console.error(error);
    //   throw new Error('Book image could not be uploaded');
    // }

    // return data;
  }

  async deleteImage(imageName:string){
    const { data, error } = await supabase.storage.from('book-images').remove([imageName]);

    if (error) {
      console.error(error);
      throw new Error('Book image could not be deleted');
    }

    return data;
  }

  private getImageNameAndPath(imageFiles?:BookFileToServer){
    const imageFileName = imageFiles?.getFileNames()[0];  
    const imageFileUrl = `${this.baseURL}/storage/v1/object/public/book-images/${imageFileName}`

    return [imageFileName, imageFileUrl];
  }
}

export const booksService = new BooksService(API_SUPABASE.BASE_URL, API_SUPABASE.KEY);
