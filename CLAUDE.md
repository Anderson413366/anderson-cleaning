# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Anderson Cleaning Company** is a commercial cleaning company website built with Next.js 15 App Router, serving Western Massachusetts and Northern Connecticut. The site targets B2B clients (offices, medical facilities, schools, retail) with a 100-mile service radius from West Springfield, MA.

**Tech Stack**: Next.js 15, React 18, TypeScript, Tailwind CSS, Supabase, Resend, Sanity CMS

**Live Site**: https://andersoncleaning.com

---

## Development Commands

### Core Development
```bash
npm install --legacy-peer-deps    # Install dependencies (required flag)
npm run dev                        # Start dev server (localhost:3000)
npm run build                      # Build for production
npm start                          # Run production build locally
npm run lint                       # Check code quality
npm run type-check                 # TypeScript validation
```

### Testing
```bash
npm run test                       # Run all tests
npm run test:unit                  # Jest unit tests
npm run test:e2e                   # Playwright E2E tests
npm run test:a11y                  # Accessibility compliance tests
npm run test:coverage              # Test coverage report
npm run test:debug                 # Debug mode for Playwright
npm run test:report                # View Playwright test report
```

### Visual Regression Testing
```bash
npm run test:visual                # Run visual regression tests
npm run test:visual:update         # Update visual snapshots
npm run test:visual:ui             # Run visual tests in UI mode
```

---

## Architecture Patterns

### Next.js App Router Structure

**Server Components (Default)**:
- Use for static content, data fetching from Sanity CMS
- No `'use client'` directive needed
- Better performance, smaller bundle size

**Client Components**:
- Required for interactivity: forms, state, hooks, browser APIs
- Add `'use client'` at top of file
- Used in: `components/forms/`, `lib/ThemeProvider.tsx`, interactive UI

**API Routes Pattern**:
```typescript
// app/api/[route]/route.ts
export async function POST(request: Request) {
  // 1. Honeypot check (reject if filled)
  if (data.website) return Response.json({ success: true })

  // 2. Sanitize inputs (lib/security/sanitizer.ts)
  const sanitized = sanitizeFormInput(data)

  // 3. Verify CAPTCHA (lib/security/captcha.ts)
  await verifyCaptcha(data.captchaToken)

  // 4. Process request
  // 5. Return consistent format: { success: boolean, error?: string }
}
```

### Design System Architecture

**Official Brand Colors** (Pantone-specified - STRICT COMPLIANCE per Item 83):
- `brand-deep-blue`: #002A86 (Pantone 2747C) - Primary, headers, dark backgrounds
- `brand-bright-blue`: #0077D9 (Pantone 3005C) - Links, CTAs, highlights, focus states
- `brand-red`: #C8102E (Pantone 193C) - Alerts, errors, urgency CTAs, premium badges
- `brand-white`: #FFFFFF - Backgrounds, text on dark

**IMPORTANT**: No off-brand grays (gray-*, grey-*). For subtle borders/backgrounds, use Deep Blue at 5-20% opacity:
- Borders: `border-brand-deep-blue/10` (light), `dark:border-white/10` (dark mode)
- Backgrounds: `bg-brand-deep-blue/[0.03]` to `bg-brand-deep-blue/[0.08]`

**Typography System** (`tailwind.config.ts`):
- `text-h1`: 40px - Page headlines
- `text-h2`: 32px - Section headings
- `text-h3`: 24px - Subsection headings
- `text-body`: 18px - Default body text
- `text-body-sm`: 16px - Smaller body text
- `text-button`: 18px - Button labels

**Glass Icon System** (`components/ui/GlassIcon.tsx` + `styles/design-system.css`):
Apple-inspired glass-morphism icons with consistent sizing across the site.

