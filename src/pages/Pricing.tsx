import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, X, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { pricingTiers } from '../config/pricing';

interface PricingProps {
  onQuoteClick: (category?: string, service?: string) => void;
}

type BillingPeriod = 'monthly' | 'yearly';

/* ---------- Shared styled modal shell ---------- */

interface ModalShellProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalShell({ title, subtitle, onClose, children }: ModalShellProps) {
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 backdrop-blur-sm">
  <div className="relative w-full max-w-5xl mx-3 sm:mx-4 my-4 sm:my-8 max-h-[calc(100vh-2rem)] overflow-y-auto">
        {/* Gradient frame */}
        <div className="relative rounded-[32px] bg-gradient-to-br from-[#fff0f6] via-white to-[#eef2ff] p-[1px] shadow-2xl">
          <div className="relative rounded-[30px] bg-white">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-5 pb-4 bg-white/90 backdrop-blur rounded-t-[30px] border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#14276d]">{title}</h2>
                <p className="mt-1 text-sm sm:text-base text-gray-600">
                  {subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================ MAIN COMPONENT ================ */

export function Pricing({ onQuoteClick }: PricingProps) {
  // Billing toggle (Marketing only)
  const [marketingBilling, setMarketingBilling] = useState<BillingPeriod>('monthly');

  // Which custom modal is open
  const [activeCustom, setActiveCustom] = useState<
    | { type: 'website' }
    | { type: 'marketing' }
    | { type: 'video' }
    | { type: 'branding' }
    | null
  >(null);

  // Name + email for WhatsApp send
  const [whatsName, setWhatsName] = useState('');
  const [whatsEmail, setWhatsEmail] = useState('');

  /* ---------- WhatsApp helper ---------- */

  const sendConfigToWhatsApp = (serviceLabel: string, details: string) => {
    const trimmedName = whatsName.trim();
    const trimmedEmail = whatsEmail.trim();

    if (!trimmedName || !trimmedEmail) {
      alert('Please enter your name and email before sending the configuration.');
      return;
    }

    const message = [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Service: ${serviceLabel}`,
      '',
      'Selected configuration:',
      details,
    ].join('\n');

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/918867376928?text=${encoded}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  /* ---------- Categories ---------- */

  const categories = [
    { id: 'website',   title: 'Website Packages',   description: 'Professional websites that drive results' },
    { id: 'marketing', title: 'Marketing Services', description: 'Data-driven campaigns that grow your business' },
    { id: 'videos',    title: 'Video Production',   description: 'Engaging content that converts' },
    { id: 'branding',  title: 'Branding & Design',  description: 'Identity that makes you unforgettable' }
  ];

  /* ---------- Helpers ---------- */

  const DISCOUNT = 0.15; // yearly: 15% off (when no explicit yearly price)

  const parsePriceNumber = (price?: string | number) => {
    if (price == null) return undefined;
    if (typeof price === 'number') return price;
    if (!/[0-9]/.test(price)) return undefined;
    const digits = price.replace(/[^\d.]/g, '');
    const n = Number(digits);
    return Number.isFinite(n) ? n : undefined;
  };

  const toCurrency = (n?: number | null, fallback?: string) => {
    if (n == null || !Number.isFinite(n)) return fallback ?? '—';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return `₹${Math.round(n)}`;
    }
  };

  // Marketing-only price
  const getMarketingDisplayPrice = (tier: any, period: BillingPeriod) => {
    const m = parsePriceNumber(tier.priceMonthly ?? tier.price);
    const yExplicit = parsePriceNumber(tier.priceYearly);

    if (period === 'monthly') {
      return toCurrency(m, tier.priceMonthly ?? tier.price);
    }

    if (yExplicit != null) return toCurrency(yExplicit, tier.priceYearly);
    if (m != null) {
      const computed = m * 12 * (1 - DISCOUNT);
      return toCurrency(computed);
    }
    return typeof tier.priceYearly === 'string'
      ? tier.priceYearly
      : (tier.price ?? '—');
  };

  const getMarketingPriceNote = (tier: any, period: BillingPeriod) => {
    if (period === 'monthly') return '/month';
    const hasExplicitYearly = tier.priceYearly != null;
    return hasExplicitYearly ? 'billed yearly' : `billed yearly · save ${Math.round(DISCOUNT * 100)}%`;
  };

  // Fallback price for other categories
  const getStaticDisplayPrice = (tier: any) => {
    const n = parsePriceNumber(tier.price);
    return toCurrency(n, tier.price ?? '—');
  };

  const quickNav = useMemo(
    () => categories.filter(c => pricingTiers.some(t => t.category === c.id)),
    []
  );

  /* ---------- Website custom estimator state ---------- */

  const [websiteType, setWebsiteType] = useState<'static' | 'dynamic' | 'ecommerce'>('static');
  const [websitePages, setWebsitePages] = useState<'5-10' | '10-15'>('5-10');
  const [includeDomain, setIncludeDomain] = useState(true);
  const [includeHosting, setIncludeHosting] = useState(true);
  const [websiteGoal, setWebsiteGoal] = useState('Increase enquiries and leads from the website');

  const websiteEstimate = (() => {
    let base = 0;
    if (websiteType === 'static') base = websitePages === '5-10' ? 10000 : 13000;
    if (websiteType === 'dynamic') base = websitePages === '5-10' ? 15000 : 20000;
    if (websiteType === 'ecommerce') base = websitePages === '5-10' ? 25000 : 35000;

    if (includeDomain) base += 1000;
    if (includeHosting) base += 4000;
    return base;
  })();

  /* ---------- Marketing custom estimator state ---------- */

// Marketing custom estimator state
const [marketingSeo, setMarketingSeo] = useState(true);
const [marketingSeoPages, setMarketingSeoPages] =
  useState<'5' | '10' | 'unlimited'>('5');
const [marketingSocial, setMarketingSocial] = useState(false);
const [marketingSocialPack, setMarketingSocialPack] =
  useState<'basic' | 'plus' | 'pro'>('basic'); // NEW
const [marketingAds, setMarketingAds] = useState(true);
const [marketingCampaigns, setMarketingCampaigns] =
  useState<'1-2' | '3-6'>('1-2');
const [marketingSpeed, setMarketingSpeed] =
  useState<'light' | 'steady' | 'aggressive'>('steady');
const [marketingGoal, setMarketingGoal] = useState(
  'Increase qualified leads every month'
);



  const marketingEstimate = (() => {
    let total = 0;

    // SEO
    if (marketingSeo) {
      total += 5000;
      if (marketingSeoPages === '10') total += 1000;
      if (marketingSeoPages === 'unlimited') total += 2000;
    }

    // Social media
     if (marketingSocial) {
    if (marketingSocialPack === 'basic') total += 8000;      // 15 posters & 3 reels
    else if (marketingSocialPack === 'plus') total += 15000; // 18 posters & 6 reels + ad designs
    else if (marketingSocialPack === 'pro') total += 18000;  // 20 posters & 8 reels + ad designs
  }

    // Google/Meta ads
    if (marketingAds) {
      total += 2000;
      if (marketingCampaigns === '3-6') total += 2000;
    }

    // Speed multiplier
    

    // Yearly toggle
    if (marketingBilling === 'yearly') {
      total = total * 12 * (1 - DISCOUNT);
    }

    return Math.round(total);
  })();

  /* ---------- Video custom estimator state ---------- */

  const [videoType, setVideoType] = useState<'explainer' | 'testimonial' | 'reel'>('explainer');
  const [videoLength, setVideoLength] = useState<'1-3' | '3-6' | '6-10'>('1-3');
  const [videoShoot, setVideoShoot] = useState(false);
  const [videoGoal, setVideoGoal] = useState('Explain our product or service clearly');

  const videoEstimate = (() => {
    let base = 0;

    if (videoType === 'explainer') {
      if (videoLength === '1-3') base = 2500;
      if (videoLength === '3-6') base = 3500;
      if (videoLength === '6-10') base = 5000;
    }

    if (videoType === 'testimonial') {
      if (videoLength === '1-3') base = 2000;
      if (videoLength === '3-6') base = 3000;
      if (videoLength === '6-10') base = 4000;
    }

    if (videoType === 'reel') {
      base = 1200;
      if (videoShoot) base += 1500; // updated from 10000 to 1500
    }

    return base;
  })();

  /* ---------- Branding custom estimator state ---------- */

  type BrandMode = 'new' | 'refresh';
  type BrandService = 'logo' | 'kit' | 'web';

  const [brandMode, setBrandMode] = useState<BrandMode>('new');
  const [brandService, setBrandService] = useState<BrandService>('logo');
  const [brandingGoal, setBrandingGoal] = useState('Launch a new brand with a strong visual identity');

  const brandingEstimate = (() => {
    if (brandMode === 'new') {
      if (brandService === 'logo') return 4500;
      if (brandService === 'kit') return 6000;
      if (brandService === 'web') return 3000;
    } else {
      if (brandService === 'logo') return 2500;
      if (brandService === 'kit') return 4000;
      if (brandService === 'web') return 3000;
    }
    return 0;
  })();

  /* ---------- Dynamic marketing goal options ---------- */

  const marketingGoalOptions = useMemo(() => {
    const options: string[] = [];
    if (marketingSeo) options.push('Grow long-term organic traffic with SEO');
    if (marketingSocial) options.push('Build a consistent social media presence');
    if (marketingAds) options.push('Improve ROI from Google & Meta ads');
    options.push('Something else — let’s discuss on a call');
    return options;
  }, [marketingSeo, marketingSocial, marketingAds]);

  /* =================== RENDER =================== */

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_600px_at_5%_-10%,#fff0f6_30%,transparent_70%),radial-gradient(900px_500px_at_95%_-10%,#eef2ff_25%,transparent_70%)] py-16 md:py-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/70 border border-white/60 backdrop-blur text-[#14276d]">
              <Sparkles className="w-4 h-4 text-[#fe2681]" /> Transparent & Flexible
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold text-[#14276d]">
              Our Pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Transparent pricing for exceptional results. Choose the package that fits your needs.
            </p>
          </motion.div>

          {/* Quick nav pills */}
          {quickNav.length > 1 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {quickNav.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white/80 backdrop-blur hover:border-[#fe2681] hover:text-[#fe2681] transition-colors"
                >
                  {c.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CATEGORIES & TIERS ===== */}
      {categories.map((category) => {
        const tiers = pricingTiers.filter((tier: any) => tier.category === category.id);
        if (tiers.length === 0) return null;

        const isMarketing = category.id === 'marketing';

        return (
          <section key={category.id} id={category.id} className="py-16 md:py-20 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#14276d] mb-2">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-600 mb-4">{category.description}</p>

                {isMarketing && (
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1">
                      <button
                        aria-pressed={marketingBilling === 'monthly'}
                        onClick={() => setMarketingBilling('monthly')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          marketingBilling === 'monthly'
                            ? 'bg-white text-[#14276d] shadow'
                            : 'text-[#14276d] hover:text-[#fe2681]'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        aria-pressed={marketingBilling === 'yearly'}
                        onClick={() => setMarketingBilling('yearly')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          marketingBilling === 'yearly'
                            ? 'bg-white text-[#14276d] shadow'
                            : 'text-[#14276d] hover:text-[#fe2681]'
                        }`}
                      >
                        Yearly <span className="ml-1 text-[#fe2681]">Save 15%</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cards grid — 3 columns where available */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {tiers.map((tier: any, i: number) => {
                  const price = isMarketing
                    ? getMarketingDisplayPrice(tier, marketingBilling)
                    : getStaticDisplayPrice(tier);

                  const note = isMarketing
                    ? getMarketingPriceNote(tier, marketingBilling)
                    : (tier.priceNote ?? '');

                  // Make the 3rd card of each category the custom estimator
                  const isCustomWebsite  = category.id === 'website'  && i === 2;
                  const isCustomMarketing = category.id === 'marketing' && i === 2;
                  const isCustomVideo    = category.id === 'videos'   && i === 1;
                  const isCustomBranding = category.id === 'branding' && i === 1;

                  return (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                    >
                      <Card
                        className={`relative overflow-hidden rounded-2xl border ${
                          tier.popular
                            ? 'border-[#fe2681]/60 ring-2 ring-[#fe2681]/50'
                            : 'border-gray-100'
                        }`}
                        hover
                      >
                        {/* Gradient top line */}
                        <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#fe2681] via-[#bf1c60] to-[#14276d]" />

                        {/* Header */}
                        <div className="text-center mb-6 mt-3">
                          <h3 className="text-2xl font-bold text-[#14276d]">{tier.name}</h3>
                          <p className="mt-1 text-gray-600 text-sm">{tier.description}</p>
                          <div className="mt-4 flex items-baseline justify-center gap-2">
                            <div className="text-4xl font-extrabold text-[#fe2681]">{price}</div>
                            {note && <div className="text-sm text-gray-500">{note}</div>}
                          </div>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-6">
                          {tier.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-[#fe2681] mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA — only custom estimators show button */}
                        {(isCustomWebsite || isCustomMarketing || isCustomVideo || isCustomBranding) && (
                          <Button
                            fullWidth
                            variant="primary"
                            className="mt-2"
                            onClick={() => {
                              if (isCustomWebsite) setActiveCustom({ type: 'website' });
                              else if (isCustomMarketing) setActiveCustom({ type: 'marketing' });
                              else if (isCustomVideo) setActiveCustom({ type: 'video' });
                              else if (isCustomBranding) setActiveCustom({ type: 'branding' });
                            }}
                          >
                            Estimate this package
                          </Button>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== CUSTOM QUOTE (simple CTA) ===== */}
<section className="relative py-16 md:py-20 bg-[#f7f7fb]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#fe2681] via-[#bf1c60] to-[#14276d] p-[1px] shadow-[0_24px_70px_rgba(20,39,109,0.28)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-[30px] bg-white/95 backdrop-blur px-6 py-8 md:px-10 md:py-9">
        {/* Left copy */}
        <div className="max-w-xl text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#f7f7fb] px-3 py-1 text-xs font-semibold tracking-wide text-[#14276d]">
            <Sparkles className="h-4 w-4 text-[#fe2681]" />
            Talk to us the way you like
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#14276d]">
            Need a custom solution?
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Every business is different. Share a few details and we’ll shape a plan that fits your
            website, marketing and brand goals.
          </p>
          <p className="mt-3 text-xs text-gray-500">
            We usually respond within{' '}
            <span className="font-semibold text-[#14276d]">1 business day.</span>
          </p>
        </div>

        {/* Right actions */}
        <div className="w-full md:w-auto">
          <div className="flex flex-col gap-3">
            {/* Call + WhatsApp */}
            <div className="grid grid-cols-2 gap-3">
              <Button
  size="md"
  variant="outline"
  className="flex items-center justify-center gap-2 border-slate-200 bg-white text-[#14276d] hover:border-[#fe2681] hover:text-[#fe2681]"
  onClick={() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:+918867376928';
    }
  }}
>
  <span className="inline-flex items-center gap-2">
    <Phone className="h-4 w-4" />
    <span>Call</span>
  </span>
</Button>

<Button
  size="md"
  variant="outline"
  className="flex items-center justify-center gap-2 border-slate-200 bg-white text-[#14276d] hover:border-[#25D366] hover:text-[#128C7E]"
  onClick={() => {
    if (typeof window !== 'undefined') {
      const msg = encodeURIComponent(
        'Hi PixelFlare, I’d like to discuss a custom package for my business.'
      );
      window.open(`https://wa.me/918867376928?text=${msg}`, '_blank');
    }
  }}
>
  <span className="inline-flex items-center gap-2">
    <MessageCircle className="h-4 w-4" />
    <span>WhatsApp</span>
  </span>
</Button>

            </div>

            {/* Primary contact-page CTA */}
            <Button
              size="md"
              variant="primary"
              className="flex items-center justify-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/contact';
                }
              }}
            >
              <span className="inline-flex items-center gap-2">
    <ArrowRight className="h-4 w-4" />
    <span>Tell us about your project</span>
  </span>
            </Button>

            <p className="mt-1 text-[11px] text-center text-gray-500">
              Prefer email?{' '}
              <a
                className="font-medium text-[#fe2681] hover:underline"
                href="mailto:info@pixelflare.in"
              >
                info@pixelflare.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ====================== MODALS ====================== */}

      {/* WEBSITE MODAL */}
      {activeCustom?.type === 'website' && (
        <ModalShell
          title="Custom website estimate"
          subtitle="Adjust a few inputs to get a realistic starting estimate before we talk."
          onClose={() => setActiveCustom(null)}
        >
<div className="grid lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Website type
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: 'static', label: 'Static', desc: 'Informational website' },
                    { id: 'dynamic', label: 'Dynamic', desc: 'CMS / content-managed' },
                    { id: 'ecommerce', label: 'E-commerce', desc: 'Product catalog & checkout' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setWebsiteType(opt.id as any)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                        websiteType === opt.id
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white hover:border-[#fe2681]/50'
                      }`}
                    >
                      <div className="font-semibold text-[#14276d]">{opt.label}</div>
                      <p className="mt-1 text-xs text-gray-600">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                {websiteType === 'ecommerce' && (
                  <p className="mt-2 text-xs text-gray-500">
                    Note: Estimate includes upload support for up to 20 products. For larger catalogs,
                    we will guide your team and can quote separately if needed.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Approx. number of pages
                </h3>
                <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm">
                  {[
                    { id: '5-10', label: '5–10 pages' },
                    { id: '10-15', label: '10–15 pages' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setWebsitePages(opt.id as any)}
                      className={`px-4 py-2 rounded-full font-semibold transition-all ${
                        websitePages === opt.id
                          ? 'bg-white text-[#14276d] shadow'
                          : 'text-[#14276d] hover:text-[#fe2681]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Add-ons
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <button
                    onClick={() => setIncludeDomain(!includeDomain)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      includeDomain ? 'border-[#fe2681] bg-[#fff0f6]' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#14276d]">Domain</span>
                      <span className="text-xs text-gray-500">+₹1,000 / year</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">We help pick & configure the right domain.</p>
                  </button>
                  <button
                    onClick={() => setIncludeHosting(!includeHosting)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      includeHosting ? 'border-[#fe2681] bg-[#fff0f6]' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#14276d]">Hosting</span>
                      <span className="text-xs text-gray-500">+₹4,000 / year</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Fast, secure hosting setup with basic monitoring.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Main goal
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    'Increase enquiries and leads from the website',
                    'Look more premium and trustworthy online',
                    'Explain our services more clearly',
                    'Something else — let’s discuss on a call',
                  ].map((g) => (
                    <button
                      key={g}
                      onClick={() => setWebsiteGoal(g)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                        websiteGoal === g
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white hover:border-[#fe2681]/50'
                      }`}
                    >
                      <span className="text-sm text-[#14276d]">{g}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={whatsName}
                    onChange={(e) => setWhatsName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={whatsEmail}
                    onChange={(e) => setWhatsEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Summary + send */}
              <div className="rounded-2xl border border-slate-100 bg-[#f7f7fb] p-4 text-sm space-y-3">
                <h4 className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase">
                  Your configuration
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>Website type: {websiteType === 'static' ? 'Static' : websiteType === 'dynamic' ? 'Dynamic' : 'E-commerce'}</li>
                  <li>Pages: {websitePages === '5-10' ? '5–10 pages' : '10–15 pages'}</li>
                  <li>Domain: {includeDomain ? 'Included' : 'Not included'}</li>
                  <li>Hosting: {includeHosting ? 'Included' : 'Not included'}</li>
                  <li>Main goal: {websiteGoal}</li>
                </ul>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2">
                  <div className="text-xs text-gray-500">
                    ESTIMATED BUDGET
                    <div className="text-[10px] text-gray-400">non-binding estimate</div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#fe2681]">
                    {toCurrency(websiteEstimate)}
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="primary"
                  className="mt-3"
                  onClick={() =>
                    sendConfigToWhatsApp(
                      'Website – PixelBlaze package',
                      [
                        `Website type: ${websiteType}`,
                        `Pages: ${websitePages}`,
                        `Domain: ${includeDomain ? 'Yes' : 'No'}`,
                        `Hosting: ${includeHosting ? 'Yes' : 'No'}`,
                        `Goal: ${websiteGoal}`,
                        `Estimated budget: ${toCurrency(websiteEstimate)}`,
                      ].join('\n')
                    )
                  }
                >
                  Send configuration to WhatsApp
                </Button>
              </div>
            </div>
          </div>        </ModalShell>
      )}

      {/* MARKETING MODAL */}
      {activeCustom?.type === 'marketing' && (
        <ModalShell
          title="Custom marketing plan"
          subtitle="Adjust a few inputs to get a realistic starting estimate before we talk."
          onClose={() => setActiveCustom(null)}
        >
          {/* Top toggle (inside modal) */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1 text-xs sm:text-sm">
              <button
                aria-pressed={marketingBilling === 'monthly'}
                onClick={() => setMarketingBilling('monthly')}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-semibold transition-all ${
                  marketingBilling === 'monthly'
                    ? 'bg-white text-[#14276d] shadow'
                    : 'text-[#14276d] hover:text-[#fe2681]'
                }`}
              >
                Monthly
              </button>
              <button
                aria-pressed={marketingBilling === 'yearly'}
                onClick={() => setMarketingBilling('yearly')}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-semibold transition-all ${
                  marketingBilling === 'yearly'
                    ? 'bg-white text-[#14276d] shadow'
                    : 'text-[#14276d] hover:text-[#fe2681]'
                }`}
              >
                Yearly <span className="ml-1 text-[#fe2681]">Save 15%</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] gap-8">
            {/* Left */}
            <div className="space-y-6 text-sm">
              {/* Channels */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Channels to focus on
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setMarketingSeo(!marketingSeo)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      marketingSeo ? 'border-[#fe2681] bg-[#fff0f6]' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-[#14276d]">SEO</div>
                    <p className="mt-1 text-xs text-gray-600">
                      Improve rankings and organic traffic over time.
                    </p>
                  </button>
                  <button
                    onClick={() => setMarketingSocial(!marketingSocial)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      marketingSocial ? 'border-[#fe2681] bg-[#fff0f6]' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-[#14276d]">Social media</div>
                    <p className="mt-1 text-xs text-gray-600">
                      Plan, design, and publish content on key platforms.
                    </p>
                  </button>
                  <button
                    onClick={() => setMarketingAds(!marketingAds)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      marketingAds ? 'border-[#fe2681] bg-[#fff0f6]' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-[#14276d]">Google / Meta Ads</div>
                    <p className="mt-1 text-xs text-gray-600">
                      Paid campaigns to capture ready-to-buy audiences.
                    </p>
                  </button>
                </div>
              </div>

              {/* SEO pages (only when SEO on) */}
              {marketingSeo && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                    SEO pages per month
                  </h3>
                  <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs sm:text-sm">
                    {[
                      { id: '5', label: '5 pages / month', extra: '+₹0' },
                      { id: '10', label: '10 pages / month', extra: '+₹1,000' },
                      { id: 'unlimited', label: 'Unlimited pages', extra: '+₹2,000' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setMarketingSeoPages(opt.id as any)}
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all ${
                          marketingSeoPages === opt.id
                            ? 'bg-white text-[#14276d] shadow'
                            : 'text-[#14276d] hover:text-[#fe2681]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Social media package (only when Social media is on) */}
{marketingSocial && (
  <div>
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
      Social media package
    </h3>
    <div className="grid sm:grid-cols-3 gap-3">
      <button
        onClick={() => setMarketingSocialPack('basic')}
        className={`rounded-2xl border px-4 py-3 text-left transition-all ${
          marketingSocialPack === 'basic'
            ? 'border-[#fe2681] bg-[#fff0f6]'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="font-semibold text-[#14276d]">Starter</div>
        <p className="mt-1 text-xs text-gray-600">
          15 posters &amp; 3 reels per month.
        </p>
        <p className="mt-2 text-xs text-gray-500">Approx. ₹8,000 / month</p>
      </button>

      <button
        onClick={() => setMarketingSocialPack('plus')}
        className={`rounded-2xl border px-4 py-3 text-left transition-all ${
          marketingSocialPack === 'plus'
            ? 'border-[#fe2681] bg-[#fff0f6]'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="font-semibold text-[#14276d]">Growth</div>
        <p className="mt-1 text-xs text-gray-600">
          18 posters &amp; 6 reels + ad poster designs (up to 10 images).
        </p>
        <p className="mt-2 text-xs text-gray-500">Approx. ₹15,000 / month</p>
      </button>

      <button
        onClick={() => setMarketingSocialPack('pro')}
        className={`rounded-2xl border px-4 py-3 text-left transition-all ${
          marketingSocialPack === 'pro'
            ? 'border-[#fe2681] bg-[#fff0f6]'
            : 'border-slate-200 bg-white'
        }`}
      >
        <div className="font-semibold text-[#14276d]">Scale</div>
        <p className="mt-1 text-xs text-gray-600">
          20 posters &amp; 8 reels + ad poster designs (up to 10 images).
        </p>
        <p className="mt-2 text-xs text-gray-500">Approx. ₹18,000 / month</p>
      </button>
    </div>
  </div>
)}

              {/* Campaigns (only when Ads on) */}
              {marketingAds && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                    Ad campaigns per month
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setMarketingCampaigns('1-2')}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        marketingCampaigns === '1-2'
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-[#14276d]">1–2 campaigns</div>
                      <p className="mt-1 text-xs text-gray-600">
                        Perfect for always-on lead or sales campaign.
                      </p>
                    </button>
                    <button
                      onClick={() => setMarketingCampaigns('3-6')}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        marketingCampaigns === '3-6'
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-[#14276d]">3–6 campaigns</div>
                      <p className="mt-1 text-xs text-gray-600">
                        Multiple campaigns for testing and scaling winners.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Speed */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  How fast do you want to move?
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light', desc: 'Brand presence & basic visibility.' },
                    { id: 'steady', label: 'Steady', desc: 'Consistent campaigns and optimisation.' },
                    { id: 'aggressive', label: 'Aggressive', desc: 'Faster testing & scaling.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setMarketingSpeed(opt.id as any)}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        marketingSpeed === opt.id
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-[#14276d]">{opt.label}</div>
                      <p className="mt-1 text-xs text-gray-600">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6 text-sm">
              {/* Goal */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Main goal
                </h3>
                <div className="space-y-2">
                  {marketingGoalOptions.map((g) => (
                    <button
                      key={g}
                      onClick={() => setMarketingGoal(g)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                        marketingGoal === g
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white hover:border-[#fe2681]/50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={whatsName}
                    onChange={(e) => setWhatsName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={whatsEmail}
                    onChange={(e) => setWhatsEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-slate-100 bg-[#f7f7fb] p-4 space-y-3">
                <h4 className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase">
                  Your configuration
                </h4>
                <ul className="space-y-1 text-gray-700">
  <li>
    Channels:{' '}
    {[
      marketingSeo && 'SEO',
      marketingSocial && 'Social media',
      marketingAds && 'Google / Meta Ads',
    ]
      .filter(Boolean)
      .join(', ') || 'None selected'}
  </li>
  {marketingSeo && <li>SEO pages per month: {marketingSeoPages}</li>}
  {marketingSocial && (
    <li>
      Social media package:{' '}
      {marketingSocialPack === 'basic'
        ? '15 posters & 3 reels'
        : marketingSocialPack === 'plus'
        ? '18 posters & 6 reels + ad designs (up to 10 images)'
        : '20 posters & 8 reels + ad designs (up to 10 images)'}
    </li>
  )}
  {marketingAds && <li>Ad campaigns per month: {marketingCampaigns}</li>}
  <li>Speed: {marketingSpeed}</li>
  <li>Billing: {marketingBilling === 'monthly' ? 'Monthly' : 'Yearly (approximate)'}</li>
  <li>Main goal: {marketingGoal}</li>
</ul>


                <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2">
                  <div className="text-xs text-gray-500">
                    ESTIMATED BUDGET
                    <div className="text-[10px] text-gray-400">
                      non-binding estimate ({marketingBilling === 'monthly' ? 'per month' : 'per year'})
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#fe2681]">
                    {toCurrency(marketingEstimate)}
                  </div>
                </div>

                <Button
  fullWidth
  variant="primary"
  className="mt-3"
  onClick={() =>
    sendConfigToWhatsApp(
      'Marketing – Performance plan',
      [
        `Channels: ${
          [
            marketingSeo && 'SEO',
            marketingSocial && 'Social media',
            marketingAds && 'Google / Meta Ads',
          ]
            .filter(Boolean)
            .join(', ') || 'None'
        }`,
        marketingSeo ? `SEO pages per month: ${marketingSeoPages}` : '',
        marketingSocial
          ? `Social media package: ${
              marketingSocialPack === 'basic'
                ? '15 posters & 3 reels'
                : marketingSocialPack === 'plus'
                ? '18 posters & 6 reels + ad creatives (up to 10 images)'
                : '20 posters & 8 reels + ad creatives (up to 10 images)'
            }`
          : '',
        marketingAds ? `Ad campaigns per month: ${marketingCampaigns}` : '',
        `Speed: ${marketingSpeed}`,
        `Billing: ${marketingBilling}`,
        `Goal: ${marketingGoal}`,
        `Estimated budget: ${toCurrency(marketingEstimate)}`,
      ]
        .filter(Boolean)
        .join('\n')
    )
  }
>
  Send configuration to WhatsApp
</Button>

              </div>
            </div>
          </div>
        </ModalShell>
      )}

      {/* VIDEO MODAL */}
      {activeCustom?.type === 'video' && (
        <ModalShell
          title="Custom video plan"
          subtitle="Roughly estimate the effort based on type and length of video."
          onClose={() => setActiveCustom(null)}
        >
          <div className="grid lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] gap-8 text-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Video type
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: 'explainer', label: 'Explainer', desc: 'Explain product or service' },
                    { id: 'testimonial', label: 'Testimonial', desc: 'Customer or founder stories' },
                    { id: 'reel', label: 'Social reels', desc: 'Short vertical clips' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setVideoType(opt.id as any)}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        videoType === opt.id
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-[#14276d]">{opt.label}</div>
                      <p className="mt-1 text-xs text-gray-600">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length (for explainer + testimonial) */}
              {videoType !== 'reel' && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                    Approx. length
                  </h3>
                  <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs sm:text-sm">
                    {[
                      { id: '1-3', label: '1–3 mins' },
                      { id: '3-6', label: '3–6 mins' },
                      { id: '6-10', label: '6–10 mins' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setVideoLength(opt.id as any)}
                        className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all ${
                          videoLength === opt.id
                            ? 'bg-white text-[#14276d] shadow'
                            : 'text-[#14276d] hover:text-[#fe2681]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Shoot option (for reels only) */}
              {videoType === 'reel' && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                    Shoot option
                  </h3>
                  <button
                    onClick={() => setVideoShoot(!videoShoot)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      videoShoot ? 'border-[#fe2681] bg-[#fff0f6]' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#14276d]">On-site shoot support</span>
                      <span className="text-xs text-gray-500">+₹1,500</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      We handle basic shooting support for your reels. Editing included in base price.
                    </p>
                  </button>
                </div>
              )}
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Main goal
                </h3>
                <div className="space-y-2">
                  {[
                    'Explain our product or service clearly',
                    'Capture social proof with real stories',
                    'Stay consistent on Instagram / YouTube / Shorts',
                    'Something else — let’s discuss on a call',
                  ].map((g) => (
                    <button
                      key={g}
                      onClick={() => setVideoGoal(g)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                        videoGoal === g
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white hover:border-[#fe2681]/50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={whatsName}
                    onChange={(e) => setWhatsName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={whatsEmail}
                    onChange={(e) => setWhatsEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f7f7fb] p-4 space-y-3 text-sm">
                <h4 className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase">
                  Your configuration
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>Type: {videoType}</li>
                  {videoType !== 'reel' && <li>Length: {videoLength} minutes</li>}
                  {videoType === 'reel' && <li>Shoot support: {videoShoot ? 'Yes' : 'No'}</li>}
                  <li>Main goal: {videoGoal}</li>
                </ul>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2">
                  <div className="text-xs text-gray-500">
                    ESTIMATED BUDGET
                    <div className="text-[10px] text-gray-400">non-binding estimate</div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#fe2681]">
                    {toCurrency(videoEstimate)}
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="primary"
                  className="mt-3"
                  onClick={() =>
                    sendConfigToWhatsApp(
                      'Video – Custom plan',
                      [
                        `Type: ${videoType}`,
                        videoType !== 'reel' ? `Length: ${videoLength} minutes` : '',
                        videoType === 'reel' ? `Shoot support: ${videoShoot ? 'Yes' : 'No'}` : '',
                        `Goal: ${videoGoal}`,
                        `Estimated budget: ${toCurrency(videoEstimate)}`,
                      ]
                        .filter(Boolean)
                        .join('\n')
                    )
                  }
                >
                  Send configuration to WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </ModalShell>
      )}

      {/* BRANDING MODAL */}
      {activeCustom?.type === 'branding' && (
        <ModalShell
          title="Custom branding plan"
          subtitle="Rough estimate based on whether you’re launching a new brand or refreshing an existing one."
          onClose={() => setActiveCustom(null)}
        >
          <div className="grid lg:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] gap-8 text-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Brand stage
                </h3>
                <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs sm:text-sm">
                  {[
                    { id: 'new', label: 'New brand' },
                    { id: 'refresh', label: 'Refresh existing brand' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBrandMode(opt.id as any)}
                      className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all ${
                        brandMode === opt.id
                          ? 'bg-white text-[#14276d] shadow'
                          : 'text-[#14276d] hover:text-[#fe2681]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  What do you need?
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setBrandService('logo')}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      brandService === 'logo'
                        ? 'border-[#fe2681] bg-[#fff0f6]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-[#14276d]">Logo only</div>
                    <p className="mt-1 text-xs text-gray-600">
                      Core logo design with essential files.
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {brandMode === 'new' ? 'Starting around ₹4,500' : 'Starting around ₹2,500'}
                    </p>
                  </button>
                  <button
                    onClick={() => setBrandService('kit')}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      brandService === 'kit'
                        ? 'border-[#fe2681] bg-[#fff0f6]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-[#14276d]">Brand kit</div>
                    <p className="mt-1 text-xs text-gray-600">
                      Logo, letterheads, brand profile, business cards, ID cards (optional).
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {brandMode === 'new' ? 'Starting around ₹6,000' : 'Starting around ₹4,000'}
                    </p>
                  </button>
                  <button
                    onClick={() => setBrandService('web')}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      brandService === 'web'
                        ? 'border-[#fe2681] bg-[#fff0f6]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-[#14276d]">Web assets</div>
                    <p className="mt-1 text-xs text-gray-600">
                      Images & graphics for web (up to 10 assets).
                    </p>
                    <p className="mt-2 text-xs text-gray-500">Approx. ₹3,000</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Main goal
                </h3>
                <div className="space-y-2">
                  {[
                    brandMode === 'new'
                      ? 'Launch a new brand with a strong visual identity'
                      : 'Refresh our current branding to look more modern',
                    'Improve consistency across online and offline touchpoints',
                    'Prepare assets for an upcoming website or campaign',
                    'Something else — let’s discuss on a call',
                  ].map((g) => (
                    <button
                      key={g}
                      onClick={() => setBrandingGoal(g)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                        brandingGoal === g
                          ? 'border-[#fe2681] bg-[#fff0f6]'
                          : 'border-slate-200 bg-white hover:border-[#fe2681]/50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={whatsName}
                    onChange={(e) => setWhatsName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={whatsEmail}
                    onChange={(e) => setWhatsEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#fe2681]/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f7f7fb] p-4 space-y-3 text-sm">
                <h4 className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase">
                  Your configuration
                </h4>
                <ul className="space-y-1 text-gray-700">
                  <li>Brand stage: {brandMode === 'new' ? 'New brand' : 'Refresh existing brand'}</li>
                  <li>
                    Service:{' '}
                    {brandService === 'logo'
                      ? 'Logo only'
                      : brandService === 'kit'
                      ? 'Brand kit'
                      : 'Web assets'}
                  </li>
                  <li>Main goal: {brandingGoal}</li>
                </ul>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2">
                  <div className="text-xs text-gray-500">
                    ESTIMATED BUDGET
                    <div className="text-[10px] text-gray-400">non-binding estimate</div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#fe2681]">
                    {toCurrency(brandingEstimate)}
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="primary"
                  className="mt-3"
                  onClick={() =>
                    sendConfigToWhatsApp(
                      'Branding – Custom plan',
                      [
                        `Brand stage: ${brandMode}`,
                        `Service: ${brandService}`,
                        `Goal: ${brandingGoal}`,
                        `Estimated budget: ${toCurrency(brandingEstimate)}`,
                      ].join('\n')
                    )
                  }
                >
                  Send configuration to WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </ModalShell>
      )}
    </div>
  );
}

export default Pricing;
