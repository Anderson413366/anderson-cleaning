import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'Industry-Specific Cleaning',
  description: 'Specialized commercial cleaning services for healthcare, corporate offices, education, retail, and industrial facilities. OSHA & CDC compliant.',
  openGraph: {
    title: 'Industry-Specific Cleaning | Anderson Cleaning Company',
    description: 'Healthcare • Corporate • Education • Retail cleaning services with industry-specific protocols and compliance.',
    url: `${baseUrl}/industries`,
    images: [
      {
        url: '/og-images/industries-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Company - Industry-Specific Cleaning',
      },
      {
        url: '/og-images/industries-1200x1200.png',
        width: 1200,
        height: 1200,
        alt: 'Anderson Cleaning Company - Industry-Specific Cleaning',
      },
      {
        url: '/og-images/industries-1600x900.png',
        width: 1600,
        height: 900,
        alt: 'Anderson Cleaning Company - Industry-Specific Cleaning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industry-Specific Cleaning | Anderson Cleaning Company',
    description: 'Healthcare • Corporate • Education • Retail cleaning with industry-specific protocols.',
    images: ['/og-images/industries-1200x630.png'],
  },
}

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
