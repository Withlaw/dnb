import { BookTitleSearchResult } from "@/features/books/types.ts";

type FormFieldValues = {
  [k:string]: any;
}

// BooksPreview
export class BooksPreviewModel {
	readonly author: string;
	readonly createdAt: string;
	readonly description: string;
	readonly fee: number;
	readonly id: number;
	readonly bookImageUrl: string;
	readonly publisher: string;
	readonly title: string;
  readonly merchantName = 'merchantname'
  readonly status = '대여 가능'
  readonly location:string;

	constructor(data: FormFieldValues) {
		this.author = data.author;
		this.createdAt = data.created_at;
		this.description = data.description;
		this.fee = data.fee;
		this.id = data.id;
		this.title = data.title;
		this.publisher = data.publisher;
		this.bookImageUrl = data.book_image_url;
    this.location = data.location;
	}
}

// BookData
export class BookDataFromTitleSearch {
  readonly title:string;
  readonly author: string;
  readonly publisher:string;
  readonly bookImageUrl : string;
  readonly isbn: string;

  constructor(data: BookTitleSearchResult){
    this.title = data.title;
    this.author = data.author;
    this.publisher = data.publisher;
    this.bookImageUrl = data.image;
    this.isbn = data.isbn;
  }

  get abbreviatedAuthor () {
    const splited = this.author.split('^')
  
    if( splited.length <= 1) return this.author;
  
    return `${splited[0]} 등 ${splited.length}인`;
  }
}

export class BookDataFromServer {
	id: number;
	title: string;
	author: string;
	publisher: string;
	description: string;
	fee: number;
	bookImageUrl: string;
  userImageUrl:string;
	createdAt: number;
	merchantId: number;
  location:string | undefined;


  constructor(data:FormFieldValues) {
    this.id = data.id;
		this.title = data.title;
    this.author = data.author;
		this.publisher = data.publisher;
		this.description = data.description;
		this.fee = data.fee;
		this.bookImageUrl = data.book_image_url;
    this.userImageUrl =data.user_image_url;
    this.createdAt = data.created_at
    this.merchantId = +data.merchant_id
    this.location = data.location ?? undefined;
  }
};

// BookFormData
export class BookDataToServer {
  readonly	author: string;
  readonly	description: string;
  readonly	fee: number;
  readonly	merchant_id: number;
  readonly	publisher: string;
  readonly	title: string;
  readonly  location:string;

  book_image_url: string;
  user_image_url: string | null;


  constructor(data:FormFieldValues) {
    this.author = data.author;
		this.description = data.description;
		this.fee = +data.fee;
		this.title = data.title;
		this.publisher = data.publisher;
    this.location = data.location!;
    this.merchant_id = +data.merchantId
		this.book_image_url = data.bookImageUrl;
		this.user_image_url = data?.userImageUrl ?? null;
  }
}

// BookFiles
export class BookFileToServer  {
  readonly files:FileList;

  constructor(files:FileList){
    this.files = files;
  }

  getFileNames () {
    const names = [];
    for (const item of this.files) {
      names.push(`${Date.now().toString()}-${item.name}`.split('/').join(''));
    }
    return names;
  }

  getFileSizes () {
    const sizes = [];
    for (const item of this.files) {
      sizes.push(item.size);
    }
    return sizes;
  }
}