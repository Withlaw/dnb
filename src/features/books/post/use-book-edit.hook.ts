import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
	BookDataToServer,
	BookFileToServer,
} from '@/features/books/_lib/model.ts';
import useNotice from '@/hooks/use-notice.ts';
import { booksService } from '@/services/book-service.ts';

const useBookEdit = (bookId?: string) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { notify } = useNotice();

	const { mutate: editBookPost, isPending: isUpdating } = useMutation({
		mutationFn: async ({
			editedBook,
			imageFiles,
			backup,
		}: {
			editedBook: BookDataToServer;
			imageFiles?: BookFileToServer;
			backup: BookDataToServer;
		}) => {
			return await booksService.editBook({
				id: +bookId!,
				editedBook,
				backup,
				imageFiles,
			});
		},
		onSuccess: () => {
			notify('글이 업데이트 되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['book', bookId] });

			navigate(`/books/${bookId}`, { replace: true });
		},
		onError: error => {
			console.error(error.message);
			navigate(-1);
		},
	});

	return { editBookPost, isUpdating };
};

export default useBookEdit;
