/**
 * PII Scrubbing Utility for Sentry
 *
 * Removes personally identifiable information (PII) from Sentry events
 * to comply with GDPR, CCPA, and other privacy regulations.
 *
 * This ensures sensitive data like emails, phone numbers, addresses,
 * and authentication tokens are never sent to Sentry servers.
 */

import type { Event, EventHint } from '@sentry/types'

/**
 * PII field patterns to scrub from data
 */
const PII_FIELD_PATTERNS = [
  // Email patterns
  /email/i,
  /e[-_]?mail/i,
  /mail[-_]?address/i,

  // Phone patterns
  /phone/i,
  /tel/i,
  /mobile/i,
  /cell/i,
  /fax/i,

  // Address patterns
  /address/i,
  /street/i,
  /city/i,
  /state/i,
  /zip/i,
  /postal/i,
  /country/i,

  // Name patterns
  /first[-_]?name/i,
  /last[-_]?name/i,
  /full[-_]?name/i,
  /display[-_]?name/i,

  // Authentication
  /password/i,
  /passwd/i,
  /pwd/i,
  /secret/i,
  /token/i,
  /api[-_]?key/i,
  /access[-_]?token/i,
  /refresh[-_]?token/i,
  /auth/i,

  // Financial
  /credit[-_]?card/i,
  /card[-_]?number/i,
  /cvv/i,
  /ssn/i,
  /social[-_]?security/i,
  /bank[-_]?account/i,
]

/**
 * Sensitive query parameter names to redact
 */
const SENSITIVE_QUERY_PARAMS = [
  'email',
  'phone',
  'tel',
  'token',
  'key',
  'secret',
  'password',
  'apikey',
  'api_key',
  'access_token',
  'refresh_token',
]

/**
 * Sensitive HTTP header names to redact
 */
const SENSITIVE_HEADERS = [
  'authorization',
  'cookie',
  'x-api-key',
  'x-auth-token',
  'x-access-token',
  'x-csrf-token',
]

/**
 * Check if a field name matches PII patterns
 */
function isPIIField(fieldName: string): boolean {
  return PII_FIELD_PATTERNS.some((pattern) => pattern.test(fieldName))
}

/**
 * Recursively scrub PII from an object
 */
function scrubObject(obj: any, depth = 0, maxDepth = 10): any {
  // Prevent infinite recursion
  if (depth > maxDepth) {
    return '[Max Depth Reached]'
  }

  if (obj === null || obj === undefined) {
    return obj
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => scrubObject(item, depth + 1, maxDepth))
  }

  // Handle objects
  if (typeof obj === 'object') {
    const scrubbed: any = {}

    for (const [key, value] of Object.entries(obj)) {
      // Scrub if key matches PII pattern
      if (isPIIField(key)) {
        scrubbed[key] = '[Redacted]'
      } else if (typeof value === 'object' && value !== null) {
        // Recursively scrub nested objects
        scrubbed[key] = scrubObject(value, depth + 1, maxDepth)
      } else {
        scrubbed[key] = value
      }
    }

    return scrubbed
  }

  // Return primitives as-is
  return obj
}

/**
 * Scrub sensitive query parameters from a query string
 */
function scrubQueryString(queryString: string): string {
  if (!queryString) return queryString

  let scrubbed = queryString

  SENSITIVE_QUERY_PARAMS.forEach((param) => {
    // Match param=value patterns (case-insensitive)
    const regex = new RegExp(`(${param})=([^&]+)`, 'gi')
    scrubbed = scrubbed.replace(regex, '$1=[Redacted]')
  })

  return scrubbed
}

/**
 * Scrub sensitive headers from request headers
 */
function scrubHeaders(headers: Record<string, any> | undefined): Record<string, any> {
  if (!headers) return {}

  const scrubbed = { ...headers }

  SENSITIVE_HEADERS.forEach((header) => {
    const lowerHeader = header.toLowerCase()
    // Check all header keys (case-insensitive)
    Object.keys(scrubbed).forEach((key) => {
      if (key.toLowerCase() === lowerHeader) {
        scrubbed[key] = '[Redacted]'
      }
    })
  })

  return scrubbed
}

/**
 * Partially redact an email address
 * Example: john.doe@example.com -> jo***@example.com
 */
function redactEmail(email: string): string {
  const match = email.match(/^(.{1,2}).*(@.*)$/)
  if (match) {
    return `${match[1]}***${match[2]}`
  }
  return '[Email]'
}

/**
 * Partially redact a phone number
 * Example: +1-555-123-4567 -> ***-***-4567
 */
function redactPhone(phone: string): string {
  // Keep last 4 digits only
  const digits = phone.replace(/\D/g, '')
  if (digits.length >= 4) {
    const lastFour = digits.slice(-4)
    return `***-***-${lastFour}`
  }
  return '[Phone]'
}

/**
 * Scrub PII from a Sentry event before sending
 */
export function scrubPII(event: Event, hint?: EventHint): Event | null {
  // Clone event to avoid mutating original
  const scrubbedEvent = { ...event }

  // 1. Scrub request data
  if (scrubbedEvent.request) {
    const request = { ...scrubbedEvent.request }

    // Scrub cookies
    if (request.cookies) {
      request.cookies = { filtered: '[Redacted]' }
    }

    // Scrub headers
    if (request.headers) {
      request.headers = scrubHeaders(request.headers)
    }

    // Scrub query string
    if (request.query_string && typeof request.query_string === 'string') {
      request.query_string = scrubQueryString(request.query_string)
    }

    // Scrub POST body
    if (request.data) {
      request.data = scrubObject(request.data)
    }

    scrubbedEvent.request = request
  }

  // 2. Scrub extra context
  if (scrubbedEvent.extra) {
    scrubbedEvent.extra = scrubObject(scrubbedEvent.extra)
  }

  // 3. Scrub contexts
  if (scrubbedEvent.contexts) {
    scrubbedEvent.contexts = scrubObject(scrubbedEvent.contexts)
  }

  // 4. Scrub user data (keep minimal identifiers)
  if (scrubbedEvent.user) {
    const user = { ...scrubbedEvent.user }

    // Remove IP address
    delete user.ip_address

    // Partially redact email
    if (user.email && typeof user.email === 'string') {
      user.email = redactEmail(user.email)
    }

    // Remove username if it looks like an email
    if (user.username && typeof user.username === 'string' && user.username.includes('@')) {
      user.username = redactEmail(user.username)
    }

    scrubbedEvent.user = user
  }

  // 5. Scrub breadcrumbs
  if (scrubbedEvent.breadcrumbs) {
    scrubbedEvent.breadcrumbs = scrubbedEvent.breadcrumbs.map((breadcrumb) => {
      if (breadcrumb.data) {
        return {
          ...breadcrumb,
          data: scrubObject(breadcrumb.data),
        }
      }
      return breadcrumb
    })
  }

  // 6. Scrub exception values (in case PII leaked into error messages)
  if (scrubbedEvent.exception?.values) {
    scrubbedEvent.exception.values = scrubbedEvent.exception.values.map((exception) => {
      if (exception.value) {
        // Redact emails in error messages
        let value = exception.value.replace(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
          '[Email]'
        )
        // Redact phone numbers (basic pattern)
        value = value.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[Phone]')
        exception.value = value
      }
      return exception
    })
  }

  return scrubbedEvent
}

/**
 * Export individual scrubbing functions for testing
 */
export const _internal = {
  isPIIField,
  scrubObject,
  scrubQueryString,
  scrubHeaders,
  redactEmail,
  redactPhone,
}
