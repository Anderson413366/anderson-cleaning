/**
 * Industries Hub Page
 *
 * Purpose: Overview page showing all industries served by Anderson Cleaning Company
 * Location: /industries
 */

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { GlassIcon } from '@/components/ui/GlassIcon'
import { industries } from '@/lib/industries-data'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Specialized commercial cleaning services for healthcare, corporate offices, schools, retail stores, and manufacturing facilities. Expert solutions for your industry.',
  alternates: {
    canonical: 'https://andersoncleaning.com/industries',
  },
}

export const revalidate = 86400

export default function IndustriesPage() {
  // All industries displayed equally (no featured/secondary distinction)
  const allIndustries = industries.filter(ind =>
    ['healthcare', 'corporate-offices', 'educational-facilities', 'retail-stores', 'manufacturing-warehouses'].includes(ind.slug)
  )

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-extrabold mb-6 leading-tight">
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Specialized cleaning solutions tailored to your industry's unique standards and compliance requirements
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

      {/* Industry Cards Grid - All industries displayed equally */}
      <section className="py-16 md:py-20 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-[var(--color-text-primary)] mb-4">
              Explore Our Industry Expertise
            </h2>
            <p className="text-body text-[var(--color-text-secondary)] max-w-3xl mx-auto">
              Select your industry to learn about our specialized cleaning solutions,
              compliance standards, and proven approach.
            </p>
          </div>

          {/* Unified grid - all cards visually identical */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allIndustries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.slug}`}
                className="group h-full"
                aria-label={`Learn more about ${industry.name} cleaning services`}
              >
                <div className="h-full min-h-[280px] flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-[#E0E0E0] dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-brand-bright-blue hover:-translate-y-1">
                  {/* Icon - 56px circle with brand blue */}
                  <div className="mb-5">
                    <GlassIcon icon={industry.icon} size="lg" variant="default" label={industry.name} />
                  </div>

                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-3 group-hover:text-brand-bright-blue dark:group-hover:text-brand-bright-blue transition-colors">
                    {industry.name}
                  </h3>

                  <p className="text-body text-neutral-charcoal/80 dark:text-white/80 leading-relaxed flex-1">
                    {industry.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 text-brand-bright-blue font-semibold group-hover:gap-3 transition-all mt-5">
                    <span>Learn More</span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner - "Not Sure Which Category?" */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-brand-bright-blue/10 dark:bg-brand-bright-blue/15 rounded-2xl border-2 border-brand-bright-blue/30 dark:border-brand-bright-blue/40 p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-charcoal dark:text-white mb-4">
                Not Sure Which Category Fits Your Business?
              </h2>

              <p className="text-lg text-neutral-charcoal/80 dark:text-white/80 max-w-2xl mx-auto mb-8">
                We serve a wide range of commercial facilities beyond these categories.
                Contact us to discuss your specific cleaning needs and how we can help.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Primary CTA - solid #0077D9, white text, 48px height */}
                <Link href="/quote">
                  <Button variant="primary" className="min-w-[200px] h-[48px] px-7 text-base font-semibold">
                    Request a Quote
                  </Button>
                </Link>
                {/* Secondary CTA - white background, 1px #0077D9 border, #0077D9 text, 48px height */}
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="min-w-[200px] h-[48px] px-7 text-base font-semibold bg-white dark:bg-white border-[1px] border-brand-bright-blue text-brand-bright-blue hover:bg-[rgba(0,119,217,0.08)] dark:hover:bg-[rgba(0,119,217,0.08)]"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
