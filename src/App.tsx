import {
	Navigate,
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import BooksPage from '@/pages/books.tsx';
import ErrorPage from '@/pages/error.tsx';
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
				element: <BooksPage />,
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
		],
	},
];

const router = createBrowserRouter(
	routes.map(route => {
		return route;
	}),
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
