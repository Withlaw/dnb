import clsx from 'clsx';
import { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

import useUserBooks from '@/features/users/use-user-books.hook.ts';
import useUserRentals from '@/features/users/use-user-rentals.ts';
import useUser from '@/features/users/use-user.hook.ts';
import UserBooks from '@/features/users/user-books.component.tsx';
import UserInfo from '@/features/users/user-info.componen.tsx';
import { UserBookSkeleton, UserDetailSkeleton } from '@/ui/skeletons.tsx';
import Tab from '@/ui/tab.tsx';

type NavItem = {
	id: number;
	name: string;
	param: string;
};

const navItems: NavItem[] = [
	{
		id: 0,
		name: '등록한 책',
		param: 'own',
	},
	{
		id: 1,
		name: '빌린 책',
		param: 'rent',
	},
	{ id: 2, name: '찜한 책', param: 'wish' },
];

const UserDetail = () => {
	// const [tab, setTab] = useState('등록한 책');
	// const isMyBooksTab = booksParams.get('books') === 'own';
	// const isMyBooksTab = tab === '등록한 책';
	// const isMyRentalsTab = tab === '빌린 책';
	// const isMyWishTab = tab === '찜한 책';

	const { user, isLoading: isUserLoading } = useUser();

	const {
		books,
		isLoading: isUserBooksLoading,
		isUserBooksTab,
	} = useUserBooks(user?.id);

	const {
		rentals,
		isLoading: isUserRentalsLoading,
		isUserRentalsTab,
	} = useUserRentals(user?.id);

	// const tabHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
	// 	const { textContent } = e.currentTarget;
	// 	if (!textContent) return;

	// 	setTab(textContent);
	// };

	if (isUserLoading) return <UserDetailSkeleton />;

	return (
		user && (
			<div className="flex flex-col">
				<UserInfo user={user} />

				<div className="flex flex-col space-y-2">
					<div className="flex justify-between rounded-md border border-solid border-stone-300 p-3">
						<div className=" flex divide-x divide-stone-400">
							<Tab
								field="books"
								options={[
									{ value: 'own', label: '등록한 책' },
									{ value: 'rent', label: '빌린 책' },
									// { value: 'wish', label: '찜한 책' },
								]}
								render={({ option, isActive, onClick }) => (
									<button
										onClick={() => onClick(option.value)}
										className={clsx(
											'px-2 hover:cursor-pointer hover:text-stone-600 ',
											isActive && 'text-stone-600',
										)}>
										{option.label}
									</button>
								)}
							/>
							{/* <button
								className={clsx(
									'px-2 hover:cursor-pointer hover:text-stone-600 ',
									isMyBooksTab && 'text-stone-600',
								)}
								onClick={() => tabClickHandler('own')}>
								등록한 책
							</button>
							<button
								className={clsx(
									'px-2 hover:cursor-pointer hover:text-stone-600 ',
									isMyRentalsTab && 'text-stone-600',
								)}
								onClick={() => tabClickHandler('rent')}>
								빌린 책
							</button>
							<button
								className={clsx(
									'px-2 hover:cursor-pointer hover:text-stone-600 ',
									isMyWishTab && 'text-stone-600',
								)}
								onClick={() => tabClickHandler('wish')}>
								찜한 책
							</button> */}
						</div>

						<div className="flex  justify-end ">
							<span>옵션</span>
						</div>
					</div>

					<div className="flex flex-auto flex-col space-y-2 rounded-md border border-solid border-stone-300 p-3">
						{/* <div className="flex w-full justify-end ">
							<span>옵션</span>
						</div> */}
						<ul className="flex flex-col space-y-3">
							{/* loaing spinner */}
							{(isUserBooksLoading || isUserRentalsLoading) && (
								<UserBookSkeleton />
							)}

							{isUserBooksTab && books && <UserBooks books={books} />}
							{isUserBooksTab && books?.length === 0 && (
								<li>
									<h4>등록한 책이 없습니다.</h4>
								</li>
							)}

							{isUserRentalsTab && rentals && <UserBooks books={rentals} />}
							{isUserRentalsTab && rentals?.length === 0 && (
								<li>
									<h4>빌린 책이 없습니다.</h4>
								</li>
							)}

							{/* <li>
									<h4>준비중입니다...</h4>
								</li> */}
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

export default UserDetail;
