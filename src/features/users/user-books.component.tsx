import { Link } from 'react-router-dom';

import { BookDataFromServer } from '@/features/books/model';
import BookStatusSticker from '@/ui/sticker-book-status.tsx';
import RentalStatusSticker from '@/ui/sticker-rental-status.tsx';

const UserBooks = ({ books }: { books: BookDataFromServer[] }) => {
	if (books)
		return books.map(book => {
			const key = book.rentalId ?? book.id;
			return (
				<li key={key}>
					<Link
						to={`/books/${book.id}`}
						className="relative flex justify-between hover:cursor-pointer">
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

						<div className="absolute bottom-0 right-0 size-12 flex-none text-sm sm:size-10 sm:text-xs">
							{!book.rentalStatus && (
								<BookStatusSticker
									status={book.rentalId ? '대여 불가' : '대여 가능'}
								/>
							)}
							{book.rentalStatus && (
								// <span className="flex size-12 items-center rounded-full p-2 text-center text-sm sm:size-10 sm:text-xs">
								// 	{book.rentalStatus}
								// </span>
								<RentalStatusSticker status={book.rentalStatus} />
							)}
						</div>
					</Link>
				</li>
			);
		});
};

export default UserBooks;
