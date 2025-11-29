'use client'

import Link from 'next/link'

interface FormLegalNoticeProps {
  className?: string
}

export default function FormLegalNotice({ className = '' }: FormLegalNoticeProps) {
  return (
    <p
      className={`text-[13px] text-[#1C2526]/60 dark:text-white/70 leading-relaxed pt-5 ${className}`.trim()}
    >
      By submitting this form, you agree to our{' '}
      <Link href="/privacy-policy" className="text-[13px] text-brand-bright-blue font-semibold hover:underline dark:text-brand-bright-blue dark:hover:text-white">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link href="/terms-of-service" className="text-[13px] text-brand-bright-blue font-semibold hover:underline dark:text-brand-bright-blue dark:hover:text-white">
        Terms of Service
      </Link>
      . Your information will never be sold to third parties.
    </p>
  )
}
