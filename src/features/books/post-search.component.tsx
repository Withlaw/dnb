import { HiOutlineX } from 'react-icons/hi';

import { BookDataFromTitleSearch } from '@/features/books/books.model.ts';
import BookPostSearchForm from '@/features/books/post-search-form.component.tsx';
import Modal from '@/ui/modal.tsx';

type Props = {
	onSearch?: (book: BookDataFromTitleSearch) => void;
	onClose?: () => void;
};

const BookPostSearch = ({ onSearch, onClose }: Props) => {
	return (
		<>
			{/* <Modal>
				<Modal.Window name="search"> */}
			<div className="absolute top-[10vh] flex w-full items-center justify-center ">
				<div className="relative">
					<span
						onClick={onClose}
						className="z-2 absolute left-[8px] top-[8px] text-stone-700 hover:cursor-pointer">
						<HiOutlineX size="24" />
					</span>

					<BookPostSearchForm onClose={onClose} onSearch={onSearch} />
				</div>
			</div>
			{/* </Modal.Window>
			</Modal> */}
		</>
	);
};
// const BookPostSearch = ({ modalHandler, onSearch }: Props) => {
// 	return (
// 		<Modal className="top-[10vh] flex flex-col" onClose={modalHandler}>
// 			{/* 이 아래는 다시 dropdown으로 추상화 할 수 있음 */}
// 			<BookPostSearchForm modalHandler={modalHandler} onSearch={onSearch} />
// 		</Modal>
// 	);
// };

export default BookPostSearch;

/*
searchData.map(data => {
								const author = data.abbreviatedAuthor;
								// const author = abbreviateAuthor(data.author);
								// let author = data.author;
								// if (author.split('^').length > 1)
								// 	author = `${author.split('^')[0]} 등 ${
								// 		author.split('^').length
								// 	}인`;
								return (
									<li
										key={data.isbn}
										className={Style.ITEM_ON + ' flex'}
										onClick={() => searchItemClickHandler(data)}>
										<figure className="flex-none">
											<img
												className="h-12 w-10"
												src={data.bookImageUrl}
												alt={data.title}
											/>
										</figure>

										<div className=" flex flex-col px-2">
											<div className="w-[200px] truncate">
												<span className=" text-xs font-semibold">
													{data.title}
												</span>
											</div>
											<div className="w-[200px] truncate text-xs text-stone-700">
												<span>{author}</span>
												<span> | </span>
												<span>{data.publisher}</span>
											</div>
										</div>
									</li>
								);
							})
              */
