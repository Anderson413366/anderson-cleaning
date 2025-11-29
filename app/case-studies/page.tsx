'use client'

/**
 * Case Studies Hub Page
 *
 * Purpose: Main landing page for all case studies
 * Displays: Grid of case study cards with key information and links
 *
 * Path: /case-studies
 */

import React from 'react'
import Link from 'next/link'

import { ArrowRight, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { caseStudies } from '@/lib/case-studies-data'
import { getIconComponent } from '@/lib/icon-map'

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* ===================================================================
          HERO SECTION
          =================================================================== */}
      <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-extrabold mb-6 leading-tight">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              See how we've helped businesses like yours solve their cleaning challenges and
              achieve measurable results
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

      {/* ===================================================================
          CASE STUDIES GRID
          =================================================================== */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Intro */}
            <div className="text-center mb-12">
              <h2 className="text-h3 leading-normal font-bold text-neutral-charcoal dark:text-white mb-4">
                Featured Case Studies
              </h2>
              <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-3xl mx-auto">
                From healthcare facilities to manufacturing plants, we deliver solutions tailored to
                your industry's unique challenges.
              </p>
            </div>

            {/* Case Study Cards Grid - 2 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {caseStudies.map((study) => {
                const IconComponent = getIconComponent(study.icon)

                return (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    aria-label={`Read case study: ${study.client.name} - ${study.client.industry}`}
                    className="group flex flex-col w-full max-w-[400px] mx-auto bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-[#E0E0E0] dark:border-white/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Featured Image - 16:9 Aspect Ratio with Key Metric */}
                    <div className="relative aspect-video bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue overflow-hidden">
                      {/* Key Result Metric Display */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                        {/* Large Metric Value */}
                        <div className="text-[40px] md:text-[48px] font-bold leading-none mb-1">
                          {study.results.metrics[0]?.value || ''}
                        </div>
                        {/* Metric Label */}
                        <div className="text-[14px] font-medium text-white/90 text-center">
                          {study.results.metrics[0]?.label || ''}
                        </div>
                      </div>

                      {/* Industry Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white dark:bg-slate-900 rounded-full shadow-md">
                        <span className="text-xs font-semibold text-neutral-charcoal dark:text-white">
                          {study.client.industry}
                        </span>
                      </div>

                      {/* Icon Badge - Bottom Right */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <IconComponent
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Headline - 16px bold #002A86 */}
                      <h3 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-3 line-clamp-2">
                        {study.challenge.headline}
                      </h3>

                      {/* Snippet - 14px #666666 */}
                      <p className="text-[14px] text-[#666666] dark:text-white/70 mb-4 line-clamp-3">
                        {study.challenge.description[0]}
                      </p>

                      {/* Key Result Box */}
                      <div className="mb-4 p-3 bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20 rounded-lg border border-brand-bright-blue/20">
                        <div className="flex items-start gap-2">
                          <TrendingUp
                            className="h-4 w-4 text-brand-bright-blue mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <div>
                            <div className="text-[12px] font-semibold text-neutral-charcoal dark:text-white/80 uppercase tracking-wide mb-1">
                              Key Result
                            </div>
                            <div className="text-[14px] font-bold text-brand-deep-blue dark:text-white">
                              {study.keyResult}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="text-[13px] text-neutral-charcoal/70 dark:text-white/70 mb-4">
                        <span className="font-semibold">{study.client.name}</span>
                        <span className="mx-2">•</span>
                        <span>{study.client.location}</span>
                      </div>

                      {/* Read More Link - #0077D9 */}
                      <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-[14px] group-hover:gap-3 transition-all duration-200 mt-auto">
                        <span>Read Full Case Study</span>
                        <ArrowRight
                          className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          INDUSTRIES SERVED CALLOUT
          =================================================================== */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h3 leading-normal font-bold text-neutral-charcoal dark:text-white mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              We serve businesses across healthcare, corporate offices, manufacturing, retail,
              education, and more. Every facility has unique challenges—let's discuss yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/industries')}
              >
                View All Industries
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = '/contact')}
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          RESULTS STATS SECTION
          =================================================================== */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-h3 leading-normal font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
              Our Track Record
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-h1 font-extrabold text-brand-bright-blue mb-2">
                  100%
                </div>
                <div className="text-body font-semibold text-neutral-charcoal dark:text-white mb-2">
                  Client Satisfaction
                </div>
                <div className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  Every case study client renewed their contract
                </div>
              </div>

              <div className="text-center">
                <div className="text-h1 font-extrabold text-brand-bright-blue mb-2">
                  40%
                </div>
                <div className="text-body font-semibold text-neutral-charcoal dark:text-white mb-2">
                  Average Improvement
                </div>
                <div className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  Measurable outcomes in key performance indicators
                </div>
              </div>

              <div className="text-center">
                <div className="text-h1 font-extrabold text-brand-bright-blue mb-2">
                  &lt;3 weeks
                </div>
                <div className="text-body font-semibold text-neutral-charcoal dark:text-white mb-2">
                  Implementation Time
                </div>
                <div className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  From consultation to full program launch
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CTA SECTION
          =================================================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold mb-4">
              See results like these for your facility
            </h2>
            <p className="text-body text-white/80 mb-8">
              Every case study started with a free consultation. Let's discuss your challenges and
              create a custom solution.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={() => (window.location.href = '/quote')}
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER
          =================================================================== */}
      <footer className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-neutral-charcoal/40 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-neutral-charcoal/60 dark:text-white/70">
            &copy; {new Date().getFullYear()} Anderson Cleaning Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
