import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { GlassIcon } from '@/components/ui/GlassIcon'
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
  Sparkles,
  Leaf,
  Star,
  Phone,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: '18+ years serving Western MA & CT businesses with professional commercial cleaning. Family-owned, W-2 employees, OSHA/CDC compliant. Learn about our commitment to quality and service excellence.',
  alternates: {
    canonical: 'https://andersoncleaning.com/about',
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

      {/* Key Differentiators - Badge Row */}
      <section className="py-12 border-b border-neutral-light-grey dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Users',
                  title: 'Full-Time W-2 Employees',
                  description: 'No contractors—trained professionals with benefits and accountability',
                },
                {
                  icon: 'Clock',
                  title: '24/7 Support',
                  description: 'Real people answer. Emergency on-site arrival in 2 hours or less',
                },
                {
                  icon: 'Shield',
                  title: 'Fully Insured & Bonded',
                  description: 'Comprehensive liability coverage. All staff background checked',
                },
              ].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-neutral-off-white dark:bg-slate-800 border-2 border-brand-deep-blue/20 dark:border-brand-bright-blue/30 rounded-lg p-6 hover:border-brand-bright-blue/50 dark:hover:border-brand-bright-blue/60 transition-colors"
                  >
                    {/* Glass-effect icon - Medium (48px) */}
                    <div className="flex-shrink-0">
                      <GlassIcon icon={item.icon} size="md" variant="default" label={item.title} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-neutral-charcoal dark:text-white mb-1 text-base leading-tight">
                        {item.title}
                      </p>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-white/70 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Clean Vertical Timeline */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Our Story
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-16 max-w-3xl mx-auto">
              Built on a foundation of reliability, quality, and genuine care for our clients
            </p>

            {/* Clean Vertical Timeline */}
            <div className="relative">
              {/* Vertical timeline line - 2px #E0E0E0 */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#E0E0E0] dark:bg-slate-600 md:-translate-x-1/2"></div>

              {/* Timeline items with 80px spacing */}
              <div className="space-y-[80px]">
                {/* 2007 - Founded */}
                <div className="relative flex flex-col md:flex-row md:items-start">
                  {/* Year marker - 48px circle #0077D9 with white text */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-bright-blue text-white font-bold text-sm shadow-md">
                      2007
                    </div>
                  </div>

                  {/* Content - Right side on desktop, below marker on mobile */}
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-10 md:text-left">
                    <h3 className="text-lg font-bold text-brand-deep-blue dark:text-white mb-2">
                      Founded on Vision
                    </h3>
                    <p className="text-[14px] text-[#333333] dark:text-white/80 leading-relaxed">
                      Anderson Cleaning Company was founded with a simple vision: provide corporate-grade commercial cleaning with the accountability of a family business. We saw businesses struggling with unreliable contractors and knew there had to be a better way.
                    </p>
                  </div>
                </div>

                {/* 2015 - Growth */}
                <div className="relative flex flex-col md:flex-row md:items-start">
                  {/* Year marker */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-bright-blue text-white font-bold text-sm shadow-md">
                      2015
                    </div>
                  </div>

                  {/* Content - Left side on desktop (alternating) */}
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-10 md:text-right md:order-first">
                    <h3 className="text-lg font-bold text-brand-deep-blue dark:text-white mb-2">
                      100+ Clients Strong
                    </h3>
                    <p className="text-[14px] text-[#333333] dark:text-white/80 leading-relaxed">
                      By investing in people, implementing quality systems, and maintaining our personal touch, we grew to serve over 100 commercial facilities. Our W-2 employee model proved that quality and reliability go hand in hand.
                    </p>
                  </div>
                </div>

                {/* Today */}
                <div className="relative flex flex-col md:flex-row md:items-start">
                  {/* Year marker */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-bright-blue text-white font-bold text-[11px] shadow-md">
                      Today
                    </div>
                  </div>

                  {/* Content - Right side on desktop */}
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-10 md:text-left">
                    <h3 className="text-lg font-bold text-brand-deep-blue dark:text-white mb-2">
                      Trusted Partner
                    </h3>
                    <p className="text-[14px] text-[#333333] dark:text-white/80 leading-relaxed">
                      Today, we serve commercial facilities across Massachusetts and Connecticut—from professional offices to corporate campuses. With {YEARS_IN_BUSINESS}+ years of experience, our secret remains simple: we treat every client like they&apos;re our only client.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Meet Our Leadership Team
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering exceptional service and building lasting relationships
            </p>

            {/* Leadership Team Grid - 240px cards, 24px gaps */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                {
                  name: 'Anderson Gomes',
                  title: 'Owner & Founder',
                  bio: 'Founded Anderson Cleaning in 2007 with a vision for corporate-grade cleaning with family business accountability.',
                  icon: Users,
                },
                {
                  name: 'Operations Director',
                  title: 'Director of Operations',
                  bio: 'Manages daily operations, staff scheduling, and quality control to ensure consistent, high-quality service.',
                  icon: Target,
                },
                {
                  name: 'Quality Manager',
                  title: 'Quality Assurance Lead',
                  bio: 'Conducts facility inspections, monitors SOP compliance, and implements corrective action plans.',
                  icon: Award,
                },
              ].map((member, idx) => {
                const Icon = member.icon
                return (
                  <div
                    key={idx}
                    className="w-[240px] bg-white dark:bg-slate-900 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* 120x120 icon circle - consistent #0077D9 background */}
                    <div className="w-[120px] h-[120px] mx-auto mb-4 rounded-full bg-brand-bright-blue flex items-center justify-center">
                      <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Name: 16px bold #002A86 */}
                    <h3 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-1">
                      {member.name}
                    </h3>
                    {/* Title: 14px #0077D9 */}
                    <p className="text-[14px] text-brand-bright-blue mb-3">
                      {member.title}
                    </p>
                    {/* Bio: 13px #666666, 2-3 lines */}
                    <p className="text-[13px] text-[#666666] dark:text-white/70 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Account Management Team Preview */}
            <div className="bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue rounded-xl p-8 md:p-10 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-h2 font-bold mb-4">
                  Your Dedicated Account Management Team
                </h3>
                <p className="text-body text-white/95 mb-6 leading-relaxed">
                  Every client is assigned a dedicated account manager who knows your facility, your team, and your specific needs. No call centers, no ticket systems—just real people who genuinely care about your success.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {[
                    {
                      icon: Phone,
                      title: '24/7 Direct Line',
                      description: 'Call or text anytime—real people answer',
                    },
                    {
                      icon: Clock,
                      title: '2-Hour Response',
                      description: 'Emergency on-site arrival guaranteed',
                    },
                    {
                      icon: CheckCircle2,
                      title: 'Proactive Support',
                      description: 'Regular check-ins to ensure satisfaction',
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <Icon className="h-8 w-8 mx-auto mb-3 text-white" />
                        <h4 className="font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles - Clean 3-card layout */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Built on Three Core Principles
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-3xl mx-auto">
              Our approach combines the best of both worlds: corporate-grade quality with family business accountability
            </p>

            {/* 3 cards side-by-side: 300px width × 200px height */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: Users,
                  title: 'Invest in People',
                  description: 'Full-time W-2 employees with benefits and training—not contractors.',
                  quote: 'Low turnover means familiar faces and consistent quality',
                },
                {
                  icon: Target,
                  title: 'Systems & Standards',
                  description: 'Corporate-grade processes, quality checklists, and custom SOPs.',
                  quote: 'Documented processes ensure nothing gets missed',
                },
                {
                  icon: Heart,
                  title: 'Personal Touch',
                  description: '24/7 support with real people who know your name and facility.',
                  quote: 'We treat every client like they\'re our only client',
                },
              ].map((principle, idx) => {
                const Icon = principle.icon
                return (
                  <div
                    key={idx}
                    className="w-[300px] h-[200px] bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-5 text-center flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Icon 64px centered */}
                    <div className="w-16 h-16 rounded-full bg-brand-bright-blue flex items-center justify-center mb-3">
                      <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Title: 18px bold #002A86 */}
                    <h3 className="text-[18px] font-bold text-brand-deep-blue dark:text-white mb-2">
                      {principle.title}
                    </h3>
                    {/* Description: 14px #666666, 2 lines max */}
                    <p className="text-[14px] text-[#666666] dark:text-white/70 leading-snug line-clamp-2 mb-2">
                      {principle.description}
                    </p>
                    {/* Quote: italic 12px #0077D9 */}
                    <p className="text-[12px] italic text-brand-bright-blue">
                      &ldquo;{principle.quote}&rdquo;
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Showcase */}
      <section className="bg-neutral-off-white dark:bg-slate-900">
        <CertificationShowcase />
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
                    icon: 'Handshake',
                    title: 'Local Hiring',
                    description: 'We employ local residents to keep jobs and economic benefits in our community.',
                  },
                  {
                    icon: 'Heart',
                    title: 'Community Support',
                    description: 'Regular donations and volunteer work for local charities, schools, and events.',
                  },
                  {
                    icon: 'Star',
                    title: 'Local Partnerships',
                    description: 'We source supplies from area vendors whenever possible to reinvest locally.',
                  },
                ].map((item, idx) => {
                  return (
                    <div key={idx} className="text-center">
                      {/* Glass-effect icon - Medium (48px) */}
                      <div className="flex justify-center mb-3">
                        <GlassIcon icon={item.icon} size="md" variant="default" label={item.title} />
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
            {/* Regional Location Groups */}
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Massachusetts Locations */}
              <div>
                <h3 className="text-base font-semibold text-brand-deep-blue dark:text-white mb-3">
                  Massachusetts
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <Link href="/locations/springfield-ma" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Springfield
                  </Link>
                  <Link href="/locations/west-springfield-ma" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    West Springfield
                  </Link>
                  <Link href="/locations/worcester-county-ma" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Worcester
                  </Link>
                  <Link href="/locations/northampton-amherst-ma" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Northampton
                  </Link>
                  <Link href="/locations/holyoke-ma" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Holyoke
                  </Link>
                  <Link href="/locations/chicopee-ma" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Chicopee
                  </Link>
                </div>
              </div>

              {/* Connecticut Locations */}
              <div>
                <h3 className="text-base font-semibold text-brand-deep-blue dark:text-white mb-3">
                  Connecticut
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <Link href="/locations/hartford-ct" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Hartford
                  </Link>
                  <Link href="/locations/enfield-ct" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Enfield
                  </Link>
                  <Link href="/locations/windsor-ct" className="text-sm text-brand-bright-blue hover:underline transition-colors underline-offset-2">
                    Windsor
                  </Link>
                </div>
              </div>
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
