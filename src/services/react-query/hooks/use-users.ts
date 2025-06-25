import { QueryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { User, userService } from "@/services/service/user-service";

// Get user profile (with additional data)
export function useUserProfile(id: number, options?: QueryOptions<User>) {
  return useQuery({
    queryKey: queryKeys.users.profile(id),
    queryFn: () => userService.getUserProfile(id).then((res) => res.data),
    enabled: !!id,
    ...options,
  });
}
