import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about commercial cleaning services, pricing, contracts, scheduling, and more. Anderson Cleaning Company serves Western MA & Northern CT.',
  alternates: {
    canonical: 'https://andersoncleaning.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Anderson Cleaning Company',
    description:
      'Find answers to common questions about commercial cleaning services, pricing, contracts, scheduling, and more.',
    url: 'https://andersoncleaning.com/faq',
    type: 'website',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
