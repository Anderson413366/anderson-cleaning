'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    <section className="border-y border-brand-deep-blue/10 bg-brand-deep-blue/[0.03] py-8 dark:border-white/10 dark:bg-slate-900">
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
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="text-center text-xs text-neutral-charcoal/85 transition-colors group-hover:text-brand-bright-blue dark:text-white/85 dark:group-hover:text-brand-bright-blue">
                    {cert.name}
                  </span>
                </a>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-20 w-20 items-center justify-center">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="text-center text-xs text-neutral-charcoal/85 dark:text-white/85">
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
  const activeCerts = CERTIFICATIONS.filter((cert) => cert.status === 'active')
  const pendingCerts = CERTIFICATIONS.filter((cert) => cert.status === 'pending')

  return (
    <section className="py-20 md:py-30">
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

        {/* Verified Certifications - Prominent Display */}
        <h3 className="text-xl font-semibold text-neutral-charcoal dark:text-white mb-6 text-center">
          Verified Certifications
        </h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 mb-16">
          {activeCerts.map((cert) => (
            <div
              key={cert.id}
              className="cursor-pointer rounded-lg bg-white border-2 border-brand-deep-blue p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-white dark:border-brand-deep-blue"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="font-semibold text-neutral-charcoal text-sm">{cert.name}</h3>
            </div>
          ))}
        </div>

        {/* In Progress Certifications - Secondary, De-emphasized */}
        {pendingCerts.length > 0 && (
          <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-12">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-neutral-charcoal/70 dark:text-white/70 mb-2">
                Pursuing Certifications
              </h3>
              <p className="text-sm text-neutral-charcoal/60 dark:text-white/60 max-w-2xl mx-auto">
                We're continuously improving our credentials to serve you better
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {pendingCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="cursor-pointer rounded-lg bg-neutral-off-white dark:bg-slate-800/50 border border-neutral-light-grey/50 dark:border-slate-700/50 p-4 text-center transition-all duration-300 hover:border-brand-bright-blue/50 opacity-75"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain grayscale opacity-60"
                    />
                  </div>
                  <h4 className="font-medium text-neutral-charcoal/85 dark:text-white/85 text-xs">{cert.name}</h4>
                  <span className="mt-2 inline-block rounded bg-neutral-light-grey/50 dark:bg-slate-700/50 px-2 py-0.5 text-[12px] font-medium text-[#999999]">
                    pending
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
                <Image
                  src={selectedCert.logo}
                  alt={selectedCert.name}
                  width={128}
                  height={128}
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
                  className="inline-block rounded-lg bg-brand-bright-blue px-6 py-2 text-white transition-colors hover:bg-[#0066CC]"
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
