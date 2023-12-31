import { Outlet } from 'react-router-dom';

import MainNav from '@/ui/nav-main.tsx';

const RootLayout = () => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			<header className="border-grey-100 flex h-[50px] w-full flex-initial items-center justify-between border-b border-solid bg-green-600 px-6 py-2">
				<div className="flex">동네북</div>
				<div className="flex">
					<p>검색</p>
					<p>기타</p>
				</div>
			</header>
			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="flex-auto bg-stone-50 px-4">
				<p>app main</p>
				<Outlet />
			</main>
			{/* <footer>app footer</footer> */}
			<MainNav />
		</div>
	);
};

export default RootLayout;
