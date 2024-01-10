import authService from "@/services/auth-service.ts";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  const {mutate:login, isPending:isLoading,isError, error } = useMutation({
    mutationFn: async ({email,password}:{email:string, password:string})=> await authService.signin({email,password}),
    onSuccess:(user)=>{
      console.log('sucees: ', user);
    },
    onError:(error)=>{
      console.log('ERROR: ', error)
    }
  });

  return {login, isLoading, isError, error};
}

export default useLogin;