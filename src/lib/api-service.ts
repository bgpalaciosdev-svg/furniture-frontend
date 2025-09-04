import { API_CONFIG, buildApiUrl, getApiHeaders } from './api-config';

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

/**
 * Custom error class for API errors
 */
export class ApiException extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.data = data;
  }
}

/**
 * HTTP Methods
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request options
 */
export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
  timeout?: number;
}

/**
 * Core API request function
 */
const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const {
    method = 'GET',
    headers = {},
    body,
    token,
    timeout = API_CONFIG.timeout,
  } = options;

  const url = buildApiUrl(endpoint);
  const apiHeaders = { ...getApiHeaders(token), ...headers };

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const config: RequestInit = {
      method,
      headers: apiHeaders,
      signal: controller.signal,
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      if (body instanceof FormData) {
        // Remove content-type header for FormData (let browser set it)
        delete apiHeaders['Content-Type'];
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    // Parse response
    let data;
    const contentType = response.headers.get('Content-Type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Handle HTTP errors
    if (!response.ok) {
      throw new ApiException(
        data?.message || data || `HTTP Error: ${response.status}`,
        response.status,
        data
      );
    }

    // Return success response
    return data as ApiResponse<T>;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle timeout
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiException('Request timeout', 408);
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new ApiException('Network error - check your internet connection', 0);
    }
    
    // Re-throw API exceptions
    if (error instanceof ApiException) {
      throw error;
    }
    
    // Handle unknown errors
    throw new ApiException(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      500
    );
  }
};

/**
 * API service methods
 */
export const apiService = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string, token?: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, { method: 'GET', token });
  },

  /**
   * POST request
   */
  post: <T = any>(
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: data,
      token,
    });
  },

  /**
   * PUT request
   */
  put: <T = any>(
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data,
      token,
    });
  },

  /**
   * PATCH request
   */
  patch: <T = any>(
    endpoint: string,
    data?: any,
    token?: string
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: data,
      token,
    });
  },

  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string, token?: string): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, { method: 'DELETE', token });
  },

  /**
   * Upload file(s)
   */
  upload: <T = any>(
    endpoint: string,
    formData: FormData,
    token?: string
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
      token,
    });
  },

  /**
   * Request with custom options
   */
  request: <T = any>(
    endpoint: string,
    options: RequestOptions
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, options);
  },
};

export default apiService;
