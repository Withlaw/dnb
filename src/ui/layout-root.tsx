import { Outlet } from 'react-router-dom';

import MainHeader from '@/ui/header-main.tsx';
import MainNav from '@/ui/nav-main.tsx';

const RootLayout = () => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			<MainHeader />
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
