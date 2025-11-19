/**
 * Feedback API Route
 *
 * Handles "Was this helpful?" feedback submissions
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { captureException, captureMessage } from '@sentry/nextjs'
import { checkRateLimit, getClientIdentifier } from '@/lib/api/rateLimit'
import { sanitizeObject } from '@/lib/api/sanitize'
import { submitFeedback } from '@/lib/forms/submissions'

export const runtime = 'edge'

const feedbackSchema = z.object({
  pageId: z.string().min(1).max(200),
  vote: z.enum(['yes', 'no']),
  feedback: z.string().max(500).optional(),
  timestamp: z.string(),
  userAgent: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 10 requests per 10 minutes
    const clientId = getClientIdentifier(request)
    const rateLimitResult = checkRateLimit(clientId, { limit: 10, window: 10 * 60 * 1000 })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      )
    }

    // Parse and validate
    const body = await request.json()
    const sanitizedData = sanitizeObject(body)
    const validationResult = feedbackSchema.safeParse(sanitizedData)

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid feedback data' },
        { status: 400 }
      )
    }

    const data = validationResult.data

    const dbResult = await submitFeedback({
      page_id: data.pageId,
      vote: data.vote,
      feedback: data.feedback ?? null,
      submitted_at: data.timestamp,
      user_agent: data.userAgent ?? null,
    })

    if (!dbResult.success) {
      captureException(new Error(dbResult.error), { tags: { route: 'feedback' } })
    } else {
      captureMessage('feedback_saved_to_db', { level: 'info', extra: { route: 'feedback' } })
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for your feedback!' },
      { status: 200 }
    )
  } catch (error) {
    captureException(error, { tags: { route: 'feedback' } })
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
