'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface Certification {
  id: string
  name: string
  logo: string
  verificationUrl?: string
  description: string
  validUntil?: string
  status: 'active' | 'pending' | 'expired'
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'green-seal',
    name: 'Green Seal Certified',
    logo: '/certifications/green-seal.svg',
    verificationUrl: 'https://greenseal.org/verify',
    description: 'Environmental responsibility certification for sustainable cleaning practices',
    validUntil: '2026-12-31',
    status: 'active',
  },
  {
    id: 'cims-gb',
    name: 'CIMS-GB with Honors',
    logo: '/certifications/cims.svg',
    verificationUrl: 'https://issa.org/verify',
    description: 'Cleaning Industry Management Standard with Green Building certification',
    validUntil: '2025-12-31',
    status: 'pending', // Change to 'active' once obtained
  },
  {
    id: 'issa',
    name: 'ISSA Member',
    logo: '/certifications/issa.svg',
    verificationUrl: 'https://issa.org/members',
    description: 'International Sanitary Supply Association member',
    validUntil: '2025-12-31',
    status: 'pending', // Change to 'active' once joined
  },
  {
    id: 'licensed-insured',
    name: 'Licensed & Insured',
    logo: '/certifications/licensed-insured.svg',
    description: 'Fully licensed in MA & CT with $2M general liability coverage',
    status: 'active',
  },
  {
    id: 'osha',
    name: 'OSHA Compliant',
    logo: '/certifications/osha.svg',
    description: 'All staff trained in OSHA safety standards and protocols',
    status: 'active',
  },
  {
    id: 'bbb',
    name: 'BBB Accredited',
    logo: '/certifications/bbb.svg',
    verificationUrl:
      'https://www.bbb.org/us/ma/west-springfield/profile/commercial-cleaning-services/anderson-cleaning-inc-0261-316830',
    description: 'Better Business Bureau accredited with A+ rating',
    status: 'pending', // Change to 'active' once accredited
  },
  {
    id: 'background-check',
    name: 'Background Checked',
    logo: '/certifications/background-check.svg',
    description: 'All employees undergo comprehensive background screening',
    status: 'active',
  },
  {
    id: 'experience',
    name: '18+ Years',
    logo: '/certifications/18-years.svg',
    description: 'Serving Western MA & Northern CT since 2007',
    status: 'active',
  },
]

export function CertificationBar() {
  const activeCerts = CERTIFICATIONS.filter((cert) => cert.status === 'active')

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-8 dark:border-white/10 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {activeCerts.map((cert) => (
            <div key={cert.id} className="group cursor-pointer" title={cert.description}>
              {cert.verificationUrl ? (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="flex h-20 w-20 items-center justify-center">
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="text-center text-xs text-neutral-charcoal/70 transition-colors group-hover:text-brand-bright-blue dark:text-neutral-charcoal dark:group-hover:text-brand-bright-blue">
                    {cert.name}
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-20 w-20 items-center justify-center">
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="text-center text-xs text-neutral-charcoal/70 dark:text-white/70">
                    {cert.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CertificationShowcase() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-charcoal dark:text-white">
            Industry Certifications & Credentials
          </h2>
          <p className="text-lg text-neutral-charcoal/70 dark:text-white/70">
            Anderson Cleaning meets and exceeds industry standards for commercial cleaning
            excellence
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className={`cursor-pointer rounded-lg bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl dark:bg-slate-800 ${
                cert.status === 'pending' ? 'opacity-50' : ''
              }`}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-neutral-charcoal dark:text-white">{cert.name}</h3>
              {cert.status === 'pending' && (
                <span className="mt-2 inline-block rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Modal for Certification Details */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl dark:bg-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between">
                <h3 className="text-2xl font-bold text-neutral-charcoal dark:text-white">
                  {selectedCert.name}
                </h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-neutral-charcoal/60 hover:text-neutral-charcoal dark:text-neutral-charcoal dark:hover:text-neutral-charcoal"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center">
                <img
                  src={selectedCert.logo}
                  alt={selectedCert.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="mb-6 text-neutral-charcoal/70 dark:text-white/70">{selectedCert.description}</p>

              {selectedCert.validUntil && (
                <p className="mb-4 text-sm text-neutral-charcoal/60 dark:text-neutral-charcoal">
                  Valid until: {new Date(selectedCert.validUntil).toLocaleDateString()}
                </p>
              )}

              {selectedCert.verificationUrl && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-brand-bright-blue px-6 py-2 text-white transition-colors hover:bg-[#006bc4]"
                >
                  Verify Certification →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
