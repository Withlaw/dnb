import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import {
	BookDataFromTitleSearch,
	BookDataToServer,
	BookFileToServer,
} from '@/features/books/_model.ts';
import BookPostForm from '@/features/books/post-form.component.tsx';
import BookPostSearch from '@/features/books/post-search.component.tsx';
import useBookCreate from '@/features/books/use-book-create.hook.ts';
import useUser from '@/features/users/use-user.hook.ts';
import Button from '@/ui/button.tsx';
import Modal from '@/ui/modal.tsx';

const BookPostCreateForm = () => {
	const [bookSearch, setBookSearch] = useState<FieldValues>();

	const { createNewBookPost, isCreating } = useBookCreate();

	const { user } = useUser();

	const searchBookHandler = (book: BookDataFromTitleSearch) => {
		setBookSearch({ ...book, author: book.abbreviatedAuthor });
	};

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

	return (
		<Modal>
			<Modal.Trigger htmlFor="search">
				<BookPostForm onSubmit={submitHandler} inputData={bookSearch}>
					<Button options={{ disabled: isCreating }}>작성 완료</Button>
				</BookPostForm>
			</Modal.Trigger>

			<Modal.Window name="search">
				<BookPostSearch onSearch={searchBookHandler} />
			</Modal.Window>
		</Modal>
	);
};

export default BookPostCreateForm;
