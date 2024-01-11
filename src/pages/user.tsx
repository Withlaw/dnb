import { HiMenu } from 'react-icons/hi';
import { HiChevronLeft } from 'react-icons/hi';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import UserDetail from '@/features/authentication/user-detail.component.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';

const UserPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	return (
		<>
			<GeneralHeader className="md:w-96">
				<div className="flex min-w-4" onClick={goBack}>
					<div>
						<span className="text-2xl hover:cursor-pointer">
							<HiChevronLeft />
						</span>
					</div>
				</div>

				<div>
					<span className="text-2xl hover:cursor-pointer">
						<HiMenu size="24" />
					</span>
				</div>
			</GeneralHeader>

			{/* <aside className="bg-green-800">app aside</aside> */}
			<GeneralMain>
				<UserDetail />
			</GeneralMain>

			<ScrollRestoration />
		</>
	);
};

export default UserPage;
