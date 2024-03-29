import { BookTitleSearchResult } from '@/features/books/_lib/types.ts';

type FormFieldValues = {
	[k: string]: any;
};

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
	readonly merchantFullName: string;
	readonly merchantAvatarUrl: string;
	readonly status: '대여 가능' | '대여 불가';
	readonly location: string;
	readonly rentalId: number | null;

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
		this.merchantAvatarUrl = data.member.avatar_url;
		this.merchantFullName = data.member.full_name;
		this.rentalId = data.rental_id;
		this.status = data?.rental_id ? '대여 불가' : '대여 가능';
	}
}

// BookData
export class BookDataFromTitleSearch {
	readonly title: string;
	readonly author: string;
	readonly publisher: string;
	readonly bookImageUrl: string;
	readonly isbn: string;

	constructor(data: BookTitleSearchResult) {
		this.title = data.title;
		this.author = data.author;
		this.publisher = data.publisher;
		this.bookImageUrl = data.image;
		this.isbn = data.isbn;
	}

	get abbreviatedAuthor() {
		const splited = this.author.split('^');

		if (splited.length <= 1) return this.author;

		return `${splited[0]} 등 ${splited.length}인`;
	}
}

export class BookDataFromServer {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly publisher: string;
	readonly description: string;
	readonly fee: number;
	readonly bookImageUrl: string;
	readonly userImageUrl: string;
	readonly createdAt: number;
	readonly location: string;
	readonly merchantId?: number;
	readonly merchantAvatarUrl?: string;
	readonly merchantFullName?: string;
	readonly merchantGrade?: number;
	readonly rentalId: number | null;
	readonly status: '대여 가능' | '대여 불가';
	readonly rentalStatus?: '대여중' | '반납 완료';
	readonly customerId?: number;

	constructor(data: FormFieldValues) {
		this.id = data.id;
		this.title = data.title;
		this.author = data.author;
		this.publisher = data.publisher;
		this.description = data.description;
		this.fee = data.fee;
		this.bookImageUrl = data.book_image_url;
		this.userImageUrl = data.user_image_url;
		this.createdAt = data.created_at;
		this.location = data.location;
		this.merchantId = +data.merchant_info?.id;
		this.merchantAvatarUrl = data.merchant_info?.avatar_url;
		this.merchantFullName = data.merchant_info?.full_name;
		this.merchantGrade = data.merchant_info?.grade;
		this.rentalId = data.rental_id;
		this.status = data?.rental_id ? '대여 불가' : '대여 가능';
		this.rentalStatus = data.rental_info?.status;
		this.customerId = data.rental_info?.customer_id;
	}

	getImages() {
		return [this.bookImageUrl, ...this.userImageUrl.split('&')];
	}
}

// BookFormData
export class BookDataToServer {
	readonly author: string;
	readonly description: string;
	readonly fee: number;
	readonly member: number;
	readonly publisher: string;
	readonly title: string;
	readonly location: string;

	book_image_url: string;
	user_image_url: string;

	constructor(data: FormFieldValues) {
		this.author = data.author;
		this.description = data.description;
		this.fee = +data.fee;
		this.title = data.title;
		this.publisher = data.publisher;
		this.location = data.location;
		this.member = +data.merchantId;
		this.book_image_url = data.bookImageUrl;
		this.user_image_url = data.userImageUrl;
	}
}

// BookFiles
export class BookFileToServer {
	readonly files: FileList;

	constructor(files: FileList) {
		this.files = files;
	}

	getFileNames() {
		const names = [];
		for (const item of this.files) {
			names.push(`${Date.now().toString()}-${item.name}`.split('/').join(''));
		}
		return names;
	}

	getFileSizes() {
		const sizes = [];
		for (const item of this.files) {
			sizes.push(item.size);
		}
		return sizes;
	}
}
