import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BookDetail from '@/features/books/detail.component.tsx';
import PostForm from '@/features/books/post-form.component.tsx';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';
import Modal from '@/ui/modal.tsx';

const BookDetailPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalBtnHandler = () => {
		setIsModalOpen(prevValue => !prevValue);
	};

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { isPending: isDeleting, mutate } = useMutation({
		mutationFn: booksService.deleteBook.bind(booksService),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['books'] });
			window.alert('Book successfully deleted!');
			navigate('/books');
		},
		onError: error => {
			window.alert(error.message);
		},
	});

	return (
		<div className="my-3 flex flex-col">
			<BookDetail />

			{/* ////////////////  */}

			<div className="w-full p-2">
				<Button>예약하기</Button>
				<button onClick={modalBtnHandler}>수정하기</button>
				<span> </span>
				<Link to={'edit'} onClick={modalBtnHandler}>
					수정페이지가기
				</Link>
				<span> </span>
				<button
					onClick={() => {
						const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
						if (!isConfirmed) return;
						mutate('7');
					}}
					disabled={isDeleting}>
					삭제하기
				</button>
			</div>

			{isModalOpen && (
				<Modal>
					<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
						<PostForm>
							<div>
								<Modal.BtnSubmit>제출</Modal.BtnSubmit>
								<Modal.BtnClose onClose={modalBtnHandler}>닫기</Modal.BtnClose>
							</div>
						</PostForm>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default BookDetailPage;

/*
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
