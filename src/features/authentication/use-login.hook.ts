import authService from "@/services/auth-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate:login, isPending:isLoading, isError, error } = useMutation({
    mutationFn: async ({email,password}:{email:string, password:string}) => await authService.signin({email,password}),
    onSuccess:(data)=>{
      queryClient.invalidateQueries({queryKey:['user']});
      queryClient.setQueryData(['user'], data.user);  
      // user 쿼리, user session 쿼리 캐시 갱신
      navigate('/', {replace:true});
    },
    onError:(error)=>{
      console.error('useLogin error: ', error)
    }
  });

  return {login, isLoading, isError, error};
}

export default useLogin;