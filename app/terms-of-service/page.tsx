import type { Metadata } from 'next'
import { CONTACT_INFO, COMPANY_INFO } from '@/lib/constants'

const lastUpdated = {
  label: 'February 20, 2025',
  dateTime: '2025-02-20',
}

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Review the commercial cleaning service terms that govern engagements with Anderson Cleaning Company in Western Massachusetts and Northern Connecticut.',
  alternates: {
    canonical: 'https://andersoncleaning.com/terms-of-service',
  },
}

const sectionClass = 'mb-8 space-y-3 text-neutral-charcoal/80 dark:text-white/80'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <header className="mb-10 border-b border-neutral-light-grey pb-6 dark:border-white/10">
            <p className="text-sm uppercase tracking-wide text-brand-bright-blue">Legal</p>
            <h1 className="mt-2 text-4xl font-bold text-neutral-charcoal dark:text-white">
              Terms of Service
            </h1>
            <p className="mt-2 text-neutral-charcoal/70 dark:text-white/80">
              Last Updated:{' '}
              <time dateTime={lastUpdated.dateTime} className="font-medium">
                {lastUpdated.label}
              </time>
            </p>
            <p className="mt-4 text-neutral-charcoal/80 dark:text-white/80">
              These Terms of Service (the “Terms”) govern the commercial cleaning services provided
              by {COMPANY_INFO.name}. By requesting a quote, signing a proposal, or engaging our team
              onsite, the client (“Client”) agrees to the following.
            </p>
          </header>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              1. Service Agreement
            </h2>
            <ul className="list-disc pl-6 space-y-2">
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

            <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              2. Client Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
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

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              3. Service Specifications
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We follow documented quality standards aligned with OSHA, CDC, and industry best
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

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              4. Pricing &amp; Payment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Quotes remain valid for thirty (30) days unless otherwise stated in writing.</li>
              <li>Invoices are due Net 30 from the service date or invoice date, whichever occurs first.</li>
              <li>
                Late payments may incur a 1.5% monthly finance charge (or the maximum allowed by law)
                plus any collection costs.
              </li>
              <li>
                We reserve the right to adjust pricing with fifteen (15) days’ notice to reflect
                changes in scope, chemicals, labor costs, or regulatory requirements.
              </li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              5. Insurance &amp; Liability
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We maintain comprehensive general liability coverage and workers’ compensation
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

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              6. Cancellation Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Routine visits must be canceled or rescheduled at least twenty-four (24) hours in
                advance to avoid being billed in full.
              </li>
              <li>
                Emergency services requested by the Client may carry premium rates disclosed prior to
                dispatch.
              </li>
              <li>
                Either party may terminate ongoing agreements with thirty (30) days’ written notice.
                Outstanding invoices remain due upon termination.
              </li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              7. Dispute Resolution
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The parties will attempt in good faith to resolve disputes through their respective
                account representatives.
              </li>
              <li>
                Unresolved disputes proceed to mediation in Hampden County, Massachusetts, prior to
                litigation.
              </li>
              <li>
                If litigation becomes necessary, venue and jurisdiction reside with the state or
                federal courts located in Massachusetts. The prevailing party is entitled to recover
                reasonable attorney fees and costs.
              </li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              Contact
            </h2>
            <p>
              Questions about these Terms should be directed to{' '}
              <a
                href="mailto:contracts@andersoncleaning.com"
                className="text-brand-bright-blue hover:underline"
              >
                contracts@andersoncleaning.com
              </a>{' '}
              or {CONTACT_INFO.phone.formatted}.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
