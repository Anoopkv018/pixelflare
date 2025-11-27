// src/pages/ServiceDetail.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Gauge,
  ShieldCheck,
  Wrench,
  BarChart3,
  Clock3,
  Star,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; 
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Service, getRelatedServices } from '../config/services';

// Optional shape extensions your config can provide per service
type ExtendedService = Service & {
  startingFrom?: string;          // e.g. "₹25,000"
  outcomes?: string[];            // measurable outcomes
  tools?: string[];               // tech/tools used
  useCases?: string[];            // common use cases
  addons?: string[];              // optional add-ons
  highlights?: { label: string; value: string }[]; // KPI badges
};

interface ServiceDetailProps {
  service: Service;
  onQuoteClick: (category?: string, service?: string) => void;
}

/* ----------------------------- Motion Helpers ---------------------------- */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const fadeItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* --------------------------------- View --------------------------------- */

export function ServiceDetail({ service, onQuoteClick }: ServiceDetailProps) {
  const s = service as ExtendedService;
  const relatedServices = getRelatedServices(service.id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 🔹 SEO meta: Bangalore first, Mysore second, then India-wide
  const locationPhrase = 'Bangalore, Mysore and across India';

  const metaTitle =
    s.seoTitle ||
    `${service.title} in Bangalore | PixelFlare`;

  const metaDescription =
    s.seoDescription ||
    `${service.subhead} PixelFlare offers ${service.title.toLowerCase()} for businesses in ${locationPhrase}.`;

  const metaKeywords =
    s.seoKeywords?.join(', ') ||
    [
      `${service.title} in Bangalore`,
      `${service.title} in Mysore`,
      `${service.title} services in Bangalore`,
      `${service.title} services in Mysore`,
      `${service.category === 'website'
        ? 'website design company'
        : service.category === 'marketing'
        ? 'digital marketing agency'
        : 'branding and design agency'
      } in Bangalore`,
      `${service.category === 'website'
        ? 'website design company'
        : service.category === 'marketing'
        ? 'digital marketing agency'
        : 'branding and design agency'
      } in Mysore`,
      `PixelFlare ${service.title}`,
      `PixelFlare ${service.category} services India`,
    ].join(', ');

  // Section anchors for small in-page nav
  const sections = [
    { id: 'who', label: "Who it's for" },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'deliverables', label: 'What you get' },
    { id: 'process', label: 'Process' },
    { id: 'use-cases', label: 'Use cases' },
    { id: 'tools', label: 'Tech & tools' },
    { id: 'addons', label: 'Add-ons' },
    { id: 'faq', label: 'FAQ' },
  ];

  // sensible defaults if config doesn’t include the extended bits yet
  const highlights =
    s.highlights?.length
      ? s.highlights
      : [
          { label: 'Average conversion lift', value: '↑ 32%' },
          { label: 'Typical turnaround', value: '2–4 weeks' },
          { label: 'Client rating', value: '5.0★' },
        ];

  const outcomes =
    s.outcomes?.length
      ? s.outcomes
      : [
          'Clear, business-aligned strategy',
          'Mobile-first, blazing-fast delivery',
          'SEO & analytics baked in',
          'Conversion-ready UX & copy guidance',
        ];

  const useCases =
    s.useCases?.length
      ? s.useCases
      : [
          'New brand/site launch',
          'Redesign to improve conversions',
          'Migrate to WordPress or Headless',
          'Speed/SEO hardening for growth',
        ];

  const tools =
    s.tools?.length
      ? s.tools
      : ['Next.js / React', 'WordPress', 'Tailwind', 'Framer Motion', 'GA4', 'Search Console'];

  const addons =
    s.addons?.length
      ? s.addons
      : ['Blog/Knowledge base', 'Marketing automations', 'Custom dashboards', 'Advanced schema & tracking'];

  /* -------------------------- Active anchor highlight -------------------------- */
  const [active, setActive] = useState<string>('who');
  const observer = useRef<IntersectionObserver | null>(null);
  const sectionIds = useMemo(() => sections.map(s => s.id), []);

  useEffect(() => {
    const opts: IntersectionObserverInit = { rootMargin: '-50% 0px -40% 0px', threshold: 0 };
    const handle: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    };

    observer.current = new IntersectionObserver(handle, opts);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      el && observer.current?.observe(el);
    });
    return () => observer.current?.disconnect();
  }, [sectionIds]);

  /* --------------------------------- Render --------------------------------- */
  return (
      
    <div className="scroll-smooth">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link
          rel="canonical"
          href={`https://pixelflare.in/services/${service.slug}`}
        />
      </Helmet>
      {/* =========================== HERO =========================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f7fb] via-white to-[#fff0f6]">
        {/* soft gradient blobs */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_320px_at_-10%_-10%,rgba(254,38,129,0.10),transparent),radial-gradient(900px_300px_at_110%_110%,rgba(20,39,109,0.08),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerParent} className="max-w-3xl">
            <motion.div variants={fadeItem} className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 border border-gray-200 text-xs text-[#14276d] mb-4">
              <Sparkles className="w-3.5 h-3.5" /> PixelFlare Services
            </motion.div>
            <motion.h1 variants={fadeItem} className="text-4xl md:text-6xl font-extrabold text-[#14276d] tracking-tight mb-4">
              {service.title}
            </motion.h1>
            <motion.p variants={fadeItem} className="text-lg md:text-xl text-gray-600 mb-8">
              {service.subhead}
            </motion.p>
           
          </motion.div>

          {/* KPI / Trust badges */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerParent}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div key={i} variants={fadeItem}>
                <Card className="flex items-center gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0f6] text-[#fe2681]">
                    {i === 0 ? <BarChart3 className="w-5 h-5" /> : i === 1 ? <Clock3 className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#14276d] leading-tight">{h.value}</div>
                    <div className="text-xs text-gray-500">{h.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* anchor nav */}
          <div className="mt-8 overflow-x-auto">
            <nav className="flex gap-2 w-max md:w-auto">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                    active === id
                      ? 'bg-[#14276d] text-white border-[#14276d]'
                      : 'bg-white text-[#14276d] border-gray-200 hover:border-[#14276d]/40'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ========================= MAIN CONTENT ========================= */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* LEFT / MAIN */}
          <div className="lg:col-span-2 space-y-16">
            {/* Who it's for */}
            <motion.div id="who" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Who it’s for</h2>
              <ul className="space-y-3">
                {service.whoItsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#fe2681] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Outcomes */}
            <motion.div id="outcomes" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Outcomes you can expect</h2>
              <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4">
                {outcomes.map((o, i) => (
                  <motion.div key={i} variants={fadeItem}>
                    <Card className="flex items-start gap-3">
                      <Gauge className="w-5 h-5 text-[#fe2681] mt-0.5" />
                      <p className="text-gray-700">{o}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* What you get */}
            <motion.div id="deliverables" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">What you get</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#fe2681] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process timeline */}
            <motion.div id="process" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Our Process</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <Card>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 relative">
                          <div className="w-12 h-12 rounded-full bg-[#fff0f6] flex items-center justify-center text-[#fe2681] font-bold text-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#14276d] mb-2">{step.step}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Use cases */}
            <motion.div id="use-cases" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Common use cases</h2>
              <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4">
                {useCases.map((u, i) => (
                  <motion.div key={i} variants={fadeItem}>
                    <Card className="flex items-start gap-3">
                      <Wrench className="w-5 h-5 text-[#fe2681] mt-0.5" />
                      <p className="text-gray-700">{u}</p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Tech & tools */}
            <motion.div id="tools" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Tech & tools</h2>
              <div className="flex flex-wrap gap-2">
                {tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-sm bg-white border border-gray-200 text-[#14276d]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Add-ons */}
            <motion.div id="addons" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Popular add-ons</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {addons.map((a, i) => (
                  <Card key={i} className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#fe2681] mt-0.5" />
                    <p className="text-gray-700">{a}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div id="faq" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <h2 className="text-3xl font-bold text-[#14276d] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {service.faqs.map((faq, index) => {
                  const open = openFaq === index;
                  return (
                    <Card
                      key={index}
                      className="cursor-pointer transition-shadow"
                      onClick={() => setOpenFaq(open ? null : index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <HelpCircle className="w-5 h-5 text-[#fe2681] flex-shrink-0" />
                            <h3 className="text-base md:text-lg font-semibold text-[#14276d]">{faq.question}</h3>
                          </div>
                          <motion.div
                            initial={false}
                            animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 mt-3 pl-8">{faq.answer}</p>
                          </motion.div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT / SIDEBAR */}
          <div className="lg:col-span-1">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp()}>
              <Card className="sticky top-24 mb-8">
                <h3 className="text-xl font-bold text-[#14276d] mb-2">Ready to get started?</h3>
                <p className="text-gray-600 mb-4">
                  Let’s discuss your project and create a custom plan that fits your goals.
                </p>
                
                <div className="space-y-2">
                  <Button fullWidth onClick={() => onQuoteClick(service.category, service.id)}>
                    Get a Quote
                  </Button>
                  <a
                    href="mailto:info@pixelflare.in"
                    className="block text-center text-sm text-[#fe2681] hover:underline"
                  >
                    Prefer email? info@pixelflare.in
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* Why choose PixelFlare */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0.05)}>
              <Card>
                <h4 className="text-lg font-semibold text-[#14276d] mb-3">Why choose PixelFlare</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#fe2681] mt-0.5" />
                    Strategy-first, ROI-driven delivery
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#fe2681] mt-0.5" />
                    Transparent timelines & milestone updates
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#fe2681] mt-0.5" />
                    Performance, accessibility & SEO baked in
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#fe2681] mt-0.5" />
                    Post-launch care & support options
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp(0.1)}
                className="mt-8"
              >
                <h3 className="text-xl font-bold text-[#14276d] mb-4">Related Services</h3>
                <div className="space-y-4">
                  {relatedServices.map((related) => (
                    <a key={related.id} href={`/services/${related.slug}`} className="block group">
                      <Card hover>
                        <h4 className="font-semibold text-[#14276d] group-hover:text-[#fe2681] mb-1.5">
                          {related.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">{related.subhead}</p>
                        <span className="text-[#fe2681] text-sm font-medium inline-flex items-center">
                          Learn more
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Card>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile floating CTA */}
      <div className="lg:hidden fixed bottom-5 left-0 right-0 px-4 z-20">
        <div className="rounded-2xl shadow-lg border border-gray-200 bg-white/90 backdrop-blur flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm text-gray-600">Ready to start?</div>
            <div className="font-semibold text-[#14276d] -mt-0.5">{service.title}</div>
          </div>
          <Button onClick={() => onQuoteClick(service.category, service.id)}>Get a Quote</Button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
