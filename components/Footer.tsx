'use client'

import Link from 'next/link'

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
          width="24"
          height="24"
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
          width="24"
          height="24"
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
          width="24"
          height="24"
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
          width="24"
          height="24"
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
      {/* Main Footer - Four Columns with Standardized Styling */}
      <footer className="bg-neutral-off-white dark:bg-brand-deep-blue text-neutral-charcoal dark:text-white transition-colors duration-300 border-t border-[#E0E0E0] dark:border-white/10 pb-safe-bottom" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-[40px] py-[60px]">
          {/* Four Columns - Standardized Layout */}
          <div className="pb-12 grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            {/* Column 1: Our Services */}
            <div>
              <h3 className="mb-4 text-[14px] font-bold text-neutral-charcoal dark:text-white uppercase tracking-[1.2px]">Our Services</h3>
              <ul className="space-y-2.5">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="mb-4 text-[14px] font-bold text-neutral-charcoal dark:text-white uppercase tracking-[1.2px]">Quick Links</h3>
              <ul className="space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h3 className="mb-4 text-[14px] font-bold text-neutral-charcoal dark:text-white uppercase tracking-[1.2px]">Get in Touch</h3>
              <div className="space-y-2.5">
                <a
                  href="tel:+14133065053"
                  className="block text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  (413) 306-5053
                </a>
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="block text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  info@andersoncleaning.com
                </a>
                <div className="text-[15px] text-neutral-charcoal/70 dark:text-white/70">
                  <div>103 Wayside Avenue</div>
                  <div>West Springfield, MA 01089</div>
                </div>
              </div>
            </div>

            {/* Column 4: Social */}
            <div>
              <h3 className="mb-4 text-[14px] font-bold text-neutral-charcoal dark:text-white uppercase tracking-[1.2px]">Social</h3>
              <div className="flex">
                {navigation.social.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`
                      relative group
                      text-brand-bright-blue dark:text-brand-bright-blue
                      transition-all duration-150
                      hover:opacity-80 hover:-translate-y-0.5
                      ${index < navigation.social.length - 1 ? 'mr-3' : ''}
                    `}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                  >
                    {item.icon}
                    {/* Tooltip on hover */}
                    <span className="
                      absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                      px-2 py-1 bg-neutral-charcoal dark:bg-white
                      text-white dark:text-neutral-charcoal
                      text-[12px] font-medium rounded
                      opacity-0 group-hover:opacity-100
                      pointer-events-none transition-opacity duration-150
                      whitespace-nowrap
                    ">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar - Copyright & Legal Links */}
          <div className="border-t border-brand-deep-blue/10 dark:border-white/10 pt-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-center md:text-left text-[13px] text-neutral-charcoal/60 dark:text-white/60">
                © {currentYear} Anderson Cleaning Company. All rights reserved.
              </p>
              <nav className="flex flex-wrap gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/accessibility"
                  className="text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                >
                  Accessibility
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="text-[15px] text-neutral-charcoal/70 dark:text-white/70 transition-all duration-150 hover:text-brand-bright-blue dark:hover:text-white"
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
