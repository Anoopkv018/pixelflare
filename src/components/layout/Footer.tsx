import { FormEvent } from 'react';
import { Twitter, Linkedin, Instagram, Facebook, Phone, AtSign, Mail } from 'lucide-react';
import { megaMenuColumns, siteConfig } from '../../config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire this to your submitQuote() or an API endpoint.
    // Example: on successful submit, you can navigate to /thank-you
    // or trigger your existing quote modal flow.
    alert('Thanks! We’ll get back to you shortly.');
  };

  return (
    <footer className="text-white">
      {/* Full-width brand gradient with rounded top */}
      <div className="w-full rounded-t-[32px] md:rounded-t-[44px] bg-gradient-to-br from-[#fe2681] via-[#9b3aa3] to-[#14276d] relative overflow-hidden">
        {/* soft highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_300px_at_-10%_-10%,rgba(255,255,255,0.18),transparent),radial-gradient(800px_260px_at_110%_110%,rgba(255,255,255,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          {/* --- Contact block (left copy + right form) --- */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-14">
            {/* Left: copy + contact lines */}
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Let’s Talk About Your
                <br /> Project
              </h2>
              <p className="mt-4 text-white/90 text-base md:text-lg max-w-xl">
                We’re here to help you grow smarter and faster. Share a few details and we’ll get back
                to you with ideas, solutions, and a plan to bring your vision to life. Whether you need
                web design, branding, or digital marketing, our team is ready to support you every step.
              </p>

              <div className="mt-8 space-y-4 text-white/95">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <Phone className="w-5 h-5" />
                  </span>
                  <a href="tel:+918867376928" className="hover:underline">
                    +91 88673 76928
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <AtSign className="w-5 h-5" />
                  </span>
                  <a href="mailto:info@pixelflare.in" className="hover:underline">
                    info@pixelflare.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <Mail className="w-5 h-5" />
                  </span>
                  <a href="mailto:reachpixelflare@gmail.com" className="hover:underline">
                    reachpixelflare@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4">
              {/* use sr-only labels for accessibility while keeping placeholders visible */}
              <label htmlFor="f_name" className="sr-only">Name</label>
              <input
                id="f_name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <label htmlFor="f_email" className="sr-only">Email</label>
              <input
                id="f_email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <label htmlFor="f_phone" className="sr-only">Phone</label>
              <input
                id="f_phone"
                name="phone"
                type="tel"
                placeholder="Phone"
                required
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <label htmlFor="f_address" className="sr-only">Address</label>
              <textarea
                id="f_address"
                name="address"
                placeholder="Address"
                rows={4}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <label htmlFor="f_brief" className="sr-only">Brief about the project</label>
              <textarea
                id="f_brief"
                name="brief"
                placeholder="Brief about the project"
                rows={4}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-white/15 px-6 py-3 font-semibold text-white transition-all hover:bg-white/25"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Divider above links */}
          <div className="h-px bg-white/20 mb-8" />

          {/* --- Link columns from mega menu --- */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10 mb-8">
            {megaMenuColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="text-white font-bold text-[11px] mb-3 uppercase tracking-[0.18em]">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-white/85 hover:text-white transition-colors text-sm"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom row */}
          <div className="h-px bg-white/20 mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <p className="text-white/85">
                © {currentYear} {siteConfig.name}. All rights reserved.
              </p>
              <span className="hidden md:inline text-white/60">•</span>
              <a href="/privacy" className="text-white/85 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-white/85 hover:text-white transition-colors">
                Terms
              </a>
            </div>

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
    </footer>
  );
}
