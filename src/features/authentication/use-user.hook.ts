import authService from "@/services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { data : user, isLoading, isError, error} = useQuery({
    queryKey:['user'],
    queryFn: async () => await authService.getUser(),
  })

  const isAuthenticated = user?.role === 'authenticated';

  return { user, isLoading, isError, error, isAuthenticated };
}

export default useUser;