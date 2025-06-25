export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  USERS: {
    LIST: "/users",
    DETAIL: (id: number) => `/users/${id}`,
    PROFILE: (id: number) => `/users/${id}/profile`,
  },
} as const;
