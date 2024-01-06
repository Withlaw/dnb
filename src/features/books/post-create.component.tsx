import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { BookDataToServer } from '@/features/books/books.model.ts';
import BookPostForm from '@/features/books/post-form.component.tsx';
import BookPostSearch from '@/features/books/post-search.component.tsx';
import { BookSearch, BookSearchDataItem } from '@/features/books/types.ts';
import { abbreviateAuthor } from '@/features/books/utils.ts';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';

const BookPostCreateForm = () => {
	const [isShowModal, setIsShowModal] = useState(false);
	const [bookSearch, setBookSearch] = useState<BookSearch>();
	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const { mutate, isPending: isCreating } = useMutation({
		mutationFn: async (newBook: BookDataToServer) =>
			await booksService.createBook(newBook),
		onSuccess: res => {
			window.alert('New book successfully created.');
			queryClient.invalidateQueries({ queryKey: ['books'] });

			const { id } = res[0];
			navigate(`/books/${id}`, { replace: true });
		},
		onError: error => {
			window.alert(error.message);
		},
	});

	const submitHandler = (data: FieldValues) => {
		const newBook = new BookDataToServer({
			...data,
			author: bookSearch?.author,
			publisher: bookSearch?.publisher,
			imageUrl: bookSearch?.imageUrl,
			merchantId: 1,
		});

		mutate(newBook);
	};

	const searchModalHandler = () => {
		setIsShowModal(prevVal => !prevVal);
	};

	const searchBookHandler = (book: BookSearchDataItem) => {
		setBookSearch({
			title: book.title,
			author: abbreviateAuthor(book.author),
			publisher: book.publisher,
			imageUrl: book.image,
		});
	};

	return (
		<BookPostForm
			onSubmit={submitHandler}
			onTitle={searchModalHandler}
			inputData={bookSearch}>
			<Button>작성 완료</Button>
			{/* <button disabled={isCreating}>작성 완료</button> */}
			{/* 혹시 모르니까 button type=reset 해주기 */}
			{/* 리액트 폼 훅에는 reset 함수 제공 */}
			{isShowModal && (
				<BookPostSearch
					modalHandler={searchModalHandler}
					onSearch={searchBookHandler}
				/>
			)}
		</BookPostForm>
	);
};

export default BookPostCreateForm;
