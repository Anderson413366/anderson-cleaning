'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
  /** Number of FAQs to expand by default (default: 3) */
  defaultExpanded?: number
}

export default function FAQAccordion({ faqs, defaultExpanded = 3 }: FAQAccordionProps) {
  // First N FAQs expanded by default (multi-select)
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(faqs.slice(0, defaultExpanded).map((_, i) => i))
  )

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const isOpen = (index: number) => openIndices.has(index)

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="rounded-xl border border-neutral-light-grey bg-white dark:border-slate-700 dark:bg-slate-900 overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 hover:bg-neutral-off-white dark:hover:bg-slate-800"
            aria-expanded={isOpen(index)}
          >
            <span className="text-base font-semibold text-neutral-charcoal dark:text-white pr-4">
              {faq.question}
            </span>
            {/* Chevron icon - 20x20px #0077D9, rotates 180° on expand */}
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-brand-bright-blue transition-transform duration-200 ${
                isOpen(index) ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          {/* Answer panel with smooth 200ms animation */}
          <div
            className={`transition-all duration-200 ease-in-out ${
              isOpen(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-5 pb-5 pt-1">
              {/* Answer text: 14px #333333 with 20px line-height */}
              <p className="text-sm text-[#333333] dark:text-white/80" style={{ lineHeight: '20px' }}>
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
