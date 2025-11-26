'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const navigation = {
  services: [
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Janitorial Services', href: '/services/janitorial-services' },
    { name: 'All Services', href: '/services' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Industries', href: '/industries' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/anderson-cleaning-inc-',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/Andersonclean/',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/andersoncleaning',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/andersoncleaningma/',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* CTA Section - Above Footer - Distinctive gradient with urgent red CTA */}
      <section className="bg-gradient-to-r from-brand-deep-blue to-brand-bright-blue py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl">
            Ready to Experience Professional Cleaning?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90">
            Join 100+ businesses that trust Anderson Cleaning Company for their facility maintenance
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-[10px] bg-brand-red px-7 py-[14px] text-base font-semibold text-white transition-all duration-150 hover:bg-[#a00d25] active:bg-[#8a0b20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Start Today
            </Link>
            <a
              href="tel:+14133065053"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-white bg-transparent px-7 py-[14px] text-base font-semibold text-white transition-all duration-150 hover:bg-white/10 active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <Phone className="h-5 w-5" />
              Call (413) 306-5053
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer - Three Columns with Dark Mode Support */}
      <footer className="bg-neutral-off-white dark:bg-brand-deep-blue text-neutral-charcoal dark:text-white transition-colors duration-300" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
          {/* Three Columns - Clean Layout with Fixed Column Width */}
          <div className="pb-12 grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-[repeat(3,minmax(200px,1fr))] md:gap-x-12">
            {/* Column 1: Our Services */}
            <div>
              <h3 className="mb-4 text-body-sm font-semibold text-neutral-charcoal dark:text-white">Our Services</h3>
              <ul className="space-y-2.5">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-neutral-charcoal/70 dark:text-white/75 transition-colors duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="mb-4 text-body-sm font-semibold text-neutral-charcoal dark:text-white">Quick Links</h3>
              <ul className="space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-neutral-charcoal/70 dark:text-white/75 transition-colors duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h3 className="mb-4 text-body-sm font-semibold text-neutral-charcoal dark:text-white">Get in Touch</h3>
              <div className="space-y-2.5">
                <a
                  href="tel:+14133065053"
                  className="block text-body-sm text-neutral-charcoal/70 dark:text-white/75 transition-colors duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  (413) 306-5053
                </a>
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="block text-body-sm text-neutral-charcoal/70 dark:text-white/75 transition-colors duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  info@andersoncleaning.com
                </a>
                <div className="text-body-sm text-neutral-charcoal/70 dark:text-white/75">
                  <div>103 Wayside Avenue</div>
                  <div>West Springfield, MA 01089</div>
                </div>

                {/* Social Icons - Deep Blue, no backgrounds */}
                <div className="flex gap-4 pt-4">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-brand-deep-blue dark:text-white/90 transition-all duration-150 hover:text-brand-bright-blue hover:-translate-y-0.5 dark:hover:text-white"
                      aria-label={item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Copyright & Legal Links */}
          <div className="border-t border-brand-deep-blue/10 dark:border-brand-deep-blue/10 pt-12">
            <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
              <p className="text-center md:text-left text-[#4B5563] dark:text-white/70">
                © {currentYear} Anderson Cleaning Company. All rights reserved.
              </p>
              <nav className="flex flex-wrap gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-neutral-charcoal/70 dark:text-white/70 transition-colors hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-neutral-charcoal/70 dark:text-white/70 transition-colors hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/accessibility"
                  className="text-neutral-charcoal/70 dark:text-white/70 transition-colors hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Accessibility
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="text-neutral-charcoal/70 dark:text-white/70 transition-colors hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Sitemap
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
