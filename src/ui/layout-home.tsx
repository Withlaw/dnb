import { Outlet, ScrollRestoration } from 'react-router-dom';

import GeneralLayout from '@/ui/general-layout.tsx';

/*
type HeaderItem = {
	id: number;
	name: string;
	icon?: React.ReactNode;
};

const headerItems: HeaderItem[] = [
	{ id: 0, name: 'search', icon: <HiOutlineSearch size="24" /> },
	{ id: 1, name: 'menu', icon: <HiMenu size="24" /> },
];
*/

const HomeLayout = () => {
	return (
		// <div className="container mx-auto flex h-full max-w-screen-sm flex-col shadow-xl">
		<GeneralLayout>
			<Outlet />

			{/* 페이지 전환시 스크롤 초기화 */}
			<ScrollRestoration />
		</GeneralLayout>
		// </div>
	);
};

export default HomeLayout;
