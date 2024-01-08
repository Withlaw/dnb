import { useParams } from 'react-router-dom';

import useBookDelete from '@/features/books/use-book-delete.hook.ts';
import Button from '@/ui/button.tsx';

const BookPostDelete = () => {
	const { bookId } = useParams();

	const { deleteBookPost, isDeleting } = useBookDelete();

	const deleteHandler = () => {
		const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
		if (!isConfirmed) return;
		deleteBookPost(+bookId!);
	};

	return (
		<Button onClick={deleteHandler} options={{ disabled: isDeleting }}>
			삭제하기
		</Button>
	);
};

export default BookPostDelete;
