import { CheckCircle, Home, Mail, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ThankYou() {
  const socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/_pixelflare_', Icon: Instagram },
    { label: 'LinkedIn', href: 'https://linkedin.com/pixelflare-in', Icon: Linkedin },
    { label: 'Facebook', href: 'https://www.facebook.com/people/PixelFlare/61580672992465/', Icon: Facebook },
  ];

  return (
    <div
      className="
        min-h-[65vh] flex items-center justify-center px-4 py-20 sm:py-20
        bg-[radial-gradient(1200px_600px_at_0%_0%,#fff0f6_25%,transparent_60%),radial-gradient(1000px_600px_at_100%_0%,#e0e7ff_18%,transparent_60%),linear-gradient(to_bottom,#f8fafc,#ffffff)]
      "
    >
      <div className="w-full max-w-xl">
        <div
          className="
            relative text-center rounded-3xl border border-slate-100
            bg-white/80 backdrop-blur-xl px-6 py-10 sm:px-10
            shadow-[0_24px_60px_rgba(15,23,42,0.14)]
            overflow-hidden
          "
        >
          {/* top accent */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#fe2681] via-[#ff8fbe] to-[#14276d]" />

          {/* glow */}
          <div className="absolute left-1/2 top-6 -translate-x-1/2 h-40 w-40 rounded-full bg-[#fe2681]/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#22c55e]/15 via-white to-[#22c55e]/10 border border-emerald-100 shadow-[0_18px_40px_rgba(34,197,94,0.35)] mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#14276d] mb-3">
              Thank you!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8">
              We’ve received your submission and our team will get back to you within 24 hours with the next steps.
            </p>

            {/* CTA buttons – icon LEFT of text */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
              <Button
                size="lg"
                onClick={() => (window.location.href = '/')}
                className="
                  rounded-full px-6 sm:px-8
                  bg-gradient-to-r from-[#ff6aa2] via-[#fe2681] to-[#bf1c60]
                  text-white shadow-[0_18px_40px_rgba(254,38,129,0.45)]
                  border-0
                "
              >
                <span className="inline-flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  <span>Go Home</span>
                </span>
              </Button>
            </div>

            {/* Social icons only */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs sm:text-sm text-gray-500">
                Prefer socials? Connect with us here:
              </p>
              <div className="flex gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      h-9 w-9 sm:h-10 sm:w-10 rounded-full
                      flex items-center justify-center
                      border border-slate-200 bg-white/90
                      hover:border-[#fe2681] hover:text-[#fe2681]
                      text-slate-600 transition-colors
                    "
                  >
                    <Icon className="w-4 h-4" />
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[11px] sm:text-[13px] text-gray-500">
              If you shared a time-sensitive project, we’ll prioritize your request as soon as it reaches our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
