import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Zap, AlertCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Anderson Cleaning Company for professional commercial cleaning services in Western Massachusetts & Northern Connecticut. Call (413) 306-5053 or request a quote. 24/7 support for current clients.',
  alternates: {
    canonical: 'https://andersoncleaning.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-h1 md:text-h1 font-extrabold text-neutral-charcoal dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-2xl mx-auto">
              Have a question? Need a quote? Want to discuss your cleaning needs? We're here to
              help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* 24/7 Emergency Support */}
              <div className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Emergency
                    </div>
                  </div>
                </div>
                <h3 className="text-h3 leading-normal font-bold mb-4">24/7 Emergency Support</h3>

                {/* Emergency Response */}
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Clock className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white mb-1">Current Clients</p>
                      <p className="text-white/90 text-sm">
                        24/7 emergency support with on-site arrival in <span className="font-bold text-white">2 hours or less</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="border-t border-white/20 pt-4">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">
                    Office Hours
                  </p>
                  <p className="text-white/90">
                    Monday – Friday: 9 AM – 5 PM EST
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    We respond to all inquiries within 24 hours
                  </p>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-lg p-6 shadow-sm space-y-6">
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-brand-bright-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Phone</p>
                      <a
                        href="tel:+14133065053"
                        className="text-brand-bright-blue hover:underline"
                      >
                        (413) 306-5053
                      </a>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                        24/7 emergency line for current clients
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-brand-bright-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Email</p>
                      <a
                        href="mailto:info@andersoncleaning.com"
                        className="text-brand-bright-blue hover:underline"
                      >
                        info@andersoncleaning.com
                      </a>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">General Inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-brand-bright-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Office</p>
                      <address className="text-neutral-charcoal/80 dark:text-white/80 not-italic">
                        103 Wayside Avenue
                        <br />
                        West Springfield, MA 01089
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-3">
                  Service Area
                </h3>
                <p className="text-neutral-charcoal/80 dark:text-white/80 mb-4">
                  Serving Western MA & Northern CT
                </p>
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 text-brand-bright-blue hover:text-brand-deep-blue dark:hover:text-white font-semibold text-sm transition-colors group"
                >
                  <span>View All Locations</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <p className="text-red-700 dark:text-red-300 font-semibold mb-2">
                  Current Client Emergency?
                </p>
                <p className="text-sm text-neutral-charcoal/80 dark:text-white/80">
                  If you're an existing client with an urgent issue, please call our 24/7 support
                  line immediately:
                </p>
                <a
                  href="tel:+14133065053"
                  className="inline-block mt-2 font-bold text-red-700 dark:text-red-300 hover:underline"
                >
                  (413) 306-5053
                </a>
                <p className="text-xs text-neutral-charcoal/70 dark:text-white/80 mt-2">
                  Premium emergency service with on-site arrival in 2 hours or less.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
