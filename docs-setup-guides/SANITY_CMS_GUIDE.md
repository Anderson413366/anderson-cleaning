# Sanity CMS Setup & Usage Guide

## 📚 Table of Contents
- [Overview](#overview)
- [Accessing Sanity Studio](#accessing-sanity-studio)
- [Content Types](#content-types)
- [How to Edit Content](#how-to-edit-content)
- [Using Sanity Images](#using-sanity-images)
- [Querying Data in Code](#querying-data-in-code)
- [Environment Variables](#environment-variables)

---

## Overview

Sanity CMS is your headless content management system for the Anderson Cleaning Company website. It allows you to easily update content without touching code.

**Key Benefits:**
- ✅ Edit content from anywhere (browser-based)
- ✅ Real-time preview
- ✅ Image optimization built-in
- ✅ Version control for content
- ✅ Role-based permissions

---

## Accessing Sanity Studio

### Local Development

1. **Start the Next.js dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Sanity Studio:**
   ```
   http://localhost:3000/studio
   ```

3. **Login** with your Sanity credentials

### Production

Visit: `https://andersoncleaning.com/studio`

---

## Content Types

### 🎯 Promotions (`promo`)
Manage promotional banners, pop-ups, and special offers.

**Fields:**
- **Title**: Main promotion headline
- **Description**: Supporting text
- **Discount**: Percentage or dollar amount
- **Discount Type**: Percentage, dollar, or free service
- **CTA Text**: Button text (e.g., "Learn More")
- **CTA Link**: Where the button leads
- **Start/End Date**: When promotion is active
- **Display Type**: Modal, banner, or inline
- **Is Active**: Toggle on/off
- **Priority**: Higher numbers show first (1-10)
- **Image**: Optional promotional image
- **Colors**: Background and text colors
- **Conditions**: Terms & conditions text

**Example Use:**
```typescript
import { getModalPromotion } from '@/lib/cms/queries'

const promo = await getModalPromotion()
```

---

### 📝 Blog Posts (`post`)
Manage blog articles and content marketing.

**Fields:**
- **Title**: Post title
- **Slug**: URL-friendly identifier
- **Excerpt**: Short summary (max 200 chars)
- **Author**: Author name
- **Published Date**: When to publish
- **Categories**: Classification (cleaning-tips, industry-news, etc.)
- **Tags**: Additional keywords
- **Featured Image**: Hero image with alt text
- **Body**: Rich text content
- **SEO Fields**: Meta title, description, OG image

**Example Use:**
```typescript
import { getAllPosts, getPostBySlug } from '@/lib/cms/queries'

const posts = await getAllPosts()
const post = await getPostBySlug('office-cleaning-tips')
```

---

### ❓ FAQs (`faq`)
Frequently asked questions displayed across the site.

**Fields:**
- **Question**: The FAQ question (max 200 chars)
- **Answer**: Detailed answer
- **Category**: general, services, pricing, scheduling, policies
- **Display Order**: Lower numbers appear first
- **Is Active**: Show/hide
- **Related Services**: Link to specific services
- **Related Industries**: Link to specific industries

**Example Use:**
```typescript
import { getAllFAQs, getFAQsByCategory } from '@/lib/cms/queries'

const allFAQs = await getAllFAQs()
const serviceFAQs = await getFAQsByCategory('services')
```

---

### 🎨 Hero Sections (`hero`)
Manage hero sections for different pages.

**Fields:**
- **Page**: Which page (homepage, services, about, etc.)
- **Headline**: Main hero text (max 100 chars)
- **Subheadline**: Supporting text (max 250 chars)
- **Background Image**: Hero background with alt text
- **Primary CTA**: Main button (text + link)
- **Secondary CTA**: Optional second button
- **Trust Signals**: Small badges (e.g., "4.8★ Rating") - max 4
- **Is Active**: Enable/disable

**Example Use:**
```typescript
import { getHeroByPage } from '@/lib/cms/queries'

const hero = await getHeroByPage('homepage')
```

---

### 💰 Pricing Plans (`pricing`)
Manage pricing tiers and packages.

**Fields:**
- **Plan Name**: e.g., "Standard", "Premium"
- **Tagline**: Who this is for
- **Base Price**: Starting price
- **Pricing Unit**: per-month, per-week, per-visit, per-sqft, custom
- **Features**: List of included features (checkmark or X)
- **Is Popular**: Highlight as most popular
- **CTA Text/Link**: Button text and destination
- **Minimum Commitment**: e.g., "6 months", "No contract"
- **Service Areas**: Where available
- **Display Order**: Lower numbers first
- **Is Active**: Show/hide

**Example Use:**
```typescript
import { getAllPricingPlans, getPopularPricing } from '@/lib/cms/queries'

const plans = await getAllPricingPlans()
const popular = await getPopularPricing()
```

---

### 🔧 Site Settings (`settings`)
Global site configuration.

**Fields:**
- **Site Name**: Website name
- **Company Info**: Address, phone, email, hours
- **Social Links**: Facebook, LinkedIn, Instagram
- **Google Rating**: Your Google My Business rating (1-5)
- **Notices**: Site-wide banner notices

**Example Use:**
```typescript
import { getSettings } from '@/lib/cms/queries'

const settings = await getSettings()
```

---

### 🧭 Navigation (`navigation`)
Manage header and footer menus.

**Fields:**
- **Header Links**: Main navigation menu
- **Footer Links**: Footer menu items
- **CTA Button**: Call-to-action button

**Example Use:**
```typescript
import { getNavigation } from '@/lib/cms/queries'

const nav = await getNavigation()
```

---

### 🧹 Services (`service`)
Service pages and offerings.

**Example Use:**
```typescript
import { getAllServices, getServiceBySlug } from '@/lib/cms/queries'

const services = await getAllServices()
const service = await getServiceBySlug('office-cleaning')
```

---

### 🏢 Industries (`industry`)
Industry-specific pages.

**Example Use:**
```typescript
import { getAllIndustries, getIndustryBySlug } from '@/lib/cms/queries'

const industries = await getAllIndustries()
const industry = await getIndustryBySlug('healthcare')
```

---

### ⭐ Testimonials (`testimonial`)
Customer reviews and testimonials.

**Example Use:**
```typescript
import { getAllTestimonials, getFeaturedTestimonials } from '@/lib/cms/queries'

const testimonials = await getAllTestimonials()
const featured = await getFeaturedTestimonials(3) // Get 3 featured
```

---

### 📸 Before & After (`beforeAfter`)
Before/after comparison images.

**Example Use:**
```typescript
import { getAllBeforeAfter, getFeaturedBeforeAfter } from '@/lib/cms/queries'

const comparisons = await getAllBeforeAfter()
const featured = await getFeaturedBeforeAfter(4) // Get 4 featured
```

---

## How to Edit Content

### 1. Creating a New Promotion

1. Navigate to **Sanity Studio** (`/studio`)
2. Click **"Promotions"** in the sidebar
3. Click **"Create new Promo"**
4. Fill in the fields:
   - Title: `10% Off First Month`
   - Discount: `10`
   - Discount Type: `Percentage`
   - Start Date: Select date
   - End Date: Select end date
   - Display Type: `Modal`
   - Is Active: ✅ **Check**
5. Click **"Publish"**

**Result:** Your promotion will now display as a pop-up on the website!

---

### 2. Adding a Blog Post

1. Navigate to **"Blog Posts"**
2. Click **"Create new Post"**
3. Fill in required fields:
   - Title
   - Slug (auto-generated from title)
   - Excerpt
   - Featured Image (upload + alt text)
   - Published Date
   - Body content (rich text editor)
4. Add categories and tags
5. Fill in SEO fields
6. Click **"Publish"**

---

### 3. Updating FAQs

1. Navigate to **"FAQs"**
2. Click **"Create new FAQ"** or edit existing
3. Fill in:
   - Question
   - Answer
   - Category
   - Display Order (lower = higher priority)
   - Is Active: ✅
4. Click **"Publish"**

---

### 4. Editing Hero Sections

1. Navigate to **"Hero Sections"**
2. Select the page you want to edit (e.g., "homepage")
3. Update:
   - Headline
   - Subheadline
   - Background Image
   - CTA buttons
4. Click **"Publish"**

---

## Using Sanity Images

Sanity automatically optimizes images. Use the image utilities:

```typescript
import { urlFor, sanityLoader } from '@/lib/cms/sanity.image'
import Image from 'next/image'

// Method 1: Using urlFor
const imageUrl = urlFor(image).width(800).height(600).url()

// Method 2: Using Next.js Image with sanityLoader
<Image
  src={image}
  loader={sanityLoader}
  width={800}
  height={600}
  alt="Description"
/>
```

**Benefits:**
- ✅ Auto WebP/AVIF conversion
- ✅ Automatic responsive sizing
- ✅ CDN delivery
- ✅ On-demand transformations

---

## Querying Data in Code

All queries are located in `lib/cms/queries.ts`.

### Server Components (Recommended)

```typescript
// app/page.tsx
import { getModalPromotion } from '@/lib/cms/queries'

export default async function HomePage() {
  const promo = await getModalPromotion()

  return (
    <div>
      {promo && (
        <PromoModal
          title={promo.title}
          description={promo.description}
          // ... other props
        />
      )}
    </div>
  )
}
```

### Client Components

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getModalPromotion } from '@/lib/cms/queries'

export default function PromoComponent() {
  const [promo, setPromo] = useState(null)

  useEffect(() => {
    getModalPromotion().then(setPromo)
  }, [])

  if (!promo) return null

  return <div>{promo.title}</div>
}
```

---

## Environment Variables

Required environment variables in `.env.local`:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token # Optional, for preview mode
```

### Finding Your Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click your project
3. Copy the **Project ID**

### Creating an API Token

1. In Sanity dashboard, go to **Settings > API**
2. Click **"Add API Token"**
3. Name: `Production Read Token`
4. Permissions: **Read**
5. Copy the token to `.env.local`

---

## Tips & Best Practices

### ✅ DO:
- Always add descriptive alt text to images
- Use the preview pane to check changes before publishing
- Fill in SEO fields for better search rankings
- Set appropriate display orders for FAQs and pricing
- Use start/end dates for time-limited promotions

### ❌ DON'T:
- Leave required fields empty
- Upload images larger than 5MB (compress first)
- Delete content without checking if it's used elsewhere
- Use special characters in slugs
- Forget to check "Is Active" when publishing

---

## Troubleshooting

### Content Not Showing on Website

1. **Check "Is Active"** - Make sure the content is marked as active
2. **Check Dates** - For promos, ensure start/end dates are correct
3. **Clear Cache** - Try hard refresh (Cmd/Ctrl + Shift + R)
4. **Check Build** - Content may need a rebuild (automatic on Vercel)

### Can't Access Sanity Studio

1. **Check URL** - Should be `/studio` not `/admin`
2. **Clear Cookies** - Try incognito mode
3. **Check Credentials** - Verify you're using the correct Sanity account

### Images Not Loading

1. **Check File Size** - Max 5MB recommended
2. **Check Format** - Use JPG, PNG, or WebP
3. **Add Alt Text** - Required for accessibility
4. **Check Permissions** - Ensure image is published

---

## Support

**Documentation:** [Sanity Docs](https://www.sanity.io/docs)
**Community:** [Sanity Slack](https://slack.sanity.io/)

**Project-Specific Help:**
- Review `/lib/cms/schemas/` for schema definitions
- Review `/lib/cms/queries.ts` for available queries
- Check Sanity Studio at `/studio` for content structure

---

Last Updated: January 2025
