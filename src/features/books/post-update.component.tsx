import { useQuery } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import BookPostForm from '@/features/books/post-form.component.tsx';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';

const BookPostUpdateForm = () => {
	const { bookId } = useParams();
	console.log('paa : ', bookId);

	const { data: book } = useQuery({
		enabled: !!bookId,
		queryKey: [bookId, 'book'],
		queryFn: async () => await booksService.getBook(+(bookId as string)),
		staleTime: 600 * 1000,
	});

	const submitHandler = (data: FieldValues) => {
		// const newBook = new BookDataToServer({
		// 	...data,
		// 	author: bookSearch?.author,
		// 	publisher: bookSearch?.publisher,
		// 	imageUrl: bookSearch?.imageUrl,
		// 	merchantId: 1,
		// });

		// mutate(newBook);
		console.log('update submit: ', data);
	};

	console.log('book update dat: ', book);

	return (
		<>
			{book && (
				<BookPostForm onSubmit={submitHandler} inputData={book}>
					<Button>수정 완료</Button>
				</BookPostForm>
			)}
		</>
	);
};

export default BookPostUpdateForm;
