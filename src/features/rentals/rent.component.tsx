import useUser from '@/features/authentication/use-user.hook.ts';
import useBook from '@/features/books/use-book.hook.ts';
import { RentalInfoToServer } from '@/features/rentals/rentals.model.ts';
import useRent from '@/features/rentals/use-rent.ts';
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

	const rentalHandler = () => {
		if (!user || !book) return;

		const now = new Date();
		const rentalInfo = new RentalInfoToServer({
			endAt: new Date(now.setDate(now.getDate() + 10)).toISOString(),
			numDays: 10,
			customerId: user.id,
			fee: book.fee,
			bookId: +bookId,
			merchantId: book.merchantId,
		});

		if (type === 'rent') rent(rentalInfo);
		if (type === 'return' && book.rentalId) returnBook(book.rentalId);
	};

	if (type === 'rent' && !book?.rentalId)
		return <Button onClick={rentalHandler}>예약하기</Button>;
	if (type === 'return' && book?.rentalId)
		return <Button onClick={rentalHandler}>반납하기</Button>;
};

export default Rent;
