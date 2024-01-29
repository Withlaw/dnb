import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { useUserService } from '@/contexts/index.ts';

const useUserRentals = (id?: number) => {
	const [params] = useSearchParams();
	const userService = useUserService();

	const booksField = params.get('books');

	const enabled = booksField === 'rent';

	const {
		data: rentals,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['rentals', id],
		queryFn: async () => await userService.getUserRentals(id),
		enabled: Boolean(id) && enabled,
		staleTime: 10 * 60 * 1000,
	});

	return { rentals, isLoading, isError, error, isUserRentalsTab: enabled };
};

export default useUserRentals;
