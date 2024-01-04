import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	Navigate,
	RouteObject,
	RouterProvider,
	ScrollRestoration,
	createBrowserRouter,
} from 'react-router-dom';

import BookCreatePage from '@/pages/book-create.tsx';
import BookDetailPage from '@/pages/book-detail.tsx';
import BookEditPage from '@/pages/book-edit.tsx';
import BooksPreviewPage from '@/pages/books-preview.tsx';
import ErrorPage from '@/pages/error.tsx';
import BooksPostLayout from '@/ui/layout-books-post.tsx';
import RootLayout from '@/ui/layout-root.tsx';

// 나중에 래퍼 레이아웃 다르게 적용하기 위해 로그인페이지, 유저 페이지는 sibling 라우트 관계로 둠.
const routes: RouteObject[] = [
	{
		path: '/',
		id: 'root',
		element: <RootLayout />,
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
	{ path: '/sign', element: null },
	{
		id: 'auth',
		element: null,
		children: [
			{ path: '/users', element: null },
			{
				path: '/dashboard',
				element: null,
			},
			{
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
];

const router = createBrowserRouter(
	routes.map(route => {
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
