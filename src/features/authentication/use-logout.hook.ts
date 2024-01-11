import authService from "@/services/auth-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate:logout, isPending:isLoading, isError, error } = useMutation({
    mutationFn: async () => await authService.signout(),
    onSuccess:()=>{
      queryClient.removeQueries({queryKey:['user']}) // user 쿼리 캐시 제거.
      navigate('/', {replace:true})
    },
    onError:(error)=>{
      console.error('useLogout error: ', error)
    }
  });

  return {logout, isLoading, isError, error};
}

export default useLogout;