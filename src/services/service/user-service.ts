import { apiClient } from "../api/config";
import { API_ENDPOINTS } from "../api/endpoints";
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export const userService = {
  // Get user profile (with additional data)
  getUserProfile(id: number) {
    const url = API_ENDPOINTS.USERS.PROFILE(id);
    return apiClient.get<User>(API_ENDPOINTS.USERS.DETAIL(id));
  },
};
