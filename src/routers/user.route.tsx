import AuthServiceProvider from '@/contexts/auth-service.context.tsx';
import UserServiceProvider from '@/contexts/user-service.context.tsx';
import UserEditPage from '@/pages/user-edit.tsx';
import UserPage from '@/pages/user.tsx';
import { AuthService } from '@/services/auth-service.ts';
import { UserService } from '@/services/user-service.ts';

const USER_ROUTES = {
	USER_PAGE: {
		path: '/user',
		element: <UserPage />,
	},
	USER_EDIT_PAGE: {
		path: '/user/edit',
		element: <UserEditPage />,
	},
};

const userService = new UserService();
const authService = new AuthService();

Object.entries(USER_ROUTES).forEach(route => {
	const path = route[0] as keyof typeof USER_ROUTES;
	const element = route[1].element;

	USER_ROUTES[path].element = (
		<AuthServiceProvider authService={authService}>
			<UserServiceProvider userService={userService}>
				{element}
			</UserServiceProvider>
		</AuthServiceProvider>
	);
});

export default USER_ROUTES;
