# Anderson Cleaning Production Source Notes

This repo is intentionally trimmed down so future maintainers can focus on the `anderson-cleaning/` Next.js application that powers the live Vercel deployment.

> **Note:** The legacy root-level `package.json`, `package-lock.json`, and `node_modules/` have been removed so there is zero ambiguity about where dependencies live. `anderson-cleaning/` is the only package root in this repository.

## Why `anderson-cleaning/` is the production app
- `package.json` defines the expected Next.js 14 workflow (dev/build/start), QA tooling (lint, `tsc --noEmit`, Playwright visual suites), and link/i18n audit scripts that the current Vercel project runs before shipping.
- `README.md` already documents the site map, content focus, and App Router structure (marketing pages, CMS-powered studio, APIs, careers flows), matching what is in production today.

## Deployment & parity with Vercel
- `anderson-cleaning/DEPLOYMENT.md` is the authoritative release checklist (env setup, Sanity dataset population, analytics/Sentry/CRM provisioning) that mirrors the production pipeline.
- `anderson-cleaning/vercel.old.json` captures the build/install commands plus the security headers, caching policy, and redirects/rewrites used in Vercel. Keep it around when re-linking the project so parity checks are easy.
- Beginner-friendly deployment reminders for Netlify/Vercel live at the repo root in `DEPLOY_INSTRUCTIONS.md` if stakeholders need a static export instead.

## Environment variables & external services
- `.env.example` lists every required integration: public site metadata, multi-locale config, GA4/Clarity, HubSpot, Resend, Sanity CMS, CAPTCHA (reCAPTCHA or Turnstile), Sentry, Studio auth/ip-allow list, Google site verification, Gemini-powered careers AI, and NODE_ENV. Copy it to `.env.local` before running builds.

## Assets that still live outside `anderson-cleaning/`
- `website-ready-to-deploy/` contains a static careers microsite (HTML + assets) that was previously dropped onto Netlify; keep it only if you need that standalone marketing handoff.
- `anderson-cleaning-website.tar.gz` is an archived snapshot of the same production build for manual transfers/backups.

These notes explain why only the `anderson-cleaning/` folder is maintained while other artifacts remain for reference during handoffs.
