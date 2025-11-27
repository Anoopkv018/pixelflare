import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown, Mail, MapPin, Sparkles, Linkedin, Instagram, Facebook, } from 'lucide-react';
import { navigation, megaMenuColumn, siteConfig } from '../../config/site';
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

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  /* -------------------- desktop mega: forgiving close -------------------- */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  /* ---- close mega on outside click / ESC; close mobile on ESC ---- */
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

  /* ---------------------- lock body scroll when mobile ---------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
    >
      {/* === TOPBAR (Brighter Version of Same Gradient Family) === */}
<div className="hidden lg:block bg-gradient-to-r from-[#263578] via-[#4f2f84] to-[#fe2681] border-b border-white/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between text-[13px] text-[#ffffff] py-2">
      
      {/* Left – Tagline */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#fe2681]" />
        <span className="font-medium tracking-wide">
          Crafting Performance-Driven Digital Experiences
        </span>
      </div>

      {/* Right – Social links */}
      <div className="flex items-center gap-3">
              {[
                { href: siteConfig.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: siteConfig.social.instagram, Icon: Instagram, label: 'Instagram' },
                { href: siteConfig.social.facebook, Icon: Facebook, label: 'Facebook' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
                >
                  <Icon size={18} className="text-white group-hover:opacity-90" />
                </a>
              ))}
            </div>

    </div>
  </div>
</div>



      {/* ===== MAIN NAV ROW ===== */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[80px] md:min-h-[90px] lg:min-h-[96px] py-2">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src="/brand/pixelflare-logo.png"
              alt="PixelFlare"
              className="h-14 w-auto md:h-[64px] lg:h-[72px] drop-shadow-sm"
              loading="eager"
              decoding="sync"
            />
          </a>

          {/* Desktop nav */}
          <div className="ml-auto hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 xl:gap-7">
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
                      className={`inline-flex items-center gap-1.5 text-sm font-medium relative px-2 py-1.5 rounded-full transition-all
                        ${
                          isActive(item.href)
                            ? 'bg-[#14276d] text-white shadow-sm'
                            : 'text-[#14276d] hover:text-[#fe2681] hover:bg-slate-50'
                        }`}
                    >
                      {item.label}
                      {hasMega && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                        />
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
                        <div className="bg-white rounded-2xl shadow-2xl p-6 xl:p-8 border border-slate-100">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {megaMenuColumn.map((column) => (
                              <div key={column.title}>
                                <h3 className="text-[#fe2681] font-bold text-[11px] mb-3 uppercase tracking-[0.2em]">
                                  {column.title}
                                </h3>
                                <ul className="space-y-1.5">
                                  {column.items.map((sub) => (
                                    <li key={sub.label}>
                                      <a
                                        href={sub.href}
                                        className="text-sm text-[#14276d] hover:text-[#fe2681] transition-colors block py-1"
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
            className="ml-auto lg:hidden inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-2.5 py-2 text-[#14276d] shadow-sm"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ===== MOBILE OVERLAY FLYOUT via PORTAL ===== */}
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
                absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl border-l border-slate-100
                transform transition-transform duration-300 will-change-transform
                ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
                <a href="/" className="flex items-center gap-2">
                  <img
                    src="/brand/pixelflare-logo.png"
                    alt="PixelFlare"
                    className="h-10 w-auto"
                    loading="eager"
                    fetchpriority="high"
                    decoding="sync"
                  />
                </a>
                <button
                  className="text-[#14276d]"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer body */}
              <div className="h-[calc(100%-64px)] overflow-y-auto px-4 pt-4 pb-6">
                {navigation.main.map((item, idx) => {
                  const hasMega = !!item.megaMenu;
                  const expanded = mobileExpanded === idx;

                  return (
                    <div
                      key={item.label}
                      className="border-b last:border-b-0 border-slate-100 py-1.5"
                    >
                      <button
                        className={`w-full flex items-center justify-between py-2 text-left text-sm font-medium
                          ${
                            isActive(item.href)
                              ? 'text-[#fe2681]'
                              : 'text-[#14276d] hover:text-[#fe2681]'
                          }`}
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
                            className={`w-5 h-5 transition-transform ${
                              expanded ? 'rotate-180' : ''
                            }`}
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
                                <h4 className="text-[#fe2681] font-bold text-[11px] uppercase mb-1.5 tracking-[0.18em]">
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

                <div className="pt-4">
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

                  <a
                    href="mailto:info@pixelflare.in"
                    className="mt-3 block text-center text-xs text-slate-500 hover:text-[#fe2681]"
                  >
                    Prefer email? info@pixelflare.in
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
