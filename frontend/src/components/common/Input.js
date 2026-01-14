import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  size = 'medium',
  variant = 'default',
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const inputClass = [
    'input-wrapper',
    `input-${size}`,
    `input-${variant}`,
    fullWidth && 'input-full-width',
    error && 'input-error',
    icon && `input-with-icon-${iconPosition}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={inputClass}>
      {label && <label className="input-label">{label}</label>}
      
      <div className="input-container">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon-left">{icon}</span>
        )}
        
        <input
          ref={ref}
          className="input-field"
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input-icon input-icon-right">{icon}</span>
        )}
      </div>
      
      {error && <span className="input-error-text">{error}</span>}
      {helperText && !error && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;