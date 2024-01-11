import { Outlet } from 'react-router-dom';

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
		<div className="container mx-auto flex h-full max-w-screen-sm flex-col shadow-xl">
			<Outlet />
		</div>
	);
};

export default HomeLayout;
