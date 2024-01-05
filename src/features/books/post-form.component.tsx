import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { HiOutlineSearch } from 'react-icons/hi';
import ReactTextareaAutosize from 'react-textarea-autosize';

import FormRow from '@/features/books/post-form-row.component.tsx';

type Props = {
	children?: React.ReactNode;
	inputData?: {
		[k: string]: string;
	};
	onSubmit?: (data: any) => void;
	onClick?: () => void;
};

type UseFormInput = {
	title: string;
	fee: string;
	description: string;
	location: string;
};

enum Style {
	INPUT = 'bg-inherit px-1 pb-1 text-lg outline-none',
	INPUTCONTAINER = 'flex items-center justify-between',
	ERROR = 'border-red-300 border-1',
}

const BookPostForm = ({ children, inputData, onSubmit, onClick }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UseFormInput>({
		defaultValues: {
			title: inputData?.title,
			fee: inputData?.fee,
			description: inputData?.description,
		},
	});

	const feeInputValue = watch('fee');

	const submitHandler = (formData: FieldValues) => {
		console.log(formData);
	};
	const submitErrorHandler = (errors: FieldErrors<FieldValues>) => {
		console.log(errors);
	};

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit(submitHandler, submitErrorHandler)}>
			<FormRow name="제목" className={errors?.title?.message}>
				<div className={Style.INPUTCONTAINER + ' border-b'} onClick={onClick}>
					<input
						{...register('title', {
							required: Style.ERROR,
							disabled: !!inputData?.title,
							onChange: onClick,
						})}
						type="text"
						placeholder="책 제목을 작성해주세요."
						autoFocus={false}
						className={Style.INPUT}></input>
					<span className="text-xl">
						<HiOutlineSearch />
					</span>
				</div>
				<div className="flex justify-between px-1 pt-2">
					<span className="flex-auto">저자: {inputData?.author}</span>
					<span className="flex-auto">출판사: {inputData?.publisher}</span>
				</div>
			</FormRow>

			<FormRow name="가격" className={errors?.fee?.message}>
				<div className={Style.INPUTCONTAINER}>
					<input
						{...register('fee', {
							required: Style.ERROR,
						})}
						type="number"
						placeholder="대여료를 입력해주세요."
						className={Style.INPUT + ' flex-auto appearance-none'}></input>
					<span
						className={
							'text-xl text-gray-400 ' + (feeInputValue ? 'text-gray-800' : '')
						}>
						₩
					</span>
				</div>
			</FormRow>

			<FormRow name="설명" className={errors?.description?.message}>
				<ReactTextareaAutosize
					{...register('description', {
						required: Style.ERROR,
					})}
					minRows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					className={Style.INPUT + ' h-auto w-full resize-none'}
				/>
			</FormRow>

			<FormRow name="장소" className={errors?.location?.message}>
				<input
					type="text"
					placeholder="거래할 장소를 입력해주세요."
					{...register('location', {
						required: Style.ERROR,
					})}
					className={Style.INPUT + ' w-full'}></input>
			</FormRow>

			<FormRow name="사진">
				<div className={Style.INPUTCONTAINER}>
					<span>사진: </span>
				</div>
			</FormRow>

			{/* 하단 네비 바 자리에 예약하기버튼 두기 */}
			<div className="my-3">{children}</div>
		</form>
	);
};

export default BookPostForm;
