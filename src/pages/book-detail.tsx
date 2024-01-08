import { Link } from 'react-router-dom';

import BookDetail from '@/features/books/detail.component.tsx';
import BookPostDelete from '@/features/books/post-delete.component.tsx';
import Button from '@/ui/button.tsx';

const BookDetailPage = () => {
	return (
		<div className="my-3 flex flex-col">
			<BookDetail />

			<div className="w-full p-2">
				<Button>예약하기</Button>

				<Link to={'edit'}>수정페이지가기</Link>

				<BookPostDelete />
			</div>
		</div>
	);
};

export default BookDetailPage;

/*
// edit window modal
						<form
							onSubmit={() => {
								console.log('form submitted');
							}}>
							<p>모달창</p>
							<button>그냥버튼</button>
							<br />
							<Modal.BtnSubmit>제출</Modal.BtnSubmit>
							<br />
							<Modal.BtnClose onClose={modalBtnHandler}>닫기</Modal.BtnClose>
						</form>
*/
