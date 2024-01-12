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