export type BookTitleSearchResult = {
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

export type BookTitleSearchData = {
  display: number;
  lastBuildDate: string;
  start: number;
  total: number;
  items:BookTitleSearchResult[];
}