export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  endpoint?: string;
  method?: string;
  timestamp: string;
  requestId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiRequestOptions extends RequestInit {
  retryAttempts?: number;
  retryDelay?: number;
}

export interface ApiConfig {
  TIMEOUT: number;
  RETRY_ATTEMPTS: number;
  RETRY_DELAY: number;
} 