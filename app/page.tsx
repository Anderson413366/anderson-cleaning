'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import QuoteMiniForm from '@/components/forms/QuoteMiniForm'
import QuoteAdvancedModal from '@/components/forms/QuoteAdvancedModal'
import PromotionalModal from '@/components/PromotionalModal'
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  HardHat,
  Headphones,
  HelpCircle,
  MapPin,
  Package,
  Phone,
  Shield,
  Sparkles,
  Square,
  Star,
  Users,
  Zap,
  Gift,
} from 'lucide-react'

export default function Home() {
  const [showAdvancedModal, setShowAdvancedModal] = useState(false)
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">
      {/* Promotional Modal */}
      <PromotionalModal />

      {/* Hero Section - Apple-style simplified */}
      <section className="relative bg-white dark:bg-slate-900 pt-32 pb-14 md:pt-40 md:pb-20 lg:pt-48 lg:pb-22">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-neutral-charcoal dark:text-white">
              Commercial Cleaning Services | Western MA & Northern CT
            </h1>

            {/* Supporting Line */}
            <p className="text-xl md:text-2xl text-neutral-charcoal/70 dark:text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              B2B-only janitorial services with W-2 teams, 24/7 support, and OSHA/CDC compliance for your Western MA & Northern CT facility
            </p>

            {/* Trust Statement - Apple-simple */}
            <div className="mb-12">
              <p className="text-lg font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                18+ Years Serving Western Massachusetts Businesses
              </p>
            </div>

            {/* CTAs - Standardized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full bg-brand-bright-blue px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-[#006bc4] transition-all duration-150"
              >
                Request a Quote
              </Link>
              <a
                href="tel:+14133065053"
                className="inline-flex items-center justify-center gap-2 text-lg font-medium text-brand-bright-blue hover:text-[#006bc4] transition-colors dark:text-white dark:hover:text-white/80"
              >
                <Phone className="h-5 w-5" />
                (413) 306-5053
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section - Apple-style hierarchy */}
      <section id="services" className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-2xl mx-auto">
              Comprehensive commercial cleaning solutions tailored to your facility
            </p>
          </div>

          {/* Featured Services - Top 2 with visual prominence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'Office & Commercial Cleaning',
                description: 'Daily and weekly cleaning programs designed to keep your workplace spotless, professional, and welcoming',
                icon: Building2,
                label: 'Office building icon',
              },
              {
                title: 'Janitorial Services',
                description: 'Comprehensive facility care with reliable W-2 teams, consistent schedules, and accountable service',
                icon: Sparkles,
                label: 'Janitorial icon',
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="bg-brand-deep-blue text-white rounded-lg p-8 shadow-lg hover:bg-brand-bright-blue hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                      <span className="sr-only">{service.label}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-white/95">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Additional Services - Secondary grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'Floor & Carpet Care',
                description: 'Strip, wax, buff, and deep cleaning',
                icon: Zap,
                label: 'Floor care icon',
              },
              {
                title: 'Window Cleaning',
                description: 'Interior & exterior, streak-free results',
                icon: Square,
                label: 'Window cleaning icon',
              },
              {
                title: 'Post-Construction',
                description: 'Move-in ready cleanup after renovations',
                icon: HardHat,
                label: 'Construction icon',
              },
              {
                title: 'Supply Management',
                description: 'Auto-replenishment of consumables',
                icon: Package,
                label: 'Supply management icon',
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-5 hover:-translate-y-0.5 hover:border-l-4 hover:border-l-brand-bright-blue hover:shadow-[0_4px_12px_rgba(0,42,134,0.12)] transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-bright-blue/10 text-brand-bright-blue mb-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{service.label}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-charcoal dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="primary" size="lg" className="group">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
                Serving Massachusetts & Connecticut
              </h2>
              <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
                Within 100 miles of West Springfield, MA
              </p>
            </div>

            <div className="bg-neutral-off-white dark:bg-slate-800 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-4 flex items-center">
                    <MapPin className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue mr-2" />
                    Primary Service Areas
                  </h3>
                  <ul className="space-y-2 text-body text-neutral-charcoal/80 dark:text-white/80">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Springfield & West Springfield
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Worcester County
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Northampton & Amherst
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Hartford, CT area
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-4 flex items-center">
                    <Building2 className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue mr-2" />
                    We Serve
                  </h3>
                  <ul className="space-y-2 text-body text-neutral-charcoal/80 dark:text-white/80">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Office buildings & corporate campuses
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Medical offices & clinics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Educational facilities & schools
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mr-2 flex-shrink-0" />
                      Retail stores & warehouses
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Positive B2B Focus Callout */}
            <div className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white rounded-xl p-8 md:p-10">
              <h3 className="text-h3 font-bold text-white mb-4">
                Proudly Serving B2B Facilities
              </h3>
              <p className="text-body leading-relaxed text-white/95 mb-6">
                We specialize in professional commercial cleaning for offices, healthcare facilities,
                educational institutions, retail spaces, and industrial facilities across Western MA & CT.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-[10px] bg-white px-6 py-3 text-button font-semibold text-brand-deep-blue transition-all duration-150 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep-blue"
              >
                Request a Quote
              </Link>
              <p className="mt-6 text-sm text-white/70">
                Note: We focus exclusively on B2B commercial cleaning and do not service restaurants or facilities requiring 7-day/week cleaning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-2" role="img" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-[18px] w-[18px] text-brand-deep-blue fill-brand-deep-blue" aria-hidden="true" />
              ))}
            </div>
            <p className="text-body text-neutral-charcoal/80 dark:text-white/70">5.0 stars from satisfied clients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Anderson Cleaning Company transformed our medical office. Their attention to detail and OSHA compliance gives us complete peace of mind.',
                author: 'Dr. Sarah Mitchell',
                company: 'Springfield Family Medicine',
                rating: 5,
              },
              {
                quote:
                  "We've tried three cleaning companies before Anderson. The difference is night and day. Their team is professional, consistent, and truly cares.",
                author: 'Michael Chen',
                company: 'TechStart Solutions',
                rating: 5,
              },
              {
                quote:
                  "The 24/7 support isn't just marketing – they really do respond in minutes. When we had an emergency spill, they had someone there within the hour.",
                author: 'Jennifer Rodriguez',
                company: 'Northeast Manufacturing',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-[0_2px_8px_rgba(0,42,134,0.08)]"
              >
                <div className="flex items-center space-x-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-[18px] w-[18px] text-brand-deep-blue fill-brand-deep-blue" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-body leading-relaxed text-neutral-charcoal dark:text-white mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-4">
                  <p className="font-semibold text-neutral-charcoal dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Quote Form */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[600px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
                Request Your Free Quote
              </h2>
              <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
                Tell us about your facility and we'll provide a custom quote within 24 hours
              </p>
            </div>
            <QuoteMiniForm />
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
