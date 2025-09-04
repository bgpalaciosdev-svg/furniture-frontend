/**
 * API Configuration
 * Centralized configuration for backend API connections
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  version: process.env.NEXT_PUBLIC_API_VERSION || 'api',
  timeout: 10000, // 10 seconds
  socketURL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080',
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY_TOKEN: '/auth/verify-token',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Users
  USERS: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/update-profile',
    GET_ADDRESSES: '/user/addresses',
    ADD_ADDRESS: '/user/add-address',
    UPDATE_ADDRESS: '/user/update-address',
    DELETE_ADDRESS: '/user/delete-address',
  },

  // Products
  PRODUCTS: {
    LIST: '/product/list',
    DETAIL: (id: string) => `/product/${id}`,
    SEARCH: '/product/search',
    BY_CATEGORY: (categoryId: string) => `/product/category/${categoryId}`,
    FEATURED: '/product/featured',
    ON_SALE: '/product/on-sale',
  },

  // Categories
  CATEGORIES: {
    LIST: '/category/list',
    DETAIL: (id: string) => `/category/${id}`,
  },

  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
    CLEAR: '/cart/clear',
    COUNT: '/cart/count',
  },

  // Orders
  ORDERS: {
    CREATE: '/order/create',
    LIST: '/order/list',
    DETAIL: (id: string) => `/order/${id}`,
    TRACK: (id: string) => `/order/track/${id}`,
    CANCEL: (id: string) => `/order/cancel/${id}`,
  },

  // Payment
  PAYMENT: {
    CREATE_INTENT: '/payment/create-intent',
    CONFIRM: '/payment/confirm',
    STATUS: (paymentId: string) => `/payment/status/${paymentId}`,
  },

  // Content
  CONTENT: {
    LIST: '/content/list',
    DETAIL: (id: string) => `/content/${id}`,
  },

  // Uploads
  UPLOAD: {
    IMAGE: '/upload/image',
    MULTIPLE: '/upload/multiple',
  },

  // Admin (if needed)
  ADMIN: {
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    USERS: '/admin/users',
    CONTENT: '/admin/content',
  },

  // Test/Health
  TEST: {
    HEALTH: '/test/health',
    PING: '/test/ping',
  },
} as const;

/**
 * Build full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.baseURL.replace(/\/$/, ''); // Remove trailing slash
  const version = API_CONFIG.version;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${baseUrl}/${version}${cleanEndpoint}`;
};

/**
 * Get API headers with auth token
 */
export const getApiHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['token'] = token; // Backend might expect this format
  }

  return headers;
};

/**
 * Environment checks
 */
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export default API_CONFIG;
