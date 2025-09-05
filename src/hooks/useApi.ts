'use client';

import { useState, useCallback } from 'react';
import { ApiResponse, ApiException } from '../services';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiReturn<T, TArgs extends unknown[] = unknown[]> extends UseApiState<T> {
  execute: (...args: TArgs) => Promise<T | null>;
  reset: () => void;
}

/**
 * Custom hook for handling API calls with loading states
 */
export function useApi<T = unknown, TArgs extends unknown[] = unknown[]>(
  apiFunction: (...args: TArgs) => Promise<ApiResponse<T>>
): UseApiReturn<T, TArgs> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: TArgs): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);
        
        if (response.success && response.data) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
          return response.data;
        } else {
          const errorMessage = response.message || 'An unexpected error occurred';
          setState({
            data: null,
            loading: false,
            error: errorMessage,
          });
          return null;
        }
      } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        
        if (error instanceof ApiException) {
          errorMessage = error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export default useApi;
