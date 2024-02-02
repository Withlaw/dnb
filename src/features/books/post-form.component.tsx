import clsx from 'clsx';
import { FieldValues, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';
import ReactTextareaAutosize from 'react-textarea-autosize';

import FormRow from '@/features/books/post-form-row.component.tsx';
import useImagePreview from '@/features/books/use-image-preview.hook.ts';

type Props = {
	children?: React.ReactNode;
	inputData?: FieldValues;
	// inputData?: Partial<BookDataFromServer>;
	onSubmit?: (data: FieldValues) => void;
	onOpen?: () => void;
};

type UseFormInput = {
	title: string;
	fee: string;
	description: string;
	location: string;
	image_files?: FileList;
};

enum Style {
	INPUT = ' bg-inherit px-1 pb-1 text-base outline-none ',
	INPUTCONTAINER = ' flex items-center justify-between ',
	ERROR = ' border-red-300 border-1 ',
	IMAGE = ' mb-1 mr-1 h-24 w-20 border',
}

const BookPostForm = ({ children, inputData, onSubmit, onOpen }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<UseFormInput>({
		// defaultValues: {...inputData},
		values: {
			title: inputData?.title,
			fee: inputData?.fee,
			description: inputData?.description,
			location: inputData?.location,
		},
	});

	const feeInputValue = watch('fee');
	const imageInputValue = watch('image_files');

	const imagePreview = useImagePreview(imageInputValue);

	const submitHandler = (formData: FieldValues) => {
		if (onSubmit)
			onSubmit({
				...inputData,
				...formData,
			});
	};

	// const submitErrorHandler = (errors: FieldErrors<FieldValues>) => {
	// 	window.alert('양식을 모두 작성해주세요.');
	// 	console.log('err: ', errors);
	// };

	return (
		<form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
			<FormRow name="제목" message={errors.title?.message}>
				<div className={Style.INPUTCONTAINER + ' border-b'} onClick={onOpen}>
					<input
						{...register('title', {
							required: '작성해주세요',
							onChange: onOpen,
						})}
						type="text"
						placeholder="책 제목을 작성해주세요."
						disabled={!onOpen}
						className={Style.INPUT + ' flex-auto truncate'}
					/>
					<span
						className={clsx(
							'flex-none text-xl',
							onOpen ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed',
						)}>
						<HiOutlineSearch />
					</span>
				</div>

				<div className=" flex px-1 pt-2 text-sm">
					{/* <span className=" max-w-[180px] truncate"> */}
					<span className=" max-w-[10rem] truncate">
						{inputData?.author ?? '저자'}
					</span>
					<span className="mx-2">|</span>
					{/* <span className=" w-[200px] min-w-20 truncate"> */}
					<span className=" min-w-20 max-w-[9rem] truncate">
						{inputData?.publisher ?? '출판사'}
					</span>
				</div>
			</FormRow>

			<FormRow name="가격" message={errors.fee?.message}>
				<div className={Style.INPUTCONTAINER}>
					<input
						{...register('fee', {
							required: '작성해주세요',
						})}
						type="number"
						placeholder="책 대여료를 작성해주세요."
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

			<FormRow name="설명" message={errors.description?.message}>
				<ReactTextareaAutosize
					{...register('description', {
						required: '작성해주세요',
					})}
					minRows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					className={Style.INPUT + ' h-auto w-full resize-none'}
				/>
			</FormRow>

			<FormRow name="장소" message={errors.location?.message}>
				<input
					{...register('location', {
						required: '작성해주세요',
					})}
					type="text"
					placeholder="거래할 장소를 입력해주세요."
					className={Style.INPUT + ' w-full'}
				/>
			</FormRow>

			<FormRow name="사진" message={errors.image_files?.message}>
				<div className={Style.INPUTCONTAINER}>
					<figure className="flex flex-wrap space-x-2">
						{inputData?.bookImageUrl && (
							<img
								src={inputData?.bookImageUrl}
								alt="book_image1"
								className={Style.IMAGE}
							/>
						)}
						{inputData?.userImageUrl && (
							<img
								src={inputData?.userImageUrl}
								alt="book_image2"
								className={Style.IMAGE}
							/>
						)}
						{imagePreview && typeof imagePreview === 'string' && (
							<img
								src={imagePreview}
								alt="preview_image"
								className={Style.IMAGE}
							/>
						)}

						{/* 이미지 수정은 아직 불가 */}
						<label
							htmlFor="image-upload"
							className={clsx(
								Style.IMAGE +
									' flex items-center justify-center text-2xl text-stone-600 hover:cursor-pointer',
								!onOpen && ' hidden',
							)}>
							<HiOutlinePlus />
						</label>
						<input
							{...register('image_files', {
								validate: value => {
									if (!value || !value[0] || !onOpen) return;
									if (value[0].size > 5000000)
										return '이미지 파일은 5MB 이하만 가능합니다.';
									else return;
								},
							})}
							id="image-upload"
							type="file"
							accept="image/*"
							className="hidden"
						/>
					</figure>
				</div>
			</FormRow>

			<div className="mt-4">{children}</div>
		</form>
	);
};

export default BookPostForm;
