'use client'

import React from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { TrendingUp, Users, Handshake, Shield } from 'lucide-react'

const WhyWorkSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const whyWorkItemsData = t('whyWorkItems')
  const whyWorkItems = Array.isArray(whyWorkItemsData)
    ? (whyWorkItemsData as unknown as {
        title: string;
        description: string;
        benefits?: string[];
      }[])
    : []

  const iconMap: { [key: string]: React.ComponentType<any> } = {
    'Growth Opportunities': TrendingUp,
    'Supportive Culture': Users,
    'Impactful Work': Handshake,
    'Competitive Benefits': Shield,
  }

  return (
    <section className="py-20 bg-neutral-off-white dark:bg-slate-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 leading-tight font-bold text-center mb-12 text-neutral-charcoal dark:text-white">
          {t('whyWorkTitle') as string}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyWorkItems.map((item, index) => {
            const Icon = iconMap[item.title] || Shield
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="h-12 w-12 text-accent-500 mb-4" />
                <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-charcoal/70 dark:text-neutral-charcoal/50 mb-3">{item.description}</p>
                {item.benefits && item.benefits.length > 0 && (
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-neutral-charcoal/70 dark:text-neutral-charcoal/50">
                        <span className="text-accent-500 mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyWorkSection
