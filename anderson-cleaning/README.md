# Anderson Cleaning - Commercial Cleaning Website

Professional B2B commercial cleaning website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
anderson-cleaning/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   ├── common/            # Header, Footer, etc.
│   └── sections/          # Page sections
├── lib/
│   └── utils/             # Utility functions
├── styles/
│   └── globals.css        # Global styles
└── public/                # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: `#1D4ED8` (blue-700) - Main brand color
- **Accent**: `#10B981` (green-500) - CTAs and highlights
- **Neutral**: Slate/Gray Tailwind scale

### Typography
- Font: **Inter** (Google Fonts)
- Headings: 700-900 weight
- Body: 400-500 weight

## 🌍 Features

✅ **Built:**
- Modern, responsive design
- Hero section with gradient background
- Services grid (6 services)
- Value propositions (4 pillars)
- CTA sections
- Professional footer with contact info
- Matching careers page design

🔜 **Coming Soon (Phase 2):**
- Multi-language support (EN, ES, PT-BR, RO)
- Quote form with validation
- Service detail pages
- Industries page
- Testimonials
- Sanity CMS integration
- HubSpot integration
- Analytics (GA4 + Clarity)

## 🔧 Development

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

1. Build the project: `npm run build`
2. The output will be in `.next/` directory
3. Upload to your hosting provider

## 🎯 Current Status (Phase 1)

**✅ Completed:**
- Next.js 14 setup with TypeScript
- Tailwind CSS configuration
- Design system matching careers page
- Beautiful home page with:
  - Hero section
  - Services grid
  - Value props
  - CTA sections
  - Professional footer
- Responsive design (mobile-first)
- Button component library

**📋 Next Steps:**
- Add Quote form
- Create service pages
- Add multilingual support
- Integrate CMS
- Add remaining pages

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## 📞 Support

For questions or issues, contact the development team.

## 📄 License

© 2025 Anderson Cleaning, Inc. All rights reserved.
