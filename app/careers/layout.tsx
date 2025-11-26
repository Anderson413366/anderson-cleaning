import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Anderson Cleaning Company! Now hiring Cleaning Specialists ($15-20/hr), Field Supervisors ($20-25/hr), and Operations Assistants (Premium Pay). Apply today!',
  keywords: [
    'cleaning jobs',
    'commercial cleaning careers',
    'janitorial jobs',
    'full-time cleaning positions',
    'jobs in Springfield MA',
    'cleaning jobs Western Massachusetts',
    'jobs with benefits',
    'entry level jobs',
    'career opportunities',
    'Anderson Cleaning Company careers',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/careers`,
    siteName: 'Anderson Cleaning Company',
    title:
      'Careers - Cleaning Specialist, Field Supervisor, Operations Assistant | Anderson Cleaning Company',
    description:
      'Join Anderson Cleaning Company! Cleaning Specialists ($15-20/hr), Field Supervisors ($20-25/hr), and Operations Assistants (Premium Pay). Apply today!',
    images: [
      {
        url: '/images/og-careers.jpg',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Company Careers - Join Our Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andersoncleaning',
    creator: '@andersoncleaning',
    title: 'Careers - Cleaning Specialist, Field Supervisor, Operations Assistant',
    description:
      'Now hiring Cleaning Specialists ($15-20/hr), Field Supervisors ($20-25/hr), and Operations Assistants (Premium Pay). Apply today!',
    images: ['/images/og-careers.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${baseUrl}/careers`,
    languages: {
      'en-US': `${baseUrl}/careers`,
      'es-US': `${baseUrl}/careers?lang=es`,
      'pt-BR': `${baseUrl}/careers?lang=pt`,
      'ro-RO': `${baseUrl}/careers?lang=ro`,
    },
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
