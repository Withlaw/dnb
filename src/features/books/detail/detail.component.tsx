import { useParams } from 'react-router-dom';

import BookDetailContent from '@/features/books/detail/detail-content.component.tsx';
import useBookDetail from '@/features/books/detail/use-book-detail.hook.ts';
import { BookDetailSkeleton } from '@/ui/skeletons.tsx';

const BookDetail = () => {
	const { bookId } = useParams();

	const { book, isLoading, isError, error } = useBookDetail(bookId);

	if (isLoading) return <BookDetailSkeleton />;
	if (isError) return <h3>{error?.message}</h3>;
	if (book) return <BookDetailContent book={book} />;

	// return (
	// 	<div className="my-3 flex h-full flex-col">
	// 		{isLoading && <BookDetailSkeleton />}
	// 		{isError && <h3>{error?.message}</h3>}
	// 		{book && <BookDetailContent book={book} />}

	// 		{book && !ownThisBook && (
	// 			<div className="w-full p-2">
	// 				<Rent book={book} user={user} />
	// 				<Return book={book} user={user} />
	// 			</div>
	// 		)}
	// 	</div>
	// );
};

export default BookDetail;
