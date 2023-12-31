import { Outlet } from 'react-router-dom';

import MainNav from '@/ui/nav-main.tsx';

const RootLayout = () => {
	return (
		<div className="max-w-screen-sm container mx-auto bg-green-100 h-dvh flex flex-col">
			<header className="bg-green-600 border-b border-grey-100 border-solid px-6 py-2 w-full h-[50px] flex-initial flex justify-between items-center">
				<div className="flex">동네북</div>
				<div className="flex">
					<p>검색</p>
					<p>기타</p>
				</div>
			</header>
			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="bg-green-400 px-4 pb-[40px] flex-auto">
				<p>app main</p>
				<Outlet />
			</main>
			{/* <footer>app footer</footer> */}
			<MainNav />
		</div>
	);
};

export default RootLayout;
