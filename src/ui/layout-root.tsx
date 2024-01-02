import { HiMenu, HiOutlineSearch } from 'react-icons/hi';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

import HeaderMain from '@/ui/header-main.tsx';
import NavHeader from '@/ui/nav-header.tsx';
import NavMain from '@/ui/nav-main.tsx';

type HeaderItem = {
	id: number;
	name: string;
	icon?: React.ReactNode;
};

const headerItems: HeaderItem[] = [
	{ id: 0, name: 'search', icon: <HiOutlineSearch size="24" /> },
	{ id: 1, name: 'menu', icon: <HiMenu size="24" /> },
];

const RootLayout = () => {
	/* ui 폴더에는 순수 함수만 오도록 해야함. layout 컴포넌트는 페이지 같은 요소니까 예외? */
	const currentPath = useMatch('/books');
	const isBooksPage = currentPath !== null;

	const navigate = useNavigate();
	const goBack = () => {
		if (isBooksPage) return;
		navigate(-1);
	};

	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col">
			<HeaderMain>
				<div className="flex min-w-4" onClick={goBack}>
					<NavHeader isBooksPage={isBooksPage} />
				</div>

				<div className="flex items-center justify-end">
					{headerItems.map(item => (
						<span key={item.id} className="ml-4">
							{item.icon}
						</span>
					))}
				</div>
			</HeaderMain>

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
