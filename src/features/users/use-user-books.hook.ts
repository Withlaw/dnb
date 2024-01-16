import { useUserService } from "@/contexts/index.ts";
import { useQuery } from "@tanstack/react-query";

const useUserBooks = (id?:number, enabled:boolean = true) => {
  const userService = useUserService();

  const { data:books, isLoading, isError, error } = useQuery({
    queryKey:['books', id],
    queryFn: async () => await userService.getUserBooks(id),
    enabled : Boolean(id) && enabled,
    staleTime: 10 * 60 * 1000,
  })

  return { books, isLoading, isError, error };
}

export default useUserBooks;