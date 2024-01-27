import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import {
	BookDataFromTitleSearch,
	BookDataToServer,
	BookFileToServer,
} from '@/features/books/books.model.ts';
import BookPostForm from '@/features/books/post-form.component.tsx';
import BookPostSearch from '@/features/books/post-search.component.tsx';
import useBookCreate from '@/features/books/use-book-create.hook.ts';
import useBookSearchModal from '@/features/books/use-book-search-modal.hook.ts';
import useUser from '@/features/users/use-user.hook.ts';
import Button from '@/ui/button.tsx';

const BookPostCreateForm = () => {
	const [bookSearch, setBookSearch] = useState<FieldValues>();

	const { isShowModal, modalHandler } = useBookSearchModal();

	const { createNewBookPost, isCreating } = useBookCreate();

	const { user } = useUser();

	const submitHandler = (data: FieldValues) => {
		const imageFiles = data.image_files.length
			? new BookFileToServer(data.image_files)
			: undefined;

		const newBook = new BookDataToServer({
			...data,
			...bookSearch,
			merchantId: user?.id,
		});

		// image -> 기본 이미지, 유저 업로드 이미지
		createNewBookPost({ newBook, imageFiles });
	};

	const searchBookHandler = (book: BookDataFromTitleSearch) => {
		setBookSearch({ ...book, author: book.abbreviatedAuthor });
	};

	return (
		<>
			<BookPostForm
				onSubmit={submitHandler}
				onSearch={modalHandler}
				inputData={bookSearch}>
				<Button options={{ disabled: isCreating }}>작성 완료</Button>
				{/* <button disabled={isCreating}>작성 완료</button> */}
				{/* 혹시 모르니까 button type=reset 해주기 */}
				{/* 리액트 폼 훅에는 reset 함수 제공 */}
			</BookPostForm>

			{isShowModal && (
				<BookPostSearch
					modalHandler={modalHandler}
					onSearch={searchBookHandler}
				/>
			)}
		</>
	);
};

export default BookPostCreateForm;
