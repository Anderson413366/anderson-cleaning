'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="rounded-2xl border border-neutral-light-grey bg-white dark:border-slate-700 dark:bg-slate-900 overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-neutral-off-white dark:hover:bg-slate-800"
            aria-expanded={openIndex === index}
          >
            <span className="text-lg font-semibold text-neutral-charcoal dark:text-white pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-brand-deep-blue dark:text-brand-bright-blue transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            className={`transition-all duration-200 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-5 pb-5 pt-2">
              <p className="text-base text-neutral-charcoal/70 dark:text-white/70 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
