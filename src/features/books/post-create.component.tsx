import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import BookPostForm from '@/features/books/post-form.component.tsx';
import BookPostSearch from '@/features/books/post-search.component.tsx';
import { BookSearch, BookSearchDataItem } from '@/features/books/types.ts';
import { abbreviateAuthor } from '@/features/books/utils.ts';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';

const BookPostCreateForm = () => {
	const [isShowModal, setIsShowModal] = useState(false);

	const [bookSearch, setBookSearch] = useState<BookSearch>();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: booksService.createBook,
		// mutationFn: booksService.createBook.bind(booksService),
		onSuccess: () => {
			window.alert('New book successfully created.');
			queryClient.invalidateQueries({ queryKey: ['books'] });
		},
		onError: error => {
			window.alert(error.message);
		},
	});

	const submitHandler = (data: any) => {
		mutate(data);
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
			// author: 'asdljfnalksdjfklasdjfklasdnjflks',
			// publisher: 'asdfkljaskdnfjaslkdfmjkalsdmfjaklsdjfklasdf',
		});
	};

	return (
		<BookPostForm
			onSubmit={submitHandler}
			onClick={searchModalHandler}
			inputData={bookSearch}>
			<Button>작성 완료</Button>
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
