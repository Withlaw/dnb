import { useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';

import Modal from '@/ui/modal.tsx';

type Props = {
	modalHandler: () => void;
};

const styleLi = 'p-2 text-sm hover:bg-stone-200 hover:cursor-pointer';

const BookPostSearch = ({ modalHandler }: Props) => {
	const form = useRef<HTMLFormElement>(null);

	return (
		<Modal className="top-[-200px] flex flex-col" onClose={modalHandler}>
			<form
				ref={form}
				className="flex w-80 flex-initial flex-col justify-between rounded-xl border border-solid bg-stone-100 p-4">
				<button onClick={modalHandler} className="z-10">
					<span className="absolute left-[8px] top-[8px] text-stone-700">
						<HiOutlineX size="24" />
					</span>
				</button>

				<fieldset>
					<div className="mb-3 text-center text-lg font-semibold">
						<label htmlFor="search">제목으로 책 검색하기</label>
					</div>
					<div className="flex justify-between ">
						<input
							id="search"
							name="search"
							type="text"
							placeholder="검색어를 입력해주세요."
							autoFocus={true}
							className="h-10 flex-auto rounded-md px-3 text-sm outline-none autofill:bg-[#fff] focus:border focus:border-solid focus:border-green-700"
						/>

						{/* <button className="ml-2 flex-initial rounded-md border border-solid bg-green-700 px-3 py-2 text-sm text-stone-50">
							검색
						</button> */}
					</div>
				</fieldset>

				<ul className="mt-2 flex h-[30vh] flex-auto flex-col overflow-y-auto rounded-md bg-[#fff]">
					<li className={styleLi}>
						<span>
							검색어 없음 검색어 없음 검색어 없음 검색어 없음 검색어 없음 검색어
							없음 검색어 없음 검색어 없음 검색어 없음 검색어 없음 검색어 없음
						</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					<li className={styleLi}>
						<span>검색어 없음</span>
					</li>
					{/* 무한스크롤 */}
				</ul>
			</form>
		</Modal>
	);
};

export default BookPostSearch;
