import { HiOutlineX } from 'react-icons/hi';

import icons from '@/assets/icons.svg';
import { BookDataFromTitleSearch } from '@/features/books/books.model.ts';
import BookPostSearchResults from '@/features/books/post-search-results.component.tsx';
import useSearchForm from '@/features/books/use-book-search-form.hook.ts';
import useBookSeach from '@/features/books/use-book-search.hook.ts';

enum Style {
	ITME = 'px-2 py-1 my-1 text-sm',
	ITEM_ON = Style.ITME + ' hover:bg-stone-200 hover:cursor-pointer',
	ITEM_OFF = Style.ITME + ' hover:cursor-default text-stone-500',
}

type Props = {
	modalHandler: () => void;
	onSearch?: (book: BookDataFromTitleSearch) => void;
};

const BookPostSearchForm = ({ modalHandler, onSearch }: Props) => {
	const { formRef, inputValue, inputChangeHandler, isInputChange } =
		useSearchForm();
	// const { debouncedValue, searchData, isLoading, isError, error } =
	// 	useBookSeach(inputValue);

	const {
		debouncedValue,
		searchResults,
		hasNextPage,
		scrollEndTarget,
		isLoading,
		isError,
		error,
	} = useBookSeach(inputValue);

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
		<form
			ref={formRef}
			className="flex w-80 flex-initial flex-col justify-between rounded-xl border border-solid bg-stone-300 p-4">
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

					{!isTyping && searchResults && (
						<BookPostSearchResults
							searchData={searchResults}
							onClick={searchItemClickHandler}
						/>
					)}

					{!isTyping &&
						!isLoading &&
						searchResults &&
						searchResults?.length === 0 && (
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

					{/* 무한스크롤 */}
					{!isTyping && !isLoading && hasNextPage && (
						<div ref={scrollEndTarget} className="h-10 text-center"></div>
					)}
				</ul>
			)}
		</form>
	);
};

export default BookPostSearchForm;
