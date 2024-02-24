import { FieldValues } from 'react-hook-form';

import UserInfoEditForm from '@/features/users/_components/user-info-edit-form.component.tsx';
import { UserDataToServer } from '@/features/users/_lib/model.ts';
import useUserEdit from '@/features/users/info/use-user-edit.hook.ts';
import useUser from '@/features/users/info/use-user.hook.ts';

const UserInfoEdit = () => {
	// useUser
	const { user } = useUser();

	// useUserEdit
	const { editUserInfo } = useUserEdit();

	const submitHandler = (data: FieldValues) => {
		if (!user) return;

		const newUserInfo = new UserDataToServer(data);

		editUserInfo({ id: user.id, data: newUserInfo });
	};

	return (
		user && (
			<div className=" rounded-md p-3">
				<UserInfoEditForm defaultValue={user} onSubmit={submitHandler} />
			</div>
		)
	);
};

export default UserInfoEdit;
