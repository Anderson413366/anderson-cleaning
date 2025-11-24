/**
 * Schema.org Structured Data Components
 *
 * React components that generate schema.org JSON-LD for SEO
 * Enables rich snippets in Google search results
 */

interface LocalBusinessSchemaProps {
  pageName?: string
  serviceArea?: string
  nonce?: string | null
}

export function LocalBusinessSchema({ pageName, serviceArea, nonce }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://andersoncleaning.com/#organization',
    name: 'Anderson Cleaning Company',
    alternateName: 'Anderson Cleaning',
    description:
      'Professional commercial cleaning services for offices, medical facilities, and businesses in Western Massachusetts and Northern Connecticut',
    url: 'https://andersoncleaning.com',
    logo: 'https://andersoncleaning.com/brand/color/logo-full-2000.png',
    image: [
      'https://andersoncleaning.com/brand/color/logo-full-2000.png',
      'https://andersoncleaning.com/images/team-cleaning.jpg',
      'https://andersoncleaning.com/images/office-cleaning.jpg',
    ],
    telephone: '+14133065053',
    email: 'info@andersoncleaning.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '103 Wayside Ave',
      addressLocality: 'West Springfield',
      addressRegion: 'MA',
      postalCode: '01089',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.107,
      longitude: -72.6209,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '00:00',
        closes: '23:59',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      {
        '@type': 'State',
        name: 'Massachusetts',
        containsPlace: [
          { '@type': 'City', name: 'Springfield' },
          { '@type': 'City', name: 'West Springfield' },
          { '@type': 'City', name: 'Chicopee' },
          { '@type': 'City', name: 'Holyoke' },
          { '@type': 'City', name: 'Northampton' },
          { '@type': 'City', name: 'Amherst' },
          { '@type': 'City', name: 'Worcester' },
          { '@type': 'City', name: 'Westfield' },
        ],
      },
      {
        '@type': 'State',
        name: 'Connecticut',
        containsPlace: [
          { '@type': 'City', name: 'Hartford' },
          { '@type': 'City', name: 'Enfield' },
          { '@type': 'City', name: 'Windsor' },
        ],
      },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 42.107,
        longitude: -72.6209,
      },
      geoRadius: '100 mi',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial Cleaning Services',
      itemListElement: [
        {
          '@type': 'Service',
          name: 'Office Cleaning',
          description: 'Daily janitorial services for offices and commercial buildings',
        },
        {
          '@type': 'Service',
          name: 'Healthcare Facility Cleaning',
          description: 'OSHA-compliant cleaning for medical and dental offices',
        },
        {
          '@type': 'Service',
          name: 'Janitorial Services',
          description: 'Comprehensive routine cleaning and maintenance',
        },
        {
          '@type': 'Service',
          name: 'Floor Care',
          description: 'Strip, wax, buff, and carpet cleaning services',
        },
        {
          '@type': 'Service',
          name: 'Emergency Cleaning',
          description: '24/7 rapid response cleaning services',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Mitchell',
        },
        datePublished: '2024-11-15',
        reviewBody:
          'Anderson Cleaning has transformed our medical facility. Their attention to healthcare protocols is unmatched.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'John Davis',
        },
        datePublished: '2024-10-22',
        reviewBody:
          'Professional, reliable, and thorough. Our office has never looked better. Highly recommend!',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'Invoice', 'ACH'],
    currenciesAccepted: 'USD',
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Green Seal Certification',
        description: 'Environmental responsibility certification for sustainable cleaning practices',
        issuedBy: {
          '@type': 'Organization',
          name: 'Green Seal Inc.',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'Licensed & Insured',
        description: 'Fully licensed in MA & CT with $2M general liability coverage',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'OSHA Compliant',
        description: 'All staff trained in OSHA safety standards and protocols',
        issuedBy: {
          '@type': 'Organization',
          name: 'Occupational Safety and Health Administration',
        },
      },
    ],
    foundingDate: '2007',
    founder: {
      '@type': 'Person',
      name: 'Anderson Gomes',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 20,
      maxValue: 50,
    },
    slogan: 'Professional Commercial Cleaning with a Personal Touch',
    sameAs: [
      'https://www.facebook.com/andersoncleaning',
      'https://www.linkedin.com/company/anderson-cleaning',
      'https://www.instagram.com/andersoncleaning',
    ],
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({
  serviceName,
  description,
  url,
  image,
  areaServed,
  nonce,
}: {
  serviceName: string
  description: string
  url: string
  image?: string
  areaServed?: string[]
  nonce?: string | null
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description: description,
    url: url,
    image: image,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://andersoncleaning.com/#organization',
      name: 'Anderson Cleaning Company',
    },
    areaServed: areaServed?.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName + ' Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Daily Cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Weekly Cleaning',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Monthly Deep Clean',
          },
        },
      ],
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0.00',
      priceCurrency: 'USD',
      name: 'Free Quote',
      url: url + '#quote',
    },
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({
  items,
  nonce,
}: {
  items: Array<{ name: string; url: string }>
  nonce?: string | null
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({
  faqs,
  nonce,
}: {
  faqs: Array<{ question: string; answer: string }>
  nonce?: string | null
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationSchema({ nonce }: { nonce?: string | null }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://andersoncleaning.com/#organization',
    name: 'Anderson Cleaning Company',
    url: 'https://andersoncleaning.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://andersoncleaning.com/brand/color/logo-full-2000.png',
      width: '2000',
      height: '800',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-413-306-5053',
        contactType: 'sales',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-413-306-5053',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-413-306-5053',
        contactType: 'emergency',
        areaServed: 'US',
        contactOption: 'TollFree',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
    department: [
      {
        '@type': 'Organization',
        name: 'Commercial Sales',
        telephone: '+1-413-306-5053',
        email: 'sales@andersoncleaning.com',
      },
      {
        '@type': 'Organization',
        name: 'Customer Service',
        telephone: '+1-413-306-5053',
        email: 'service@andersoncleaning.com',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SpecialOfferSchema({ nonce }: { nonce?: string | null }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'New Client Special - Free Month of Cleaning',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://andersoncleaning.com/request-quote',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://andersoncleaning.com/special-offers',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01',
    },
    organizer: {
      '@type': 'Organization',
      '@id': 'https://andersoncleaning.com/#organization',
    },
    description:
      'New commercial cleaning clients receive their first month free with annual contract',
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema({ nonce }: { nonce?: string | null }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://andersoncleaning.com/#website',
    name: 'Anderson Cleaning Company',
    url: 'https://andersoncleaning.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://andersoncleaning.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://andersoncleaning.com/#organization',
    },
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  nonce,
}: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
  nonce?: string | null
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://andersoncleaning.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anderson Cleaning Company',
      logo: {
        '@type': 'ImageObject',
        url: 'https://andersoncleaning.com/brand/color/logo-full-2000.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce || undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
