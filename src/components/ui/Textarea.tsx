import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#14276d] mb-2">
            {label}
            {props.required && <span className="text-[#fe2681] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fe2681] focus:outline-none transition-colors ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
