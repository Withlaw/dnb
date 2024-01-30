import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { useUserService } from '@/contexts/index.ts';

const useUserRentals = (id?: number) => {
	const [searchParams] = useSearchParams();
	const userService = useUserService();

	const booksField = searchParams.get('books');
	const filterField = searchParams.get('filter') ?? 'all';

	const enabled = booksField === 'rent';

	let rentals;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['rentals', id],
		queryFn: async () => await userService.getUserRentals(id),
		enabled: Boolean(id) && enabled,
		staleTime: 10 * 60 * 1000,
	});

	if (data) {
		rentals = data?.filter(book => {
			if (filterField === 'all') return true;
			if (filterField === 'rent') return book.rentalStatus === '대여중';
			if (filterField === 'return') return book.rentalStatus === '반납 완료';
		});
	}

	return { rentals, isLoading, isError, error, isUserRentalsTab: enabled };
};

export default useUserRentals;
