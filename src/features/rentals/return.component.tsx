import { BookDataFromServer } from '@/features/books/books.model.ts';
import useReturn from '@/features/rentals/use-return.hook.ts';
import { UserDataFromServer } from '@/features/users/users.model.ts';
import Button from '@/ui/button.tsx';

type Props = {
	book: BookDataFromServer;
	user: UserDataFromServer | null;
};

const Return = ({ book, user }: Props) => {
	const { returnBook } = useReturn();

	const returnHandler = () => {
		if (!user) {
			window.alert('로그인이 필요합니다.');
			return;
		}

		const isConfirmed = window.confirm('반납하시겠습니까?');

		if (!isConfirmed) return;

		returnBook(book.rentalId!);
	};

	if (!book.rentalId) return null;

	return <Button onClick={returnHandler}>반납하기</Button>;
};

export default Return;
