# Performance Documentation

This document outlines the performance budgets, monitoring, and optimization strategies for the Anderson Cleaning website.

## Performance Budgets

### Core Web Vitals (Mobile)

These metrics are enforced by Lighthouse CI and must pass for all deployments:

| Metric | Target | Threshold |
|--------|--------|-----------|
| **Performance Score** | ≥ 90 | Error |
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Error |
| **TBT** (Total Blocking Time) | ≤ 150ms | Error |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Error |
| **FCP** (First Contentful Paint) | ≤ 1.8s | Warning |
| **SI** (Speed Index) | ≤ 3.4s | Warning |
| **TTI** (Time to Interactive) | ≤ 3.8s | Warning |

### Resource Budgets

| Resource | Budget | Threshold |
|----------|--------|-----------|
| **Total Page Weight** | ≤ 3.0 MB | Warning |
| **JavaScript Bundle** | ≤ 3.0 MB (total) | Warning |
| **DOM Size** | ≤ 1,500 nodes | Warning |
| **JavaScript Bootup Time** | ≤ 3.0s | Warning |
| **Main Thread Work** | ≤ 4.0s | Warning |

## Lighthouse CI Integration

### Local Testing

```bash
# Install Lighthouse CI globally (one-time)
npm install -g @lhci/cli

# Build the project
npm run build

# Run Lighthouse CI
lhci autorun
```

### CI/CD Integration

Lighthouse CI runs automatically in the CI/CD pipeline:

1. **On PR Creation**: Audits preview deployment
2. **On Main Branch**: Audits production deployment
3. **Budget Enforcement**: PR fails if budgets not met

#### Viewing Results

- **GitHub Actions**: Check the "Lighthouse Audit" job
- **Artifacts**: Download `lighthouse-results` for detailed reports
- **Temporary Public Storage**: Link provided in CI logs

## Current Performance Scores

Last updated: 2025-11-15

### Homepage
- Performance: 92
- Accessibility: 98
- Best Practices: 96
- SEO: 100

### Apply Page
- Performance: 90
- Accessibility: 97
- Best Practices: 95
- SEO: 100

### Services Page
- Performance: 91
- Accessibility: 98
- Best Practices: 96
- SEO: 100

## Optimization Strategies

### 1. Image Optimization

**Implemented:**
- Next.js `<Image>` component for automatic optimization
- WebP and AVIF formats with fallbacks
- Responsive images with `srcset`
- Lazy loading for below-fold images
- CDN delivery via Sanity.io

**Recommended:**
- Use Sanity's image transformation API
- Implement blur-up placeholders
- Use `priority` prop for LCP images

### 2. JavaScript Optimization

**Implemented:**
- Code splitting with Next.js automatic chunking
- Tree-shaking unused code
- Dynamic imports for heavy components
- Lazy loading for non-critical components

**Lazy-Loaded Components:**
- Cookie Banner (1s delay)
- Before/After Slider
- Feedback Widget
- Chat Widget (Crisp)

**Recommended:**
- Review and minimize third-party scripts
- Use `next/script` with `strategy="lazyOnload"` for non-critical scripts
- Defer Google Analytics until after page load

### 3. CSS Optimization

**Implemented:**
- Tailwind CSS with automatic purging
- Critical CSS inlined
- Font loading optimization with `font-display: swap`
- Removal of unused CSS

**Recommended:**
- Use CSS containment for isolated components
- Minimize animation complexity
- Use `will-change` sparingly

### 4. Network Optimization

**Implemented:**
- HTTP/2 server push (Vercel)
- Brotli/Gzip compression
- Long-term caching for static assets
- Resource hints (preconnect, dns-prefetch)

**Resource Hints in Use:**
- `preconnect`: Google Fonts, Sanity CDN, GTM, GA
- `dns-prefetch`: Crisp, Calendly, Clarity, HubSpot, Resend

### 5. Rendering Optimization

**Implemented:**
- Static Generation (SSG) for most pages
- Incremental Static Regeneration (ISR) where needed
- Server Components for data fetching
- React Server Components for zero-JS sections

**Recommended:**
- Use `loading.tsx` for Suspense boundaries
- Implement streaming SSR for slow data fetches
- Minimize client-side JavaScript

## Fixing Common Regressions

### LCP Regression

**Symptoms:** LCP > 2.5s

**Common Causes:**
- Large hero images not optimized
- Hero image not using `priority` prop
- Render-blocking resources
- Slow server response time

**Fixes:**
```tsx
// ✅ DO: Prioritize LCP image
<Image
  src="/hero.jpg"
  alt="Hero"
  priority // Preload this image
  fill
  sizes="100vw"
/>

// ❌ DON'T: Lazy load LCP image
<Image
  src="/hero.jpg"
  loading="lazy" // This delays LCP!
/>
```

### TBT Regression

**Symptoms:** TBT > 150ms

**Common Causes:**
- Heavy JavaScript execution
- Long tasks blocking main thread
- Synchronous third-party scripts
- Large React component trees

**Fixes:**
```tsx
// ✅ DO: Lazy load heavy components
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />,
})

// ✅ DO: Defer non-critical scripts
<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
/>

// ❌ DON'T: Load everything upfront
import HeavyComponent from './Heavy'
```

### CLS Regression

**Symptoms:** CLS > 0.1

**Common Causes:**
- Images without dimensions
- Ads/embeds without reserved space
- Web fonts causing FOIT/FOUT
- Dynamic content injected above fold

**Fixes:**
```tsx
// ✅ DO: Always specify image dimensions
<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="Image"
/>

// ✅ DO: Reserve space for embeds
<div style={{ aspectRatio: '16/9' }}>
  <iframe src="..." />
</div>

// ✅ DO: Use font-display: swap
@font-face {
  font-family: 'Custom';
  font-display: swap;
}
```

## Monitoring

### Automated Monitoring

1. **Lighthouse CI**: Runs on every PR and deployment
2. **Web Vitals**: Tracked via Google Analytics
3. **Sentry**: Performance monitoring and error tracking
4. **Vercel Analytics**: Real User Monitoring (RUM)

### Manual Audits

Run manual audits periodically:

```bash
# Chrome DevTools Lighthouse
# 1. Open Chrome DevTools
# 2. Go to Lighthouse tab
# 3. Select "Mobile" and "Performance"
# 4. Click "Analyze page load"

# WebPageTest
# Visit https://www.webpagetest.org/
# Test from multiple locations

# PageSpeed Insights
# Visit https://pagespeed.web.dev/
```

## Performance Dashboard

Track key metrics over time:

- **Lighthouse CI Trends**: View score history
- **Web Vitals Dashboard**: Google Analytics > Events > web-vitals
- **Sentry Performance**: View transaction traces and spans
- **Vercel Analytics**: Real user performance data

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals Report](https://support.google.com/webmasters/answer/9205520)
- [WebPageTest](https://www.webpagetest.org/)

## Support

For questions or issues with performance:
1. Check this documentation
2. Review Lighthouse CI reports in GitHub Actions
3. Analyze Web Vitals in Google Analytics
4. Contact the development team
