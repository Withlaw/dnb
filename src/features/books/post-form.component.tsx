import { useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import ReactTextareaAutosize from 'react-textarea-autosize';

import Button from '@/ui/button.tsx';

enum FormStyle {
	CARD = 'border border-solid border-stone-300 rounded-md my-3 p-3',
	INPUT = 'bg-inherit px-1 pb-1 text-lg outline-none',
	INPUTCONTAINER = 'flex items-center justify-between',
	LEGEND = 'px-1 text-sm',
}

type Props = {
	children?: React.ReactNode;
	inputData?: any;
	onSubmit?: (data: any) => void;
};

const PostForm = ({ children, inputData, onSubmit }: Props) => {
	const formRef = useRef<HTMLFormElement>(null);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className="flex flex-col" onSubmit={submitHandler} ref={formRef}>
			<fieldset className={FormStyle.CARD}>
				<legend className={FormStyle.LEGEND}>제목</legend>
				<div className={FormStyle.INPUTCONTAINER + ' border-b'}>
					<input
						type="text"
						name="title"
						placeholder="책 제목을 입력해주세요."
						defaultValue={(inputData as string) ?? ''}
						required
						className={FormStyle.INPUT}></input>
					<span className="text-xl">
						<HiOutlineSearch />
					</span>
				</div>
				<div className="flex justify-between px-1 pt-2">
					<span className="flex-auto">저자: {(inputData as string) ?? ''}</span>
					<span className="flex-auto">
						출판사: {(inputData as string) ?? ''}
					</span>
				</div>
			</fieldset>

			<fieldset className={FormStyle.CARD}>
				<legend className={FormStyle.LEGEND}>가격</legend>
				<div className={FormStyle.INPUTCONTAINER}>
					<input
						type="number"
						name="fee"
						placeholder="대여료를 입력해주세요."
						defaultValue={(inputData as string) ?? ''}
						required
						className={FormStyle.INPUT + ' flex-auto appearance-none'}></input>
					{/* 타이핑시 ₩ 색상 까맣게 효과 */}
					<span className="text-xl text-gray-400">₩</span>
				</div>
			</fieldset>

			<fieldset className={FormStyle.CARD + ' flex-auto'}>
				<legend className={FormStyle.LEGEND}>설명</legend>
				{/* <textarea
					rows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					className={FormStyle.INPUT + ' h-auto w-full resize-none'}></textarea> */}
				<ReactTextareaAutosize
					minRows={5}
					name="description"
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					defaultValue={(inputData as string) ?? ''}
					className={FormStyle.INPUT + ' h-auto w-full resize-none'}
				/>
			</fieldset>

			<fieldset className={FormStyle.CARD}>
				<span>거래 위치</span>
			</fieldset>

			<fieldset className={FormStyle.CARD}>
				<div>
					<span>이미지 등록</span>
				</div>
			</fieldset>

			{/* 하단 네비 바 자리에 예약하기버튼 두기 */}
			<div className="my-3">{children}</div>
		</form>
	);
};

export default PostForm;
