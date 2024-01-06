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
	createdAt: number;
	merchantId: number;
  location:string | undefined;

  constructor(data:FormFieldValues) {
    this.id = data.id;
		this.title = data.title;
    this.author = data.author;
		this.publisher = data.publisher;
		this.description = data.description;
		this.fee = +data.fee;
		this.imageUrl = data.image_url;
    this.createdAt=data.created_at
    this.merchantId = +data.merchant_id
    this.location = data.location ?? undefined;
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
