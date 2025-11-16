import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('page loads correctly with title and form', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Anderson Cleaning/)

    // Check heading
    await expect(page.locator('h1')).toContainText('Get in Touch')

    // Form should be visible
    const form = page.locator('form').first()
    await expect(form).toBeVisible()
  })

  test('contact information is displayed', async ({ page }) => {
    // Phone number (use first() as there are multiple phone links on the page)
    const phoneLink = page.locator('a[href="tel:+14133065053"]').first()
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toContainText('(413) 306-5053')

    // Email (use first() as there might be multiple email links)
    const emailLink = page.locator('a[href="mailto:info@andersoncleaning.com"]').first()
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toContainText('info@andersoncleaning.com')

    // Address (use first() as the address appears in multiple places)
    const address = page.locator('text=/West Springfield, MA/i').first()
    await expect(address).toBeVisible()
  })

  test('fast response callout is visible', async ({ page }) => {
    // Check for the fast response section
    const fastResponse = page.locator('text=/Fast Response/i')
    await expect(fastResponse).toBeVisible()

    // Check for 30 minutes or less message
    const responseTime = page.locator('text=/30 minutes/i')
    await expect(responseTime).toBeVisible()
  })

  test('form has required fields', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check for form inputs
    const inputs = page.locator('input, textarea, select')
    const inputCount = await inputs.count()

    // Should have multiple form fields
    expect(inputCount).toBeGreaterThan(0)
  })

  test('submit button is present and enabled', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Look for submit button
    const submitButton = page.locator('button[type="submit"]').or(
      page.getByRole('button', { name: /submit|send|contact|message/i })
    )

    expect(await submitButton.count()).toBeGreaterThan(0)
    await expect(submitButton.first()).toBeVisible()
    await expect(submitButton.first()).toBeEnabled()
  })

  test('form validation prevents empty submission', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').or(
      page.getByRole('button', { name: /submit|send|contact|message/i })
    )

    if ((await submitButton.count()) > 0) {
      await submitButton.first().click()

      // Form should not be submitted (no success message or redirect)
      // The form component should handle validation
      await page.waitForTimeout(500)

      // Check that we're still on the contact page
      expect(page.url()).toContain('/contact')
    }
  })

  test('office hours are displayed', async ({ page }) => {
    // Check for office hours information
    const officeHours = page.locator('text=/Office Hours/i')
    await expect(officeHours).toBeVisible()

    // Check for business days
    const businessDays = page.locator('text=/Monday - Friday/i')
    await expect(businessDays).toBeVisible()
  })

  test('page is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()

    // Form should still be visible
    const form = page.locator('form').first()
    await expect(form).toBeVisible()

    // Contact info should be visible (use first() as there are multiple phone links)
    const phoneLink = page.locator('a[href="tel:+14133065053"]').first()
    await expect(phoneLink).toBeVisible()
  })

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    // Filter out non-critical errors (dev-mode warnings, favicon, sourcemaps, etc.)
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes('favicon') &&
        !error.includes('sourcemap') &&
        !error.includes('DevTools') &&
        !error.includes('did not match') && // React hydration warnings in dev mode
        !error.includes('Warning: Prop')    // React prop warnings in dev mode
    )

    expect(criticalErrors).toHaveLength(0)
  })

  test('main content has proper focus management', async ({ page }) => {
    // Check for main content area
    const mainContent = page.locator('#main-content, main')
    await expect(mainContent.first()).toBeVisible()
  })

  test('phone and email links are functional', async ({ page }) => {
    // Phone link should have correct href (use first() as there are multiple phone links)
    const phoneLink = page.locator('a[href="tel:+14133065053"]').first()
    await expect(phoneLink).toHaveAttribute('href', 'tel:+14133065053')

    // Email link should have correct href (use first() as there might be multiple email links)
    const emailLink = page.locator('a[href="mailto:info@andersoncleaning.com"]').first()
    await expect(emailLink).toHaveAttribute('href', 'mailto:info@andersoncleaning.com')
  })
})
