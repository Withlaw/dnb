import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
	BookDataToServer,
	BookFileToServer,
} from '@/features/books/books.model.ts';
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

	// const queryClient = useQueryClient();
	const { mutate, isPending: isCreating } = useMutation({
		mutationFn: async ({
			newBook,
			imageFiles,
		}: {
			newBook: BookDataToServer;
			imageFiles?: BookFileToServer;
		}) => await booksService.createBook(newBook, imageFiles),
		onSuccess: res => {
			window.alert('New book successfully created.');
			// queryClient.invalidateQueries({ queryKey: ['books'] });

			const { id } = res;
			navigate(`/books/${id}`, { replace: true });
		},
		onError: error => {
			window.alert(error.message);
		},
	});

	const submitHandler = (data: FieldValues) => {
		const imageFiles = data.image_files.length
			? new BookFileToServer(data.image_files)
			: undefined;

		const newBook = new BookDataToServer({
			...data,
			...bookSearch,
			merchantId: 1,
		});

		// image -> 기본 이미지, 유저 업로드 이미지
		mutate({ newBook, imageFiles });
	};

	const searchModalHandler = () => {
		setIsShowModal(prevVal => !prevVal);
	};

	const searchBookHandler = (book: BookSearchDataItem) => {
		setBookSearch({
			title: book.title,
			author: abbreviateAuthor(book.author),
			publisher: book.publisher,
			bookImageUrl: book.image,
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
