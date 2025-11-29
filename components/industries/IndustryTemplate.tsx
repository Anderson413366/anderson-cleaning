/**
 * IndustryTemplate
 *
 * Purpose: Reusable template for individual industry detail pages
 * Location: Used in /industries/[slug] pages
 *
 * Features:
 * - Hero section with industry-specific title and subtitle
 * - Overview paragraphs explaining industry needs
 * - Challenges section with card layout
 * - Solutions section with numbered cards
 * - Standards & compliance badges
 * - Testimonials from industry clients
 * - CTA section with quote form or button
 *
 * Accessibility:
 * - Proper heading hierarchy (h1 → h2 → h3)
 * - Semantic HTML structure
 * - ARIA labels on interactive elements
 * - Color contrast compliance
 * - Keyboard navigation support
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { GlassIcon } from '@/components/ui/GlassIcon'
import { Industry } from '@/lib/industries-data'
import {
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react'
import FAQAccordion from '@/components/services/FAQAccordion'
import RelatedServices from '@/components/industries/RelatedServices'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface IndustryTemplateProps {
  industry: Industry
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function IndustryTemplate({
  industry,
}: IndustryTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white pt-20 pb-12 md:pt-24 md:pb-16">
        {/* Subtle diagonal pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 40px)',
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Button - Centered */}
            <div className="mb-8">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                <span>Back to All Industries</span>
              </Link>
            </div>

            {/* Hero Content - Centered */}
            <h1 className="text-[40px] md:text-5xl font-extrabold mb-6 leading-tight">
              {industry.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {industry.hero.subtitle}
            </p>

            {/* CTA Button */}
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

      {/* ================================================================
          OVERVIEW SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-neutral-charcoal/80 dark:text-white/80 leading-relaxed">
              {industry.overview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CHALLENGES SECTION - Reframed as Solutions
          ================================================================ */}
      <section className="py-16 md:py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white mb-4">
                How We Address Your Challenges
              </h2>
              <p className="text-base text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
                We understand the unique cleaning requirements in {industry.name.toLowerCase()}.
                Here&apos;s how our specialized approach solves your specific challenges.
              </p>
            </div>

            {/* Challenges Grid - Reframed with positive icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded shadow-md p-6 border border-brand-deep-blue/10 dark:border-white/10 transition-all duration-200 hover:shadow-lg hover:border-brand-bright-blue"
                >
                  {/* Solution-focused Icon - Medium (48px) glass effect */}
                  <div className="mb-4">
                    <GlassIcon icon="CheckCircle2" size="md" variant="solid" label="Solution" />
                  </div>

                  {/* Challenge Text - Now framed as a solution */}
                  <p className="text-base font-semibold text-neutral-charcoal dark:text-white leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white mb-4">
                How We Serve {industry.name}
              </h2>
              <p className="text-base text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
                Our specialized approach combines industry expertise with proven cleaning
                protocols to deliver exceptional results.
              </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded shadow-md p-8 border border-neutral-light-grey dark:border-slate-700 transition-all duration-200 hover:shadow-lg"
                >
                  {/* Number Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-deep-blue text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-charcoal dark:text-white">
                      {solution.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-base text-neutral-charcoal/80 dark:text-white/80 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          INDUSTRY EXPERTISE (CASE STUDY) SECTION
          ================================================================ */}
      {industry.caseStudy && (
        <section className="py-[60px] bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1200px] mx-auto">
              {/* Section Header */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-neutral-charcoal dark:text-white mb-2">
                  Industry Expertise
                </h2>
                <p className="text-base text-neutral-charcoal/70 dark:text-white/70">
                  See how we&apos;ve helped other {industry.name.toLowerCase()} achieve their cleaning goals.
                </p>
              </div>

              {/* Case Study Card */}
              <div className="bg-neutral-off-white dark:bg-slate-800 rounded border border-[#E0E0E0] dark:border-slate-700 overflow-hidden">
                {/* Card Header */}
                <div className="bg-brand-deep-blue text-white p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-1">
                    Case Study
                  </p>
                  <h3 className="text-xl font-bold">
                    {industry.caseStudy.title}
                  </h3>
                  <p className="text-white/80 mt-1">
                    {industry.caseStudy.client}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Challenge */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-charcoal/60 dark:text-white/60 mb-3">
                        The Challenge
                      </h4>
                      <p className="text-base text-neutral-charcoal dark:text-white leading-relaxed">
                        {industry.caseStudy.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-charcoal/60 dark:text-white/60 mb-3">
                        Our Solution
                      </h4>
                      <p className="text-base text-neutral-charcoal dark:text-white leading-relaxed">
                        {industry.caseStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="border-t border-[#E0E0E0] dark:border-slate-700 pt-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-charcoal/60 dark:text-white/60 mb-4">
                      Results Achieved
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {industry.caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2
                            className="h-[14px] w-[14px] text-brand-bright-blue flex-shrink-0 mt-1"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span className="text-base text-neutral-charcoal dark:text-white">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          REGULATORY COMPLIANCE SECTION
          ================================================================ */}
      <section className="py-[60px] bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Header */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-neutral-charcoal dark:text-white mb-2">
                Regulatory Compliance
              </h2>
              <p className="text-base text-neutral-charcoal/70 dark:text-white/70">
                We maintain all required certifications and follow strict protocols for your industry.
              </p>
            </div>

            {/* Compliance List - Clean checkmarks */}
            <div className="bg-white dark:bg-slate-800 rounded border border-[#E0E0E0] dark:border-slate-700 p-6 md:p-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industry.compliance.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-[14px] w-[14px] text-brand-bright-blue flex-shrink-0 mt-1"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="text-base text-neutral-charcoal dark:text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FACILITY SIZES SECTION
          ================================================================ */}
      {industry.facilitySizes && industry.facilitySizes.length > 0 && (
        <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white mb-4">
                  Facility Sizes We Serve
                </h2>
                <p className="text-base text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
                  From small practices to large complexes, we have the experience and resources to handle {industry.name.toLowerCase()} of any size.
                </p>
              </div>

              {/* Facility Sizes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {industry.facilitySizes.map((facilitySize, index) => (
                  <div
                    key={index}
                    className="bg-neutral-off-white dark:bg-slate-800 rounded p-8 border-2 border-neutral-light-grey dark:border-slate-700 transition-all duration-200 hover:border-brand-bright-blue hover:shadow-lg"
                  >
                    {/* Icon - Medium (48px) glass effect */}
                    <div className="mb-6">
                      <GlassIcon icon="Building" size="md" variant="solid" label={facilitySize.size} />
                    </div>

                    {/* Size Title */}
                    <h3 className="text-2xl font-bold text-neutral-charcoal dark:text-white mb-2">
                      {facilitySize.size}
                    </h3>

                    {/* Description */}
                    <p className="text-lg font-semibold text-brand-bright-blue mb-4">
                      {facilitySize.description}
                    </p>

                    {/* Typical Facilities */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-neutral-charcoal/70 dark:text-white/70 uppercase tracking-wide">
                        Typical Facilities:
                      </p>
                      <ul className="space-y-2">
                        {facilitySize.typical.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-brand-bright-blue flex-shrink-0 mt-1" strokeWidth={2.5} />
                            <span className="text-sm text-neutral-charcoal/70 dark:text-white/70">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          RELATED SERVICES SECTION
          ================================================================ */}
      {industry.services && industry.services.length > 0 && (
        <RelatedServices
          industryName={industry.name}
          serviceSlugs={industry.services}
        />
      )}

      {/* ================================================================
          TESTIMONIALS SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white mb-4">
                What Our {industry.name} Clients Say
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded shadow-md p-8 border border-neutral-light-grey dark:border-slate-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Quote */}
                  <div className="mb-6">
                    <p className="text-lg text-neutral-charcoal dark:text-white leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-4">
                    <p className="font-bold text-neutral-charcoal dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-neutral-charcoal/60 dark:text-white/60">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ SECTION
          ================================================================ */}
      {industry.faqs && industry.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-neutral-off-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-base text-neutral-charcoal/70 dark:text-white/70 max-w-3xl mx-auto">
                  Get answers to common questions about our {industry.name.toLowerCase()} cleaning services.
                </p>
              </div>

              {/* FAQ Accordion */}
              <FAQAccordion faqs={industry.faqs} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * @example
 * ```tsx
 * import { getIndustryBySlug } from '@/lib/industries-data'
 * import IndustryTemplate from '@/components/industries/IndustryTemplate'
 *
 * const industry = getIndustryBySlug('healthcare')
 *
 * if (!industry) {
 *   return <div>Industry not found</div>
 * }
 *
 * <IndustryTemplate industry={industry} />
 *
 * // With quote form
 * <IndustryTemplate industry={industry} showQuoteForm={true} />
 * ```
 */
