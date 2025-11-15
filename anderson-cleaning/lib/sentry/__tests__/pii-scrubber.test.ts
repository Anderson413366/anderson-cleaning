/**
 * Tests for PII Scrubbing Utility
 *
 * Ensures all PII is properly removed from Sentry events
 * before being sent to Sentry servers.
 */

import { describe, it, expect } from 'vitest'
import { scrubPII, _internal } from '../pii-scrubber'
import type { Event } from '@sentry/types'

const { isPIIField, scrubObject, scrubQueryString, scrubHeaders, redactEmail, redactPhone } =
  _internal

describe('isPIIField', () => {
  it('should identify email fields', () => {
    expect(isPIIField('email')).toBe(true)
    expect(isPIIField('user_email')).toBe(true)
    expect(isPIIField('contact_email')).toBe(true)
    expect(isPIIField('e-mail')).toBe(true)
  })

  it('should identify phone fields', () => {
    expect(isPIIField('phone')).toBe(true)
    expect(isPIIField('phoneNumber')).toBe(true)
    expect(isPIIField('mobile')).toBe(true)
    expect(isPIIField('tel')).toBe(true)
  })

  it('should identify address fields', () => {
    expect(isPIIField('address')).toBe(true)
    expect(isPIIField('street')).toBe(true)
    expect(isPIIField('city')).toBe(true)
    expect(isPIIField('zipCode')).toBe(true)
  })

  it('should identify name fields', () => {
    expect(isPIIField('firstName')).toBe(true)
    expect(isPIIField('lastName')).toBe(true)
    expect(isPIIField('fullName')).toBe(true)
  })

  it('should identify authentication fields', () => {
    expect(isPIIField('password')).toBe(true)
    expect(isPIIField('apiKey')).toBe(true)
    expect(isPIIField('token')).toBe(true)
    expect(isPIIField('secret')).toBe(true)
  })

  it('should not flag safe fields', () => {
    expect(isPIIField('id')).toBe(false)
    expect(isPIIField('timestamp')).toBe(false)
    expect(isPIIField('count')).toBe(false)
    expect(isPIIField('status')).toBe(false)
  })
})

describe('scrubObject', () => {
  it('should scrub PII fields from flat objects', () => {
    const input = {
      id: '123',
      email: 'user@example.com',
      phone: '555-1234',
      status: 'active',
    }

    const result = scrubObject(input)

    expect(result.id).toBe('123')
    expect(result.email).toBe('[Redacted]')
    expect(result.phone).toBe('[Redacted]')
    expect(result.status).toBe('active')
  })

  it('should recursively scrub nested objects', () => {
    const input = {
      user: {
        id: '123',
        email: 'user@example.com',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          age: 30,
        },
      },
    }

    const result = scrubObject(input)

    expect(result.user.id).toBe('123')
    expect(result.user.email).toBe('[Redacted]')
    expect(result.user.profile.firstName).toBe('[Redacted]')
    expect(result.user.profile.lastName).toBe('[Redacted]')
    expect(result.user.profile.age).toBe(30)
  })

  it('should handle arrays', () => {
    const input = {
      users: [
        { id: '1', email: 'user1@example.com' },
        { id: '2', email: 'user2@example.com' },
      ],
    }

    const result = scrubObject(input)

    expect(result.users[0].id).toBe('1')
    expect(result.users[0].email).toBe('[Redacted]')
    expect(result.users[1].id).toBe('2')
    expect(result.users[1].email).toBe('[Redacted]')
  })

  it('should handle null and undefined values', () => {
    const input = {
      value1: null,
      value2: undefined,
      email: 'user@example.com',
    }

    const result = scrubObject(input)

    expect(result.value1).toBe(null)
    expect(result.value2).toBe(undefined)
    expect(result.email).toBe('[Redacted]')
  })

  it('should prevent infinite recursion', () => {
    const input = {
      id: '123',
      nested: { level: 1 },
    }

    // Create deeply nested object
    let current = input.nested
    for (let i = 2; i <= 15; i++) {
      current.nested = { level: i }
      current = current.nested
    }

    const result = scrubObject(input, 0, 10)

    expect(result.id).toBe('123')
    expect(result.nested).toBeDefined()
  })
})

describe('scrubQueryString', () => {
  it('should scrub sensitive query parameters', () => {
    const input = 'page=1&email=user@example.com&phone=555-1234&status=active'

    const result = scrubQueryString(input)

    expect(result).toContain('page=1')
    expect(result).toContain('email=[Redacted]')
    expect(result).toContain('phone=[Redacted]')
    expect(result).toContain('status=active')
    expect(result).not.toContain('user@example.com')
  })

  it('should handle case-insensitive parameter names', () => {
    const input = 'Email=user@example.com&PHONE=555-1234'

    const result = scrubQueryString(input)

    expect(result).toContain('Email=[Redacted]')
    expect(result).toContain('PHONE=[Redacted]')
  })

  it('should scrub authentication tokens', () => {
    const input = 'token=abc123&api_key=secret&access_token=xyz789'

    const result = scrubQueryString(input)

    expect(result).toContain('token=[Redacted]')
    expect(result).toContain('api_key=[Redacted]')
    expect(result).toContain('access_token=[Redacted]')
  })

  it('should handle empty query strings', () => {
    expect(scrubQueryString('')).toBe('')
  })
})

