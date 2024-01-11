import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	Navigate,
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import Authorization from '@/features/authentication/authorization.component.tsx';
import Signin from '@/features/authentication/signin.component.tsx';
import Signup from '@/features/authentication/signup.component.tsx';
import AuthenticationPage from '@/pages/authentication.tsx';
import BookCreatePage from '@/pages/book-create.tsx';
import BookDetailPage from '@/pages/book-detail.tsx';
import BookEditPage from '@/pages/book-edit.tsx';
import BooksPreviewPage from '@/pages/books-preview.tsx';
import ErrorPage from '@/pages/error.tsx';
import UserPage from '@/pages/user.tsx';
import BooksPostLayout from '@/ui/layout-books-post.tsx';
import PageLayout from '@/ui/layout-page.tsx';
import HomeLayout from '@/ui/layout-root.tsx';

const routes: RouteObject[] = [
	{
		path: '/',
		id: 'home',
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to={'books'} replace /> },
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
		element: <PageLayout />,
		children: [
			{ path: '/user', element: <UserPage /> },
			{
				path: '/dashboard',
				element: null,
			},
			{
				id: 'book-post',
				element: <BooksPostLayout />,
				children: [
					{ path: '/books/create', element: <BookCreatePage /> },
					{
						path: '/books/:bookId/edit',
						element: <BookEditPage />,
					},
				],
			},
		],
	},
	{ path: '/test', element: <BookEditPage /> },
];

const router = createBrowserRouter(
	routes.map(route => {
		route.element = (
			<Authorization route={route}>{route.element}</Authorization>
		);
		return route;
	}),
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0, // Query is configured with aggressive
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
