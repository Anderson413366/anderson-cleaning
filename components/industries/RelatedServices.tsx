/**
 * RelatedServices Component
 *
 * Purpose: Display related cleaning services for an industry
 * Location: Industry detail pages
 *
 * Features:
 * - Shows "Services for [Industry Name]" section
 * - Displays linked cards to related service pages
 * - Responsive grid layout
 * - Hover effects for better UX
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA labels on links
 * - Color contrast compliance
 * - Keyboard navigation support
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Briefcase } from 'lucide-react'
import { servicesData, type ServiceSlug } from '@/lib/services-data'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface RelatedServicesProps {
  industryName: string
  serviceSlugs: string[]
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function RelatedServices({
  industryName,
  serviceSlugs,
}: RelatedServicesProps) {
  // Filter services based on provided slugs
  const relatedServices = serviceSlugs
    .map((slug) => servicesData[slug as ServiceSlug])
    .filter(Boolean)

  // Don't render if no services
  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/10">
              <Briefcase className="h-5 w-5 text-brand-bright-blue" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-wider text-brand-deep-blue dark:text-brand-bright-blue">
                Our Services
              </span>
            </div>
            <h2 className="text-h2 leading-tight font-bold text-[var(--color-text-primary)] mb-4">
              Services for {industryName}
            </h2>
            <p className="text-body text-[var(--color-text-secondary)] max-w-3xl mx-auto">
              Specialized cleaning solutions tailored to meet the unique needs of {industryName.toLowerCase()}.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                aria-label={`Learn more about ${service.title}`}
                className="
                  group
                  bg-white dark:bg-slate-800
                  rounded-[var(--border-radius-lg)]
                  shadow-[var(--shadow-card)]
                  p-6
                  border-2 border-neutral-light-grey dark:border-slate-700
                  transition-all duration-200
                  hover:shadow-lg
                  hover:border-brand-bright-blue
                  hover:-translate-y-1
                "
              >
                {/* Service Icon */}
                <div className="mb-4">
                  <div className="relative inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue shadow-md">
                    <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm" />
                    <service.icon className="relative h-6 w-6 text-white" strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-brand-bright-blue transition-colors">
                  {service.title}
                </h3>

                {/* Service Tagline */}
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {service.tagline}
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm" aria-hidden="true">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Text */}
          <div className="mt-12 text-center">
            <p className="text-body text-[var(--color-text-secondary)] mb-6">
              Need a custom cleaning solution? We can combine multiple services to meet your specific needs.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-blue text-white rounded-lg font-semibold hover:bg-[#006bc4] transition-colors"
            >
              Request a Custom Quote
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * @example
 * ```tsx
 * import RelatedServices from '@/components/industries/RelatedServices'
 *
 * <RelatedServices
 *   industryName="Healthcare Facilities"
 *   serviceSlugs={['healthcare-cleaning', 'janitorial-services', 'emergency-cleaning']}
 * />
 * ```
 */
