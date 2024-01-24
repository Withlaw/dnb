import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useRentalService } from '@/contexts/index.ts';

const useReturn = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const rentalService = useRentalService();

	const { mutate: returnBook, isPending: isReturning } = useMutation({
		mutationFn: async (rentalId: number) =>
			await rentalService.return(rentalId),
		onSuccess: res => {
			window.alert('반납이 완료되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['rentals', res.customerId] });
			queryClient.invalidateQueries({ queryKey: ['book', res.bookId + ''] });
			navigate('/user');
		},
		onError: err => {
			console.error('rentalsService err: ', err);
		},
	});

	return { returnBook, isReturning };
};

export default useReturn;
