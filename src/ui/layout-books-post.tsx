import { Outlet } from 'react-router-dom';

import HeaderMain from '@/ui/header-main.tsx';
import NavHeader from '@/ui/nav-header.tsx';

const BooksPostLayout = () => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			<HeaderMain>
				<div className="flex min-w-4">
					<NavHeader />
				</div>
			</HeaderMain>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="flex-auto bg-stone-50 px-4 py-[50px]">
				<Outlet />
			</main>
		</div>
	);
};

export default BooksPostLayout;
