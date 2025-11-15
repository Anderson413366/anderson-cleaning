# Testing & Quality Assurance Documentation

## Overview

This document provides comprehensive testing and QA procedures for the Anderson Cleaning website.

## Table of Contents

1. [Running Tests Locally](#running-tests-locally)
2. [Playwright E2E Tests](#playwright-e2e-tests)
3. [Visual Regression Testing (VRT)](#visual-regression-testing-vrt)
4. [Cypress E2E Tests](#cypress-e2e-tests)
5. [Lighthouse Audits](#lighthouse-audits)
6. [Accessibility Testing](#accessibility-testing)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Performance Optimization](#performance-optimization)

---

## Running Tests Locally

### Prerequisites

```bash
cd anderson-cleaning
npm install
```

### Available Test Commands

```bash
# Playwright E2E tests
npm run test:e2e                    # Run all Playwright tests
npm run test:e2e:ui                 # Run with interactive UI
npm run test:e2e:snapshots          # Run visual regression tests only
npm run test:e2e:update             # Update all snapshots
npm run test:e2e:snapshots:update   # Update VRT snapshots only

# Cypress tests (legacy)
npm run cypress:open                # Run Cypress tests (interactive)
npm run cypress:run                 # Run Cypress tests (headless)

# Lighthouse audit
npm run lighthouse

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Playwright E2E Tests

### Overview

Playwright is our primary E2E testing framework. It provides:
- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Visual regression testing (VRT)
- Screenshot comparison
- Trace viewer for debugging

### Test Files

Located in `tests/e2e/`:

- **home.spec.ts** - Homepage functionality tests
- **accessibility.spec.ts** - WCAG compliance tests
- **apply.spec.ts** - Apply/Careers page tests
- **apply-header.spec.ts** - Duplicate header detection tests
- **snapshots.spec.ts** - Visual regression tests (VRT)

### Running Playwright Tests

**All E2E Tests:**
```bash
npm run test:e2e
```

**Interactive UI Mode (Recommended for Development):**
```bash
npm run test:e2e:ui
```

**Visual Regression Tests Only:**
```bash
npm run test:e2e:snapshots
```

**Specific Test File:**
```bash
npx playwright test tests/e2e/home.spec.ts
```

**Specific Browser:**
```bash
npx playwright test --project=chromium
```

### Configuration

Playwright is configured in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Test timeout**: 30 seconds
- **Retries**: 2 on CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Web server**: Auto-starts `npm run dev`

---

## Visual Regression Testing (VRT)

### What is Visual Regression Testing?

Visual regression testing captures full-page screenshots and compares them to baseline images. If pixels differ beyond a threshold, the test fails, catching unintended visual changes.

### Routes Tested

The snapshot tests (`snapshots.spec.ts`) cover these key routes:

- `/` (Home)
- `/services`
- `/industries`
- `/about`
- `/apply`
- `/contact`
- `/faq`

### Viewports Tested

Each route is tested at 3 viewport sizes:

| Viewport | Size | Description |
|----------|------|-------------|
| Mobile | 360×800 | Smartphone |
| Tablet | 768×1024 | Tablet |
| Desktop | 1366×768 | Laptop/Desktop |

**Total snapshots**: 7 routes × 3 viewports = **21 snapshots per browser**

### Layout Parity Assertions

For each route × viewport combination, we automatically assert:

1. ✅ **Exactly 1 header and 1 footer** (no duplicates)
2. ✅ **Consistent container max-width** (`.container` CSS class)
3. ✅ **No horizontal scrollbars** (responsive design check)
4. ✅ **No console errors** (JavaScript health check)

### Cross-Route Consistency Checks

We also verify:
- Header height is consistent across all routes (±5px tolerance)
- Footer structure has the same number of links
- Theme colors are consistent (header background)

### Running Snapshot Tests

**Run snapshot tests:**
```bash
npm run test:e2e:snapshots
```

**View test report (shows visual diffs):**
```bash
npx playwright show-report
```

### Updating Snapshots

⚠️ **Only update snapshots after reviewing the visual diffs!**

**When to update:**
- You've made intentional design changes (colors, fonts, spacing)
- You've updated component layouts
- You've modified responsive breakpoints

**How to update:**

1. **Run tests to see failures:**
   ```bash
   npm run test:e2e:snapshots
   ```

2. **Review visual diffs:**
   ```bash
   npx playwright show-report
   ```
   Opens an HTML report showing Expected vs Actual screenshots.

3. **Update snapshots if changes are correct:**
   ```bash
   npm run test:e2e:snapshots:update
   ```

4. **Commit updated snapshots:**
   ```bash
   git add tests/e2e/__snapshots__
   git commit -m "test(vrt): update visual snapshots after design changes"
   git push
   ```

### Snapshot Storage

Snapshots are stored in `tests/e2e/__snapshots__/` with naming:

```
{route-name}-{viewport-name}.png
```

Examples:
- `home-mobile.png`
- `services-desktop.png`
- `apply-tablet.png`

These files are committed to Git so CI can compare against the baseline.

### Handling Snapshot Failures in CI

If the GitHub Actions workflow fails due to snapshot mismatches:

1. **Download artifacts**: Go to Actions → Failed run → Artifacts → `snapshot-diff`
2. **Review locally**: Run `npm run test:e2e:snapshots` to reproduce
3. **Update if correct**: Run `npm run test:e2e:snapshots:update`
4. **Commit and push**: The updated snapshots will make CI pass

The CI will automatically comment on your PR with update instructions if snapshots fail.

### Troubleshooting Snapshots

**Flaky snapshots (random failures):**
- Disable animations: Already configured in `snapshots.spec.ts`
- Mask dynamic content: Add `data-testid="dynamic-content"` to changing elements
- Increase wait time: Already set to 500ms after page load

**Font rendering differences:**
- CI uses Ubuntu (Linux), which may render fonts differently than macOS/Windows
- Solution: Commit snapshots generated on CI, or increase `threshold` to 0.3

**Threshold too strict:**
- Edit `tests/e2e/snapshots.spec.ts`:
  ```ts
  threshold: 0.3, // Increase from 0.2
  ```

---

## Cypress E2E Tests

### Test Files

Located in `cypress/e2e/`:

- **navigation.cy.ts** - Header, footer, routing tests
- **forms.cy.ts** - Contact form, quote form validation
- **accessibility.cy.ts** - WCAG compliance, dark mode, keyboard navigation

### Running Cypress Tests

**Interactive Mode (with UI):**
```bash
npm run cypress:open
```

**Headless Mode (CI):**
```bash
npm run cypress:run
```

### Custom Commands

Defined in `cypress/support/commands.ts`:

- `cy.checkA11y()` - Run axe accessibility tests
- `cy.testKeyboardNav()` - Test keyboard navigation
- `cy.toggleDarkMode()` - Toggle dark/light theme
- `cy.checkBrokenLinks()` - Check for broken links

### Example Test

```typescript
describe('Navigation', () => {
  it('should navigate to contact page', () => {
    cy.visit('/')
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
  })
})
```

---

## Lighthouse Audits

### Configuration

Lighthouse CI is configured in `lighthouserc.js` with the following targets:

- **Performance:** ≥ 90
- **Accessibility:** ≥ 90
- **Best Practices:** ≥ 90
- **SEO:** ≥ 90

### Running Lighthouse Locally

```bash
# Install Lighthouse CI globally
npm install -g @lhci/cli

# Build the project
npm run build

# Run Lighthouse audit
lhci autorun
```

### Metrics Monitored

- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 300ms
- Speed Index: < 3s

---

## Accessibility Testing

### Tools Used

1. **axe-core** - Automated accessibility testing
2. **Cypress** - Interactive testing
3. **Manual testing** - Screen readers (NVDA, JAWS, VoiceOver)

### Running Accessibility Tests

```bash
# Start dev server
npm run dev

# Run axe tests
npx @axe-core/cli http://localhost:3000
```

### WCAG 2.1 AA Compliance Checklist

- ✅ All images have alt text
- ✅ All form inputs have labels
- ✅ Color contrast ≥ 4.5:1
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Skip to main content link
- ✅ Semantic HTML structure
- ✅ ARIA attributes where needed

---

## CI/CD Pipeline

### GitHub Actions Workflow

File: `.github/workflows/ci-cd.yml`

### Pipeline Stages

1. **Build & Type Check**
   - Install dependencies
   - TypeScript compilation
   - ESLint checks
   - Next.js build

2. **Cypress E2E Tests**
   - Run all Cypress tests
   - Upload screenshots on failure

3. **Lighthouse CI**
   - Performance audits
   - Accessibility audits
   - SEO checks

4. **Accessibility Tests**
   - axe-core automated tests

5. **Deploy**
   - Production deploy (main branch)
   - Preview deploy (pull requests)

### Required Secrets

Set these in GitHub repository settings:

```env
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
LHCI_GITHUB_APP_TOKEN=xxx (optional)
```

### Branch Protection Rules

**Main Branch:**
- Require status checks to pass
- Require review before merging
- Require linear history

**Checks Required:**
- Build and Test
- Cypress Tests
- Lighthouse Audit
- Accessibility Audit

---

## Performance Optimization

### Implemented Optimizations

1. **Image Optimization**
   - next/image for automatic optimization
   - WebP format with fallbacks
   - Lazy loading for below-fold images
   - Responsive images with srcset

2. **Script Optimization**
   - Lazy loading for heavy components
   - Dynamic imports for code splitting
   - Tree-shaking unused code

3. **CSS Optimization**
   - Tailwind CSS purging
   - Critical CSS inlined
   - Font loading optimization

4. **Lazy-Loaded Components**
   - Before/After Slider
   - Cookie Banner
   - Feedback Widget
   - Chat Widget

### Usage Example

```tsx
import { LazyBeforeAfterSlider } from '@/components/LazyLoad'

// Component will be loaded only when needed
<LazyBeforeAfterSlider items={items} />
```

---

## Analytics Testing

### Google Tag Manager (GTM)

**GTM Container ID:** Set via `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`

### Events Tracked

1. **Page Views** - Automatic
2. **Form Submissions** - Quote, Contact, Careers
3. **CTA Clicks** - "Get a Quote", "Call Now"
4. **Scroll Depth** - 25%, 50%, 75%, 100%
5. **Outbound Links** - External link clicks
6. **Phone Clicks** - tel: link clicks
7. **Email Clicks** - mailto: link clicks

### Testing Analytics

**In Browser Console:**
```javascript
// Check if dataLayer exists
window.dataLayer

// Track test event
dataLayer.push({
  event: 'test_event',
  category: 'test',
  action: 'manual_test'
})
```

**In GTM Preview Mode:**
1. Open GTM container
2. Click "Preview"
3. Enter site URL
4. Test events in real-time

---

## Manual Testing Checklist

### Before Each Release

- [ ] All Cypress tests pass
- [ ] Lighthouse scores ≥ 90
- [ ] No console errors on any page
- [ ] Forms submit successfully
- [ ] Dark mode works correctly
- [ ] Mobile responsive on all pages
- [ ] No horizontal scroll on mobile
- [ ] All images load correctly
- [ ] All links work (no 404s)
- [ ] GTM events fire correctly

### Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Checklist

- [ ] FCP < 2s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3.5s
- [ ] Bundle size optimized

---

## Troubleshooting

### Cypress Tests Failing

1. Clear cache: `npm run cypress:cache:clear`
2. Reinstall: `npm ci`
3. Check baseUrl in `cypress.config.ts`

### Lighthouse Scores Low

1. Run in incognito mode
2. Disable browser extensions
3. Test on stable network
4. Check for console errors

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm ci`
3. Check TypeScript errors: `npm run type-check`

---

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Contact

For questions about testing or QA, contact the development team.
