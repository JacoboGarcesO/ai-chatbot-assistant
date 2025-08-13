import React from 'react';
import type { ApiError } from '../../core/types/ApiError';
import styles from './ApiErrorNotification.module.css';

interface ApiErrorNotificationProps {
  error: ApiError | null;
  onClose: () => void;
  show: boolean;
}

export const ApiErrorNotification: React.FC<ApiErrorNotificationProps> = ({
  error,
  onClose,
  show
}) => {
  if (!show || !error) return null;

  const getErrorIcon = () => {
    if (error.status === 0 || error.status === 408) return '🌐';
    if (error.status === 401 || error.status === 403) return '🔒';
    if (error.status && error.status >= 500) return '🖥️';
    return '⚠️';
  };

  const getErrorType = () => {
    if (error.status === 0 || error.status === 408) return 'Error de Conexión';
    if (error.status === 401 || error.status === 403) return 'Error de Autenticación';
    if (error.status && error.status >= 500) return 'Error del Servidor';
    return 'Error de la Aplicación';
  };

  return (
    <div className={styles.apiErrorNotification}>
      <div className={styles.apiErrorHeader}>
        <span className={styles.apiErrorIcon}>{getErrorIcon()}</span>
        <span className={styles.apiErrorType}>{getErrorType()}</span>
        <button
          className={styles.apiErrorCloseButton}
          onClick={onClose}
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>

      <div className={styles.apiErrorMessage}>
        {error.message}
      </div>

      {error.requestId && (
        <div className={styles.apiErrorDetails}>
          <small>ID de solicitud: {error.requestId}</small>
          {error.endpoint && <small>Endpoint: {error.endpoint}</small>}
          {error.status && <small>Estado: {error.status}</small>}
        </div>
      )}
    </div>
  );
}; 