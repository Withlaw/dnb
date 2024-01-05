export type BookSearch = {
  title:string;
  author: string;
  publisher:string;
}

export type BookSearchDataItem = {
	description: string;
  author:string;
	discount: string;
	image: string;
	isbn: string;
	link: string;
	pubdate: string;
	publisher: string;
	title: string;
};

export type BookSearchData = {
  display: number;
  lastBuildDate: string;
  start: number;
  total: number;
  items:BookSearchDataItem[];
}