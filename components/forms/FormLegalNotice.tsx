'use client'

import Link from 'next/link'

interface FormLegalNoticeProps {
  className?: string
}

export default function FormLegalNotice({ className = '' }: FormLegalNoticeProps) {
  return (
    <p
      className={`text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-4 ${className}`.trim()}
    >
      By submitting this form, you agree to our{' '}
      <Link href="/privacy-policy" className="text-blue-600 hover:underline dark:text-brand-bright-blue">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link href="/terms-of-service" className="text-blue-600 hover:underline dark:text-brand-bright-blue">
        Terms of Service
      </Link>
      . Your information will never be sold to third parties.
    </p>
  )
}
