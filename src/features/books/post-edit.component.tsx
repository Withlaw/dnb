import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import {
	BookDataToServer,
	BookFileToServer,
} from '@/features/books/books.model.ts';
import BookPostForm from '@/features/books/post-form.component.tsx';
import useBookEdit from '@/features/books/use-book-edit.hook.ts';
import useBook from '@/features/books/use-book.hook.ts';
import Button from '@/ui/button.tsx';

const BookPostEditForm = () => {
	const { bookId } = useParams();

	// book detail data load
	const { book, isLoading, isError, error } = useBook();

	// book detail update
	const { editBookPost, isUpdating } = useBookEdit(bookId);

	const submitHandler = (data: FieldValues) => {
		if (!book) return;

		const imageFiles = data.image_files.length
			? new BookFileToServer(data.image_files)
			: undefined;
		const editedBook = new BookDataToServer({
			...book,
			...data,
		});

		editBookPost({
			editedBook,
			imageFiles,
			backup: new BookDataToServer(book),
		});
	};

	if (isLoading) return <h3>Loading...</h3>;

	if (isError) return <h3>{error?.message}</h3>;

	if (book)
		return (
			<>
				<BookPostForm onSubmit={submitHandler} inputData={book}>
					<Button options={{ disabled: isUpdating }}>수정 완료</Button>
				</BookPostForm>
			</>
		);
};

export default BookPostEditForm;
