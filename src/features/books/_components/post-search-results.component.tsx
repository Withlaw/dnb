import { BookDataFromTitleSearch } from '@/features/books/_lib/model.ts';

enum Style {
	ITME = 'px-2 py-1 my-1 text-sm',
	ITEM_ON = Style.ITME + ' hover:bg-stone-200 hover:cursor-pointer',
	ITEM_OFF = Style.ITME + ' hover:cursor-default text-stone-500',
}

type Props = {
	searchData: BookDataFromTitleSearch[];
	onClick?: (data: BookDataFromTitleSearch) => void;
};

const BookPostSearchResults = ({ searchData, onClick }: Props) => {
	const itemClickHandler = (data: BookDataFromTitleSearch) => {
		if (onClick) onClick(data);
	};

	return searchData.map(data => {
		const author = data.abbreviatedAuthor;
		// const author = abbreviateAuthor(data.author);
		// let author = data.author;
		// if (author.split('^').length > 1)
		// 	author = `${author.split('^')[0]} 등 ${
		// 		author.split('^').length
		// 	}인`;
		return (
			<li
				key={data.isbn}
				className={Style.ITEM_ON + ' flex'}
				onClick={() => itemClickHandler(data)}>
				<figure className="flex-none">
					<img className="h-12 w-10" src={data.bookImageUrl} alt={data.title} />
				</figure>

				<div className=" flex flex-col px-2">
					<div className="w-[200px] truncate">
						<span className=" text-xs font-semibold">{data.title}</span>
					</div>
					<div className="w-[200px] truncate text-xs text-stone-700">
						<span>{author}</span>
						<span> | </span>
						<span>{data.publisher}</span>
					</div>
				</div>
			</li>
		);
	});
};

export default BookPostSearchResults;
