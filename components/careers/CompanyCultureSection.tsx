'use client'

import React from 'react'
import Link from 'next/link'
import { useAppContext } from '@/lib/careers/AppContext'
import { Users, Award, Heart, ArrowRight } from 'lucide-react'

const CompanyCultureSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const cultureValues = [
    {
      icon: Users,
      title: t('investInPeopleTitle') as string,
      description: t('investInPeopleDescription') as string,
    },
    {
      icon: Award,
      title: t('systemsStandardsTitle') as string,
      description: t('systemsStandardsDescription') as string,
    },
    {
      icon: Heart,
      title: t('personalTouchTitle') as string,
      description: t('personalTouchDescription') as string,
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
            {t('companyCultureTitle') as string}
          </h2>
          <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-2xl mx-auto">
            {t('companyCultureSubtitle') as string}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cultureValues.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-neutral-off-white dark:hover:bg-slate-800 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-charcoal/70 dark:text-neutral-charcoal/50">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Internal Links */}
        <div className="mt-12 text-center">
          <p className="text-neutral-charcoal/70 dark:text-neutral-charcoal/50 mb-6">
            Learn more about our company and services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center text-primary-700 dark:text-blue-400 hover:text-primary-800 dark:hover:text-blue-300 font-medium transition-colors group"
            >
              About Us
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-neutral-charcoal/40 dark:text-neutral-charcoal/80">|</span>
            <Link
              href="/services"
              className="inline-flex items-center text-primary-700 dark:text-blue-400 hover:text-primary-800 dark:hover:text-blue-300 font-medium transition-colors group"
            >
              Our Services
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-neutral-charcoal/40 dark:text-neutral-charcoal/80">|</span>
            <Link
              href="/contact"
              className="inline-flex items-center text-primary-700 dark:text-blue-400 hover:text-primary-800 dark:hover:text-blue-300 font-medium transition-colors group"
            >
              Contact Us
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyCultureSection
