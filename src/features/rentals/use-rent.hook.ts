import { RentalInfoToServer } from "@/features/rentals/rentals.model.ts";
import { rentalsService } from "@/services/rentals-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useRent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate:rent, isPending:isRenting } = useMutation({
    mutationFn: async (rentalInfo:RentalInfoToServer) => await rentalsService.rent(rentalInfo),
    onSuccess: (res) => {
      window.alert('대여가 완료되었습니다.');
      queryClient.invalidateQueries({queryKey:['rentals', res.customerId]});
      queryClient.invalidateQueries({queryKey:['book', res.bookId+'']});
      navigate('/user');
    },
    onError: err => {
      console.error('rentalsService err: ', err);
    }
  })

  return { rent,isRenting };
}

export default useRent;