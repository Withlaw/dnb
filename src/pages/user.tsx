// import { HiMenu, HiOutlinePencilAlt } from 'react-icons/hi';
import { HiChevronLeft } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import SignOut from '@/features/authentication/signout.component.tsx';
import UserDetail from '@/features/users/user-detail.component.tsx';
import useShow from '@/hooks/use-show.ts';
import GeneralHeaderMenu from '@/ui/general-header-menu.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';
import GeneralNav from '@/ui/general-nav.tsx';

const UserPage = () => {
	const { isShow, showHandler } = useShow();
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	return (
		<>
			<GeneralHeader>
				<div className="flex min-w-4" onClick={goBack}>
					<div>
						<span className="text-2xl hover:cursor-pointer">
							<HiChevronLeft />
						</span>
					</div>
				</div>

				<GeneralHeaderMenu isShowMenu={isShow} onClick={showHandler}>
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
