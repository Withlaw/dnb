import { HiOutlineX } from 'react-icons/hi';

import icons from '@/assets/icons.svg';
import { BookDataFromTitleSearch } from '@/features/books/books.model.ts';
import BookPostSearchResults from '@/features/books/post-search-results.component.tsx';
import useSearchForm from '@/features/books/use-book-search-form.hook.ts';
import useBookSeach from '@/features/books/use-book-search.hook.ts';
import Modal from '@/ui/modal.tsx';

enum Style {
	ITME = 'px-2 py-1 my-1 text-sm',
	ITEM_ON = Style.ITME + ' hover:bg-stone-200 hover:cursor-pointer',
	ITEM_OFF = Style.ITME + ' hover:cursor-default text-stone-500',
}

type Props = {
	modalHandler: () => void;
	onSearch?: (book: BookDataFromTitleSearch) => void;
};

const BookPostSearch = ({ modalHandler, onSearch }: Props) => {
	const { formRef, inputValue, inputChangeHandler, isInputChange } =
		useSearchForm();
	const { debouncedValue, searchData, isLoading, isError, error } =
		useBookSeach(inputValue);

	const isTyping = inputValue !== debouncedValue;

	const searchItemClickHandler = (data: BookDataFromTitleSearch) => {
		if (onSearch) onSearch(data);
		modalHandler();
	};

	// const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	console.log('form submit');
	// };

	return (
		<Modal className="top-[10vh] flex flex-col" onClose={modalHandler}>
			{/* 이 아래는 다시 dropdown으로 추상화 할 수 있음 */}
			<form
				ref={formRef}
				className="flex w-80 flex-initial flex-col justify-between rounded-xl border border-solid bg-stone-300 p-4">
				<div onClick={modalHandler} className="z-10 hover:cursor-pointer">
					<span className="absolute left-[8px] top-[8px] text-stone-700">
						<HiOutlineX size="24" />
					</span>
				</div>

				<div>
					<div className="mb-3 text-center ">
						<label
							htmlFor="search"
							className="text-lg font-semibold text-stone-700">
							도서 검색
						</label>
					</div>
					<div className="relative flex items-center justify-between">
						<input
							type="text"
							id="search"
							name="search"
							placeholder="검색어를 입력해주세요."
							onChange={inputChangeHandler}
							autoFocus={true}
							className="h-10 flex-auto rounded-md px-3 text-sm outline-none autofill:bg-[#fff] focus:border focus:border-solid focus:border-stone-800"
						/>

						{isLoading && (
							<div className="absolute right-2">
								<svg className="size-6 animate-spin fill-stone-500">
									<use href={`${icons}#icon-loader`}></use>
								</svg>
							</div>
						)}

						{/* <button className="ml-2 flex-initial rounded-md border border-solid bg-green-700 px-3 py-2 text-sm text-stone-50">
							검색
						</button> */}
					</div>
				</div>
				{isInputChange && (
					<ul className="mt-2 max-h-72 min-h-16 flex-auto divide-y overflow-y-auto rounded-md bg-[#fff]">
						{isTyping && (
							<li className={Style.ITEM_OFF}>
								{/* <span>입력 중 ...</span> */}
								<span>{inputValue}</span>
							</li>
						)}

						{!isTyping && isLoading && (
							<li className={Style.ITEM_OFF}>
								<span>검색 중 ...</span>
							</li>
						)}

						{!isTyping && searchData && (
							<BookPostSearchResults
								searchData={searchData}
								onClick={searchItemClickHandler}
							/>
						)}

						{!isTyping && searchData && searchData.length === 0 && (
							<li className={Style.ITEM_OFF}>
								<span>찾으시는 책이 존재하지 않습니다.</span>
							</li>
						)}

						{!isTyping && !isLoading && isError && (
							<li className={Style.ITEM_OFF}>
								<span>서버에 연결할 수 없습니다.</span>
								<span>{error?.message}</span>
							</li>
						)}
					</ul>
				)}

				{/* 무한스크롤 */}
			</form>
		</Modal>
	);
};

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
