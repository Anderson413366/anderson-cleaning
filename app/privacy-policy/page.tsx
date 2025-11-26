'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { CONTACT_INFO, COMPANY_INFO } from '@/lib/constants'
import { ChevronUp } from 'lucide-react'

const lastUpdated = {
  label: 'February 20, 2025',
  dateTime: '2025-02-20',
}

const listStyles = 'list-disc pl-6 space-y-2 text-neutral-charcoal/80 dark:text-white/80'

// Table of Contents structure
const sections = [
  { id: 'information-we-collect', title: '1. Information We Collect' },
  { id: 'how-we-use-information', title: '2. How We Use Information' },
  { id: 'information-sharing', title: '3. Information Sharing' },
  { id: 'data-security', title: '4. Data Security' },
  { id: 'your-rights', title: '5. Your Rights' },
  { id: 'cookie-policy', title: '6. Cookie Policy' },
  { id: 'contact-information', title: '7. Contact Information' },
]

export default function PrivacyPolicyPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button after scrolling 500px
      setShowBackToTop(window.scrollY > 500)

      // Highlight active section in TOC
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for any fixed header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 py-16 print:bg-white print:py-0">
      <div className="container mx-auto px-6 print:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Table of Contents Sidebar - Desktop Only */}
            <aside className="hidden lg:block lg:col-span-3 print:hidden">
              <div className="sticky top-24 space-y-1">
                <h2 className="text-sm font-bold text-neutral-charcoal dark:text-white mb-4 uppercase tracking-wide">
                  Contents
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-brand-bright-blue text-white font-semibold'
                          : 'text-neutral-charcoal/70 dark:text-white/70 hover:bg-neutral-light-grey dark:hover:bg-slate-700 hover:text-neutral-charcoal dark:hover:text-white'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9">
              <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800 print:shadow-none print:rounded-none">
                <header className="mb-10 border-b border-neutral-light-grey pb-6 dark:border-white/10 print:border-black">
                  <p className="text-sm tracking-wide text-brand-bright-blue uppercase print:text-black">Legal</p>
                  <h1 className="mt-2 text-4xl font-bold text-neutral-charcoal dark:text-white print:text-black">
                    Privacy Policy
                  </h1>
                  <p className="mt-2 text-neutral-charcoal/70 dark:text-white/80 print:text-black">
                    Last Updated:{' '}
                    <time dateTime={lastUpdated.dateTime} className="font-medium">
                      {lastUpdated.label}
                    </time>
                  </p>
                  <p className="mt-4 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    Anderson Cleaning Company ("we," "us," or "our") provides commercial cleaning services
                    for organizations throughout Western Massachusetts and Northern Connecticut. This
                    Privacy Policy describes how we collect, use, and safeguard personal information when
                    you visit {COMPANY_INFO.name}&apos;s website, request quotes, or engage with our
                    services.
                  </p>
                </header>

                <section id="information-we-collect" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    1. Information We Collect
                  </h2>
                  <div className="mt-4 space-y-6 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    <div>
                      <h3 className="font-semibold text-neutral-charcoal dark:text-white print:text-black">
                        Contact &amp; Quote Information
                      </h3>
                      <ul className={`${listStyles} print:text-black`}>
                        <li>
                          Contact form submissions, including name, email, phone, company, and mailing
                          address.
                        </li>
                        <li>
                          Quote request data such as facility size, locations, industry, service needs, and
                          preferred cleaning frequency.
                        </li>
                        <li>
                          Optional details you provide about budgets, start dates, or special requests.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-charcoal dark:text-white print:text-black">
                        Cookies &amp; Analytics
                      </h3>
                      <ul className={`${listStyles} print:text-black`}>
                        <li>
                          Usage data captured through Google Analytics and Vercel Analytics, including
                          pages visited, time on page, and referral sources.
                        </li>
                        <li>
                          Device and browser details that help us optimize performance for desktop and
                          mobile visitors.
                        </li>
                        <li>
                          Cookie identifiers that keep sessions active and remember preferences.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-charcoal dark:text-white print:text-black">Server Logs</h3>
                      <ul className={`${listStyles} print:text-black`}>
                        <li>IP addresses, browser type, and operating system.</li>
                        <li>Date/time stamps, referring pages, and exit pages.</li>
                        <li>Error diagnostics used to prevent security incidents and downtime.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="how-we-use-information" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    2. How We Use Information
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>Responding to contact inquiries and scheduling consultations.</li>
                    <li>Preparing proposals, pricing estimates, and service recommendations.</li>
                    <li>Managing ongoing client relationships and service delivery.</li>
                    <li>Improving website content, navigation, and user experience.</li>
                    <li>Analyzing traffic patterns to better serve commercial clients.</li>
                    <li>Complying with legal obligations and defending against claims.</li>
                  </ul>
                </section>

                <section id="information-sharing" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    3. Information Sharing
                  </h2>
                  <div className="mt-4 space-y-4 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    <p>
                      We do <strong>not</strong> sell, rent, or trade personal information. Information may
                      be shared only in these specific scenarios:
                    </p>
                    <ul className={`${listStyles} print:text-black`}>
                      <li>
                        <strong>Service Providers:</strong> Third-party tools like Google Analytics, Vercel
                        Analytics, and Resend (email delivery) that help operate our website.
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> If required by law enforcement, court orders,
                        or regulatory authorities.
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset
                        sale.
                      </li>
                      <li>
                        <strong>With Consent:</strong> When you explicitly authorize information sharing.
                      </li>
                    </ul>
                  </div>
                </section>

                <section id="data-security" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    4. Data Security
                  </h2>
                  <div className="mt-4 space-y-4 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    <p>
                      We implement industry-standard security measures to protect your information:
                    </p>
                    <ul className={`${listStyles} print:text-black`}>
                      <li>TLS/SSL encryption for all data transmitted to and from our website.</li>
                      <li>Secure database storage with access controls and regular backups.</li>
                      <li>Regular security audits and vulnerability assessments.</li>
                      <li>Employee training on data protection and confidentiality.</li>
                      <li>Incident response procedures for potential security breaches.</li>
                    </ul>
                    <p>
                      While we strive to protect your information, no online system is 100% secure. Please
                      use strong passwords and report suspicious activity to us immediately.
                    </p>
                  </div>
                </section>

                <section id="your-rights" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    5. Your Rights
                  </h2>
                  <div className="mt-4 space-y-4 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    <p>You have the following rights regarding your personal information:</p>
                    <ul className={`${listStyles} print:text-black`}>
                      <li>
                        <strong>Access:</strong> Request a copy of the personal information we hold about
                        you.
                      </li>
                      <li>
                        <strong>Correction:</strong> Update or correct inaccurate information.
                      </li>
                      <li>
                        <strong>Deletion:</strong> Request that we delete your information (subject to legal
                        retention requirements).
                      </li>
                      <li>
                        <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.
                      </li>
                      <li>
                        <strong>Data Portability:</strong> Receive your information in a structured,
                        machine-readable format.
                      </li>
                    </ul>
                    <p>
                      To exercise these rights, contact us at {CONTACT_INFO.email.general} or call{' '}
                      {CONTACT_INFO.phone.formatted}.
                    </p>
                  </div>
                </section>

                <section id="cookie-policy" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    6. Cookie Policy
                  </h2>
                  <div className="mt-4 space-y-4 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    <p>
                      We use cookies to improve your browsing experience. Our cookies are categorized as:
                    </p>
                    <ul className={`${listStyles} print:text-black`}>
                      <li>
                        <strong>Essential Cookies:</strong> Required for basic website functionality
                        (session management, security).
                      </li>
                      <li>
                        <strong>Analytics Cookies:</strong> Track usage patterns to improve content and
                        performance (Google Analytics, Vercel Analytics).
                      </li>
                      <li>
                        <strong>Preference Cookies:</strong> Remember your settings like dark mode
                        preferences.
                      </li>
                    </ul>
                    <p>
                      You can manage cookie preferences through your browser settings. Disabling cookies may
                      affect website functionality.
                    </p>
                  </div>
                </section>

                <section id="contact-information" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white print:text-black">
                    7. Contact Information
                  </h2>
                  <div className="mt-4 space-y-4 text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    <p>
                      If you have questions about this Privacy Policy or wish to exercise your privacy
                      rights, please contact us:
                    </p>
                    <div className="rounded-lg bg-neutral-off-white p-6 dark:bg-slate-700 print:bg-gray-100">
                      <p className="font-semibold text-neutral-charcoal dark:text-white print:text-black">
                        {COMPANY_INFO.name}
                      </p>
                      <p className="mt-2 print:text-black">
                        Email: <a href={CONTACT_INFO.email.href} className="text-brand-bright-blue hover:underline print:text-black">{CONTACT_INFO.email.general}</a>
                      </p>
                      <p className="print:text-black">
                        Phone: <a href={CONTACT_INFO.phone.href} className="text-brand-bright-blue hover:underline print:text-black">{CONTACT_INFO.phone.formatted}</a>
                      </p>
                      <p className="print:text-black">Address: {CONTACT_INFO.address.street}</p>
                      <p className="print:text-black">
                        {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}
                      </p>
                    </div>
                    <p className="text-sm">
                      We will respond to privacy inquiries within 30 days. For urgent matters, please call
                      our office during business hours.
                    </p>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Floating */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-deep-blue text-white shadow-lg transition-all hover:bg-brand-bright-blue hover:shadow-xl print:hidden"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
