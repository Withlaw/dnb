import { booksService } from "@/services/books-service.ts";
import { useQuery } from "@tanstack/react-query";

const useBooksPreview = () => {
  const { data : books, isLoading, isError, error } = useQuery({
		queryKey: ['books'],
		queryFn: async () => await booksService.getBooks(),
	});


  return {books, isLoading ,isError, error};
}

export default useBooksPreview;