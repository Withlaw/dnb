import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { useUserService } from '@/contexts/index.ts';

const useUserBooks = (id?: number) => {
	const [param] = useSearchParams();
	const userService = useUserService();

	const booksField = param.get('books');

	const enabled = booksField === null || booksField === 'own';

	const {
		data: books,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['books', id],
		queryFn: async () => await userService.getUserBooks(id),
		enabled: Boolean(id) && enabled,
		staleTime: 10 * 60 * 1000,
	});

	return { books, isLoading, isError, error, isUserBooksTab: enabled };
};

export default useUserBooks;
