// src/components/ui/Input.tsx
import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  /** Subtle helper text below the field (shown when no error) */
  hint?: string;
  /** Show a success accent (green border) */
  success?: boolean;
  /** Render label as a floating label inside the field */
  floating?: boolean;
  /** Optional leading icon */
  leadingIcon?: ReactNode;
  /** Optional trailing icon (hidden when clear/password buttons show) */
  trailingIcon?: ReactNode;
  /** Show an inline clear (×) button when value is non-empty */
  clearable?: boolean;
  /** Called when the clear button is clicked */
  onClear?: () => void;
  /** If type="password", show a toggle to reveal/hide text */
  togglePassword?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      success = false,
      floating = false,
      leadingIcon,
      trailingIcon,
      clearable = false,
      onClear,
      togglePassword = true,
      className = '',
      type = 'text',
      id: idProp,
      disabled,
      required,
      value,
      ...props
    },
    ref
  ) => {
    const uid = useId();
    const id = idProp ?? `input-${uid}`;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const showToggle = togglePassword && isPassword;
    const canClear =
      clearable &&
      !disabled &&
      typeof value === 'string' &&
      value.length > 0 &&
      !showToggle; // prefer password toggle if both would collide

    const hasError = Boolean(error);
    const ringColor = hasError
      ? 'focus:ring-red-500'
      : success
      ? 'focus:ring-emerald-500'
      : 'focus:ring-[#fe2681]';

    const borderColor = hasError
      ? 'border-red-500'
      : success
      ? 'border-emerald-500'
      : 'border-gray-200';

    // paddings with icon/controls
    const leftPad = leadingIcon ? 'pl-11' : 'pl-4';
    const rightPad =
      showToggle || canClear || trailingIcon ? 'pr-12' : 'pr-4';

    // For floating label we need a placeholder to trigger peer styles
    const placeholder =
      floating && !props.placeholder ? ' ' : props.placeholder;

    return (
      <div className="w-full">
        {/* Static label above (non-floating) */}
        {!floating && label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#14276d] mb-2"
          >
            {label}
            {required && <span className="text-[#fe2681] ml-1">*</span>}
          </label>
        )}

        <div
          className={[
            'relative group',
            'focus-within:shadow-[0_0_0_3px_rgba(254,38,129,0.06)]',
          ].join(' ')}
        >
          {/* Leading icon */}
          {leadingIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              {leadingIcon}
            </span>
          )}

          {/* Input */}
          <input
            id={id}
            ref={ref}
            type={showPassword ? 'text' : type}
            className={[
              'peer w-full rounded-xl border-2 bg-white text-[#14276d]',
              'placeholder-gray-400',
              'transition-all duration-200',
              borderColor,
              leftPad,
              rightPad,
              'py-3',
              'focus:outline-none focus:border-transparent',
              'focus:ring-2 ring-offset-2 ring-offset-white',
              ringColor,
              'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
              className,
            ].join(' ')}
            aria-invalid={hasError ? 'true' : 'false'}
            required={required}
            disabled={disabled}
            value={value as any}
            placeholder={placeholder}
            {...props}
          />

          {/* Floating label (inside the field) */}
          {floating && label && (
            <label
              htmlFor={id}
              className={[
                'pointer-events-none absolute left-4',
                'text-gray-500',
                'transition-all duration-200',
                // center when placeholder-shown
                'top-1/2 -translate-y-1/2',
                // float when focused or has value
                'peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#fe2681]',
                'peer-[&:not(:placeholder-shown)]:top-2',
                'peer-[&:not(:placeholder-shown)]:-translate-y-0',
                'peer-[&:not(:placeholder-shown)]:text-xs',
              ].join(' ')}
            >
              {label}
              {required && <span className="text-[#fe2681] ml-1">*</span>}
            </label>
          )}

          {/* Trailing controls (order: clear / password / trailingIcon) */}
          {canClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Clear input"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {showToggle && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {!canClear && !showToggle && trailingIcon && (
            <span className="absolute inset-y-0 right-3 inline-flex items-center text-gray-400">
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Error / hint message with animation */}
        <AnimatePresence initial={false} mode="wait">
          {hasError ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1 text-sm text-red-500"
            >
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={`mt-1 text-sm ${
                success ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';
