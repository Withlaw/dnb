import { Outlet, ScrollRestoration } from 'react-router-dom';

import HeaderMain from '@/ui/header-main.tsx';

const BooksPostLayout = () => {
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			{/* <HeaderMain /> */}
			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="flex-auto bg-stone-50 px-4 py-4">
				<Outlet />
			</main>
			{/* <footer>app footer</footer> */}
		</div>
	);
};

export default BooksPostLayout;
