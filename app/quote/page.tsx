'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import QuoteFormSimplified from '@/components/forms/QuoteFormSimplified'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

export default function QuotePage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setShowSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-extrabold mb-6 leading-tight">Get Your Free Quote</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Tell us about your facility and we'll provide a customized cleaning proposal within 24
              hours.
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

      {/* Success Message */}
      {showSuccess && (
        <section className="py-8 bg-brand-bright-blue/10 border-b border-brand-bright-blue/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-brand-bright-blue/40 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-brand-bright-blue flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-2">
                      Quote Request Submitted Successfully!
                    </h2>
                    <p className="text-neutral-charcoal/80 dark:text-white/80 mb-4">
                      Thank you for requesting a quote from Anderson Cleaning Company. We've received your
                      information and will contact you within 24 hours (Monday – Friday, 9 AM – 5 PM
                      EST).
                    </p>
                    <div className="bg-brand-bright-blue/5 dark:bg-brand-bright-blue/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-brand-deep-blue dark:text-white mb-2">
                      What happens next?
                    </h3>
                    <ol className="space-y-2 text-sm text-brand-deep-blue dark:text-white/80">
                        <li className="flex items-start gap-2">
                          <span className="font-bold">1.</span>
                          <span>We'll call or email you to discuss your specific needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold">2.</span>
                          <span>
                            We'll schedule a free on-site walk-through at your convenience
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold">3.</span>
                          <span>You'll receive a detailed proposal within 24 hours</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Quote Form - Full width */}
            <div className="max-w-4xl mx-auto">
              <QuoteFormSimplified onSuccess={handleSuccess} />

              {/* Prefer to Talk? - Single subtle callout below form */}
              <div className="mt-8 border-l-4 border-brand-bright-blue bg-[#F5F7FB] dark:bg-slate-800/50 p-4 rounded-r-lg">
                <p className="text-[14px] text-[#333333] dark:text-white/80">
                  <span className="font-semibold">Prefer to talk?</span>{' '}
                  Call us directly at{' '}
                  <a
                    href={CONTACT_INFO.phone.href}
                    className="font-semibold text-brand-bright-blue hover:underline"
                  >
                    {CONTACT_INFO.phone.formatted}
                  </a>
                  {' '}({CONTACT_INFO.hours.office})
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-neutral-charcoal dark:text-white mb-12">
              Why Request a Quote from Anderson Cleaning Company?
            </h2>
            {/* 3 uniform cards: 300px × 200px, centered layout */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: <Sparkles className="h-7 w-7 text-white" />,
                  title: 'No Obligation',
                  description: 'Free consultation and walk-through with zero commitment',
                },
                {
                  icon: <CheckCircle2 className="h-7 w-7 text-white" />,
                  title: 'Transparent Pricing',
                  description: 'Clear, itemized proposals with no hidden fees',
                },
                {
                  icon: <span className="text-[18px] font-bold text-white">24h</span>,
                  title: 'Fast Turnaround',
                  description: 'Detailed proposal within 24 hours of site visit',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="w-[300px] h-[200px] bg-white dark:bg-slate-800 border border-[#E0E0E0] dark:border-slate-700 rounded-xl p-6 text-center flex flex-col items-center justify-center"
                >
                  {/* Icon: 56px circle #0077D9 */}
                  <div className="w-14 h-14 rounded-full bg-brand-bright-blue flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  {/* Heading: 16px bold #002A86 */}
                  <h3 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-2">
                    {card.title}
                  </h3>
                  {/* Description: 14px #666666, 2 lines max */}
                  <p className="text-[14px] text-[#666666] dark:text-white/70 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optional Calendly Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-4">
              Prefer to Schedule a Walk-Through Directly?
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              If you already know what you need, skip the form and schedule your free on-site
              consultation directly.
            </p>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-neutral-light-grey dark:border-slate-700">
              <p className="text-neutral-charcoal/80 dark:text-white/80 mb-6">
                Call us at{' '}
                <a
                  href="tel:+14133065053"
                  className="font-bold text-primary-600 dark:text-primary-400 hover:underline"
                >
                  (413) 306-5053
                </a>{' '}
                to schedule your walk-through today.
              </p>
              {/* TODO: Add Calendly embed here */}
              <div className="bg-brand-deep-blue/5 dark:bg-white/5 border border-brand-deep-blue/30 dark:border-white/20 rounded-lg p-4">
                <p className="text-sm text-brand-deep-blue dark:text-white/80">
                  <strong>Note:</strong> Online scheduling coming soon! For now, please call or
                  submit the quote form above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
