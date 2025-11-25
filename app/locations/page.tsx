import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Service Areas | Commercial Cleaning Locations | Anderson Cleaning',
  description:
    'Anderson Cleaning provides professional commercial cleaning services throughout Western Massachusetts and Northern Connecticut. Find your local service area.',
  keywords: [
    'commercial cleaning service areas',
    'Massachusetts cleaning services',
    'Connecticut commercial cleaning',
    'Western MA janitorial services',
    'Springfield area cleaning',
  ],
  openGraph: {
    title: 'Service Areas | Anderson Cleaning Company',
    description:
      'Professional commercial cleaning throughout Western Massachusetts and Northern Connecticut.',
    url: 'https://andersoncleaning.com/locations',
    siteName: 'Anderson Cleaning Company',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://andersoncleaning.com/locations',
  },
}

// Western Massachusetts cities we serve
const massachusettsCities = [
  { name: 'Springfield', slug: 'springfield-ma' },
  { name: 'West Springfield', slug: 'west-springfield-ma' },
  { name: 'Chicopee', slug: 'chicopee-ma' },
  { name: 'Holyoke', slug: 'holyoke-ma' },
  { name: 'Northampton', slug: 'northampton-ma' },
  { name: 'Amherst', slug: 'amherst-ma' },
  { name: 'Westfield', slug: 'westfield-ma' },
  { name: 'Agawam', slug: 'agawam-ma' },
  { name: 'Easthampton', slug: 'easthampton-ma' },
  { name: 'Palmer', slug: 'palmer-ma' },
  { name: 'Ware', slug: 'ware-ma' },
  { name: 'Ludlow', slug: 'ludlow-ma' },
  { name: 'South Hadley', slug: 'south-hadley-ma' },
  { name: 'Belchertown', slug: 'belchertown-ma' },
  { name: 'Granby', slug: 'granby-ma' },
]

// Northern Connecticut cities we serve
const connecticutCities = [
  { name: 'Hartford', slug: 'hartford-ct' },
  { name: 'Enfield', slug: 'enfield-ct' },
  { name: 'Windsor', slug: 'windsor-ct' },
  { name: 'East Hartford', slug: 'east-hartford-ct' },
  { name: 'West Hartford', slug: 'west-hartford-ct' },
  { name: 'Bloomfield', slug: 'bloomfield-ct' },
  { name: 'Suffield', slug: 'suffield-ct' },
  { name: 'Somers', slug: 'somers-ct' },
]

export default function LocationsHub() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Brand Consistent */}
      <section className="hero-section bg-brand-deep-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-extrabold mb-6 leading-tight">
              Commercial Cleaning Service Areas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional commercial cleaning throughout Western Massachusetts and Northern Connecticut. Find your local service area.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote">
                <Button variant="accent" size="lg" className="min-w-[220px]">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Overview */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-4">
              100-Mile Service Radius
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              Headquartered in West Springfield, MA. We provide professional commercial cleaning services throughout Western Massachusetts and Northern Connecticut.
            </p>
          </div>

          {/* Massachusetts Cities */}
          <div className="mb-16">
            <h3 className="text-h3 font-bold text-brand-deep-blue dark:text-brand-bright-blue mb-8 text-center">
              Western Massachusetts
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {massachusettsCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-lg p-4 text-center hover:bg-brand-deep-blue dark:hover:bg-brand-bright-blue transition-all duration-150 border border-neutral-charcoal/10 dark:border-white/10 hover:border-brand-deep-blue dark:hover:border-brand-bright-blue hover:shadow-lg"
                >
                  <div className="text-base font-semibold text-neutral-charcoal dark:text-white group-hover:text-white transition-colors">
                    {city.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Connecticut Cities */}
          <div className="mb-12">
            <h3 className="text-h3 font-bold text-brand-deep-blue dark:text-brand-bright-blue mb-8 text-center">
              Northern Connecticut
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {connecticutCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-lg p-4 text-center hover:bg-brand-deep-blue dark:hover:bg-brand-bright-blue transition-all duration-150 border border-neutral-charcoal/10 dark:border-white/10 hover:border-brand-deep-blue dark:hover:border-brand-bright-blue hover:shadow-lg"
                >
                  <div className="text-base font-semibold text-neutral-charcoal dark:text-white group-hover:text-white transition-colors">
                    {city.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Radius Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Service Radius</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-brand-bright-blue dark:text-brand-bright-blue">
                Primary Coverage Area
              </h3>
              <p className="text-neutral-charcoal/70 dark:text-white/70 mb-4">
                We provide comprehensive commercial cleaning services throughout:
              </p>
              <ul className="space-y-2 text-neutral-charcoal/80 dark:text-white/80">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Hampden County, Massachusetts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Hampshire County, Massachusetts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Franklin County, Massachusetts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Worcester County (Western), Massachusetts</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Hartford County, Connecticut</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tolland County, Connecticut</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-brand-bright-blue dark:text-brand-bright-blue">
                Extended Service Area
              </h3>
              <p className="text-neutral-charcoal/70 dark:text-white/70 mb-4">
                We serve all businesses within 100 miles of our West Springfield headquarters,
                including:
              </p>
              <ul className="space-y-2 text-neutral-charcoal/80 dark:text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-bright-blue dark:text-brand-bright-blue font-bold">•</span>
                  <span>Greater Springfield Area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-bright-blue dark:text-brand-bright-blue font-bold">•</span>
                  <span>Pioneer Valley Region</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-bright-blue dark:text-brand-bright-blue font-bold">•</span>
                  <span>Greater Hartford Area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-bright-blue dark:text-brand-bright-blue font-bold">•</span>
                  <span>Central Massachusetts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-bright-blue dark:text-brand-bright-blue font-bold">•</span>
                  <span>North Central Connecticut</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-brand-bright-blue/5 dark:bg-brand-bright-blue/30 rounded-lg">
                <p className="text-sm text-neutral-charcoal/80 dark:text-white/80">
                  <strong className="text-brand-bright-blue dark:text-brand-bright-blue">
                    Don&apos;t see your city?
                  </strong>{' '}
                  Contact us at{' '}
                  <a href="tel:4133065053" className="text-brand-bright-blue dark:text-brand-bright-blue underline">
                    (413) 306-5053
                  </a>{' '}
                  to discuss service availability in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Anderson Cleaning */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Why Businesses Throughout the Region Choose Anderson Cleaning
          </h2>
          <p className="text-lg text-neutral-charcoal/70 dark:text-white/70 mb-12 text-center max-w-3xl mx-auto">
            Whether you&apos;re in Springfield, MA or Hartford, CT, you&apos;ll receive the same
            professional, reliable service that has made us the region&apos;s trusted commercial
            cleaning partner.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
              <div className="bg-brand-bright-blue/10 dark:bg-brand-bright-blue/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-bright-blue dark:text-brand-bright-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fast Response Times</h3>
              <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                Same-day service in West Springfield, 1-6 hour response throughout service area
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
              <div className="bg-brand-bright-blue/10 dark:bg-brand-bright-blue/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-bright-blue dark:text-brand-bright-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Fully Licensed & Insured</h3>
              <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                MA & CT licensed with comprehensive liability and workers&apos; compensation
                insurance
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
              <div className="bg-brand-bright-blue/10 dark:bg-brand-bright-blue/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-bright-blue dark:text-brand-bright-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Experienced Team</h3>
              <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                18+ years serving businesses throughout Western MA and Northern CT
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 text-center">
              <div className="bg-brand-bright-blue/10 dark:bg-brand-bright-blue/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-brand-bright-blue dark:text-brand-bright-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                100% satisfaction guarantee with consistent quality across all locations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
