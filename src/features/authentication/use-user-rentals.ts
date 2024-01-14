import authService from "@/services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const useUserRentals = (id?:number, enabled:boolean = true) => {
  const { data:rentals, isLoading, isError, error } = useQuery({
    queryKey:['rentals', id],
    queryFn: async () => await authService.getUserRentals(id),
    enabled : Boolean(id) && enabled,
    staleTime: 10 * 60 * 1000,
  })

  console.log('rentals', rentals, error)

  return { rentals, isLoading, isError, error };
}

export default useUserRentals;