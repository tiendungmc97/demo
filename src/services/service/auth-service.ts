import { apiClient } from "../api/config";
import { API_ENDPOINTS } from "../api/endpoints";
export interface LoginParams {
  email: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
export interface UserProfile {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}
export const authService = {
  login(data: LoginParams) {
    const url = API_ENDPOINTS.AUTH.LOGIN;
    return apiClient.post<LoginResponse>(url, data);
  },
  logout() {
    const url = API_ENDPOINTS.AUTH.LOGOUT;
    return apiClient.post(url);
  },
  register(data: LoginParams) {
    const url = API_ENDPOINTS.AUTH.REGISTER;
    return apiClient.post(url, data);
  },
  refreshToken(token: string) {
    const data = {
      refreshToken: token,
    };
    const url = API_ENDPOINTS.AUTH.REFRESH_TOKEN;
    return apiClient.post(url, data);
  },
  forgotPassword(email: string) {
    const url = API_ENDPOINTS.AUTH.FORGOT_PASSWORD;
    return apiClient.post(url, { email });
  },
  getUserProfile() {
    const url = API_ENDPOINTS.AUTH.PROFILE;
    return apiClient.get(url);
  },
};
