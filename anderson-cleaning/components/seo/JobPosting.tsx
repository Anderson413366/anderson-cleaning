/**
 * JobPosting Structured Data Component
 *
 * Renders JSON-LD structured data for job postings to enhance SEO
 * and enable rich results in Google Search (job listings).
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */

import Script from 'next/script'

export interface JobPostingData {
  title: string
  description: string
  datePosted: string // ISO 8601 date (YYYY-MM-DD)
  validThrough?: string // ISO 8601 date (optional)
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN'
  jobLocation: {
    address: {
      streetAddress?: string
      addressLocality: string
      addressRegion: string
      postalCode?: string
      addressCountry: string
    }
    remote?: boolean
  }
  baseSalary?: {
    currency: string
    value: {
      minValue?: number
      maxValue?: number
      unitText: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
    }
  }
  applicantLocationRequirements?: {
    name: string
    addressCountry?: string
    addressRegion?: string
  }
  jobBenefits?: string[]
  qualifications?: string
  responsibilities?: string
  skills?: string[]
}

interface JobPostingProps {
  job: JobPostingData
  organizationName?: string
  organizationUrl?: string
  organizationLogo?: string
}

export default function JobPosting({
  job,
  organizationName = 'Anderson Cleaning, Inc.',
  organizationUrl = 'https://andersoncleaning.com',
  organizationLogo = 'https://andersoncleaning.com/images/logo-icon.svg',
}: JobPostingProps) {
  const jobPostingSchema = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    ...(job.validThrough && { validThrough: job.validThrough }),
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: organizationName,
      sameAs: organizationUrl,
      logo: organizationLogo,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        ...(job.jobLocation.address.streetAddress && {
          streetAddress: job.jobLocation.address.streetAddress,
        }),
        addressLocality: job.jobLocation.address.addressLocality,
        addressRegion: job.jobLocation.address.addressRegion,
        ...(job.jobLocation.address.postalCode && {
          postalCode: job.jobLocation.address.postalCode,
        }),
        addressCountry: job.jobLocation.address.addressCountry,
      },
    },
    ...(job.jobLocation.remote && {
      jobLocationType: 'TELECOMMUTE',
    }),
    ...(job.baseSalary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: job.baseSalary.currency,
        value: {
          '@type': 'QuantitativeValue',
          ...(job.baseSalary.value.minValue && {
            minValue: job.baseSalary.value.minValue,
          }),
          ...(job.baseSalary.value.maxValue && {
            maxValue: job.baseSalary.value.maxValue,
          }),
          unitText: job.baseSalary.value.unitText,
        },
      },
    }),
    ...(job.applicantLocationRequirements && {
      applicantLocationRequirements: {
        '@type': 'Country',
        name: job.applicantLocationRequirements.name,
      },
    }),
    ...(job.jobBenefits && { jobBenefits: job.jobBenefits }),
    ...(job.qualifications && { qualifications: job.qualifications }),
    ...(job.responsibilities && { responsibilities: job.responsibilities }),
    ...(job.skills && { skills: job.skills }),
  }

  return (
    <Script
      id="job-posting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jobPostingSchema),
      }}
    />
  )
}
