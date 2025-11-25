'use client'

import type { ElementType } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ServiceData } from '@/lib/services-data'

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
            <div className="flex justify-center lg:justify-start">
              <Link href="/quote">
                <Button variant="accent" size="lg">
                  Request a Quote
                </Button>
              </Link>
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
