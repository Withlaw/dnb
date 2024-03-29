import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import Signin from '@/features/authentication/login/signin.component.tsx';
import Signup from '@/features/authentication/signup/signup.component.tsx';
import Authorization from '@/features/users/authorization/authorization.component.tsx';
import AuthenticationPage from '@/pages/authentication.tsx';
import BookCreatePage from '@/pages/book-create.tsx';
import BookDetailPage from '@/pages/book-detail.tsx';
import BookEditPage from '@/pages/book-edit.tsx';
import BooksPreviewPage from '@/pages/books-preview.tsx';
import ErrorPage from '@/pages/error.tsx';
import RootPage from '@/pages/root.tsx';
import Test from '@/pages/test.tsx';
import UserEditPage from '@/pages/user-edit.tsx';
import UserPage from '@/pages/user.tsx';
import HomeLayout from '@/ui/layout-home.tsx';

const routes: RouteObject[] = [
	{
		id: 'root',
		path: '/',
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to={'books'} replace /> },

			{
				id: 'public',
				element: <HomeLayout />,
				children: [
					{
						path: 'books',
						element: <BooksPreviewPage />,
					},
					{
						path: 'books/:bookId',
						element: <BookDetailPage />,
					},
				],
			},

			{
				id: 'guest-only',
				element: <AuthenticationPage />,
				children: [
					{
						path: 'sign-in',
						element: <Signin />,
					},
					{ path: 'sign-up', element: <Signup /> },
				],
			},

			{
				id: 'protected',
				element: <HomeLayout />,
				children: [
					{ path: 'user', element: <UserPage /> },
					{ path: 'user/edit', element: <UserEditPage /> },
					{ path: 'books/create', element: <BookCreatePage /> },
					{
						path: 'books/:bookId/edit',
						element: <BookEditPage />,
					},
					{
						path: 'dashboard',
						element: null,
					},
				],
			},
			{ id: 'test', path: '/test', element: <Test /> },
		],
	},
];

routes[0].children?.forEach(route => {
	route.element = <Authorization route={route}>{route.element}</Authorization>;
});

const router = createBrowserRouter(routes);

export default router;

/*
// legacy
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

const router = createBrowserRouter(
	routes.map(route => {
		route.element = (
			<AuthServiceProvider authService={authService}>
				<UserServiceProvider userService={userService}>
					<RentalServiceProvider rentalService={rentalService}>
						<Authorization route={route}>{route.element}</Authorization>
					</RentalServiceProvider>
				</UserServiceProvider>
			</AuthServiceProvider>
		);
		return route;
	}),
);
*/
