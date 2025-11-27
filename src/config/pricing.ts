export interface PricingTier {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "website-starter",
    category: "website",
    name: "Pixel Spark",
    price: "₹15000",
    description: "Perfect for small businesses and startups launching their first professional website",
    features: [
      "Up to 5 custom pages",
      "Responsive mobile design",
      "Basic SEO optimization",
      "Contact form integration",
      "2 rounds of revisions",
      "1 month post-launch support",
      "Fast loading performance",
      "Analytics setup"
    ]
  },
  {
    id: "website-growth",
    category: "website",
    name: "Pixel Glow",
    price: "₹20000",
    description: "Comprehensive websites for growing businesses with advanced features",
    features: [
      "Up to 15 custom pages",
      "Advanced animations & interactions",
      "CMS integration (WordPress/Headless)",
      "Advanced SEO optimization",
      "Blog or news section",
      "Custom functionality",
      "3 months post-launch support",
      "Priority support",
      "Performance optimization",
      "Security hardening"
    ],
    popular: true
  },
  {
    id: "website-pro",
    category: "website",
    name: "Pixel Blaze",
    price: "Custom",
    description: "Enterprise-grade websites with unlimited pages and custom development",
    features: [
      "Unlimited pages",
      "Custom web application features",
      "E-commerce integration",
      "Multi-language support",
      "Advanced integrations (CRM, ERP)",
      "Custom dashboard/portal",
      "6 months support included",
      "Dedicated project manager",
      "Training for your team",
      "Ongoing maintenance plans available"
    ]
  },
  {
    id: "marketing-lite",
    category: "marketing",
    name: "Marketing Lite",
    price: "₹8,000/mo",
    description: "Essential marketing services to get your digital presence started",
    features: [
      "Upto 2 social media platforms management",
      "15 Posts/Month",
      "Keyword/audience research",
      "Ad designs",
      "Landing page recommendations",
      "Monthly performance report",
      "Email support",
    ]
  },
  {
    id: "marketing-standard",
    category: "marketing",
    name: "Marketing Standard",
    price: "₹15,000/mo",
    description: "Comprehensive digital marketing across multiple channels",
    features: [
      "Upto 3 social media platforms management",
      "18 Posts/Month",
      "Google Ads + Meta Ads management",
      "SEO optimization (on-page)",
      "Content strategy consulting",
      "A/B testing & optimization",
      "Remarketing campaigns",
      "Bi-weekly performance calls",
      "Priority support",
      "Competitor analysis",
      "Quarterly strategy review"
    ],
    popular: true
  },
  {
    id: "marketing-performance",
    category: "marketing",
    name: "Marketing Performance",
    price: "Custom",
    description: "Enterprise marketing with dedicated team and unlimited channels",
    features: [
      "Multi-channel campaign management",
      "20 Posts/Month",
      "Advanced SEO + link building",
      "Content creation & distribution",
      "Marketing automation",
      "Dedicated account manager",
      "Weekly strategy calls",
      "Custom reporting dashboard",
      "24/7 priority support",
      "Attribution modeling"
    ]
  },
  {
    id: "video-starter",
    category: "videos",
    name: "Video Starter",
    price: "₹2,499",
    description: "Professional video editing for your existing footage",
    features: [
      "Up to 3 minutes final video",
      "Professional editing & transitions",
      "Color grading & audio mix",
      "Royalty-free music",
      "Text overlays & graphics",
      "2 rounds of revisions",
      "Multiple format exports",
      "10-day turnaround"
    ]
  },
  {
    id: "video-complete",
    category: "videos",
    name: "Video Complete",
    price: "₹4,999",
    description: "End-to-end video production from concept to final delivery",
    features: [
      "Script writing included",
      "Professional filming or animation",
      "Up to 10 mins final video",
      "Professional voiceover",
      "Custom graphics & animations",
      "Background music & SFX",
      "Multiple cuts (full, 60s, 30s)",
      "3 rounds of revisions",
      "20-day turnaround",
      "Social media optimized versions"
    ],
    popular: true
  },
  {
    id: "branding-essentials",
    category: "branding",
    name: "Branding Essentials",
    price: "₹4,500",
    description: "Core brand identity to launch your business professionally",
    features: [
      "Logo design (3 concepts)",
      "2 rounds of revisions",
      "Color palette (5 colors)",
      "Typography selection",
      "Logo files (all formats)",
      "Basic brand guidelines",
      "Business card design",
      "2-week delivery"
    ]
  },
  {
    id: "branding-complete",
    category: "branding",
    name: "Branding Complete",
    price: "₹6,000",
    description: "Comprehensive brand identity system with collateral",
    features: [
      "Logo design (3 concepts)",
      "Complete brand style guide",
      "Business cards & letterhead",
      "Email signature design",
      "Social media templates",
      "Brand pattern & iconography",
      "Marketing collateral (brochure)",
      "3 rounds of revisions",
      "4-week delivery",
      "Source files included"
    ],
    popular: true
  }
];

export function getPricingByCategory(category: string): PricingTier[] {
  return pricingTiers.filter(tier => tier.category === category);
}
