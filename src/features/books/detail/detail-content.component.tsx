import { Link } from 'react-router-dom';

import icons from '@/assets/icons.svg';
import DetailRow from '@/features/books/_components/detail-row.component.tsx';
import BookImageSlider from '@/features/books/_components/detail-slider.component.tsx';
import { BookDataFromServer } from '@/features/books/_lib/model.ts';

// enum Style {
// 	DIV = 'border-1 flex justify-between border-b border-solid py-3',
// 	TEXT = 'mx-1',
// }

type Props = {
	book: BookDataFromServer;
	// children?: React.ReactNode;
};

const BookDetailContent = ({ book }: Props) => {
	// console.log('book: ', book);

	return (
		<>
			{/* 책 이미지 */}
			{/* <div className="flex justify-center rounded-md bg-stone-200">
				<figure>
					<img
						className="h-72 w-64"
						src={book?.bookImageUrl}
						alt={book?.title}
					/>
				</figure>
			</div> */}

			{/* 책 이미지 슬라이더 */}
			<div className="mb-2 flex-initial">
				<BookImageSlider>
					{book.getImages().map(image => {
						if (image.trim() === '') return;

						return (
							<div key={image.length}>
								<figure className="flex justify-center bg-stone-200">
									<img className="h-80 w-64" src={image} alt={book.title} />
								</figure>
							</div>
						);
					})}
				</BookImageSlider>
			</div>

			{/* 책 정보 및 글 내용 */}
			<div className="flex flex-auto flex-col p-2">
				<DetailRow>
					<div className="flex flex-col">
						<h1 className="text-xl font-semibold">{book.title}</h1>
						<div className="text-sm">
							<DetailRow.Span>{book.author}</DetailRow.Span>
							<span className="mx-1 h-2 w-1">|</span>
							<DetailRow.Span>{book.publisher}</DetailRow.Span>
						</div>
					</div>
				</DetailRow>

				<DetailRow>
					{/* <Link to={`/user${book.merchantId}`}> */}
					<Link to={``}>
						<figure className="mx-1 flex items-center">
							{Boolean(book.merchantAvatarUrl) && (
								<img
									src="https://shopping-phinf.pstatic.net/main_3752868/37528682620.20230530082635.jpg"
									alt={book.title}
									className="size-6 rounded-full"
								/>
							)}
							{!book.merchantAvatarUrl && (
								<svg className="size-6">
									<use href={`${icons}#default-avatar`}></use>
								</svg>
							)}
							<DetailRow.Span className="mx-2 font-semibold">
								{book.merchantFullName}
							</DetailRow.Span>
						</figure>
					</Link>
					<div>{/* <span className={Style.TEXT}>채팅하기</span> */}</div>
				</DetailRow>

				<DetailRow>
					<DetailRow.Span>대여기간: 10일</DetailRow.Span>
					<DetailRow.Span>{`대여료: ${book.fee} 원`}</DetailRow.Span>
				</DetailRow>

				<DetailRow className="flex-auto ">
					<p className={'mx-1 min-h-36 w-full break-words'}>
						{book.description}
					</p>
				</DetailRow>
			</div>
		</>
	);
};

export default BookDetailContent;

/*
type DummyBookDetail = {
	description: string;
	publisher: string;
	author: string;
	fee: number;
	title: string;
	imageUrl: string;
	merchantName: string;
	merchantAvatar: string | null;
};

const dummy: DummyBookDetail = {
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
*/
