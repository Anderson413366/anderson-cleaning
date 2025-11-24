import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'Commercial Cleaning Services',
  description: 'Professional commercial cleaning services including office cleaning, healthcare facility cleaning, and janitorial services for Western MA & Northern CT.',
  openGraph: {
    title: 'Commercial Cleaning Services | Anderson Cleaning Company',
    description: 'Office • Healthcare • Janitorial cleaning services for commercial facilities in Western Massachusetts and Northern Connecticut.',
    url: `${baseUrl}/services`,
    images: [
      {
        url: '/og-images/services-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Company - Commercial Cleaning Services',
      },
      {
        url: '/og-images/services-1200x1200.png',
        width: 1200,
        height: 1200,
        alt: 'Anderson Cleaning Company - Commercial Cleaning Services',
      },
      {
        url: '/og-images/services-1600x900.png',
        width: 1600,
        height: 900,
        alt: 'Anderson Cleaning Company - Commercial Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Cleaning Services | Anderson Cleaning Company',
    description: 'Office • Healthcare • Janitorial cleaning services for commercial facilities.',
    images: ['/og-images/services-1200x630.png'],
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
