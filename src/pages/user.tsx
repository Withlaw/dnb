import { HiMenu } from 'react-icons/hi';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import UserDetail from '@/features/authentication/user-detail.component.tsx';
import HeaderMain from '@/ui/header-main.tsx';
import NavHeader from '@/ui/nav-header.tsx';

const UserPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	// layout-books-post와 거의 동일함. 나중에 추상화할것.
	return (
		<div className="container mx-auto flex h-dvh max-w-screen-sm flex-col shadow-xl md:w-96 ">
			<HeaderMain>
				<div className="flex min-w-4" onClick={goBack}>
					<NavHeader />
				</div>
				<div>
					<span className="text-2xl hover:cursor-pointer">
						<HiMenu size="24" />
					</span>
				</div>
			</HeaderMain>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<main className="flex-auto bg-stone-50 px-4 pt-[58px]">
				<UserDetail />
			</main>

			<ScrollRestoration />
		</div>
	);
};

export default UserPage;
