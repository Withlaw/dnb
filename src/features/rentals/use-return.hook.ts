import { rentalsService } from "@/services/rentals-service.ts";
import { useMutation } from "@tanstack/react-query";

const useReturn = () => {

  const { mutate:returnBook, isPending:isReturning } = useMutation({
    mutationFn: async (bookId:number) => await rentalsService.return(bookId),
    onSuccess: res => {
      console.log('rentalsService res: ' ,res);
    },
    onError: err => {
      console.log('rentalsService err: ', err);
    }
  })

  return { returnBook, isReturning };

}
 
export default useReturn;