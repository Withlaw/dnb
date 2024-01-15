import { useParams } from 'react-router-dom';

import useBookDelete from '@/features/books/use-book-delete.hook.ts';

const BookPostDelete = ({ children }: { children: React.ReactNode }) => {
	const { bookId } = useParams();

	const { deleteBookPost } = useBookDelete();

	const deleteHandler = () => {
		const isConfirmed = window.confirm('글을 삭제하시겠습니까?');
		if (!isConfirmed) return;
		deleteBookPost(+bookId!);
	};

	return <span onClick={deleteHandler}>{children}</span>;
	// return (
	// 	<Button onClick={deleteHandler} options={{ disabled: isDeleting }}>
	// 		삭제하기
	// 	</Button>
	// );
};

export default BookPostDelete;
