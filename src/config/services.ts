// src/config/services.ts

export interface Service {
  id: string;
  category: string;
  title: string;
  slug: string;
  subhead: string;
  whoItsFor: string[];
  deliverables: string[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];

  // ---- Optional extras used by ServiceDetail (all optional) ----
  startingFrom?: string;                                // e.g. "₹25,000"
  outcomes?: string[];                                  // measurable benefits
  tools?: string[];                                     // tech/tools stack
  useCases?: string[];                                  // popular scenarios
  addons?: string[];                                    // optional add-ons
  highlights?: { label: string; value: string }[];      // KPI badges
}

export const services: Service[] = [
  {
    id: "website-designing",
    category: "website",
    title: "Website Designing",
    slug: "website-designing",
    subhead: "Beautiful, user-centric designs that turn visitors into customers",
    startingFrom: "₹35,000",
    highlights: [
      { label: "Avg. conversion lift", value: "↑ 25–40%" },
      { label: "Typical turnaround", value: "2–4 weeks" },
      { label: "Client rating", value: "5.0★" }
    ],
    outcomes: [
      "Clarity of information architecture and user flows",
      "Higher engagement & conversion on key pages",
      "Polished brand presence across devices"
    ],
    tools: ["Figma", "FigJam", "Illustrator", "Zeplin"],
    useCases: [
      "New brand/site launch",
      "UX refresh of dated UI",
      "Design system & component library"
    ],
    addons: ["Micro-copy & UX writing", "Illustrations/Icon set", "Design handoff support"],
    whoItsFor: [
      "Startups launching their first website",
      "Businesses looking to rebrand or modernize",
      "Companies needing landing pages that convert",
      "Brands wanting to stand out from competitors"
    ],
    deliverables: [
      "Custom design mockups (desktop, tablet, mobile)",
      "Interactive prototypes in Figma",
      "Complete design system and style guide",
      "UI component library",
      "Brand-aligned color palette and typography",
      "Icon set and imagery guidelines",
      "Responsive layouts for all screen sizes",
      "Design files and source assets",
      "2 rounds of revisions included"
    ],
    process: [
      { step: "Discovery",   description: "We analyze your brand, audience, and competitors to inform design strategy" },
      { step: "Wireframing", description: "Create layout structures focusing on user flow and conversion paths" },
      { step: "Visual Design", description: "Apply brand identity and create pixel-perfect, modern designs" },
      { step: "Prototype",   description: "Build interactive prototypes for testing and client approval" }
    ],
    faqs: [
      { question: "How long does website design take?", answer: "Typically 2-4 weeks depending on complexity and number of pages." },
      { question: "Do I get the design files?", answer: "Yes, you receive all Figma files, assets, and a complete design system." },
      { question: "Can you match my existing brand?", answer: "Absolutely. We work within your brand guidelines or help evolve them." },
      { question: "What if I need changes later?", answer: "We include 2 revision rounds. Additional changes can be quoted separately." },
      { question: "Do you design for mobile?", answer: "Yes, all designs are fully responsive and mobile-first." },
      { question: "Can you design without development?", answer: "Yes, design-only projects are welcome. We provide ready-to-develop files." }
    ],
    relatedServices: ["website-development", "wordpress-website", "logo-designing"]
  },

  {
    id: "website-development",
    category: "website",
    title: "Website Development",
    slug: "website-development",
    subhead: "Fast, secure, and scalable websites built with modern technology",
    startingFrom: "₹60,000",
    highlights: [
      { label: "PageSpeed score", value: "90+ Core Web Vitals" },
      { label: "Typical turnaround", value: "3–6 weeks" },
      { label: "Uptime (with managed host)", value: "99.9%" }
    ],
    outcomes: [
      "Production-ready, scalable codebase",
      "Excellent Lighthouse/SEO scores",
      "Easy publishing with CMS or headless"
    ],
    tools: ["Next.js", "React", "Node.js", "Tailwind", "Vercel"],
    useCases: [
      "Marketing site with CMS",
      "High-performance landing pages",
      "Headless WordPress/Shopify frontends"
    ],
    addons: ["Multi-language (i18n)", "Membership/Auth", "Animations/Motion"],
    whoItsFor: [
      "Businesses needing custom functionality",
      "Brands requiring high-performance sites",
      "Companies with complex integrations",
      "Organizations needing scalable platforms"
    ],
    deliverables: [
      "Fully responsive, production-ready website",
      "Clean, maintainable codebase",
      "SEO-optimized structure and markup",
      "Fast loading times (90+ PageSpeed score)",
      "Cross-browser compatibility testing",
      "Mobile-first responsive implementation",
      "CMS integration (if required)",
      "Form handling and validation",
      "Analytics integration",
      "2 weeks of post-launch support"
    ],
    process: [
      { step: "Planning", description: "Define technical requirements, stack, and architecture" },
      { step: "Development", description: "Build frontend and backend with best practices and testing" },
      { step: "Integration", description: "Connect APIs, CMS, analytics, and third-party services" },
      { step: "Launch", description: "Deploy, test, and monitor for optimal performance" }
    ],
    faqs: [
      { question: "What technologies do you use?", answer: "We use modern frameworks like React, Next.js, and Node.js based on project needs." },
      { question: "Can you work with my existing design?", answer: "Yes, we can develop from your designs or work with our design team." },
      { question: "Do you provide hosting?", answer: "We recommend hosting providers and can assist with setup and deployment." },
      { question: "Is the website easy to update?", answer: "Yes, we can integrate a CMS or provide documentation for code updates." },
      { question: "What about website security?", answer: "We follow security best practices, use HTTPS, and implement protection measures." },
      { question: "Do you offer maintenance?", answer: "Yes, we offer ongoing maintenance plans for updates, security, and support." }
    ],
    relatedServices: ["website-designing", "on-page-seo", "website-migration"]
  },

  {
    id: "website-migration",
    category: "website",
    title: "Website Migration",
    slug: "website-migration",
    subhead: "Seamless migration to modern platforms without losing traffic or data",
    startingFrom: "₹55,000",
    highlights: [
      { label: "Traffic preserved", value: "~98% avg." },
      { label: "Redirect accuracy", value: "100%" },
      { label: "Typical timeline", value: "3–6 weeks" }
    ],
    outcomes: [
      "Preserve SEO equity with correct redirects",
      "Cleaner URL structure and information architecture",
      "Better performance and reliability post-move"
    ],
    tools: ["Screaming Frog", "GA4", "Search Console", "Ahrefs"],
    useCases: [
      "CMS → WordPress/Headless",
      "Subdomain consolidation",
      "Replatforming to modern stack"
    ],
    addons: ["Design refresh during migration", "Content pruning & redirects", "Speed/SEO hardening"],
    whoItsFor: [
      "Businesses moving to a new CMS or platform",
      "Companies upgrading legacy systems",
      "Brands consolidating multiple sites",
      "Organizations moving to the cloud"
    ],
    deliverables: [
      "Complete content audit and mapping",
      "SEO preservation strategy (redirects, metadata)",
      "Database migration and data integrity checks",
      "URL structure optimization",
      "301 redirects implementation",
      "Design and functionality improvements",
      "Pre-launch testing environment",
      "Post-migration SEO monitoring",
      "Rollback plan and backups",
      "Documentation and training"
    ],
    process: [
      { step: "Audit", description: "Analyze current site structure, content, SEO metrics, and integrations" },
      { step: "Plan", description: "Create migration roadmap with URL mapping and SEO preservation" },
      { step: "Migrate", description: "Transfer content, implement redirects, and rebuild functionality" },
      { step: "Validate", description: "Test everything, monitor rankings, and optimize performance" }
    ],
    faqs: [
      { question: "Will migration affect my SEO?", answer: "With proper planning and redirects, we maintain or improve your SEO rankings." },
      { question: "How long does migration take?", answer: "Typically 3-6 weeks depending on site size and complexity." },
      { question: "Can you migrate from any platform?", answer: "Yes, we handle migrations from WordPress, Shopify, custom platforms, and more." },
      { question: "What about downtime?", answer: "We plan migrations to minimize downtime, often launching during off-peak hours." },
      { question: "Do you preserve all content?", answer: "Yes, we audit and migrate all content, ensuring nothing is lost." },
      { question: "What if something breaks?", answer: "We have rollback plans and provide post-launch support to fix any issues." }
    ],
    relatedServices: ["website-development", "on-page-seo", "wordpress-website"]
  },

  {
    id: "wordpress-website",
    category: "website",
    title: "WordPress Website",
    slug: "wordpress-website",
    subhead: "Custom WordPress sites that are easy to manage and built to perform",
    startingFrom: "₹45,000",
    highlights: [
      { label: "Editing experience", value: "Non-technical friendly" },
      { label: "Speed target", value: "90+ on mobile" },
      { label: "Security hardening", value: "Included" }
    ],
    outcomes: [
      "Easy content management with training",
      "Solid Core Web Vitals & SEO setup",
      "Scalable structure for future growth"
    ],
    tools: ["WordPress", "ACF", "Yoast/RankMath", "Cloudflare"],
    useCases: [
      "SMB marketing site",
      "Blog/Resource hub",
      "Lightweight ecommerce/catalog"
    ],
    addons: ["Custom blocks (Gutenberg)", "Advanced forms & workflows", "Multisite setup"],
    whoItsFor: [
      "Small businesses wanting easy content management",
      "Bloggers and content creators",
      "Companies needing frequent updates",
      "Organizations wanting plugin flexibility"
    ],
    deliverables: [
      "Custom WordPress theme development",
      "Responsive design implementation",
      "Plugin selection and configuration",
      "Security hardening and optimization",
      "SEO plugin setup and configuration",
      "Custom post types and fields",
      "User role and permissions setup",
      "Training on content management",
      "Performance optimization",
      "Backup and update system"
    ],
    process: [
      { step: "Setup", description: "Install WordPress, configure hosting, and set security foundations" },
      { step: "Build", description: "Develop custom theme, install plugins, and create content structure" },
      { step: "Customize", description: "Add custom functionality, integrate services, and optimize" },
      { step: "Train", description: "Provide documentation and training for ongoing management" }
    ],
    faqs: [
      { question: "Is WordPress secure?", answer: "Yes, with proper security measures, updates, and hardening, WordPress is very secure." },
      { question: "Can I update content myself?", answer: "Absolutely. WordPress is designed for easy content management by non-technical users." },
      { question: "Do you use page builders?", answer: "We can use Elementor or similar builders if requested, or build custom themes." },
      { question: "What about website speed?", answer: "We optimize for speed with caching, CDN, image optimization, and clean code." },
      { question: "Can you add custom features?", answer: "Yes, we develop custom plugins and functionality for unique requirements." },
      { question: "Do you provide WordPress training?", answer: "Yes, we include training sessions and video tutorials with every project." }
    ],
    relatedServices: ["website-designing", "website-development", "on-page-seo"]
  },

  {
    id: "on-page-seo",
    category: "marketing",
    title: "On-page SEO",
    slug: "on-page-seo",
    subhead: "Technical optimization that helps search engines understand and rank your content",
    startingFrom: "₹25,000",
    highlights: [
      { label: "Technical issues fixed", value: "50–200+" },
      { label: "Time to first impact", value: "4–8 weeks" },
      { label: "Reporting", value: "Monthly" }
    ],
    outcomes: [
      "Improved crawlability and indexation",
      "Better rankings for core keywords",
      "Faster pages and mobile usability"
    ],
    tools: ["Search Console", "GA4", "Screaming Frog", "Ahrefs/SEMrush"],
    useCases: [
      "New sites needing foundations",
      "Sites with crawling/index issues",
      "Performance & Core Web Vitals work"
    ],
    addons: ["Content briefs & mapping", "Schema expansion", "Internal link sculpting"],
    whoItsFor: [
      "New websites launching for the first time",
      "Businesses not ranking for target keywords",
      "Sites with technical SEO issues",
      "Companies wanting sustainable organic traffic"
    ],
    deliverables: [
      "Complete technical SEO audit",
      "Keyword research and mapping",
      "Meta title and description optimization",
      "Header tag structure optimization",
      "Internal linking strategy",
      "Image alt text and optimization",
      "Schema markup implementation",
      "Page speed optimization",
      "Mobile usability improvements",
      "XML sitemap and robots.txt setup",
      "Monthly performance reports"
    ],
    process: [
      { step: "Audit", description: "Analyze current SEO status, identify issues, and benchmark rankings" },
      { step: "Research", description: "Conduct keyword research and competitive analysis" },
      { step: "Optimize", description: "Implement on-page improvements, technical fixes, and content updates" },
      { step: "Monitor", description: "Track rankings, traffic, and continue optimization" }
    ],
    faqs: [
      { question: "How long until I see results?", answer: "Typically 3-6 months for noticeable improvements, depending on competition." },
      { question: "Do you write content?", answer: "We optimize existing content and can recommend content creation services." },
      { question: "What's the difference from off-page SEO?", answer: "On-page focuses on your website; off-page includes backlinks and external factors." },
      { question: "Can you guarantee rankings?", answer: "No one can guarantee rankings, but we use proven strategies to improve visibility." },
      { question: "Do you work with any CMS?", answer: "Yes, we optimize WordPress, Shopify, custom sites, and all major platforms." },
      { question: "What tools do you use?", answer: "We use industry-standard tools like Google Search Console, SEMrush, and Ahrefs." }
    ],
    relatedServices: ["google-ads", "link-building", "website-development"]
  },

  {
    id: "google-ads",
    category: "marketing",
    title: "Google Ads",
    slug: "google-ads",
    subhead: "Data-driven Google Ads campaigns that deliver qualified leads and ROI",
    startingFrom: "₹30,000 / month mgmt",
    highlights: [
      { label: "Typical ROAS after tuning", value: "3–5x" },
      { label: "Optimization window", value: "2–4 weeks" },
      { label: "Reporting", value: "Weekly + Monthly" }
    ],
    outcomes: [
      "Immediate, targeted traffic",
      "Clear conversion tracking & insights",
      "Efficient budget usage via continual testing"
    ],
    tools: ["Google Ads", "GA4", "Looker Studio", "Tag Manager"],
    useCases: [
      "Lead gen with high intent",
      "Time-sensitive promos",
      "Entering new geographies"
    ],
    addons: ["Landing page CRO", "Call tracking", "CRM/Offline conversion import"],
    whoItsFor: [
      "Businesses needing immediate traffic and leads",
      "Companies with time-sensitive promotions",
      "Brands entering new markets",
      "Organizations with clear conversion goals"
    ],
    deliverables: [
      "Google Ads account setup and structure",
      "Keyword research and selection",
      "Ad copywriting and A/B testing",
      "Landing page recommendations",
      "Conversion tracking setup",
      "Bid strategy optimization",
      "Negative keyword management",
      "Ad extensions configuration",
      "Remarketing campaign setup",
      "Weekly performance reports and optimization",
      "Monthly strategy calls"
    ],
    process: [
      { step: "Strategy", description: "Define goals, target audience, budget, and campaign structure" },
      { step: "Setup", description: "Create campaigns, write ads, set up tracking and bidding" },
      { step: "Launch", description: "Go live, monitor initial performance, and make quick adjustments" },
      { step: "Optimize", description: "Continuously test, refine, and scale successful campaigns" }
    ],
    faqs: [
      { question: "What's the minimum budget?", answer: "We recommend at least $1,000/month for effective campaigns, but can work with various budgets." },
      { question: "How quickly will I see results?", answer: "Ads start showing immediately, but optimization takes 2-4 weeks for best results." },
      { question: "Do you manage the budget?", answer: "Yes, we manage daily budgets, bids, and optimize spend for maximum ROI." },
      { question: "What's your fee structure?", answer: "We charge a management fee based on ad spend, typically 15-20% of monthly budget." },
      { question: "Can you target specific locations?", answer: "Yes, we can target countries, regions, cities, or radius around locations." },
      { question: "Do you provide reports?", answer: "Yes, detailed weekly reports plus monthly strategy reviews and recommendations." }
    ],
    relatedServices: ["meta-ads", "on-page-seo", "website-designing"]
  },

  {
    id: "meta-ads",
    category: "marketing",
    title: "Meta Ads",
    slug: "meta-ads",
    subhead: "Engaging Facebook and Instagram ad campaigns that build brand awareness and drive conversions",
    startingFrom: "₹25,000 / month mgmt",
    highlights: [
      { label: "Creative testing cadence", value: "Weekly" },
      { label: "ROAS after scale (typ.)", value: "2–4x" },
      { label: "Reporting", value: "Weekly + Monthly" }
    ],
    outcomes: [
      "Reach & awareness in target personas",
      "Efficient retargeting funnels",
      "Creative learnings to inform brand"
    ],
    tools: ["Meta Ads", "Meta Pixel/Conversions API", "GA4"],
    useCases: [
      "E-commerce sales",
      "Lead gen for B2C",
      "Warm retargeting with UGC"
    ],
    addons: ["Creative production packs", "Catalog/Shop setup", "UGC creator sourcing"],
    whoItsFor: [
      "Brands targeting specific demographics",
      "E-commerce businesses driving sales",
      "Companies building brand awareness",
      "Businesses with visual products or services"
    ],
    deliverables: [
      "Meta Business Manager setup",
      "Audience research and segmentation",
      "Custom audience and lookalike creation",
      "Ad creative strategy and design guidance",
      "Campaign structure and optimization",
      "Facebook Pixel implementation",
      "A/B testing framework",
      "Ad copy and creative recommendations",
      "Retargeting campaign setup",
      "Detailed performance analytics",
      "Monthly optimization and scaling"
    ],
    process: [
      { step: "Research", description: "Analyze target audience, competitors, and create buyer personas" },
      { step: "Setup", description: "Build campaigns, audiences, and implement tracking pixels" },
      { step: "Create", description: "Develop ad creatives, write copy, and set up tests" },
      { step: "Scale", description: "Monitor, optimize, and scale winning campaigns" }
    ],
    faqs: [
      { question: "Facebook vs Instagram - which is better?", answer: "Depends on your audience. We typically run both and optimize based on performance." },
      { question: "Do you create ad images?", answer: "We provide creative direction; design services available separately or through partners." },
      { question: "What targeting options are available?", answer: "Demographics, interests, behaviors, custom audiences, and lookalikes." },
      { question: "How much should I spend?", answer: "Minimum $500-1000/month recommended for meaningful results and testing." },
      { question: "Can you target my competitors' audience?", answer: "We can target similar interests and create lookalike audiences for best results." },
      { question: "What's your success rate?", answer: "Results vary, but we consistently achieve 3-5x ROAS for most clients after optimization." }
    ],
    relatedServices: ["google-ads", "video-editing", "business-brochures"]
  },

  {
    id: "link-building",
    category: "marketing",
    title: "Link Building",
    slug: "link-building",
    subhead: "White-hat backlink strategies that improve domain authority and search rankings",
    startingFrom: "₹35,000 / month",
    highlights: [
      { label: "Links/month (quality)", value: "5–15" },
      { label: "Toxic link handling", value: "Disavow included" },
      { label: "Reporting", value: "Monthly" }
    ],
    outcomes: [
      "Higher topical authority & rankings",
      "Safer, white-hat link profile",
      "Compounding organic growth"
    ],
    tools: ["Ahrefs", "SEMrush", "BuzzStream", "Search Console"],
    useCases: [
      "Competitive keyword battles",
      "New domains building authority",
      "Recovering from weak link profile"
    ],
    addons: ["Digital PR campaigns", "Asset design for outreach", "Skyscraper content briefs"],
    whoItsFor: [
      "Sites struggling to rank competitively",
      "New domains needing authority",
      "Businesses in competitive industries",
      "Companies with solid on-page SEO"
    ],
    deliverables: [
      "Backlink profile audit",
      "Competitor backlink analysis",
      "Link building strategy roadmap",
      "High-quality, relevant backlinks",
      "Guest post outreach and placement",
      "Digital PR and content promotion",
      "Broken link building opportunities",
      "Resource page link acquisition",
      "Disavow file for toxic links",
      "Monthly link acquisition report",
      "Domain authority tracking"
    ],
    process: [
      { step: "Audit", description: "Analyze your current backlink profile and identify opportunities" },
      { step: "Outreach", description: "Contact relevant websites for link opportunities and partnerships" },
      { step: "Acquire", description: "Secure high-quality backlinks through various ethical methods" },
      { step: "Report", description: "Track acquired links, monitor impact, and plan next steps" }
    ],
    faqs: [
      { question: "Are these real, quality links?", answer: "Yes, we only pursue white-hat, editorial links from relevant, authoritative sites." },
      { question: "How many links will I get?", answer: "Quality over quantity. Typically 5-15 high-quality links per month." },
      { question: "Is link building safe?", answer: "When done correctly with white-hat methods, yes. We avoid any risky tactics." },
      { question: "How long until I see ranking improvements?", answer: "Usually 3-6 months as search engines discover and value the new links." },
      { question: "Do you buy links?", answer: "No, we never buy links. We earn them through outreach, content, and relationships." },
      { question: "What industries do you work with?", answer: "We work across industries but excel in B2B, SaaS, e-commerce, and professional services." }
    ],
    relatedServices: ["on-page-seo", "google-ads", "business-profile"]
  },

  {
    id: "video-editing",
    category: "videos",
    title: "Video Editing",
    slug: "video-editing",
    subhead: "Professional video editing that transforms raw footage into engaging content",
    startingFrom: "₹12,000 / video",
    highlights: [
      { label: "Turnaround", value: "5–10 biz days" },
      { label: "Deliverables", value: "Social + web formats" },
      { label: "Revisions", value: "2 rounds" }
    ],
    outcomes: [
      "Crisp pacing and storytelling",
      "On-brand graphics & subtitles",
      "Platform-ready exports"
    ],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    useCases: [
      "YouTube/social content",
      "Product promos",
      "Customer stories & reels"
    ],
    addons: ["Custom motion graphics", "Stock assets licensing", "Multi-language captions"],
    whoItsFor: [
      "Content creators needing professional polish",
      "Businesses with marketing video footage",
      "Brands creating social media content",
      "Companies repurposing video content"
    ],
    deliverables: [
      "Professional color grading and correction",
      "Audio mixing and enhancement",
      "Motion graphics and text overlays",
      "Transitions and effects",
      "Background music and sound effects",
      "Intro and outro sequences",
      "Subtitle and caption creation",
      "Multiple format exports (social, web, TV)",
      "2 rounds of revisions",
      "Source files and project files"
    ],
    process: [
      { step: "Review", description: "Analyze raw footage and understand your vision and goals" },
      { step: "Edit", description: "Cut, arrange, and enhance footage with effects and audio" },
      { step: "Refine", description: "Add graphics, color grade, and polish all elements" },
      { step: "Deliver", description: "Export in required formats and provide all source files" }
    ],
    faqs: [
      { question: "What video formats do you accept?", answer: "We work with all common formats: MP4, MOV, AVI, and professional formats." },
      { question: "How long does editing take?", answer: "Typically 5-10 business days depending on length and complexity." },
      { question: "Do you provide stock footage?", answer: "Yes, we can source and integrate licensed stock footage if needed." },
      { question: "Can you fix poor quality footage?", answer: "We can improve most footage, but results depend on the original quality." },
      { question: "Do you add music?", answer: "Yes, we include royalty-free music or can work with music you provide." },
      { question: "What about subtitles?", answer: "We can add open captions, closed captions, or subtitle files." }
    ],
    relatedServices: ["explainer-video", "testimonial-video", "meta-ads"]
  },

  {
    id: "explainer-video",
    category: "videos",
    title: "Explainer Video",
    slug: "explainer-video",
    subhead: "Animated or live-action videos that clearly communicate your product or service",
    startingFrom: "₹65,000",
    highlights: [
      { label: "Ideal length", value: "60–90 sec" },
      { label: "Script + VO", value: "Included" },
      { label: "Turnaround", value: "3–4 weeks" }
    ],
    outcomes: [
      "Simplify complex ideas",
      "Increase landing page conversion",
      "Sales & onboarding enablement"
    ],
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    useCases: [
      "SaaS product explainer",
      "Feature launch",
      "Investor/partner pitches"
    ],
    addons: ["Custom illustration pack", "Multiple aspect ratios", "Additional language VO"],
    whoItsFor: [
      "SaaS companies explaining complex products",
      "Startups introducing new concepts",
      "Businesses simplifying their value proposition",
      "Companies improving conversion rates"
    ],
    deliverables: [
      "Custom script writing",
      "Storyboard and visual planning",
      "Professional voiceover recording",
      "Custom animation or filming",
      "Background music and sound design",
      "Brand-aligned visual style",
      "Multiple video lengths (30s, 60s, 90s)",
      "Social media cuts and formats",
      "Subtitles and captions",
      "Source files and revisions"
    ],
    process: [
      { step: "Concept", description: "Define message, audience, and create compelling script" },
      { step: "Storyboard", description: "Visualize scenes and plan animation or filming approach" },
      { step: "Production", description: "Create animation or film footage with voiceover and music" },
      { step: "Finalize", description: "Refine, optimize for platforms, and deliver all formats" }
    ],
    faqs: [
      { question: "Animated or live-action?", answer: "We offer both. Animation works for abstract concepts; live-action for personal connection." },
      { question: "How long should my video be?", answer: "60-90 seconds is ideal for most explainers, keeping attention and covering key points." },
      { question: "Do you write the script?", answer: "Yes, professional scriptwriting is included and key to effective explainers." },
      { question: "Can you use our brand characters?", answer: "Absolutely. We work within your brand guidelines and existing assets." },
      { question: "What's the turnaround time?", answer: "Typically 3-4 weeks from script approval to final delivery." },
      { question: "Can we make changes?", answer: "Yes, we include revision rounds at script, storyboard, and final video stages." }
    ],
    relatedServices: ["product-explainer-video", "video-editing", "website-designing"]
  },

  {
    id: "testimonial-video",
    category: "videos",
    title: "Testimonial Video",
    slug: "testimonial-video",
    subhead: "Authentic customer stories that build trust and credibility",
    startingFrom: "₹40,000",
    highlights: [
      { label: "Deliverables", value: "Full + 30/60s cuts" },
      { label: "Recording", value: "On-site or remote" },
      { label: "Turnaround", value: "2–3 weeks" }
    ],
    outcomes: [
      "Stronger social proof for sales",
      "Human-centered proof of value",
      "Multi-channel content pieces"
    ],
    tools: ["Premiere Pro", "DaVinci Resolve", "Riverside/Zencastr"],
    useCases: [
      "B2B case studies",
      "Service proof for D2C",
      "Recruiting & employer brand"
    ],
    addons: ["Teleprompter & coaching", "B-roll capture", "Multi-language captions"],
    whoItsFor: [
      "B2B companies building trust",
      "Service businesses showcasing results",
      "Brands with happy, vocal customers",
      "Companies with complex value propositions"
    ],
    deliverables: [
      "Pre-interview consultation and questions",
      "On-location or remote filming",
      "Professional lighting and audio",
      "Interview facilitation",
      "B-roll footage of product/service",
      "Professional editing and pacing",
      "Lower thirds and text graphics",
      "Background music",
      "Multiple cuts (full, 60s, 30s)",
      "Optimized for various platforms"
    ],
    process: [
      { step: "Prep", description: "Select customers, prepare questions, and schedule filming" },
      { step: "Film", description: "Conduct interviews and capture supporting footage" },
      { step: "Edit", description: "Select best moments, craft narrative, and add polish" },
      { step: "Deliver", description: "Provide multiple versions optimized for different uses" }
    ],
    faqs: [
      { question: "How do you select customers to interview?", answer: "We help identify customers with great results and comfort on camera." },
      { question: "Where do you film?", answer: "We can film at your location, customer site, or arrange remote recording." },
      { question: "What if customers are nervous?", answer: "Our interview process is conversational and relaxed, helping people feel comfortable." },
      { question: "How many testimonials should we create?", answer: "We recommend 3-5 to showcase different use cases and customer types." },
      { question: "Can you film remotely?", answer: "Yes, we have remote filming solutions for distributed teams and customers." },
      { question: "How long are testimonial videos?", answer: "Full versions are 2-3 minutes; we also create 30-60 second social cuts." }
    ],
    relatedServices: ["explainer-video", "video-editing", "business-profile"]
  },

  {
    id: "product-explainer-video",
    category: "videos",
    title: "Product Explainer Video",
    slug: "product-explainer-video",
    subhead: "Show how your product works and why customers need it",
    startingFrom: "₹55,000",
    highlights: [
      { label: "Best for", value: "SaaS & e-com" },
      { label: "Length options", value: "30/60/90s" },
      { label: "Script + VO", value: "Included" }
    ],
    outcomes: [
      "Clear understanding of features",
      "Reduced sales/demo friction",
      "Higher add-to-cart or trial starts"
    ],
    tools: ["After Effects", "Premiere Pro", "ScreenFlow"],
    useCases: [
      "Feature walkthroughs",
      "App store & website demos",
      "Retail product showcases"
    ],
    addons: ["Thumbnail pack", "Multiple languages", "CTA variants"],
    whoItsFor: [
      "E-commerce brands showcasing products",
      "SaaS companies demoing features",
      "Hardware manufacturers showing functionality",
      "Apps demonstrating user experience"
    ],
    deliverables: [
      "Product-focused script and storyboard",
      "Screen recording or product filming",
      "Animated UI/UX demonstrations",
      "Feature callouts and annotations",
      "Voiceover narration",
      "On-screen text and graphics",
      "Brand-styled visuals",
      "Multiple platform formats",
      "Thumbnail designs",
      "Revision rounds included"
    ],
    process: [
      { step: "Plan", description: "Identify key features, benefits, and optimal demonstration approach" },
      { step: "Capture", description: "Record screen, film product, or create animations" },
      { step: "Produce", description: "Edit, add voiceover, graphics, and effects" },
      { step: "Optimize", description: "Create versions for website, social, ads, and demos" }
    ],
    faqs: [
      { question: "Screen recording or animation?", answer: "Depends on your product. Software often uses screen recording; physical products need filming." },
      { question: "Can you show our UI?", answer: "Yes, we record actual interface or create polished animated versions." },
      { question: "How technical should it be?", answer: "We balance technical accuracy with accessibility for your target audience." },
      { question: "Do you highlight specific features?", answer: "Yes, we focus on features that matter most to your buyers and differentiate you." },
      { question: "Can this be used for sales?", answer: "Absolutely. These videos work great in sales decks, demos, and onboarding." },
      { question: "What about product updates?", answer: "We can create update videos or modify existing videos as products evolve." }
    ],
    relatedServices: ["explainer-video", "video-editing", "google-ads"]
  },

  {
    id: "logo-designing",
    category: "branding",
    title: "Logo Designing",
    slug: "logo-designing",
    subhead: "Memorable logo design that captures your brand identity",
    startingFrom: "₹18,000",
    highlights: [
      { label: "Concepts", value: "3 initial" },
      { label: "Revisions", value: "2 rounds" },
      { label: "Delivery", value: "All formats" }
    ],
    outcomes: [
      "Distinctive, ownable mark",
      "Flexible usage across mediums",
      "A clear foundation for brand system"
    ],
    tools: ["Illustrator", "Figma"],
    useCases: [
      "New brand identity",
      "Rebranding refresh",
      "Sub-brand/ product line logos"
    ],
    addons: ["Brand style guide", "Business card kit", "Social avatar kit"],
    whoItsFor: [
      "Startups creating brand identity",
      "Businesses rebranding",
      "Companies modernizing outdated logos",
      "New products or sub-brands launching"
    ],
    deliverables: [
      "Brand discovery and research",
      "3 unique logo concepts",
      "2 rounds of revisions",
      "Final logo in multiple formats (AI, SVG, PNG, JPG)",
      "Color and black-and-white versions",
      "Favicon and social media sizes",
      "Logo usage guidelines",
      "Brand color palette",
      "Typography recommendations",
      "Complete brand style guide"
    ],
    process: [
      { step: "Discover", description: "Understand brand values, audience, and design preferences" },
      { step: "Concept", description: "Create 3 distinct logo directions based on strategy" },
      { step: "Refine", description: "Iterate on chosen concept with client feedback" },
      { step: "Deliver", description: "Provide final files, variations, and usage guidelines" }
    ],
    faqs: [
      { question: "How many concepts do I get?", answer: "You receive 3 unique logo concepts in the initial presentation." },
      { question: "What if I don't like any concepts?", answer: "We start with a thorough discovery to align. Additional concepts can be purchased." },
      { question: "Do I own the logo?", answer: "Yes, you receive full ownership and all source files upon project completion." },
      { question: "Can you modernize our existing logo?", answer: "Yes, logo evolution and modernization is one of our specialties." },
      { question: "What file formats do I receive?", answer: "Vector files (AI, SVG, EPS) and raster files (PNG, JPG) in various sizes." },
      { question: "Do you design business cards too?", answer: "Yes, we offer complete brand identity packages including business cards and collateral." }
    ],
    relatedServices: ["business-brochures", "business-profile", "website-designing"]
  },

  {
    id: "business-brochures",
    category: "branding",
    title: "Business Brochures",
    slug: "business-brochures",
    subhead: "Professional brochures that inform, engage, and convert prospects",
    startingFrom: "₹22,000",
    highlights: [
      { label: "Formats", value: "Bi/Tri-fold & booklet" },
      { label: "Copy support", value: "Included" },
      { label: "Delivery", value: "Print + Digital" }
    ],
    outcomes: [
      "Clear, persuasive sales collateral",
      "Brand-consistent visuals",
      "Printer-ready files without hassle"
    ],
    tools: ["InDesign", "Illustrator", "Figma"],
    useCases: [
      "Sales leave-behinds",
      "Trade-show collateral",
      "Service/offer explainers"
    ],
    addons: ["Print vendor coordination", "Illustration pack", "QR tracked versions"],
    whoItsFor: [
      "B2B companies needing sales collateral",
      "Service businesses explaining offerings",
      "Companies attending trade shows",
      "Organizations needing printed materials"
    ],
    deliverables: [
      "Custom brochure design (bi-fold, tri-fold, or multi-page)",
      "Information architecture and layout",
      "Professional copywriting or editing",
      "Brand-aligned visual design",
      "Custom imagery and graphics",
      "Print-ready PDF files",
      "Digital PDF version",
      "Editable source files",
      "Print vendor coordination (optional)",
      "2 rounds of revisions"
    ],
    process: [
      { step: "Strategy", description: "Define goals, audience, and key messages for the brochure" },
      { step: "Content", description: "Organize information and create or refine copy" },
      { step: "Design", description: "Create layouts, apply branding, and design visuals" },
      { step: "Finalize", description: "Refine, prepare print files, and coordinate printing" }
    ],
    faqs: [
      { question: "What brochure formats do you offer?", answer: "Bi-fold, tri-fold, z-fold, and multi-page booklets in standard or custom sizes." },
      { question: "Do you write the content?", answer: "Yes, copywriting is included or we can work with your existing content." },
      { question: "Can you handle printing?", answer: "We provide print-ready files and can coordinate with printers if needed." },
      { question: "Digital only or print?", answer: "We design for both print quality and digital distribution." },
      { question: "How long does design take?", answer: "Typically 2-3 weeks depending on content readiness and complexity." },
      { question: "Can you match our brand?", answer: "Absolutely. We work within your brand guidelines and existing materials." }
    ],
    relatedServices: ["business-profile", "logo-designing", "product-label"]
  },

  {
    id: "product-label",
    category: "branding",
    title: "Product Label",
    slug: "product-label",
    subhead: "Eye-catching product labels that stand out on shelves and online",
    startingFrom: "₹20,000",
    highlights: [
      { label: "Variants support", value: "Multi-SKU ready" },
      { label: "Print-ready", value: "Yes" },
      { label: "Special finishes", value: "Foil/UV/Emboss" }
    ],
    outcomes: [
      "Shelf-impact and legibility",
      "Compliance-ready information layout",
      "Easy rollout across SKUs"
    ],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    useCases: [
      "Food & beverages",
      "Cosmetics/health",
      "D2C ecommerce packaging"
    ],
    addons: ["Mockups for marketing", "Printer coordination", "3D packshots"],
    whoItsFor: [
      "Consumer product brands",
      "Food and beverage companies",
      "Health and beauty brands",
      "E-commerce product sellers"
    ],
    deliverables: [
      "Label design concepts (2-3 options)",
      "Die-line creation or adaptation",
      "Print-ready label files",
      "Color separations (if needed)",
      "Material and finish recommendations",
      "Compliance review (sizing, disclaimers)",
      "Product mockups for marketing",
      "Multiple size variations",
      "Source files and templates",
      "Print vendor coordination"
    ],
    process: [
      { step: "Research", description: "Study target market, competitors, and compliance requirements" },
      { step: "Design", description: "Create label concepts balancing brand, info, and shelf appeal" },
      { step: "Refine", description: "Iterate based on feedback and prepare for production" },
      { step: "Produce", description: "Deliver print-ready files and coordinate with label printers" }
    ],
    faqs: [
      { question: "Do you handle FDA/compliance requirements?", answer: "We design for compliance but recommend legal review for regulatory requirements." },
      { question: "What label sizes and shapes can you design?", answer: "Any size or shape. We create custom die-lines or work with standard sizes." },
      { question: "Can you create multiple SKU variations?", answer: "Yes, we create template systems for easy variation across product lines." },
      { question: "What about special finishes?", answer: "We design for foil stamping, embossing, spot UV, and other premium finishes." },
      { question: "Do you work with label printers?", answer: "Yes, we can coordinate with your printer or recommend trusted partners." }
    ],
    relatedServices: ["logo-designing", "business-brochures", "product-explainer-video"]
  },

  {
    id: "business-profile",
    category: "branding",
    title: "Business Profile",
    slug: "business-profile",
    subhead: "Comprehensive business profiles that showcase your company professionally",
    startingFrom: "₹28,000",
    highlights: [
      { label: "Length", value: "8–16 pages" },
      { label: "Copywriting", value: "Included" },
      { label: "Formats", value: "Print + Digital + Editable" }
    ],
    outcomes: [
      "Credibility & trust for B2B",
      "Consistent, updatable company story",
      "Assets for pitches, RFPs & sales"
    ],
    tools: ["InDesign", "PowerPoint/Keynote", "Figma"],
    useCases: [
      "Partner/RFP submissions",
      "Sales & investor decks",
      "Corporate credentials"
    ],
    addons: ["Case study templates", "Data-viz charts", "Print coordination"],
    whoItsFor: [
      "B2B companies pitching to clients",
      "Organizations applying for partnerships",
      "Companies responding to RFPs",
      "Businesses building credibility"
    ],
    deliverables: [
      "Professional business profile document",
      "Company overview and history",
      "Services or product descriptions",
      "Team bios and credentials",
      "Portfolio or case study highlights",
      "Client testimonials and logos",
      "Awards and certifications",
      "Custom designed layout",
      "Print and digital versions",
      "Editable template for updates"
    ],
    process: [
      { step: "Gather", description: "Collect company information, achievements, and materials" },
      { step: "Write", description: "Craft compelling copy that positions your company effectively" },
      { step: "Design", description: "Create professional layouts with brand-aligned visuals" },
      { step: "Deliver", description: "Provide final files in print, digital, and editable formats" }
    ],
    faqs: [
      { question: "How long should a business profile be?", answer: "Typically 8-16 pages, comprehensive but concise enough to keep attention." },
      { question: "Do you write the content?", answer: "Yes, we interview you and write professional copy based on your input." },
      { question: "Can we update it ourselves later?", answer: "Yes, we provide editable files so you can update content as needed." },
      { question: "What format is the final profile?", answer: "PDF for sharing, plus source files (InDesign, PowerPoint, or similar)." },
      { question: "Can you include case studies?", answer: "Absolutely. Case studies and portfolio pieces strengthen business profiles." },
      { question: "How is this different from a brochure?", answer: "Business profiles are more comprehensive, focusing on company credentials vs specific offerings." }
    ],
    relatedServices: ["business-brochures", "testimonial-video", "logo-designing"]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(s => s.category === category);
}

export function getRelatedServices(serviceId: string): Service[] {
  const service = services.find(s => s.id === serviceId);
  if (!service) return [];
  return services.filter(s => service.relatedServices.includes(s.id));
}
