'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import {
  ArrowRight,
  Award,
  Building,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Factory,
  FileCheck,
  HardHat,
  MapPin,
  Shield,
  Sparkles,
  Square,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { GlassIcon, GlassIconWithBadge } from '@/components/ui/GlassIcon'
import StructuredData from '@/components/StructuredData'
import QuoteMiniForm from '@/components/forms/QuoteMiniForm'
import QuoteAdvancedModal from '@/components/forms/QuoteAdvancedModal'
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
  const [trainingHours, setTrainingHours] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([0]) // First FAQ expanded by default
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
          name: 'Worcester',
          containedIn: { '@type': 'State', name: 'Massachusetts' },
        },
        {
          '@type': 'City',
          name: 'Hartford',
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

  // Animated counter effect for training hours
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && trainingHours === 0) {
            let current = 0
            const target = 40
            const duration = 2000 // 2 seconds
            const increment = target / (duration / 16) // 60fps

            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                setTrainingHours(target)
                clearInterval(timer)
              } else {
                setTrainingHours(Math.floor(current))
              }
            }, 16)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [trainingHours])

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
            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden space-y-12 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-deep-blue/20 dark:bg-brand-bright-blue/20" aria-hidden="true" />

              {[
                {
                  icon: ClipboardList,
                  step: '1',
                  title: 'Facility Walk-Through',
                  description: 'We tour your space to understand layout, traffic patterns, and special requirements. Free consultation, no obligation.',
                  timeframe: '1-2 days',
                },
                {
                  icon: FileCheck,
                  step: '2',
                  title: 'Custom SOPs',
                  description: 'We create detailed Standard Operating Procedures specific to your facility—no cookie-cutter checklists.',
                  timeframe: '2-3 days',
                },
                {
                  icon: UserCheck,
                  step: '3',
                  title: 'Team Training',
                  description: 'Our staff receives 40+ hours of training plus facility-specific instruction before they ever clean your space.',
                  timeframe: '3-4 days',
                },
                {
                  icon: TrendingUp,
                  step: '4',
                  title: 'Supervised Start',
                  description: 'First week includes extra oversight and quality checks to ensure we meet your standards from day one.',
                  timeframe: '5-7 days',
                },
              ].map((item, i) => {
                return (
                  <div key={i} className="relative flex gap-6 animate-fade-in">
                    {/* Glass-effect circular icon with step number badge - Large (64px) */}
                    <div className="flex-shrink-0">
                      <GlassIconWithBadge
                        icon={item.icon}
                        size="lg"
                        variant="default"
                        badge={item.step}
                        badgeColor="red"
                        label={`Step ${item.step}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-3">
                        {item.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/10 text-sm font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                        <Clock className="h-4 w-4" />
                        {item.timeframe}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
              {/* Horizontal connecting line */}
              <div className="absolute left-0 right-0 top-8 h-0.5 bg-brand-deep-blue/20 dark:bg-brand-bright-blue/20 -z-10" aria-hidden="true" />

              {[
                {
                  icon: ClipboardList,
                  step: '1',
                  title: 'Facility Walk-Through',
                  description: 'We tour your space to understand layout, traffic patterns, and special requirements. Free consultation, no obligation.',
                  timeframe: '1-2 days',
                },
                {
                  icon: FileCheck,
                  step: '2',
                  title: 'Custom SOPs',
                  description: 'We create detailed Standard Operating Procedures specific to your facility—no cookie-cutter checklists.',
                  timeframe: '2-3 days',
                },
                {
                  icon: UserCheck,
                  step: '3',
                  title: 'Team Training',
                  description: 'Our staff receives 40+ hours of training plus facility-specific instruction before they ever clean your space.',
                  timeframe: '3-4 days',
                },
                {
                  icon: TrendingUp,
                  step: '4',
                  title: 'Supervised Start',
                  description: 'First week includes extra oversight and quality checks to ensure we meet your standards from day one.',
                  timeframe: '5-7 days',
                },
              ].map((item, i) => {
                return (
                  <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                    {/* Glass-effect circular icon with step number badge - Large (64px) */}
                    <div className="inline-flex mb-6">
                      <GlassIconWithBadge
                        icon={item.icon}
                        size="lg"
                        variant="default"
                        badge={item.step}
                        badgeColor="red"
                        label={`Step ${item.step}`}
                      />
                    </div>

                    <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-4">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/10 text-sm font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                      <Clock className="h-4 w-4" />
                      {item.timeframe}
                    </div>
                  </div>
                )
              })}
            </div>
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

      {/* Services Grid - Standardized responsive layout */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          {/* Consistent 3-column desktop, 2-column tablet, 1-column mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="relative flex flex-col bg-white dark:bg-slate-800 border-2 border-neutral-light-grey dark:border-slate-700 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-bright-blue"
                >
                  {/* Premium badge - top-right positioning */}
                  {service.availability === 'contracted' && (
                    <span
                      className="absolute top-4 right-4 inline-flex items-center px-3 py-1.5 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wide rounded-full"
                      style={{ boxShadow: '0 0 12px rgba(200, 16, 46, 0.3)' }}
                    >
                      Premium Add-on
                    </span>
                  )}

                  <div className="p-8 flex flex-col h-full">
                    {/* Glass-effect icon - Medium (48px) for service cards */}
                    <div className="mb-4">
                      <GlassIcon icon={Icon} size="md" variant="solid" label={service.title} />
                    </div>

                    {/* Title */}
                    <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-3">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-4">
                      {service.tagline}
                    </p>

                    {/* Features list - takes up remaining space */}
                    <ul className="space-y-2 mb-6 flex-grow">
                      {service.highlights.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-start text-body-sm text-neutral-charcoal/80 dark:text-white/80"
                        >
                          <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn More link - always bottom-aligned */}
                    <div className="mt-auto pt-4 border-t border-neutral-light-grey/50 dark:border-slate-700/50">
                      <a
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-brand-deep-blue dark:text-brand-bright-blue font-semibold hover:text-brand-bright-blue dark:hover:text-white transition-colors group"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
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

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Healthcare Facility Cost Reduction',
                location: 'Springfield, MA',
                industry: 'Healthcare',
                metricNumber: '28%',
                metricLabel: 'Cost Reduction',
                progress: 72, // Visual representation
                description:
                  'A major healthcare facility in Springfield reduced their cleaning costs by 28% while improving patient satisfaction scores through our optimized cleaning protocols and supply management.',
                icon: Building2,
              },
              {
                title: 'Zero Complaints Achievement',
                location: 'Hartford, CT',
                industry: 'Corporate Office',
                metricNumber: 'Zero',
                metricLabel: 'Complaints in 6 Months',
                progress: 100,
                description:
                  'A corporate office in Hartford went from receiving weekly cleaning complaints to zero complaints over 6 months with our quality assurance program and dedicated account management.',
                icon: Building,
              },
              {
                title: 'Post-Construction Excellence',
                location: 'Western Massachusetts',
                industry: 'Manufacturing',
                metricNumber: '100%',
                metricLabel: 'On Time & Budget',
                progress: 100,
                description:
                  "A manufacturing plant's post-construction cleanup was completed under budget and ahead of schedule, allowing them to resume operations 2 days early.",
                icon: Factory,
              },
            ].map((study) => (
              <div
                key={study.title}
                className="relative bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 p-8 hover:border-brand-bright-blue dark:hover:border-brand-bright-blue hover:shadow-xl transition-all duration-300"
              >
                {/* Industry icon badge - top-right - Medium (48px) */}
                <div className="absolute top-6 right-6">
                  <GlassIcon icon={study.icon} size="md" variant="solid" label={study.industry} />
                </div>

                {/* Large red metric number */}
                <div className="mb-4">
                  <div className="text-5xl font-bold text-brand-red mb-1" style={{ lineHeight: '1' }}>
                    {study.metricNumber}
                  </div>
                  <div className="text-sm font-semibold text-neutral-charcoal/70 dark:text-white/70 uppercase tracking-wide">
                    {study.metricLabel}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="h-2 bg-neutral-light-grey dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-red to-brand-bright-blue rounded-full transition-all duration-1000"
                      style={{ width: `${study.progress}%` }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-h3 font-semibold text-neutral-charcoal dark:text-white mb-3">
                  {study.title}
                </h3>

                {/* Location and industry */}
                <div className="flex items-center gap-2 text-sm text-neutral-charcoal/60 dark:text-white/80 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {study.location} • {study.industry}
                  </span>
                </div>

                {/* Description */}
                <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">
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
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-4">
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
                  {['Springfield, MA', 'Hartford, CT', 'Worcester, MA', 'New Haven, CT'].map((city) => (
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



      {/* FAQ - Interactive Accordion */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Are you insured and bonded?',
                items: [
                  'Comprehensive general liability insurance',
                  "Workers' compensation insurance",
                  'All staff undergo background checks',
                ],
              },
              {
                q: 'Do you provide cleaning supplies and equipment?',
                items: [
                  'All cleaning supplies included',
                  'Professional equipment provided',
                  'Optional: Supply Management service for consumables (paper, soap, etc.)',
                ],
              },
              {
                q: 'How do you ensure quality?',
                items: [
                  'Detailed checklists for every service',
                  'Regular quality audits',
                  'Corrective action within 24 hours',
                ],
              },
              {
                q: 'What is your onboarding process?',
                items: [
                  '1. Comprehensive facility walk-through',
                  '2. Create custom SOPs for your space',
                  '3. Train our team on your requirements',
                  '4. Supervised cleaning for the first week',
                ],
              },
              {
                q: 'Can I get project/specialty work without a regular contract?',
                items: [
                  'No—project work requires an active cleaning contract',
                  'Includes: floor care, windows, post-construction',
                  'Why: Ensures proper scheduling & resource allocation',
                ],
              },
            ].map((faq, i) => {
              const isExpanded = expandedFaqs.includes(i)

              const toggleFaq = () => {
                if (isExpanded) {
                  setExpandedFaqs(expandedFaqs.filter((index) => index !== i))
                } else {
                  setExpandedFaqs([...expandedFaqs, i])
                }
              }

              return (
                <div
                  key={i}
                  className={`bg-white dark:bg-slate-800 border-2 rounded-lg shadow-sm transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-brand-bright-blue shadow-md'
                      : 'border-neutral-light-grey dark:border-slate-700 hover:border-brand-bright-blue/50'
                  }`}
                >
                  {/* Question - Clickable header */}
                  <button
                    onClick={toggleFaq}
                    className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${
                      isExpanded ? 'bg-brand-bright-blue/5 dark:bg-brand-bright-blue/10' : ''
                    }`}
                    aria-expanded={isExpanded}
                  >
                    <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white pr-4">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`h-6 w-6 text-brand-bright-blue flex-shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      strokeWidth={2}
                    />
                  </button>

                  {/* Answer - Collapsible content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className={`p-6 pt-0 border-l-4 ${isExpanded ? 'border-brand-bright-blue' : 'border-transparent'}`}>
                      <ul className="space-y-3">
                        {faq.items.map((item, j) => (
                          <li key={j} className="flex items-start text-body text-neutral-charcoal/80 dark:text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <QuoteAdvancedModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
      />
    </div>
  )
}
