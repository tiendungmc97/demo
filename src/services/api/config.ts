import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

// Base API configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
} as const;

export const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getSession();
    const accessToken = token?.user?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (process.env.NEXT_PUBLIC_APP_ENV === "development") {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      });
    }
    return config;
  },
  (error: any) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NEXT_PUBLIC_APP_ENV === "development") {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    const apiError = handleApiError(error);
    // Log error in development
    if (process.env.NEXT_PUBLIC_APP_ENV === "development") {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        message: apiError.message,
        data: error.response?.data,
      });
    }
    return Promise.reject(apiError);
  },
);

function handleApiError(error: AxiosError) {
  const status = error.response?.status || 0;
  const data = error.response?.data as any;

  return {
    message: data?.message || error.message || "An unexpected error occurred",
    status,
    code: data?.code || error.code,
    details: data?.details,
  };
}
// Create specialized API clients for different services
export const createServiceClient = (baseURL?: string, config?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    ...API_CONFIG,
    ...config,
    baseURL: baseURL || API_CONFIG.baseURL,
  });
};

// Export configured clients for different services
export const userApiClient = createServiceClient();
export const postApiClient = createServiceClient();
export const commentApiClient = createServiceClient();
export const analyticsApiClient = createServiceClient(process.env.NEXT_PUBLIC_ANALYTICS_API_URL);
