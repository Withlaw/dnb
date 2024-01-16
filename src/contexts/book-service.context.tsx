import { createContext } from 'react';

import { BookServiceInterface } from '@/services/book-service.ts';

type BookServiceContextType = {
	bookService: BookServiceInterface;
};

export const BookServiceContext = createContext<BookServiceContextType | null>(
	null,
);

export default function BookServiceProvider({
	children,
	bookService,
}: {
	children: React.ReactNode;
	bookService: BookServiceInterface;
}) {
	return (
		<BookServiceContext.Provider value={{ bookService }}>
			{children}
		</BookServiceContext.Provider>
	);
}
