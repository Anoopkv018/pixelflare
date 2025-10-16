import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { pricingTiers } from '../config/pricing';

interface PricingProps {
  onQuoteClick: (category?: string, service?: string) => void;
}

type BillingPeriod = 'monthly' | 'yearly';

export function Pricing({ onQuoteClick }: PricingProps) {
  // Toggle is ONLY for Marketing
  const [marketingBilling, setMarketingBilling] = useState<BillingPeriod>('monthly');

  const categories = [
    { id: 'website',   title: 'Website Packages',   description: 'Professional websites that drive results' },
    { id: 'marketing', title: 'Marketing Services', description: 'Data-driven campaigns that grow your business' },
    { id: 'videos',    title: 'Video Production',   description: 'Engaging content that converts' },
    { id: 'branding',  title: 'Branding & Design',  description: 'Identity that makes you unforgettable' }
  ];

  // ---------- helpers ----------
  const DISCOUNT = 0.15; // yearly: 15% off, when we have monthly only

  const parsePriceNumber = (price?: string | number) => {
    if (price == null) return undefined;
    if (typeof price === 'number') return price;
    // skip non-numeric strings like "Custom"
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

  // Only used for MARKETING tiers
  const getMarketingDisplayPrice = (tier: any, period: BillingPeriod) => {
    const m = parsePriceNumber(tier.priceMonthly ?? tier.price);
    const yExplicit = parsePriceNumber(tier.priceYearly);

    if (period === 'monthly') {
      return toCurrency(m, tier.priceMonthly ?? tier.price);
    }

    // yearly
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

  // Fallback price rendering for NON-marketing categories
  const getStaticDisplayPrice = (tier: any) => {
    const n = parsePriceNumber(tier.price);
    return toCurrency(n, tier.price ?? '—');
  };

  // Quick nav (only for categories that actually have tiers)
  const quickNav = useMemo(
    () => categories.filter(c => pricingTiers.some(t => t.category === c.id)),
    [categories]
  );

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_600px_at_5%_-10%,#fff0f6_30%,transparent_70%),radial-gradient(900px_500px_at_95%_-10%,#eef2ff_25%,transparent_70%)] py-16 md:py-24">
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
             
              {/* Section header (centered title + centered toggle for Marketing) */}
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


              {/* Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {tiers.map((tier: any, i: number) => {
                  const price = isMarketing
                    ? getMarketingDisplayPrice(tier, marketingBilling)
                    : getStaticDisplayPrice(tier);

                  const note = isMarketing
                    ? getMarketingPriceNote(tier, marketingBilling)
                    : (tier.priceNote ?? '');

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
                        {/* Popular ribbon */}
                        {tier.popular && (
                          <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-[#fe2681] text-white px-4 py-1 rounded-full text-xs font-bold shadow">
                            Most Popular
                          </div>
                        )}

                        {/* Gradient edge glow */}
                        <div className="pointer-events-none absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#fe2681] via-[#bf1c60] to-[#14276d]" />

                        {/* Header */}
                        <div className="text-center mb-6 mt-2">
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

                        {/* CTA */}
                        <Button
                          fullWidth
                          variant={tier.popular ? 'primary' : 'outline'}
                          onClick={() => onQuoteClick(category.id, tier.id)}
                          className="mt-2"
                        >
                          Get a Quote
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== CUSTOM QUOTE ===== */}
      <section className="relative py-16 md:py-20 bg-[#f7f7fb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14276d] mb-4">
            Need a custom solution?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Every business is unique. Let's discuss your specific needs and create a tailored package.
          </p>
          <Button size="lg" onClick={() => (window.location.href = '/contact')}>
            Request Custom Quote
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            Prefer email?{' '}
            <a className="text-[#fe2681] hover:underline" href="mailto:info@pixelflare.in">
              info@pixelflare.in
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
