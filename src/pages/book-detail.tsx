import { HiChevronLeft } from 'react-icons/hi';
import { HiMenu } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import BookDetail from '@/features/books/detail.component.tsx';
import BookPostDelete from '@/features/books/post-delete.component.tsx';
import Button from '@/ui/button.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralLayout from '@/ui/general-layout.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import NavMain from '@/ui/nav-main.tsx';

const BookDetailPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	return (
		<GeneralLayout>
			<GeneralHeader className="md:w-96">
				<div className="flex min-w-4" onClick={goBack}>
					<div>
						<span className="text-2xl hover:cursor-pointer">
							<HiChevronLeft />
						</span>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<span className="ml-4">
						<HiMenu size="24" />
					</span>
				</div>
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

			<NavMain className="md:w-96" />
		</GeneralLayout>
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
