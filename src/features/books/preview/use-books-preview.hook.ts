import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { booksService } from '@/services/book-service.ts';

const useBooksPreview = () => {
	const { ref, inView } = useInView({ threshold: 0.1, rootMargin: '50px' });

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching: isLoading,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: ['books'],
		queryFn: ({ pageParam }) => booksService.getBooks(pageParam),
		initialPageParam: 0,
		getNextPageParam: lastPage => {
			const last = lastPage.total;
			const nextStart = lastPage.start + 10;
			return last >= nextStart ? nextStart : null;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage) fetchNextPage();
	}, [inView]);

	const books = data?.pages.flatMap(page => page.books);

	return {
		scrollEndTarget: ref,
		books,
		hasNextPage,
		isLoading,
		isError,
		error,
	};
};

export default useBooksPreview;
