import type { ElementType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'

import StructuredData from '@/components/StructuredData'
import { GlassIcon } from '@/components/ui/GlassIcon'
import { BreadcrumbSchema, FAQSchema } from '@/components/Schema'
import { Button } from '@/components/ui/Button'
import ServiceHero from '@/components/services/ServiceHero'
import FAQAccordion from '@/components/services/FAQAccordion'
import RelatedIndustries from '@/components/services/RelatedIndustries'
import {
  serviceSlugs,
  servicesData,
  type ServiceData,
  type ServiceSlug,
} from '@/lib/services-data'

const SERVICE_AREA = 'Western Massachusetts & Northern Connecticut'
export const revalidate = 3600

type RouteParams = Promise<{ slug: string }>

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug as ServiceSlug]
  if (!service) {
    return {}
  }

  const url = `https://andersoncleaning.com/services/${service.slug}`

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: RouteParams }) {
  const { slug } = await params
  const service = servicesData[slug as ServiceSlug]

  if (!service) {
    notFound()
  }

  const ServiceIcon = service.icon
  const schema = createServiceJsonLd(service)

  // Breadcrumb schema
  const breadcrumbs = [
    { name: 'Home', url: 'https://andersoncleaning.com' },
    { name: 'Services', url: 'https://andersoncleaning.com/services' },
    { name: service.title, url: `https://andersoncleaning.com/services/${service.slug}` },
  ]

  // FAQ schema
  const faqs = service.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))

  // Remove icon from service data for client component (icons can't be serialized)
  const { icon, ...serviceWithoutIcon } = service

  return (
    <div className="min-h-screen bg-neutral-off-white text-neutral-charcoal dark:bg-slate-900 dark:text-white">
      {schema && <StructuredData schema={schema} />}
      <BreadcrumbSchema items={breadcrumbs} />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      <ServiceHero service={serviceWithoutIcon} />

      <OverviewSection service={service} />

      <ProcessSection service={service} />

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <BenefitsList service={service} />
            <div className="mt-12">
              <IndustriesCard service={service} />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection service={service} />
      <RelatedIndustries serviceName={service.title} industryNames={service.industries} />
      <RelatedAndFAQSection service={service} />
      <BlogLinks service={service} />
    </div>
  )
}

