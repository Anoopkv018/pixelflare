// src/components/ui/Modal.tsx
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** New (optional) */
  footer?: ReactNode;
  closeOnOutside?: boolean;   // default true
  disableEscape?: boolean;    // default false
  initialFocusSelector?: string; // e.g. '[data-autofocus]'
  hideCloseButton?: boolean;  // default false
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'lg',
  footer,
  closeOnOutside = true,
  disableEscape = false,
  initialFocusSelector,
  hideCloseButton = false,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useMemo(
    () => (title ? `modal-title-${Math.random().toString(36).slice(2)}` : undefined),
    [title]
  );

  // ---- Scroll lock (no layout shift) ----
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement: doc } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - doc.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  // ---- Focus management & trap ----
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const root = panelRef.current;
      if (!root) return;

      // target by selector (if provided)
      if (initialFocusSelector) {
        const el = root.querySelector<HTMLElement>(initialFocusSelector);
        if (el) { el.focus(); return; }
      }
      // otherwise first focusable
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length) (focusables[0] as HTMLElement).focus();
      else root.setAttribute('tabindex', '-1'), root.focus();
    };

    const timer = requestAnimationFrame(focusFirst);
    return () => cancelAnimationFrame(timer);
  }, [isOpen, initialFocusSelector]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscape) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Trap focus
      const root = panelRef.current;
      if (!root) return;
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, onClose, disableEscape]);

  // Restore focus on close
  useEffect(() => {
    if (isOpen) return;
    previouslyFocused.current?.focus?.();
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[92vw]',
  };

  const panelMaxH = 'max-h-[88vh]';
  const contentMaxH = 'max-h-[calc(88vh-4rem)]'; // account for header/footer

  const overlay = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-hidden="true"
      onClick={() => closeOnOutside && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          'relative w-full',
          sizes[size],
          panelMaxH,
          'animate-scaleIn drop-shadow-2xl',
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={panelRef}
          className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden focus:outline-none"
        >
          {/* Header */}
          {(title || !hideCloseButton) && (
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/85 backdrop-blur">
              {title ? (
                <h2 id={titleId} className="text-xl md:text-2xl font-bold text-[#14276d]">
                  {title}
                </h2>
              ) : <span />}

              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={`overflow-y-auto ${contentMaxH}`}>
            {children}
          </div>

          {/* Footer (optional) */}
          {footer && (
            <div className="sticky bottom-0 z-10 px-6 py-4 border-t border-gray-200 bg-white/85 backdrop-blur">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render in a portal to avoid parent stacking contexts
  return createPortal(overlay, document.body);
}
