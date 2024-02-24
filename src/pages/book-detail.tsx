import { Link, useNavigate, useParams } from 'react-router-dom';

import BookDetail from '@/features/books/detail/detail.component.tsx';
import useBookDetail from '@/features/books/detail/use-book-detail.hook.ts';
import BookPostDelete from '@/features/books/post/post-delete.component.tsx';
import BookPostWish from '@/features/books/wish/wish.component.tsx';
import Rent from '@/features/rentals/rent/rent.component.tsx';
import Return from '@/features/rentals/return/return.component.tsx';
import useUser from '@/features/users/info/use-user.hook.ts';
import GeneralHeaderBack from '@/ui/general-header-back.tsx';
import GeneralHeaderMenu from '@/ui/general-header-menu.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';

const BookDetailPage = () => {
	const navigate = useNavigate();
	const { bookId } = useParams();

	const { book } = useBookDetail(bookId);
	const { user } = useUser();
	const ownThisBook = Boolean(user?.id === book?.merchantId);

	const goBack = () => {
		navigate(-1);
	};

	return (
		<>
			<GeneralHeader>
				<GeneralHeaderBack onClick={goBack} />

				<GeneralHeaderMenu>
					{!ownThisBook && (
						<GeneralHeaderMenu.Item>
							<BookPostWish>찜하기</BookPostWish>
						</GeneralHeaderMenu.Item>
					)}

					{ownThisBook && (
						<GeneralHeaderMenu.Item>
							<Link to={'edit'}>수정하기</Link>
						</GeneralHeaderMenu.Item>
					)}

					{ownThisBook && (
						<GeneralHeaderMenu.Item>
							<BookPostDelete>삭제하기</BookPostDelete>
						</GeneralHeaderMenu.Item>
					)}
				</GeneralHeaderMenu>
			</GeneralHeader>

			<GeneralMain>
				<div className="my-3 flex h-full flex-col">
					<BookDetail />

					{book && !ownThisBook && (
						<div className="w-full p-2">
							<Rent book={book} user={user} />
							<Return book={book} user={user} />
						</div>
					)}
				</div>
			</GeneralMain>

			<GeneralNav />
		</>
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
