import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Building2, Users, Clock, Heart, ShoppingBag, Factory, ArrowRight, Briefcase, Sparkles, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BreadcrumbSchema, LocalBusinessSchema } from '@/components/Schema'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

// City data configuration
interface CityData {
  city: string
  state: string
  stateFullz: string
  population: string
  businessCount: string
  zipCodes: string[]
  serviceRadius: string
  responseTime: string
  landmarks: string[]
  industries: string[]
  testimonials: Array<{
    text: string
    author: string
    company: string
    rating: number
  }>
  competitors: string[]
  whyChooseUs: string[]
}

const CITY_DATA: Record<string, CityData> = {
  'springfield-ma': {
    city: 'Springfield',
    state: 'MA',
    stateFullz: 'Massachusetts',
    population: '155,000',
    businessCount: '4,200+',
    zipCodes: ['01101', '01102', '01103', '01104', '01105', '01107', '01108', '01109'],
    serviceRadius: '15 miles',
    responseTime: '2-4 hours',
    landmarks: ['MassMutual Center', 'Basketball Hall of Fame', 'MGM Springfield'],
    industries: ['Healthcare', 'Education', 'Finance', 'Manufacturing'],
    testimonials: [
      {
        text: 'Anderson Cleaning transformed our Springfield medical facility. Their attention to healthcare protocols is unmatched.',
        author: 'Dr. Sarah Mitchell',
        company: 'Springfield Family Medicine',
        rating: 5,
      },
      {
        text: 'Reliable, professional, and always responsive. They handle our downtown office building with excellence.',
        author: 'James Patterson',
        company: 'Springfield Tower Office Complex',
        rating: 5,
      },
    ],
    competitors: ['ServiceMaster', 'Jani-King', 'Office Pride'],
    whyChooseUs: [
      'Local Springfield team with 18+ years serving the area',
      'Fastest response time in the Pioneer Valley',
      'Only CIMS-certified cleaner headquartered in Western MA',
      'Emergency response within 2 hours for Springfield clients',
    ],
  },
  'west-springfield-ma': {
    city: 'West Springfield',
    state: 'MA',
    stateFullz: 'Massachusetts',
    population: '28,000',
    businessCount: '1,200+',
    zipCodes: ['01089', '01090'],
    serviceRadius: '10 miles',
    responseTime: '1-2 hours',
    landmarks: ['The Big E Fairgrounds', 'Eastern States Exposition', 'West Springfield Town Hall'],
    industries: ['Retail', 'Professional Services', 'Light Manufacturing', 'Healthcare'],
    testimonials: [
      {
        text: 'As a West Springfield business, having Anderson just minutes away means incredible service. They respond immediately when we need them.',
        author: 'Michael Thompson',
        company: 'West Side Professional Building',
        rating: 5,
      },
      {
        text: 'Our retail space has never looked better. Anderson understands the importance of first impressions.',
        author: 'Lisa Chen',
        company: 'West Springfield Shopping Plaza',
        rating: 5,
      },
    ],
    competitors: ['ABM Industries', 'Coverall'],
    whyChooseUs: [
      'Headquartered in West Springfield - we\'re your neighbors',
      'Same-day service available for local businesses',
      'Deep knowledge of West Springfield building codes and requirements',
      'Preferred vendor for multiple West Springfield properties',
    ],
  },
  'hartford-ct': {
    city: 'Hartford',
    state: 'CT',
    stateFullz: 'Connecticut',
    population: '121,000',
    businessCount: '5,500+',
    zipCodes: ['06101', '06102', '06103', '06104', '06105', '06106', '06112', '06114'],
    serviceRadius: '20 miles',
    responseTime: '4-6 hours',
    landmarks: ['Connecticut State Capitol', 'XL Center', 'Connecticut Convention Center', 'Bushnell Park'],
    industries: ['Insurance', 'Healthcare', 'Government', 'Finance'],
    testimonials: [
      {
        text: 'Anderson handles our Hartford corporate headquarters with professionalism and reliability. They understand the standards required for Class A office space.',
        author: 'Jennifer Rodriguez',
        company: 'Hartford Financial Plaza',
        rating: 5,
      },
      {
        text: 'Excellent service for our downtown Hartford medical practice. HIPAA-compliant and always on time.',
        author: 'Dr. Robert Kim',
        company: 'Hartford Medical Associates',
        rating: 5,
      },
    ],
    competitors: ['C&W Services', 'Pritchard Industries'],
    whyChooseUs: [
      'Dedicated Hartford area team familiar with CT regulations',
      'Experience with Class A Hartford office buildings',
      'Connecticut licensed and insured',
      'Serving Hartford\'s insurance district since 2007',
    ],
  },
  'worcester-county-ma': {
    city: 'Worcester County',
    state: 'MA',
    stateFullz: 'Massachusetts',
    population: '830,000',
    businessCount: '18,000+',
    zipCodes: ['01501', '01504', '01505', '01506', '01520', '01534', '01545', '01568', '01581', '01602', '01603', '01604', '01605', '01606', '01607', '01608', '01609', '01610'],
    serviceRadius: '25 miles',
    responseTime: '4-6 hours',
    landmarks: ['Worcester City Hall', 'DCU Center', 'Polar Park', 'Worcester Art Museum'],
    industries: ['Healthcare', 'Education', 'Biotechnology', 'Manufacturing'],
    testimonials: [
      {
        text: 'Our Worcester manufacturing facility requires specialized cleaning. Anderson delivers consistent quality.',
        author: 'Mark Sullivan',
        company: 'Worcester Industrial Park',
        rating: 5,
      },
      {
        text: 'Professional service for our medical office. They understand healthcare facility requirements.',
        author: 'Dr. Patricia Wong',
        company: 'Worcester Medical Center',
        rating: 5,
      },
    ],
    competitors: ['UniFirst', 'Jan-Pro'],
    whyChooseUs: [
      'Serving Worcester County businesses for nearly two decades',
      'Experience with diverse facility types across the county',
      'Flexible scheduling for manufacturing and healthcare facilities',
      'Proven track record with Worcester\'s major employers',
    ],
  },
  'northampton-amherst-ma': {
    city: 'Northampton & Amherst',
    state: 'MA',
    stateFullz: 'Massachusetts',
    population: '90,000',
    businessCount: '2,800+',
    zipCodes: ['01002', '01003', '01060', '01062', '01063'],
    serviceRadius: '15 miles',
    responseTime: '3-5 hours',
    landmarks: ['Smith College', 'UMass Amherst', 'Amherst College', 'Northampton Town Hall'],
    industries: ['Education', 'Healthcare', 'Technology', 'Professional Services'],
    testimonials: [
      {
        text: 'Anderson provides excellent service for our Northampton professional building. Eco-friendly products were a must for us.',
        author: 'Rachel Green',
        company: 'Northampton Professional Center',
        rating: 5,
      },
      {
        text: 'Reliable cleaning for our Amherst tech startup. They work around our flexible schedule.',
        author: 'David Patel',
        company: 'Amherst Innovation Hub',
        rating: 5,
      },
    ],
    competitors: ['Green Clean', 'Pioneer Valley Cleaning'],
    whyChooseUs: [
      'Green cleaning options for environmentally-conscious Pioneer Valley businesses',
      'Flexible schedules for educational and research facilities',
      'Experience with historic buildings and modern facilities',
      'Supporting the local Northampton/Amherst business community',
    ],
  },
  'chicopee-ma': {
    city: 'Chicopee',
    state: 'MA',
    stateFullz: 'Massachusetts',
    population: '55,000',
    businessCount: '1,500+',
    zipCodes: ['01013', '01020', '01021', '01022'],
    serviceRadius: '10 miles',
    responseTime: '1-3 hours',
    landmarks: ['Chicopee City Hall', 'Westover Air Reserve Base', 'Chicopee Memorial State Park'],
    industries: ['Manufacturing', 'Retail', 'Healthcare', 'Government'],
    testimonials: [
      {
        text: 'Our Chicopee warehouse gets heavy use. Anderson keeps it clean and safe for our staff.',
        author: 'Tom Bradley',
        company: 'Chicopee Distribution Center',
        rating: 5,
      },
      {
        text: 'Professional, affordable, and local. Everything we need for our small business.',
        author: 'Maria Santos',
        company: 'Chicopee Medical Supplies',
        rating: 5,
      },
    ],
    competitors: ['Molly Maid Commercial', 'Merry Maids'],
    whyChooseUs: [
      'Quick response times for Chicopee businesses',
      'Experience with industrial and manufacturing facilities',
      'Family-owned company serving Chicopee for 18+ years',
      'Competitive pricing for small to mid-size businesses',
    ],
  },
  'holyoke-ma': {
    city: 'Holyoke',
    state: 'MA',
    stateFullz: 'Massachusetts',
    population: '38,000',
    businessCount: '1,100+',
    zipCodes: ['01040', '01041'],
    serviceRadius: '12 miles',
    responseTime: '2-4 hours',
    landmarks: ['Holyoke City Hall', 'Holyoke Medical Center', 'Holyoke Mall', 'Mount Tom'],
    industries: ['Healthcare', 'Retail', 'Education', 'Paper Manufacturing'],
    testimonials: [
      {
        text: 'Anderson understands the unique needs of historic Holyoke mill buildings. Excellent work.',
        author: 'Kevin Murphy',
        company: 'Holyoke Innovation District',
        rating: 5,
      },
      {
        text: 'Our Holyoke retail location has benefited from their consistent, high-quality service.',
        author: 'Amanda Foster',
        company: 'Holyoke Mall Retailer',
        rating: 5,
      },
    ],
    competitors: ['Servpro', 'Stanley Steemer Commercial'],
    whyChooseUs: [
      'Experience with Holyoke\'s historic mill buildings and modern facilities',
      'Strong relationships with Holyoke business community',
      'Specialized floor care for high-traffic retail spaces',
      'Part of the Holyoke area for nearly two decades',
    ],
  },
  'enfield-ct': {
    city: 'Enfield',
    state: 'CT',
    stateFullz: 'Connecticut',
    population: '42,000',
    businessCount: '1,300+',
    zipCodes: ['06082', '06083'],
    serviceRadius: '15 miles',
    responseTime: '3-5 hours',
    landmarks: ['Enfield Town Hall', 'Enfield Square Mall', 'Connecticut Trolley Museum'],
    industries: ['Retail', 'Manufacturing', 'Healthcare', 'Professional Services'],
    testimonials: [
      {
        text: 'Reliable service for our Enfield office park. Always professional and thorough.',
        author: 'Steven Martinez',
        company: 'Enfield Business Park',
        rating: 5,
      },
      {
        text: 'Great communication and quality work. They make managing our facility easy.',
        author: 'Nicole Johnson',
        company: 'Enfield Medical Office',
        rating: 5,
      },
    ],
    competitors: ['Cleaning Authority', 'Molly Maid'],
    whyChooseUs: [
      'Connecticut licensed and insured with MA headquarters nearby',
      'Familiar with Connecticut commercial property regulations',
      'Quick response times from nearby West Springfield',
      'Competitive pricing for Enfield area businesses',
    ],
  },
  'windsor-ct': {
    city: 'Windsor',
    state: 'CT',
    stateFullz: 'Connecticut',
    population: '29,000',
    businessCount: '900+',
    zipCodes: ['06006', '06095'],
    serviceRadius: '15 miles',
    responseTime: '3-5 hours',
    landmarks: ['Windsor Town Hall', 'Windsor Historical Society', 'Northwest Park'],
    industries: ['Insurance', 'Healthcare', 'Professional Services', 'Technology'],
    testimonials: [
      {
        text: 'Our Windsor office building has been with Anderson for years. Consistently excellent service.',
        author: 'Brian Walsh',
        company: 'Windsor Corporate Center',
        rating: 5,
      },
      {
        text: 'Professional team that understands the needs of healthcare facilities. Highly recommend.',
        author: 'Dr. Susan Lee',
        company: 'Windsor Family Practice',
        rating: 5,
      },
    ],
    competitors: ['Anago Cleaning', 'Vanguard Cleaning'],
    whyChooseUs: [
      'Serving Windsor businesses with Massachusetts quality standards',
      'Experience with Connecticut healthcare and insurance facilities',
      'Reliable cross-border service with local accountability',
      'Long-term relationships with Windsor commercial properties',
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(CITY_DATA).map((city) => ({
    city: city,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const cityData = CITY_DATA[city]

  if (!cityData) {
    return {
      title: 'Location Not Found',
    }
  }

  const title = `Commercial Cleaning ${cityData.city}, ${cityData.state} | Office Cleaning Services`
  const description = `Professional commercial cleaning services in ${cityData.city}, ${cityData.state}. Office cleaning, janitorial services, healthcare facilities. Free quotes, licensed & insured. Call (413) 306-5053.`

  return {
    title,
    description,
    keywords: [
      `commercial cleaning ${cityData.city}`,
      `office cleaning ${cityData.city}`,
      `janitorial services ${cityData.city} ${cityData.state}`,
      `${cityData.city} cleaning company`,
      `professional cleaners ${cityData.city}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://andersoncleaning.com/locations/${city}`,
      siteName: 'Anderson Cleaning Company',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `https://andersoncleaning.com/locations/${city}`,
    },
  }
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const cityData = CITY_DATA[city]

  if (!cityData) {
    notFound()
  }

  // Breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: 'https://andersoncleaning.com' },
    { name: 'Locations', url: 'https://andersoncleaning.com/locations' },
    {
      name: `${cityData.city}, ${cityData.state}`,
      url: `https://andersoncleaning.com/locations/${city}`,
    },
  ]

  return (
    <div className="min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <LocalBusinessSchema serviceArea={`${cityData.city}, ${cityData.stateFullz}`} />
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-extrabold mb-6 leading-tight">
                Commercial Cleaning Services in {cityData.city}, {cityData.state}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Professional B2B cleaning services for offices, medical facilities, and commercial
                properties throughout {cityData.city} and surrounding areas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/quote">
                  <Button variant="accent" size="lg" className="min-w-[220px]">
                    Request a Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-12 pt-12 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <AnimatedCounter
                  value={cityData.businessCount}
                  label="Businesses Served"
                  icon={<Building2 className="h-6 w-6 text-white" strokeWidth={2} />}
                />
                <AnimatedCounter
                  value={cityData.population}
                  label="Population"
                  icon={<Users className="h-6 w-6 text-white" strokeWidth={2} />}
                />
                <AnimatedCounter
                  value={cityData.responseTime}
                  label="Response Time"
                  icon={<Clock className="h-6 w-6 text-white" strokeWidth={2} />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in City - Simplified */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Commercial Cleaning Services in {cityData.city}
              </h2>
              <p className="text-lg text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
                Professional commercial cleaning solutions for {cityData.city} businesses across all industries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Office Cleaning */}
              <Link
                href="/services/office-cleaning"
                className="group bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                      Office Cleaning
                    </h3>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-relaxed line-clamp-2">
                      Daily janitorial services for corporate offices and professional buildings in {cityData.city}.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>

              {/* Healthcare Cleaning */}
              <Link
                href="/services/healthcare-cleaning"
                className="group bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                      Healthcare Cleaning
                    </h3>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-relaxed line-clamp-2">
                      OSHA-compliant cleaning for medical offices, clinics, and dental practices in {cityData.city}.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>

              {/* Retail Cleaning */}
              <Link
                href="/services/retail-cleaning"
                className="group bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                      Retail Cleaning
                    </h3>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-relaxed line-clamp-2">
                      Maintain pristine storefronts and shopping centers throughout {cityData.city}.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>

              {/* Industrial Cleaning */}
              <Link
                href="/services/industrial-cleaning"
                className="group bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                    <Factory className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                      Industrial Cleaning
                    </h3>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-relaxed line-clamp-2">
                      Heavy-duty cleaning for manufacturing and warehouse facilities in {cityData.city}.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>

              {/* Floor Care */}
              <Link
                href="/services/floor-care"
                className="group bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                      Floor Care & Maintenance
                    </h3>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-relaxed line-clamp-2">
                      Professional floor stripping, waxing, and polishing services for {cityData.city} facilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>

              {/* Specialty Services */}
              <Link
                href="/services"
                className="group bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                      All Services
                    </h3>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-relaxed line-clamp-2">
                      View our complete range of commercial cleaning services available in {cityData.city}.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>View All Services</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Businesses Near */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Trusted by Businesses Near {cityData.city} Landmarks
              </h2>
              <p className="text-lg text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
                We proudly serve commercial clients throughout {cityData.city} and surrounding areas.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cityData.landmarks.map((landmark, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-brand-bright-blue hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-charcoal dark:text-white leading-tight">
                      {landmark}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for City */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            Why {cityData.city} Businesses Choose Anderson Cleaning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cityData.whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-brand-deep-blue text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-neutral-charcoal/80 dark:text-white/80">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Serving All {cityData.city} ZIP Codes
            </h3>
            <p className="mb-4">
              Our teams provide commercial cleaning throughout {cityData.city}, including:
            </p>
            <div className="flex flex-wrap gap-3">
              {cityData.zipCodes.map((zip) => (
                <span key={zip} className="bg-white/20 px-3 py-1 rounded">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">
            What {cityData.city} Businesses Say About Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cityData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-charcoal/80 dark:text-white/80 mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Our {cityData.city} Service Area</h2>
          <p className="text-lg text-neutral-charcoal/70 dark:text-white/70 mb-8">
            We serve all of {cityData.city} and surrounding communities within{' '}
            {cityData.serviceRadius}.
          </p>

          {/* Service Area Description */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Coverage Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-brand-bright-blue dark:text-brand-bright-blue">
                  Primary Service Area
                </h4>
                <p className="text-neutral-charcoal/70 dark:text-white/70">
                  All businesses within {cityData.city} city limits receive priority scheduling
                  with response times of {cityData.responseTime}.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-brand-bright-blue dark:text-brand-bright-blue">
                  Extended Service Radius
                </h4>
                <p className="text-neutral-charcoal/70 dark:text-white/70">
                  We also serve businesses within {cityData.serviceRadius} of {cityData.city},
                  ensuring comprehensive coverage for the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Industries We Serve in {cityData.city}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cityData.industries.map((industry) => (
              <div key={industry} className="text-center">
                <div className="bg-brand-bright-blue/10 dark:bg-brand-bright-blue/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-brand-bright-blue dark:text-brand-bright-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Anderson Cleaning Company',
            image: 'https://andersoncleaning.com/logo.png',
            '@id': 'https://andersoncleaning.com',
            url: 'https://andersoncleaning.com',
            telephone: '+14133065053',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '103 Wayside Avenue',
              addressLocality: 'West Springfield',
              addressRegion: 'MA',
              postalCode: '01089',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 42.1070,
              longitude: -72.6209,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '09:00',
              closes: '17:00',
            },
            sameAs: [
              'https://www.facebook.com/andersoncleaningma',
              'https://www.linkedin.com/company/anderson-cleaning',
            ],
            areaServed: {
              '@type': 'City',
              name: cityData.city,
              containedIn: {
                '@type': 'State',
                name: cityData.stateFullz,
              },
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Commercial Cleaning Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Office Cleaning',
                    description: `Professional office cleaning services in ${cityData.city}, ${cityData.state}`,
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Healthcare Facility Cleaning',
                    description: `Medical office cleaning services in ${cityData.city}, ${cityData.state}`,
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Commercial Janitorial Services',
                    description: `Janitorial services for businesses in ${cityData.city}, ${cityData.state}`,
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started with {cityData.city}&apos;s Premier Commercial Cleaning Service?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Join hundreds of {cityData.city} businesses that trust Anderson Cleaning for their
            facilities.
          </p>
          {/* Single Primary CTA */}
          <Link
            href="/quote"
            className="inline-block bg-brand-bright-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#006bc4] transition-colors shadow-lg"
          >
            Request a Quote
          </Link>
          {/* Secondary phone link */}
          <p className="mt-6 text-white/90">
            Or call us directly:{' '}
            <a
              href="tel:4133065053"
              className="underline hover:text-white transition-colors font-semibold"
            >
              (413) 306-5053
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
