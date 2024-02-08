import { UserDataFromServer } from '@/features/users/_model.ts';
import useUserBooks from '@/features/users/use-user-books.hook.ts';
import useUserRentals from '@/features/users/use-user-rentals.hook.ts';
import UserBooksList from '@/features/users/user-books-list.component.tsx';
import { UserBookSkeleton } from '@/ui/skeletons.tsx';

const UserBooks = ({ user }: { user: UserDataFromServer }) => {
	const {
		books,
		isLoading: isUserBooksLoading,
		isUserBooksTab,
	} = useUserBooks(user.id);

	const {
		rentals,
		isLoading: isUserRentalsLoading,
		isUserRentalsTab,
	} = useUserRentals(user.id);

	return (
		<ul className="flex flex-col space-y-3">
			{/* loaing spinner */}
			{(isUserBooksLoading || isUserRentalsLoading) && <UserBookSkeleton />}

			{isUserBooksTab && books && <UserBooksList books={books} />}
			{isUserBooksTab && books?.length === 0 && (
				<li>
					<h4>등록한 책이 없습니다.</h4>
				</li>
			)}

			{isUserRentalsTab && rentals && <UserBooksList books={rentals} />}
			{isUserRentalsTab && rentals?.length === 0 && (
				<li>
					<h4>빌린 책이 없습니다.</h4>
				</li>
			)}

			{/* <li>
				<h4>준비중입니다...</h4>
			</li> */}
		</ul>
	);
};

export default UserBooks;
