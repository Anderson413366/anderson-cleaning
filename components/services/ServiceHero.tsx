'use client'

import type { ElementType } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Shield,
  Award,
  Leaf,
  HardHat,
  Building2,
  Activity,
  Sparkles,
  Square,
  UserCheck,
  Zap,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ServiceData, ServiceSlug } from '@/lib/services-data'

const TRUST_BADGES = [
  { icon: Shield, label: 'Licensed & Insured', description: '$2M Coverage' },
  { icon: Award, label: '18+ Years', description: 'Since 2007' },
  { icon: Leaf, label: 'Green Seal', description: 'Eco-Friendly' },
  { icon: HardHat, label: 'OSHA-Trained', description: 'Safety First' },
]

// Map service slugs to their icons (must match icons in services-data.ts)
const SERVICE_ICONS: Record<ServiceSlug, ElementType> = {
  'office-cleaning': Building2,
  'healthcare-cleaning': Activity,
  'janitorial-services': Sparkles,
  'floor-care': Square,
  'window-cleaning': Sparkles,
  'post-construction': HardHat,
  'emergency-cleaning': AlertTriangle,
  'day-porter': UserCheck,
}

interface ServiceHeroProps {
  service: Omit<ServiceData, 'icon'>
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  // Get the icon component for this service
  const ServiceIcon = SERVICE_ICONS[service.slug as ServiceSlug] || Building2

  return (
    <section className="relative bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      {/* Subtle diagonal pattern overlay for visual differentiation */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 40px)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/80">
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
          <div className="mb-6 flex justify-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-lg">
              <ServiceIcon className="h-10 w-10 text-white" strokeWidth={2} aria-hidden="true" />
            </div>
          </div>

          <h1 className="text-[40px] md:text-5xl font-extrabold mb-6 leading-tight">
            {service.h1}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {service.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/quote">
              <Button variant="accent" size="lg" className="min-w-[220px]">
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
              <div className="hidden sm:flex items-center justify-center gap-6">
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
      </div>
    </section>
  )
}
