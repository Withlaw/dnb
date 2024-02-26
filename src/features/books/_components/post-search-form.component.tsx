import { useEffect, useState } from 'react';

import icons from '@/assets/icons.svg';

type Props = {
	onChange: (value: string) => void;
	onOpen: () => void;
	onClose: () => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	isLoading: boolean;
	focusedItemValue: string;
};

const BookPostSearchForm = ({
	onOpen,
	onClose,
	isLoading,
	onChange,
	onKeyDown,
	focusedItemValue,
}: Partial<Props>) => {
	const [inputValue, setInputValue] = useState('');

	const isInputChanging = inputValue.trim() !== '';

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		setInputValue(value);

		if (value.trim() === inputValue.trim()) return; // 띄어쓰기만 할 경우 싹 무시.
		if (onChange) onChange(value);
	};

	useEffect(() => {
		// 검색어 입력 시 드롭다운 창 열기
		if (!onOpen) return;
		if (isInputChanging) onOpen();

		// 검색어 없을 시 드롭다운 창 닫기
		if (!onClose) return;
		if (!isInputChanging) onClose();
	}, [isInputChanging, onOpen, onClose]);

	useEffect(() => {
		setInputValue(focusedItemValue!);
	}, [focusedItemValue]);

	return (
		<form
			className="flex-initial"
			onSubmit={e => {
				e.preventDefault();
			}}>
			{/* className="flex w-80 flex-initial flex-col justify-between rounded-xl border border-solid bg-stone-300 p-4"> */}
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
						value={inputValue}
						onChange={inputChangeHandler}
						autoFocus={true}
						autoComplete="off"
						onKeyDown={onKeyDown}
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
		</form>
	);
};

export default BookPostSearchForm;
