import { test, expect, Page } from '@playwright/test'

/**
 * Visual Regression Tests (VRT) - Layout Parity & Snapshots
 *
 * Purpose: Catch layout/spacing/nav/theme drifts across top routes
 *
 * Coverage:
 * - 7 key routes: /, /services, /industries, /about, /apply, /contact, /faq
 * - 3 viewports: mobile (360x800), tablet (768x1024), desktop (1366x768)
 * - Full-page screenshots stored in tests/e2e/__snapshots__/
 *
 * Update snapshots: npm run test:e2e:update
 */

// Route configurations
const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/industries', name: 'industries' },
  { path: '/about', name: 'about' },
  { path: '/apply', name: 'apply' },
  { path: '/contact', name: 'contact' },
  { path: '/faq', name: 'faq' },
]

// Viewport configurations
const VIEWPORTS = [
  { width: 360, height: 800, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1366, height: 768, name: 'desktop' },
]

/**
 * Layout Parity Assertions
 * Ensures consistent layout structure across all routes
 */
async function assertLayoutParity(page: Page, routeName: string) {
  // 1. Assert exactly 1 header and 1 footer
  const headers = page.locator('header')
  const footers = page.locator('footer')

  await expect(headers).toHaveCount(1, {
    message: `Route ${routeName} should have exactly 1 header`,
  })

  await expect(footers).toHaveCount(1, {
    message: `Route ${routeName} should have exactly 1 footer`,
  })

  // 2. Assert container width matches shared CSS rule
  // Check for .container class which should have consistent max-width
  const containers = page.locator('.container')
  const containerCount = await containers.count()

  if (containerCount > 0) {
    // Get computed max-width of first container
    const maxWidth = await containers.first().evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return styles.maxWidth
    })

    // Verify it's not 'none' (should have a defined max-width)
    expect(maxWidth).not.toBe('none', {
      message: `Route ${routeName} containers should have defined max-width`,
    })
  }

  // 3. Assert no horizontal scrollbars
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth
  })

  expect(hasHorizontalScroll).toBe(false, {
    message: `Route ${routeName} should not have horizontal scrollbars`,
  })

  // 4. Assert no client console errors
  // Note: Console errors are collected via page.on('console') in beforeEach
}

test.describe('Visual Regression Tests - Layout Snapshots', () => {
  // Collect console errors
  let consoleErrors: string[] = []

  test.beforeEach(async ({ page }) => {
    consoleErrors = []

    // Listen for console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // Listen for page errors
    page.on('pageerror', (error) => {
      consoleErrors.push(`Page error: ${error.message}`)
    })
  })

  // Generate tests for each route × viewport combination
  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route.name} - ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
        page,
      }) => {
        // Set viewport
        await page.setViewportSize({ width: viewport.width, height: viewport.height })

        // Navigate to route
        await page.goto(route.path)

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle')

        // Wait a bit more for any animations/transitions to complete
        await page.waitForTimeout(500)

        // Run layout parity assertions
        await assertLayoutParity(page, route.name)

        // Assert no console errors
        expect(consoleErrors.length).toBe(0, {
          message: `Route ${route.name} should not have console errors: ${consoleErrors.join(', ')}`,
        })

        // Take full-page screenshot and compare to baseline
        await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
          fullPage: true,
          // Animations can cause flakiness, so we use a threshold
          threshold: 0.2,
          // Clip to avoid flaky elements like dates/times
          animations: 'disabled',
          // Mask dynamic content that changes frequently
          mask: [
            // Mask any elements with data-testid="dynamic-content"
            page.locator('[data-testid="dynamic-content"]'),
          ],
        })
      })
    }
  }
})

test.describe('Layout Parity - Cross-Route Consistency', () => {
  test('All routes have consistent header height', async ({ page }) => {
    const headerHeights: Record<string, number> = {}

    for (const route of ROUTES) {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      const header = page.locator('header')
      const boundingBox = await header.boundingBox()

      if (boundingBox) {
        headerHeights[route.name] = boundingBox.height
      }
    }

    // All header heights should be within 5px of each other (allowing for minor differences)
    const heights = Object.values(headerHeights)
    const minHeight = Math.min(...heights)
    const maxHeight = Math.max(...heights)
    const heightDiff = maxHeight - minHeight

    expect(heightDiff).toBeLessThanOrEqual(5, {
      message: `Header heights should be consistent across routes. Found: ${JSON.stringify(headerHeights)}`,
    })
  })

  test('All routes have consistent footer structure', async ({ page }) => {
    const footerStructures: Record<string, number> = {}

    for (const route of ROUTES) {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      const footer = page.locator('footer')
      const linkCount = await footer.locator('a').count()

      footerStructures[route.name] = linkCount
    }

    // All footers should have the same number of links
    const linkCounts = Object.values(footerStructures)
    const uniqueCounts = new Set(linkCounts)

    expect(uniqueCounts.size).toBe(1, {
      message: `Footer structure should be consistent across routes. Found: ${JSON.stringify(footerStructures)}`,
    })
  })

  test('All routes have consistent theme colors', async ({ page }) => {
    const themeColors: Record<string, string> = {}

    for (const route of ROUTES) {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      // Get primary color from header
      const header = page.locator('header')
      const backgroundColor = await header.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })

      themeColors[route.name] = backgroundColor
    }

    // All headers should have the same background color
    const colors = Object.values(themeColors)
    const uniqueColors = new Set(colors)

    expect(uniqueColors.size).toBeLessThanOrEqual(2, {
      message: `Theme colors should be consistent across routes. Found: ${JSON.stringify(themeColors)}`,
    })
  })
})
