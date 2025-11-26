'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { GlassIcon } from '@/components/ui/GlassIcon'
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
  Mail,
  MapPin,
  Package,
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

      {/* Hero Section - Apple-style single focus with clear hierarchy */}
      <section className="relative bg-white dark:bg-slate-900 pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24">
        {/* Subtle gradient overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep-blue/5 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Primary Headline - 72px bold, single focus point */}
            <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold mb-4 leading-[1.05] tracking-tight text-brand-deep-blue dark:text-white">
              Commercial Cleaning Services
            </h1>
            {/* Geographic Qualifier - 32px medium, subordinate position */}
            <p className="text-[24px] md:text-[32px] font-medium text-brand-bright-blue mb-12">
              Western MA & Northern CT
            </p>

            {/* CTAs - Clear primary/secondary hierarchy */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Primary CTA - Quote form conversion */}
              <Link
                href="/quote"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-brand-bright-blue text-white font-bold text-base hover:bg-[#006bc4] transition-colors"
              >
                Get Your Quote
              </Link>
              {/* Secondary - Phone as text link only */}
              <a
                href="tel:+14133065053"
                className="text-base text-brand-bright-blue hover:underline transition-colors dark:text-brand-bright-blue"
              >
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

          {/* Unified Services Grid - Apple-style minimal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Office & Commercial Cleaning',
                description: 'Daily programs for spotless, professional workplaces',
                icon: Building2,
              },
              {
                title: 'Janitorial Services',
                description: 'Reliable W-2 teams with consistent schedules',
                icon: Sparkles,
              },
              {
                title: 'Floor & Carpet Care',
                description: 'Strip, wax, buff, and deep cleaning services',
                icon: Zap,
              },
              {
                title: 'Window Cleaning',
                description: 'Interior and exterior streak-free results',
                icon: Square,
              },
              {
                title: 'Post-Construction',
                description: 'Move-in ready cleanup after renovations',
                icon: HardHat,
              },
              {
                title: 'Supply Management',
                description: 'Auto-replenishment of consumables',
                icon: Package,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="h-[240px] bg-white dark:bg-slate-800 rounded-xl p-6 border border-neutral-light-grey dark:border-slate-700 hover:border-brand-bright-blue hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                {/* Icon */}
                <div className="mb-4">
                  <GlassIcon icon={service.icon} size="lg" variant="solid" label={service.title} />
                </div>
                {/* Title - 16px bold #002A86 */}
                <h3 className="text-base font-bold text-brand-deep-blue dark:text-white mb-2">
                  {service.title}
                </h3>
                {/* Description - 14px #666666, single line */}
                <p className="text-sm text-[#666666] dark:text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
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
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-6 flex items-center justify-center gap-3">
                  <GlassIcon icon={MapPin} size="md" variant="default" label="Location icon" />
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
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-6 flex items-center justify-center gap-3">
                  <GlassIcon icon={Building2} size="md" variant="default" label="Building icon" />
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

            {/* Positive B2B Focus Callout with pattern overlay */}
            <div className="relative bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white rounded-xl p-8 md:p-10 overflow-hidden">
              {/* Diagonal pattern overlay for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.03) 10px, rgba(255, 255, 255, 0.03) 20px)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h3 className="text-h3 font-bold text-white mb-4">
                  Proudly Serving B2B Facilities
                </h3>
                <p className="text-body leading-relaxed text-white/95 mb-6">
                  We specialize in professional commercial cleaning for offices, healthcare facilities,
                  educational institutions, retail spaces, and industrial facilities across Western MA & CT.
                </p>
                <p className="text-sm text-white/80">
                  We serve B2B clients only and do not offer residential services. Contracted customers also receive access to our full suite of premium add-on services, including specialty cleaning and supply management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Static 3-column grid */}
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

          {/* Static responsive grid - 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Anderson Cleaning Company transformed our medical office. Their attention to detail and OSHA compliance gives us complete peace of mind.',
                author: 'Dr. Sarah Mitchell',
                company: 'Springfield Family Medicine',
                companyInitials: 'SFM',
                rating: 5,
              },
              {
                quote:
                  "We've tried three cleaning companies before Anderson. The difference is night and day. Their team is professional, consistent, and truly cares.",
                author: 'Michael Chen',
                company: 'TechStart Solutions',
                companyInitials: 'TS',
                rating: 5,
              },
              {
                quote:
                  "The 24/7 support isn't just marketing – they really do respond in minutes. When we had an emergency spill, they had someone there within the hour.",
                author: 'Jennifer Rodriguez',
                company: 'Northeast Manufacturing',
                companyInitials: 'NM',
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
                <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-4 mb-4">
                  <p className="font-semibold text-neutral-charcoal dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">{testimonial.company}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-brand-deep-blue/10 dark:bg-brand-bright-blue/10">
                    <span className="text-sm font-bold text-brand-deep-blue dark:text-brand-bright-blue">
                      {testimonial.companyInitials}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Quote Form - Enhanced Container */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[700px] mx-auto">
            {/* Light gray background container with visual separation */}
            <div className="bg-neutral-light-grey dark:bg-slate-800 rounded-2xl py-20 px-8 md:px-12">
              <div className="text-center mb-12">
                {/* Glass-effect icon - Large (64px) for hero section */}
                <div className="flex justify-center mb-6">
                  <GlassIcon icon={Mail} size="lg" variant="default" label="Email icon" />
                </div>
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
        </div>
      </section>

      <QuoteAdvancedModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
      />
    </div>
  )
}
