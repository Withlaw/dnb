import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { BookDataToServer, BookFileToServer } from '@/features/books/model.ts';
import { readImage } from '@/features/books/utils.ts';
import useNotice from '@/features/notification/use-notice.hook.ts';
import { booksService } from '@/services/book-service.ts';

const useBookCreate = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { notify } = useNotice();

	const { mutate: createNewBookPost, isPending: isCreating } = useMutation({
		mutationFn: async ({
			newBook,
			imageFiles,
		}: {
			newBook: BookDataToServer;
			imageFiles?: BookFileToServer;
		}) => {
			return { newBook, imageFiles };
		},
		// }) => await booksService.createBook(newBook, imageFiles),
		onMutate: async data => {
			console.log('useBookCreate: ', data);
			if (!data.imageFiles) return;
			const images = await readImage(data.imageFiles.files);
			console.log('이미지: ', images);
		},
		onSuccess: res => {
			return;
			notify('글이 등록 되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['books'] });

			const { id } = res;
			navigate(`/books/${id}`, { replace: true });
		},
		onError: error => {
			console.error(error.message);
		},
	});

	return { createNewBookPost, isCreating };
};

export default useBookCreate;
