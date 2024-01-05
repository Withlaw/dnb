import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';

import icons from '@/assets/icons.svg';
import { BookSearchDataItem, BookSearchData } from '@/features/books/types.ts';
import { abbreviateAuthor } from '@/features/books/utils.ts';
import useDebounceValue from '@/hooks/use-debounce-value.tsx';
import { booksService } from '@/services/books-service.ts';
import Modal from '@/ui/modal.tsx';

enum Style {
	ITME = 'px-2 py-1 my-1 text-sm',
	ITEM_ON = Style.ITME + ' hover:bg-stone-200 hover:cursor-pointer',
	ITEM_OFF = Style.ITME + ' hover:cursor-default text-stone-500',
}

type Props = {
	modalHandler: () => void;
	onSearch?: (book: BookSearchDataItem) => void;
};

const BookPostSearch = ({ modalHandler, onSearch }: Props) => {
	const form = useRef<HTMLFormElement>(null);
	const [inputValue, setInputValue] = useState('');
	const debouncedInputValue = useDebounceValue(inputValue, 500);

	const { data, isLoading } = useQuery({
		enabled: !!debouncedInputValue,
		queryKey: ['bookSearch', debouncedInputValue],
		queryFn: () => booksService.searchBook<BookSearchData>(debouncedInputValue),
		staleTime: 60 * 1000,
	});

	const searchData: BookSearchDataItem[] | undefined = data?.items;
	const isEmptySearchInput = inputValue.trim() === '';
	const isTyping = inputValue !== debouncedInputValue;
	const isFalied = !searchData;

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('form submit');
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		if (value.trim() === inputValue.trim()) return; // 띄어쓰기만 할 경우 싹 무시.
		setInputValue(value);
	};

	const searchItemClickHandler = (data: BookSearchDataItem) => {
		if (onSearch) onSearch(data);
		modalHandler();
	};

	return (
		<Modal className="top-[10vh] flex flex-col" onClose={modalHandler}>
			<form
				ref={form}
				onSubmit={submitHandler}
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
				{!isEmptySearchInput && (
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

						{!isTyping &&
							searchData &&
							searchData.map(data => {
								const author = abbreviateAuthor(data.author);
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
												src={data.image}
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
							})}

						{!isTyping && searchData && searchData.length === 0 && (
							<li className={Style.ITEM_OFF}>
								<span>찾으시는 책이 존재하지 않습니다.</span>
							</li>
						)}

						{!isTyping && !isLoading && isFalied && (
							<li className={Style.ITEM_OFF}>
								<span>서버에 연결할 수 없습니다.</span>
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
