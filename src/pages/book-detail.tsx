import { useState } from 'react';
import { Link } from 'react-router-dom';

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
};

const styleDiv = 'border-1 flex justify-between border-b border-solid py-3';
const styleText = 'mx-1';

const BookDetailPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalBtnHandler = () => {
		setIsModalOpen(prevValue => !prevValue);
	};
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

				<div className={styleDiv}>
					<Link to="">
						<figure>
							<span className={styleText}>@@</span>
							<span className={styleText + ' font-semibold'}>
								{dummy.merchantName}
							</span>
						</figure>
					</Link>
					<div>
						<span>채팅하기</span>
					</div>
				</div>

				<div className={styleDiv}>
					<span className={styleText}>대여기간: 10일</span>
					<span className={styleText}>{`대여료: ${dummy.fee}원`}</span>
				</div>

				<div className={styleDiv}>
					<p className={styleText + ' min-h-10 w-full break-words'}>
						{dummy.description}
					</p>
				</div>
			</div>

			<div className="p-4">
				<Button>예약하기</Button>
				<button onClick={modalBtnHandler}>수정하기</button>
			</div>

			{isModalOpen && (
				<Modal>
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
				</Modal>
			)}
		</div>
	);
};

export default BookDetailPage;
