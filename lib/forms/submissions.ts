import { createSupabaseServer } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/types'

export type SubmissionResult = { success: true } | { success: false; error: string }

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert']
export type QuoteSubmission = Database['public']['Tables']['quote_requests']['Insert']
export type NewsletterSubmission = Database['public']['Tables']['newsletter_subscriptions']['Insert']
export type CareerSubmission = Database['public']['Tables']['career_applications']['Insert']

async function insertRecord<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
  payload: Database['public']['Tables'][TableName]['Insert']
): Promise<SubmissionResult> {
  try {
    const supabase = createSupabaseServer()
    const { error } = await supabase.from(table).insert(payload as any)

    if (error) {
      console.error(`[Supabase] Failed to insert into ${String(table)}:`, error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error(`[Supabase] Unexpected error inserting into ${String(table)}:`, error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export function submitContact(payload: ContactSubmission) {
  return insertRecord('contact_submissions', payload)
}

export function submitQuote(payload: QuoteSubmission) {
  return insertRecord('quote_requests', payload)
}

export function submitNewsletter(payload: NewsletterSubmission) {
  return insertRecord('newsletter_subscriptions', payload)
}

export function submitCareerApplication(payload: CareerSubmission) {
  return insertRecord('career_applications', payload)
}
