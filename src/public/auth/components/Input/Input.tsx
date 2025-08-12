import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      error = false,
      errorMessage,
      label,
      required = false,
      className = '',
      id,
      name,
      autoComplete,
    },
    ref
  ) => {
    const inputClasses = [
      styles.input,
      error && styles.inputError,
      disabled && styles.inputDisabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.inputContainer}>
        {label && (
          <label htmlFor={id} className={styles.inputLabel}>
            {label}
            {required && <span className={styles.inputRequired}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
        />
        {error && errorMessage && (
          <span className={styles.inputErrorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 