'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import { serviceSlugs, servicesData } from '@/lib/services-data'
import { industries } from '@/lib/industries-data'
import { useTheme } from '@/lib/ThemeProvider'

// Simplified navigation - 5 main categories + Contact
const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

// Resources Menu Data - consolidating secondary pages
const RESOURCES_MENU = [
  { name: 'Blog & Articles', href: '/blog', description: 'Cleaning tips and industry insights' },
  { name: 'FAQ', href: '/faq', description: 'Common questions answered' },
  { name: 'Case Studies', href: '/case-studies', description: 'Client success stories' },
  { name: 'Testimonials', href: '/testimonials', description: 'What our clients say' },
  { name: 'Careers', href: '/careers', description: 'Join our team' },
  { name: 'Special Offers', href: '/promotions', description: 'Current promotions and referrals' },
]

// Removed phone variants for simplicity

// Services Menu Data
const SERVICES_MENU = [
  ...serviceSlugs.map((slug) => {
    const service = servicesData[slug]
    return {
      title: service.title,
      href: `/services/${slug}`,
      description: service.tagline,
    }
  }),
  // Supply Management - Premium add-on service
  {
    title: 'Supply Management',
    href: '/supply-management',
    description: 'Automatic restocking of facility consumables',
  },
]

// Industries Menu Data
const INDUSTRIES_MENU = industries.map((industry) => ({
  title: industry.name,
  href: `/industries/${industry.slug}`,
  icon: industry.icon,
}))

