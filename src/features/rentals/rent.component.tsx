import { RENT } from '@/constants/index.ts';
import useUser from '@/features/authentication/use-user.hook.ts';
import useBook from '@/features/books/use-book.hook.ts';
import { RentalInfoToServer } from '@/features/rentals/rentals.model.ts';
import useRent from '@/features/rentals/use-rent.hook.ts';
import useReturn from '@/features/rentals/use-return.hook.ts';
import Button from '@/ui/button.tsx';

type Props = {
	type: 'rent' | 'return';
	bookId: string;
};

const Rent = ({ type, bookId }: Props) => {
	const { book } = useBook(bookId);
	const { user } = useUser();

	const { rent } = useRent();
	const { returnBook } = useReturn();

	const isRentType = type === 'rent';
	const isReturnType = type === 'return';

	const rentalHandler = () => {
		if (!user || !book) {
			window.alert('로그인이 필요합니다.');
			return;
		}

		const now = new Date();
		const rentalInfo = new RentalInfoToServer({
			endAt: new Date(now.setDate(now.getDate() + RENT.DURATION)).toISOString(),
			numDays: RENT.DURATION,
			customerId: user.id,
			fee: book.fee,
			bookId: +bookId,
			merchantId: book.merchantId,
		});

		if (isRentType) rent(rentalInfo);
		if (isReturnType && book.rentalId) returnBook(book.rentalId);
	};

	if (isRentType && book && !book.rentalId)
		return <Button onClick={rentalHandler}>대여하기</Button>;
	if (isReturnType && book && book.rentalId)
		return <Button onClick={rentalHandler}>반납하기</Button>;
};

export default Rent;
