import { Outlet, ScrollRestoration } from 'react-router-dom';

import HeaderMain from '@/ui/header-main.tsx';
import NavMain from '@/ui/nav-main.tsx';

const RootLayout = () => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			<HeaderMain />
			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="flex-auto bg-stone-50 px-4 py-[50px]">
				<Outlet />
			</main>
			{/* <footer>app footer</footer> */}
			<NavMain />

			{/* 페이지 전환시 스크롤 초기화 */}
			<ScrollRestoration />
		</div>
	);
};

export default RootLayout;
