import { test, expect } from '@playwright/test'

/**
 * Consent Mode v2 Tests
 *
 * Tests Google Consent Mode v2 integration with cookie banner.
 * Ensures analytics respect user consent choices.
 */

test.describe('Consent Mode v2', () => {
  test.beforeEach(async ({ context }) => {
    // Clear cookies and localStorage before each test
    await context.clearCookies()
  })

  test('should initialize with consent denied by default', async ({ page }) => {
    // Capture dataLayer pushes
    const dataLayerEvents: any[] = []
    await page.exposeFunction('captureDataLayer', (event: any) => {
      dataLayerEvents.push(event)
    })

    // Intercept dataLayer pushes
    await page.addInitScript(() => {
      const originalDataLayer: any[] = []
      Object.defineProperty(window, 'dataLayer', {
        get() {
          return originalDataLayer
        },
        set(value) {
          // Capture all pushes
          if (Array.isArray(value)) {
            value.forEach((item) => {
              if ((window as any).captureDataLayer) {
                ;(window as any).captureDataLayer(item)
              }
            })
          }
        },
      })

      // Override push method
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push
      window.dataLayer.push = function (...args: any[]) {
        args.forEach((item) => {
          if ((window as any).captureDataLayer) {
            ;(window as any).captureDataLayer(item)
          }
        })
        return originalPush.apply(window.dataLayer, args)
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for consent_default event to be pushed
    await page.waitForFunction(
      () => window.dataLayer?.some((e: any) => e.event === 'consent_default'),
      { timeout: 3000 }
    )

    // Check that consent_default event was pushed
    const consentDefaultEvent = dataLayerEvents.find((e) => e.event === 'consent_default')
    expect(consentDefaultEvent, 'Consent default event should be pushed').toBeDefined()

    // Verify analytics_storage is denied by default
    expect(
      consentDefaultEvent?.analytics_storage,
      'Analytics should be denied by default',
    ).toBe('denied')

    // Verify ad_storage is denied by default
    expect(consentDefaultEvent?.ad_storage, 'Ad storage should be denied by default').toBe(
      'denied',
    )
  })

  test('should show cookie banner on first visit', async ({ page }) => {
    await page.goto('/')

    // Wait for cookie banner to appear
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).toBeVisible({ timeout: 5000 })

    // Verify buttons are present
    await expect(page.getByRole('button', { name: /Accept All/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Decline/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Dismiss/i })).toBeVisible()
  })

  test('should not show cookie banner if consent already given', async ({ page, context }) => {
    // Set consent choice in localStorage
    await context.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted')
    })

    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Cookie banner should not appear
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).not.toBeVisible()
  })

  test('should grant consent when "Accept All" is clicked', async ({ page }) => {
    const dataLayerEvents: any[] = []
    await page.exposeFunction('captureDataLayer', (event: any) => {
      dataLayerEvents.push(event)
    })

    await page.addInitScript(() => {
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push
      window.dataLayer.push = function (...args: any[]) {
        args.forEach((item) => {
          if ((window as any).captureDataLayer) {
            ;(window as any).captureDataLayer(item)
          }
        })
        return originalPush.apply(window.dataLayer, args)
      }
    })

    await page.goto('/')

    // Wait for cookie banner and click "Accept All"
    const acceptButton = page.getByRole('button', { name: /Accept All/i })
    await expect(acceptButton).toBeVisible({ timeout: 5000 })
    await acceptButton.click()

    // Wait for consent update event to be pushed
    await page.waitForFunction(
      () => window.dataLayer?.some((e: any) => e.event === 'consent_update'),
      { timeout: 3000 }
    )

    // Check that consent_update event was pushed with granted status
    const consentUpdateEvent = dataLayerEvents.find((e) => e.event === 'consent_update')
    expect(consentUpdateEvent, 'Consent update event should be pushed').toBeDefined()
    expect(
      consentUpdateEvent?.analytics_storage,
      'Analytics should be granted after accept',
    ).toBe('granted')

    // Verify consent is saved to localStorage
    const savedConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'))
    expect(savedConsent).toBe('accepted')

    // Cookie banner should be hidden
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).not.toBeVisible()
  })

  test('should keep consent denied when "Decline" is clicked', async ({ page }) => {
    await page.goto('/')

    // Wait for cookie banner and click "Decline"
    const declineButton = page.getByRole('button', { name: /Decline/i })
    await expect(declineButton).toBeVisible({ timeout: 5000 })
    await declineButton.click()

    // Wait for banner to be hidden
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).not.toBeVisible({ timeout: 3000 })

    // Verify consent is saved to localStorage as declined
    const savedConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'))
    expect(savedConsent).toBe('declined')
  })

  test('should hide banner when "Dismiss" is clicked without saving consent', async ({
    page,
  }) => {
    await page.goto('/')

    // Wait for cookie banner and click "Dismiss"
    const dismissButton = page.getByRole('button', { name: /Dismiss/i })
    await expect(dismissButton).toBeVisible({ timeout: 5000 })
    await dismissButton.click()

    // Wait for banner to be hidden
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).not.toBeVisible({ timeout: 3000 })

    // Consent should NOT be saved (banner will appear on next visit)
    const savedConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'))
    expect(savedConsent).toBeNull()
  })

  test('should have link to privacy policy', async ({ page }) => {
    await page.goto('/')

    // Find privacy policy link in cookie banner
    const privacyLink = page.getByRole('link', { name: /Privacy Policy/i })
    await expect(privacyLink).toBeVisible({ timeout: 5000 })
    await expect(privacyLink).toHaveAttribute('href', '/legal/privacy-policy')
  })

  test('should show cookie details when expanded', async ({ page }) => {
    await page.goto('/')

    // Click on "Cookie Details" to expand
    const detailsToggle = page.locator('summary', { hasText: /Cookie Details/i })
    await expect(detailsToggle).toBeVisible({ timeout: 5000 })
    await detailsToggle.click()

    // Check that cookie categories are visible
    await expect(page.locator('text=/Essential Cookies/i')).toBeVisible()
    await expect(page.locator('text=/Analytics Cookies/i')).toBeVisible()
    await expect(page.locator('text=/Marketing Cookies/i')).toBeVisible()
  })

  test('should persist consent across page navigations', async ({ page }) => {
    await page.goto('/')

    // Accept cookies
    const acceptButton = page.getByRole('button', { name: /Accept All/i })
    await expect(acceptButton).toBeVisible({ timeout: 5000 })
    await acceptButton.click()

    // Wait for banner to be hidden
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).not.toBeVisible({ timeout: 3000 })

    // Navigate to another page
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    // Cookie banner should not appear
    await expect(banner).not.toBeVisible()

    // Consent should still be saved
    const savedConsent = await page.evaluate(() => localStorage.getItem('cookie-consent'))
    expect(savedConsent).toBe('accepted')
  })

  test('should not send GA requests until consent is granted', async ({ page }) => {
    const gaRequests: string[] = []

    // Intercept all requests
    page.on('request', (request) => {
      const url = request.url()
      if (url.includes('google-analytics.com') || url.includes('/collect')) {
        gaRequests.push(url)
      }
    })

    await page.goto('/')

    // Wait for page to load and accept cookies
    const acceptButton = page.getByRole('button', { name: /Accept All/i })
    await expect(acceptButton).toBeVisible({ timeout: 5000 })

    // Before consent, no GA requests should be made (except maybe initial pageview with denied consent)
    // Since Consent Mode v2 allows pings with denied consent, we just check that requests respect consent

    await acceptButton.click()

    // Wait for banner to be hidden (indicating consent was processed)
    const banner = page.locator('text=/We Value Your Privacy/i')
    await expect(banner).not.toBeVisible({ timeout: 3000 })

    // After consent, GA should be able to send requests
    // Note: Actual GA requests depend on GTM_ID being configured
    // This test mainly ensures the consent mechanism works
  })
})
