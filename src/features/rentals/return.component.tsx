import { BookDataFromServer } from '@/features/books/_model.ts';
import useConfirm from '@/features/confirmation/use-confirm.hook.ts';
import useReturn from '@/features/rentals/use-return.hook.ts';
import { UserDataFromServer } from '@/features/users/_model.ts';
import Button from '@/ui/button.tsx';

type Props = {
	book: BookDataFromServer;
	user?: UserDataFromServer | null;
};

const Return = ({ book, user }: Props) => {
	const { confirm } = useConfirm();
	const { returnBook } = useReturn();

	const isMyRent = user && user.id === book.customerId;

	const returnHandler = () => {
		confirm('반납하시겠습니까?', () => {
			returnBook(book.rentalId!);
		});
		// const isConfirmed = window.confirm('반납하시겠습니까?');
		// if (!isConfirmed) return;

		// returnBook(book.rentalId!);
	};

	if (isMyRent) return <Button onClick={returnHandler}>반납하기</Button>;
};

export default Return;
