import { BookDataToServer, BookFileToServer } from "@/features/books/books.model.ts";
import { booksService } from "@/services/books-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useBookCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

	const { mutate:createNewBookPost, isPending: isCreating } = useMutation({
		mutationFn: async ({
			newBook,
			imageFiles,
		}: {
			newBook: BookDataToServer;
			imageFiles?: BookFileToServer;
		}) => await booksService.createBook(newBook, imageFiles),
		onSuccess: res => {
			window.alert('New book successfully created.');
			queryClient.invalidateQueries({ queryKey: ['books'] });

			const { id } = res;
			navigate(`/books/${id}`, { replace: true });
		},
		onError: error => {
			window.alert(error.message);
		},
	});

  return { createNewBookPost, isCreating };
}

export default useBookCreate;