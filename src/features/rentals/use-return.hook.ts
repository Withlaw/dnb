import { rentalsService } from "@/services/rentals-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useReturn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate:returnBook, isPending:isReturning } = useMutation({
    mutationFn: async (bookId:number) => await rentalsService.return(bookId),
    onSuccess: (res) => {
      window.alert('반납이 완료되었습니다.');
      queryClient.invalidateQueries({queryKey:['rentals', res.customerId]});
      queryClient.invalidateQueries({queryKey:['book', res.bookId+'']});
      navigate('/user');
    },
    onError: err => {
      console.error('rentalsService err: ', err);
    }
  })

  return { returnBook, isReturning };

}
 
export default useReturn;