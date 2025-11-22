'use client'

import React from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { FileText, Users as UsersIcon, GraduationCap, Rocket, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ApplicationProcessSectionProps {
  onStartApplication: () => void
}

const ApplicationProcessSection: React.FC<ApplicationProcessSectionProps> = ({
  onStartApplication,
}) => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const steps = [
    {
      number: 1,
      icon: FileText,
      title: t('processStep1Title') as string,
      description: t('processStep1Description') as string,
    },
    {
      number: 2,
      icon: UsersIcon,
      title: t('processStep2Title') as string,
      description: t('processStep2Description') as string,
    },
    {
      number: 3,
      icon: GraduationCap,
      title: t('processStep3Title') as string,
      description: t('processStep3Description') as string,
    },
    {
      number: 4,
      icon: Rocket,
      title: t('processStep4Title') as string,
      description: t('processStep4Description') as string,
    },
  ]

  return (
    <section className="py-20 bg-neutral-off-white dark:bg-slate-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
            {t('applicationProcessTitle') as string}
          </h2>
          <p className="text-body text-neutral-charcoal/70 dark:text-white/80 max-w-2xl mx-auto">
            {t('applicationProcessSubtitle') as string}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent-500 text-white rounded-full font-bold text-body mb-4">
                    {step.number}
                  </div>
                  <Icon className="h-10 w-10 text-accent-500 mb-4" />
                  <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-charcoal/70 dark:text-neutral-charcoal/50 text-sm">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <p className="text-neutral-charcoal/70 dark:text-white/80 mb-6">
            {t('processTimeframe') as string}
          </p>
          <Button variant="accent" size="lg" onClick={onStartApplication} className="group">
            {t('startApplicationButton') as string}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ApplicationProcessSection
