import { HiMenu, HiOutlineSearch } from 'react-icons/hi';

type HeaderItem = {
	id: number;
	name: string;
	icon?: React.ReactNode;
};

const MainHeader = () => {
	const headerItems: HeaderItem[] = [
		{ id: 0, name: 'search', icon: <HiOutlineSearch size="24" /> },
		{ id: 1, name: 'menu', icon: <HiMenu size="24" /> },
	];
	return (
		<header className="fixed flex h-[50px] w-full max-w-screen-sm flex-initial items-center justify-between border-b border-solid border-stone-200 bg-[#fff] px-6 py-2">
			<div className="flex min-w-4">
				<div>
					<span className="text-xl tracking-widest">동네북</span>
				</div>
			</div>
			<div className="flex items-center justify-end ">
				{headerItems.map(item => (
					<span key={item.id} className="ml-4">
						{item.icon}
					</span>
				))}
				{/* <p>검색</p>
				<p>기타</p> */}
			</div>
		</header>
	);
};

export default MainHeader;
