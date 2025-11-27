'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { CONTACT_INFO, COMPANY_INFO } from '@/lib/constants'
import { ChevronUp } from 'lucide-react'

const lastUpdated = {
  label: 'February 20, 2025',
  dateTime: '2025-02-20',
}

const listStyles = 'list-disc pl-6 space-y-2 text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80'

// Table of Contents structure
const sections = [
  { id: 'service-agreement', title: '1. Service Agreement' },
  { id: 'client-responsibilities', title: '2. Client Responsibilities' },
  { id: 'service-specifications', title: '3. Service Specifications' },
  { id: 'pricing-payment', title: '4. Pricing & Payment' },
  { id: 'insurance-liability', title: '5. Insurance & Liability' },
  { id: 'cancellation-policy', title: '6. Cancellation Policy' },
  { id: 'dispute-resolution', title: '7. Dispute Resolution' },
  { id: 'contact', title: 'Contact' },
]

export default function TermsOfServicePage() {
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
            <div className="lg:col-span-9" role="region" aria-label="Terms of service content">
              <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800 print:shadow-none print:rounded-none">
                <header className="mb-10 border-b border-neutral-light-grey pb-6 dark:border-white/10 print:border-black">
                  <p className="text-sm tracking-wide text-brand-bright-blue uppercase print:text-black">Legal</p>
                  <h1 className="mt-2 text-4xl font-bold text-neutral-charcoal dark:text-white print:text-black">
                    Terms of Service
                  </h1>
                  <p className="mt-2 text-neutral-charcoal/70 dark:text-white/80 print:text-black">
                    Last Updated:{' '}
                    <time dateTime={lastUpdated.dateTime} className="font-medium">
                      {lastUpdated.label}
                    </time>
                  </p>
                  <p className="mt-4 text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    These Terms of Service (the "Terms") govern the <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">commercial cleaning services</span> provided
                    by {COMPANY_INFO.name}. By requesting a quote, signing a proposal, or engaging our team
                    onsite, the <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">Client</span> agrees to the following.
                  </p>
                </header>

                <section id="service-agreement" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    1. Service Agreement
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>
                      Services include commercial janitorial, porter, and specialty cleaning solutions for
                      offices, medical practices, schools, retail, and industrial facilities.
                    </li>
                    <li>
                      Our service radius covers Western Massachusetts and Northern Connecticut within
                      approximately {COMPANY_INFO.serviceRadius.miles} miles of West Springfield, MA.
                    </li>
                    <li>
                      We exclusively serve business and institutional locations; residential properties are
                      outside the scope of these Terms.
                    </li>
                  </ul>
                </section>

                <section id="client-responsibilities" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    2. Client Responsibilities
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>
                      Provide secure access to facilities, including keys, access cards, alarm codes, and
                      any onboarding procedures for after-hours entry.
                    </li>
                    <li>
                      Ensure work areas are reasonably free of clutter so technicians can safely perform
                      assigned tasks.
                    </li>
                    <li>
                      Disclose known hazards (e.g., chemicals, equipment, biohazards) prior to service
                      start and notify us of changes promptly.
                    </li>
                    <li>
                      Pay invoices within agreed terms and notify us within five (5) business days of any
                      billing disputes.
                    </li>
                  </ul>
                </section>

                <section id="service-specifications" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    3. Service Specifications
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>
                      We follow documented <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">quality standards</span> aligned with OSHA, CDC, and industry best
                      practices.
                    </li>
                    <li>
                      Client schedules (daily, weekly, or project-based) are established during onboarding.
                      Changes require at least two (2) business days&apos; notice when possible.
                    </li>
                    <li>
                      Unless otherwise stated in the proposal, Anderson Cleaning Company supplies labor,
                      equipment, and standard cleaning products. Specialty consumables can be provided at
                      cost or stocked by the Client.
                    </li>
                    <li>
                      Special requests outside the defined scope should be submitted through the client
                      portal or account manager for approval and pricing before work begins.
                    </li>
                  </ul>
                </section>

                <section id="pricing-payment" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    4. Pricing &amp; Payment
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>Quotes remain valid for thirty (30) days unless otherwise stated in writing.</li>
                    <li>Invoices are due Net 30 from the service date or invoice date, whichever occurs first.</li>
                    <li>
                      Late payments may incur a 1.5% monthly finance charge (or the maximum allowed by law)
                      plus any collection costs.
                    </li>
                    <li>
                      We reserve the right to adjust pricing with fifteen (15) days' notice to reflect
                      changes in scope, chemicals, labor costs, or regulatory requirements.
                    </li>
                  </ul>
                </section>

                <section id="insurance-liability" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    5. Insurance &amp; Liability
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>
                      We maintain comprehensive <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">general liability coverage</span> and workers' compensation
                      insurance for all W-2 employees.
                    </li>
                    <li>
                      Our liability for property damage is limited to direct damages caused by proven
                      negligence and will not exceed the fees paid for the impacted month.
                    </li>
                    <li>
                      Client agrees to indemnify and hold Anderson Cleaning Company harmless against claims
                      arising from Client-provided equipment, chemicals, or hazardous conditions that were
                      not disclosed.
                    </li>
                  </ul>
                </section>

                <section id="cancellation-policy" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    6. Cancellation Policy
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>
                      Routine visits must be canceled or rescheduled at least twenty-four (24) hours in
                      advance to avoid being billed in full.
                    </li>
                    <li>
                      Emergency services requested by the Client may carry premium rates disclosed prior to
                      dispatch.
                    </li>
                    <li>
                      Either party may <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">terminate</span> ongoing agreements with thirty (30) days' written notice.
                      Outstanding invoices remain due upon termination.
                    </li>
                  </ul>
                </section>

                <section id="dispute-resolution" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    7. Dispute Resolution
                  </h2>
                  <ul className={`${listStyles} mt-4 print:text-black`}>
                    <li>
                      The parties will attempt in good faith to resolve disputes through their respective
                      account representatives.
                    </li>
                    <li>
                      Unresolved disputes proceed to <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">mediation</span> in Hampden County, Massachusetts, prior to
                      litigation.
                    </li>
                    <li>
                      If litigation becomes necessary, venue and jurisdiction reside with the state or
                      federal courts located in Massachusetts. The prevailing party is entitled to recover
                      reasonable attorney fees and costs.
                    </li>
                  </ul>
                </section>

                <section id="contact" className="pt-10 mb-10 scroll-mt-24">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
                    Contact
                  </h2>
                  <p className="mt-4 text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                    Questions about these Terms should be directed to{' '}
                    <a
                      href="mailto:contracts@andersoncleaning.com"
                      className="text-brand-bright-blue hover:underline print:text-black"
                    >
                      contracts@andersoncleaning.com
                    </a>{' '}
                    or {CONTACT_INFO.phone.formatted}.
                  </p>
                </section>
              </div>
            </div>
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
