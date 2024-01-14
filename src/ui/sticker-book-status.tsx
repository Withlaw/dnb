import clsx from 'clsx';

const BookStatusSticker = ({ status }: { status: string }) => {
	return (
		<div
			className={clsx(
				'flex size-12 items-center rounded-full p-2 text-center text-sm sm:size-10 sm:text-xs',
				status === '대여 가능' && 'bg-green-100',
				status === '대여 불가' && 'bg-red-100',
			)}>
			<span>{status}</span>
			{/* {!isRented && <span>대여 가능</span>} */}
		</div>
	);
};

export default BookStatusSticker;
