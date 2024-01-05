import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';
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
	INPUT = 'bg-inherit px-1 pb-1 text-lg outline-none ',
	INPUTCONTAINER = 'flex items-center justify-between ',
	ERROR = 'border-red-300 border-1 ',
	IMAGE = 'mb-1 mr-1 h-24 w-20',
}

const BookPostForm = ({ children, inputData, onSubmit, onClick }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<UseFormInput>({
		defaultValues: {
			title: inputData?.title,
			fee: inputData?.fee,
			description: inputData?.description,
		},
	});

	if (inputData?.title) setValue('title', inputData.title);

	const feeInputValue = watch('fee');

	const submitHandler = (formData: FieldValues) => {
		console.log('suc: ', formData, !!errors);
	};
	const submitErrorHandler = (errors: FieldErrors<FieldValues>) => {
		// window.alert('양식을 모두 작성해주세요.');
		console.log('err: ', errors);
	};

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit(submitHandler, submitErrorHandler)}>
			<FormRow
				name="제목"
				className={errors?.title?.message}
				isError={!!errors?.title?.message}>
				<div className={Style.INPUTCONTAINER + ' border-b'} onClick={onClick}>
					<input
						{...register('title', {
							required: Style.ERROR,
							onChange: onClick,
						})}
						type="text"
						placeholder="책 제목을 작성해주세요."
						// defaultValue={inputData?.title}
						className={Style.INPUT + ' flex-auto truncate'}
					/>
					<span className="flex-none text-xl">
						<HiOutlineSearch />
					</span>
				</div>
				<div className=" flex items-end px-1 pt-2">
					<span className=" max-w-[180px] truncate">
						저자 {inputData?.author}
					</span>
					<span className="mx-2">|</span>
					<span className=" w-[200px] min-w-20 truncate">
						출판사 {inputData?.publisher}
					</span>
				</div>
			</FormRow>

			<FormRow
				name="가격"
				className={errors?.fee?.message}
				isError={!!errors?.fee?.message}>
				<div className={Style.INPUTCONTAINER}>
					<input
						{...register('fee', {
							required: Style.ERROR,
						})}
						type="number"
						placeholder="책 대여료를 작성해주세요."
						// defaultValue={inputData?.fee}
						className={Style.INPUT + ' flex-auto appearance-none'}
					/>
					<span
						className={
							'text-xl text-gray-400 ' + (feeInputValue ? 'text-gray-800' : '')
						}>
						₩
					</span>
				</div>
			</FormRow>

			<FormRow
				name="설명"
				className={errors?.description?.message}
				isError={!!errors?.description?.message}>
				<ReactTextareaAutosize
					{...register('description', {
						required: Style.ERROR,
					})}
					minRows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					// defaultValue={inputData?.description}
					className={Style.INPUT + ' h-auto w-full resize-none'}
				/>
			</FormRow>

			<FormRow
				name="장소"
				className={errors?.location?.message}
				isError={!!errors?.location?.message}>
				<input
					{...register('location', {
						required: Style.ERROR,
					})}
					type="text"
					placeholder="거래할 장소를 입력해주세요."
					// defaultValue={inputData?.location}
					className={Style.INPUT + ' w-full'}
				/>
			</FormRow>

			<FormRow name="사진">
				<div className={Style.INPUTCONTAINER}>
					<figure className="flex flex-wrap">
						{inputData?.imageUrl && (
							<img src={inputData?.imageUrl} className={Style.IMAGE} />
						)}

						<span
							className={
								Style.IMAGE +
								' flex items-center justify-center text-2xl text-stone-600 hover:cursor-pointer'
							}>
							<HiOutlinePlus />
						</span>
					</figure>
				</div>
			</FormRow>

			{/* 하단 네비 바 자리에 예약하기버튼 두기 */}
			<div className="my-3">{children}</div>
		</form>
	);
};

export default BookPostForm;
