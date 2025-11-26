import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    {
      id: 'website',
      title: 'Website Packages',
      description: 'Professional websites that drive results',
    },
    {
      id: 'marketing',
      title: 'Marketing Services',
      description: 'Data-driven campaigns that grow your business',
    },
    {
      id: 'videos',
      title: 'Video Production',
      description: 'Engaging content that converts',
    },
    {
      id: 'branding',
      title: 'Branding & Design',
      description: 'Identity that makes you unforgettable',
    },
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
      : tier.price ?? '—';
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
    () => categories.filter((c) => pricingTiers.some((t) => t.category === c.id)),
    [categories]
  );

  // ===== Custom package modal state =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | null>(null);

  const goals = [
    'Launch a new website or brand',
    'Increase leads and enquiries',
    'Improve conversion on existing traffic',
    'Scale content and video output',
  ];

  const [selectedGoal, setSelectedGoal] = useState<string>('');

  // Website-specific
  const [websiteType, setWebsiteType] = useState<'onePage' | 'business' | 'ecommerce' | 'portal'>(
    'business'
  );
  const [websitePages, setWebsitePages] = useState<'small' | 'medium' | 'large'>('small');
  const [websiteSeo, setWebsiteSeo] = useState<boolean>(true);

  // Marketing-specific
  const [marketingChannels, setMarketingChannels] = useState<string[]>([]);
  const [marketingIntensity, setMarketingIntensity] = useState<'light' | 'steady' | 'aggressive'>(
    'steady'
  );

  // Video-specific
  const [videoTypes, setVideoTypes] = useState<string[]>([]);
  const [videoVolume, setVideoVolume] = useState<'few' | 'regular' | 'heavy'>('few');

  // Branding-specific
  const [brandingStage, setBrandingStage] = useState<'new' | 'refresh'>('new');
  const [brandingDepth, setBrandingDepth] = useState<'logo' | 'kit' | 'kitPlus'>('kit');

  const openCustomModal = (categoryId: string) => {
    setModalCategory(categoryId);
    setSelectedGoal('');

    // reset per-category defaults
    setWebsiteType('business');
    setWebsitePages('small');
    setWebsiteSeo(true);
    setMarketingChannels([]);
    setMarketingIntensity('steady');
    setVideoTypes([]);
    setVideoVolume('few');
    setBrandingStage('new');
    setBrandingDepth('kit');

    setIsModalOpen(true);
  };

  const toggleFromArray = (current: string[], value: string) =>
    current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

  const currentCategory = modalCategory
    ? categories.find((c) => c.id === modalCategory) ?? null
    : null;

  const estimatedPrice = useMemo(() => {
    if (!modalCategory) return 0;

    if (modalCategory === 'website') {
      let base = 20000;
      if (websiteType === 'onePage') base += 0;
      if (websiteType === 'business') base += 8000;
      if (websiteType === 'ecommerce') base += 20000;
      if (websiteType === 'portal') base += 25000;

      if (websitePages === 'medium') base += 10000;
      if (websitePages === 'large') base += 20000;

      if (websiteSeo) base += 8000;

      return base;
    }

    if (modalCategory === 'marketing') {
      let base = 18000;
      const channelCount = marketingChannels.length;
      base += channelCount * 6000;

      const intensityMultiplier =
        marketingIntensity === 'light' ? 1 : marketingIntensity === 'steady' ? 1.5 : 2.2;

      return Math.round(base * intensityMultiplier);
    }

    if (modalCategory === 'videos') {
      let base = 12000;
      const typeCount = videoTypes.length || 1;
      const volumeMultiplier =
        videoVolume === 'few' ? 1 : videoVolume === 'regular' ? 1.7 : 2.6;

      return Math.round(base * typeCount * volumeMultiplier);
    }

    if (modalCategory === 'branding') {
      let base = 15000;
      const stageMultiplier = brandingStage === 'new' ? 1.3 : 1;
      const depthMultiplier =
        brandingDepth === 'logo' ? 0.9 : brandingDepth === 'kit' ? 1.6 : 2.3;

      return Math.round(base * stageMultiplier * depthMultiplier);
    }

    return 0;
  }, [
    modalCategory,
    websiteType,
    websitePages,
    websiteSeo,
    marketingChannels,
    marketingIntensity,
    videoTypes,
    videoVolume,
    brandingStage,
    brandingDepth,
  ]);

  const websiteTypeLabel: Record<typeof websiteType, string> = {
    onePage: 'Single-page / landing site',
    business: 'Business website',
    ecommerce: 'E-commerce store',
    portal: 'Custom portal / app front-end',
  };

  const websitePagesLabel: Record<typeof websitePages, string> = {
    small: 'up to ~5 key pages',
    medium: 'around 8–12 pages',
    large: '12+ pages or multiple flows',
  };

  const marketingIntensityLabel: Record<typeof marketingIntensity, string> = {
    light: 'Light – foundations & tests',
    steady: 'Steady – ongoing campaigns',
    aggressive: 'Aggressive – growth pushes',
  };

  const videoVolumeLabel: Record<typeof videoVolume, string> = {
    few: '1–2 videos per month',
    regular: '3–5 videos per month',
    heavy: '6+ videos per month',
  };

  const brandingDepthLabel: Record<typeof brandingDepth, string> = {
    logo: 'Logo and basic usage',
    kit: 'Logo + brand kit',
    kitPlus: 'Brand kit plus website-ready assets',
  };

  const getSelectionBullets = (): string[] => {
    if (!modalCategory) return [];

    if (modalCategory === 'website') {
      return [
        websiteTypeLabel[websiteType],
        `Information architecture for ${websitePagesLabel[websitePages]}`,
        websiteSeo
          ? 'On-page SEO basics and launch content recommendations'
          : 'Design & build only — SEO/content can be added later',
      ];
    }

    if (modalCategory === 'marketing') {
      const channels =
        marketingChannels.length > 0
          ? marketingChannels.join(', ')
          : 'Channel mix to be finalized';
      return [
        `Channels: ${channels}`,
        marketingIntensityLabel[marketingIntensity],
        'Reporting and basic performance tracking setup',
      ];
    }

    if (modalCategory === 'videos') {
      const types =
        videoTypes.length > 0 ? videoTypes.join(', ') : 'Video format to be defined together';
      return [
        `Video formats: ${types}`,
        videoVolumeLabel[videoVolume],
        'Editing, color correction, and basic motion graphics included',
      ];
    }

    if (modalCategory === 'branding') {
      return [
        brandingStage === 'new'
          ? 'New brand identity from scratch'
          : 'Refresh and refine your existing brand',
        brandingDepthLabel[brandingDepth],
        'Export-ready files for web and print usage',
      ];
    }

    return [];
  };

  const handleConfirmCustomPackage = () => {
    if (!modalCategory) {
      setIsModalOpen(false);
      return;
    }

    const title = currentCategory?.title ?? modalCategory;
    const summaryParts: string[] = [];

    if (modalCategory === 'website') {
      summaryParts.push(`Type: ${websiteTypeLabel[websiteType]}`);
      summaryParts.push(`Pages: ${websitePagesLabel[websitePages]}`);
      summaryParts.push(websiteSeo ? 'Include SEO setup' : 'No SEO add-on');
    }

    if (modalCategory === 'marketing') {
      summaryParts.push(`Intensity: ${marketingIntensityLabel[marketingIntensity]}`);
      summaryParts.push(
        `Channels: ${
          marketingChannels.length > 0 ? marketingChannels.join(', ') : 'To be decided together'
        }`
      );
    }

    if (modalCategory === 'videos') {
      summaryParts.push(
        `Volume: ${videoVolumeLabel[videoVolume]}`
      );
      summaryParts.push(
        `Formats: ${
          videoTypes.length > 0 ? videoTypes.join(', ') : 'To be finalized with you'
        }`
      );
    }

    if (modalCategory === 'branding') {
      summaryParts.push(
        brandingStage === 'new' ? 'New brand build' : 'Brand refresh'
      );
      summaryParts.push(brandingDepthLabel[brandingDepth]);
    }

    if (selectedGoal) {
      summaryParts.push(`Primary goal: ${selectedGoal}`);
    }

    const summary = summaryParts.join(' | ');
    onQuoteClick(modalCategory, `${title} – ${summary}`);

    setIsModalOpen(false);
  };

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
              Clear packages plus flexible custom options — so you can start small or go all in.
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
          <section
            key={category.id}
            id={category.id}
            className="py-16 md:py-20 scroll-mt-24"
          >
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
                        Yearly{' '}
                        <span className="ml-1 text-[#fe2681]">Save 15%</span>
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
                    : tier.priceNote ?? '';

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
                          <h3 className="text-2xl font-bold text-[#14276d]">
                            {tier.name}
                          </h3>
                          <p className="mt-1 text-gray-600 text-sm">
                            {tier.description}
                          </p>
                          <div className="mt-4 flex items-baseline justify-center gap-2">
                            <div className="text-4xl font-extrabold text-[#fe2681]">
                              {price}
                            </div>
                            {note && (
                              <div className="text-sm text-gray-500">{note}</div>
                            )}
                          </div>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-2">
                          {tier.features.map((feature: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-start"
                            >
                              <Check className="w-5 h-5 text-[#fe2681] mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Custom package card for this category */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full rounded-2xl border border-dashed border-[#fe2681]/50 bg-[#fff0f6]/40 flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#14276d] mb-2">
                        Custom {category.title.replace('Packages', '').trim()}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Not sure which tier fits? Answer a few quick questions and we’ll suggest an
                        estimated {category.id === 'marketing' ? 'monthly' : 'project'} investment
                        just for this service.
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1.5">
                        <li>• Tailored to your scope, goals, and timeline</li>
                        <li>• Clear breakdown you can adjust later</li>
                        <li>• Perfect when your requirements don’t fit a preset tier</li>
                      </ul>
                    </div>
                    <Button
                      fullWidth
                      className="mt-5"
                      onClick={() => openCustomModal(category.id)}
                    >
                      Build custom {category.id === 'website' ? 'website package' : 'plan'}
                    </Button>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== CUSTOM PACKAGE MODAL (per-category) ===== */}
      <AnimatePresence>
        {isModalOpen && modalCategory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl p-6 md:p-8 relative"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-xl"
                aria-label="Close"
              >
                ×
              </button>

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#14276d] mb-1">
                  Custom {currentCategory?.title || 'package'}
                </h3>
                <p className="text-sm md:text-[15px] text-gray-600">
                  Tell us what you’re planning for this service. We’ll estimate an investment and
                  then follow up with a detailed proposal.
                </p>
              </div>

              <div className="grid md:grid-cols-[1.5fr,1fr] gap-6 md:gap-8 items-start">
                {/* Left: options + goal */}
                <div className="space-y-6">
                  {/* Category-specific options */}
                  {modalCategory === 'website' && (
                    <>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Website type
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                          <button
                            type="button"
                            onClick={() => setWebsiteType('onePage')}
                            className={`rounded-xl border px-3 py-2 text-left ${
                              websiteType === 'onePage'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            <div className="font-semibold text-[#14276d]">
                              One-page / Landing
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Launch pages, campaigns, promos
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWebsiteType('business')}
                            className={`rounded-xl border px-3 py-2 text-left ${
                              websiteType === 'business'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            <div className="font-semibold text-[#14276d]">
                              Business website
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Services, about, contact, blog
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWebsiteType('ecommerce')}
                            className={`rounded-xl border px-3 py-2 text-left ${
                              websiteType === 'ecommerce'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            <div className="font-semibold text-[#14276d]">
                              E-commerce store
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Product catalogue & checkout
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWebsiteType('portal')}
                            className={`rounded-xl border px-3 py-2 text-left ${
                              websiteType === 'portal'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            <div className="font-semibold text-[#14276d]">
                              Portal / app front-end
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Logins, dashboards, custom flows
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Approx. page count
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                          <button
                            type="button"
                            onClick={() => setWebsitePages('small')}
                            className={`rounded-xl border px-3 py-2 ${
                              websitePages === 'small'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Up to 5
                            <div className="text-[11px] text-gray-500">
                              Lean, focused website
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWebsitePages('medium')}
                            className={`rounded-xl border px-3 py-2 ${
                              websitePages === 'medium'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            6 – 12
                            <div className="text-[11px] text-gray-500">
                              Standard business site
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWebsitePages('large')}
                            className={`rounded-xl border px-3 py-2 ${
                              websitePages === 'large'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            12+
                            <div className="text-[11px] text-gray-500">
                              Complex or multi-flow
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Extras
                        </p>
                        <button
                          type="button"
                          onClick={() => setWebsiteSeo((v) => !v)}
                          className={`w-full rounded-xl border px-3 py-2 text-left text-xs md:text-sm ${
                            websiteSeo
                              ? 'border-[#fe2681] bg-[#fff0f6]'
                              : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                          }`}
                        >
                          <span className="font-semibold text-[#14276d]">
                            {websiteSeo ? 'Include' : 'Skip'} SEO & launch content setup
                          </span>
                          <div className="text-[11px] text-gray-500">
                            Keyword basics, on-page structure, and content guidance.
                          </div>
                        </button>
                      </div>
                    </>
                  )}

                  {modalCategory === 'marketing' && (
                    <>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Channels
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                          {['SEO', 'Social media', 'Google / Meta Ads', 'Email & automation'].map(
                            (ch) => (
                              <button
                                type="button"
                                key={ch}
                                onClick={() =>
                                  setMarketingChannels((prev) => toggleFromArray(prev, ch))
                                }
                                className={`rounded-xl border px-3 py-2 text-left ${
                                  marketingChannels.includes(ch)
                                    ? 'border-[#fe2681] bg-[#fff0f6]'
                                    : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                                }`}
                              >
                                <span className="font-semibold text-[#14276d]">
                                  {ch}
                                </span>
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Intensity
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                          <button
                            type="button"
                            onClick={() => setMarketingIntensity('light')}
                            className={`rounded-xl border px-3 py-2 ${
                              marketingIntensity === 'light'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Light
                            <div className="text-[11px] text-gray-500">
                              Foundations, tests, and learnings
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setMarketingIntensity('steady')}
                            className={`rounded-xl border px-3 py-2 ${
                              marketingIntensity === 'steady'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Steady
                            <div className="text-[11px] text-gray-500">
                              Ongoing campaigns & optimization
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setMarketingIntensity('aggressive')}
                            className={`rounded-xl border px-3 py-2 ${
                              marketingIntensity === 'aggressive'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Aggressive
                            <div className="text-[11px] text-gray-500">
                              Multi-channel growth pushes
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {modalCategory === 'videos' && (
                    <>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Video formats
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                          {['Explainer', 'Testimonial', 'Social reels', 'How-to / tutorial'].map(
                            (type) => (
                              <button
                                type="button"
                                key={type}
                                onClick={() =>
                                  setVideoTypes((prev) => toggleFromArray(prev, type))
                                }
                                className={`rounded-xl border px-3 py-2 text-left ${
                                  videoTypes.includes(type)
                                    ? 'border-[#fe2681] bg-[#fff0f6]'
                                    : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                                }`}
                              >
                                <span className="font-semibold text-[#14276d]">
                                  {type}
                                </span>
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Volume
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                          <button
                            type="button"
                            onClick={() => setVideoVolume('few')}
                            className={`rounded-xl border px-3 py-2 ${
                              videoVolume === 'few'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            1–2 / month
                            <div className="text-[11px] text-gray-500">
                              Occasional releases
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setVideoVolume('regular')}
                            className={`rounded-xl border px-3 py-2 ${
                              videoVolume === 'regular'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            3–5 / month
                            <div className="text-[11px] text-gray-500">
                              Active content calendar
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setVideoVolume('heavy')}
                            className={`rounded-xl border px-3 py-2 ${
                              videoVolume === 'heavy'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            6+ / month
                            <div className="text-[11px] text-gray-500">
                              High-output pipeline
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {modalCategory === 'branding' && (
                    <>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Brand stage
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                          <button
                            type="button"
                            onClick={() => setBrandingStage('new')}
                            className={`rounded-xl border px-3 py-2 text-left ${
                              brandingStage === 'new'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            <div className="font-semibold text-[#14276d]">
                              New brand
                            </div>
                            <div className="text-[11px] text-gray-500">
                              No visual identity yet
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setBrandingStage('refresh')}
                            className={`rounded-xl border px-3 py-2 text-left ${
                              brandingStage === 'refresh'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            <div className="font-semibold text-[#14276d]">
                              Refresh
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Update what you already have
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                          Deliverable depth
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
                          <button
                            type="button"
                            onClick={() => setBrandingDepth('logo')}
                            className={`rounded-xl border px-3 py-2 ${
                              brandingDepth === 'logo'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Logo only
                            <div className="text-[11px] text-gray-500">
                              Logo + basic usage
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setBrandingDepth('kit')}
                            className={`rounded-xl border px-3 py-2 ${
                              brandingDepth === 'kit'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Brand kit
                            <div className="text-[11px] text-gray-500">
                              Logo, colors, type, examples
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setBrandingDepth('kitPlus')}
                            className={`rounded-xl border px-3 py-2 ${
                              brandingDepth === 'kitPlus'
                                ? 'border-[#fe2681] bg-[#fff0f6]'
                                : 'border-slate-200 bg-white hover:border-[#fe2681]/40'
                            }`}
                          >
                            Kit + website
                            <div className="text-[11px] text-gray-500">
                              Brand kit + web-ready assets
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Main goal (shared) */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                      Main goal
                    </p>
                    <div className="space-y-2">
                      {goals.map((g) => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => setSelectedGoal(g)}
                          className={`w-full text-left rounded-xl border px-3 py-2 text-sm transition-all ${
                            selectedGoal === g
                              ? 'border-[#fe2681] bg-[#fff0f6]'
                              : 'border-slate-200 bg-white hover:border-[#fe2681]/50'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: summary */}
                <div className="rounded-2xl border border-slate-100 bg-[#f7f7fb] p-4 md:p-5">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
                    Estimated investment
                  </p>
                  {estimatedPrice > 0 ? (
                    <>
                      <div className="text-3xl md:text-4xl font-extrabold text-[#14276d]">
                        {toCurrency(estimatedPrice)}
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Approximate {modalCategory === 'marketing' ? 'monthly' : 'project'} value,
                        before final scoping & proposal.
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Adjust the options on the left to see an estimate.
                    </p>
                  )}

                  <div className="mt-4 border-t border-slate-200 pt-3 text-xs text-gray-600 space-y-2">
                    <p>
                      <span className="font-semibold text-[#14276d]">Service: </span>
                      {currentCategory?.title || '—'}
                    </p>
                    <p>
                      <span className="font-semibold text-[#14276d]">Goal: </span>
                      {selectedGoal || 'Not set yet'}
                    </p>
                    <div>
                      <span className="font-semibold text-[#14276d]">
                        Key details:
                      </span>
                      <ul className="mt-1 space-y-1.5">
                        {getSelectionBullets().map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <Button
                      size="md"
                      disabled={estimatedPrice === 0}
                      onClick={handleConfirmCustomPackage}
                    >
                      Share this brief with PixelFlare
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Pricing;
