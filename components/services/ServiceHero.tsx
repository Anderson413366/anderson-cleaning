'use client'

import type { ElementType } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Shield, Award, Leaf, HardHat } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ServiceData } from '@/lib/services-data'

const TRUST_BADGES = [
  { icon: Shield, label: 'Licensed & Insured', description: '$2M Coverage' },
  { icon: Award, label: '18+ Years', description: 'Since 2007' },
  { icon: Leaf, label: 'Green Seal', description: 'Eco-Friendly' },
  { icon: HardHat, label: 'OSHA-Trained', description: 'Safety First' },
]

interface ServiceHeroProps {
  service: ServiceData
  ServiceIcon: ElementType
}

export default function ServiceHero({ service, ServiceIcon }: ServiceHeroProps) {
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Subtle parallax: move image down at 30% of scroll speed
      setParallaxOffset(scrollY * 0.3)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left py-8 lg:py-0">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center lg:justify-start gap-2 text-sm text-white/80">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-150">
                    Home
                  </Link>
                </li>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <li>
                  <Link href="/services" className="hover:text-white transition-colors duration-150">
                    Services
                  </Link>
                </li>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <li>
                  <span className="text-white font-semibold" aria-current="page">
                    {service.title}
                  </span>
                </li>
              </ol>
            </nav>

            {/* Service Icon - Centered Above Heading */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
                <ServiceIcon className="h-10 w-10 text-white" strokeWidth={2} aria-hidden="true" />
              </div>
            </div>

            <h1 className="font-extrabold mb-6 leading-tight">
              {service.h1}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              {service.tagline}
            </p>
            <div className="flex justify-center lg:justify-start mb-8">
              <Link href="/quote">
                <Button variant="accent" size="lg">
                  Request a Quote
                </Button>
              </Link>
            </div>

            {/* Trust Badges - 25% larger, with dividers */}
            <div className="mt-8 pt-8 border-t border-white/20">
              {/* Mobile: 2x2 Grid */}
              <div className="grid grid-cols-2 gap-6 sm:hidden">
                {TRUST_BADGES.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                        <Icon className="h-9 w-9 text-white" strokeWidth={2} aria-hidden="true" />
                      </div>
                      <p className="text-sm font-semibold text-white">{badge.label}</p>
                      <p className="text-xs text-white/70">{badge.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* Desktop: Horizontal with Dividers */}
              <div className="hidden sm:flex items-center justify-center lg:justify-start gap-6">
                {TRUST_BADGES.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                          <Icon className="h-9 w-9 text-white" strokeWidth={2} aria-hidden="true" />
                        </div>
                        <p className="text-sm font-semibold text-white">{badge.label}</p>
                        <p className="text-xs text-white/70">{badge.description}</p>
                      </div>
                      {/* Divider (not on last item) */}
                      {index < TRUST_BADGES.length - 1 && (
                        <div className="h-16 w-px bg-white/20 mx-6" aria-hidden="true" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Parallax */}
          <div className="relative hidden lg:block">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <picture>
                <source srcSet={service.heroImage.avif} type="image/avif" />
                <source srcSet={service.heroImage.webp} type="image/webp" />
                <img
                  src={service.heroImage.fallback}
                  alt={service.heroImage.alt}
                  className="w-full h-auto object-cover rounded-2xl"
                  loading="eager"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
