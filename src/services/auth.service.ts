import { apiService, ApiResponse } from '../lib/api-service';
import { API_ENDPOINTS } from '../lib/api-config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn?: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Authentication API service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  /**
   * Logout user
   */
  logout: async (token: string): Promise<ApiResponse<any>> => {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT, {}, token);
  },

  /**
   * Verify auth token
   */
  verifyToken: async (token: string): Promise<ApiResponse<{ valid: boolean; user?: User }>> => {
    return apiService.post(API_ENDPOINTS.AUTH.VERIFY_TOKEN, { token }, token);
  },

  /**
   * Refresh auth token
   */
  refreshToken: async (token: string): Promise<ApiResponse<{ token: string }>> => {
    return apiService.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {}, token);
  },

  /**
   * Forgot password
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<any>> => {
    return apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  /**
   * Reset password
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<any>> => {
    return apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },
};

export default authService;
