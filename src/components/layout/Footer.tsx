// src/components/layout/Footer.tsx
import { useState, FormEvent } from 'react';
import {
  Linkedin, Instagram, Facebook,
  Phone, AtSign, Mail,
  Loader2, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { megaMenuColumns, siteConfig } from '../../config/site';
import { submitContact } from '../../lib/api';

type Status = { type: 'idle' | 'success' | 'soft-error' | 'error'; message?: string };

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    brief: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (k: keyof typeof form, v: string) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Invalid email';
    if (!form.phone.trim()) next.phone = 'Phone is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setStatus({ type: 'idle' });

    // Combine Address + Brief into one message for the Contact table/email
    const message =
      `Address:\n${form.address || '-'}\n\n` +
      `Project Brief:\n${form.brief || '-'}`;

    try {
      const res = await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        submittedAt: new Date().toISOString(),
      });

      if (res.success) {
        if (res.emailSent) {
          setStatus({
            type: 'success',
            message: 'Thanks! Your message has been sent. We’ll get back to you soon.',
          });
        } else {
          setStatus({
            type: 'soft-error',
            message:
              'We saved your message, but email notification failed. We’ll still reach out soon.',
          });
        }
        setForm({ name: '', email: '', phone: '', address: '', brief: '' });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to submit. Please try again.',
        });
      }
    } catch (err) {
      console.error('Footer contact submit error:', err);
      setStatus({ type: 'error', message: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
      // Auto-hide soft banners
      setTimeout(() => setStatus({ type: 'idle' }), 6000);
    }
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
                to you with ideas, solutions, and a plan to bring your vision to life.
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
              {/* status */}
              <div aria-live="polite">
                {status.type === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50/90 border border-green-200 rounded-xl px-3 py-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}
                {status.type === 'soft-error' && (
                  <div className="flex items-center gap-2 text-orange-600 bg-orange-50/90 border border-orange-200 rounded-xl px-3 py-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}
                {status.type === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50/90 border border-red-200 rounded-xl px-3 py-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}
              </div>

              {/* honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <label htmlFor="f_name" className="sr-only">Name</label>
              <input
                id="f_name"
                name="name"
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />
              {errors.name && <p className="text-sm text-red-200">{errors.name}</p>}

              <label htmlFor="f_email" className="sr-only">Email</label>
              <input
                id="f_email"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />
              {errors.email && <p className="text-sm text-red-200">{errors.email}</p>}

              <label htmlFor="f_phone" className="sr-only">Phone</label>
              <input
                id="f_phone"
                name="phone"
                type="tel"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) => setField('phone', e.target.value)}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />
              {errors.phone && <p className="text-sm text-red-200">{errors.phone}</p>}

              <label htmlFor="f_address" className="sr-only">Address</label>
              <textarea
                id="f_address"
                name="address"
                placeholder="Address"
                rows={4}
                value={form.address}
                onChange={(e) => setField('address', e.target.value)}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <label htmlFor="f_brief" className="sr-only">Brief about the project</label>
              <textarea
                id="f_brief"
                name="brief"
                placeholder="Brief about the project"
                rows={4}
                value={form.brief}
                onChange={(e) => setField('brief', e.target.value)}
                className="w-full rounded-2xl bg-white text-[#14276d] placeholder-gray-400 border border-white/30 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-2xl bg-white/15 px-6 py-3 font-semibold text-white transition-all hover:bg-white/25 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </span>
                ) : (
                  'Submit'
                )}
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

export default Footer;
