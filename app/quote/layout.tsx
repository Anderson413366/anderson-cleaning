import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Free Quote',
  description:
    'Get a free, customized quote for commercial cleaning services. Anderson Cleaning Company provides professional janitorial services for businesses in Western MA & Northern CT.',
  alternates: {
    canonical: 'https://andersoncleaning.com/quote',
  },
  openGraph: {
    title: 'Request a Free Quote | Anderson Cleaning Company',
    description:
      'Get a free, customized quote for commercial cleaning services within 24 hours.',
    url: 'https://andersoncleaning.com/quote',
    type: 'website',
  },
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
