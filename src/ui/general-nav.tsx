import React from 'react';
import {
	HiOutlineBookOpen,
	HiOutlineChat,
	HiOutlineMap,
	HiOutlineUser,
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

import icons from '@/assets/icons.svg';

type NavItem = {
	id: number;
	name: string;
	path: string;
	icon?: React.ReactNode;
	end?: boolean;
	restrict?: boolean;
};

const navItems: NavItem[] = [
	{
		id: 0,
		name: '지도',
		path: '/map',
		icon: <HiOutlineMap size="24" />,
		restrict: true,
	},
	{
		id: 1,
		name: '대여 목록',
		path: '/rental',
		icon: <HiOutlineBookOpen size="24" />,
		restrict: true,
	},
	// { id: 2, name: '홈', path: '/', icon: <HiHome size="24" />, end: true },
	{
		id: 2,
		name: '홈',
		path: '/books',
		icon: (
			<svg className="size-6">
				<use href={`${icons}#logo-header`}></use>
			</svg>
		),
	},
	{
		id: 3,
		name: '채팅',
		path: '/chat',
		icon: <HiOutlineChat size="24" />,
		restrict: true,
	},
	{
		id: 4,
		name: '내 정보',
		path: '/user',
		icon: <HiOutlineUser size="24" />,
	},
];

const GeneralNav = ({ onClick }: { onClick?: () => void }) => {
	const navLinkClickHandler = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		isRestricted?: boolean,
	) => {
		if (onClick && isRestricted) {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<nav
			className={
				'fixed bottom-0 z-[99] h-[50px] w-full max-w-screen-sm flex-initial rounded-t-2xl border border-solid bg-[#fff] shadow-lg shadow-black md:w-96 '
			}>
			<ul className="flex h-full items-center justify-around text-xs">
				{navItems.map(item => {
					return (
						<li key={item.id} className="flex items-center">
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									isActive
										? 'flex flex-col items-center font-bold text-green-900'
										: 'flex flex-col items-center text-gray-700 grayscale'
								}
								end={item.end}
								onClick={e => navLinkClickHandler(e, item.restrict)}>
								<span>{item.icon}</span>
								<span>{item.name}</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default GeneralNav;
