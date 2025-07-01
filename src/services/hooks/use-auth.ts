import { QueryOptions, useQuery } from "@tanstack/react-query";
import { authService, UserProfile } from "../service/auth-service";

// Get user profile (with additional data)
export function useUserProfile(options?: QueryOptions<UserProfile>) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.getUserProfile().then((res) => res.data),
    ...options,
  });
}
