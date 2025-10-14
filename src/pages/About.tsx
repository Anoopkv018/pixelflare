import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Target,
  Users,
  Award,
  Heart,
  Sparkles,
  Rocket
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface AboutProps {
  onQuoteClick: () => void;
}

/** Soft floating gradient orb used decoratively */
function GradientOrb({
  className = '',
  size = 420,
  from = '#fe2681',
  to = '#bf1c60',
  opacity = 0.25,
}: {
  className?: string;
  size?: number;
  from?: string;
  to?: string;
  opacity?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(60% 60% at 50% 50%, ${from} 0%, ${to} 45%, transparent 70%)`,
        filter: 'saturate(120%)',
      }}
      initial={{ y: 0, scale: 1 }}
      animate={{ y: [0, -18, 0], scale: [1, 1.03, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function About({ onQuoteClick }: AboutProps) {
  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description:
        'Every decision we make is focused on delivering measurable results for your business',
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description:
        'Your success is our success. We build lasting partnerships, not just projects',
    },
    {
      icon: Award,
      title: 'Excellence',
      description:
        'We set the bar high and never settle for anything less than exceptional quality',
    },
    {
      icon: Heart,
      title: 'Passion',
      description:
        'We love what we do and bring genuine enthusiasm to every project',
    },
  ];

  const timeline = [
    {
      
      event: 'Laying the Foundation',
      description: 'At PixelFlare, everything starts with understanding your goals. We take time to learn about your business, your audience, and your challenges — because great solutions are born from clear insights.',
    },
    {
      
      event: 'Creative Collaboration',
      description: 'We believe in building with you, not just for you. From initial wireframes to final brand styles, our designers and strategists work closely with clients at every stage to ensure alignment and purpose.',
    },
    {
      
      event: 'Strategic Development',
      description: 'Using modern tech stacks and responsive frameworks, our developers translate ideas into scalable digital experiences — fast, functional, and user-friendly across devices.',
    },
    {
      
      event: 'Marketing That Moves',
      description: 'Beyond just building websites, we design marketing systems. SEO, branding, and social media strategies are integrated into every project to help you connect and convert.',
    },
    {
      
      event: 'Support That Scales',
      description: 'Our work doesn’t end at launch. We offer ongoing support, analytics, and optimization to help you grow continuously — because your success is how we measure ours.',
    },
  ];



  const stats = [
    { icon: Rocket, label: 'Projects Delivered', value: '100+' },
    { icon: Award, label: 'Avg. Rating', value: '4.9/5' },
    { icon: Users, label: 'Active Clients', value: '60+' },
  ];

  const faqs = [
    {
      q: 'What industries do you specialize in?',
      a: 'We work across SaaS, e-commerce, education, healthcare, and professional services — tailoring strategy and execution to each domain.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'Simple sites: 2–4 weeks. Growth sites & multi-service engagements: 6–10 weeks. We give a clear timeline during discovery.',
    },
    {
      q: 'Do you offer ongoing support?',
      a: 'Yes. We provide flexible support and optimization retainers to keep your product improving post-launch.',
    },
    {
      q: 'Can you work with our existing brand?',
      a: 'Absolutely. We can extend an existing system or create a new identity and guidelines.',
    },
  ];
  function ToggleMissionVision({ onQuoteClick }: { onQuoteClick: () => void }) {
  const [tab, setTab] = useState<'mission' | 'vision'>('mission');

  const mission = {
    title: 'Our Mission',
    p1:
      'At PixelFlare, our mission is to empower startups and small businesses by delivering innovative, user-focused digital solutions. We strive to bridge creativity and technology through impactful websites, strategic marketing, and strong brand identities — helping our clients grow, connect, and thrive in the digital age.',
    bullets: [
      'Conversion-focused websites and products',
      'Brand systems that scale across channels',
      'Marketing that compounds — not just campaigns',
    ],
    img:
      'vite.png',
  };

  const vision = {
    title: 'Our Vision',
    p1:
      'To ignite a digital spark in every small business, transforming bold ideas into unforgettable brand experiences. We envision a world where creativity meets conversion — where every design tells a story, every strategy drives growth, and every brand leaves a lasting flare.',
    bullets: [
      'Human-centered design that builds trust',
      'Sustainable, scalable tech foundations',
      'Always-on experimentation and learning',
    ],
    img:
      'vite.png', // placeholder; swap with yours
  };

  const data = tab === 'mission' ? mission : vision;

  const tabClasses = (active: boolean) =>
    `relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
      active
        ? 'bg-white text-[#14276d] shadow-md'
        : 'text-[#14276d] hover:text-[#fe2681]'
    }`;

  return (
    <>
      {/* Switcher */}
      <div className="flex justify-center mb-10">
        <div
          role="tablist"
          aria-label="Mission and Vision"
          className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1"
        >
          <button
            role="tab"
            aria-selected={tab === 'mission'}
            className={tabClasses(tab === 'mission')}
            onClick={() => setTab('mission')}
          >
            Mission
          </button>
          <button
            role="tab"
            aria-selected={tab === 'vision'}
            className={tabClasses(tab === 'vision')}
            onClick={() => setTab('vision')}
          >
            Vision
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <AnimatePresence mode="wait">
          {/* Text */}
          <motion.div
            key={`text-${tab}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-6">
              {data.title}
            </h2>
            <p className="text-lg text-gray-600 mb-5">{data.p1}</p>
            <ul className="space-y-3">
              {data.bullets.map((line) => (
                <li key={line} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#fe2681] mr-2 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-gray-700">{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            key={`image-${tab}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <img
              src={data.img}
              alt={tab === 'mission' ? 'Team collaboration' : 'Future vision'}
              className="rounded-3xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[radial-gradient(1200px_600px_at_5%_-10%,#fff0f6_30%,transparent_70%),radial-gradient(900px_500px_at_95%_-10%,#eef2ff_25%,transparent_70%)] py-20 md:py-28">
        <GradientOrb className="-left-24 -top-28" size={520} />
        <GradientOrb className="right-[-140px] top-10" size={460} from="#bf1c60" to="#fe2681" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/70 border border-white/60 backdrop-blur text-[#14276d]">
              <Sparkles className="w-4 h-4 text-[#fe2681]" /> Our Story
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold text-[#14276d]">
              About PixelFlare
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              We’re a team of designers, developers, and marketers helping brands grow through
              digital excellence.
            </p>
          </motion.div>

          {/* Stat band */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-white/80 backdrop-blur border border-white shadow-sm p-5 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-5 h-5 text-[#fe2681]" />
                    <span className="text-sm font-medium text-gray-600">{s.label}</span>
                  </div>
                  <div className="mt-2 text-2xl md:text-3xl font-extrabold text-[#14276d]">
                    {s.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MISSION / VISION (toggleable) ===== */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Segmented control */}
    <ToggleMissionVision onQuoteClick={onQuoteClick} />
  </div>
</section>


      {/* ===== VALUES ===== */}
      <section className="py-20 bg-[#f7f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-3">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6 }}
                >
                  <Card hover className="rounded-2xl">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#fff0f6] mb-4 shadow-inner">
                      <Icon className="w-7 h-7 text-[#fe2681]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#14276d] mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== JOURNEY / TIMELINE ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-3">What It’s Like Working With Us</h2>
            <p className="text-xl text-gray-600">At PixelFlare, every project follows a thoughtful and proven path. From understanding your goals to delivering impactful results, our process ensures creativity, clarity, and collaboration at every step.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* vertical gradient line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#fe2681] via-[#bf1c60] to-[#14276d] rounded-full" />
            <div className="space-y-10">
              {timeline.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`grid md:grid-cols-2 gap-10 items-start ${
                    idx % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'
                  }`}
                >
                  <div className="text-right md:pr-12">
                    <div className="inline-block text-3xl font-extrabold text-[#fe2681] bg-[#fff0f6] rounded-xl px-4 py-1">
                    </div>
                  </div>
                  <Card className="relative">
                    <div className="absolute left-[-12px] top-6 hidden md:block w-6 h-6 rounded-full bg-white border-4 border-[#fe2681]" />
                    <h3 className="text-2xl font-bold text-[#14276d] mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ===== FAQ ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-3">FAQs</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="group rounded-xl border border-gray-200 p-5 hover:border-[#fe2681]/50 transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="font-semibold text-[#14276d]">{f.q}</span>
                  <span className="ml-4 text-[#fe2681] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}