Design Specifications:
- Container: Circle with gradient fill (#0077D9 to #002A86 at 15% opacity)
- Background: backdrop-filter: blur(10px)
- Border: 1px solid rgba(255,255,255,0.2)
- Shadow: 0 4px 12px rgba(0,42,134,0.15)
- Icon: White icon centered, 2px stroke weight

Standardized Sizes (use these ONLY):
- `sm` (32px container, 16px icon) - for inline use, small badges, lists
- `md` (48px container, 24px icon) - for cards, section headers
- `lg` (64px container, 32px icon) - for heroes, featured sections

Variants:
- `default` - Glass effect with gradient background (for light backgrounds)
- `light` - Inverted for dark backgrounds (white/transparent)
- `solid` - Filled gradient background for emphasis

Usage:
```tsx
import { GlassIcon, GlassIconWithBadge } from '@/components/ui/GlassIcon'
import { Building2 } from 'lucide-react'

// Basic usage
<GlassIcon icon={Building2} size="md" variant="default" label="Building" />

// With badge (for step numbers)
<GlassIconWithBadge icon={Building2} size="lg" variant="default" badge="1" badgeColor="red" />
```

CSS Classes (for non-React contexts):
- `.glass-icon` / `.glass-icon-light` / `.glass-icon-solid` - base styles
- `.glass-icon-sm` / `.glass-icon-md` / `.glass-icon-lg` - sizes

**Focus States** (Item 84 - Bright Blue #0077D9):
All interactive elements use brand-compliant focus states:
- Form inputs: `border-color: var(--brand-bright-blue)` + `box-shadow: 0 0 0 3px rgba(0,119,217,0.2)`
- Buttons/links: `outline: 2px solid var(--brand-bright-blue)` + `outline-offset: 2px`
- Utility class: `.focus-brand` - applies brand focus styling

**Global Styles Location**:
- `styles/design-system.css` - Official design tokens, form fields, pills, accessibility
- `styles/globals.css` - Imports design-system.css + Tailwind layers

**Form Field System**:
All `<input>`, `<textarea>`, `<select>` elements automatically receive:
- High-contrast borders (deep-blue in light, white in dark)
- Custom dropdown arrows (SVG-based, no browser defaults)
- Focus states with outlines + box-shadows
- WCAG AAA-compliant contrast ratios

**Utility Classes** (defined in `styles/design-system.css`):
- `.category-pill` / `.tag-pill` / `.filter-pill` - Blog/filter tags with active states
- `.hero-section` - Enhanced hero spacing (96px desktop, 64px mobile)
- `.hero-badge` - Extra margin for secondary hero elements

### Mobile Safe-Area Support

**iPhone Notch Compatibility** (`app/layout.tsx` + `styles/globals.css` + `tailwind.config.ts`):
- Viewport: `viewportFit: 'cover'` enables safe-area insets
- CSS Variables: `--safe-area-inset-*` with 16px minimum fallback for bottom
- Tailwind Utilities: `pb-safe-bottom`, `pt-safe-top`, `pl-safe-left`, `pr-safe-right`
- Applied to: Footer, CookieBanner, Header mobile sticky nav
- Ensures bottom CTAs and fixed elements don't overlap iPhone notch/home indicator

**Usage**:
```tsx
// Apply to fixed bottom elements
<div className="fixed bottom-0 left-0 right-0 pb-safe-bottom">
  {/* Content */}
</div>
```

### Dark Mode Implementation

**Theme Provider** (`lib/ThemeProvider.tsx`):
- Uses `localStorage` key: `anderson-theme`
- Adds `.dark` or `.light` class to `<html>`
- Respects system preference on first load
- Accessible via `useTheme()` hook

**Logo Swapping** (in `styles/design-system.css`):
```css
.logo-desktop { display: block; }
.logo-mobile { display: none; }

@media (max-width: 767px) {
  .logo-desktop { display: none; }
  .logo-mobile { display: block; }
}

html.dark .logo-desktop {
  content: url('/brand/white/logo-full-2000-white.png');
}
```

### Form Handling Standard

**Client-Side** (React Hook Form + Zod):
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email(),
  // ...
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur'
})
```

**Server-Side** (API route pattern above applies)

---

## Security Architecture

### Content Security Policy

**Location**: `lib/security/csp.ts`
- Nonce-based CSP for inline scripts
- Nonce injected via `middleware.ts` → `x-nonce` header
- Used in `app/layout.tsx` for inline scripts

**Adding New Domains**:
1. Edit `lib/security/csp.ts`
2. Add to appropriate directive (script-src, img-src, etc.)
3. Test in both development and production

### Rate Limiting

**Configuration**: `middleware.ts` → `RATE_LIMITS` object
- Forms: 5 requests/hour per IP
- APIs: 100 requests/15min per IP
- Studio: IP allowlist + Basic Auth

**Adding Rate Limits**:
```typescript
// middleware.ts
const RATE_LIMITS = {
  '/api/new-endpoint': { max: 10, window: 60 * 1000 }, // 10/min
}
```

### Input Sanitization

**Always use** `lib/security/sanitizer.ts` functions:
```typescript
import { sanitizeFormInput } from '@/lib/security/sanitizer'

const clean = sanitizeFormInput(userInput, 'text')   // text, email, tel, url
```

---

## Content Management (Sanity CMS)

**Data Fetching**:
- Queries: `lib/cms/queries.ts`
- Client setup: `lib/cms/client.ts`
- ISR pattern: `export const revalidate = 3600` (1 hour)

**Adding New Content Type**:
1. Define schema in `lib/cms/schemas/`
2. Add query to `lib/cms/queries.ts`
3. Use in page component with ISR revalidation

**Studio Access**:
- Protected route: `/studio`
- Authentication in `middleware.ts`

---

## SEO & Metadata

**Structured Data** (`lib/seo/jsonld.ts`):
```typescript
import { generateOrganizationSchema } from '@/lib/seo/jsonld'

