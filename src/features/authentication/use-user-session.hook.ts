import authService from "@/services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const useUserSession = () => {
  const { data : session, isLoading, isError, error} = useQuery({
    queryKey:['user', 'session'],
    queryFn:async () => await authService.getCurrentSession(),
  })

  const isLogin = Boolean(session);

  return { session, isLoading, isError, error, isLogin};
}

export default useUserSession;