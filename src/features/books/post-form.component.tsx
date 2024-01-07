import clsx from 'clsx';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';
import ReactTextareaAutosize from 'react-textarea-autosize';

import FormRow from '@/features/books/post-form-row.component.tsx';

type Props = {
	children?: React.ReactNode;
	inputData?: FieldValues;
	onSubmit?: (data: FieldValues) => void;
	onTitle?: () => void;
};

type UseFormInput = {
	title: string;
	fee: string;
	description: string;
	location: string;
	image_files: FileList;
};

enum Style {
	INPUT = ' bg-inherit px-1 pb-1 text-lg outline-none ',
	INPUTCONTAINER = ' flex items-center justify-between ',
	ERROR = ' border-red-300 border-1 ',
	IMAGE = ' mb-1 mr-1 h-24 w-20',
}

const BookPostForm = ({ children, inputData, onSubmit, onTitle }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		// } = useForm<UseFormInput>();
	} = useForm<UseFormInput>({
		defaultValues: {
			title: inputData?.title,
			fee: inputData?.fee,
			description: inputData?.description,
			location: inputData?.location,
		},
	});

	const feeInputValue = watch('fee');

	const submitHandler = (formData: FieldValues) => {
		if (onSubmit)
			onSubmit({
				...inputData,
				...formData,
			});
	};
	const submitErrorHandler = (errors: FieldErrors<FieldValues>) => {
		// window.alert('양식을 모두 작성해주세요.');
		// console.log('err: ', errors);
	};

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit(submitHandler, submitErrorHandler)}>
			<FormRow name="제목" isError={!!errors?.title}>
				<div className={Style.INPUTCONTAINER + ' border-b'} onClick={onTitle}>
					<input
						{...register('title', {
							required: true,
							onChange: onTitle,
						})}
						type="text"
						placeholder="책 제목을 작성해주세요."
						defaultValue={inputData?.title}
						disabled={!onTitle}
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

			<FormRow name="가격" isError={!!errors?.fee}>
				<div className={Style.INPUTCONTAINER}>
					<input
						{...register('fee', {
							required: true,
						})}
						type="number"
						placeholder="책 대여료를 작성해주세요."
						defaultValue={inputData?.fee}
						className={Style.INPUT + ' flex-auto appearance-none'}
					/>
					<span
						className={clsx(
							'text-xl',
							feeInputValue ? 'text-gray-800' : 'text-gray-400',
						)}>
						₩
					</span>
				</div>
			</FormRow>

			<FormRow name="설명" isError={!!errors?.description}>
				<ReactTextareaAutosize
					{...register('description', {
						required: true,
					})}
					minRows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					defaultValue={inputData?.description}
					className={Style.INPUT + ' h-auto w-full resize-none'}
				/>
			</FormRow>

			<FormRow name="장소" isError={!!errors?.location}>
				<input
					{...register('location', {
						required: true,
					})}
					type="text"
					placeholder="거래할 장소를 입력해주세요."
					defaultValue={inputData?.location}
					className={Style.INPUT + ' w-full'}
				/>
			</FormRow>

			<FormRow name="사진">
				<div className={Style.INPUTCONTAINER}>
					<figure className="flex flex-wrap">
						{inputData?.imageUrl && (
							<img src={inputData?.imageUrl} className={Style.IMAGE} />
						)}

						<label
							htmlFor="image-upload"
							className={
								Style.IMAGE +
								' flex items-center justify-center text-2xl text-stone-600 hover:cursor-pointer'
							}>
							<HiOutlinePlus />
						</label>
						{/* 이미지 미리보기 제공을 위해 이미지 컴포넌트 만들어야 할 듯 */}
						<input
							id="image-upload"
							type="file"
							accept="image/*"
							className="hidden"
							// multiple 용량 안정화 이후에 사용할 것.
							{...register('image_files')}
						/>
					</figure>
				</div>
			</FormRow>

			{/* 하단 네비 바 자리에 예약하기버튼 두기 */}
			<div className="my-3">{children}</div>
		</form>
	);
};

export default BookPostForm;
