import type { Metadata } from 'next'
import { CONTACT_INFO } from '@/lib/constants'
import { Eye, CheckCircle2, User, Settings } from 'lucide-react'

const lastUpdated = {
  label: 'February 20, 2025',
  dateTime: '2025-02-20',
}

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Learn how Anderson Cleaning Company designs its digital experiences to meet WCAG 2.1 AA accessibility standards.',
  alternates: {
    canonical: 'https://andersoncleaning.com/accessibility',
  },
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <header className="mb-8">
            {/* Accessibility Icon */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20">
                <Eye className="h-8 w-8 text-brand-bright-blue" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-brand-bright-blue">Accessibility</p>
                <h1 className="text-4xl font-bold text-neutral-charcoal dark:text-white">
                  Accessibility Statement
                </h1>
              </div>
            </div>

            <p className="mt-4 text-neutral-charcoal/70 dark:text-white/80">
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

          {/* WCAG 2.1 AA Compliance Badge */}
          <div className="mb-8 rounded-xl border-2 border-brand-bright-blue bg-brand-bright-blue/5 p-6 dark:bg-brand-bright-blue/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-bright-blue">
                  <CheckCircle2 className="h-10 w-10 text-white" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-brand-deep-blue dark:text-brand-bright-blue mb-2">
                  WCAG 2.1 Level AA Compliance
                </h2>
                <p className="text-sm text-neutral-charcoal/80 dark:text-white/80">
                  This website strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 px-3 py-1 text-xs font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                    Perceivable
                  </span>
                  <span className="rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 px-3 py-1 text-xs font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                    Operable
                  </span>
                  <span className="rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 px-3 py-1 text-xs font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                    Understandable
                  </span>
                  <span className="rounded-full bg-brand-deep-blue/10 dark:bg-brand-bright-blue/20 px-3 py-1 text-xs font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                    Robust
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section id="accessibility-features" className="pt-10 mb-10 scroll-mt-24">
            <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
              Accessibility Features
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mt-4 print:text-black">
              <li><span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">Semantic HTML structure</span> with clearly defined headings and landmark regions for easy navigation.</li>
              <li>High-contrast typography with <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">minimum 4.5:1 contrast ratio</span> for body text and 7:1 for large text, exceeding WCAG AA standards.</li>
              <li><span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">Keyboard-accessible navigation</span>, forms, and modal dialogs—all interactive elements reachable via Tab, Enter, and Arrow keys.</li>
              <li>
                Labeled form controls with inline error messaging announced to assistive
                technologies via <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">aria-describedby</span> and <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">aria-invalid</span> attributes.
              </li>
              <li>
                Descriptive <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">alt text</span> for all meaningful imagery, with decorative images properly hidden from screen readers.
              </li>
              <li>Dark mode support for low-light environments and visual comfort preferences.</li>
              <li>Touch targets minimum 44×44 pixels for mobile accessibility.</li>
            </ul>
          </section>

          <section id="ongoing-improvement" className="pt-10 mb-10 scroll-mt-24">
            <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
              Ongoing Improvement
            </h2>
            <p className="text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mt-4 print:text-black">
              Accessibility is an ongoing practice. Our product and content teams review new features
              against <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">WCAG 2.1 AA success criteria</span>, leverage automated testing tools, and schedule
              manual audits before major releases. When regressions are discovered, remediation is
              prioritized in the next release cycle.
            </p>
          </section>

          <section id="assistive-technology" className="pt-10 mb-10 scroll-mt-24">
            <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
              Assistive Technology Compatibility
            </h2>
            <p className="text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mt-4 print:text-black">
              The site is optimized for current versions of leading browsers and assistive
              technologies, including <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">screen readers</span> (JAWS, NVDA, VoiceOver), screen magnifiers, and
              speech-recognition software. Responsive layouts ensure equivalent experiences on
              desktop, tablet, and mobile devices.
            </p>
          </section>

          {/* Browser Accessibility Settings */}
          <section id="browser-settings" className="pt-10 mb-10 scroll-mt-24">
            <div className="rounded-lg border-2 border-neutral-light-grey dark:border-slate-700 bg-neutral-off-white dark:bg-slate-700/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Settings className="h-6 w-6 text-brand-bright-blue" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white mb-2">
                    Accessibility Settings
                  </h2>
                  <p className="text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mb-3">
                    Most modern browsers include built-in accessibility features that can enhance your browsing experience:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80">
                    <li><strong>Text Size:</strong> Zoom in/out using Ctrl/Cmd + Plus/Minus keys</li>
                    <li><strong>Dark Mode:</strong> Toggle using the moon/sun icon in our site header</li>
                    <li><strong>Screen Reader:</strong> Enable your browser's built-in screen reader or use dedicated software</li>
                    <li><strong>High Contrast:</strong> Many browsers offer high-contrast modes in settings</li>
                    <li><strong>Keyboard Navigation:</strong> Navigate using Tab, Enter, and Arrow keys</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance Audit Results */}
          <section id="compliance-audit" className="pt-10 mb-10 scroll-mt-24">
            <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
              Compliance Audit Results
            </h2>
            <div className="mt-4 space-y-4">
              <p className="text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 print:text-black">
                Anderson Cleaning Company undergoes <span className="font-semibold text-brand-bright-blue dark:text-brand-bright-blue print:text-black">annual accessibility audits</span> to ensure ongoing compliance with WCAG 2.1 AA standards. Our most recent comprehensive audit was completed in <strong>February 2025</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-brand-bright-blue/5 dark:bg-brand-bright-blue/10 rounded-lg p-4 border border-brand-bright-blue/20 dark:border-brand-bright-blue/30">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-400" aria-hidden="true" />
                    <h3 className="text-[16px] font-bold text-brand-deep-blue dark:text-white">Automated Testing</h3>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80">
                    Continuous integration tests run on every deployment using <span className="font-semibold">axe-core</span> and <span className="font-semibold">Lighthouse CI</span> accessibility audits.
                  </p>
                </div>

                <div className="bg-brand-bright-blue/5 dark:bg-brand-bright-blue/10 rounded-lg p-4 border border-brand-bright-blue/20 dark:border-brand-bright-blue/30">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-500 dark:text-green-400" aria-hidden="true" />
                    <h3 className="text-[16px] font-bold text-brand-deep-blue dark:text-white">Manual Testing</h3>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80">
                    Annual manual testing with assistive technologies including <span className="font-semibold">JAWS</span>, <span className="font-semibold">NVDA</span>, and <span className="font-semibold">VoiceOver</span> screen readers.
                  </p>
                </div>
              </div>

              <div className="bg-neutral-off-white dark:bg-slate-700/50 rounded-lg p-4 border border-neutral-light-grey dark:border-slate-700">
                <p className="text-[14px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80">
                  <strong className="text-neutral-charcoal dark:text-white">Next scheduled audit:</strong> February 2026
                </p>
                <p className="text-[14px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mt-2">
                  Audit results and remediation plans are available upon request by contacting <a href="mailto:accessibility@andersoncleaning.com" className="text-brand-bright-blue hover:underline font-medium">accessibility@andersoncleaning.com</a>.
                </p>
              </div>
            </div>
          </section>

          <section id="need-assistance" className="pt-10 mb-10 scroll-mt-24">
            <h2 className="text-[24px] font-bold text-brand-deep-blue dark:text-white print:text-black">
              Need Assistance?
            </h2>
            <p className="text-[16px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mt-4 print:text-black">
              If you encounter an accessibility barrier, please contact us so we can assist you and
              remediate the issue:
            </p>
            <div className="rounded-lg bg-brand-bright-blue/5 dark:bg-brand-bright-blue/10 p-4 border border-brand-bright-blue/20 dark:border-brand-bright-blue/30 mt-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <User className="h-5 w-5 text-brand-bright-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-[16px] leading-[1.6]">
                    <strong className="text-neutral-charcoal dark:text-white">Email:</strong>{' '}
                    <a
                      href="mailto:accessibility@andersoncleaning.com"
                      className="text-brand-bright-blue hover:underline font-medium"
                    >
                      accessibility@andersoncleaning.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <User className="h-5 w-5 text-brand-bright-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-[16px] leading-[1.6]">
                    <strong className="text-neutral-charcoal dark:text-white">Phone:</strong>{' '}
                    <a href={CONTACT_INFO.phone.href} className="text-brand-bright-blue hover:underline font-medium">
                      {CONTACT_INFO.phone.formatted}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <User className="h-5 w-5 text-brand-bright-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-[16px] leading-[1.6]">
                    <strong className="text-neutral-charcoal dark:text-white">Mail:</strong>{' '}
                    <span className="text-neutral-charcoal dark:text-white">{CONTACT_INFO.address.full}</span>
                  </div>
                </li>
              </ul>
            </div>
            <p className="text-[14px] leading-[1.6] text-neutral-charcoal/80 dark:text-white/80 mt-4 print:text-black">
              Please include a description of the problem, the assistive technology used (if any),
              and the page you were visiting. We aim to respond within two business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
