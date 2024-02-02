import { BookDataFromServer } from '@/features/books/model.ts';
import useReturn from '@/features/rentals/use-return.hook.ts';
import { UserDataFromServer } from '@/features/users/model.ts';
import Button from '@/ui/button.tsx';

type Props = {
	book: BookDataFromServer;
	user?: UserDataFromServer | null;
};

const Return = ({ book, user }: Props) => {
	const { returnBook } = useReturn();

	const isMyRent = user && user.id === book.customerId;

	const returnHandler = () => {
		const isConfirmed = window.confirm('반납하시겠습니까?');
		if (!isConfirmed) return;

		returnBook(book.rentalId!);
	};

	if (!user || (!book.rentalId && !isMyRent)) return null;

	return <Button onClick={returnHandler}>반납하기</Button>;
};

export default Return;
