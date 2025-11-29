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
      className="relative flex items-center justify-center p-4 transition-transform duration-300 ease-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grayscale logo (visible by default) */}
      <Image
        src={client.grayLogo}
        alt={`${client.name} logo`}
        width={150}
        height={60}
        className={`h-[60px] w-auto object-contain transition-opacity duration-300 ease-out ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* Color logo (visible on hover) */}
      <Image
        src={client.colorLogo}
        alt={`${client.name} logo`}
        width={150}
        height={60}
        className={`absolute h-[60px] w-auto object-contain transition-opacity duration-300 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section
      className="py-12 bg-white dark:bg-slate-900"
      aria-label="Our trusted clients"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-sm uppercase tracking-wide text-neutral-charcoal/50 dark:text-white/50 text-center mb-8 font-medium">
          Trusted By Leading Businesses
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <ClientLogo key={client.name} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}
