import { RentalInfoToServer } from "@/features/rentals/rentals.model.ts";
import { rentalsService } from "@/services/rentals-service.ts";
import { useMutation } from "@tanstack/react-query";

const useRent = () => {

  const { mutate:rent, isPending:isRenting } = useMutation({
    mutationFn: async (rentalInfo:RentalInfoToServer) => await rentalsService.rent(rentalInfo),
    onSuccess: res => {
      console.log('rentalsService res: ' ,res);
    },
    onError: err => {
      console.log('rentalsService err: ', err);
    }
  })

  return { rent,isRenting };
}

export default useRent;