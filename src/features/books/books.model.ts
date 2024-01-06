type FormFieldValues = {
  [k:string]: any;
}

export class BooksPreviewModel {
	readonly author: string;
	readonly createdAt: string;
	readonly description: string;
	readonly fee: number;
	readonly id: number;
	readonly imageUrl: string;
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
		this.imageUrl = data.image_url;
    this.location = data.location;
	}
}

export class BookDataFromServer  {
	id: number;
	title: string;
	author: string;
	publisher: string;
	description: string;
	fee: number;
	imageUrl: string;
  location:string | null;
	createdAt: number;
	merchantId: number;

  constructor(data:FormFieldValues) {
    this.author = data.author;
		this.description = data.description;
		this.fee = +data.fee;
		this.title = data.title;
		this.publisher = data.publisher;
		this.imageUrl = data.image_url;
    this.location = data.location!;
    this.merchantId = +data.merchant_id
    this.createdAt=data.created_at
    this.id = data.id;
  }
};


export class BookDataToServer {
  readonly	author: string;
  readonly	description: string;
  readonly	fee: number;
  readonly	image_url: string;
  readonly	merchant_id: number;
  readonly	publisher: string;
  readonly	title: string;
  readonly  location:string;

  constructor(data:FormFieldValues) {
    this.author = data.author;
		this.description = data.description;
		this.fee = +data.fee;
		this.title = data.title;
		this.publisher = data.publisher;
		this.image_url = data.imageUrl;
    this.location = data.location!;
    this.merchant_id = +data.merchantId
  }
}
