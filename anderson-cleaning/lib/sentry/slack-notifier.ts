/**
 * Slack Alert Notifier for Sentry
 *
 * Sends Slack notifications for critical Sentry errors.
 * Only triggers for new issue groups above "error" severity.
 */

import type { Event, EventHint } from '@sentry/types'

/**
 * Slack webhook URL from environment
 */
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

/**
 * Minimum severity level for Slack alerts
 * Levels: debug, info, warning, error, fatal
 */
const MIN_SEVERITY = 'error'

/**
 * Cache to track already notified errors (prevent duplicates in same session)
 * In production, this would be backed by Redis/DB
 */
const notifiedErrors = new Set<string>()

/**
 * Get error fingerprint for deduplication
 */
function getErrorFingerprint(event: Event): string {
  // Use Sentry's fingerprint if available
  if (event.fingerprint && event.fingerprint.length > 0) {
    return event.fingerprint.join(':')
  }

  // Fallback: Create fingerprint from exception
  if (event.exception?.values?.[0]) {
    const exception = event.exception.values[0]
    return `${exception.type}:${exception.value?.substring(0, 100)}`
  }

  // Fallback: Use message
  if (event.message) {
    return `message:${event.message.substring(0, 100)}`
  }

  // Random fallback to prevent deduplication
  return `unknown:${Date.now()}`
}

/**
 * Check if error severity is high enough for alerting
 */
function shouldAlert(event: Event): boolean {
  const level = event.level || 'error'

  const severityOrder = ['debug', 'info', 'warning', 'error', 'fatal']
  const minIndex = severityOrder.indexOf(MIN_SEVERITY)
  const eventIndex = severityOrder.indexOf(level)

  return eventIndex >= minIndex
}

/**
 * Format Sentry event as Slack message
 */
function formatSlackMessage(event: Event): object {
  const environment = event.environment || 'unknown'
  const release = event.release || 'unknown'
  const level = event.level || 'error'

  // Extract error details
  const errorType = event.exception?.values?.[0]?.type || 'Error'
  const errorMessage = event.exception?.values?.[0]?.value || event.message || 'Unknown error'

  // Extract context
  const url = event.request?.url || 'N/A'
  const user = event.user?.id || event.user?.email || 'Anonymous'

  // Build Slack message with blocks
  return {
    text: `🚨 New ${level.toUpperCase()} in ${environment}`, // Fallback text
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🚨 ${errorType}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Error:* ${errorMessage}`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Environment:*\n${environment}`,
          },
          {
            type: 'mrkdwn',
            text: `*Level:*\n${level}`,
          },
          {
            type: 'mrkdwn',
            text: `*Release:*\n${release}`,
          },
          {
            type: 'mrkdwn',
            text: `*User:*\n${user}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*URL:* ${url}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Event ID: \`${event.event_id}\``,
          },
        ],
      },
    ],
  }
}

/**
 * Send notification to Slack
 */
async function sendToSlack(message: object): Promise<void> {
  if (!SLACK_WEBHOOK_URL) {
    console.warn('[Sentry Slack] No webhook URL configured, skipping notification')
    return
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      console.error('[Sentry Slack] Failed to send notification:', response.statusText)
    } else {
      console.log('[Sentry Slack] Notification sent successfully')
    }
  } catch (error) {
    console.error('[Sentry Slack] Error sending notification:', error)
  }
}

/**
 * Notify Slack about a Sentry error
 *
 * Call this from the Sentry beforeSend hook:
 *
 * @example
 * beforeSend(event, hint) {
 *   notifySlack(event, hint)
 *   return event
 * }
 */
export async function notifySlack(event: Event, hint?: EventHint): Promise<void> {
  // Skip if webhook not configured
  if (!SLACK_WEBHOOK_URL) {
    return
  }

  // Skip if severity too low
  if (!shouldAlert(event)) {
    return
  }

  // Get error fingerprint for deduplication
  const fingerprint = getErrorFingerprint(event)

  // Skip if already notified in this session
  if (notifiedErrors.has(fingerprint)) {
    return
  }

  // Mark as notified
  notifiedErrors.add(fingerprint)

  // Format and send message
  const message = formatSlackMessage(event)
  await sendToSlack(message)
}

/**
 * Clear notification cache (for testing)
 */
export function clearNotificationCache(): void {
  notifiedErrors.clear()
}

/**
 * Export for testing
 */
export const _internal = {
  shouldAlert,
  getErrorFingerprint,
  formatSlackMessage,
}
