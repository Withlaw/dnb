import { useNavigate } from 'react-router-dom';

import UserInfoEdit from '@/features/users/user-info-edit.component.tsx';
import GeneralHeaderBack from '@/ui/general-header-back.tsx';
import GeneralHeader from '@/ui/general-header.tsx';
import GeneralMain from '@/ui/general-main.tsx';

const UserEditPage = () => {
	const navigate = useNavigate();
	const goBack = () => {
		const isConfirmed = window.confirm('개인정보 수정을 취소하시겠습니까?');
		if (!isConfirmed) return;

		navigate(-1);
	};

	return (
		<>
			<GeneralHeader>
				<GeneralHeaderBack onClick={goBack} />
			</GeneralHeader>

			<GeneralMain>
				<UserInfoEdit />
			</GeneralMain>
		</>
	);
};

export default UserEditPage;
