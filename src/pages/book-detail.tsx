import { HiChevronLeft } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import BookDetail from '@/features/books/detail.component.tsx';
import BookPostDelete from '@/features/books/post-delete.component.tsx';
import useShow from '@/hooks/use-show.ts';
import Button from '@/ui/button.tsx';
import GeneralHeaderMenu from '@/ui/general-header-menu.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';

const BookDetailPage = () => {
	const { isShow, showHandler } = useShow();
	const navigate = useNavigate();
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
					<GeneralHeaderMenu.Item>수정하기</GeneralHeaderMenu.Item>
					<GeneralHeaderMenu.Item>삭제하기</GeneralHeaderMenu.Item>
				</GeneralHeaderMenu>
			</GeneralHeader>

			<GeneralMain>
				<div className="my-3 flex flex-col ">
					<BookDetail />

					<div className="w-full p-2">
						<Button>예약하기</Button>

						<Link to={'edit'}>수정페이지가기</Link>

						<BookPostDelete />
					</div>
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
