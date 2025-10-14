import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#14276d] mb-2">
            {label}
            {props.required && <span className="text-[#fe2681] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fe2681] focus:outline-none transition-colors appearance-none bg-white ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
