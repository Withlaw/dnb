import { HiMenu, HiOutlineSearch } from 'react-icons/hi';
import { useMatch } from 'react-router-dom';

import HeaderNav from '@/ui/nav-header.tsx';

type HeaderItem = {
	id: number;
	name: string;
	icon?: React.ReactNode;
};

const headerItems: HeaderItem[] = [
	{ id: 0, name: 'search', icon: <HiOutlineSearch size="24" /> },
	{ id: 1, name: 'menu', icon: <HiMenu size="24" /> },
];

const HeaderMain = () => {
	/* ui 폴더에는 순수 함수만 오도록 해야함. 아래 코드 수정 할 것  */
	const currentPath = useMatch('/books');
	const isBooksPage = currentPath !== null;

	return (
		<header className="fixed flex h-[50px] w-full max-w-screen-sm flex-initial items-center justify-between border-b border-solid border-stone-200 bg-[#fff] px-6 py-2">
			<div className="flex min-w-4">
				<HeaderNav isBooksPage={isBooksPage} />
			</div>

			<div className="flex items-center justify-end ">
				{headerItems.map(item => (
					<span key={item.id} className="ml-4">
						{item.icon}
					</span>
				))}
				{/* <p>검색</p>
				<p>메뉴</p> */}
			</div>
		</header>
	);
};

export default HeaderMain;
