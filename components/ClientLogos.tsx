'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Client {
  name: string
  colorLogo: string
  grayLogo: string
}

const clients: Client[] = [
  {
    name: 'Holyoke Medical Center',
    colorLogo: '/images/clients/holyoke-medical-center-logo.png',
    grayLogo: '/images/clients/holyoke-medical-center-logo-gray.png',
  },
  {
    name: 'CleanSlate',
    colorLogo: '/images/clients/cleanslate-logo.png',
    grayLogo: '/images/clients/cleanslate-logo-gray.png',
  },
  {
    name: 'Clinical & Support Options',
    colorLogo: '/images/clients/clinical-and-support-options-logo.png',
    grayLogo: '/images/clients/clinical-and-support-options-logo-gray.png',
  },
  {
    name: 'YMCA',
    colorLogo: '/images/clients/ymca-logo.png',
    grayLogo: '/images/clients/ymca-logo-gray.png',
  },
  {
    name: 'Trinity Solar',
    colorLogo: '/images/clients/trinity-solar-logo.png',
    grayLogo: '/images/clients/trinity-solar-logo-gray.png',
  },
  {
    name: 'AAA Northeast',
    colorLogo: '/images/clients/aaa-northeast-logo.png',
    grayLogo: '/images/clients/aaa-northeast-logo-gray.png',
  },
]

function ClientLogo({ client }: { client: Client }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-300 ease-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grayscale logo (visible by default) - standardized 48px height */}
      <Image
        src={client.grayLogo}
        alt={`${client.name} logo`}
        width={120}
        height={48}
        className={`h-[48px] w-auto object-contain grayscale transition-opacity duration-300 ease-out ${
          isHovered ? 'opacity-0' : 'opacity-60'
        }`}
      />
      {/* Color logo (visible on hover) - decorative, hidden from screen readers */}
      <Image
        src={client.colorLogo}
        alt=""
        aria-hidden="true"
        width={120}
        height={48}
        className={`absolute h-[48px] w-auto object-contain transition-opacity duration-300 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section
      className="py-20 md:py-30 bg-white dark:bg-slate-900 border-t border-brand-deep-blue/10 dark:border-white/10"
      aria-label="Our trusted clients"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[13px] uppercase tracking-[1.5px] text-[#1C2526]/60 dark:text-white/60 text-center mb-12 font-semibold">
          Trusted By Leading Businesses
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-8 items-center justify-items-center">
          {clients.map((client) => (
            <ClientLogo key={client.name} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}
