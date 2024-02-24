import { Link, useNavigate } from 'react-router-dom';

import SignOut from '@/features/authentication/logout/signout.component.tsx';
import UserDetail from '@/features/users/info/user-detail.component.tsx';
import GeneralHeaderBack from '@/ui/general-header-back.tsx';
import GeneralHeaderMenu from '@/ui/general-header-menu.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';

const UserPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	return (
		<>
			<GeneralHeader>
				<GeneralHeaderBack onClick={goBack} />

				<GeneralHeaderMenu>
					<GeneralHeaderMenu.Item>
						<Link to={'edit'}>수정하기</Link>
					</GeneralHeaderMenu.Item>

					<GeneralHeaderMenu.Item>
						<SignOut>로그아웃</SignOut>
					</GeneralHeaderMenu.Item>
				</GeneralHeaderMenu>
			</GeneralHeader>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<GeneralMain>
				<UserDetail />
			</GeneralMain>

			<GeneralNav />
		</>
	);
};

export default UserPage;
