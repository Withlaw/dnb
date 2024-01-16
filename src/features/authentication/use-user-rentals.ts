import { useUserService } from "@/contexts/index.ts";
import { useQuery } from "@tanstack/react-query";

const useUserRentals = (id?:number, enabled:boolean = true) => {
  const userService = useUserService();
  
  const { data:rentals, isLoading, isError, error } = useQuery({
    queryKey:['rentals', id],
    queryFn: async () => await userService.getUserRentals(id),
    enabled : Boolean(id) && enabled,
    staleTime: 10 * 60 * 1000,
  })

  return { rentals, isLoading, isError, error };
}

export default useUserRentals;