/**
 * RelatedIndustries Component
 *
 * Purpose: Display related industries for a cleaning service
 * Location: Service detail pages
 *
 * Features:
 * - Shows "Industries We Serve with [Service Name]" section
 * - Displays linked cards to related industry pages
 * - Maps industry names to industry slugs for routing
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
import { ArrowRight, Building2 } from 'lucide-react'
import { getIndustryByName } from '@/lib/industries-data'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface RelatedIndustriesProps {
  serviceName: string
  industryNames: string[] // Human-readable names from services-data
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function RelatedIndustries({
  serviceName,
  industryNames,
}: RelatedIndustriesProps) {
  // Map industry names to industry data with slugs
  const relatedIndustries = industryNames
    .map((name) => {
      const industry = getIndustryByName(name)
      return industry ? { name, slug: industry.slug, shortDescription: industry.shortDescription } : null
    })
    .filter((industry): industry is { name: string; slug: string; shortDescription: string } => industry !== null)

  // Don't render if no industries found
  if (relatedIndustries.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-neutral-off-white dark:bg-slate-800/60">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/10">
              <Building2 className="h-5 w-5 text-brand-bright-blue" aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-wider text-brand-deep-blue dark:text-brand-bright-blue">
                Industries We Serve
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white mb-4">
              Industries We Serve with {serviceName}
            </h2>
            <p className="text-base text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
              Our {serviceName.toLowerCase()} services are trusted by diverse industries across Western Massachusetts and Northern Connecticut.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="
                  group
                  bg-white dark:bg-slate-900
                  rounded-2xl
                  shadow-md
                  p-6
                  border-2 border-neutral-light-grey dark:border-slate-700
                  transition-all duration-200
                  hover:shadow-xl
                  hover:border-brand-bright-blue
                  hover:-translate-y-1
                "
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="relative inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue shadow-md">
                    <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm" />
                    <Building2 className="relative h-6 w-6 text-white" strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>

                {/* Industry Name */}
                <h3 className="text-xl font-semibold text-neutral-charcoal dark:text-white mb-2 group-hover:text-brand-bright-blue transition-colors">
                  {industry.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 mb-4 leading-relaxed line-clamp-3">
                  {industry.shortDescription}
                </p>

                {/* Arrow Icon */}
                <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-sm">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-12 text-center">
            <p className="text-base text-neutral-charcoal/70 dark:text-white/70 mb-6">
              Don't see your industry listed? We work with a wide range of facilities. Contact us to discuss your specific needs.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-blue text-white rounded-lg font-semibold hover:bg-[#006bc4] transition-colors"
            >
              Request a Quote
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
 * import RelatedIndustries from '@/components/services/RelatedIndustries'
 *
 * <RelatedIndustries
 *   serviceName="Office Cleaning"
 *   industryNames={['Corporate offices', 'Professional services firms', 'Technology companies']}
 * />
 * ```
 */
