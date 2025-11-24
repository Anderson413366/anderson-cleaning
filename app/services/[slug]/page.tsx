import type { ElementType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'

import StructuredData from '@/components/StructuredData'
import StickyQuoteButton from '@/components/services/StickyQuoteButton'
import { Button } from '@/components/ui/Button'
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

  return (
    <div className="min-h-screen bg-neutral-off-white text-neutral-charcoal dark:bg-slate-900 dark:text-white">
      {schema && <StructuredData schema={schema} />}
      <StickyQuoteButton />

      <HeroSection service={service} ServiceIcon={ServiceIcon} />

      <CTASection
        heading="Get a detailed cleaning proposal in 24 hours"
        subheading="Tell us about your facility and we will build a custom scope with transparent pricing."
      />

      <OverviewSection service={service} />

      <ProcessSection service={service} />

      <section className="bg-white py-16 dark:bg-slate-900">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2">
          <BenefitsList service={service} />
          <IndustriesCard service={service} />
        </div>
      </section>

      <CTASection
        heading="Need coverage between nightly cleans?"
        subheading="Book a walkthrough and receive a full proposal with timeline, staffing plan, and documented SOPs."
        variant="secondary"
      />

      <TestimonialsSection service={service} />
      <RelatedAndFAQSection service={service} />
      <BlogLinks service={service} />

      <CTASection
        heading="Ready to schedule your walkthrough?"
        subheading="Submit the quote form or call (413) 306-5053. You will hear from us within 24 hours."
      />
    </div>
  )
}

function HeroSection({ service, ServiceIcon }: { service: ServiceData; ServiceIcon: ElementType }) {
  return (
    <section className="bg-gradient-to-br from-brand-deep-blue via-brand-deep-blue to-brand-bright-blue text-white">
      <div className="container mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all services
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/80">Serving {SERVICE_AREA}</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <ServiceIcon className="h-7 w-7 text-brand-bright-blue" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{service.h1}</h1>
              <p className="mt-2 text-lg text-white/90">{service.tagline}</p>
            </div>
          </div>
          <p className="mt-4 text-lg text-white/80">{service.heroDescription}</p>
          {service.responseTimeNote && (
            <p className="mt-2 text-sm font-semibold text-emerald-200">{service.responseTimeNote}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/quote">
              <Button variant="accent" size="lg" className="min-w-[180px]">
                Request Quote
              </Button>
            </Link>
            <a
              href="tel:+14133065053"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" /> (413) 306-5053
            </a>
          </div>
          <p className="mt-3 text-sm text-white/80">Get your free quote within 24 hours.</p>
          <TrustBadges className="mt-6" theme="light" />
        </div>
        <div className="relative h-80 w-full overflow-hidden rounded-3xl shadow-2xl">
          <picture>
            <source srcSet={service.heroImage.avif} type="image/avif" />
            <source srcSet={service.heroImage.webp} type="image/webp" />
            <Image
              src={service.heroImage.fallback}
              alt={service.heroImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
              priority
            />
          </picture>
        </div>
      </div>
    </section>
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
        <h2 className="text-center text-3xl font-extrabold text-neutral-charcoal dark:text-white">Our Process</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-neutral-charcoal/70 dark:text-white/80">
          Transparent steps so you always know what is happening and who is onsite.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="flex gap-4 rounded-2xl border border-neutral-light-grey bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-deep-blue text-lg font-bold text-white">
                {step.step}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-charcoal dark:text-white">{step.title}</h3>
                <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsList({ service }: { service: ServiceData }) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white">Benefits</h2>
      <p className="mt-3 text-base text-neutral-charcoal/70 dark:text-white/70">
        Every program includes proactive communication, safety, and accountability.
      </p>
      <ul className="mt-6 space-y-3">
        {service.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-bright-blue" />
            <span className="text-base text-neutral-charcoal/80 dark:text-white/80">{benefit}</span>
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
              className="rounded-2xl border border-neutral-light-grey bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <Star className="h-6 w-6 text-amber-400" />
              <p className="mt-4 text-lg text-neutral-charcoal/80 dark:text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-neutral-charcoal dark:text-white">{testimonial.author}</p>
              <p className="text-sm text-neutral-charcoal/60 dark:text-white/60">{testimonial.role}</p>
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
      <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white">Related Services</h2>
          <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">
            Combine services for full coverage across your facility.
          </p>
          <div className="mt-6 grid gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="flex items-center justify-between rounded-2xl border border-neutral-light-grey bg-white px-5 py-4 text-lg font-semibold text-brand-deep-blue transition hover:-translate-y-1 hover:border-brand-bright-blue hover:text-brand-bright-blue dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <span>{item.title}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-neutral-charcoal dark:text-white">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-neutral-light-grey bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-lg font-semibold text-neutral-charcoal dark:text-white">{faq.question}</p>
                <p className="mt-2 text-base text-neutral-charcoal/70 dark:text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
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

function CTASection({
  heading,
  subheading,
  variant = 'primary',
}: {
  heading: string
  subheading: string
  variant?: 'primary' | 'secondary'
}) {
  const bgClasses =
    variant === 'secondary'
      ? 'bg-white dark:bg-slate-900 border border-neutral-light-grey dark:border-slate-700'
      : 'bg-brand-deep-blue text-white'

  return (
    <section className="py-14">
      <div className="container mx-auto px-6">
        <div className={`rounded-3xl p-8 shadow-xl ${bgClasses}`}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-bright-blue">
                Get your free quote within 24 hours
              </p>
              <h3 className="mt-2 text-3xl font-bold">{heading}</h3>
              <p className="mt-3 text-base opacity-80">{subheading}</p>
              <p className="mt-2 text-sm opacity-80">Serving {SERVICE_AREA}.</p>
              <TrustBadges className="mt-6" theme={variant === 'primary' ? 'light' : 'dark'} />
            </div>
            <div className="flex flex-col gap-4 lg:justify-self-end">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="w-full justify-center"
                  variant={variant === 'secondary' ? 'accent' : 'secondary'}
                >
                  Request Quote
                </Button>
              </Link>
              <a
                href="tel:+14133065053"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-current px-5 py-3 text-base font-semibold"
              >
                <Phone className="h-5 w-5" /> (413) 306-5053
              </a>
              <p className="text-center text-sm opacity-80">Need help sooner? Call now and we’ll schedule immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBadges({ className = '', theme = 'dark' }: { className?: string; theme?: 'light' | 'dark' }) {
  const badges = ['Licensed & Insured', '18+ Years in Business', 'Green Seal Options', 'OSHA-Trained Staff']
  const textClass = theme === 'light' ? 'text-white/80' : 'text-neutral-charcoal/80 dark:text-white/70'
  return (
    <div className={`flex flex-wrap gap-3 text-sm font-semibold ${textClass} ${className}`}>
      {badges.map((badge) => (
        <span key={badge} className="inline-flex items-center gap-1 rounded-full border border-current/30 px-3 py-1">
          <ShieldCheck className="h-4 w-4" />
          {badge}
        </span>
      ))}
    </div>
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
