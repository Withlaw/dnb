import { HiChevronLeft } from 'react-icons/hi';

import UserInfoEdit from '@/features/authentication/user-info-edit.component.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';

const UserEditPage = () => {
	return (
		<>
			<GeneralHeader>
				<div className="flex min-w-4">
					<div>
						<span className="text-2xl hover:cursor-pointer">
							<HiChevronLeft />
						</span>
					</div>
				</div>
			</GeneralHeader>

			<GeneralMain>
				<UserInfoEdit />
			</GeneralMain>
		</>
	);
};

export default UserEditPage;
