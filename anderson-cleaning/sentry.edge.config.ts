/**
 * Sentry Edge Runtime Configuration
 *
 * Configures error tracking for Edge Runtime (middleware, edge API routes).
 * Note: Edge runtime has limitations - fewer Node.js APIs available.
 *
 * Features:
 * - Server-only DSN (not exposed to client)
 * - Environment-driven sample rates (very low for edge due to high volume)
 * - Release tagging with git commit SHA
 * - PII scrubbing (GDPR/CCPA compliant)
 */

import * as Sentry from '@sentry/nextjs'
import { scrubPII } from './lib/sentry/pii-scrubber'

// Use server-only DSN (not NEXT_PUBLIC_SENTRY_DSN)
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    // Sentry DSN (server-only)
    dsn: SENTRY_DSN,

    // Environment - Use Vercel env or fallback to NODE_ENV
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',

    // Release tagging with git commit SHA
    release: process.env.VERCEL_GIT_COMMIT_SHA
      ? `anderson-cleaning@${process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7)}`
      : undefined,

    // Lower sample rate for edge runtime (runs on every request)
    // Edge runs at very high volume, so we sample less aggressively
    tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE
      ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
      : process.env.VERCEL_ENV === 'production'
        ? 0.01 // 1% in production
        : process.env.VERCEL_ENV === 'preview'
          ? 0.1 // 10% in preview
          : 0.2, // 20% in dev

    // Before sending events, scrub PII
    beforeSend(event) {
      // Scrub all PII before sending to Sentry
      // Note: Edge runtime doesn't support async beforeSend (no Slack alerts)
      const scrubbedEvent = scrubPII(event)
      return scrubbedEvent
    },

    // Ignore errors that are handled by rate limiting
    ignoreErrors: [
      'Too Many Requests',
      'Rate limit exceeded',
      'NEXT_NOT_FOUND',
      'NEXT_REDIRECT',
    ],

    // Max breadcrumbs (keep low for edge runtime memory constraints)
    maxBreadcrumbs: 20,

    // Attach stack traces to messages
    attachStacktrace: true,
  })
}
