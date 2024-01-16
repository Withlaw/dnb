import { useUserService } from "@/contexts/index.ts";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const userService = useUserService();

  const { data : user, isLoading, isError, error} = useQuery({
    queryKey:['user'],
    queryFn: async () => await userService.getUser(),
    staleTime: 30 * 60 * 1000,
  })

  const isAuthenticated = user?.role === 'authenticated';

  return { user, isLoading, isError, error, isAuthenticated };
}

export default useUser;