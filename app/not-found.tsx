'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Search, Home, ArrowRight, Phone, Mail } from 'lucide-react'

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to Google site search
      window.location.href = `https://www.google.com/search?q=site:andersoncleaning.com+${encodeURIComponent(searchQuery)}`
    }
  }

  const popularPages = [
    { name: 'Our Services', href: '/services', description: 'Commercial cleaning solutions' },
    { name: 'Get a Quote', href: '/quote', description: 'Free customized estimate' },
    { name: 'About Us', href: '/about', description: 'Learn about our company' },
    { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
    { name: 'Industries', href: '/industries', description: 'Specialized industry solutions' },
    { name: 'Careers', href: '/careers', description: 'Join our team' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-off-white dark:bg-slate-900 px-4 py-16">
      <div className="max-w-3xl w-full">
        {/* 404 Illustration */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <svg
              className="w-full h-48 mx-auto"
              viewBox="0 0 600 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* 404 Text */}
              <text
                x="300"
                y="120"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-brand-deep-blue dark:fill-white/20"
                style={{ fontSize: '120px', fontWeight: 'bold', opacity: 0.15 }}
              >
                404
              </text>

              {/* Cleaning Bucket Icon */}
              <g transform="translate(250, 70)">
                <path
                  d="M30 40 L50 40 L45 60 L25 60 Z"
                  className="fill-brand-bright-blue dark:fill-brand-bright-blue/70"
                />
                <path
                  d="M20 35 L60 35 L58 40 L22 40 Z"
                  className="fill-brand-deep-blue dark:fill-white/30"
                />
                <line
                  x1="35"
                  y1="35"
                  x2="35"
                  y2="20"
                  className="stroke-neutral-charcoal dark:stroke-white/70"
                  strokeWidth="2"
                />
                <path
                  d="M30 20 Q35 15 40 20"
                  className="stroke-neutral-charcoal dark:stroke-white/70"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            </svg>
          </div>

          <h1 className="text-h1 font-bold text-neutral-charcoal dark:text-white mb-2">
            Page Not Found
          </h1>

          <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's help you find what you need.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-brand-deep-blue/10 dark:border-white/10 p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-charcoal dark:text-white mb-4 text-center">
            Search Our Site
          </h2>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-charcoal/40 dark:text-white/40" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services, industries, or information..."
                aria-label="Search"
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-brand-deep-blue/20 dark:border-white/20 bg-neutral-off-white dark:bg-slate-700 text-neutral-charcoal dark:text-white placeholder:text-neutral-charcoal/50 dark:placeholder:text-white/50 focus:border-brand-bright-blue focus:outline-none transition-colors"
              />
            </div>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <Button variant="primary" size="lg" className="inline-flex items-center gap-2 w-full sm:w-auto">
              <Home className="h-5 w-5" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-charcoal dark:text-white mb-4 text-center">
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-brand-deep-blue/10 dark:border-white/10 hover:border-brand-bright-blue transition-all duration-200"
              >
                <div>
                  <p className="font-semibold text-neutral-charcoal dark:text-white group-hover:text-brand-bright-blue transition-colors">
                    {page.name}
                  </p>
                  <p className="text-sm text-neutral-charcoal/60 dark:text-white/60">
                    {page.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-brand-bright-blue opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Need Help? Contact Us
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+14133065053"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 transition-colors"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="font-semibold">(413) 306-5053</span>
            </a>
            <a
              href="mailto:info@andersoncleaning.com"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 transition-colors"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="font-semibold">info@andersoncleaning.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
