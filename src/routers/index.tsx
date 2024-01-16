import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import UserServiceProvider from '@/contexts/user-service.context.tsx';
import Authorization from '@/features/authentication/authorization.component.tsx';
import AuthenticationPage from '@/pages/authentication.tsx';
import ErrorPage from '@/pages/error.tsx';
import AUTH_ROUTES from '@/routers/auth.route.tsx';
import RENTAL_ROUTES from '@/routers/book.route.tsx';
import USER_ROUTES from '@/routers/user.route.tsx';
import { UserService } from '@/services/user-service.ts';
import HomeLayout from '@/ui/layout-home.tsx';

const routes: RouteObject[] = [
	{
		id: 'home',
		path: '/',
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to={'books'} replace /> },
			RENTAL_ROUTES.BOOKS_PREVIEW_PAGE,
			RENTAL_ROUTES.BOOK_DETAIL_PAGE,
		],
	},

	{
		id: 'guest-only',
		element: <AuthenticationPage />,
		errorElement: <ErrorPage />,
		children: [AUTH_ROUTES.SIGN_IN_PAGE, AUTH_ROUTES.SIGN_UP_PAGE],
	},

	{
		id: 'protected',
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			RENTAL_ROUTES.BOOK_CREATE_PAGE,
			RENTAL_ROUTES.BOOK_EDIT_PAGE,
			USER_ROUTES.USER_PAGE,
			USER_ROUTES.USER_EDIT_PAGE,
		],
	},
	{ path: '/test', element: null },
];

const userService = new UserService();

const router = createBrowserRouter(
	routes.map(route => {
		route.element = (
			<UserServiceProvider userService={userService}>
				<Authorization route={route}>{route.element}</Authorization>
			</UserServiceProvider>
		);
		return route;
	}),
);

export default router;
