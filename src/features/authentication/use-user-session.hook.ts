import authService from "@/services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const useUserSession = () => {
  const { data : session, isLoading, isError, error} = useQuery({
    queryKey:['session','user'],
    queryFn:async () => await authService.getCurrentSession(),
    staleTime:5*60*1000
  })

  const isLogin = Boolean(session);

  return { session, isLoading, isError, error, isLogin};
}

export default useUserSession;