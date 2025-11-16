# Anderson Cleaning Production Source Notes

This repo now contains only the `anderson-cleaning/` Next.js application that powers the live Vercel deployment plus the documentation that supports it.

## Why `anderson-cleaning/` is the production app
- `package.json` defines the expected Next.js 14 workflow (dev/build/start), QA tooling (lint, `tsc --noEmit`, Playwright visual suites), and link/i18n audit scripts that the current Vercel project runs before shipping.
- `README.md` already documents the site map, content focus, and App Router structure (marketing pages, CMS-powered studio, APIs, careers flows), matching what is in production today.

## Deployment & parity with Vercel
- `anderson-cleaning/DEPLOYMENT.md` is the authoritative release checklist (env setup, Sanity dataset population, analytics/Sentry/CRM provisioning) that mirrors the production pipeline.
- `anderson-cleaning/docs/BEGINNER_DEPLOY_INSTRUCTIONS.md` keeps the beginner-friendly Netlify/Vercel walkthroughs in the same tree as the production code, while `anderson-cleaning/docs/VISUAL_GUIDE.md` preserves the stakeholder design reference.
- `anderson-cleaning/vercel.old.json` captures the build/install commands plus the security headers, caching policy, and redirects/rewrites used in Vercel. Keep it around when re-linking the project so parity checks are easy.

## Environment variables & external services
- `.env.example` lists every required integration: public site metadata, multi-locale config, GA4/Clarity, HubSpot, Resend, Sanity CMS, CAPTCHA (reCAPTCHA or Turnstile), Sentry, Studio auth/ip-allow list, Google site verification, Gemini-powered careers AI, and NODE_ENV. Copy it to `.env.local` before running builds.

These notes explain why the `anderson-cleaning/` folder remains the single source of truth for this project.
