import { HiOutlineSearch } from 'react-icons/hi';
import ReactTextareaAutosize from 'react-textarea-autosize';

const styleCard = 'border border-solid border-stone-300 rounded-md my-3 p-3';

const styleLegend = 'px-1 text-sm';

const styleInput = 'bg-inherit px-1 pb-1 text-lg outline-none';

const styleInputContainer = 'flex items-center justify-between';

const BookWritePage = () => {
	return (
		<form className="flex flex-col">
			<fieldset className={styleCard + ' '}>
				<legend className={styleLegend}>제목</legend>
				<div className={styleInputContainer + ' border-b'}>
					<input
						type="text"
						placeholder="책 제목을 입력해주세요."
						className={styleInput}></input>
					<span className="text-xl">
						<HiOutlineSearch />
					</span>
				</div>
				<div className="flex justify-between px-1 pt-2">
					<span className="flex-auto">저자:</span>
					<span className="flex-auto">출판사:</span>
				</div>
			</fieldset>

			<fieldset className={styleCard + ' '}>
				<legend className={styleLegend}>가격</legend>
				<div className={styleInputContainer}>
					<input
						type="number"
						placeholder="대여료를 입력해주세요."
						className={styleInput + ' flex-auto appearance-none'}></input>
					{/* 타이핑시 ₩ 색상 까맣게 효과 */}
					<span className="text-xl text-gray-400">₩</span>
				</div>
			</fieldset>

			<fieldset className={styleCard + ' flex-auto'}>
				<legend className={styleLegend}>설명</legend>
				{/* <textarea
					rows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					className={styleInput + ' h-auto w-full resize-none'}></textarea> */}
				<ReactTextareaAutosize
					minRows={5}
					placeholder="대여하실 책과 관련하여 게시글 내용을 작성해 주세요."
					className={styleInput + ' h-auto w-full resize-none'}
				/>
			</fieldset>

			<fieldset className={styleCard}>
				<span>거래 위치</span>
			</fieldset>

			<fieldset className={styleCard}>
				<div>
					<span>이미지 등록</span>
				</div>
			</fieldset>

			{/* 하단 네비 바 자리에 예약하기버튼 두기 */}
			<div className="my-3">
				<button className="h-8 w-full bg-green-600">작성 완료</button>
			</div>
		</form>
	);
};

export default BookWritePage;
