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

      {/* Hero Section - Apple-style simplified with gradient overlay */}
      <section className="relative bg-white dark:bg-slate-900 pt-32 pb-14 md:pt-40 md:pb-20 lg:pt-48 lg:pb-22">
        {/* Subtle gradient overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep-blue/5 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-4 leading-[1.1] tracking-tight text-neutral-charcoal dark:text-white">
              Commercial Cleaning Services
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-brand-bright-blue dark:text-brand-bright-blue mb-6">
              Western MA & Northern CT
            </p>

            {/* Trust Badge - Positioned before CTAs to build confidence */}
            <div className="mb-8 inline-flex items-center justify-center">
              <span className="inline-block px-6 py-2.5 rounded-full border-2 border-brand-deep-blue dark:border-brand-bright-blue text-sm font-semibold text-brand-deep-blue dark:text-brand-bright-blue bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                18+ Years Serving Western Massachusetts Businesses
              </span>
            </div>

            {/* Supporting Line */}
            <p className="text-xl md:text-2xl text-neutral-charcoal/70 dark:text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              B2B-only janitorial services with W-2 teams, 24/7 support, and OSHA/CDC compliance for your Western MA & Northern CT facility
            </p>

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

          {/* Unified Services Grid - 3x2 layout with consistent styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
              {
                title: 'Floor & Carpet Care',
                description: 'Strip, wax, buff, and deep cleaning for pristine floors',
                icon: Zap,
                label: 'Floor care icon',
              },
              {
                title: 'Window Cleaning',
                description: 'Interior & exterior, streak-free results every time',
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
                description: 'Auto-replenishment of consumables and supplies',
                icon: Package,
                label: 'Supply management icon',
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="bg-brand-deep-blue dark:bg-brand-deep-blue text-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Glass-morphism icon circle with gradient */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-lg mb-4 bg-gradient-to-br from-brand-bright-blue/20 to-brand-deep-blue/20 backdrop-blur-md shadow-inner">
                    <Icon className="h-12 w-12 text-white" aria-hidden="true" />
                    <span className="sr-only">{service.label}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/90">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-blue text-white font-semibold rounded hover:bg-[#006bc4] transition-all duration-150 group"
            >
              View All Services
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
              {/* Primary Service Areas with pill-shaped location tags */}
              <div className="mb-8">
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-6 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue mr-2" />
                  Primary Service Areas
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    'Springfield & West Springfield',
                    'Worcester County',
                    'Northampton & Amherst',
                    'Hartford, CT area',
                  ].map((location) => (
                    <span
                      key={location}
                      className="inline-block px-5 py-2.5 rounded-full border-2 border-brand-deep-blue dark:border-brand-bright-blue bg-white dark:bg-slate-900 text-brand-deep-blue dark:text-brand-bright-blue font-semibold text-sm transition-all duration-200 hover:bg-brand-bright-blue hover:text-white hover:border-brand-bright-blue cursor-default"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facility Types with pill-shaped tags */}
              <div className="pt-8 border-t border-neutral-charcoal/10 dark:border-white/10">
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-6 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue mr-2" />
                  Facility Types We Serve
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    'Office Buildings',
                    'Corporate Campuses',
                    'Medical Offices',
                    'Clinics',
                    'Educational Facilities',
                    'Schools',
                    'Retail Stores',
                    'Warehouses',
                  ].map((facility) => (
                    <span
                      key={facility}
                      className="inline-block px-5 py-2.5 rounded-full border-2 border-brand-deep-blue dark:border-brand-bright-blue bg-white dark:bg-slate-900 text-brand-deep-blue dark:text-brand-bright-blue font-semibold text-sm transition-all duration-200 hover:bg-brand-bright-blue hover:text-white hover:border-brand-bright-blue cursor-default"
                    >
                      {facility}
                    </span>
                  ))}
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
              <p className="text-sm text-white/80 mb-6">
                We serve B2B clients only and do not offer residential services. Contracted customers also receive access to our full suite of premium add-on services, including specialty cleaning and supply management.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-[10px] bg-white px-6 py-3 text-button font-semibold text-brand-deep-blue transition-all duration-150 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep-blue"
              >
                Request a Quote
              </Link>
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