const schema = generateOrganizationSchema()
```

**Metadata Pattern**:
```typescript
export const metadata: Metadata = {
  title: 'Page Title | Anderson Cleaning Company',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
}
```

**Sitemap**: Auto-generated post-build via `next-sitemap.config.js`

---

## Accessibility Standards

**WCAG 2.2 AA Compliance Required**:
- All text meets 4.5:1 contrast ratio (7:1 for large text)
- Focus indicators visible on all interactive elements
- Keyboard navigation fully supported
- Skip navigation link present (`components/SkipLink.tsx`)
- Touch targets minimum 44x44px

**Testing**:
```bash
npm run test:a11y  # Runs axe-core accessibility tests
```

**Form Accessibility**:
- Labels properly associated with inputs
- Error messages linked with `aria-describedby`
- Required fields marked with `aria-required`
- Invalid fields marked with `aria-invalid`

---

## Performance Standards

**Core Web Vitals Targets**:
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

**Image Optimization**:
- Use Next.js `<Image>` component
- Provide explicit `width` and `height`
- Use `priority` for above-fold images
- Formats: AVIF, WebP (auto-generated)

**Code Splitting**:
- Automatic via Next.js App Router
- Dynamic imports for heavy components:
  ```typescript
  const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
    loading: () => <Skeleton />
  })
  ```

---

## Key File Locations

**Critical Configuration**:
- `middleware.ts` - Security headers, rate limiting, CSP nonce injection
- `next.config.js` - Image optimization, security headers, caching
- `tailwind.config.ts` - Brand colors, typography, spacing scale
- `styles/design-system.css` - Form fields, pills, hero spacing, accessibility

**Security**:
- `lib/security/csp.ts` - Content Security Policy
- `lib/security/sanitizer.ts` - Input sanitization
- `lib/security/captcha.ts` - CAPTCHA verification

**Theme & UI**:
- `lib/ThemeProvider.tsx` - Dark mode logic
- `components/Header.tsx` - Navigation (logo swapping)
- `components/Footer.tsx` - Site footer (no logo/icons in contact section)

**Forms**:
- `components/forms/` - All form components
- Form validation schemas were in `lib/validation/` (note: none found during scan)

---

## Testing Patterns

**Unit Tests** (Jest + React Testing Library):
```typescript
import { render, screen } from '@testing-library/react'
import { expect, test } from '@jest/globals'

test('renders component', () => {
  render(<Component />)
  expect(screen.getByText('text')).toBeInTheDocument()
})
```

**E2E Tests** (Playwright):
```typescript
import { test, expect } from '@playwright/test'

test('form submission', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.getByText('Success')).toBeVisible()
})
```

**Accessibility Tests**:
- Automated: `npm run test:a11y` (axe-core)
- Manual: Keyboard navigation, screen reader testing

---

## Common Pitfalls & Solutions

### Issue: "Cannot find module" errors
**Solution**: Run `npm install --legacy-peer-deps` (required flag)

### Issue: Dark mode logo not swapping
**Solution**: Check `styles/design-system.css` for `.logo-desktop` / `.logo-mobile` CSS `content` property

### Issue: Forms not submitting
**Solution**:
1. Check honeypot field (`website`) not filled
2. Verify CAPTCHA token present
3. Check rate limit not exceeded
4. Inspect browser console for validation errors

### Issue: TypeScript errors in build
**Solution**: Run `npm run type-check` to identify issues before build

### Issue: Dark mode Tailwind classes not working
**Solution**: Ensure `darkMode: 'class'` in `tailwind.config.ts` and `ThemeProvider` wraps app

---

## Git Workflow

**Deployment**:
- Push to `main` branch triggers automatic Vercel deployment
- Preview deployments on pull requests
- Production URL: https://andersoncleaning.com

**Commit Standards** (from recent history):
```bash
git commit -m "Clear description of change

- Bullet point details
- Include technical specifics
- Reference file paths

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Environment Variables

**Required**:
```env
NEXT_PUBLIC_SITE_URL=https://andersoncleaning.com
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

**Optional**:
```env
RESEND_API_KEY=...                      # Email sending
NEXT_PUBLIC_GA_MEASUREMENT_ID=...       # Google Analytics
NEXT_PUBLIC_SANITY_PROJECT_ID=...       # Sanity CMS
```

**Local Development**: Copy `.env.example` to `.env.local`

---

## Additional Documentation

**Detailed Guides** (in `docs-setup-guides/`):
- Forms setup and configuration
- DNS migration checklist
- Email service (Resend) DNS setup

**Component Patterns**: `components/README.md` (if exists)

**Copilot Instructions**: `.github/copilot-instructions.md` (comprehensive architecture details)

---

**Last Updated**: 2025-01-22
**Maintained By**: Anderson Gomes / Claude Code
