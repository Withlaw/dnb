import clsx from 'clsx';

const BookStatusSticker = ({
	isRented,
	text,
}: {
	isRented: boolean;
	text: string;
}) => {
	return (
		<div
			className={clsx(
				'flex size-12 items-center rounded-full p-2 text-center text-sm sm:size-10 sm:text-xs',
				isRented ? 'bg-red-100' : 'bg-green-100',
			)}>
			<span>{text}</span>
			{/* {!isRented && <span>대여 가능</span>} */}
		</div>
	);
};

export default BookStatusSticker;
