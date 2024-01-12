import { Link } from 'react-router-dom';

import icons from '@/assets/icons.svg';
import { BooksPreviewModel } from '@/features/books/books.model.ts';

type Props = {
	book: BooksPreviewModel;
};

const BooksPreviewItem = ({ book }: Props) => {
	return (
		<li className="group relative my-2 w-full rounded-xl border border-solid border-stone-200 p-4 shadow-md hover:cursor-pointer hover:shadow-2xl">
			<Link to={`${book.id}`} className=" flex justify-between">
				<figure className="flex-none">
					<img
						className="h-44 w-32 group-hover:scale-110 sm:h-32 sm:w-24"
						src={book.bookImageUrl}
						alt={book.title}
					/>
					{/* 이미지 사이즈는 업로드시에 규격에 맞게 리사이징하므로 style 사이즈는 딱히 필요 없을 듯? */}
				</figure>
				<div className="flex flex-auto justify-between py-2 pl-2">
					<div className="flex w-20 flex-auto flex-col items-start space-y-1">
						<h4 className="mb-1 w-full break-words text-xl font-bold sm:text-sm">
							{book.title}
						</h4>
						<div className="flex space-x-2 text-center">
							{Boolean(book.merchantAvatarUrl) && (
								<img
									src={book.merchantAvatarUrl}
									alt={book.merchantFullName}
									className="size-4"
								/>
							)}
							{!book.merchantAvatarUrl && (
								<svg className="size-4">
									<use href={`${icons}#default-avatar`}></use>
								</svg>
							)}
							<p className="mb-1 text-stone-700 sm:text-sm">
								{book.merchantFullName}
							</p>
						</div>
						<p className="mb-1 text-stone-700 sm:text-sm">{book.fee}원</p>
					</div>
				</div>
			</Link>

			<div className="absolute bottom-3 right-3 flex size-12 flex-none items-center rounded-full bg-red-100 p-2 text-center text-sm group-hover:font-semibold sm:size-10 sm:text-xs">
				<span>{book.status}</span>
			</div>
		</li>
	);
};

export default BooksPreviewItem;
