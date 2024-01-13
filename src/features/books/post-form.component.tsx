import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';
import ReactTextareaAutosize from 'react-textarea-autosize';

import FormRow from '@/features/books/post-form-row.component.tsx';
import useImagePreview from '@/features/books/use-image-preview.ts';

type Props = {
	children?: React.ReactNode;
	inputData?: FieldValues;
	// inputData?: Partial<BookDataFromServer>;
	onSubmit?: (data: FieldValues) => void;
	onTitleSearch?: () => void;
};

type UseFormInput = {
	title: string;
	fee: string;
	description: string;
	location: string;
	image_files?: FileList;
};

enum Style {
	INPUT = ' bg-inherit px-1 pb-1 text-lg outline-none ',
	INPUTCONTAINER = ' flex items-center justify-between ',
	ERROR = ' border-red-300 border-1 ',
	IMAGE = ' mb-1 mr-1 h-24 w-20 border',
}

const BookPostForm = ({
	children,
	inputData,
	onSubmit,
	onTitleSearch,
}: Props) => {
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

	const submitErrorHandler = (errors: FieldErrors<FieldValues>) => {
		// window.alert('양식을 모두 작성해주세요.');
		// console.log('err: ', errors);
	};

	console.log('errors: ', errors, 'imageInputValue:', imageInputValue?.[0]);

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit(submitHandler, submitErrorHandler)}>
			<FormRow name="제목" message={errors.title?.message}>
				<div
					className={Style.INPUTCONTAINER + ' border-b'}
					onClick={onTitleSearch}>
					<input
						{...register('title', {
							required: '작성해주세요',
							onChange: onTitleSearch,
						})}
						type="text"
						placeholder="책 제목을 작성해주세요."
						disabled={!onTitleSearch}
						className={Style.INPUT + ' flex-auto truncate'}
					/>
					<span
						className={clsx(
							'flex-none text-xl',
							onTitleSearch
								? 'hover:cursor-pointer'
								: 'hover:cursor-not-allowed',
						)}>
						<HiOutlineSearch />
					</span>
				</div>

				<div className=" flex px-1 pt-2">
					{/* <span className=" max-w-[180px] truncate"> */}
					<span className=" max-w-[9rem] truncate">
						{inputData?.author ?? '저자'}
					</span>
					<span className="mx-2">|</span>
					{/* <span className=" w-[200px] min-w-20 truncate"> */}
					<span className=" min-w-20 max-w-[8rem] truncate">
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
							<img src={inputData?.bookImageUrl} className={Style.IMAGE} />
						)}
						{imagePreview && typeof imagePreview === 'string' && (
							<img
								src={imagePreview}
								alt="preview_image"
								className={Style.IMAGE}
							/>
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
							{...register('image_files', {
								validate: value => {
									if (!value) return;
									if (value[0].size > 5000000)
										return '이미지 파일은 5MB 이하만 가능합니다.';
									else return;
								},
							})}
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
