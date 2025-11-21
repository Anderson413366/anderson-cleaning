import { NextRequest, NextResponse } from 'next/server'
import { quickQuoteFormSchema, type QuickQuoteFormData } from '@/lib/validation/quote'
import { sanitizeObject, validateHoneypot } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateQuickQuoteEmail } from '@/lib/api/emailTemplates'
import { submitContact } from '@/lib/forms/submissions'
import { handleSubmission } from '@/lib/api/handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: quickQuoteFormSchema,
    rateLimit: { limit: 5, windowMs: 5 * 60 * 1000 },
    sanitize: (payload) => sanitizeObject(payload as Record<string, unknown>),
    honeypotCheck: (payload) => validateHoneypot((payload as Record<string, any>).website),
    store: (data, { request }) =>
      submitContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        message: buildQuickQuoteMessage(data),
        source_page: request.headers.get('referer') || '/quick-quote',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        user_agent: request.headers.get('user-agent') || null,
      }),
    notify: async (data) => {
      const { html, text } = generateQuickQuoteEmail(data)
      const emailResult = await sendEmail({
        to: getNotificationEmail(),
        subject: `Quick Quote Lead: ${data.name}`,
        html,
        text,
        replyTo: data.email,
      })
      logEmailSend(
        {
          to: getNotificationEmail(),
          subject: `Quick Quote Lead: ${data.name}`,
          html,
        },
        emailResult
      )
    },
    successMessage: 'Thank you! A specialist will reach out within 24 hours (Mon–Fri, 9 AM – 5 PM EST).',
  })
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

function buildQuickQuoteMessage(data: QuickQuoteFormData) {
  const parts = [
    `Quick quote request via ${data.source ?? 'inline'} form.`,
    `Facility type: ${data.facilityType}`,
    data.company ? `Company: ${data.company}` : null,
  ].filter(Boolean)

  return parts.join(' ')
}
