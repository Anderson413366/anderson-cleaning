'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import {
  ArrowRight,
  Award,
  Building,
  Building2,
  CheckCircle2,
  ChevronRight,
  Factory,
  MapPin,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { GlassIcon } from '@/components/ui/GlassIcon'
import StructuredData from '@/components/StructuredData'
import QuoteMiniForm from '@/components/forms/QuoteMiniForm'
import QuoteAdvancedModal from '@/components/forms/QuoteAdvancedModal'
import FAQAccordion from '@/components/services/FAQAccordion'
import { serviceSlugs, servicesData } from '@/lib/services-data'

// Dynamic import for ServiceAreaMap to avoid SSR issues
const ServiceAreaMap = dynamic(() => import('@/components/maps/ServiceAreaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 bg-neutral-light-grey dark:bg-slate-800 flex items-center justify-center">
      <span className="text-neutral-charcoal/70 dark:text-white/80">Loading map...</span>
    </div>
  ),
})

export default function ServicesPage() {
  const [showAdvancedModal, setShowAdvancedModal] = useState(false)
  const trainingHours = 40 // Static value - no animation needed
  const statsRef = useRef<HTMLDivElement>(null)
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Cleaning Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Anderson Cleaning Company',
      image: 'https://andersoncleaning.com/logo.png',
      '@id': 'https://andersoncleaning.com',
      url: 'https://andersoncleaning.com',
      telephone: '+1-413-306-5053',
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
        latitude: 42.107,
        longitude: -72.6209,
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Springfield',
          containedIn: { '@type': 'State', name: 'Massachusetts' },
        },
        {
          '@type': 'City',
          name: 'Northampton',
          containedIn: { '@type': 'State', name: 'Massachusetts' },
        },
        {
          '@type': 'City',
          name: 'Enfield',
          containedIn: { '@type': 'State', name: 'Connecticut' },
        },
      ],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Office & Commercial Cleaning',
            description:
              'Daily and weekly cleaning programs for office buildings and commercial facilities',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Janitorial Services',
            description: 'Comprehensive facility care with dedicated teams and quality control',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Floor & Carpet Care',
            description: 'Professional floor maintenance including strip, wax, and carpet cleaning',
          },
        },
      ],
    },
  }

  const services = serviceSlugs.map((slug) => servicesData[slug])

  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">
      <StructuredData schema={jsonLd} />

      {/* Hero - Reduced height (20% less than homepage) with breadcrumb navigation */}
      <section className="relative bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        {/* Subtle diagonal pattern overlay for visual differentiation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 40px)',
        }} aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-150">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>
                <span className="text-white font-semibold" aria-current="page">
                  Services
                </span>
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-[40px] md:text-5xl font-extrabold mb-6 leading-tight">
              The Region&apos;s Premier Commercial Cleaning Service
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Western Massachusetts and Northern Connecticut programs built around your facility&apos;s compliance standards
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

      {/* Onboarding Process - Timeline with scroll animations */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              How We Get Started
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              From first contact to consistent quality—here's our customer-focused onboarding journey
            </p>
          </div>

          {/* Timeline - Vertical on mobile, horizontal on desktop */}
          <div className="max-w-6xl mx-auto">
            {/* Timeline steps data */}
            {(() => {
              const steps = [
                {
                  step: '1',
                  title: 'Facility Walk-Through',
                  description: 'We tour your space to understand layout, traffic patterns, and special requirements. Free consultation, no obligation.',
                  timeframe: '1-2 days',
                },
                {
                  step: '2',
                  title: 'Custom SOPs',
                  description: 'We create detailed Standard Operating Procedures specific to your facility—no cookie-cutter checklists.',
                  timeframe: '2-3 days',
                },
                {
                  step: '3',
                  title: 'Team Training',
                  description: 'Our staff receives 40+ hours of training plus facility-specific instruction before they ever clean your space.',
                  timeframe: '3-4 days',
                },
                {
                  step: '4',
                  title: 'Supervised Start',
                  description: 'First week includes extra oversight and quality checks to ensure we meet your standards from day one.',
                  timeframe: '5-7 days',
                },
              ]

              return (
                <>
                  {/* Mobile: Vertical Timeline */}
                  <div className="md:hidden space-y-8 relative">
                    {/* Vertical connecting line - 1px #E0E0E0 */}
                    <div className="absolute left-5 top-10 bottom-10 w-px bg-[#E0E0E0] dark:bg-slate-600" aria-hidden="true" />

                    {steps.map((item, i) => (
                      <div key={i} className="relative flex gap-5">
                        {/* Step circle - 40px #0077D9 with white number */}
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-bright-blue text-white font-bold text-base z-10">
                          {item.step}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <h3 className="text-lg font-semibold text-neutral-charcoal dark:text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-neutral-charcoal/80 dark:text-white/80 mb-2">
                            {item.description}
                          </p>
                          {/* Duration label - 12px, WCAG compliant */}
                          <span className="text-xs text-neutral-charcoal/80 dark:text-white/80">
                            {item.timeframe}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: Horizontal Timeline */}
                  <div className="hidden md:block relative">
                    {/* Horizontal connecting line - 1px #E0E0E0 */}
                    <div className="absolute left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] top-5 h-px bg-[#E0E0E0] dark:bg-slate-600" aria-hidden="true" />

                    <div className="grid grid-cols-4 gap-8">
                      {steps.map((item, i) => (
                        <div key={i} className="text-center">
                          {/* Step circle - 40px #0077D9 with white number */}
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-bright-blue text-white font-bold text-base mb-4 relative z-10">
                            {item.step}
                          </div>

                          <h3 className="text-lg font-semibold text-neutral-charcoal dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-neutral-charcoal/80 dark:text-white/80 mb-3">
                            {item.description}
                          </p>
                          {/* Duration label - 12px, WCAG compliant */}
                          <span className="text-xs text-neutral-charcoal/80 dark:text-white/80">
                            {item.timeframe}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )
            })()}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20 border-2 border-brand-bright-blue/30">
              <CheckCircle2 className="h-5 w-5 text-brand-bright-blue" />
              <p className="text-neutral-charcoal dark:text-white font-semibold">
                <strong>Total Timeline:</strong> Most clients are fully onboarded within 7-10 business days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Fixed height cards for visual consistency */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          {/* 3-column grid with fixed card dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[980px] mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <a
                  key={i}
                  href={`/services/${service.slug}`}
                  className="block h-[280px] bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-bright-blue hover:shadow-lg"
                >
                  {/* Icon - 56px circle #0077D9 */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-bright-blue mb-4">
                    <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>

                  {/* Title - 16px bold #002A86 */}
                  <h3 className="text-base font-bold text-brand-deep-blue dark:text-white mb-2">
                    {service.title}
                  </h3>

                  {/* Description - 14px #666666, 2 lines max with ellipsis */}
                  <p className="text-sm text-[#666666] dark:text-white/70 line-clamp-2">
                    {service.tagline}
                  </p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance - Full-width banner with Deep Blue background */}
      <section ref={statsRef} className="relative py-20 bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.1) 30px, rgba(255, 255, 255, 0.1) 60px)',
        }} aria-hidden="true" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm font-semibold text-white uppercase tracking-wide">Industry-Leading Standards</span>
            </div>
            <h2 className="text-h2 leading-tight font-bold text-white mb-4">
              Our Quality Assurance Process
            </h2>
            <p className="text-xl text-white/90">
              Every service includes our corporate-grade quality standards backed by certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: 'Trained Staff',
                stat: `${trainingHours}+`,
                label: 'Hours Training',
                badge: 'OSHA Certified'
              },
              {
                icon: CheckCircle2,
                title: 'Quality Checklists',
                stat: '100%',
                label: 'Service Documentation',
                badge: 'ISO 9001'
              },
              {
                icon: Shield,
                title: 'Regular Audits',
                stat: 'Weekly',
                label: 'Quality Inspections',
                badge: 'CIMS Certified'
              },
              {
                icon: Sparkles,
                title: 'Corrective Action',
                stat: '< 24hrs',
                label: 'Response Time',
                badge: 'Green Seal'
              },
            ].map((item, i) => {
              return (
                <div key={i} className="text-center bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
                  {/* Glass-effect icon - Large (64px) for quality assurance section */}
                  <div className="mb-4 flex justify-center">
                    <GlassIcon icon={item.icon} size="lg" variant="light" label={item.title} />
                  </div>

                  {/* Animated stat */}
                  <div className="text-4xl font-bold text-white mb-2">
                    {item.stat}
                  </div>

                  <h3 className="font-bold text-white mb-1 text-lg">{item.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{item.label}</p>

                  {/* Certification badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/90 text-white text-xs font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    {item.badge}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Additional certifications banner */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-white" />
                <span className="text-white font-semibold">Fully Insured & Bonded</span>
              </div>
              <div className="w-px h-8 bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span className="text-white font-semibold">Background Checked Staff</span>
              </div>
              <div className="w-px h-8 bg-white/30" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-white" />
                <span className="text-white font-semibold">18+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-4">
              Proven Results
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-3xl mx-auto">
              Real examples of how we've helped businesses in Western Massachusetts and Northern Connecticut achieve their facility goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Healthcare Facility Cost Reduction',
                location: 'Springfield, MA',
                industry: 'Healthcare',
                facilitySize: '45,000 sq ft medical complex',
                metricNumber: '28%',
                metricLabel: 'Cost Reduction',
                progress: 72,
                description:
                  'This multi-specialty medical complex with 12 exam rooms and 3 procedure suites was spending $8,200/month on cleaning with inconsistent results. We implemented OSHA-compliant infection control protocols, optimized their supply chain to eliminate waste, and deployed a dedicated 4-person evening team. Within 90 days, monthly costs dropped to $5,900 while patient satisfaction scores improved by 15 points.',
                icon: Building2,
              },
              {
                title: 'Zero Complaints Achievement',
                location: 'Springfield, MA',
                industry: 'Corporate Office',
                facilitySize: '3-floor, 200-employee HQ',
                metricNumber: 'Zero',
                metricLabel: 'Complaints in 6 Months',
                progress: 100,
                description:
                  'A regional insurance headquarters was receiving 4-6 cleaning complaints weekly from staff, damaging workplace morale. We conducted a facility audit, identified 23 recurring problem areas, and created custom checklists with photo documentation. Our dedicated account manager performs weekly walk-throughs with their facilities director. Result: zero complaints logged in 6 consecutive months.',
                icon: Building,
              },
              {
                title: 'Post-Construction Excellence',
                location: 'Chicopee, MA',
                industry: 'Manufacturing',
                facilitySize: '120,000 sq ft production floor',
                metricNumber: '100%',
                metricLabel: 'On Time & Budget',
                progress: 100,
                description:
                  'After a $2.3M facility expansion, this precision manufacturing plant needed move-in ready cleanup within a tight 5-day window before production restart. We mobilized a 12-person crew working double shifts, removing construction debris, degreasing equipment surfaces, and achieving cleanroom-adjacent standards. Delivered 2 days early, saving the client an estimated $45,000 in delayed production costs.',
                icon: Factory,
              },
            ].map((study) => (
              <div
                key={study.title}
                className="relative bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-6 min-h-[380px] hover:border-brand-bright-blue dark:hover:border-brand-bright-blue hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Industry icon badge - top-right - Small (32px) to save space */}
                <div className="absolute top-5 right-5">
                  <GlassIcon icon={study.icon} size="sm" variant="solid" label={study.industry} />
                </div>

                {/* Large red metric number */}
                <div className="mb-3">
                  <div className="text-4xl font-bold text-brand-red mb-0.5" style={{ lineHeight: '1' }}>
                    {study.metricNumber}
                  </div>
                  <div className="text-xs font-semibold text-neutral-charcoal/70 dark:text-white/70 uppercase tracking-wide">
                    {study.metricLabel}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-charcoal dark:text-white mb-2 pr-10">
                  {study.title}
                </h3>

                {/* Location, industry, and facility size */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-charcoal/60 dark:text-white/70 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {study.location}
                  </span>
                  <span>•</span>
                  <span>{study.facilitySize}</span>
                </div>

                {/* Description - flex-grow to fill remaining space */}
                <p className="text-sm text-neutral-charcoal/80 dark:text-white/80 leading-relaxed flex-grow">
                  {study.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/case-studies">
              <Button variant="outline" size="lg">
                View All Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Service Area */}
      <section className="pt-24 pb-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-brand-deep-blue dark:text-white mb-4">
              Our Service Area
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-3xl mx-auto">
              We proudly serve commercial facilities throughout Western Massachusetts and Northern Connecticut, within a 100-mile radius of our West Springfield headquarters.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ServiceAreaMap />

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-neutral-off-white dark:bg-slate-800 rounded-lg p-6">
                <h3 className="text-h3 font-semibold text-neutral-charcoal dark:text-white mb-3">
                  Primary Service Area
                </h3>
                <ul className="space-y-2 text-body-sm text-neutral-charcoal/70 dark:text-white/80">
                  {[
                    'Western Massachusetts',
                    'Northern Connecticut',
                    '100-mile radius of West Springfield',
                  ].map((area) => (
                    <li key={area} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-off-white dark:bg-slate-800 rounded-lg p-6">
                <h3 className="text-h3 font-semibold text-neutral-charcoal dark:text-white mb-3">
                  Major Cities Served
                </h3>
                <ul className="space-y-2 text-body-sm text-neutral-charcoal/70 dark:text-white/80">
                  {['Springfield, MA', 'Northampton, MA', 'Pittsfield, MA', 'Enfield, CT'].map((city) => (
                    <li key={city} className="flex items-start">
                      <MapPin className="h-5 w-5 text-brand-bright-blue mr-2 mt-0.5 flex-shrink-0" />
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ - Interactive Accordion with IntersectionObserver */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion
            faqs={[
              {
                question: 'Are you insured and bonded?',
                answer: [
                  'Comprehensive general liability insurance',
                  "Workers' compensation insurance",
                  'All staff undergo background checks',
                ],
              },
              {
                question: 'Do you provide cleaning supplies and equipment?',
                answer: [
                  'All cleaning supplies included',
                  'Professional equipment provided',
                  'Optional: Supply Management service for consumables (paper, soap, etc.)',
                ],
              },
              {
                question: 'How do you ensure quality?',
                answer: [
                  'Detailed checklists for every service',
                  'Regular quality audits',
                  'Corrective action within 24 hours',
                ],
              },
              {
                question: 'What is your onboarding process?',
                answer: [
                  '1. Comprehensive facility walk-through',
                  '2. Create custom SOPs for your space',
                  '3. Train our team on your requirements',
                  '4. Supervised cleaning for the first week',
                ],
              },
              {
                question: 'Can I get project/specialty work without a regular contract?',
                answer: [
                  'No—project work requires an active cleaning contract',
                  'Includes: floor care, windows, post-construction',
                  'Why: Ensures proper scheduling & resource allocation',
                ],
              },
            ]}
            defaultExpanded={3}
          />
        </div>
      </section>

      <QuoteAdvancedModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
      />
    </div>
  )
}
