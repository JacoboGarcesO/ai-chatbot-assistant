import React from 'react';
import { useApiErrorContext } from '../../core/state/ApiErrorContext';
import { ApiErrorNotification } from './ApiErrorNotification';

interface ApiErrorWrapperProps {
  children: React.ReactNode;
}

export const ApiErrorWrapper: React.FC<ApiErrorWrapperProps> = ({ children }) => {
  const { state, clearError } = useApiErrorContext();

  const handleClose = () => {
    clearError();
  };

  return (
    <>
      {children}
      <ApiErrorNotification
        error={state.currentError}
        show={state.showNotification}
        onClose={handleClose}
      />
    </>
  );
}; 