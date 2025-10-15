// src/components/WhatsAppButton.tsx
import { useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';

type Props = {
  /** Override the number (defaults to siteConfig.whatsapp) */
  phone?: string;
  /** Prefill message (will be URL-encoded) */
  message?: string;
  /** Tooltip label */
  label?: string;
  /** bottom-right (default) or bottom-left placement */
  position?: 'br' | 'bl';
  /** Extra classes to tweak spacing/z if needed */
  className?: string;
};

export function WhatsAppButton({
  phone,
  message,
  label = 'Chat with us',
  position = 'br',
  className = '',
}: Props) {
  const { url, ariaLabel } = useMemo(() => {
    const rawPhone = (phone ?? siteConfig.whatsapp ?? '').replace(/[^0-9]/g, '');
    const fallbackMsg =
      'Hi! I am interested in your services. Can I get a call back?';
    // Add page context to help you identify the lead source
    const composed =
      (message ?? fallbackMsg) +
      (typeof window !== 'undefined'
        ? `\n\nPage: ${document.title}\nURL: ${location.href}`
        : '');
    const encoded = encodeURIComponent(composed);

    const isMobile =
      typeof navigator !== 'undefined' &&
      /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Deep link on mobile, web endpoint on desktop
    const href = isMobile
      ? `whatsapp://send?phone=${rawPhone}&text=${encoded}`
      : `https://wa.me/${rawPhone}?text=${encoded}`;

    return {
      url: href,
      ariaLabel: `Chat on WhatsApp (${rawPhone})`,
    };
  }, [phone, message]);

  const side =
    position === 'bl'
      ? 'left-6 right-auto'
      : 'right-6 left-auto'; // default bottom-right

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      // track with GTM if you use it
      onClick={() =>
        (window as any).dataLayer?.push?.({
          event: 'whatsapp_click',
          page: typeof location !== 'undefined' ? location.pathname : '',
        })
      }
      className={[
        'fixed bottom-6 z-50',
        side,
        'group inline-flex items-center justify-center',
        'w-14 h-14 rounded-full text-white',
        'bg-[#25D366] shadow-lg hover:shadow-xl',
        'transition-transform duration-200 hover:scale-110 focus-visible:scale-110',
        'outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30',
        className,
      ].join(' ')}
    >
      {/* soft pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      {/* online ping dot */}
      <span className="absolute -top-0.5 -right-0.5">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500/70 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
      </span>

      <MessageCircle className="relative w-7 h-7" />

      {/* Tooltip (a11y-friendly) */}
      <span
        role="tooltip"
        className={[
          'absolute top-1/2 -translate-y-1/2',
          position === 'bl' ? 'left-full ml-3' : 'right-full mr-3',
          'pointer-events-none whitespace-nowrap',
          'rounded-lg bg-gray-900 text-white text-sm px-3 py-2',
          'opacity-0 translate-x-1',
          'group-hover:opacity-100 group-hover:translate-x-0',
          'transition-all',
        ].join(' ')}
      >
        {label}
      </span>

      {/* Screen-reader text */}
      <span className="sr-only">{label}</span>
    </a>
  );
}

export default WhatsAppButton;
