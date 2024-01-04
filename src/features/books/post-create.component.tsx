import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import PostForm from '@/features/books/post-form.component.tsx';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';

const BookPostCreateForm = () => {
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

	useEffect(() => {
		const bookSearch = async () => {
			const res = await window.fetch(
				'/api/v1/search/book.json?query=자바&display=10&start=11',
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Naver-Client-Id': 'PwRdiC58vvV7ceT9zpiz',
						'X-Naver-Client-Secret': '6fgQOqYDoS',
					},
				},
			);

			const data = await res.json();

			console.log(data);
		};

		try {
			bookSearch();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<PostForm onSubmit={submitHandler}>
			<Button>작성 완료</Button>
			{/* 혹시 모르니까 button type=reset 해주기 */}
			{/* 리액트 폼 훅에는 reset 함수 제공 */}
		</PostForm>
	);
};

export default BookPostCreateForm;
