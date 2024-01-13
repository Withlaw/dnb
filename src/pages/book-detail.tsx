import { HiChevronLeft } from 'react-icons/hi';
import { Link, useNavigate, useParams } from 'react-router-dom';

import useUserSession from '@/features/authentication/use-user-session.hook.ts';
import BookDetail from '@/features/books/detail.component.tsx';
import BookPostDelete from '@/features/books/post-delete.component.tsx';
import useBook from '@/features/books/use-book.hook.ts';
import BookPostWish from '@/features/books/wish.component.tsx';
import useShow from '@/hooks/use-show.ts';
import Button from '@/ui/button.tsx';
import GeneralHeaderMenu from '@/ui/general-header-menu.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';

const BookDetailPage = () => {
	const { isShow, showHandler } = useShow();

	const navigate = useNavigate();

	const { bookId } = useParams();

	const { book, isLoading, isError, error } = useBook(bookId);
	const { session } = useUserSession();

	const isOwn =
		session && session.user.user_metadata.member_id === book?.merchantId;

	const goBack = () => {
		navigate(-1);
	};

	console.log('book:', book, session);

	return (
		<>
			<GeneralHeader>
				<div className="flex min-w-4" onClick={goBack}>
					<div>
						<span className="text-2xl hover:cursor-pointer">
							<HiChevronLeft />
						</span>
					</div>
				</div>

				<GeneralHeaderMenu onClick={showHandler} isShowMenu={isShow}>
					{!isOwn && (
						<GeneralHeaderMenu.Item>
							<BookPostWish>찜하기</BookPostWish>
						</GeneralHeaderMenu.Item>
					)}

					{isOwn && (
						<GeneralHeaderMenu.Item>
							<Link to={'edit'}>수정하기</Link>
						</GeneralHeaderMenu.Item>
					)}

					{isOwn && (
						<GeneralHeaderMenu.Item>
							<BookPostDelete>삭제하기</BookPostDelete>
						</GeneralHeaderMenu.Item>
					)}
				</GeneralHeaderMenu>
			</GeneralHeader>

			<GeneralMain>
				<div className="my-3 flex flex-col ">
					{isLoading && <h3>Loading...</h3>}
					{isError && <h3>{error?.message}</h3>}
					{book && <BookDetail book={book} />}
					{!isOwn && (
						<div className="w-full p-2">
							<Button>예약하기</Button>
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
