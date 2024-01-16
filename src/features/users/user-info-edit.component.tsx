import { FieldValues } from 'react-hook-form';

import useUserEdit from '@/features/users/use-user-edit.hook.ts';
import useUser from '@/features/users/use-user.hook.ts';
import UserInfoEditForm from '@/features/users/user-info-edit-form.component.tsx';
import { UserDataToServer } from '@/features/users/users.model.ts';

const UserInfoEdit = () => {
	// useUser
	const { user } = useUser();

	// useUserEdit
	const { editUserInfo } = useUserEdit();

	const submitHandler = (data: FieldValues) => {
		if (!user) return;

		const newUserInfo = new UserDataToServer(data);

		editUserInfo({ id: user?.id, data: newUserInfo });
	};

	return (
		<div className=" rounded-md p-3">
			{user && (
				<UserInfoEditForm defaultValue={user} onSubmit={submitHandler} />
			)}
		</div>
	);
};

export default UserInfoEdit;
