/**
 * Sentry Server Configuration
 *
 * Configures error tracking for the server-side (Node.js).
 * This captures errors in API routes, SSR, and server components.
 *
 * Features:
 * - Server-only DSN (not exposed to client)
 * - Environment-driven sample rates
 * - Release tagging with git commit SHA
 * - Comprehensive PII scrubbing (GDPR/CCPA compliant)
 * - Slack notifications for critical errors
 */

import * as Sentry from '@sentry/nextjs'
import { scrubPII } from './lib/sentry/pii-scrubber'
import { notifySlack } from './lib/sentry/slack-notifier'

// Use server-only DSN (not NEXT_PUBLIC_SENTRY_DSN)
// This prevents the DSN from being exposed in client bundles
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    // Sentry DSN (server-only)
    dsn: SENTRY_DSN,

    // Environment - Use Vercel env or fallback to NODE_ENV
    // VERCEL_ENV provides: production, preview, development
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',

    // Release tagging with git commit SHA
    // This allows tracking errors per deployment
    release: process.env.VERCEL_GIT_COMMIT_SHA
      ? `anderson-cleaning@${process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7)}`
      : undefined,

    // Dynamic tracing sample rate from environment
    // Defaults: production: 0.1 (10%), preview: 0.5 (50%), dev: 1.0 (100%)
    tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE
      ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
      : process.env.VERCEL_ENV === 'production'
        ? 0.1
        : process.env.VERCEL_ENV === 'preview'
          ? 0.5
          : 1.0,

    // Before sending events, scrub PII and send Slack alerts
    beforeSend(event, hint) {
      // 1. Send Slack notification for critical errors
      // This is async but we don't await to avoid blocking error reporting
      notifySlack(event, hint).catch((err) => {
        console.error('[Sentry] Failed to send Slack notification:', err)
      })

      // 2. Scrub all PII before sending to Sentry
      const scrubbedEvent = scrubPII(event, hint)

      // 3. Return scrubbed event (or null to drop it)
      return scrubbedEvent
    },

    // Ignore certain errors
    ignoreErrors: [
      // Database connection errors (handled by retry logic)
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ENOTFOUND',

      // Rate limit errors (expected behavior)
      'Too Many Requests',
      'Rate limit exceeded',

      // Client aborted requests (user navigated away)
      'aborted',
      'ECONNRESET',
      'EPIPE',

      // Next.js expected errors
      'NEXT_NOT_FOUND',
      'NEXT_REDIRECT',
    ],

    // Server-specific integrations
    integrations: [
      // Add custom integrations here if needed
    ],

    // Debug mode for development
    debug: process.env.NODE_ENV === 'development',

    // Max breadcrumbs to keep (reduce memory usage)
    maxBreadcrumbs: 50,

    // Attach stack traces to messages
    attachStacktrace: true,
  })
}
