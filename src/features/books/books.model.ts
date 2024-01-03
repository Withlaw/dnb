
/*
export type Data= {
  author: string ;
  created_at: string;
  description: string ;
  fee: number ;
  id: number;
  image_url: string ;
  publisher: string ;
  title: string ;
}

export type BooksData = {
  author: string | null;
  created_at: string;
  description: string | null;
  fee: number | null;
  id: number;
  image_url: string | null;
  merchant_id: number | null;
  publisher: string | null;
  title: string | null;
}
*/

export type BookFromServer = {
	author: string | null;
	created_at: string;
	description: string | null;
	fee: number | null;
	id: number;
	image_url: string | null;
	merchant_id: number | null;
	publisher: string | null;
	title: string | null;
};

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

	constructor(data: BookFromServer) {
		this.author = data.author!;
		this.createdAt = data.created_at!;
		this.description = data.description!;
		this.fee = data.fee!;
		this.id = data.id!;
		this.title = data.title!;
		this.publisher = data.publisher!;
		this.imageUrl = data.image_url!;
	}
}