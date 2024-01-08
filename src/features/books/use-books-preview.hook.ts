import { BooksPreviewModel } from "@/features/books/books.model.ts";
import { booksService } from "@/services/books-service.ts";
import { useQuery } from "@tanstack/react-query";

const useBooksPreview = () => {
  const { data, isLoading, isError, error } = useQuery({
		queryKey: ['books'],
		queryFn: async () => await booksService.getBooks(),
	});

	const books = data?.map(data => new BooksPreviewModel(data));

  return {books, isLoading ,isError, error};
}

export default useBooksPreview;