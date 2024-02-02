// legacy
import RentalServiceProvider from '@/contexts/rental-service.context.tsx';
import BookDetailPage from '@/pages/book';
import BookCreatePage from '@/pages/book-create.tsx';
import BookEditPage from '@/pages/book-edit.tsx';
import BooksPreviewPage from '@/pages/books-preview.tsx';
import RentalService from '@/services/rental-service.ts';

// interface RentalRoutes {
// 	[k: string]: RouteObject;
// }

const RENTAL_ROUTES = {
	BOOKS_PREVIEW_PAGE: {
		path: 'books',
		element: <BooksPreviewPage />,
	},
	BOOK_DETAIL_PAGE: {
		path: '/books/:bookId',
		element: <BookDetailPage />,
	},
	BOOK_CREATE_PAGE: {
		path: '/books/create',
		element: <BookCreatePage />,
	},
	BOOK_EDIT_PAGE: {
		path: '/books/:bookId/edit',
		element: <BookEditPage />,
	},
};

const rentalService = new RentalService();

Object.entries(RENTAL_ROUTES).forEach(route => {
	const path = route[0] as keyof typeof RENTAL_ROUTES;
	const element = route[1].element;

	RENTAL_ROUTES[path].element = (
		<RentalServiceProvider rentalService={rentalService}>
			{element}
		</RentalServiceProvider>
	);
});

export default RENTAL_ROUTES;
