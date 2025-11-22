'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Sun, Moon } from 'lucide-react'

import QuoteMiniForm from '@/components/forms/QuoteMiniForm'
import QuoteAdvancedModal from '@/components/forms/QuoteAdvancedModal'
import { useTheme } from '@/lib/ThemeProvider'

const navigation = {
  services: [
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Janitorial Services', href: '/services' },
    { name: 'Floor Care', href: '/services' },
    { name: 'Window Cleaning', href: '/services' },
  ],
  industries: [
    { name: 'Healthcare', href: '/industries/healthcare' },
    { name: 'Corporate Offices', href: '/industries/corporate-offices' },
    { name: 'Educational Facilities', href: '/industries/educational-facilities' },
    { name: 'Manufacturing', href: '/industries/manufacturing-warehouses' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Testimonials', href: '/testimonials' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ],
}

export default function Footer() {
  const [showModal, setShowModal] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-12">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-1">
            <div>
              <h3 className="text-h3 font-bold text-white">Anderson Cleaning</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-off-white">
                Professional commercial cleaning services for businesses in Western Massachusetts and Northern Connecticut.
              </p>
            </div>
            <div className="mt-10 space-y-5 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                <Phone className="h-5 w-5 text-brand-emerald" aria-hidden="true" />
                <a
                  href="tel:+14133065053"
                  className="text-sm leading-6 text-neutral-off-white hover:text-brand-emerald transition-colors"
                >
                  (413) 306-5053
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                <Mail className="h-5 w-5 text-brand-emerald" aria-hidden="true" />
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="text-sm leading-6 text-neutral-off-white hover:text-brand-emerald transition-colors break-words"
                >
                  info@andersoncleaning.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                <MapPin className="h-5 w-5 text-brand-emerald flex-shrink-0" aria-hidden="true" />
                <div className="text-sm leading-6 text-neutral-off-white">
                  <span className="block">103 Wayside Avenue</span>
                  <span className="block">West Springfield, MA 01089</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:justify-start sm:items-center">
                <span className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                  Theme
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition"
                  aria-label="Toggle dark mode"
                >
                  <span className="relative h-5 w-5 text-brand-emerald" aria-hidden="true">
                    <Sun
                      className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                        theme === 'dark' ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'
                      }`}
                    />
                    <Moon
                      className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                        theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'
                      }`}
                    />
                  </span>
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-off-white/70 hover:text-brand-emerald transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-off-white hover:text-brand-emerald transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Industries</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.industries.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-off-white hover:text-brand-emerald transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-off-white hover:text-brand-emerald transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-neutral-off-white hover:text-brand-emerald transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <h3 className="text-lg font-semibold mb-4">Quick Quote Request</h3>
          <div className="max-w-md">
            <QuoteMiniForm
              source="footer"
              onOpenAdvanced={() => setShowModal(true)}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-neutral-off-white/80 text-center">
            &copy; {currentYear} Anderson Cleaning, Inc. All rights reserved.
          </p>
        </div>
      </div>
      <QuoteAdvancedModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </footer>
  )
}
