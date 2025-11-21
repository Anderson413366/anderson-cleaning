export interface QuickQuoteRequestPayload {
  name: string
  email: string
  phone: string
  facilityType: string
  company?: string
  source?: string
  website?: string
}

interface QuickQuoteApiResponse {
  success: boolean
  message?: string
  error?: string
}

export async function submitQuickQuoteRequest(payload: QuickQuoteRequestPayload) {
  const response = await fetch('/api/quick-quote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  let result: QuickQuoteApiResponse | undefined
  try {
    result = await response.json()
  } catch (error) {
    throw new Error('Unexpected server response')
  }

  if (!response.ok || !result?.success) {
    throw new Error(result?.error || 'Unable to submit your request right now. Please try again.')
  }

  return result
}
