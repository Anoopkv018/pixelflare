# PixelFlare - Modern Agency Website

A fast, responsive, production-ready marketing website for PixelFlare featuring modern UI, comprehensive service pages, pricing, blog-ready structure, and a multi-step quote request system.

## Features

- **Complete Marketing Site**: Home, About, Pricing, Contact, and detailed service pages
- **Smart Navigation**: Sticky header with mega menu showcasing all services
- **Multi-Step Quote Form**: 4-step modal form with validation, bot protection, and pre-selection support
- **Database Integration**: Supabase backend for form submissions with Row Level Security
- **16 Service Pages**: Individual pages for each service with FAQs, deliverables, and related services
- **SEO Optimized**: Meta tags, semantic HTML, and fast performance
- **Responsive Design**: Mobile-first approach with smooth animations and interactions
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, Vite, Supabase

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (database is already configured)

### Installation

1. Clone or download this project

2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env`

### Running Locally

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── ui/              # Reusable components (Button, Modal, Card, etc.)
│   └── QuoteModal.tsx   # Multi-step quote request form
├── config/
│   ├── site.ts          # Site config, navigation, categories
│   ├── services.ts      # All service definitions
│   └── pricing.ts       # Pricing tiers
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── api.ts           # Form submission handlers
├── pages/               # All page components
├── Router.tsx           # Client-side routing
└── App.tsx             # Main app component
```

## Configuration

### Editing Content

All content is centralized in configuration files:

- **Site Info**: `src/config/site.ts` - company info, navigation, social links
- **Services**: `src/config/services.ts` - service details, FAQs, deliverables
- **Pricing**: `src/config/pricing.ts` - pricing tiers and features

### Adding a New Service

1. Add service definition to `src/config/services.ts`
2. Add the service to appropriate mega menu column in `src/config/site.ts`
3. The service page will be automatically generated at `/services/your-service-slug`

### Modifying the Quote Form

The quote form is in `src/components/QuoteModal.tsx`. To modify:

- Add/remove form fields in the `formData` state
- Update validation in `validateStep()`
- Modify the step content in the JSX
- Update the submission in `handleSubmit()`

## Database

The Supabase database includes two tables:

- `quote_submissions` - Stores quote requests from the modal form
- `contact_submissions` - Stores contact form submissions

Both tables have Row Level Security enabled with policies that allow:
- Public users to insert (submit forms)
- Service role to read/update (for admin access)

### Accessing Submissions

To view submissions, use the Supabase dashboard or create an admin panel that uses the service role key.

## Deployment

This is a static site that can be deployed to:

- **Vercel**: Connect your repo and deploy
- **Netlify**: Drag and drop the `dist` folder after building
- **Cloudflare Pages**: Connect repo or upload build
- **Any static hosting**: Upload the `dist` folder contents

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

## Customization

### Colors

The brand colors are defined in Tailwind classes throughout components:

- Primary Pink: `#fe2681`
- Navy: `#14276d`
- Accent: `#bf1c60`
- Dark: `#0b1020`
- Light: `#f7f7fb`

To change colors, search and replace these hex values or update Tailwind config.

### Fonts

The site uses Inter from Google Fonts, loaded in `index.html`. To change:

1. Update the Google Fonts link in `index.html`
2. Update the font-family in `src/index.css`

### Adding New Pages

1. Create a new component in `src/pages/`
2. Import it in `src/Router.tsx`
3. Add a route condition in the `renderPage()` function
4. Add navigation link if needed in `src/config/site.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The site is optimized for performance with:

- Lazy-loaded images
- Minimal JavaScript bundle
- Efficient CSS with Tailwind
- Optimized fonts with preconnect

Expected Lighthouse scores: 90+ across all metrics

## Support

For questions or issues with this codebase, refer to the component files which include inline documentation for complex functionality.

## License

Copyright © 2024 PixelFlare. All rights reserved.
