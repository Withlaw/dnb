import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { booksService } from '@/services/books-service.ts';

const BookPostDelete = () => {
	const { bookId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { isPending: isDeleting, mutate } = useMutation({
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

	const deleteHandler = () => {
		const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
		if (!isConfirmed) return;
		mutate(+(bookId as string));
	};

	return (
		<button onClick={deleteHandler} disabled={isDeleting}>
			삭제하기
		</button>
	);
};

export default BookPostDelete;
