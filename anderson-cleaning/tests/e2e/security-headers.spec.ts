import { test, expect } from '@playwright/test'

/**
 * Security Headers Tests
 *
 * Verifies that all required security headers are present,
 * including CSP with nonce, HSTS, and other security headers.
 */

test.describe('Security Headers', () => {
  test('should have HSTS header in production-like environment', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()

    // Note: HSTS is only set in production (not in dev)
    // This test will pass if either HSTS is present OR we're in dev mode
    if (process.env.NODE_ENV === 'production') {
      expect(headers['strict-transport-security']).toContain('max-age=31536000')
      expect(headers['strict-transport-security']).toContain('includeSubDomains')
    }
  })

  test('should have Content-Security-Policy header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const csp = headers['content-security-policy']

    expect(csp, 'CSP header should be present').toBeDefined()
    expect(csp, 'CSP header should not be empty').not.toBe('')

    // Verify key CSP directives are present
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("script-src")
    expect(csp).toContain("'nonce-") // Should have nonce for scripts
    expect(csp).toContain("style-src")
    expect(csp).toContain("img-src")
    expect(csp).toContain("connect-src")
  })

  test('should have X-Content-Type-Options header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    expect(headers['x-content-type-options']).toBe('nosniff')
  })

  test('should have Referrer-Policy header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  })

  test('should have Permissions-Policy header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const permissionsPolicy = headers['permissions-policy']

    expect(permissionsPolicy).toBeDefined()
    expect(permissionsPolicy).toContain('camera=()')
    expect(permissionsPolicy).toContain('microphone=()')
    expect(permissionsPolicy).toContain('geolocation=()')
  })

  test('should have X-Frame-Options header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const xFrameOptions = headers['x-frame-options']

    expect(xFrameOptions).toBeDefined()
    // Should be either DENY or SAMEORIGIN depending on the page
    expect(['DENY', 'SAMEORIGIN']).toContain(xFrameOptions)
  })

  test('should have X-XSS-Protection header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    expect(headers['x-xss-protection']).toBe('1; mode=block')
  })

  test('should have rate limit headers', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()

    // Verify rate limit headers are present
    expect(headers['x-ratelimit-limit']).toBeDefined()
    expect(headers['x-ratelimit-remaining']).toBeDefined()
    expect(headers['x-ratelimit-reset']).toBeDefined()

    // Verify values are numbers
    expect(Number(headers['x-ratelimit-limit'])).toBeGreaterThan(0)
    expect(Number(headers['x-ratelimit-remaining'])).toBeGreaterThanOrEqual(0)
    expect(Number(headers['x-ratelimit-reset'])).toBeGreaterThan(0)
  })

  test('CSP should allow necessary third-party sources', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const csp = headers['content-security-policy']

    // Verify GTM is allowed
    expect(csp).toContain('https://www.googletagmanager.com')
    expect(csp).toContain('https://www.google-analytics.com')

    // Verify Sanity CDN is allowed
    expect(csp).toContain('https://cdn.sanity.io')
  })

  test('CSP should use nonce for inline scripts', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const csp = headers['content-security-policy']

    // Extract nonce from CSP header
    const nonceMatch = csp.match(/'nonce-([^']+)'/)
    expect(nonceMatch, 'CSP should contain a nonce').not.toBeNull()

    const nonce = nonceMatch![1]

    // Verify nonce is not empty and is base64-like
    expect(nonce.length).toBeGreaterThan(0)

    // Check that inline script tags in the page use this nonce
    const scriptTags = await page.locator('script[nonce]').count()
    if (scriptTags > 0) {
      const firstScriptNonce = await page.locator('script[nonce]').first().getAttribute('nonce')
      expect(firstScriptNonce).toBe(nonce)
    }
  })

  test('should not have X-Powered-By header (security best practice)', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()

    // X-Powered-By should not be present (leaks technology stack info)
    expect(headers['x-powered-by']).toBeUndefined()
  })

  test('should allow legitimate scripts to load', async ({ page }) => {
    // Track script load errors
    const scriptErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('Content Security Policy')) {
        scriptErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have no CSP errors for legitimate scripts
    expect(scriptErrors.length, `CSP should not block legitimate scripts: ${scriptErrors.join(', ')}`).toBe(0)
  })
})

test.describe('HTTPS Enforcement', () => {
  test('should upgrade insecure requests in CSP', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const csp = headers['content-security-policy']

    expect(csp).toContain('upgrade-insecure-requests')
  })
})
