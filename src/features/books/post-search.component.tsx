import { useCallback } from 'react';
import { HiOutlineX } from 'react-icons/hi';

import { BookDataFromTitleSearch } from '@/features/books/_model.ts';
import BookPostSearchForm from '@/features/books/post-search-form.component.tsx';
import BookPostSearchResults from '@/features/books/post-search-results.component.tsx';
import useBookSearch from '@/features/books/use-book-search.hook.ts';
import DropDown from '@/ui/dropdown.tsx';

enum Style {
	ITME = 'px-2 py-1 my-1 text-sm',
	ITEM_ON = Style.ITME + ' hover:bg-stone-200 hover:cursor-pointer',
	ITEM_OFF = Style.ITME + ' hover:cursor-default text-stone-500',
}

type Props = {
	onSearch?: (book: BookDataFromTitleSearch) => void;
	onClose?: () => void;
};

const BookPostSearch = ({ onSearch, onClose }: Props) => {
	const {
		inputValue,
		isTyping,
		inputChangeHandler,
		searchResults,
		hasNextPage,
		scrollEndTarget,
		isLoading,
		isError,
		error,
	} = useBookSearch();
	//

	const searchItemClickHandler = useCallback(
		(data: BookDataFromTitleSearch) => {
			if (onSearch) onSearch(data);
			if (onClose) onClose();
		},
		[onSearch, onClose],
	);

	return (
		<div className="absolute top-[10vh] flex w-full items-center justify-center ">
			<div className="relative">
				<span
					onClick={onClose}
					className="z-2 absolute left-[8px] top-[8px] text-stone-700 hover:cursor-pointer">
					<HiOutlineX size="24" />
				</span>

				<DropDown>
					<div className="flex w-80 flex-col justify-between rounded-xl border border-solid bg-stone-300 p-4">
						<DropDown.Trigger htmlFor="search">
							<BookPostSearchForm
								onChange={inputChangeHandler}
								isLoading={isLoading}
							/>
						</DropDown.Trigger>

						<DropDown.Window name="search">
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
									<li
										ref={scrollEndTarget}
										className="h-10 w-full text-center"></li>
								)}
							</ul>
						</DropDown.Window>
					</div>
				</DropDown>
			</div>
		</div>
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
