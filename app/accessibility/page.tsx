import type { Metadata } from 'next'
import { CONTACT_INFO } from '@/lib/constants'

const lastUpdated = {
  label: 'February 20, 2025',
  dateTime: '2025-02-20',
}

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Learn how Anderson Cleaning Company designs its digital experiences to meet WCAG 2.1 AA accessibility standards.',
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <header className="mb-8">
            <p className="text-sm uppercase tracking-wide text-brand-bright-blue">Accessibility</p>
            <h1 className="mt-2 text-4xl font-bold text-neutral-charcoal dark:text-white">
              Accessibility Statement
            </h1>
            <p className="mt-2 text-neutral-charcoal/70 dark:text-white/80">
              Last Updated:{' '}
              <time dateTime={lastUpdated.dateTime} className="font-medium">
                {lastUpdated.label}
              </time>
            </p>
            <p className="mt-4 text-neutral-charcoal/80 dark:text-white/80">
              Anderson Cleaning Company is committed to providing a website that is accessible to the
              widest possible audience, regardless of technology or ability. Our goal is to meet or
              exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA across all public
              content, quote workflows, and client resources.
            </p>
          </header>

          <section className="mb-8 space-y-3 text-neutral-charcoal/80 dark:text-white/80">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              Accessibility Features
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantic HTML structure with clearly defined headings and landmark regions.</li>
              <li>High-contrast typography and dark-mode support for low-light environments.</li>
              <li>Keyboard-accessible navigation, forms, and modal dialogs.</li>
              <li>
                Labelled form controls with inline error messaging announced to assistive
                technologies.
              </li>
              <li>
                Descriptive alt text for meaningful imagery and decorative handling for ornamental
                graphics.
              </li>
            </ul>
          </section>

          <section className="mb-8 space-y-3 text-neutral-charcoal/80 dark:text-white/80">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              Ongoing Improvement
            </h2>
            <p>
              Accessibility is an ongoing practice. Our product and content teams review new features
              against WCAG 2.1 AA success criteria, leverage automated testing tools, and schedule
              manual audits before major releases. When regressions are discovered, remediation is
              prioritized in the next release cycle.
            </p>
          </section>

          <section className="mb-8 space-y-3 text-neutral-charcoal/80 dark:text-white/80">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              Assistive Technology Compatibility
            </h2>
            <p>
              The site is optimized for current versions of leading browsers and assistive
              technologies, including screen readers (JAWS, NVDA, VoiceOver), screen magnifiers, and
              speech-recognition software. Responsive layouts ensure equivalent experiences on
              desktop, tablet, and mobile devices.
            </p>
          </section>

          <section className="mb-8 space-y-3 text-neutral-charcoal/80 dark:text-white/80">
            <h2 className="text-2xl font-semibold text-neutral-charcoal dark:text-white">
              Need Assistance?
            </h2>
            <p>
              If you encounter an accessibility barrier, please contact us so we can assist you and
              remediate the issue:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Email:{' '}
                <a
                  href="mailto:accessibility@andersoncleaning.com"
                  className="text-brand-bright-blue hover:underline"
                >
                  accessibility@andersoncleaning.com
                </a>
              </li>
              <li>Phone: {CONTACT_INFO.phone.formatted}</li>
              <li>Mail: {CONTACT_INFO.address.full}</li>
            </ul>
            <p>
              Please include a description of the problem, the assistive technology used (if any),
              and the page you were visiting. We aim to respond within two business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
