import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Layout, TrendingUp, Video, Sparkles,
  CheckCircle, Zap, Target, Code, HeadphonesIcon, Phone, Mail, AtSign
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { categories } from '../config/site';

interface HomeProps {
  onQuoteClick: () => void;
}

/** Reusable floating gradient orb */
function GradientOrb({
  className,
  size = 420,
  from = '#fe2681',
  to = '#bf1c60',
  blur = 'blur-3xl',
  initialY = 0,
  animateY = -30,
  duration = 10,
}: {
  className?: string;
  size?: number;
  from?: string;
  to?: string;
  blur?: string;
  initialY?: number;
  animateY?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full opacity-30 ${blur} ${className}`}
      style={{
        width: size,
        height: size,
        background:
          `radial-gradient(60% 60% at 50% 50%, ${from} 0%, ${to} 45%, transparent 70%)`,
        filter: 'saturate(120%)',
      }}
      initial={{ y: initialY, scale: 1 }}
      animate={{ y: [initialY, animateY, initialY], scale: [1, 1.03, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Home({ onQuoteClick }: HomeProps) {
  const iconMap: Record<string, any> = { Layout, TrendingUp, Video, Sparkles };

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed and performance to keep your visitors engaged' },
    { icon: Target, title: 'Conversion-First', description: 'Every design decision focused on turning visitors into customers' },
    { icon: Code, title: 'Clean Code', description: 'Maintainable, scalable code that grows with your business' },
    { icon: HeadphonesIcon, title: 'Ongoing Support', description: 'We are here for you long after launch with dedicated support' }
  ];

  const process = [
    { step: '01', title: 'Discover', description: 'We learn about your business, audience, and goals' },
    { step: '02', title: 'Plan', description: 'Create a strategic roadmap tailored to your needs' },
    { step: '03', title: 'Build', description: 'Design and develop with precision and care' },
    { step: '04', title: 'Launch', description: 'Deploy and optimize for maximum impact' }
  ];

  const projects = [
    {
      title: 'E-commerce Platform',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      outcomes: ['40% increase in conversions', '2x faster load times', 'Mobile-first design']
    },
    {
      title: 'SaaS Dashboard',
      image: 'https://images.pexels.com/photos/6954174/pexels-photo-6954174.jpeg?auto=compress&cs=tinysrgb&w=800',
      outcomes: ['Streamlined user onboarding', 'Real-time analytics', 'Custom integrations']
    },
    {
      title: 'Brand Identity',
      image: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800',
      outcomes: ['Complete rebrand', 'Logo & collateral design', 'Brand guidelines']
    }
  ];

  const testimonials = [
    {
      quote: "PixelFlare transformed our online presence. The website they built not only looks stunning but has increased our leads by 60%.",
      author: "Sarah Johnson",
      role: "CEO, TechStart"
    },
    {
      quote: "Working with PixelFlare was seamless. They understood our vision and delivered beyond expectations. Highly recommended!",
      author: "Michael Chen",
      role: "Marketing Director, GrowthCo"
    },
    {
      quote: "The attention to detail and commitment to our success sets PixelFlare apart. They are true partners in our growth.",
      author: "Emma Williams",
      role: "Founder, BrandLab"
    }
  ];
const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // TODO: Wire to your API or email service here.
  // For now, reuse your quote flow:
  onQuoteClick();
};

  // Parallax for hero layers
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -80]);    // far layer
  const yMid  = useTransform(scrollYProgress, [0, 1], [0, -140]);   // mid
  const yFront= useTransform(scrollYProgress, [0, 1], [0, -220]);   // front

  return (
    <div className="relative">
      {/* ===== HERO with animated gradient + parallax orbs ===== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-24 md:py-36 bg-[radial-gradient(1200px_600px_at_10%_-20%,#fff0f6_30%,transparent_70%),radial-gradient(900px_500px_at_90%_0%,#eef2ff_20%,transparent_60%)]"
      >
        {/* Decorative animated gradient wash */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, #fff0f6, #f7f7fb, #ffffff, #eef2ff, #fff0f6)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Parallax blobs */}
        <motion.div style={{ y: yBack }}>
          <GradientOrb className="-left-24 -top-24" size={520} />
        </motion.div>
        <motion.div style={{ y: yMid }}>
          <GradientOrb className="right-[-120px] top-10" size={460} from="#bf1c60" to="#fe2681" />
        </motion.div>
        <motion.div style={{ y: yFront }}>
          <GradientOrb className="left-1/3 bottom-[-140px]" size={380} from="#fe2681" to="#ff66a6" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/70 backdrop-blur border border-white/60 shadow-sm text-[#14276d]">
              Everything You Need
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold text-[#14276d] leading-tight">
              Everything you need to launch and grow your brand.
            </h1>
            <p className="mt-4 text-lg md:text-2xl text-gray-600">
              Websites, marketing, videos, and branding — built for speed, conversion, and scale.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== NEW: Launch Your Business / Branding card ====== */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#14276d] tracking-tight">
              Launch Your Business
              <br className="hidden md:block" />
              <span className="block md:inline md:ml-3 bg-gradient-to-r from-[#fe2681] via-[#c63aa0] to-[#6d34d9] bg-clip-text text-transparent">
                Journey with Us
              </span>
            </h2>
            <p className="mt-4 max-w-4xl mx-auto text-base md:text-lg text-gray-700">
Consider us your trusted ally — bringing you the expertise, tools, and support your small business needs to grow and succeed. Let’s build this journey, together!

            </p>
          </div>

          <div className="rounded-[28px] bg-[#f7f7fb] shadow-sm p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left copy */}
              <div>
                <h3 className="text-2xl md:text-4xl font-extrabold text-[#14276d] leading-tight">
                  Build Your Brand with Premium Domains, Memorable Logos, and Complete Kits
                </h3>
                <p className="mt-4 text-gray-700 text-base md:text-lg">
                  Secure your space online with standout domains, unique logo designs, and powerful branding kits.
                  Lay the groundwork for your business to rise above the competition.
                </p>
                <ul className="mt-6 space-y-3">
                  {['Brand Domains','Custom Logo Design','Complete Branding Kit'].map((item) => (
                    <li key={item} className="flex items-center text-[#14276d]">
                      <span className="mr-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fe2681]/15">
                        <CheckCircle className="w-4 h-4 text-[#fe2681]" />
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-1 lg:order-none">
                <div className="rounded-2xl bg-white border border-gray-100 shadow p-4">
                  <img
                    src="/images/1.png"  // << replace with your uploaded image
                    alt="SEO, Content, and Outreach"
                    className="w-full h-72 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEW: Websites & Videos card (image left, text right) ===== */}
      <section className="py-1 md:py-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#f7f7fb] shadow-sm p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Image left */}
              <div className="order-1 lg:order-none">
                <div className="rounded-2xl bg-white border border-gray-100 shadow p-4">
                  <img
                    src="/images/2.png"   // << replace with your uploaded image
                    alt="Websites and Videos"
                    className="w-full h-72 object-contain"
                  />
                </div>
              </div>

              {/* Text right */}
              <div>
                <h3 className="text-2xl md:text-5xl font-extrabold text-[#14276d] leading-tight">
                  Bring Your Brand to Life with Stunning Websites and Captivating Videos
                </h3>
                <p className="mt-4 text-gray-700 text-base md:text-lg">
                  Elevate your online presence with creative website design, seamless development, and videos that connect and convert.
                  From explainer videos and testimonials to polished editing and how-to guides, we help you shine across every digital touchpoint.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Website Design & Development',
                    'Explainer & Testimonial Videos',
                    'How-to Videos & Editing Services',
                  ].map((item) => (
                    <li key={item} className="flex items-center text-[#14276d]">
                      <span className="mr-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fe2681]/15">
                        <CheckCircle className="w-4 h-4 text-[#fe2681]" />
                      </span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== NEW: SEO / Content / Outreach card (text left, image right) ===== */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] bg-[#f7f7fb] shadow-sm p-6 md:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Text left */}
              <div>
                <h3 className="text-2xl md:text-5xl font-extrabold text-[#14276d] leading-tight">
                  Grow Smarter with SEO, Content, and Outreach
                </h3>
                <p className="mt-4 text-gray-700 text-base md:text-lg">
                  Fuel your business growth with proven digital strategies. From driving organic traffic with SEO and link building, to engaging audiences
                  through high-quality content and effective email campaigns — we help you build authority, boost visibility, and achieve measurable success.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Search Engine Optimization',
                    'Link Building Services',
                    'Content Strategy & Creation',
                    'Targeted Email Outreach',
                  ].map((item) => (
                    <li key={item} className="flex items-center text-[#14276d]">
                      <span className="mr-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fe2681]/15">
                        <CheckCircle className="w-4 h-4 text-[#fe2681]" />
                      </span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image right */}
              <div className="order-1 lg:order-none">
                <div className="rounded-2xl bg-white border border-gray-100 shadow p-4">
                  <img
                    src="/images/3.png"  // << replace with your uploaded image
                    alt="SEO, Content, and Outreach"
                    className="w-full h-72 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO — bento/grid with glass cards ===== */}
      <section id="services" className="relative py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-3">What we do</h2>
            <p className="text-lg md:text-xl text-gray-600">Comprehensive solutions for modern brands</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => {
              const Icon = iconMap[category.icon] ?? Layout;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative"
                >
                  {/* glassy gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fff0f6] via-white to-[#eef2ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                  <Card hover className="relative rounded-2xl backdrop-blur bg-white/80 border border-white/60 shadow-sm p-6">
                    <Icon className="w-12 h-12 text-[#fe2681] mb-4" />
                    <h3 className="text-xl font-bold text-[#14276d] mb-2">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY PIXELFLARE — icon tiles with subtle hover ===== */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-3">Why PixelFlare</h2>
            <p className="text-lg md:text-xl text-gray-600">The difference that drives results</p>
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
                  className="text-center rounded-2xl p-8 bg-white border border-gray-100 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fff0f6] mb-4 shadow-inner">
                    <Icon className="w-8 h-8 text-[#fe2681]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#14276d] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* ===== PROCESS — gradient line timeline ===== */}
      <section className="py-24 bg-[#f7f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[#14276d] mb-3">Our Process</h2>
            <p className="text-lg md:text-xl text-gray-600">From concept to launch, we have got you covered</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            <span className="hidden md:block absolute left-0 right-0 top-[52px] h-[3px] bg-gradient-to-r from-[#fe2681] via-[#bf1c60] to-[#14276d] rounded-full" />
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06 }}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="text-5xl font-bold text-[#fe2681] opacity-20">{item.step}</div>
                <h3 className="mt-2 text-2xl font-bold text-[#14276d]">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
