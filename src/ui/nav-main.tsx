import React from 'react';
import {
	HiOutlineMap,
	HiOutlineBookOpen,
	HiOutlineChat,
	HiOutlineUser,
	HiHome,
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

type Nav = {
	id: number;
	name: string;
	path: string;
	icon?: React.ReactNode;
	end?: boolean;
};

const MainNav = () => {
	const navList: Nav[] = [
		{ id: 0, name: '지도', path: '/books', icon: <HiOutlineMap size="24" /> },
		{
			id: 1,
			name: '대여 목록',
			path: '/books',
			icon: <HiOutlineBookOpen size="24" />,
		},
		{ id: 2, name: '홈', path: '/', icon: <HiHome size="24" />, end: true },
		{ id: 3, name: '채팅', path: '/books', icon: <HiOutlineChat size="24" /> },
		{
			id: 4,
			name: '내 정보',
			path: '/books',
			icon: <HiOutlineUser size="24" />,
		},
	];

	return (
		<nav className=" h-[50px] flex-initial rounded-t-2xl border border-solid shadow-lg shadow-black">
			<ul className="flex h-full items-center justify-around text-xs">
				{navList.map(nav => {
					return (
						<li key={nav.id} className="flex items-center">
							<NavLink
								to={nav.path}
								className={({ isActive }) =>
									isActive
										? 'flex flex-col items-center text-green-900'
										: 'flex flex-col items-center'
								}
								end={nav.end}>
								<span>{nav.icon}</span>
								<span>{nav.name}</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default MainNav;
