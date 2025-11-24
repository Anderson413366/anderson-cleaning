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
      <section className="relative bg-white dark:bg-slate-900 pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Commercial Only Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-brand-bright-blue text-brand-bright-blue text-sm font-semibold dark:border-white dark:text-white">
                <Building2 className="h-4 w-4" />
                Commercial Facilities Only • No Residential
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-neutral-charcoal dark:text-white">
              Enterprise-Grade Commercial Cleaning for Western MA Businesses
            </h1>

            {/* Supporting Line */}
            <p className="text-xl md:text-2xl text-neutral-charcoal/70 dark:text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              B2B-only janitorial services with W-2 teams, 24/7 support, and OSHA/CDC compliance for your Western MA & Northern CT facility
            </p>

            {/* Trust Badges - Expanded with key differentiators */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-charcoal dark:text-white">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-bright-blue" />
                <span><strong>W-2 Employees Only</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-bright-blue" />
                <span><strong>Licensed & Insured</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-bright-blue" />
                <span><strong>OSHA/CDC Compliant</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-bright-blue" />
                <span><strong>24/7 Emergency Support</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-bright-blue" />
                <span><strong>18+ Years in Business</strong></span>
              </div>
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

      {/* Services Overview Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Office & Commercial Cleaning',
                description: 'Daily/weekly programs for spotless workplaces',
                icon: Building2,
                label: 'Office building icon',
                available: true,
              },
              {
                title: 'Janitorial Services',
                description: 'Reliable, accountable facility care',
                icon: Sparkles,
                label: 'Janitorial icon',
                available: true,
              },
              {
                title: 'Floor & Carpet Care',
                description: 'Strip, wax, buff, and deep cleaning',
                icon: Zap,
                label: 'Floor care icon',
                available: false,
              },
              {
                title: 'Window Cleaning',
                description: 'Interior & exterior, streak-free results',
                icon: Square,
                label: 'Window cleaning icon',
                available: false,
              },
              {
                title: 'Post-Construction',
                description: 'Move-in ready cleanup after renovations',
                icon: HardHat,
                label: 'Construction icon',
                available: false,
              },
              {
                title: 'Supply Management',
                description: 'Auto-replenishment of consumables',
                icon: Package,
                label: 'Supply management icon',
                available: false,
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 border-2 border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm hover:-translate-y-1 hover:border-brand-bright-blue transition-all duration-300 min-h-[190px] flex"
                >
                  <div className="flex items-start space-x-4 w-full">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-off-white text-brand-bright-blue">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">{service.label}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button variant="primary" size="lg">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
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

            <div className="bg-brand-deep-blue text-white rounded-lg p-6">
              <p className="text-body leading-relaxed text-white/90">
                <strong>Note:</strong> We focus exclusively on B2B commercial cleaning. We do not
                service restaurants or facilities requiring 7-day/week cleaning.
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
                <Star key={star} className="h-6 w-6 text-brand-bright-blue fill-brand-bright-blue" aria-hidden="true" />
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
                className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center space-x-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-brand-bright-blue fill-brand-bright-blue" aria-hidden="true" />
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
          <div className="max-w-3xl mx-auto">
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
