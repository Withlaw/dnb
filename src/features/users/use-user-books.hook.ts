import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { useUserService } from '@/contexts/index.ts';

const useUserBooks = (id?: number) => {
	const [searchParams] = useSearchParams();
	const userService = useUserService();

	const booksField = searchParams.get('books') ?? 'own';
	const filterField = searchParams.get('filter') ?? 'all';

	const enabled = booksField === 'own';

	let books;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['books', id],
		queryFn: async () => await userService.getUserBooks(id),
		enabled: Boolean(id) && enabled,
		staleTime: 10 * 60 * 1000,
	});

	if (filterField === 'all') books = data;
	else if (data) {
		books = data?.filter(book => {
			if (filterField === 'all') return true;
			if (filterField === 'access') return book.status === '대여 가능';
			if (filterField === 'limit') return book.status === '대여 불가';
		});
	}

	return { books, isLoading, isError, error, isUserBooksTab: enabled };
};

export default useUserBooks;
