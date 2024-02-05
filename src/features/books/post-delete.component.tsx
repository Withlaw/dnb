import { useParams } from 'react-router-dom';

import useBookDelete from '@/features/books/use-book-delete.hook.ts';
import useConfirm from '@/features/confirmation/use-confirm.hook.ts';

const BookPostDelete = ({ children }: { children: React.ReactNode }) => {
	const { bookId } = useParams();
	const { confirm } = useConfirm();
	const { deleteBookPost } = useBookDelete();

	const deleteHandler = () => {
		confirm('글을 삭제하시겠습니까?', () => {
			deleteBookPost(+bookId!);
		});
		// const isConfirmed = window.confirm('글을 삭제하시겠습니까?');
		// if (!isConfirmed) return;
		// deleteBookPost(+bookId!);
	};

	return <span onClick={deleteHandler}>{children}</span>;
	// return (
	// 	<Button onClick={deleteHandler} options={{ disabled: isDeleting }}>
	// 		삭제하기
	// 	</Button>
	// );
};

export default BookPostDelete;
