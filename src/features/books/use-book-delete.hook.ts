import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useNotice from '@/features/notification/use-notice.tsx';
import { booksService } from '@/services/book-service.ts';

const useBookDelete = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { notify } = useNotice();

	const { mutate: deleteBookPost, isPending: isDeleting } = useMutation({
		mutationFn: async (id: number) => booksService.deleteBook(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] });
			notify('글이 삭제 되었습니다.');
			navigate('/books');
		},
		onError: error => {
			console.error(error.message);
		},
	});

	return { deleteBookPost, isDeleting };
};

export default useBookDelete;
