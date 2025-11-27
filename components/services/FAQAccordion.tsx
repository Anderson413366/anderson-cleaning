'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string | string[]
}

interface FAQAccordionProps {
  faqs: FAQ[]
  /** Number of FAQs to expand by default (default: 3) */
  defaultExpanded?: number
}

export default function FAQAccordion({ faqs, defaultExpanded = 3 }: FAQAccordionProps) {
  // First N FAQs expanded by default (multi-select)
  const initialOpenIndices = new Set(faqs.slice(0, defaultExpanded).map((_, i) => i))
  const [openIndices, setOpenIndices] = useState<Set<number>>(initialOpenIndices)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)

  // Intersection Observer: collapse all FAQs when section leaves viewport (performance optimization)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)

          // When scrolling away, collapse all FAQs to improve performance
          if (!entry.isIntersecting) {
            setOpenIndices(new Set())
          } else {
            // When scrolling back into view, restore default expanded state
            setOpenIndices(initialOpenIndices)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: '50px', // Add 50px buffer
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    <div ref={sectionRef} className="space-y-3">
      {faqs.map((faq, index) => {
        const answer = faq.answer

        return (
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
                {typeof answer === 'string' ? (
                  <p className="text-sm text-[#333333] dark:text-white/80" style={{ lineHeight: '20px' }}>
                    {answer}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {answer.map((item, i) => (
                      <li key={i} className="text-sm text-[#333333] dark:text-white/80" style={{ lineHeight: '20px' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
