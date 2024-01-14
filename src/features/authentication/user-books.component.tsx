import { Link } from 'react-router-dom';

import { BookDataFromServer } from '@/features/books/books.model.ts';

const UserBooks = ({ book }: { book: BookDataFromServer }) => {
	return (
		<li>
			<Link
				to={`/books/${book.id}`}
				className="relative flex justify-between hover:cursor-pointer ">
				<div className="flex space-x-2">
					<figure className="flex-none">
						<img
							src={book.bookImageUrl}
							alt="book_image"
							className="h-24 w-20 border border-stone-400"
						/>
					</figure>

					<div className="flex flex-col justify-between p-1">
						<div className="flex flex-col space-y-1">
							<span className="text-sm font-semibold">{book.title}</span>
							<span className="text-xs">
								{book.author} | {book.publisher}
							</span>
						</div>
						<div>
							<span className="text-xs">대여료 {book.fee}원</span>
						</div>
					</div>
				</div>

				<div className="absolute bottom-0 right-0 flex size-12 flex-none items-center rounded-full bg-red-100 p-2 text-center text-sm group-hover:font-semibold sm:size-10 sm:text-xs">
					<span>대여 가능</span>
				</div>
			</Link>
		</li>
	);
};

export default UserBooks;
