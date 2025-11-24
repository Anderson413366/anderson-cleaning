'use client'

import Link from 'next/link'

interface FormLegalNoticeProps {
  className?: string
}

export default function FormLegalNotice({ className = '' }: FormLegalNoticeProps) {
  return (
    <p
      className={`text-xs text-neutral-charcoal/70 dark:text-gray-300 leading-relaxed mt-4 ${className}`.trim()}
    >
      By submitting this form, you agree to our{' '}
      <Link href="/privacy-policy" className="text-brand-bright-blue hover:underline dark:text-brand-bright-blue">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link href="/terms-of-service" className="text-brand-bright-blue hover:underline dark:text-brand-bright-blue">
        Terms of Service
      </Link>
      . Your information will never be sold to third parties.
    </p>
  )
}
