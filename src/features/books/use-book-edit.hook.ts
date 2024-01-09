import { BookDataToServer, BookFileToServer } from "@/features/books/books.model.ts";
import { booksService } from "@/services/books-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useBookEdit = (bookId?:string) => {
  const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: editBookPost, isPending: isUpdating } = useMutation({
		mutationFn: async ({
			editedBook,
			imageFiles,
      backup,
		}: {
			editedBook: BookDataToServer;
			imageFiles?: BookFileToServer;
      backup:BookDataToServer;
		}) => {
			return await booksService.editBook({
				id: +bookId!,
				editedBook,
				backup,
				imageFiles,
			});
		},
		onSuccess: res => {
			window.alert('New book successfully created.');
			queryClient.invalidateQueries({ queryKey: [bookId, 'book'] });

			navigate(`/books/${bookId}`, { replace: true });
		},
		onError: error => {
			window.alert(error.message);
			navigate(-1);
		},
	});

  return  { editBookPost, isUpdating };
}

export default useBookEdit;