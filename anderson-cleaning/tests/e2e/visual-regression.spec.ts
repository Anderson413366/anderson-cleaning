import { test, expect } from '@playwright/test'

/**
 * Visual Regression Tests
 *
 * Captures screenshots of major pages and components to detect unintended
 * visual changes. Snapshots are stored per browser and viewport.
 *
 * Usage:
 * - First run: npx playwright test visual-regression --update-snapshots
 * - Subsequent runs: npx playwright test visual-regression
 * - Update snapshots: npx playwright test visual-regression --update-snapshots
 */

// Configure snapshot settings
test.use({
  // Disable animations for consistent snapshots
  actionTimeout: 0,
})

test.describe('Visual Regression Tests - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations and transitions for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })
  })

  test('Homepage', async ({ page }) => {
    await page.goto('/')

    // Wait for hero section to load
    await page.waitForSelector('h1', { state: 'visible' })

    // Wait for images to load
    await page.waitForLoadState('networkidle')

    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('About Page', async ({ page }) => {
    await page.goto('/about')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('about.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Services Page', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('services.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Contact Page', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('contact.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Apply Page', async ({ page }) => {
    await page.goto('/apply')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('apply.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Quote Page', async ({ page }) => {
    await page.goto('/quote')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('quote.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Industries Page', async ({ page }) => {
    await page.goto('/industries')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('industries.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Testimonials Page', async ({ page }) => {
    await page.goto('/testimonials')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('testimonials.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Blog Page', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('blog.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('FAQ Page', async ({ page }) => {
    await page.goto('/faq')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('faq.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Privacy Policy Page', async ({ page }) => {
    await page.goto('/legal/privacy')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('privacy-policy.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Terms of Service Page', async ({ page }) => {
    await page.goto('/legal/terms')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('terms.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})

test.describe('Visual Regression Tests - Mobile', () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE size
  })

  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })
  })

  test('Homepage Mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Services Mobile', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('services-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Contact Mobile', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('contact-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Apply Mobile', async ({ page }) => {
    await page.goto('/apply')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('apply-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Mobile Navigation Menu', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /menu/i })
    await menuButton.click()

    // Wait for menu to open
    await page.waitForTimeout(300)

    await expect(page).toHaveScreenshot('mobile-menu-open.png', {
      animations: 'disabled',
    })
  })
})

test.describe('Component Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })
  })

  test('Header Component', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const header = page.locator('header').first()
    await expect(header).toHaveScreenshot('header-component.png', {
      animations: 'disabled',
    })
  })

  test('Footer Component', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const footer = page.locator('footer').first()
    await expect(footer).toHaveScreenshot('footer-component.png', {
      animations: 'disabled',
    })
  })

  test('Cookie Banner', async ({ page, context }) => {
    // Clear cookies to force banner to show
    await context.clearCookies()
    await context.clearPermissions()

    await page.goto('/')

    // Wait for cookie banner to appear
    await page.waitForTimeout(1500) // Cookie banner appears after 1s

    const cookieBanner = page
      .locator('div')
      .filter({ hasText: /we value your privacy/i })
      .first()

    if (await cookieBanner.isVisible()) {
      await expect(cookieBanner).toHaveScreenshot('cookie-banner.png', {
        animations: 'disabled',
      })
    }
  })

  test('Service Card Components', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')

    // Get the services grid/container
    const servicesSection = page
      .locator('section')
      .filter({ has: page.locator('h2') })
      .first()
    await expect(servicesSection).toHaveScreenshot('services-cards.png', {
      animations: 'disabled',
    })
  })
})

test.describe('Dark Mode Visual Regression', () => {
  test.use({
    colorScheme: 'dark',
  })

  test.beforeEach(async ({ page }) => {
    // Disable animations
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    })
  })

  test('Homepage Dark Mode', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Services Dark Mode', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('services-dark.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Contact Dark Mode', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('contact-dark.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})
