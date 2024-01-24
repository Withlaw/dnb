import { RENT } from '@/constants/index.ts';
import { BookDataFromServer } from '@/features/books/books.model.ts';
import { RentalInfoToServer } from '@/features/rentals/rentals.model.ts';
import useRent from '@/features/rentals/use-rent.hook.ts';
import { UserDataFromServer } from '@/features/users/users.model.ts';
import Button from '@/ui/button.tsx';

type Props = {
	book: BookDataFromServer;
	user?: UserDataFromServer | null;
};

const Rent = ({ book, user }: Props) => {
	const { rent } = useRent();

	const rentalHandler = () => {
		if (!user) {
			window.alert('로그인이 필요합니다.');
			return;
		}

		const isConfirmed = window.confirm(
			`"${book.title}" 책을 대여 하시겠습니까?`,
		);
		if (!isConfirmed) return;

		const now = new Date();
		const rentalInfo = new RentalInfoToServer({
			endAt: new Date(now.setDate(now.getDate() + RENT.DURATION)).toISOString(),
			numDays: RENT.DURATION,
			customerId: user.id,
			fee: book.fee,
			bookId: book.id,
			merchantId: book.merchantId,
		});

		rent(rentalInfo);
	};

	if (book.rentalId) return null;

	return <Button onClick={rentalHandler}>대여하기</Button>;
};

export default Rent;
