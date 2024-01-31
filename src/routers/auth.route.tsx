// legacy
import AuthServiceProvider from '@/contexts/auth-service.context.tsx';
import Signin from '@/features/authentication/signin.component.tsx';
import Signup from '@/features/authentication/signup.component.tsx';
import AuthService from '@/services/auth-service.ts';

const AUTH_ROUTES = {
	SIGN_IN_PAGE: {
		path: '/sign-in',
		element: <Signin />,
	},
	SIGN_UP_PAGE: {
		path: '/sign-up',
		element: <Signup />,
	},
};

const authService = new AuthService();

Object.entries(AUTH_ROUTES).forEach(route => {
	const path = route[0] as keyof typeof AUTH_ROUTES;
	const element = route[1].element;

	AUTH_ROUTES[path].element = (
		<AuthServiceProvider authService={authService}>
			{element}
		</AuthServiceProvider>
	);
});

export default AUTH_ROUTES;
