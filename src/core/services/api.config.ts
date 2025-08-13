import type { ApiError, ApiConfig } from '../types/ApiError';

export const API_CONFIG: ApiConfig = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

class ApiErrorHandler {
  public static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static createError(
    message: string,
    status?: number,
    statusText?: string,
    endpoint?: string,
    method?: string
  ): ApiError {
    const error = new Error(message) as ApiError;
    error.status = status;
    error.statusText = statusText;
    error.endpoint = endpoint;
    error.method = method;
    error.timestamp = new Date().toISOString();
    error.requestId = this.generateRequestId();
    return error;
  }

  static handleFetchError(error: any, endpoint: string, method: string): never {
    let apiError: ApiError;

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        apiError = this.createError(
          'La solicitud tardó demasiado en responder. Por favor, inténtalo de nuevo.',
          408,
          'Request Timeout',
          endpoint,
          method
        );
      } else if (error.message.includes('Failed to fetch')) {
        apiError = this.createError(
          'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
          0,
          'Network Error',
          endpoint,
          method
        );
      } else {
        apiError = this.createError(
          error.message,
          undefined,
          undefined,
          endpoint,
          method
        );
      }
    } else {
      apiError = this.createError(
        'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
        500,
        'Internal Error',
        endpoint,
        method
      );
    }

    throw apiError;
  }

  static handleHttpError(response: Response, endpoint: string, method: string): never {
    let errorMessage: string;

    switch (response.status) {
      case 400:
        errorMessage = 'La solicitud contiene datos inválidos. Por favor, verifica la información enviada.';
        break;
      case 401:
        errorMessage = 'No tienes autorización para realizar esta acción. Inicia sesión nuevamente.';
        break;
      case 403:
        errorMessage = 'No tienes permisos para acceder a este recurso.';
        break;
      case 404:
        errorMessage = 'El recurso solicitado no fue encontrado.';
        break;
      case 409:
        errorMessage = 'El recurso ya existe o hay un conflicto con los datos enviados.';
        break;
      case 422:
        errorMessage = 'Los datos enviados no son válidos. Por favor, corrige los errores.';
        break;
      case 429:
        errorMessage = 'Has excedido el límite de solicitudes. Por favor, espera un momento.';
        break;
      case 500:
        errorMessage = 'Error interno del servidor. Por favor, inténtalo más tarde.';
        break;
      case 502:
        errorMessage = 'El servidor no está disponible en este momento. Por favor, inténtalo más tarde.';
        break;
      case 503:
        errorMessage = 'El servicio no está disponible temporalmente. Por favor, inténtalo más tarde.';
        break;
      default:
        errorMessage = `Error del servidor: ${response.status} ${response.statusText}`;
    }

    const apiError = this.createError(
      errorMessage,
      response.status,
      response.statusText,
      endpoint,
      method
    );

    throw apiError;
  }
}

export const apiCall = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const method = options.method || 'GET';
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      ApiErrorHandler.handleHttpError(response, endpoint, method);
    }

    const contentType = response.headers.get('content-type');
    let data: T;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text() as T;
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && 'status' in error) {
      throw error;
    }

    ApiErrorHandler.handleFetchError(error, endpoint, method);
  }
};

export const api = {
  get: <T = any>(endpoint: string, options: RequestInit = {}) =>
    apiCall<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any, options: RequestInit = {}) =>
    apiCall<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any, options: RequestInit = {}) =>
    apiCall<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = any>(endpoint: string, data?: any, options: RequestInit = {}) =>
    apiCall<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string, options: RequestInit = {}) =>
    apiCall<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api; 