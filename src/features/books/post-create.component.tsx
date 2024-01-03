import { useMutation, useQueryClient } from '@tanstack/react-query';

import PostForm from '@/features/books/post-form.component.tsx';
import { booksService } from '@/services/books-service.ts';
import Button from '@/ui/button.tsx';

const BookPostCreateForm = () => {
	// const queryClient = useQueryClient();

	// const {mutate} = useMutation({
	//   mutationFn:booksService.createBook
	// })

	return (
		<PostForm>
			<Button>작성 완료</Button>
		</PostForm>
	);
};

export default BookPostCreateForm;
