'use client'

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
  service: Omit<ServiceData, 'icon'>
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <>
      {/* Breadcrumb Navigation - Above Hero */}
      <div className="bg-neutral-off-white dark:bg-slate-800 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[14px] text-[#1C2526]/50 dark:text-white/50">
              <li>
                <Link href="/" className="hover:text-brand-bright-blue transition-colors duration-150">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>
                <Link href="/services" className="hover:text-brand-bright-blue transition-colors duration-150">
                  Services
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <li>
                <span className="text-[#1C2526] dark:text-white font-medium" aria-current="page">
                  {service.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden">
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
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-[36px] md:text-[48px] font-bold mb-4 leading-[1.2] tracking-[-0.5px]">
              {service.h1}
            </h1>
            <p className="text-[18px] md:text-[20px] text-white/90 font-normal leading-[1.5] max-w-[640px] mx-auto mt-4">
              {service.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link href="/quote">
                <Button variant="accent" size="lg" className="min-w-[220px]">
                  Get Your Free Quote
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Expanded with proper hierarchy */}
            <div className="mt-12 pt-8 border-t border-white/20">
              {/* Mobile: 2x2 Grid */}
              <div className="grid grid-cols-2 gap-6 sm:hidden">
                {TRUST_BADGES.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <div key={index} className="flex flex-col items-center text-center w-[140px] mx-auto">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                        <Icon className="h-7 w-7 text-white" strokeWidth={2} aria-hidden="true" />
                      </div>
                      <p className="text-[12px] uppercase tracking-[1px] text-white/70 mb-1">{badge.label}</p>
                      <p className="text-[20px] font-bold text-white">{badge.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* Desktop: Horizontal with Dividers */}
              <div className="hidden sm:flex items-center justify-center gap-8">
                {TRUST_BADGES.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center text-center w-[140px]">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                          <Icon className="h-7 w-7 text-white" strokeWidth={2} aria-hidden="true" />
                        </div>
                        <p className="text-[12px] uppercase tracking-[1px] text-white/70 mb-1">{badge.label}</p>
                        <p className="text-[20px] font-bold text-white">{badge.description}</p>
                      </div>
                      {/* Divider (not on last item) */}
                      {index < TRUST_BADGES.length - 1 && (
                        <div className="h-16 w-px bg-white/20 mx-8" aria-hidden="true" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
