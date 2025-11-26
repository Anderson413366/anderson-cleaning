import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Anderson Cleaning Company privacy policy. Learn how we collect, use, and protect your personal information when you use our commercial cleaning services.',
  alternates: {
    canonical: 'https://andersoncleaning.com/privacy-policy',
  },
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
