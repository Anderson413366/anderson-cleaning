import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'Cleaning Industry Insights',
  description: 'Expert commercial cleaning tips, best practices, and industry news from Anderson Cleaning Company. Stay informed with our professional insights.',
  openGraph: {
    title: 'Cleaning Industry Insights | Anderson Cleaning Company',
    description: 'Tips, best practices, and industry news from commercial cleaning experts.',
    url: `${baseUrl}/blog`,
    images: [
      {
        url: '/og-images/blog-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Company - Blog & Industry Insights',
      },
      {
        url: '/og-images/blog-1200x1200.png',
        width: 1200,
        height: 1200,
        alt: 'Anderson Cleaning Company - Blog & Industry Insights',
      },
      {
        url: '/og-images/blog-1600x900.png',
        width: 1600,
        height: 900,
        alt: 'Anderson Cleaning Company - Blog & Industry Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Industry Insights | Anderson Cleaning Company',
    description: 'Expert commercial cleaning tips, best practices, and industry news.',
    images: ['/og-images/blog-1200x630.png'],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
