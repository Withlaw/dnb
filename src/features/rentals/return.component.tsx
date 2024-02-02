import { BookDataFromServer } from '@/features/books/books.model.ts';
import useReturn from '@/features/rentals/use-return.hook.ts';
import { UserDataFromServer } from '@/features/users/users.model.ts';
import Button from '@/ui/button.tsx';

type Props = {
	book: BookDataFromServer;
	user?: UserDataFromServer | null;
};

const Return = ({ book, user }: Props) => {
	const { returnBook } = useReturn();

	const isRent = Boolean(user?.id === book.customerId);

	const returnHandler = () => {
		const isConfirmed = window.confirm('반납하시겠습니까?');
		if (!isConfirmed) return;

		returnBook(book.rentalId!);
	};

	if (!book.rentalId && !isRent) return null;

	return <Button onClick={returnHandler}>반납하기</Button>;
};

export default Return;
