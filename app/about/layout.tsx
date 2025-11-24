import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'About Anderson Cleaning',
  description: '18+ years serving Western Massachusetts and Northern Connecticut with professional commercial cleaning services. W-2 employees, 24/7 support, OSHA & CDC compliant.',
  openGraph: {
    title: 'About Anderson Cleaning | Anderson Cleaning Company',
    description: '18+ years serving Western MA & CT with W-2 employees, 24/7 support, and industry-leading compliance.',
    url: `${baseUrl}/about`,
    images: [
      {
        url: '/og-images/about-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Company - About Us',
      },
      {
        url: '/og-images/about-1200x1200.png',
        width: 1200,
        height: 1200,
        alt: 'Anderson Cleaning Company - About Us',
      },
      {
        url: '/og-images/about-1600x900.png',
        width: 1600,
        height: 900,
        alt: 'Anderson Cleaning Company - About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Anderson Cleaning | Anderson Cleaning Company',
    description: '18+ years serving Western MA & CT with W-2 employees and 24/7 support.',
    images: ['/og-images/about-1200x630.png'],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
