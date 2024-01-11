import { BookDataFromTitleSearch } from "@/features/books/books.model.ts";
import { BookTitleSearchData } from "@/features/books/types.ts";
import useDebounceValue from "@/hooks/use-debounce-value.ts";
import { booksService } from "@/services/books-service.ts";
import { useQuery } from "@tanstack/react-query";

const useBookSeach = (inputValue : string) => {
  const debouncedValue = useDebounceValue(inputValue, 500);

  const { data, isLoading, isError, error } = useQuery({
		enabled: Boolean(debouncedValue),
		queryKey: ['bookSearch', debouncedValue],
		queryFn: () => booksService.searchBook<BookTitleSearchData>(debouncedValue),
		staleTime: 60 * 1000,
	});

  const searchData = data?.items?.map(book=>new BookDataFromTitleSearch(book))
  return { debouncedValue, searchData, isLoading, isError, error };
}

export default useBookSeach;