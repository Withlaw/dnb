import { BookDataFromServer } from "@/features/books/books.model.ts";
import { booksService } from "@/services/books-service.ts";
import { useQuery } from "@tanstack/react-query";

const useBook = (bookId?:string) => {
	const { data, isLoading, isError , error } = useQuery({
		enabled: Boolean(bookId),
		queryKey: ['book', bookId],
		queryFn: async () => await booksService.getBook(+(bookId!)),
		staleTime: 10 * 60 * 1000,
	});
  
  let book;
  if(data) book = new BookDataFromServer(data);

  return { book , isLoading, isError , error };
}

export default useBook;