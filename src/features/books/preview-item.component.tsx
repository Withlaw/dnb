import { Link } from 'react-router-dom';

type Props = {
	book: {
		id: number;
		title: string;
		imageUrl: string;
		fee: number;
		status: string;
		merchantName: string;
	};
};

const BooksPreviewItem = ({ book }: Props) => {
	return (
		<li
			key={book.id}
			className="group my-1 w-full rounded-xl border border-solid border-stone-200 p-4 shadow-md hover:cursor-pointer hover:shadow-2xl">
			<Link to="est1" className=" flex justify-between">
				<figure className="flex-none">
					<img
						className="h-44 w-32 group-hover:scale-110 sm:h-32 sm:w-24"
						src={book.imageUrl}
						alt={book.title}
					/>
					{/* 이미지 사이즈는 업로드시에 규격에 맞게 리사이징하므로 style 사이즈는 딱히 필요 없을 듯? */}
				</figure>
				<div className="flex flex-auto justify-between pl-3">
					<div className="flex w-20 flex-auto flex-col items-start ">
						<h4 className="mb-1 w-full break-words text-xl font-bold sm:text-sm">
							{book.title}
						</h4>
						<p className="mb-1 text-stone-700 sm:text-sm">
							{book.merchantName}
						</p>
						<p className="mb-1 text-stone-700 sm:text-sm">{book.fee}원</p>
					</div>
					<div className="flex size-12 flex-none items-center rounded-full bg-red-100 p-2 text-center text-sm group-hover:font-semibold sm:size-10 sm:text-xs">
						<h4>{book.status}</h4>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default BooksPreviewItem;
