/**
 * RelatedIndustries Component
 *
 * Purpose: Link to industries page from service detail pages
 * Location: Service detail pages
 *
 * Features:
 * - Simple CTA section linking to /industries
 * - Avoids false plurality by not showing partial industry card matches
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - Color contrast compliance
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Building2 } from 'lucide-react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface RelatedIndustriesProps {
  serviceName: string
  industryNames: string[] // Kept for API compatibility but not used for display
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function RelatedIndustries({
  serviceName,
}: RelatedIndustriesProps) {
  return (
    <section className="py-20 md:py-30 bg-neutral-off-white dark:bg-slate-800/60">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-bright-blue mb-6">
            <Building2 className="h-7 w-7 text-white" strokeWidth={2} aria-hidden="true" />
          </div>

          <h2 className="text-2xl font-bold text-neutral-charcoal dark:text-white mb-4">
            Serving All Commercial Facilities
          </h2>

          <p className="text-base text-neutral-charcoal/70 dark:text-white/70 mb-8 leading-relaxed">
            Our {serviceName.toLowerCase()} services support healthcare facilities, corporate offices, educational institutions, retail stores, and manufacturing operations across Western Massachusetts and Northern Connecticut.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-brand-deep-blue dark:text-white border-2 border-brand-deep-blue dark:border-brand-bright-blue rounded-lg font-semibold hover:bg-brand-deep-blue hover:text-white dark:hover:bg-brand-bright-blue transition-colors"
            >
              View All Industries
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-blue text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-colors"
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
 *   industryNames={[]} // industryNames kept for API compatibility
 * />
 * ```
 */