// Locations Menu Data
const LOCATIONS_MENU = {
  massachusetts: [
    { name: 'Springfield', slug: 'springfield-ma' },
    { name: 'West Springfield', slug: 'west-springfield-ma' },
    { name: 'Chicopee', slug: 'chicopee-ma' },
    { name: 'Holyoke', slug: 'holyoke-ma' },
    { name: 'Worcester County', slug: 'worcester-county-ma' },
    { name: 'Northampton & Amherst', slug: 'northampton-amherst-ma' },
  ],
  connecticut: [
    { name: 'Hartford', slug: 'hartford-ct' },
    { name: 'Enfield', slug: 'enfield-ct' },
    { name: 'Windsor', slug: 'windsor-ct' },
  ],
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)
  const { theme } = useTheme()

  // Single logo source based on theme - consolidated approach
  const logoSrc = theme === 'dark'
    ? '/brand/white/logo-full-2000-white.png'
    : '/brand/color/logo-full-2000.png'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrolled(currentScrollY > 20)

      // Hide header on scroll down, show on scroll up (mobile only)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHideHeader(true)
      } else if (currentScrollY < lastScrollY.current) {
        setHideHeader(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeDropdown])

  // Determine if we're on the home page
  const isHomePage = pathname === '/'

  const trackPhoneClick = useCallback((location: string) => {
    if (typeof window === 'undefined') return
    const dataLayer = (window as any).dataLayer || ((window as any).dataLayer = [])
    dataLayer.push({
      event: 'phone_click',
      location,
    })
  }, [])

  const phoneLink = useMemo(
    () => ({
      href: CONTACT_INFO.phone.href,
      formatted: CONTACT_INFO.phone.formatted,
    }),
    []
  )

  // Dropdown hover handlers with delay for better UX
  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-lg transition-all duration-300 dark:bg-brand-deep-blue/95 dark:backdrop-blur-lg ${
        scrolled ? 'shadow-md border-b border-neutral-light-grey dark:border-white/10' : 'shadow-sm'
      } ${hideHeader ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition-opacity hover:opacity-80">
            {/* Single responsive logo - React-controlled theme swapping */}
            <img
              src={logoSrc}
              alt="Anderson Cleaning Company"
              className="h-10 w-auto md:h-12 lg:h-14 object-contain"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-3 text-neutral-charcoal dark:text-white border-2 border-neutral-charcoal/20 dark:border-white/20 hover:bg-neutral-charcoal/5 dark:hover:bg-white/10 transition-colors min-h-[48px] min-w-[48px]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-7 w-7" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('services')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 text-sm font-medium tracking-wide leading-6 transition-all duration-150 ${
                pathname.startsWith('/services')
                  ? 'text-brand-bright-blue dark:text-white'
                  : 'text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-white/80'
              }`}
              aria-expanded={activeDropdown === 'services'}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'services' ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {/* Services Dropdown Menu */}
            {activeDropdown === 'services' && (
              <div className="absolute left-0 top-full mt-2 w-96 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-800">
                <div className="border-b border-gray-100 px-4 pb-2 pt-4 dark:border-white/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-neutral-charcoal">
                    Our Services
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {SERVICES_MENU.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="group block px-4 py-3 transition-colors hover:bg-brand-bright-blue/50 dark:hover:bg-slate-700"
                      onClick={closeDropdown}
                    >
                      <div className="font-medium text-neutral-charcoal group-hover:text-brand-bright-blue dark:text-white dark:group-hover:text-brand-bright-blue">
                        {service.title}
                      </div>
                      <div className="mt-1 text-sm text-neutral-charcoal/70 dark:text-white/70">
                        {service.description}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 px-4 pt-3 pb-4 dark:border-white/10">
                  <Link
                    href="/services"
                    className="text-sm font-medium text-brand-bright-blue hover:text-[#006bc4] dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('industries')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              href="/industries"
              className={`flex items-center gap-1 text-sm font-medium tracking-wide leading-6 transition-all duration-150 ${
                pathname.startsWith('/industries')
                  ? 'text-brand-bright-blue dark:text-white'
                  : 'text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-white/80'
              }`}
              aria-expanded={activeDropdown === 'industries'}
              aria-haspopup="true"
            >
              Industries
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'industries' ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {/* Industries Dropdown Menu */}
            {activeDropdown === 'industries' && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-800">
                <div className="border-b border-gray-100 px-4 pb-2 pt-4 dark:border-white/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-neutral-charcoal">
                    Industries We Serve
                  </h3>
                </div>
                {INDUSTRIES_MENU.map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="group block px-4 py-3 transition-colors hover:bg-brand-bright-blue/50 dark:hover:bg-slate-700"
                    onClick={closeDropdown}
                  >
                    <div className="font-medium text-neutral-charcoal group-hover:text-brand-bright-blue dark:text-white dark:group-hover:text-brand-bright-blue">
                      {industry.title}
                    </div>
                  </Link>
                ))}
                <div className="border-t border-gray-100 px-4 pt-3 pb-4 dark:border-white/10">
                  <Link
                    href="/industries"
                    className="text-sm font-medium text-brand-bright-blue hover:text-[#006bc4] dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    View All Industries →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('locations')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              href="/locations"
              className={`flex items-center gap-1 text-sm font-medium tracking-wide leading-6 transition-all duration-150 ${
                pathname.startsWith('/locations')
                  ? 'text-brand-bright-blue dark:text-white'
                  : 'text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-white/80'
              }`}
              aria-expanded={activeDropdown === 'locations'}
              aria-haspopup="true"
            >
              Locations
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'locations' ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {/* Locations Dropdown Menu */}
            {activeDropdown === 'locations' && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-800">
                <div className="border-b border-gray-100 px-4 pb-2 pt-4 dark:border-white/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-neutral-charcoal">
                    Service Areas
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4">
                  {/* Massachusetts */}
                  <div>
                    <h4 className="mb-2 font-semibold text-neutral-charcoal/80 dark:text-white/80">Massachusetts</h4>
                    <ul className="space-y-1">
                      {LOCATIONS_MENU.massachusetts.map((location) => (
                        <li key={location.slug}>
                          <Link
                            href={`/locations/${location.slug}`}
                            className="text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue"
                            onClick={closeDropdown}
                          >
                            {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Connecticut */}
                  <div>
                    <h4 className="mb-2 font-semibold text-neutral-charcoal/80 dark:text-white/80">Connecticut</h4>
                    <ul className="space-y-1">
                      {LOCATIONS_MENU.connecticut.map((location) => (
                        <li key={location.slug}>
                          <Link
                            href={`/locations/${location.slug}`}
                            className="text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue"
                            onClick={closeDropdown}
                          >
                            {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-4 pt-3 pb-4 dark:border-white/10">
                  <Link
                    href="/locations"
                    className="text-sm font-medium text-brand-bright-blue hover:text-[#006bc4] dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    View All Locations →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter('resources')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium tracking-wide leading-6 transition-all duration-150 ${
                pathname.startsWith('/blog') || pathname.startsWith('/faq') || pathname.startsWith('/case-studies') || pathname.startsWith('/testimonials') || pathname.startsWith('/careers') || pathname.startsWith('/promotions')
                  ? 'text-brand-bright-blue dark:text-white'
                  : 'text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-white/80'
              }`}
              aria-expanded={activeDropdown === 'resources'}
              aria-haspopup="true"
            >
              Resources
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'resources' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Resources Dropdown Menu */}
            {activeDropdown === 'resources' && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-800">
                <div className="border-b border-gray-100 px-4 pb-2 pt-4 dark:border-white/10">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-neutral-charcoal">
                    Resources & Learning
                  </h3>
                </div>
                <div className="py-2">
                  {RESOURCES_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block px-4 py-3 transition-colors hover:bg-brand-bright-blue/50 dark:hover:bg-slate-700"
                      onClick={closeDropdown}
                    >
                      <div className="font-medium text-neutral-charcoal group-hover:text-brand-bright-blue dark:text-white dark:group-hover:text-brand-bright-blue">
                        {item.name}
                      </div>
                      <div className="mt-1 text-sm text-neutral-charcoal/70 dark:text-white/70">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Regular Navigation Links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium tracking-wide leading-6 transition-all duration-150 ${
                pathname === item.href
                  ? 'text-brand-bright-blue dark:text-white'
                  : 'text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-white/80'
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-[4px] left-0 right-0 h-[3px] bg-brand-deep-blue dark:bg-white rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Contact Actions - Apple-style simplified */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
          <a
            href={phoneLink.href}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-transparent border-2 border-brand-deep-blue dark:border-white text-brand-deep-blue dark:text-white hover:bg-brand-deep-blue/10 dark:hover:bg-white/10 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep-blue focus-visible:ring-offset-2"
            onClick={() => trackPhoneClick('header-desktop')}
            aria-label={`Call Anderson Cleaning Company at ${phoneLink.formatted}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            href="/quote"
            className="rounded-full bg-brand-red px-7 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#a00d25] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            Quote
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-[9999] w-full overflow-y-auto bg-white dark:bg-brand-deep-blue px-6 py-6 sm:max-w-sm sm:shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Anderson Cleaning Company</span>
                <img
                  src="/brand/color/logo-icon-512.png"
                  alt="Anderson Cleaning Company"
                  className="h-10 w-auto dark:hidden"
                  width="40"
                  height="40"
                />
                <img
                  src="/brand/white/logo-icon-512-white.png"
                  alt="Anderson Cleaning Company"
                  className="hidden h-10 w-auto dark:block"
                  width="40"
                  height="40"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-full p-3 text-neutral-charcoal dark:text-white hover:bg-neutral-light-grey dark:hover:bg-white/10 transition-colors min-h-[48px] min-w-[48px] inline-flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                {/* Primary CTAs - Quote and Phone */}
                <div className="py-6 space-y-4">
                  {/* Request Quote CTA - Primary Action */}
                  <Link
                    href="/quote"
                    className="block w-full rounded-full bg-brand-red px-7 py-4 text-center text-base font-semibold text-white shadow-sm hover:bg-[#a00d25] transition-all duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Request a Quote
                  </Link>

                  {/* Phone CTA - Secondary Action */}
                  <a
                    href={phoneLink.href}
                    onClick={() => trackPhoneClick('header-mobile-menu-top')}
                    className="flex items-center justify-between p-4 rounded-xl bg-brand-bright-blue/10 dark:bg-white/10 hover:bg-brand-bright-blue/20 dark:hover:bg-white/20 transition-colors min-h-[56px]"
                  >
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-white/60 mb-1">
                        Call Us Now
                      </div>
                      <div className="text-lg font-bold text-brand-deep-blue dark:text-white">
                        {phoneLink.formatted}
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-bright-blue text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                  </a>
                </div>

                <div className="space-y-2 py-6">
                  {/* Services */}
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-services' ? null : 'mobile-services'
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-neutral-charcoal dark:text-white min-h-[48px]"
                      aria-expanded={activeDropdown === 'mobile-services'}
                    >
                      Services
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeDropdown === 'mobile-services' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === 'mobile-services' && (
                      <div className="space-y-1 pl-4 pb-2 mt-2">
                        {SERVICES_MENU.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block py-3 text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue min-h-[44px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.title}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="block py-3 text-sm font-medium text-brand-bright-blue hover:text-[#006bc4] min-h-[44px] flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Industries */}
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-industries' ? null : 'mobile-industries'
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-neutral-charcoal dark:text-white min-h-[48px]"
                      aria-expanded={activeDropdown === 'mobile-industries'}
                    >
                      Industries
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeDropdown === 'mobile-industries' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === 'mobile-industries' && (
                      <div className="space-y-1 pl-4 pb-2 mt-2">
                        {INDUSTRIES_MENU.map((industry) => (
                          <Link
                            key={industry.href}
                            href={industry.href}
                            className="block py-3 text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue min-h-[44px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {industry.title}
                          </Link>
                        ))}
                        <Link
                          href="/industries"
                          className="block py-3 text-sm font-medium text-brand-bright-blue hover:text-[#006bc4] min-h-[44px] flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Locations */}
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-locations' ? null : 'mobile-locations'
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-neutral-charcoal dark:text-white min-h-[48px]"
                      aria-expanded={activeDropdown === 'mobile-locations'}
                    >
                      Locations
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeDropdown === 'mobile-locations' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === 'mobile-locations' && (
                      <div className="space-y-1 pl-4 pb-2 mt-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-neutral-charcoal py-2">
                          Massachusetts
                        </div>
                        {LOCATIONS_MENU.massachusetts.map((location) => (
                          <Link
                            key={location.slug}
                            href={`/locations/${location.slug}`}
                            className="block py-2.5 text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue min-h-[40px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {location.name}
                          </Link>
                        ))}
                        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-charcoal/60 dark:text-neutral-charcoal py-2 pt-4">
                          Connecticut
                        </div>
                        {LOCATIONS_MENU.connecticut.map((location) => (
                          <Link
                            key={location.slug}
                            href={`/locations/${location.slug}`}
                            className="block py-2.5 text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue min-h-[40px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {location.name}
                          </Link>
                        ))}
                        <Link
                          href="/locations"
                          className="block py-3 text-sm font-medium text-brand-bright-blue hover:text-[#006bc4] pt-3 min-h-[44px] flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View All →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Resources */}
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === 'mobile-resources' ? null : 'mobile-resources'
                        )
                      }
                      className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-neutral-charcoal dark:text-white min-h-[48px]"
                      aria-expanded={activeDropdown === 'mobile-resources'}
                    >
                      Resources
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeDropdown === 'mobile-resources' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === 'mobile-resources' && (
                      <div className="space-y-1 pl-4 pb-2 mt-2">
                        {RESOURCES_MENU.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block py-3 text-sm text-neutral-charcoal/70 hover:text-brand-bright-blue dark:text-neutral-charcoal dark:hover:text-brand-bright-blue min-h-[44px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Regular Links */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-4 text-base font-semibold leading-7 hover:bg-neutral-light-grey dark:hover:bg-slate-800 min-h-[48px] flex items-center ${
                        pathname === item.href
                          ? 'text-brand-bright-blue bg-neutral-light-grey dark:bg-slate-800'
                          : 'text-neutral-charcoal dark:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Contact Bar - Single Quote CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[120] bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg transition-transform duration-200 dark:border-white/10 dark:bg-brand-deep-blue/95 lg:hidden ${
          mobileMenuOpen ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="px-4 py-3">
          <Link
            href="/quote"
            className="block w-full text-center py-3.5 rounded-full bg-brand-red text-sm font-semibold text-white shadow-sm transition-colors active:bg-[#a00d25]"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