describe('scrubHeaders', () => {
  it('should scrub sensitive headers', () => {
    const input = {
      'content-type': 'application/json',
      authorization: 'Bearer token123',
      cookie: 'session=abc123',
      'x-api-key': 'secret-key',
    }

    const result = scrubHeaders(input)

    expect(result['content-type']).toBe('application/json')
    expect(result.authorization).toBe('[Redacted]')
    expect(result.cookie).toBe('[Redacted]')
    expect(result['x-api-key']).toBe('[Redacted]')
  })

  it('should handle case-insensitive header names', () => {
    const input = {
      Authorization: 'Bearer token123',
      COOKIE: 'session=abc123',
    }

    const result = scrubHeaders(input)

    expect(result.Authorization).toBe('[Redacted]')
    expect(result.COOKIE).toBe('[Redacted]')
  })

  it('should handle undefined headers', () => {
    const result = scrubHeaders(undefined)
    expect(result).toEqual({})
  })
})

describe('redactEmail', () => {
  it('should partially redact email addresses', () => {
    expect(redactEmail('john.doe@example.com')).toBe('jo***@example.com')
    expect(redactEmail('a@example.com')).toBe('a***@example.com')
    expect(redactEmail('ab@example.com')).toBe('ab***@example.com')
  })

  it('should handle invalid email format', () => {
    expect(redactEmail('not-an-email')).toBe('[Email]')
  })
})

describe('redactPhone', () => {
  it('should keep only last 4 digits', () => {
    expect(redactPhone('555-123-4567')).toBe('***-***-4567')
    expect(redactPhone('(555) 123-4567')).toBe('***-***-4567')
    expect(redactPhone('+1-555-123-4567')).toBe('***-***-4567')
  })

  it('should handle short phone numbers', () => {
    expect(redactPhone('123')).toBe('[Phone]')
  })
})

describe('scrubPII (full integration)', () => {
  it('should scrub request data', () => {
    const event: Event = {
      request: {
        url: 'https://example.com/api/submit',
        query_string: 'email=user@example.com&token=secret123',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer token123',
        },
        cookies: {
          session: 'abc123',
        },
        data: {
          email: 'user@example.com',
          phone: '555-1234',
          message: 'Hello',
        },
      },
    }

    const result = scrubPII(event)

    expect(result?.request?.query_string).toContain('email=[Redacted]')
    expect(result?.request?.query_string).toContain('token=[Redacted]')
    expect(result?.request?.headers?.authorization).toBe('[Redacted]')
    expect(result?.request?.cookies).toEqual({ filtered: '[Redacted]' })
    expect(result?.request?.data?.email).toBe('[Redacted]')
    expect(result?.request?.data?.phone).toBe('[Redacted]')
    expect(result?.request?.data?.message).toBe('Hello')
  })

  it('should scrub user data', () => {
    const event: Event = {
      user: {
        id: '123',
        email: 'user@example.com',
        username: 'john@example.com',
        ip_address: '192.168.1.1',
      },
    }

    const result = scrubPII(event)

    expect(result?.user?.id).toBe('123')
    expect(result?.user?.email).toBe('us***@example.com')
    expect(result?.user?.username).toBe('jo***@example.com')
    expect(result?.user?.ip_address).toBeUndefined()
  })

  it('should scrub extra context', () => {
    const event: Event = {
      extra: {
        userId: '123',
        apiKey: 'secret',
        formData: {
          email: 'user@example.com',
          firstName: 'John',
        },
      },
    }

    const result = scrubPII(event)

    expect(result?.extra?.userId).toBe('123')
    expect(result?.extra?.apiKey).toBe('[Redacted]')
    expect(result?.extra?.formData?.email).toBe('[Redacted]')
    expect(result?.extra?.formData?.firstName).toBe('[Redacted]')
  })

  it('should scrub breadcrumbs', () => {
    const event: Event = {
      breadcrumbs: [
        {
          message: 'Form submitted',
          data: {
            email: 'user@example.com',
            password: 'secret123',
          },
        },
      ],
    }

    const result = scrubPII(event)

    expect(result?.breadcrumbs?.[0]?.data?.email).toBe('[Redacted]')
    expect(result?.breadcrumbs?.[0]?.data?.password).toBe('[Redacted]')
  })

  it('should redact emails and phones in exception messages', () => {
    const event: Event = {
      exception: {
        values: [
          {
            type: 'Error',
            value: 'Failed to send email to user@example.com. Please call 555-123-4567.',
          },
        ],
      },
    }

    const result = scrubPII(event)

    expect(result?.exception?.values?.[0]?.value).not.toContain('user@example.com')
    expect(result?.exception?.values?.[0]?.value).toContain('[Email]')
    expect(result?.exception?.values?.[0]?.value).toContain('[Phone]')
  })

  it('should handle events with no PII', () => {
    const event: Event = {
      message: 'Something went wrong',
      level: 'error',
    }

    const result = scrubPII(event)

    expect(result).toBeDefined()
    expect(result?.message).toBe('Something went wrong')
    expect(result?.level).toBe('error')
  })

  it('should not mutate original event', () => {
    const event: Event = {
      user: {
        email: 'user@example.com',
      },
    }

    const originalEmail = event.user?.email

    scrubPII(event)

    expect(event.user?.email).toBe(originalEmail)
  })
})
