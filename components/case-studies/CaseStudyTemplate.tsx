/**
 * CaseStudyTemplate Component
 *
 * Purpose: Reusable template for all case study detail pages
 * Layout: Problem → Solution → Results format
 *
 * Sections:
 * 1. Hero - Title, client info, industry badge, featured image
 * 2. Overview - Client background and facility details
 * 3. Challenge - The problem (headline + description + pain points)
 * 4. Solution - What we implemented
 * 5. Results - Metrics and outcomes with client quote
 * 6. Services Used - List with links to service pages
 * 7. CTA - Call to action for similar results
 *
 * Features:
 * - Professional, scannable layout
 * - Large readable metrics
 * - Print-friendly formatting
 * - Full WCAG 2.1 AA accessibility
 * - Design system integration
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  MapPin,
  Users,
  Square,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Quote,
  Building2,
  Clock,
} from 'lucide-react'
import { CaseStudy } from '@/lib/case-studies-data'
import { getIconComponent } from '@/lib/icon-map'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface CaseStudyTemplateProps {
  /**
   * Complete case study data object
   */
  caseStudy: CaseStudy

  /**
   * Show print button
   * @default true
   */
  showPrintButton?: boolean

  /**
   * Show CTA section at bottom
   * @default true
   */
  showCTA?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function CaseStudyTemplate({
  caseStudy,
  showPrintButton = true,
  showCTA = true,
}: CaseStudyTemplateProps) {
  // Get icon component from string name
  const IconComponent = getIconComponent(caseStudy.icon)

  // Format date for display
  const formattedDate = new Date(caseStudy.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* =====================================================================
          HERO SECTION - Headline & Company Info
          ===================================================================== */}
      <section className="relative bg-white dark:bg-slate-900 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link
              href="/case-studies"
              className="
                inline-flex items-center gap-2
                text-brand-bright-blue hover:text-brand-deep-blue dark:hover:text-brand-bright-blue/80
                transition-colors duration-200
                mb-8
                group
              "
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-[14px] font-medium">Back to Case Studies</span>
            </Link>

            {/* Headline - 28px bold #002A86 */}
            <h1 className="text-[28px] md:text-[32px] leading-tight font-bold text-brand-deep-blue dark:text-white mb-4">
              {caseStudy.title}
            </h1>

            {/* Company/Industry - 14px #666666 */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[14px] text-[#666666] dark:text-white/70">
                <strong className="font-semibold">{caseStudy.client.name}</strong>
              </span>
              <span className="text-[#666666] dark:text-white/50">•</span>
              <span className="text-[14px] text-[#666666] dark:text-white/70">
                {caseStudy.client.industry}
              </span>
              <span className="text-[#666666] dark:text-white/50">•</span>
              <span className="text-[14px] text-[#666666] dark:text-white/70">
                {caseStudy.client.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          KPI METRICS HIGHLIGHT - 3 Cards with 36px Numbers
          ===================================================================== */}
      <section className="py-8 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.results.metrics.slice(0, 3).map((metric, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-brand-bright-blue/5 to-brand-deep-blue/5 dark:from-brand-bright-blue/10 dark:to-brand-deep-blue/10 rounded-xl p-8 border border-brand-deep-blue/10 dark:border-white/10 text-center"
                >
                  {/* KPI Number - 36px bold #0077D9 */}
                  <div className="text-[36px] md:text-[40px] font-bold text-brand-bright-blue mb-2 leading-none">
                    {metric.value}
                  </div>
                  {/* Label */}
                  <div className="text-[14px] font-semibold text-brand-deep-blue dark:text-white mb-1">
                    {metric.label}
                  </div>
                  {/* Description */}
                  {metric.description && (
                    <div className="text-[13px] text-[#666666] dark:text-white/70 leading-relaxed">
                      {metric.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHALLENGE SECTION - 60px top margin, 16px heading, 2-3 sentences
          ===================================================================== */}
      <section className="pt-[60px] pb-8 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Heading - 16px */}
            <h2 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-4 uppercase tracking-wide">
              The Challenge
            </h2>

            {/* Challenge Content - 2-3 sentences */}
            <div className="mb-6">
              <p className="text-[16px] text-[#333333] dark:text-white/90 leading-relaxed mb-3">
                {caseStudy.challenge.headline}
              </p>
              <p className="text-[16px] text-[#666666] dark:text-white/70 leading-relaxed">
                {caseStudy.challenge.description[0]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SOLUTION SECTION - 60px top margin, 16px heading, 2-3 sentences
          ===================================================================== */}
      <section className="pt-[60px] pb-8 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Heading - 16px */}
            <h2 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-4 uppercase tracking-wide">
              Our Solution
            </h2>

            {/* Solution Content - 2-3 sentences */}
            <div className="mb-6">
              <p className="text-[16px] text-[#666666] dark:text-white/70 leading-relaxed mb-3">
                {caseStudy.solution.description[0]}
              </p>
              {caseStudy.solution.description[1] && (
                <p className="text-[16px] text-[#666666] dark:text-white/70 leading-relaxed">
                  {caseStudy.solution.description[1]}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          RESULTS SECTION - 60px top margin, 16px heading, 2-3 sentences + list
          ===================================================================== */}
      <section className="pt-[60px] pb-8 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Section Heading - 16px */}
            <h2 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-4 uppercase tracking-wide">
              The Results
            </h2>

            {/* Results Summary - 2-3 sentences */}
            <div className="mb-6">
              <p className="text-[16px] text-[#666666] dark:text-white/70 leading-relaxed mb-4">
                {caseStudy.keyResult}
              </p>
            </div>

            {/* List of Outcomes */}
            {caseStudy.results.additionalOutcomes &&
              caseStudy.results.additionalOutcomes.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {caseStudy.results.additionalOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[16px] text-[#666666] dark:text-white/70">{outcome}</span>
                    </li>
                  ))}
                </ul>
              )}

            {/* Client Quote (if available) */}
            {caseStudy.results.quote && (
              <div className="bg-brand-deep-blue/5 dark:bg-brand-bright-blue/10 rounded-lg p-6 border-l-4 border-brand-bright-blue mt-8">
                <Quote
                  className="h-8 w-8 text-brand-bright-blue/30 mb-3"
                  aria-hidden="true"
                />
                <blockquote>
                  <p className="text-[16px] text-[#333333] dark:text-white/90 leading-relaxed mb-4 italic">
                    "{caseStudy.results.quote.text}"
                  </p>
                  <footer className="text-[14px] text-[#666666] dark:text-white/70">
                    <strong className="font-semibold text-brand-deep-blue dark:text-white">
                      {caseStudy.results.quote.author}
                    </strong>
                    {', '}
                    {caseStudy.results.quote.role}
                    {caseStudy.results.quote.company && <>, {caseStudy.results.quote.company}</>}
                  </footer>
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CTA SECTION
          ===================================================================== */}
      {showCTA && (
        <section className="py-16 md:py-20 bg-brand-deep-blue text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 leading-tight font-bold mb-4">
                Ready for Similar Results?
              </h2>
              <p className="text-body text-white/80 mb-8">
                Let's discuss how Anderson Cleaning Company can solve your facility's challenges and deliver
                measurable results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => (window.location.href = '/quote')}
                >
                  Get Your Free Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => (window.location.href = '/contact')}
                >
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
