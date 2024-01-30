import { HiChevronLeft } from 'react-icons/hi';
import { Link, useNavigate, useParams } from 'react-router-dom';

import BookDetail from '@/features/books/detail.component.tsx';
import BookPostDelete from '@/features/books/post-delete.component.tsx';
import useBook from '@/features/books/use-book.hook.ts';
import BookPostWish from '@/features/books/wish.component.tsx';
import Rent from '@/features/rentals/rent.component.tsx';
import Return from '@/features/rentals/return.component.tsx';
import useUser from '@/features/users/use-user.hook.ts';
import useShow from '@/hooks/use-show.ts';
import GeneralHeaderMenu from '@/ui/general-header-menu.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';
import { BookDetailSkeleton } from '@/ui/skeletons.tsx';

const BookDetailPage = () => {
	const { bookId } = useParams();
	const navigate = useNavigate();

	const { isShow, showHandler } = useShow();
	const { book, isLoading, isError, error } = useBook(bookId);
	const { user } = useUser();

	const ownThisBook = Boolean(user?.id === book?.merchantId);

	const goBack = () => {
		navigate(-1);
	};

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
					{isLoading && <BookDetailSkeleton />}
					{isError && <h3>{error?.message}</h3>}
					{book && <BookDetail book={book} />}

					{book && !ownThisBook && (
						<div className="w-full p-2">
							<Rent book={book} user={user} />
							<Return book={book} />
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
