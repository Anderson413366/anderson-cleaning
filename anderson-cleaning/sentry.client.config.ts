/**
 * Sentry Client Configuration
 *
 * Configures error tracking for the browser/client-side.
 * This runs in the user's browser and captures client-side errors.
 *
 * Features:
 * - Environment-driven sample rates
 * - Release tagging with git commit SHA
 * - Session replay for debugging
 * - PII scrubbing for privacy compliance
 *
 * Note: Client-side Sentry must use NEXT_PUBLIC_SENTRY_DSN
 * to be accessible in the browser bundle.
 */

import * as Sentry from '@sentry/nextjs'
import { scrubPII } from './lib/sentry/pii-scrubber'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    // Sentry DSN (must be public for client-side)
    dsn: SENTRY_DSN,

    // Environment - Use Vercel env or fallback to NODE_ENV
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development',

    // Release tagging with git commit SHA
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
      ? `anderson-cleaning@${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA.substring(0, 7)}`
      : undefined,

    // Dynamic tracing sample rate from environment
    tracesSampleRate: process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE
      ? parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE)
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 0.1 // 10% in production
        : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
          ? 0.5 // 50% in preview
          : 1.0, // 100% in dev

    // Replay Sessions - helpful for debugging UX issues
    // Lower in production to reduce bandwidth and costs
    replaysSessionSampleRate: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 0.01 : 0.1,
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Integrations
    integrations: [
      // Browser tracing for performance monitoring
      // Replay for session recording (if available)
    ],

    // Before sending events, scrub PII
    beforeSend(event, hint) {
      // Scrub all PII before sending to Sentry
      const scrubbedEvent = scrubPII(event, hint)

      // Filter out non-error exceptions in development
      if (process.env.NODE_ENV === 'development') {
        const error = hint?.originalException
        if (error instanceof Error) {
          // Don't send hydration errors in dev
          if (error.message.includes('Hydration')) {
            return null
          }
          // Don't send Next.js dev errors
          if (error.message.includes('Fast Refresh')) {
            return null
          }
        }
      }

      return scrubbedEvent
    },

    // Ignore certain errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension://',
      'moz-extension://',

      // Network errors (user-caused, not bugs)
      'Network request failed',
      'Failed to fetch',
      'NetworkError',
      'Load failed',

      // ResizeObserver loop errors (benign)
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',

      // AbortController errors (user navigated away)
      'AbortError',
      'The operation was aborted',

      // Safari-specific
      'Non-Error promise rejection captured',

      // Next.js client-side navigation errors
      'ChunkLoadError',
      'Loading chunk',
    ],

    // Deny URLs from being captured
    denyUrls: [
      // Browser extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
      // Ad blockers
      /googlesyndication\.com/i,
      /doubleclick\.net/i,
    ],

    // Max breadcrumbs to keep (reduce memory usage)
    maxBreadcrumbs: 50,

    // Attach stack traces to messages
    attachStacktrace: true,
  })
}
