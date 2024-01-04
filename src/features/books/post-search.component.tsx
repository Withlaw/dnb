import { useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';

import Modal from '@/ui/modal.tsx';

type Props = {
	modalHandler: () => void;
};

const BookPostSearch = ({ modalHandler }: Props) => {
	const form = useRef<HTMLFormElement>(null);

	return (
		<Modal className="top-[-400px]">
			<form
				ref={form}
				className="flex w-80 flex-col justify-between rounded-xl border border-solid bg-stone-100 p-4">
				<Modal.BtnClose onClose={modalHandler}>
					<span className="absolute left-[6px] top-[6px] text-2xl text-stone-700">
						<HiOutlineX />
					</span>
				</Modal.BtnClose>
				<fieldset className="relative">
					{/* <button >
						
					</button> */}
					<div className="my-3 text-center text-lg font-semibold">
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
			</form>
		</Modal>
	);
};

export default BookPostSearch;
