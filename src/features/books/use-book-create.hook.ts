import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { BookDataToServer, BookFileToServer } from '@/features/books/_model.ts';
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
		}) => await booksService.createBook(newBook, imageFiles),

		onSuccess: res => {
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
