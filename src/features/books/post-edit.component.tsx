import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import {
	BookDataFromServer,
	BookDataToServer,
	BookFileToServer,
} from '@/features/books/books.model.ts';
import BookPostForm from '@/features/books/post-form.component.tsx';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';

const BookPostEditForm = () => {
	const { bookId } = useParams();
	const [backupData, setBackupData] = useState();

	// book detail data load
	const { data: book } = useQuery({
		enabled: Boolean(bookId),
		queryKey: [bookId, 'book'],
		queryFn: async () => await booksService.getBook(+(bookId as string)),
		staleTime: 600 * 1000,
	});

	// book detail update
	const { mutate, isPending: isUpdating } = useMutation({
		mutationFn: async ({
			editedBook,
			imageFiles,
		}: {
			editedBook: BookDataToServer;
			imageFiles?: BookFileToServer;
		}) => {
			return await booksService.editBook({
				id: +bookId!,
				editedBook,
				backup: new BookDataToServer(book!),
				imageFiles,
			});
		},
		onSuccess: res => {
			window.alert('New book successfully created.');
			console.log('update sucees: ', res);
			/*
			queryClient.invalidateQueries({ queryKey: [bookId, 'book'] });

			navigate(`/books/${bookId}`, { replace: true });
      */
		},
		onError: error => {
			window.alert(error.message);
		},
	});

	const submitHandler = (data: FieldValues) => {
		if (!book) return;

		const imageFiles = data.image_files.length
			? new BookFileToServer(data.image_files)
			: undefined;

		const editedBook = new BookDataToServer({
			...book,
			...data,
		});

		mutate({ editedBook, imageFiles });
	};

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

export default BookPostEditForm;
