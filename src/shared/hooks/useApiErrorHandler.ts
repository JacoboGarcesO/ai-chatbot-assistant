import { useCallback } from 'react';
import { useApiErrorContext } from '../../core/state/ApiErrorContext';
import type { ApiError } from '../../core/types/ApiError';

export const useApiErrorHandler = () => {
  const { setError, clearError } = useApiErrorContext();

  const handleApiError = useCallback((error: unknown, context?: string) => {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;

      if (!apiError.endpoint && context) {
        apiError.endpoint = context;
      }

      setError(apiError);

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
  }, [setError]);

  const clearApiError = useCallback(() => {
    clearError();
  }, [clearError]);

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

  const isClientError = useCallback((error: unknown): boolean => {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;
      return apiError.status !== undefined && apiError.status >= 400 && apiError.status < 500;
    }
    return false;
  }, []);

  return {
    handleApiError,
    clearApiError,
    isNetworkError,
    isAuthError,
    isServerError,
    isClientError
  };
}; 