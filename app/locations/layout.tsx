import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'Service Areas',
  description: 'Commercial cleaning services throughout Western Massachusetts and Northern Connecticut. 100-mile radius from West Springfield, MA.',
  openGraph: {
    title: 'Service Areas | Anderson Cleaning Company',
    description: '100-mile radius from West Springfield, MA serving 9 primary service areas throughout Western MA & Northern CT.',
    url: `${baseUrl}/locations`,
    images: [
      {
        url: '/og-images/locations-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Company - Service Areas',
      },
      {
        url: '/og-images/locations-1200x1200.png',
        width: 1200,
        height: 1200,
        alt: 'Anderson Cleaning Company - Service Areas',
      },
      {
        url: '/og-images/locations-1600x900.png',
        width: 1600,
        height: 900,
        alt: 'Anderson Cleaning Company - Service Areas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service Areas | Anderson Cleaning Company',
    description: '100-mile radius from West Springfield, MA throughout Western MA & Northern CT.',
    images: ['/og-images/locations-1200x630.png'],
  },
}

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
