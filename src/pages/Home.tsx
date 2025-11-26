import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Layout,
  TrendingUp,
  Video,
  Sparkles,
  CheckCircle,
  Zap,
  Target,
  Code,
  HeadphonesIcon,
  Phone,
  Mail,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { categories } from '../config/site';

interface HomeProps {
  onQuoteClick: () => void;
}

/** Reusable floating gradient orb (mouse-parallax ready) */
function GradientOrb({
  className,
  size = 420,
  from = '#fe2681',
  to = '#bf1c60',
  blur = 'blur-3xl',
  duration = 10,
  motionStyle,
}: {
  className?: string;
  size?: number;
  from?: string;
  to?: string;
  blur?: string;
  duration?: number;
  motionStyle?: any; // MotionStyle-compatible
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full opacity-30 ${blur} ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(60% 60% at 50% 50%, ${from} 0%, ${to} 45%, transparent 70%)`,
        filter: 'saturate(120%)',
        ...motionStyle,
      }}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Home({ onQuoteClick }: HomeProps) {
  const iconMap: Record<string, any> = { Layout, TrendingUp, Video, Sparkles };

  const features = [
    {
      icon: Zap,
      title: 'Built for speed',
      description:
        'Lightweight builds, optimized assets, and modern frameworks to keep your site fast and responsive.',
    },
    {
      icon: Target,
      title: 'Conversion-driven',
      description:
        'Layouts, copy, and flows crafted to turn visitors into leads, bookings, and sales.',
    },
    {
      icon: Code,
      title: 'Clean engineering',
      description:
        'Scalable, maintainable code that supports new features and future campaigns.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Long-term partner',
      description:
        'From launch to ongoing iterations, we stay involved as your dedicated digital team.',
    },
  ];

  const processSteps = [
    {
      id: 'discover',
      step: '01',
      title: 'Discover',
      teaser: 'We get clear on your brand, audience, and goals.',
      bullets: [
        'Deep-dive call to understand your business and context',
        'Review of existing brand, website, and marketing assets',
        'Clarified objectives, audience segments, and success metrics',
      ],
    },
    {
      id: 'plan',
      step: '02',
      title: 'Plan',
      teaser: 'We design the roadmap and structure of the project.',
      bullets: [
        'Sitemap and key page outlines for the website',
        'Content and asset plan for copy, visuals, and video',
        'Timeline, milestones, and responsibilities agreed upfront',
      ],
    },
    {
      id: 'build',
      step: '03',
      title: 'Build',
      teaser: 'We design, develop, and iterate with your feedback.',
      bullets: [
        'High-fidelity design screens for review and approvals',
        'Responsive development with SEO and performance in mind',
        'Staging link for feedback and refinements before launch',
      ],
    },
    {
      id: 'launch',
      step: '04',
      title: 'Launch',
      teaser: 'We go live and support you through rollout.',
      bullets: [
        'Final checks for performance, tracking, and forms',
        'Deployment to your chosen hosting/domain',
        'Post-launch support window for tweaks and training',
      ],
    },
  ];

  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const activeProcess = processSteps[activeProcessIndex];

  /** Mouse-parallax values for hero */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const orb1X = useTransform(springX, [0, 1], [40, -40]);
  const orb1Y = useTransform(springY, [0, 1], [30, -30]);
  const orb2X = useTransform(springX, [0, 1], [-30, 30]);
  const orb2Y = useTransform(springY, [0, 1], [20, -20]);
  const orb3X = useTransform(springX, [0, 1], [10, -10]);
  const orb3Y = useTransform(springY, [0, 1], [-20, 20]);

  const cardRotateX = useTransform(springY, [0, 1], [8, -8]);
  const cardRotateY = useTransform(springX, [0, 1], [-12, 12]);
  const cardTranslateY = useTransform(springY, [0, 1], [8, -8]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const resetHeroMouse = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="relative">
      {/* ===== HERO (mouse-hover parallax) ===== */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={resetHeroMouse}
        className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24 bg-white"
      >
        {/* Background blobs (mouse-parallax only, no scroll) */}
        <GradientOrb
          className="-left-32 -top-32"
          size={520}
          from="#fe2681"
          to="#ff9ad0"
          motionStyle={{ x: orb1X, y: orb1Y }}
        />
        <GradientOrb
          className="right-[-140px] top-4"
          size={460}
          from="#bf1c60"
          to="#fe2681"
          motionStyle={{ x: orb2X, y: orb2Y }}
        />
        <GradientOrb
          className="left-1/2 bottom-[-200px]"
          size={380}
          from="#fe2681"
          to="#ffaad8"
          motionStyle={{ x: orb3X, y: orb3Y }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr),minmax(0,1fr)] gap-10 lg:gap-16 items-center">
            {/* Left: hero copy */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-white/90 backdrop-blur border border-white/80 shadow-sm text-[#14276d]">
                Everything You Need
              </span>

              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-[#14276d] leading-tight tracking-tight">
                Everything you need to launch
                <br className="hidden sm:block" /> and grow your brand.
              </h1>

              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-xl">
                Websites, marketing, videos, and branding — built for speed, conversion, and scale,
                so your business looks sharp and feels effortless online.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  size="md"
                  variant="outline"
                  onClick={() =>
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur px-6 py-3 text-sm md:text-base"
                >
                  <span>Explore services</span>
                </Button>
              </div>
            </motion.div>

            {/* Right: interactive workspace card with hover tilt */}
            <motion.div
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                y: cardTranslateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                <div className="relative rounded-3xl border border-slate-100 bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-900/5 p-5 md:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fff0f6]">
                        <Sparkles className="w-4 h-4 text-[#fe2681]" />
                      </span>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                          PIXELFLARE WORKSPACE
                        </div>
                        <div className="text-sm font-semibold text-[#14276d]">
                          All your brand touchpoints in one place
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
                      ✦ Live preview
                    </span>
                  </div>

                  {/* Service stack cards */}
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-[#fef2f8] via-white to-[#eef2ff] p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white/80 flex items-center justify-center shadow-inner">
                        <Layout className="w-4 h-4 text-[#fe2681]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-gray-500 tracking-[0.14em] uppercase">
                          Websites
                        </div>
                        <div className="text-sm font-medium text-[#14276d]">
                          Landing pages, stores & portals
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#14276d]/6 flex items-center justify-center shadow-inner">
                        <Video className="w-4 h-4 text-[#14276d]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-gray-500 tracking-[0.14em] uppercase">
                          Content & Video
                        </div>
                        <div className="text-sm font-medium text-[#14276d]">
                          Explainers, reels, and social-ready edits
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-3 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-gray-500 tracking-[0.14em] uppercase">
                          SEO & Outreach
                        </div>
                        <div className="text-sm font-medium text-[#14276d]">
                          Search, email, and link-building foundations
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom tags */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-gray-500">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Clean handoff to any team</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1">
                      <Mail className="w-3 h-3" />
                      <span>Ready for campaigns & automation</span>
                    </span>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden md:flex absolute -bottom-6 -right-4 items-center gap-2 rounded-2xl bg-[#14276d] px-3 py-2 shadow-xl text-xs text-white"
                >
                  <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold">Friendly support</div>
                    <div className="text-[10px] text-white/70">Direct chats, not tickets</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Launch Your Business / Branding ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#14276d] tracking-tight">
              Launch your business with a brand that feels complete from day one.
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              We help you secure the right domain, define a visual identity, and assemble a branding kit
              that is ready for websites, social media, and campaigns.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f7f7fb] shadow-sm p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left copy */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#14276d]">
                  Brand foundations: name, visuals, and assets in one workflow.
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  From domain suggestions and logo directions to color palettes and typography, we create a
                  consistent visual language that can be reused across every touchpoint.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm text-[#14276d]">
                  {['Brand domains', 'Custom logo design', 'Complete branding kit'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-white border border-gray-100 px-3 py-2 shadow-sm"
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fe2681]/10">
                        <CheckCircle className="w-4 h-4 text-[#fe2681]" />
                      </span>
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right image */}
              <div className="order-1 lg:order-none">
                <div className="rounded-2xl bg-white border border-gray-100 shadow p-4">
                  <img
                    src="/images/1.png"
                    alt="Branding kit preview"
                    className="w-full h-72 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Websites & Videos ===== */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-white via-[#f9f8ff] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-white shadow-sm border border-slate-100 p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div className="order-1 lg:order-none">
                <div className="rounded-2xl bg-[#f7f7fb] border border-gray-100 shadow p-4">
                  <img
                    src="/images/2.png"
                    alt="Websites and video content"
                    className="w-full h-72 object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#14276d]">
                  Websites and video content that tell your story clearly.
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We design and build responsive websites, then layer on explainer videos, testimonials, and
                  product walk-throughs to make it easy for customers to understand what you do.
                </p>
                <ul className="space-y-3 text-sm md:text-base text-[#14276d]">
                  {[
                    'Website design & development tailored to your brand',
                    'Explainer and testimonial videos aligned with your messaging',
                    'How-to videos and editing support for ongoing content',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fe2681]/10">
                        <CheckCircle className="w-3.5 h-3.5 text-[#fe2681]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEO / Content / Outreach ===== */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#f7f7fb] shadow-sm p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Text left */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#14276d]">
                  Grow with search, content, and targeted outreach.
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Beyond the website, we support your growth with SEO foundations, thoughtful content, and
                  email outreach. The result: more qualified visitors and a pipeline that compounds over
                  time.
                </p>
                <ul className="space-y-3 text-sm md:text-base text-[#14276d]">
                  {[
                    'Search engine optimization for long-term discoverability',
                    'Link-building campaigns that support authority and rankings',
                    'Content strategy and production for key pages and blogs',
                    'Email outreach sequences to nurture and convert leads',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fe2681]/10">
                        <CheckCircle className="w-3.5 h-3.5 text-[#fe2681]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image right */}
              <div className="order-1 lg:order-none">
                <div className="rounded-2xl bg-white border border-gray-100 shadow p-4">
                  <img
                    src="/images/3.png"
                    alt="SEO, content and outreach"
                    className="w-full h-72 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO – refreshed services grid ===== */}
<section id="services" className="relative py-14 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#14276d] mb-3">
        What we do
      </h2>
      <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
        One team for websites, content, branding, and growth. Plug into everything,
        or start with the pieces you need right now.
      </p>

      <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-[#14276d]">
        <span className="px-3 py-1 rounded-full bg-[#fff0f6] border border-[#fe2681]/20">
          Websites & landing pages
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
          Branding & visuals
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
          Content & video
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
          SEO & outreach
        </span>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, idx) => {
        const Icon = iconMap[category.icon] ?? Layout;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ delay: idx * 0.03 }}
            className="group relative"
          >
            {/* soft glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fff0f6] via-white to-[#eef2ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

            <Card
              hover
              className="relative rounded-2xl bg-white/95 backdrop-blur border border-white/80 shadow-sm p-5 md:p-6 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#fff0f6] shadow-inner">
                  <Icon className="w-5 h-5 text-[#fe2681]" />
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-slate-50 text-slate-500 font-medium">
                  Service {idx + 1}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#14276d] mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600 flex-1 leading-relaxed">
                {category.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-gray-500 flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#fe2681]/10">
                  <CheckCircle className="w-3 h-3 text-[#fe2681]" />
                </span>
                <span>Ideal for brands that want a clean, ready-to-launch setup.</span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


      {/* ===== OUR PROCESS – interactive step switcher ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#14276d] mb-3">Our process</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              A clear, collaborative workflow from first conversation to launch, so you always know what is
              happening next.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#f7f7fb] p-6 md:p-10 shadow-sm">
            <div className="grid lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] gap-10 items-start">
              {/* Left: clickable steps list */}
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-4">
                  Steps
                </p>
                <div className="space-y-3">
                  {processSteps.map((step, index) => {
                    const isActive = index === activeProcessIndex;
                    return (
                      <motion.button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveProcessIndex(index)}
                        onMouseEnter={() => setActiveProcessIndex(index)}
                        whileHover={{ y: -2 }}
                        className={`w-full text-left rounded-2xl border px-4 py-3 md:px-5 md:py-4 transition-colors flex items-start gap-4 ${
                          isActive
                            ? 'bg-white border-pink-200 shadow-sm'
                            : 'bg-white/40 border-transparent hover:border-slate-200'
                        }`}
                      >
                        <div
                          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                            isActive
                              ? 'border-[#fe2681]/70 bg-[#fe2681]/10 text-[#fe2681]'
                              : 'border-slate-200 bg-white text-slate-500'
                          }`}
                        >
                          {step.step}
                        </div>
                        <div>
                          <div
                            className={`text-sm md:text-base font-semibold ${
                              isActive ? 'text-[#14276d]' : 'text-slate-700'
                            }`}
                          >
                            {step.title}
                          </div>
                          <p className="mt-1 text-xs md:text-sm text-gray-600">{step.teaser}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Right: active step details + simple progress */}
              <motion.div
                key={activeProcess.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 md:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
                      Current step
                    </p>
                    <h3 className="mt-1 text-lg md:text-xl font-bold text-[#14276d]">
                      {activeProcess.step} · {activeProcess.title}
                    </h3>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>In progress</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                    {processSteps.map((step, i) => (
                      <span key={step.id} className={i === activeProcessIndex ? 'text-[#14276d]' : ''}>
                        {step.step}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {processSteps.map((step, i) => {
                      const completed = i <= activeProcessIndex;
                      return (
                        <div
                          key={step.id}
                          className={`h-1.5 flex-1 rounded-full ${
                            completed
                              ? 'bg-gradient-to-r from-[#fe2681] via-[#bf1c60] to-[#14276d]'
                              : 'bg-slate-100'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Bullet list for active step */}
                <ul className="mt-4 space-y-2 text-sm md:text-[15px] text-gray-700">
                  {activeProcess.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#fe2681]/10">
                        <CheckCircle className="w-3 h-3 text-[#fe2681]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why PixelFlare ===== */}
      <section className="py-12 bg-[#f7f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#14276d] mb-3">Why PixelFlare</h2>
            <p className="text-base md:text-lg text-gray-600">
              A small, detail-driven team focused on practical outcomes, not just pretty screens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl p-7 bg-white border border-gray-100 shadow-sm flex flex-col text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fff0f6] mb-4 shadow-inner mx-auto">
                    <Icon className="w-8 h-8 text-[#fe2681]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#14276d] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
