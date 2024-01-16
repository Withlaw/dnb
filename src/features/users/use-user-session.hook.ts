import { useUserService } from "@/contexts/index.ts";
import { useQuery } from "@tanstack/react-query";

const useUserSession = () => {
  const userService = useUserService();

  const { data : session, isError, error, isPending ,isFetching} = useQuery({
    queryKey:['user', 'session'],
    queryFn:async () => await userService.getCurrentSession(),
    staleTime:1*60*1000,
  })

  const isLogin = Boolean(session);

  return { session, isPending, isFetching, isError, error, isLogin};
}

export default useUserSession;