import { test, expect } from '@playwright/test'

const marketingRoutes = [
  { path: '/', hero: /Professional Commercial Cleaning You Can Count On/i },
  { path: '/about', hero: /About Anderson Cleaning Company/i },
  { path: '/services/office-cleaning', hero: /Professional Office Cleaning Services/i },
  { path: '/contact', hero: /Get in Touch/i },
  { path: '/quote', hero: /Get Your Free Quote/i },
]

test.describe('Marketing pages render key content', () => {
  for (const route of marketingRoutes) {
    test(`renders ${route.path}`, async ({ page }) => {
      await page.goto(route.path)
      // Verify the main heading is present and visible
      await expect(page.getByRole('heading', { level: 1, name: route.hero })).toBeVisible()
      // Verify page loaded successfully (check for body)
      await expect(page.locator('body')).toBeVisible()
    })
  }
})

test('header navigation is functional', async ({ page, isMobile }) => {
  await page.goto('/')
  // Check header exists
  await expect(page.locator('header')).toBeVisible()

  if (isMobile) {
    // On mobile, check for mobile menu button instead
    await expect(page.getByRole('button', { name: /open main menu/i })).toBeVisible()
  } else {
    // On desktop, check key nav links exist
    await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible()
  }
})

test('quote form renders and accepts input', async ({ page }) => {
  await page.goto('/quote')

  // Verify form fields are present
  await expect(page.getByLabel(/Full Name/i)).toBeVisible()
  await expect(page.getByLabel(/Company Name/i)).toBeVisible()
  await expect(page.getByLabel(/Email Address/i)).toBeVisible()
  await expect(page.getByLabel(/Phone Number/i)).toBeVisible()

  // Fill out the form
  await page.getByLabel(/Full Name/i).fill('Test User')
  await page.getByLabel(/Company Name/i).fill('Test Company')
  await page.getByLabel(/Email Address/i).fill('test@example.com')
  await page.getByLabel(/Phone Number/i).fill('(413) 555-0100')

  // Verify submit button is present (QuoteFormSimplified uses "Get My Custom Quote")
  await expect(page.getByRole('button', { name: /Get My Custom Quote/i })).toBeVisible()
})
