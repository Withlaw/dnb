import clsx from 'clsx';
import { useState } from 'react';

import useUserBooks from '@/features/authentication/use-user-books.hook.ts';
import useUserRentals from '@/features/authentication/use-user-rentals.ts';
import useUser from '@/features/authentication/use-user.hook.ts';
import UserBooks from '@/features/authentication/user-books.component.tsx';
import UserInfo from '@/features/authentication/user-info.componen.tsx';

const UserDetail = () => {
	const [tab, setTab] = useState('등록한 책');
	const isMyBooksTab = tab === '등록한 책';
	const isMyRentalsTab = tab === '빌린 책';
	const isMyWishTab = tab === '찜한 책';

	const { user } = useUser();
	const { books } = useUserBooks(user?.id, isMyBooksTab);
	const { rentals } = useUserRentals(user?.id, isMyRentalsTab);

	const tabHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
		const { textContent } = e.currentTarget;
		if (!textContent) return;

		setTab(textContent);
	};

	return (
		user && (
			<div className="flex flex-col">
				<UserInfo user={user} />

				<div className="flex flex-col space-y-2">
					<div className="flex justify-between rounded-md border border-solid border-stone-300 p-3">
						<div className=" flex divide-x divide-stone-400">
							<span
								className={clsx(
									'px-2 hover:cursor-pointer hover:text-stone-600 ',
									isMyBooksTab && 'text-stone-600',
								)}
								onClick={tabHandler}>
								등록한 책
							</span>
							<span
								className={clsx(
									'px-2 hover:cursor-pointer hover:text-stone-600 ',
									isMyRentalsTab && 'text-stone-600',
								)}
								onClick={tabHandler}>
								빌린 책
							</span>
							<span
								className={clsx(
									'px-2 hover:cursor-pointer hover:text-stone-600 ',
									isMyWishTab && 'text-stone-600',
								)}
								onClick={tabHandler}>
								찜한 책
							</span>
						</div>
					</div>

					<div className="flex flex-auto flex-col space-y-2 rounded-md border border-solid border-stone-300 p-3">
						<div className="flex w-full justify-end ">
							{/* <span>옵션</span> */}
						</div>
						<ul className="flex flex-col space-y-3">
							{isMyBooksTab && books && <UserBooks books={books} />}
							{isMyBooksTab && !books && (
								<li>
									<h4>등록한 책이 없습니다.</h4>
								</li>
							)}

							{isMyRentalsTab && rentals && <UserBooks books={rentals} />}
							{isMyRentalsTab && !rentals && (
								<li>
									<h4>빌린 책이 없습니다.</h4>
								</li>
							)}

							{isMyWishTab && (
								<li>
									<h4>준비중입니다...</h4>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		)
	);
};

export default UserDetail;
