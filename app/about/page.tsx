import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import StatsBar from '@/components/sections/StatsBar'
import { CertificationShowcase } from '@/components/Certifications'
import { YEARS_IN_BUSINESS } from '@/lib/constants'
import {
  Users,
  Heart,
  Shield,
  Award,
  Clock,
  Target,
  CheckCircle2,
  TrendingUp,
  Building2,
  Sparkles,
  Leaf,
  Handshake,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Commercial Cleaning Company Western Massachusetts',
  description: '18+ years serving Western MA & CT businesses with professional commercial cleaning. Family-owned, W-2 employees, OSHA/CDC compliant. Learn about our commitment to quality and service excellence.',
  alternates: {
    canonical: '/about',
  },
}

export const revalidate = 86400

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">

      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-extrabold mb-6 leading-tight">About Anderson Cleaning Company</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {YEARS_IN_BUSINESS} years of excellence delivering professional commercial cleaning with the personal touch
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quote">
                <Button variant="accent" size="lg" className="min-w-[220px]">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Our Story
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-16 max-w-3xl mx-auto">
              Built on a foundation of reliability, quality, and genuine care for our clients
            </p>

            {/* Timeline with Milestones */}
            <div className="relative">
              {/* Vertical line (hidden on mobile) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-bright-blue/30 dark:bg-brand-bright-blue/20 -translate-x-1/2"></div>

              <div className="space-y-12 md:space-y-16">
                {/* Milestone 1: Founded */}
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Image placeholder */}
                  <div className="md:text-right order-2 md:order-1">
                    <div className="bg-gradient-to-br from-brand-deep-blue/10 to-brand-bright-blue/10 dark:from-brand-deep-blue/20 dark:to-brand-bright-blue/20 rounded-xl p-8 md:p-12 border-2 border-brand-deep-blue/20 dark:border-brand-bright-blue/30">
                      <div className="flex items-center justify-center mb-4">
                        <Building2 className="h-16 w-16 md:h-20 md:w-20 text-brand-deep-blue dark:text-brand-bright-blue" />
                      </div>
                      <p className="text-sm font-semibold text-brand-deep-blue dark:text-brand-bright-blue uppercase tracking-wide">
                        The Beginning
                      </p>
                    </div>
                  </div>

                  {/* Center badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-brand-deep-blue dark:bg-brand-bright-blue text-white font-bold text-lg shadow-lg border-4 border-white dark:border-slate-900 order-3">
                    2007
                  </div>

                  {/* Right side - Content */}
                  <div className="order-1 md:order-3">
                    <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-4 md:hidden">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-deep-blue dark:bg-brand-bright-blue text-white font-bold">
                          2007
                        </div>
                        <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                          Founded on Vision
                        </h3>
                      </div>
                      <h3 className="hidden md:block text-h3 font-bold text-neutral-charcoal dark:text-white mb-4">
                        Founded on Vision
                      </h3>
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-4">
                        Anderson Cleaning Company was founded with a simple but powerful vision: provide corporate-grade commercial cleaning with the accountability and personal attention of a family business.
                      </p>
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80">
                        After watching businesses struggle with unreliable contractors, high turnover, and inconsistent quality, we knew there had to be a better way.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 2: First 100 Clients */}
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Content */}
                  <div className="order-1">
                    <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-4 md:hidden">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-deep-blue dark:bg-brand-bright-blue text-white font-bold">
                          2015
                        </div>
                        <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                          100+ Clients Strong
                        </h3>
                      </div>
                      <h3 className="hidden md:block text-h3 font-bold text-neutral-charcoal dark:text-white mb-4">
                        100+ Clients Strong
                      </h3>
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-4">
                        By staying true to our core principles—investing in people, implementing corporate systems, and maintaining our personal touch—we grew to serve over 100 commercial facilities.
                      </p>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {[
                          { icon: Users, label: 'W-2 Employees' },
                          { icon: Target, label: 'Quality Systems' },
                          { icon: Heart, label: 'Personal Care' },
                        ].map((item, idx) => {
                          const Icon = item.icon
                          return (
                            <div key={idx} className="text-center">
                              <Icon className="h-8 w-8 mx-auto mb-2 text-brand-bright-blue" />
                              <p className="text-xs text-neutral-charcoal/70 dark:text-white/70">{item.label}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Center badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-brand-deep-blue dark:bg-brand-bright-blue text-white font-bold text-lg shadow-lg border-4 border-white dark:border-slate-900 order-2">
                    2015
                  </div>

                  {/* Right side - Image placeholder */}
                  <div className="order-2 md:order-3">
                    <div className="bg-gradient-to-br from-brand-bright-blue/10 to-brand-deep-blue/10 dark:from-brand-bright-blue/20 dark:to-brand-deep-blue/20 rounded-xl p-8 md:p-12 border-2 border-brand-bright-blue/20 dark:border-brand-bright-blue/30">
                      <div className="flex items-center justify-center mb-4">
                        <TrendingUp className="h-16 w-16 md:h-20 md:w-20 text-brand-bright-blue" />
                      </div>
                      <p className="text-sm font-semibold text-brand-bright-blue uppercase tracking-wide text-center">
                        Growing Together
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestone 3: Today */}
                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side - Image placeholder */}
                  <div className="md:text-right order-2 md:order-1">
                    <div className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue rounded-xl p-8 md:p-12 text-white">
                      <div className="flex items-center justify-center mb-4">
                        <Star className="h-16 w-16 md:h-20 md:w-20" />
                      </div>
                      <p className="text-sm font-bold uppercase tracking-wide">
                        Excellence in Service
                      </p>
                    </div>
                  </div>

                  {/* Center badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-brand-deep-blue dark:bg-brand-bright-blue text-white font-bold text-lg shadow-lg border-4 border-white dark:border-slate-900 order-3">
                    Today
                  </div>

                  {/* Right side - Content */}
                  <div className="order-1 md:order-3">
                    <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 md:p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-4 md:hidden">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-deep-blue dark:bg-brand-bright-blue text-white font-bold text-sm">
                          Today
                        </div>
                        <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                          Trusted Partner
                        </h3>
                      </div>
                      <h3 className="hidden md:block text-h3 font-bold text-neutral-charcoal dark:text-white mb-4">
                        Trusted Partner
                      </h3>
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-4">
                        Today, we serve commercial facilities across Massachusetts and Connecticut, from small professional offices to large corporate campuses. With {YEARS_IN_BUSINESS}+ years of experience, we continue to grow while staying true to our founding vision.
                      </p>
                      <p className="text-body font-semibold text-brand-deep-blue dark:text-brand-bright-blue">
                        Our secret? We treat every client like they're our only client.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Built on Three Core Principles
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Our approach combines the best of both worlds: corporate-grade quality with family business accountability
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Principle 1: Invest in People */}
              <div className="bg-white dark:bg-slate-900 border-2 border-neutral-light-grey dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-brand-deep-blue/10 dark:bg-brand-deep-blue/20 rounded-full mb-6 mx-auto">
                  <Users className="h-8 w-8 text-brand-deep-blue dark:text-brand-bright-blue" />
                </div>
                <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
                  Invest in People
                </h3>
                <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-6 text-center">
                  Full-time W-2 employees with benefits, training, and career growth opportunities—not independent contractors.
                </p>
                <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-6">
                  <div className="flex items-center justify-center gap-2 text-brand-deep-blue dark:text-brand-bright-blue">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-semibold">40+ hours of training per employee</p>
                  </div>
                  <p className="text-xs text-neutral-charcoal/60 dark:text-white/60 text-center mt-2 italic">
                    "Low turnover means familiar faces and consistent quality"
                  </p>
                </div>
              </div>

              {/* Principle 2: Systems & Standards */}
              <div className="bg-white dark:bg-slate-900 border-2 border-neutral-light-grey dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-brand-deep-blue/10 dark:bg-brand-deep-blue/20 rounded-full mb-6 mx-auto">
                  <Target className="h-8 w-8 text-brand-deep-blue dark:text-brand-bright-blue" />
                </div>
                <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
                  Systems & Standards
                </h3>
                <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-6 text-center">
                  Corporate-grade processes, quality control checklists, and facility-specific Standard Operating Procedures.
                </p>
                <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-6">
                  <div className="flex items-center justify-center gap-2 text-brand-deep-blue dark:text-brand-bright-blue">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-semibold">Custom SOPs for every facility</p>
                  </div>
                  <p className="text-xs text-neutral-charcoal/60 dark:text-white/60 text-center mt-2 italic">
                    "Documented processes ensure nothing gets missed"
                  </p>
                </div>
              </div>

              {/* Principle 3: Personal Touch - FEATURED */}
              <div className="lg:col-span-1 lg:row-span-1">
                <div className="relative bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue rounded-xl p-8 shadow-lg border-4 border-brand-bright-blue/30 dark:border-brand-bright-blue/50">
                  {/* Featured Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-brand-red text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                      Our Difference
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto mt-2">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-h3 font-bold text-white mb-4 text-center">
                    Personal Touch
                  </h3>
                  <p className="text-body text-white/95 mb-6 text-center leading-relaxed">
                    24/7 support with real people who know your name, your facility, and your concerns. No call centers, no runarounds.
                  </p>
                  <div className="border-t border-white/30 pt-6">
                    <div className="flex items-center justify-center gap-2 text-white">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm font-bold">2-hour emergency response</p>
                    </div>
                    <p className="text-xs text-white/80 text-center mt-2 italic font-medium">
                      "We treat every client like they're our only client"
                    </p>
                  </div>

                  {/* Sparkle decorative elements */}
                  <Sparkles className="absolute top-4 right-4 h-6 w-6 text-white/40" />
                  <Sparkles className="absolute bottom-4 left-4 h-5 w-5 text-white/30" />
                </div>
              </div>
            </div>

            {/* Supporting Testimonial */}
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-slate-900 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center">
                      <Star className="h-6 w-6 text-brand-bright-blue" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-body italic text-neutral-charcoal/80 dark:text-white/80 mb-3">
                      "Most cleaning companies promise quality. Anderson delivers it—and backs it up with genuine accountability. If there's ever an issue, they fix it immediately. No excuses."
                    </p>
                    <p className="text-sm font-semibold text-neutral-charcoal dark:text-white">
                      — Local Business Owner, Springfield MA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Showcase */}
      <section className="bg-neutral-off-white dark:bg-slate-900">
        <CertificationShowcase />
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
            What Makes Us Different
          </h2>
          <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-2xl mx-auto">
            We're not the biggest cleaning company, but we're relentlessly focused on your
            success
          </p>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Featured Top 3 Differentiators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Full-Time W-2 Employees',
                  description:
                    'No independent contractors. Our cleaners are W-2 employees with benefits, training, and accountability.',
                },
                {
                  icon: Clock,
                  title: '24/7 Support',
                  description:
                    'Real people answer the phone, day or night. Current clients receive emergency support with on-site arrival in 2 hours or less.',
                },
                {
                  icon: Shield,
                  title: 'Fully Insured & Bonded',
                  description:
                    "Comprehensive general liability and workers' comp insurance. All staff undergo background checks.",
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white rounded-xl p-8 shadow-lg"
                  >
                    <Icon className="h-14 w-14 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-white/95">{item.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Secondary Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: 'Quality Assurance',
                  description:
                    'Regular inspections, detailed checklists, and corrective action plans ensure consistent quality.',
                },
                {
                  icon: Award,
                  title: 'Industry-Specific Training',
                  description:
                    'Teams trained on OSHA standards, industry protocols, and facility-specific procedures.',
                },
                {
                  icon: Heart,
                  title: 'We Actually Care',
                  description:
                    'Your account manager knows your name, your facility, and your concerns. No call centers.',
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
                  >
                    <Icon className="h-10 w-10 text-brand-bright-blue mb-3" />
                    <h3 className="text-lg font-semibold text-neutral-charcoal dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-neutral-charcoal/80 dark:text-white/80">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers - Animated Stats Bar */}
      <StatsBar background="gray" />

      {/* Our Approach */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
              Our Approach
            </h2>

            <div className="space-y-8">
              {[
                {
                  title: 'Listen First',
                  description:
                    'We start every relationship with a comprehensive facility walk-through. We do not just look at square footage - we understand your foot traffic, risk points, and priorities.',
                },
                {
                  title: 'Create Custom SOPs',
                  description:
                    'Every facility gets customized Standard Operating Procedures. No cookie-cutter checklists - we document exactly what needs to be done, when, and how.',
                },
                {
                  title: 'Train Our Teams',
                  description:
                    'Before we ever clean your facility, our staff receives 40+ hours of training on equipment, chemicals, safety, and your specific procedures.',
                },
                {
                  title: 'Monitor Quality',
                  description:
                    'Regular inspections, detailed documentation, and immediate corrective action ensure you get consistent quality every single time.',
                },
                {
                  title: 'Stay Responsive',
                  description:
                    'Something missed? Call or text us anytime. We respond within 24 hours during office hours and provide 24/7 emergency support for current clients with on-site arrival in 2 hours or less.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-brand-deep-blue text-white rounded-full text-body font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-body text-neutral-charcoal/80 dark:text-white/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Green & Safety Commitments */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Environmentally Responsible & Safety-First
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-3xl mx-auto">
              We believe in protecting both your facility and our planet. Our cleaning practices
              prioritize health, safety, and environmental sustainability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-off-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Leaf className="h-6 w-6 text-brand-bright-blue" />
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                    Green Cleaning Practices
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>EPA Safer Choice Products:</strong> Where possible, we use cleaning
                      products certified by the EPA as safer for people and the environment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>HEPA Filtration:</strong> Our vacuums use HEPA filters to trap 99.97%
                      of particles, improving indoor air quality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Microfiber Technology:</strong> Microfiber cloths reduce chemical use
                      while cleaning more effectively than traditional materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Waste Reduction:</strong> Proper recycling protocols and concentrated
                      product use to minimize environmental impact
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-off-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue" />
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                    Safety & Security Protocols
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-deep-blue dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Background Checks:</strong> Every team member undergoes comprehensive
                      criminal background screening before employment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-deep-blue dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Drug Testing:</strong> Pre-employment and random drug screening
                      ensures a safe, reliable workforce
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-deep-blue dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>OSHA Compliance:</strong> All staff trained on safety data sheets,
                      bloodborne pathogens, and hazard communication
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-deep-blue dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Industry Certifications:</strong> Specialized training for medical
                      facilities (HIPAA awareness), schools (child safety), and more
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-6">
              Proud to Serve Our Community
            </h2>
            <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-8">
              Anderson Cleaning Company is more than just a business—we're active members of the Western
              Massachusetts and Northern Connecticut communities we serve.
            </p>
            <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Handshake,
                    title: 'Local Hiring',
                    description: 'We employ local residents to keep jobs and economic benefits in our community.',
                  },
                  {
                    icon: Heart,
                    title: 'Community Support',
                    description: 'Regular donations and volunteer work for local charities, schools, and events.',
                  },
                  {
                    icon: Star,
                    title: 'Local Partnerships',
                    description: 'We source supplies from area vendors whenever possible to reinvest locally.',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="text-center">
                      <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-deep-blue/10 text-brand-deep-blue dark:bg-white/10 dark:text-white">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-neutral-charcoal dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue rounded-2xl p-8 md:p-12 text-white text-center">
              <Sparkles className="h-16 w-16 text-brand-bright-blue mx-auto mb-6" />
              <h2 className="text-h2 leading-tight font-bold mb-6">Our Commitment to You</h2>
              <p className="text-body text-white/80">
                We promise to treat your facility like it's our own. We show up on time, do the work
                right, and fix any issues immediately. No excuses, no runarounds, just professional
                cleaning you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-6">
              Proudly Serving Massachusetts & Connecticut
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              Based in West Springfield, MA, we provide commercial cleaning services throughout
              Western Massachusetts and Northern Connecticut within a 100-mile radius.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-charcoal/80 dark:text-white/80">
              <div>Springfield, MA</div>
              <div>Worcester, MA</div>
              <div>Northampton, MA</div>
              <div>Hartford, CT</div>
              <div>Holyoke, MA</div>
              <div>Chicopee, MA</div>
              <div>Westfield, MA</div>
              <div>Enfield, CT</div>
            </div>
            <p className="text-sm text-neutral-charcoal/60 dark:text-white/70 mt-8">
              Don't see your city? Contact us-we may serve your area!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
