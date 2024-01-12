import authService from "@/services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const useUserSession = () => {
  const { data : session, isError, error, isPending ,isFetching} = useQuery({
    queryKey:['user', 'session'],
    queryFn:async () => await authService.getCurrentSession(),
  })

  const isLogin = Boolean(session);

  return { session, isPending, isFetching, isError, error, isLogin};
}

export default useUserSession;