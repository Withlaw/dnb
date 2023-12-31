import { NavLink } from 'react-router-dom';

type Nav = {
	id: number;
	name: string;
	path: string;
	iconHref?: string;
};

const MainNav = () => {
	const navList: Nav[] = [
		{ id: 0, name: '지도', path: '/' },
		{ id: 1, name: '대여목록', path: '/' },
		{ id: 2, name: '홈', path: '/' },
		{ id: 3, name: '채팅', path: '/' },
	];

	const styleLi = 'flex items-center';

	return (
		<nav className=" bg-green-800 h-[50px] flex-initial">
			<ul className="h-full flex justify-around items-center">
				{navList.map(nav => {
					return (
						<li key={nav.id} className={styleLi}>
							<NavLink to={nav.path}>{nav.name}</NavLink>
						</li>
					);
				})}
				<li className={styleLi}>
					<NavLink to={'/'}>로그인</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default MainNav;
