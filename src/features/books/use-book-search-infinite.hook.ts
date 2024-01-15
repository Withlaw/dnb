import useDebounceValue from "@/hooks/use-debounce-value.ts";
import { booksService } from "@/services/books-service.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useBookSearchInfinite = (inputValue : string) => {
  const debouncedValue = useDebounceValue(inputValue, 500);
  const { ref, inView  } = useInView({threshold:0.5})

  const { data, fetchNextPage, hasNextPage, isFetching:isLoading, isError, error } = useInfiniteQuery({
    queryKey:['bookSearch2', debouncedValue],
    queryFn: ({ pageParam }) => booksService.searchBook(debouncedValue, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      
      const last = lastPage.total;
      const nextStart = lastPage.start+10;
      return last >= nextStart ? nextStart : null;
    },
    enabled: Boolean(debouncedValue),
    staleTime: 60 * 1000,
  })

  useEffect(()=>{
    if(inView && hasNextPage) fetchNextPage();
  },[inView])

  const searchResults = data?.pages.flatMap(page=>page.items);

  return { debouncedValue, searchResults, hasNextPage, ref, isLoading, isError, error };
}
 
export default useBookSearchInfinite;