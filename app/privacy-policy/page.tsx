import type { Metadata } from 'next'
import { CONTACT_INFO, COMPANY_INFO } from '@/lib/constants'

const lastUpdated = {
  label: 'February 20, 2025',
  dateTime: '2025-02-20',
}

export const metadata: Metadata = {
  title: 'Privacy Policy | Anderson Cleaning Company',
  description:
    'Learn how Anderson Cleaning Company collects, uses, and protects personal information for commercial cleaning clients and site visitors.',
}

const listStyles = 'list-disc pl-6 space-y-2 text-neutral-charcoal/80 dark:text-white/80'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <header className="mb-10 border-b border-neutral-light-grey pb-6 dark:border-white/10">
            <p className="text-sm tracking-wide text-brand-bright-blue uppercase">Legal</p>
            <h1 className="mt-2 text-4xl font-bold text-neutral-charcoal dark:text-white">
              Privacy Policy
            </h1>
            <p className="mt-2 text-neutral-charcoal/70 dark:text-white/80">
              Last Updated:{' '}
              <time dateTime={lastUpdated.dateTime} className="font-medium">
                {lastUpdated.label}
              </time>
            </p>
            <p className="mt-4 text-neutral-charcoal/80 dark:text-white/80">
              Anderson Cleaning Company (“we,” “us,” or “our”) provides commercial cleaning services
              for organizations throughout Western Massachusetts and Northern Connecticut. This
              Privacy Policy describes how we collect, use, and safeguard personal information when
              you visit {COMPANY_INFO.name}&apos;s website, request quotes, or engage with our
              services.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              1. Information We Collect
            </h2>
            <div className="mt-4 space-y-6 text-neutral-charcoal/80 dark:text-white/80">
              <div>
                <h3 className="font-semibold text-neutral-charcoal dark:text-white">
                  Contact &amp; Quote Information
                </h3>
                <ul className={listStyles}>
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
                <h3 className="font-semibold text-neutral-charcoal dark:text-white">
                  Cookies &amp; Analytics
                </h3>
                <ul className={listStyles}>
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
                <h3 className="font-semibold text-neutral-charcoal dark:text-white">Server Logs</h3>
                <ul className={listStyles}>
                  <li>IP addresses, browser type, and operating system.</li>
                  <li>Date/time stamps, referring pages, and exit pages.</li>
                  <li>Error diagnostics used to prevent security incidents and downtime.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              2. How We Use Information
            </h2>
            <ul className={`${listStyles} mt-4`}>
              <li>Responding to contact inquiries and scheduling consultations.</li>
              <li>Preparing proposals, pricing estimates, and service recommendations.</li>
              <li>Sending operational updates or service notices to current clients.</li>
              <li>Conducting internal analytics that improve response times and site usability.</li>
              <li>Meeting legal obligations, such as record-keeping and regulatory compliance.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              3. Information Sharing
            </h2>
            <ul className={`${listStyles} mt-4`}>
              <li>
                <strong>No selling of personal data.</strong> We do not sell or rent your personal
                information to third parties.
              </li>
              <li>
                We share limited data with trusted service providers (e.g., email providers,
                analytics platforms, CRM tools) so they can perform services on our behalf under
                confidentiality agreements.
              </li>
              <li>
                We may disclose information to comply with subpoenas, lawful requests, or to protect
                rights, property, and safety.
              </li>
              <li>
                In the event of a merger, acquisition, or asset sale, customer information may be
                transferred with standard contractual safeguards.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              4. Data Security
            </h2>
            <ul className={`${listStyles} mt-4`}>
              <li>SSL/TLS encryption protects data transmitted through web forms.</li>
              <li>
                Access to internal systems is restricted to authorized Anderson Cleaning Company
                employees who follow least-privilege policies.
              </li>
              <li>
                Critical systems and documents reside in secure cloud environments with strong
                authentication.
              </li>
              <li>
                Incident response procedures define escalation paths, notification steps, and
                remediation timelines in the event of a security issue.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              5. Your Rights
            </h2>
            <p className="mt-4 text-neutral-charcoal/80 dark:text-white/80">
              Depending on your jurisdiction, you may request to:
            </p>
            <ul className={`${listStyles} mt-2`}>
              <li>Access the personal data we maintain about you.</li>
              <li>Correct inaccurate or incomplete information.</li>
              <li>Request deletion, subject to legal or contractual requirements.</li>
              <li>Opt out of marketing communications at any time.</li>
              <li>
                Exercise “Do Not Sell or Share” rights under California privacy laws. We honor these
                requests even though we do not sell personal data.
              </li>
            </ul>
            <p className="mt-4 text-sm text-neutral-charcoal/70 dark:text-white/70">
              Submit a privacy inquiry by emailing{' '}
              <a
                href="mailto:privacy@andersoncleaning.com"
                className="text-brand-bright-blue hover:underline"
              >
                privacy@andersoncleaning.com
              </a>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              6. Cookie Policy
            </h2>
            <ul className={`${listStyles} mt-4`}>
              <li>
                <strong>Essential cookies:</strong> Support session management, authentication, and
                security.
              </li>
              <li>
                <strong>Analytics cookies:</strong> Google Analytics and Vercel Analytics help us
                understand aggregate site usage.
              </li>
              <li>
                <strong>Third-party cookies:</strong> Embedded services (such as scheduling or chat
                tools) may set their own cookies governed by their privacy policies.
              </li>
              <li>
                You can disable cookies through your browser settings; however, certain site features
                may become unavailable.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              7. Contact Information
            </h2>
            <p className="mt-4 text-neutral-charcoal/80 dark:text-white/80">
              Privacy Officer: Anderson Gomes
            </p>
            <ul className={`${listStyles} mt-2`}>
              <li>Email: <a href="mailto:privacy@andersoncleaning.com" className="text-brand-bright-blue hover:underline">privacy@andersoncleaning.com</a></li>
              <li>Phone: {CONTACT_INFO.phone.formatted}</li>
              <li>Address: {CONTACT_INFO.address.full}</li>
            </ul>
          </section>

          <p className="text-sm text-neutral-charcoal/60 dark:text-white/70">
            We review this policy annually and update it whenever products, regulations, or business
            processes change.
          </p>
        </div>
      </div>
    </div>
  )
}
