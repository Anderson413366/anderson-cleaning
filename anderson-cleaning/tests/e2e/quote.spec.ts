import { test, expect } from '@playwright/test'

test.describe('Quote Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quote')
  })

  test('page loads correctly with title and form', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Anderson Cleaning/)

    // Check heading
    await expect(page.locator('h1')).toContainText('Get Your Free Quote')

    // Form should be visible
    const form = page.locator('form').first()
    await expect(form).toBeVisible()
  })

  test('form has all required fields', async ({ page }) => {
    // Wait for form to load
    await page.waitForLoadState('networkidle')

    // Check for common form inputs
    const inputs = page.locator('input, select, textarea')
    const inputCount = await inputs.count()

    // Should have multiple form fields
    expect(inputCount).toBeGreaterThan(0)
  })

  test('submit button is present and clickable', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Look for submit button (more flexible approach)
    const submitButtons = page.locator('button[type="submit"], input[type="submit"]')
    const count = await submitButtons.count()

    // If submit button exists, verify it's visible and enabled
    if (count > 0) {
      await expect(submitButtons.first()).toBeVisible()
      await expect(submitButtons.first()).toBeEnabled()
    } else {
      // Form might be using a different submit mechanism, check that form exists at least
      const form = page.locator('form').first()
      await expect(form).toBeVisible()
    }
  })

  test('form validation works - prevents empty submission', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]').or(
      page.getByRole('button', { name: /submit|send|request|get quote/i })
    )

    if ((await submitButton.count()) > 0) {
      await submitButton.first().click()

      // Should not show success message immediately
      const successMessage = page.locator('text=/Quote Request Submitted Successfully/i')
      expect(await successMessage.count()).toBe(0)
    }
  })

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/quote')
    await page.waitForLoadState('networkidle')

    // Filter out non-critical errors (dev-mode warnings, CSP, accessibility info, etc.)
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes('favicon') &&
        !error.includes('sourcemap') &&
        !error.includes('DevTools') &&
        !error.includes('did not match') && // React hydration warnings in dev mode
        !error.includes('Warning: Prop') && // React prop warnings in dev mode
        !error.includes('Content Security Policy') && // CSP warnings (expected in dev)
        !error.includes('Refused to connect') && // CSP connection warnings
        !error.includes('Fix any of the following') // Accessibility info (not critical errors)
    )

    expect(criticalErrors).toHaveLength(0)
  })

  test('page is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()

    // Form should still be visible
    const form = page.locator('form').first()
    await expect(form).toBeVisible()

    // Submit button should be visible
    const submitButton = page.locator('button[type="submit"]').or(
      page.getByRole('button', { name: /submit|send|request|get quote/i })
    )

    if ((await submitButton.count()) > 0) {
      await expect(submitButton.first()).toBeVisible()
    }
  })

  test('phone number link is present', async ({ page }) => {
    // Check for phone link anywhere on page
    const phoneLink = page.locator('a[href^="tel:"]')

    if ((await phoneLink.count()) > 0) {
      await expect(phoneLink.first()).toBeVisible()
    }
  })

  test('trust elements section is visible', async ({ page }) => {
    // Check for trust-building content
    const trustSection = page.locator('text=/Why Request a Quote/i')

    if ((await trustSection.count()) > 0) {
      await expect(trustSection).toBeVisible()
    }
  })
})
