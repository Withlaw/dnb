import { Link, useParams } from 'react-router-dom';

import icons from '@/assets/icons.svg';
import DetailRow from '@/features/books/detail-row.component.tsx';
import useBook from '@/features/books/use-book.hook.ts';

enum Style {
	DIV = 'border-1 flex justify-between border-b border-solid py-3',
	TEXT = 'mx-1',
}

const BookDetail = () => {
	const { bookId } = useParams();

	const { book, isLoading, isError, error } = useBook(bookId);

	if (isLoading) return <h3>Loading...</h3>;

	if (isError) return <h3>{error?.message}</h3>;

	if (book)
		return (
			<>
				{/* 책 이미지 */}
				<div className="flex justify-center rounded-md bg-stone-200">
					<figure>
						<img
							className="h-72 w-64"
							src={book?.bookImageUrl}
							alt={book?.title}
						/>
					</figure>
				</div>
				{/* 책 이미지 슬라이더 */}
				{/* <div className="flex items-center justify-center bg-stone-200">
				<BookImageSlider>
					<figure>
						<img
							src={book?.bookImageUrl}
							alt={book?.title}
						/>
					</figure>
					<figure>
						<img
							src={book?.bookImageUrl}
							alt={book?.title}
						/>
					</figure>
				</BookImageSlider>
			</div> */}

				{/* 책 정보 및 글 내용 */}
				<div className="flex flex-col p-2">
					<DetailRow>
						<div className="flex flex-col">
							<h1 className="text-xl font-semibold">{book?.title}</h1>
							<div className="text-sm">
								<DetailRow.Span>{book?.author}</DetailRow.Span>
								<span className="mx-1 h-2 w-1">|</span>
								<DetailRow.Span>{book?.publisher}</DetailRow.Span>
							</div>
						</div>
					</DetailRow>

					<DetailRow>
						<Link to="">
							<figure className="mx-1 flex items-center">
								{/* {dummy.merchantAvatar ? (
								<img src={dummy.merchantAvatar} />
							) : ( */}
								<svg className="size-6">
									<use href={`${icons}#default-avatar`}></use>
								</svg>
								{/* )} */}
								<DetailRow.Span className="mx-2 font-semibold">
									{'merchantName'}
								</DetailRow.Span>
							</figure>
						</Link>
						<div>
							<span className={Style.TEXT}>채팅하기</span>
						</div>
					</DetailRow>

					<DetailRow>
						<DetailRow.Span>대여기간: 10일</DetailRow.Span>
						<DetailRow.Span>{`대여료: ${book?.fee} 원`}</DetailRow.Span>
					</DetailRow>

					<DetailRow>
						<p className={'mx-1 min-h-20 w-full break-words'}>
							{book?.description}
						</p>
					</DetailRow>
				</div>
			</>
		);
};

export default BookDetail;

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
