import { Link } from 'react-router-dom';

import icons from '@/assets/icons.svg';
import SignOut from '@/features/authentication/signout.component.tsx';
import { UserDataFromServer } from '@/features/authentication/users.model.ts';
import Star from '@/ui/star.tsx';

enum Style {
	ITEM_NAME = 'w-10',
	ITEMS = 'flex items-center space-x-2 text-xs ',
	ITEM = 'text-stone-800 text-center',
}

type Props = {
	user: UserDataFromServer;
};

const UserInfo = ({ user }: Props) => {
	return (
		<div className="my-2 flex flex-none items-center space-x-3 rounded-md border border-solid border-stone-300 px-5 py-3">
			<figure className="flex-none">
				{/* <img src="" alt="avatar" className="size-28 rounded-full bg-red-100" /> */}
				{user?.avatarUrl === '' && (
					<svg className="size-20 rounded-full">
						<use href={`${icons}#default-avatar`}></use>
					</svg>
				)}
				{user?.avatarUrl !== '' && (
					// <svg className="size-20 rounded-full">
					// 	<use href={`${icons}#default-avatar`}></use>
					// </svg>
					<img src={user?.avatarUrl} alt={user?.fullName} />
				)}
			</figure>

			<div className="flex flex-auto flex-col space-y-1 p-2 text-sm">
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>이메일</span>
					<span className={Style.ITEM}>{user.email}</span>
				</div>
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>닉네임</span>
					<span className={Style.ITEM}>{user.fullName}</span>
				</div>
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>주소</span>
					<span className={Style.ITEM}>{user.address || '-'}</span>
				</div>
				<div className={Style.ITEMS}>
					<span className={Style.ITEM_NAME}>평점</span>
					<span className={Style.ITEM}>
						<span className="flex items-center">
							<Star grade={user.grade} />
							{`(${user.grade})`}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
