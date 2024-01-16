import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	Navigate,
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import Authorization from '@/features/authentication/authorization.component.tsx';
import AuthenticationPage from '@/pages/authentication.tsx';
import ErrorPage from '@/pages/error.tsx';
import AUTH_ROUTES from '@/routers/auth.route.tsx';
import RENTAL_ROUTES from '@/routers/book.route.tsx';
import router from '@/routers/index.tsx';
import USER_ROUTES from '@/routers/user.route.tsx';
import HomeLayout from '@/ui/layout-home.tsx';

/*
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
			// {
			// 	path: 'books',
			// 	element: <BooksPreviewPage />,
			// },
			// {
			// 	path: '/books/:bookId',
			// 	element: <BookDetailPage />,
			// },
		],
	},

	{
		id: 'guest-only',
		element: <AuthenticationPage />,
		errorElement: <ErrorPage />,
		children: [
			AUTH_ROUTES.SIGN_IN_PAGE,
			AUTH_ROUTES.SIGN_UP_PAGE,
			// {
			// 	path: 'sign-in',
			// 	element: <Signin />,
			// },
			// { path: 'sign-up', element: <Signup /> },
		],
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
			// { path: '/user', element: <UserPage /> },
			// { path: '/user/edit', element: <UserEditPage /> },
			// { path: '/books/create', element: <BookCreatePage /> },
			// {
			// 	path: '/books/:bookId/edit',
			// 	element: <BookEditPage />,
			// },
			// {
			// 	path: '/dashboard',
			// 	element: null,
			// },
		],
	},
	{ path: '/test', element: null },
];

const router = createBrowserRouter(
	routes.map(route => {
		route.element = (
			<Authorization route={route}>{route.element}</Authorization>
		);
		return route;
	}),
);

*/

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0, // Query is configured with aggressive
			retry: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
