import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { booksService } from '@/services/books-service.ts';


const useBookDelete = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate:deleteBookPost, isPending: isDeleting } = useMutation({
		mutationFn: async (id: number) => booksService.deleteBook(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] });
			window.alert('Book successfully deleted!');
			navigate('/books');
		},
		onError: error => {
			window.alert(error.message);
		},
	});

  return {deleteBookPost, isDeleting};
}

export default useBookDelete;