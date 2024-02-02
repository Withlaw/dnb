import useUserBooks from '@/features/users/use-user-books.hook.ts';
import useUserRentals from '@/features/users/use-user-rentals.hook.ts';
import useUser from '@/features/users/use-user.hook.ts';
import UserBooksFilter from '@/features/users/user-books-filter.component.tsx';
import UserBooksTab from '@/features/users/user-books-tab.component.tsx';
import UserBooks from '@/features/users/user-books.component.tsx';
import UserInfo from '@/features/users/user-info.componen.tsx';
import { UserDetailSkeleton } from '@/ui/skeletons.tsx';

const UserDetail = () => {
	const { user, isLoading: isUserLoading } = useUser();

	const { isUserBooksTab } = useUserBooks(user?.id);

	const { isUserRentalsTab } = useUserRentals(user?.id);

	if (isUserLoading) return <UserDetailSkeleton />;

	return (
		user && (
			<div className="flex flex-col">
				<UserInfo user={user} />

				<div className="flex flex-col space-y-2">
					<div className="flex justify-between rounded-md border border-solid border-stone-300 p-3">
						<div className=" flex divide-x divide-stone-400">
							<UserBooksTab
								options={[
									{ value: 'own', label: '등록한 책' },
									{ value: 'rent', label: '빌린 책' },
									// { value: 'wish', label: '찜한 책' },
								]}
							/>
						</div>

						<div className="flex  justify-end ">
							{isUserBooksTab && (
								<UserBooksFilter
									options={[
										{ value: 'all', label: '전체' },
										{ value: 'access', label: '대여 가능' },
										{ value: 'limit', label: '대여 불가' },
									]}
								/>
							)}

							{isUserRentalsTab && (
								<UserBooksFilter
									options={[
										{ value: 'all', label: '전체' },
										{ value: 'rent', label: '대여중' },
										{ value: 'return', label: '반납 완료' },
									]}
								/>
							)}
						</div>
					</div>

					<div className="flex flex-auto flex-col space-y-2 rounded-md border border-solid border-stone-300 p-3">
						{/* <div className="flex w-full justify-end ">
							<span>옵션</span>
						</div> */}
						<UserBooks user={user} />
					</div>
				</div>
			</div>
		)
	);
};

export default UserDetail;
