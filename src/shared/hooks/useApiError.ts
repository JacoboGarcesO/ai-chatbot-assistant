import { useCallback } from 'react';
import type { ApiError } from '../../core/types/ApiError';

export const useApiError = () => {
  const handleError = useCallback((error: unknown, context?: string) => {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;

      console.error(`🚨 API Error in ${context || 'unknown context'}:`, {
        requestId: apiError.requestId,
        endpoint: apiError.endpoint,
        method: apiError.method,
        status: apiError.status,
        statusText: apiError.statusText,
        message: apiError.message,
        timestamp: apiError.timestamp
      });

      return {
        isApiError: true,
        error: apiError,
        userMessage: apiError.message,
        technicalDetails: {
          requestId: apiError.requestId,
          status: apiError.status,
          endpoint: apiError.endpoint,
          method: apiError.method
        }
      };
    }

    return {
      isApiError: false,
      error,
      userMessage: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
      technicalDetails: null
    };
  }, []);

  const isNetworkError = useCallback((error: unknown): boolean => {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;
      return apiError.status === 0 || apiError.status === 408;
    }
    return false;
  }, []);

  const isAuthError = useCallback((error: unknown): boolean => {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;
      return apiError.status === 401 || apiError.status === 403;
    }
    return false;
  }, []);

  const isServerError = useCallback((error: unknown): boolean => {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;
      return apiError.status !== undefined && apiError.status >= 500;
    }
    return false;
  }, []);

  return {
    handleError,
    isNetworkError,
    isAuthError,
    isServerError
  };
}; 