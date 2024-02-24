// import { rentalService } from "@/services/rental-service.ts";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useRentalService } from '@/contexts/index.ts';
import { RentalInfoToServer } from '@/features/rentals/_lib/model.ts';
import useNotice from '@/hooks/use-notice.ts';

const useRent = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const rentalService = useRentalService();
	const { notify } = useNotice();

	const { mutate: rent, isPending: isRenting } = useMutation({
		mutationFn: async (rentalInfo: RentalInfoToServer) =>
			await rentalService.rent(rentalInfo),
		onSuccess: res => {
			notify('대여가 완료 되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['rentals', res.customerId] });
			queryClient.invalidateQueries({ queryKey: ['book', res.bookId + ''] });
			navigate('/user');
		},
		onError: err => {
			console.error('rentalsService err: ', err);
		},
	});

	return { rent, isRenting };
};

export default useRent;
