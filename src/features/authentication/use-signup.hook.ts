import { UserDataToServer } from "@/features/authentication/users.model.ts";
import authService from "@/services/auth-service.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const {mutate:signup, isPending, isError, error} = useMutation({
    mutationFn: async(user:UserDataToServer)=>await authService.signup(user),
    onSuccess: data => {
      window.alert('회원가입이 완료되었습니다.')
      queryClient.setQueryData(['user'], data.user);  
      queryClient.setQueryData(['user', 'session'], data.session);  
      // user 쿼리, user session 쿼리 캐시 갱신
      navigate('/', {replace:true});
    },
    onError: error => {
      console.error(error);
    }
  })

  return {signup, isPending, isError, error};
}

export default useSignup;