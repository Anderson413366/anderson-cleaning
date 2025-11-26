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
import { getIconComponent } from '@/lib/icon-map'

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
  // Separate featured and secondary industries
  const featuredIndustries = industries.filter(ind =>
    ['healthcare', 'corporate-offices'].includes(ind.slug)
  )

  const secondaryIndustries = industries.filter(ind =>
    ['educational-facilities', 'retail-stores', 'manufacturing-warehouses'].includes(ind.slug)
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

      {/* Industry Cards Grid */}
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

          <div className="max-w-7xl mx-auto space-y-12">
            {/* Featured Industries - Healthcare & Corporate Offices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredIndustries.map((industry) => {
                const IconComponent = getIconComponent(industry.icon)

                return (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.slug}`}
                    className="group h-full"
                  >
                    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-md border-2 border-brand-deep-blue/20 dark:border-brand-bright-blue/30 p-10 transition-all duration-300 hover:shadow-2xl hover:border-brand-bright-blue hover:-translate-y-2">
                      {/* Featured badge */}
                      <div className="inline-flex items-center gap-2 self-start mb-4 px-3 py-1 rounded-full bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-deep-blue dark:text-brand-bright-blue">
                          Primary Focus
                        </span>
                      </div>

                      {/* Glass-effect icon - Large (64px) for featured industries */}
                      <div className="mb-6">
                        <GlassIcon icon={IconComponent} size="lg" variant="solid" label={industry.name} />
                      </div>

                      <h3 className="text-3xl font-bold text-neutral-charcoal dark:text-white mb-4 group-hover:text-brand-bright-blue dark:group-hover:text-brand-bright-blue transition-colors">
                        {industry.name}
                      </h3>

                      <p className="text-lg text-neutral-charcoal/80 dark:text-white/80 leading-relaxed flex-1 mb-6">
                        {industry.shortDescription}
                      </p>

                      <div className="flex items-center gap-2 text-brand-bright-blue font-semibold text-lg group-hover:gap-4 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="h-6 w-6" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Secondary Industries */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondaryIndustries.map((industry) => {
                const IconComponent = getIconComponent(industry.icon)

                return (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.slug}`}
                    className="group h-full"
                  >
                    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border-2 border-neutral-light-grey dark:border-slate-700 p-8 transition-all duration-300 hover:shadow-xl hover:border-brand-bright-blue hover:-translate-y-1">
                      {/* Glass-effect icon - Large (64px) for industry cards */}
                      <div className="mb-6">
                        <GlassIcon icon={IconComponent} size="lg" variant="solid" label={industry.name} />
                      </div>

                      <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-4 group-hover:text-brand-bright-blue dark:group-hover:text-brand-bright-blue transition-colors">
                        {industry.name}
                      </h3>

                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80 leading-relaxed flex-1">
                        {industry.shortDescription}
                      </p>

                      <div className="flex items-center gap-2 text-brand-bright-blue font-semibold group-hover:gap-3 transition-all mt-6">
                        <span>Learn More</span>
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
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
                <Link href="/quote">
                  <Button variant="primary" size="lg" className="min-w-[200px]">
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="min-w-[200px]">
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
