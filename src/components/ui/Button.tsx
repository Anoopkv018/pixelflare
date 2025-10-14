import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  children,
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'group relative select-none rounded-full font-semibold inline-flex items-center justify-center gap-2 ' +
    'transition-all duration-200 will-change-transform overflow-hidden ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#fe2681] ring-offset-white ' +
    'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ' +
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'text-white bg-gradient-to-tr from-[#fe2681] to-[#bf1c60] ' +
      'shadow-lg shadow-[#bf1c60]/30 hover:shadow-xl active:brightness-95 ' +
      // glossy sweep
      'after:content-[""] after:absolute after:-left-1/2 after:-top-full after:h-[300%] after:w-[120%] ' +
      'after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:-rotate-12 ' +
      'group-hover:after:translate-x-[85%] after:transition-transform after:duration-700',
    secondary:
      'text-white bg-gradient-to-tr from-[#14276d] to-[#0b1020] ' +
      'shadow-lg shadow-[#14276d]/25 hover:shadow-xl active:brightness-95 ' +
      'after:content-[""] after:absolute after:-left-1/2 after:-top-full after:h-[300%] after:w-[120%] ' +
      'after:bg-gradient-to-r after:from-transparent after:via-white/15 after:to-transparent after:-rotate-12 ' +
      'group-hover:after:translate-x-[85%] after:transition-transform after:duration-700',
    outline:
      'border-2 border-[#fe2681] text-[#fe2681] hover:bg-[#fe2681]/10 active:bg-[#fe2681]/15',
    ghost:
      'text-[#14276d] hover:bg-gray-100/70 active:bg-gray-200/70',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-12 px-8 text-lg',
  };

  const width = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      className={`${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"/>
        </svg>
      )}

      {!loading && leadingIcon ? <span className="inline-flex">{leadingIcon}</span> : null}
      <span>{children}</span>
      {!loading && trailingIcon ? <span className="inline-flex">{trailingIcon}</span> : null}
    </button>
  );
}
