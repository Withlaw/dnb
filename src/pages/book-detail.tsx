import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import icons from '@/assets/icons.svg';
import PostForm from '@/features/books/post-form.component.tsx';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';
import Modal from '@/ui/modal.tsx';

type BookDetail = {
	description: string;
	publisher: string;
	author: string;
	fee: number;
	title: string;
	imageUrl: string;
	merchantName: string;
	merchantAvatar: string | null;
};

const dummy: BookDetail = {
	title: '바보 빅터',
	description:
		'\
  saflkdsasdfa,.smd\
  f.,\
  aasldkmfjkalsdjfmkladjsmfkladsjfmklasndfhjkadfhkljadmsfkljansdxifkaynsdhufajkxlsdhmfasxfajksdhmfajklsdhfmajkshdfkj\
  asdkflads adfadsf adsfasdfdsaf asdfasdf asdfsdf asdfasdf \nfa\
  kljfkls',
	publisher: '한국경제신문사',
	author: '호아킴 데 포사다',
	fee: 1000,
	imageUrl:
		'https://images.unsplash.com/photo-1703593693062-16aab101121a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',

	merchantName: '몽키디루피',
	merchantAvatar: null,
};

enum Style {
	DIV = 'border-1 flex justify-between border-b border-solid py-3',
	TEXT = 'mx-1',
}

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
			<div className="flex justify-center rounded-md bg-stone-200">
				<figure>
					{/* <div className="h-72 w-64 bg-green-900 ">이미지</div> */}
					<img className="h-72 w-64" src={dummy.imageUrl} alt={dummy.title} />
				</figure>
			</div>

			<div className="flex flex-col p-2">
				<div className="border-b border-solid py-2">
					<h1 className="text-xl font-semibold">{dummy.title}</h1>
					<div className="ml-1 text-sm">
						<span>{dummy.author}</span>
						<span className="mx-1 h-2 w-1">|</span>
						<span>{dummy.publisher}</span>
					</div>
				</div>

				<div className={Style.DIV}>
					<Link to="">
						<figure className="mx-1 flex items-center">
							{dummy.merchantAvatar ? (
								<img src={dummy.merchantAvatar} />
							) : (
								<svg className="size-6">
									<use href={`${icons}#default-avatar`}></use>
								</svg>
							)}
							<span className={Style.TEXT + ' mx-2 font-semibold'}>
								{dummy.merchantName}
							</span>
						</figure>
					</Link>
					<div>
						<span className={Style.TEXT}>채팅하기</span>
					</div>
				</div>

				<div className={Style.DIV}>
					<span className={Style.TEXT}>대여기간: 10일</span>
					<span className={Style.TEXT}>{`대여료: ${dummy.fee} 원`}</span>
				</div>

				<div className={Style.DIV}>
					<p className={Style.TEXT + ' min-h-10 w-full break-words'}>
						{dummy.description}
					</p>
				</div>
			</div>

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
