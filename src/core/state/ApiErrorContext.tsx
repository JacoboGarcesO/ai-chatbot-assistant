import React, { createContext, useContext, useReducer, useCallback, useMemo, type ReactNode } from 'react';
import type { ApiError } from '../types/ApiError';

interface ApiErrorState {
  currentError: ApiError | null;
  showNotification: boolean;
  errorHistory: ApiError[];
}

type ApiErrorAction =
  | { type: 'SET_ERROR'; payload: ApiError }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SHOW_NOTIFICATION' }
  | { type: 'HIDE_NOTIFICATION' }
  | { type: 'ADD_TO_HISTORY'; payload: ApiError };

const initialState: ApiErrorState = {
  currentError: null,
  showNotification: false,
  errorHistory: [],
};

const apiErrorReducer = (state: ApiErrorState, action: ApiErrorAction): ApiErrorState => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        currentError: action.payload,
        showNotification: true,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        currentError: null,
        showNotification: false,
      };
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        showNotification: true,
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        showNotification: false,
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        errorHistory: [action.payload, ...state.errorHistory].slice(0, 50), // Mantener solo los últimos 50 errores
      };
    default:
      return state;
  }
};

interface ApiErrorContextType {
  state: ApiErrorState;
  setError: (error: ApiError) => void;
  clearError: () => void;
  showNotification: () => void;
  hideNotification: () => void;
  addToHistory: (error: ApiError) => void;
}

const ApiErrorContext = createContext<ApiErrorContextType | undefined>(undefined);

export const ApiErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(apiErrorReducer, initialState);

  const setError = useCallback((error: ApiError) => {
    dispatch({ type: 'SET_ERROR', payload: error });
    dispatch({ type: 'ADD_TO_HISTORY', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const showNotification = useCallback(() => {
    dispatch({ type: 'SHOW_NOTIFICATION' });
  }, []);

  const hideNotification = useCallback(() => {
    dispatch({ type: 'HIDE_NOTIFICATION' });
  }, []);

  const addToHistory = useCallback((error: ApiError) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: error });
  }, []);

  // Estabilizar el objeto value para evitar recreaciones constantes
  const value = useMemo<ApiErrorContextType>(() => ({
    state,
    setError,
    clearError,
    showNotification,
    hideNotification,
    addToHistory,
  }), [state, setError, clearError, showNotification, hideNotification, addToHistory]);

  return (
    <ApiErrorContext.Provider value={value}>
      {children}
    </ApiErrorContext.Provider>
  );
};

export const useApiErrorContext = (): ApiErrorContextType => {
  const context = useContext(ApiErrorContext);
  if (context === undefined) {
    throw new Error('useApiErrorContext must be used within an ApiErrorProvider');
  }
  return context;
}; 