import { Metadata } from 'next'
import Link from 'next/link'

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

const massachusettsLocations = [
  {
    name: 'Springfield, MA',
    slug: 'springfield-ma',
    description: 'Serving 4,200+ businesses in Springfield with 2-4 hour response times',
    population: '155,000',
    businesses: '4,200+',
  },
  {
    name: 'West Springfield, MA',
    slug: 'west-springfield-ma',
    description: 'Headquartered in West Springfield - same-day service available',
    population: '28,000',
    businesses: '1,200+',
  },
  {
    name: 'Worcester County, MA',
    slug: 'worcester-county-ma',
    description: 'Comprehensive coverage throughout Worcester County',
    population: '830,000',
    businesses: '18,000+',
  },
  {
    name: 'Northampton & Amherst, MA',
    slug: 'northampton-amherst-ma',
    description: 'Eco-friendly cleaning for Pioneer Valley businesses',
    population: '90,000',
    businesses: '2,800+',
  },
  {
    name: 'Chicopee, MA',
    slug: 'chicopee-ma',
    description: 'Quick 1-3 hour response for Chicopee area businesses',
    population: '55,000',
    businesses: '1,500+',
  },
  {
    name: 'Holyoke, MA',
    slug: 'holyoke-ma',
    description: 'Specialized service for historic mill buildings and modern facilities',
    population: '38,000',
    businesses: '1,100+',
  },
]

const connecticutLocations = [
  {
    name: 'Hartford, CT',
    slug: 'hartford-ct',
    description: 'Serving Hartford\'s insurance and financial districts since 2007',
    population: '121,000',
    businesses: '5,500+',
  },
  {
    name: 'Enfield, CT',
    slug: 'enfield-ct',
    description: 'Connecticut licensed with fast response from nearby West Springfield',
    population: '42,000',
    businesses: '1,300+',
  },
  {
    name: 'Windsor, CT',
    slug: 'windsor-ct',
    description: 'Professional service for Windsor\'s corporate and healthcare facilities',
    population: '29,000',
    businesses: '900+',
  },
]

export default function LocationsHub() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Brand Consistent */}
      <section className="hero-section bg-brand-deep-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-h1 font-extrabold mb-6 leading-tight">
              Commercial Cleaning Service Areas
            </h1>
            <p className="text-body md:text-h3 text-white/90 mb-8 max-w-3xl mx-auto">
              Professional commercial cleaning throughout Western Massachusetts and Northern Connecticut. Find your local service area.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="rounded-full bg-white text-brand-deep-blue px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-150 shadow-sm"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:+14133065053"
                className="rounded-full border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white/10 transition-all duration-150"
              >
                Call (413) 306-5053
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Coverage Overview */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-brand-deep-blue dark:text-brand-bright-blue">100+</div>
              <div className="text-neutral-charcoal/70 dark:text-white/70">Mile Service Radius</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-deep-blue dark:text-brand-bright-blue">35,000+</div>
              <div className="text-neutral-charcoal/70 dark:text-white/70">Businesses Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-deep-blue dark:text-brand-bright-blue">9</div>
              <div className="text-neutral-charcoal/70 dark:text-white/70">Primary Service Areas</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-brand-deep-blue dark:text-brand-bright-blue">18+</div>
              <div className="text-neutral-charcoal/70 dark:text-white/70">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Massachusetts Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-brand-deep-blue dark:text-brand-bright-blue">Massachusetts</h2>
              <span className="text-lg text-neutral-charcoal/70 dark:text-white/70">
                ({massachusettsLocations.length} locations)
              </span>
            </div>
            <div className="w-[40%] h-0.5 bg-brand-deep-blue dark:bg-brand-bright-blue mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {massachusettsLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group min-h-[280px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-brand-bright-blue dark:group-hover:text-brand-bright-blue transition-colors">
                    {location.name}
                  </h3>
                  <svg
                    className="w-6 h-6 text-brand-bright-blue dark:text-brand-bright-blue group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="text-neutral-charcoal/70 dark:text-white/70 mb-4 line-clamp-2 flex-1">{location.description}</p>
                <div className="flex gap-4 text-sm text-neutral-charcoal/60 dark:text-white/60 mt-auto">
                  <div>
                    <span className="font-semibold">Pop:</span> {location.population}
                  </div>
                  <div>
                    <span className="font-semibold">Businesses:</span> {location.businesses}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Connecticut Locations */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 mt-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-brand-deep-blue dark:text-brand-bright-blue">Connecticut</h2>
              <span className="text-lg text-neutral-charcoal/70 dark:text-white/70">
                ({connecticutLocations.length} locations)
              </span>
            </div>
            <div className="w-[40%] h-0.5 bg-brand-deep-blue dark:bg-brand-bright-blue mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connecticutLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group min-h-[280px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-brand-bright-blue dark:group-hover:text-brand-bright-blue transition-colors">
                    {location.name}
                  </h3>
                  <svg
                    className="w-6 h-6 text-brand-bright-blue dark:text-brand-bright-blue group-hover:translate-x-1 transition-transform flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="text-neutral-charcoal/70 dark:text-white/70 mb-4 line-clamp-2 flex-1">{location.description}</p>
                <div className="flex gap-4 text-sm text-neutral-charcoal/60 dark:text-white/60 mt-auto">
                  <div>
                    <span className="font-semibold">Pop:</span> {location.population}
                  </div>
                  <div>
                    <span className="font-semibold">Businesses:</span> {location.businesses}
                  </div>
                </div>
              </Link>
            ))}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Professional Commercial Cleaning?
          </h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Select your location above to learn more, or contact us today for a free quote tailored
            to your facility&apos;s needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-brand-bright-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:4133065053"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-bright-blue transition-colors"
            >
              Call (413) 306-5053 Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
