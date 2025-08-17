function InputField({
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
  showClearButton = false,
  type = 'text'
}) {
  try {
    const [internalValue, setInternalValue] = React.useState(value);
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const handleChange = (e) => {
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
      };
      setInternalValue('');
      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'px-2 py-1 text-sm';
        case 'lg':
          return 'px-4 py-3 text-lg';
        default:
          return 'px-3 py-2 text-base';
      }
    };

    const getVariantClasses = () => {
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
          return `${baseClasses} bg-gray-100 border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:bg-white`;
        case 'ghost':
          return `${baseClasses} bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:ring-0 focus:border-blue-500`;
        default:
          return `${baseClasses} bg-white border border-gray-300 focus:ring-blue-500 focus:border-blue-500`;
      }
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className="input-field" data-name="input-field" data-file="components/InputField.js">
        {label && (
          <label className={`input-field-label ${invalid || errorMessage ? 'text-red-600' : 'text-gray-700'}`}>
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            type={inputType}
            value={internalValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={`${getVariantClasses()} ${getSizeClasses()}`}
            aria-invalid={invalid || !!errorMessage}
            aria-describedby={helperText || errorMessage ? 'input-help' : undefined}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                <div className={`icon-${showPassword ? 'eye-off' : 'eye'} text-sm`}></div>
              </button>
            )}
            
            {showClearButton && internalValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                <div className="icon-x text-sm"></div>
              </button>
            )}
          </div>
        </div>
        
        {(helperText || errorMessage) && (
          <p
            id="input-help"
            className={`mt-1 text-sm ${errorMessage ? 'text-red-600' : 'text-gray-500'}`}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error('InputField component error:', error);
    return null;
  }
}