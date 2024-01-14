import authService from "@/services/auth-service.ts";
import { useQuery } from "@tanstack/react-query";

const useUserBooks = (id?:number, enabled:boolean = true) => {
  const { data:books, isLoading, isError, error } = useQuery({
    queryKey:['books', id],
    queryFn: async () => await authService.getUserBooks(id),
    enabled : Boolean(id) && enabled,
    staleTime: 10 * 60 * 1000,
  })

  return { books, isLoading, isError, error };
}

export default useUserBooks;