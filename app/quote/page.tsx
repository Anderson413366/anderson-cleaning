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
      <section className="hero-section bg-brand-deep-blue text-white">
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
          <QuoteFormSimplified onSuccess={handleSuccess} />
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-h2 font-bold text-center text-neutral-charcoal dark:text-white mb-12">
              Why Request a Quote from Anderson Cleaning Company?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-deep-blue/10 text-brand-deep-blue dark:bg-white/10 dark:text-white rounded-full mb-4">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h3 className="text-h3 font-semibold text-neutral-charcoal dark:text-white mb-2">
                    No Obligation
                  </h3>
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  Free consultation and walk-through with zero commitment or pressure to sign
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  Clear, itemized proposals with no hidden fees or surprise charges
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-bright-blue/10 dark:bg-brand-bright-blue/30/30 rounded-full mb-4">
                  <span className="text-h3 font-bold text-brand-bright-blue dark:text-brand-bright-blue">24h</span>
                </div>
                <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                  Fast Turnaround
                </h3>
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  Receive your detailed proposal within 24 hours of our site visit
                </p>
              </div>
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
