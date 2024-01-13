import useUser from '@/features/authentication/use-user.hook.ts';
import UserInfoEditForm from '@/features/authentication/user-info-edit-form.component.tsx';

const UserInfoEdit = () => {
	// useUser
	const { user } = useUser();
	// form
	// useUserEdit

	return (
		<div className=" rounded-md p-3">
			{user && <UserInfoEditForm defaultValue={user} />}
		</div>
	);
};

export default UserInfoEdit;
