import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigation, megaMenuColumn } from '../../config/site';
import { Button } from '../ui/Button';

interface HeaderProps {
  onQuoteClick: () => void;
  currentPath: string;
}

export function Header({ onQuoteClick, currentPath }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);        // desktop mega
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null); // mobile accordion
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => (href === '/' ? currentPath === '/' : currentPath.startsWith(href));

  // ---- desktop mega: forgiving close ----
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // ---- close mega on outside click / ESC; close mobile on ESC ----
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) setOpenIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // ---- lock body scroll when mobile open ----
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW */}
        <div className="flex items-center min-h-[96px] md:min-h-[104px] lg:min-h-[112px] py-2">
          {/* Logo (taller) */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/brand/pixelflare-logo.png"
              alt="PixelFlare"
              className="h-16 w-auto md:h-[68px] lg:h-[85px]"
            />
          </a>

          {/* Desktop nav */}
          <div className="ml-auto hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7 xl:gap-8">
              {navigation.main.map((item, idx) => {
                const hasMega = !!item.megaMenu;
                const open = openIndex === idx;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (!hasMega) return;
                      cancelClose();
                      setOpenIndex(idx);
                    }}
                    onMouseLeave={() => {
                      if (!hasMega) return;
                      scheduleClose();
                    }}
                  >
                    <a
                      href={item.href}
                      aria-haspopup={hasMega ? 'true' : undefined}
                      aria-expanded={hasMega ? open : undefined}
                      onClick={(e) => {
                        if (!hasMega) return;
                        e.preventDefault();
                        setOpenIndex(open ? null : idx);
                      }}
                      className={`inline-flex items-center gap-1.5 text-[#14276d] hover:text-[#fe2681] transition-colors font-medium relative py-1
                        ${isActive(item.href) ? 'after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-full after:bg-[#fe2681]' : ''}`}
                    >
                      {item.label}
                      {hasMega && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                      )}
                    </a>

                    {/* Mega menu */}
                    {hasMega && open && (
                      <div
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        className="absolute left-1/2 -translate-x-1/2 top-full w-screen max-w-4xl"
                      >
                        {/* bridge to remove hover gap */}
                        <div className="h-3 w-full" />
                        <div className="bg-white rounded-2xl shadow-2xl p-6 xl:p-8 border border-gray-100">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {megaMenuColumn.map((column) => (
                              <div key={column.title}>
                                <h3 className="text-[#fe2681] font-bold text-xs mb-3 uppercase tracking-wide">
                                  {column.title}
                                </h3>
                                <ul className="space-y-2">
                                  {column.items.map((sub) => (
                                    <li key={sub.label}>
                                      <a
                                        href={sub.href}
                                        className="text-[#14276d] hover:text-[#fe2681] transition-colors text-sm block py-1"
                                      >
                                        {sub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <Button onClick={onQuoteClick} size="md">
              Get a Quote
            </Button>
          </div>

          {/* Mobile toggler */}
          <button
            className="ml-auto lg:hidden text-[#14276d]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* ===== MOBILE OVERLAY FLYOUT via PORTAL (prevents clipping by transformed ancestors) ===== */}
      {typeof window !== 'undefined' &&
        createPortal(
          <div
            id="mobile-drawer"
            className={`fixed inset-0 z-[100000] lg:hidden ${
              mobileOpen ? '' : 'pointer-events-none'
            }`}
            role="dialog"
            aria-modal="true"
          >
            {/* Dim overlay */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
                mobileOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setMobileOpen(false)}
            />

            {/* Right flyout panel */}
            <div
              className={`
                absolute right-0 top-0 h-full w-[90%] max-w-sm bg-white shadow-2xl border-l border-gray-100
                transform transition-transform duration-300 will-change-transform
                ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <a href="/" className="flex items-center gap-2">
                  <img src="/brand/pixelflare-logo.png" alt="PixelFlare" className="h-12 w-auto" />
                </a>
                <button
                  className="text-[#14276d]"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer body */}
              <div className="h-[calc(100%-64px)] overflow-y-auto px-4 pt-4 pb-6">
                {navigation.main.map((item, idx) => {
                  const hasMega = !!item.megaMenu;
                  const expanded = mobileExpanded === idx;

                  return (
                    <div key={item.label} className="border-b last:border-b-0 border-gray-100 py-2">
                      <button
                        className={`w-full flex items-center justify-between py-2 text-left font-medium
                          ${isActive(item.href) ? 'text-[#fe2681]' : 'text-[#14276d] hover:text-[#fe2681]'}`}
                        onClick={() => {
                          if (!hasMega) {
                            setMobileOpen(false);
                            window.location.href = item.href;
                          } else {
                            setMobileExpanded(expanded ? null : idx);
                          }
                        }}
                        aria-expanded={hasMega ? expanded : undefined}
                        aria-controls={hasMega ? `m-sub-${idx}` : undefined}
                      >
                        <span>{item.label}</span>
                        {hasMega && (
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
                          />
                        )}
                      </button>

                      {/* Accordion submenu */}
                      {hasMega && (
                        <div
                          id={`m-sub-${idx}`}
                          className={`overflow-hidden transition-[max-height,opacity] duration-300
                            ${expanded ? 'opacity-100 max-h-[900px]' : 'opacity-0 max-h-0'}`}
                        >
                          <div className="pl-2 pb-3 pt-1 grid grid-cols-1 gap-4">
                            {megaMenuColumn.map((column) => (
                              <div key={column.title}>
                                <h4 className="text-[#fe2681] font-bold text-xs uppercase mb-2">
                                  {column.title}
                                </h4>
                                <ul className="space-y-1">
                                  {column.items.map((sub) => (
                                    <li key={sub.label}>
                                      <a
                                        href={sub.href}
                                        className="block py-1.5 text-sm text-[#14276d] hover:text-[#fe2681]"
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        {sub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-3">
                  <Button
                    onClick={() => {
                      onQuoteClick();
                      setMobileOpen(false);
                    }}
                    fullWidth
                    size="md"
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
