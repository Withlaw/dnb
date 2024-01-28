import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import useDebounceValue from '@/hooks/use-debounce-value.ts';
import { booksService } from '@/services/book-service.ts';

const useBookSearch = () => {
	const [inputValue, setInputValue] = useState('');
	const debouncedValue = useDebounceValue(inputValue, 500);
	const { ref, inView } = useInView({ threshold: 0.5 });

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching: isLoading,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: ['bookSearch2', debouncedValue],
		queryFn: ({ pageParam }) =>
			booksService.searchBook(debouncedValue, pageParam),
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			const last = lastPage.total;
			const nextStart = lastPage.start + 10;
			return last >= nextStart ? nextStart : null;
		},
		enabled: Boolean(debouncedValue),
		staleTime: 60 * 1000,
	});

	const searchResults = useMemo(
		() => data?.pages.flatMap(page => page.items),
		[data],
	);

	const isTyping = inputValue !== debouncedValue;

	const inputChangeHandler = useCallback((value: string) => {
		setInputValue(value);
	}, []);

	useEffect(() => {
		if (inView && hasNextPage) fetchNextPage();
	}, [inView]);

	return {
		scrollEndTarget: ref,
		debouncedValue,
		searchResults,
		hasNextPage,
		isLoading,
		isError,
		error,
		isTyping,
		inputChangeHandler,
		inputValue,
	};
};

export default useBookSearch;

/*
import useDebounceValue from "@/hooks/use-debounce-value.ts";
import { booksService } from "@/services/books-service.ts";
import { useQuery } from "@tanstack/react-query";

const useBookSeach = (inputValue : string) => {
  const debouncedValue = useDebounceValue(inputValue, 500);

  const { data :searchData, isLoading, isError, error } = useQuery({
		enabled: Boolean(debouncedValue),
		queryKey: ['bookSearch', debouncedValue],
		queryFn: () => booksService.searchBook(debouncedValue),
		staleTime: 60 * 1000,
	});

  return { debouncedValue, searchData, isLoading, isError, error };
}

export default useBookSeach;
*/
