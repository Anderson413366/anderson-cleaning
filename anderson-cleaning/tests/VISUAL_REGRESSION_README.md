# Visual Regression Testing

This directory contains visual regression tests using Playwright's built-in screenshot comparison features.

## Overview

Visual regression tests automatically detect unintended visual changes by comparing screenshots of pages and components against baseline images. Any pixel differences trigger test failures.

## Test Coverage

### Pages Tested:
- Homepage
- About Page
- Services Page
- Contact Page
- Apply Page
- Quote Page
- Industries Page
- Testimonials Page
- Blog Page
- FAQ Page
- Privacy Policy Page
- Terms of Service Page

### Viewports:
- **Desktop:** 1280x720 (default Chromium viewport)
- **Mobile:** 375x667 (iPhone SE size)

### Browsers:
- Chromium
- Firefox
- WebKit (Safari)
- Mobile Chrome
- Mobile Safari

### Components Tested:
- Header component
- Footer component
- Cookie banner
- Service cards
- Mobile navigation menu

### Additional Tests:
- Dark mode variations
- Component-level snapshots

## Usage

### First Time Setup (Generate Baseline Snapshots)

```bash
# Generate baseline snapshots for all browsers
npm run test:visual:update

# Or generate for specific browser only
npx playwright test visual-regression --project=chromium --update-snapshots
```

### Running Visual Regression Tests

```bash
# Run all visual regression tests
npm run test:visual

# Run with UI mode for interactive debugging
npm run test:visual:ui

# Run in headed mode (see browser)
npm run test:headed visual-regression

# Run for specific browser
npx playwright test visual-regression --project=firefox

# Run specific test
npx playwright test visual-regression -g "Homepage"
```

### Updating Snapshots

When you intentionally change the UI, update the baseline snapshots:

```bash
# Update all snapshots
npm run test:visual:update

# Update only failed snapshots
npx playwright test visual-regression --update-snapshots --only-changed

# Update snapshots for specific browser
npx playwright test visual-regression --project=webkit --update-snapshots
```

### Viewing Test Reports

```bash
# Show latest test report
npm run test:report

# Test report automatically opens after failed test run
```

## Snapshot Storage

Snapshots are stored in:
```
tests/
└── e2e/
    └── visual-regression.spec.ts-snapshots/
        ├── chromium/
        ├── firefox/
        ├── webkit/
        ├── Mobile-Chrome/
        └── Mobile-Safari/
```

## CI/CD Integration

In CI pipelines:

```yaml
# Example GitHub Actions
- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Visual Regression Tests
  run: npm run test:visual

- name: Upload Test Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Best Practices

### 1. Disable Animations
Tests automatically disable animations for consistent screenshots:
```typescript
await page.addStyleTag({
  content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  `,
})
```

### 2. Wait for Content
Always wait for dynamic content:
```typescript
await page.waitForLoadState('networkidle')
```

### 3. Handle Dynamic Content
For pages with timestamps, random data, or user-specific content:
```typescript
// Mask dynamic elements
await expect(page).toHaveScreenshot({
  mask: [page.locator('.timestamp')],
})
```

### 4. Threshold Configuration
For minor acceptable differences:
```typescript
await expect(page).toHaveScreenshot({
  maxDiffPixels: 100, // Allow 100 pixel differences
  // OR
  threshold: 0.2, // Allow 20% difference
})
```

## Troubleshooting

### Tests Failing Unexpectedly

1. **Font Rendering Differences**
   - Use system fonts or ensure fonts load before screenshot
   - May need to adjust threshold for cross-platform testing

2. **Image Loading Issues**
   - Ensure `waitForLoadState('networkidle')` is called
   - Check that images have loaded before screenshot

3. **Animation/Transition Issues**
   - Verify animation-disabling style is applied
   - Add extra wait time if needed: `await page.waitForTimeout(500)`

4. **Dynamic Content**
   - Mask elements with timestamps, random IDs, or user data
   - Use stable test data

### Viewing Differences

When tests fail, Playwright generates:
- **Actual screenshot:** What the page looks like now
- **Expected screenshot:** The baseline
- **Diff image:** Highlights pixel differences

View these in the test report:
```bash
npm run test:report
```

## Snapshot Maintenance

### When to Update Snapshots

✅ **DO update when:**
- Intentional UI/UX changes
- Design system updates
- New features that change layout
- Bug fixes that affect appearance

❌ **DON'T update when:**
- Tests are failing (investigate first!)
- CI/CD is red (fix the issue, don't update blindly)
- You don't understand why visuals changed

### Review Process

1. Run tests locally first
2. Review diff images carefully
3. Verify changes are intentional
4. Update snapshots
5. Commit updated snapshots with clear message
6. Include before/after screenshots in PR

## Performance Tips

Visual regression tests are slower than functional tests. Optimize by:

1. **Run in Parallel** (default behavior)
   - Tests run across multiple workers
   - Each browser runs concurrently

2. **Run Subset in Development**
   ```bash
   # Test only critical pages during development
   npx playwright test visual-regression -g "Homepage|Contact"
   ```

3. **Skip on Every Commit**
   - Run visual tests before PR/merge only
   - Use functional tests for rapid feedback

4. **Use Chromium for Development**
   ```bash
   npx playwright test visual-regression --project=chromium
   ```
   - Run full suite (all browsers) in CI only

## Integration with Existing Tests

Visual regression tests complement existing E2E tests:
- **E2E tests:** Test functionality, interactions, workflows
- **Visual tests:** Catch unintended UI changes, layout shifts

Both are important for comprehensive testing!