function OverviewSection({ service }: { service: ServiceData }) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl space-y-6 px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-brand-deep-blue dark:bg-slate-800 dark:text-white">
          <Sparkles className="h-4 w-4" /> Service Overview
        </div>
        {service.overview.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-neutral-charcoal/80 dark:text-white/80">
            {paragraph}
          </p>
        ))}
        <div className="rounded-2xl border border-brand-deep-blue/20 bg-brand-deep-blue/5 p-6 dark:bg-white/5">
          <p className="text-base font-semibold text-brand-deep-blue dark:text-brand-bright-blue">Key Differentiator</p>
          <p className="text-lg text-neutral-charcoal/80 dark:text-white/80">{service.differentiator}</p>
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ service }: { service: ServiceData }) {
  return (
    <section className="bg-white py-16 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-neutral-charcoal dark:text-white">Our Process</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-neutral-charcoal/70 dark:text-white/80">
            Transparent steps so you always know what is happening and who is onsite.
          </p>

          {/* Single column with connecting line */}
          <div className="mt-10 relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[30px] top-[60px] bottom-[60px] w-0.5 bg-gradient-to-b from-brand-deep-blue/30 via-brand-bright-blue/30 to-brand-deep-blue/30 dark:from-brand-bright-blue/30 dark:via-brand-bright-blue/50 dark:to-brand-bright-blue/30" aria-hidden="true" />

            {/* Steps */}
            <div className="space-y-8">
              {service.process.map((step, index) => (
                <div key={step.step} className="relative flex gap-6 items-start">
                  {/* Glass-effect number badge */}
                  <div className="relative z-10 flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue shadow-lg">
                    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                    <span className="relative text-2xl font-bold text-white">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-neutral-charcoal dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-neutral-charcoal/70 dark:text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitsList({ service }: { service: ServiceData }) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white text-center">Benefits</h2>
      <p className="mt-3 text-base text-neutral-charcoal/70 dark:text-white/70 text-center max-w-2xl mx-auto">
        Every program includes proactive communication, safety, and accountability.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {service.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-4">
            {/* Glass-effect icon - Small (32px) */}
            <div className="flex-shrink-0">
              <GlassIcon icon="CheckCircle2" size="sm" variant="solid" label="Benefit" />
            </div>
            <span className="text-base text-neutral-charcoal/80 dark:text-white/80 leading-relaxed pt-1">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function IndustriesCard({ service }: { service: ServiceData }) {
  return (
    <div className="rounded-3xl border border-brand-deep-blue/10 bg-gradient-to-br from-brand-deep-blue via-brand-deep-blue to-brand-bright-blue p-8 text-white shadow-2xl">
      <h3 className="text-2xl font-bold">Who relies on this service?</h3>
      <p className="mt-3 text-white/80">Industry applications throughout {SERVICE_AREA}.</p>
      <ul className="mt-6 space-y-3">
        {service.industries.map((industry) => (
          <li key={industry} className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 flex-shrink-0 text-white" />
            <span>{industry}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/80">Serving Western MA &amp; Northern CT</p>
    </div>
  )
}

function TestimonialsSection({ service }: { service: ServiceData }) {
  return (
    <section className="bg-neutral-off-white py-16 dark:bg-slate-800/60">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white">Testimonials</h2>
          <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">
            Real feedback from Anderson clients.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {service.testimonials.map((testimonial) => (
            <div
              key={testimonial.quote}
              className="rounded-2xl border border-neutral-light-grey bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              {/* Glass-effect quote icon - Medium (48px) */}
              <div className="mb-6">
                <GlassIcon icon="Quote" size="md" variant="solid" label="Quote" />
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-lg text-neutral-charcoal/80 dark:text-white/80 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Client info with avatar placeholder */}
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-light-grey dark:border-slate-700">
                {/* Avatar placeholder - circular with initials */}
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white font-bold text-sm">
                  {testimonial.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-base font-semibold text-neutral-charcoal dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-neutral-charcoal/60 dark:text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedAndFAQSection({ service }: { service: ServiceData }) {
  const related = service.relatedServices
    .map((relatedSlug) => servicesData[relatedSlug])
    .filter(Boolean) as ServiceData[]

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {/* Related Services - Full Width with Horizontal Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white">Related Services</h2>
            <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">
              Combine services for full coverage across your facility.
            </p>
          </div>

          {/* Related Services Cards - 240px × 160px with icons and descriptions */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide justify-center flex-wrap md:flex-nowrap md:overflow-visible">
            {related.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group flex-shrink-0 w-[240px] h-[160px] flex flex-col rounded-xl border border-[#E0E0E0] bg-[#F5F7FB] dark:bg-slate-800 dark:border-slate-700 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-brand-bright-blue snap-start"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-bright-blue mb-3">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-brand-deep-blue dark:text-white mb-1 line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Description - 14px, single line */}
                  <p className="text-sm text-[#666666] dark:text-white/70 line-clamp-1 mb-auto">
                    {item.tagline.split('.')[0]}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-1 text-sm font-semibold text-brand-bright-blue group-hover:underline">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Section Divider */}
        <div className="max-w-6xl mx-auto my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-light-grey to-transparent dark:via-slate-700" />
        </div>

        {/* FAQ Section - Full Width with Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">
              Find answers to common questions about this service.
            </p>
          </div>

          <FAQAccordion faqs={service.faqs} />
        </div>
      </div>
    </section>
  )
}

function BlogLinks({ service }: { service: ServiceData }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl border border-neutral-light-grey bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-2xl font-extrabold text-neutral-charcoal dark:text-white">Further Reading</h3>
          <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">
            Explore actionable insights on our blog.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {service.blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-neutral-light-grey px-5 py-4 text-brand-deep-blue transition hover:border-brand-bright-blue hover:text-brand-bright-blue dark:border-slate-700 dark:text-white"
              >
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function createServiceJsonLd(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.schemaDescription,
    areaServed: SERVICE_AREA,
    provider: {
      '@type': 'Organization',
      name: 'Anderson Cleaning Company',
      url: 'https://andersoncleaning.com',
      telephone: '+1-413-306-5053',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '103 Wayside Ave',
        addressLocality: 'West Springfield',
        addressRegion: 'MA',
        postalCode: '01089',
        addressCountry: 'US',
      },
    },
    offers: {
      '@type': 'Offer',
      name: `${service.title} Quote`,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Custom proposal delivered within 24 hours.',
      url: `https://andersoncleaning.com/services/${service.slug}`,
    },
  }
}
