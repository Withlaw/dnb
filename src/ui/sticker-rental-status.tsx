import clsx from 'clsx';

const RentalStatusSticker = ({ status }: { status: string }) => {
	return (
		<div
			className={clsx(
				'flex size-12 items-center justify-center text-pretty rounded-full text-center',
				status === '대여중' && ' text-red-800',
				status === '반납 완료' && ' text-green-800',
			)}>
			<span>{status}</span>
			{/* {!isRented && <span>대여 가능</span>} */}
		</div>
	);
};

export default RentalStatusSticker;
