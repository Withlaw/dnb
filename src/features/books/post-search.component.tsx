import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';

import useDebounceValue from '@/hooks/useDebounceValue.tsx';
import Modal from '@/ui/modal.tsx';

type Props = {
	modalHandler: () => void;
};

const styleLi = 'p-2 my-[2px] text-sm hover:bg-stone-200 hover:cursor-pointer';

let timer: number;

const BookPostSearch = ({ modalHandler }: Props) => {
	const form = useRef<HTMLFormElement>(null);
	const [inputValue, setInputValue] = useState('');
	const debouncedInputValue = useDebounceValue(inputValue, 3000);

	const isEmpty = inputValue.trim() === '';

	const { data, isError, isLoading } = useQuery({
		enabled: !!debouncedInputValue,
		queryKey: ['bookSearch', debouncedInputValue],
		queryFn: async () => {
			const res = await window.fetch(
				`/api/v1/search/book.json?query=${debouncedInputValue}&display=10&start=11`,
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Naver-Client-Id': 'PwRdiC58vvV7ceT9zpiz',
						'X-Naver-Client-Secret': '6fgQOqYDoS',
					},
				},
			);
			const data = await res.json();
			return data;
		},
		staleTime: 60 * 1000,
	});

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('form submit');
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		if (value.trim() === inputValue.trim()) return; // 띄어쓰기만 할 경우 싹 무시.
		console.log('입력: ', value);
		setInputValue(value);
	};
	/*
	useEffect(() => {
		const bookSearch = async () => {
			const res = await window.fetch(
				'/api/v1/search/book.json?query=자바&display=10&start=11',
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Naver-Client-Id': 'PwRdiC58vvV7ceT9zpiz',
						'X-Naver-Client-Secret': '6fgQOqYDoS',
					},
				},
			);

			const data = await res.json();

			console.log(data);
		};

		try {
			bookSearch();
		} catch (error) {
			console.log(error);
		}
	}, []);


  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      try {
        const data = await getSearchData(searchKeyword);
        setSearchData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error! ', error);
      }
    }, DEBOUNCE_TIMEOUT_SEC * 1000);
    return () => clearTimeout(debounceTimeout);
  }, [searchKeyword]);
*/
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
							제목으로 책 검색하기
						</label>
					</div>
					<div className="flex justify-between ">
						<input
							type="text"
							id="search"
							name="search"
							placeholder="검색어를 입력해주세요."
							onChange={inputChangeHandler}
							autoFocus={true}
							className="h-10 flex-auto rounded-md px-3 text-sm outline-none autofill:bg-[#fff] focus:border focus:border-solid focus:border-stone-800"
						/>

						{/* <button className="ml-2 flex-initial rounded-md border border-solid bg-green-700 px-3 py-2 text-sm text-stone-50">
							검색
						</button> */}
					</div>
				</div>

				{!isEmpty && (
					<ul className="mt-2 flex max-h-72 min-h-16 flex-auto flex-col overflow-y-auto rounded-md bg-[#fff]">
						<li className={'my-[2px] p-2 text-sm hover:cursor-default'}>
							<span>검색중...</span>
						</li>
					</ul>
				)}
				{/* <ul className="mt-2 flex h-[30vh] flex-auto flex-col overflow-y-auto rounded-md bg-[#fff]">
					<li className={styleLi}>
						<span>
							검색어 없음 검색어 없음 검색어 없음 검색어 없음 검색어 없음 검색어
							없음 검색어 없음 검색어 없음 검색어 없음 검색어 없음 검색어 없음
						</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
				</ul> */}
				{/* 무한스크롤 */}
			</form>
		</Modal>
	);
};

export default BookPostSearch;
