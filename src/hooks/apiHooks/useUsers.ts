import { useQuery } from "@tanstack/react-query";
import { fetchUsers, userKeys } from "../../queries/userQueries";

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
