import { RENT } from '@/constants/index.ts';
import { BookDataFromServer } from '@/features/books/_model.ts';
import useConfirm from '@/features/confirmation/use-confirm.hook.ts';
import useNotice from '@/features/notification/use-notice.hook.ts';
import { RentalInfoToServer } from '@/features/rentals/_model.ts';
import useRent from '@/features/rentals/use-rent.hook.ts';
import { UserDataFromServer } from '@/features/users/_model.ts';
import Button from '@/ui/button.tsx';

type Props = {
	book: BookDataFromServer;
	user?: UserDataFromServer | null;
};

const Rent = ({ book, user }: Props) => {
	const { confirm } = useConfirm();
	const { rent } = useRent();
	const { notify } = useNotice();

	const isMyRent = user && user.id === book.customerId;

	const rentalHandler = () => {
		if (!user) {
			notify('로그인이 필요합니다', { type: 'error' });
			return;
		}

		confirm(`"${book.title}" 책을 대여 하시겠습니까?`, () => {
			const now = new Date();
			const rentalInfo = new RentalInfoToServer({
				endAt: new Date(
					now.setDate(now.getDate() + RENT.DURATION),
				).toISOString(),
				numDays: RENT.DURATION,
				customerId: user.id,
				fee: book.fee,
				bookId: book.id,
				merchantId: book.merchantId,
			});

			rent(rentalInfo);
		});

		// const isConfirmed = window.confirm(
		// 	`"${book.title}" 책을 대여 하시겠습니까?`,
		// );
		// if (!isConfirmed) return;

		// const now = new Date();
		// const rentalInfo = new RentalInfoToServer({
		// 	endAt: new Date(now.setDate(now.getDate() + RENT.DURATION)).toISOString(),
		// 	numDays: RENT.DURATION,
		// 	customerId: user.id,
		// 	fee: book.fee,
		// 	bookId: book.id,
		// 	merchantId: book.merchantId,
		// });

		// rent(rentalInfo);
	};

	if (isMyRent) return null;

	return (
		<Button
			onClick={rentalHandler}
			options={{ disabled: Boolean(book.rentalId) }}>
			대여하기
		</Button>
	);
};

export default Rent;
