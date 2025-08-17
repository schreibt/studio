import React, { useState, useEffect, forwardRef } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  showClearButton?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  className = '',
  id,
  name,
  required = false,
  autoComplete,
  autoFocus = false,
  readOnly = false,
  maxLength,
  minLength,
  pattern,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    setInternalValue('');
    if (onChange) {
      onChange(syntheticEvent);
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2 text-base';
    }
  };

  const getVariantClasses = (): string => {
    const baseClasses = 'w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
    
    if (disabled) {
      return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200`;
    }

    if (invalid || errorMessage) {
      switch (variant) {
        case 'filled':
          return `${baseClasses} bg-red-50 border border-red-300 focus:ring-red-500 focus:border-red-500`;
        case 'ghost':
          return `${baseClasses} bg-transparent border-0 border-b-2 border-red-300 rounded-none focus:ring-0 focus:border-red-500`;
        default:
          return `${baseClasses} bg-white border border-red-300 focus:ring-red-500 focus:border-red-500`;
      }
    }

    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-gray-100 border border-gray-200 focus:ring-primary-500 focus:border-primary-500 focus:bg-white`;
      case 'ghost':
        return `${baseClasses} bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:ring-0 focus:border-primary-500`;
      default:
        return `${baseClasses} bg-white border border-gray-300 focus:ring-primary-500 focus:border-primary-500`;
    }
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = invalid || !!errorMessage;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium mb-1 ${
            hasError ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={internalValue}
          onChange={handleChange}

          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          readOnly={readOnly}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={`${getVariantClasses()} ${getSizeClasses()}`}
          aria-invalid={hasError}
          aria-describedby={helperText || errorMessage ? `${inputId}-help` : undefined}
          aria-required={required}
          {...props}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
          
          {showClearButton && internalValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              tabIndex={-1}
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {(helperText || errorMessage) && (
        <p
          id={`${inputId}-help`}
          className={`mt-1 text-sm ${
            errorMessage ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';


