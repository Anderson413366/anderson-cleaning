'use client'

import { useMemo, useState } from 'react'
import { Quote } from 'lucide-react'
import { Testimonial } from '@/lib/testimonials/types'

interface TestimonialsExplorerProps {
  testimonials: Testimonial[]
}

// Industry categories for filtering
const FILTER_CATEGORIES = ['All', 'Healthcare', 'Corporate', 'Educational'] as const
type FilterCategory = typeof FILTER_CATEGORIES[number]

// Map industries to filter categories
const mapIndustryToCategory = (industry: string): FilterCategory => {
  const lowerIndustry = industry.toLowerCase()
  if (lowerIndustry.includes('medical') || lowerIndustry.includes('health')) return 'Healthcare'
  if (lowerIndustry.includes('office') || lowerIndustry.includes('property')) return 'Corporate'
  if (lowerIndustry.includes('education') || lowerIndustry.includes('school')) return 'Educational'
  return 'Corporate' // Default fallback
}

const TestimonialsExplorer = ({ testimonials }: TestimonialsExplorerProps) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All')

  const filteredTestimonials = useMemo(() => {
    if (selectedFilter === 'All') return testimonials
    return testimonials.filter((testimonial) => {
      const category = mapIndustryToCategory(testimonial.industry)
      return category === selectedFilter
    })
  }, [selectedFilter, testimonials])

  return (
    <>
      {/* Filter Tabs */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-[#E0E0E0] dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {FILTER_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`
                    px-6 py-2 rounded-full text-[14px] font-semibold transition-all duration-200
                    ${
                      selectedFilter === category
                        ? 'bg-brand-bright-blue text-white'
                        : 'bg-white dark:bg-slate-800 text-[#666666] dark:text-white/70 border border-[#E0E0E0] dark:border-slate-700 hover:border-brand-bright-blue dark:hover:border-brand-bright-blue'
                    }
                  `}
                >
                  {category}
                  {category !== 'All' && (
                    <span className="ml-2 text-[12px] opacity-75">
                      (
                      {
                        testimonials.filter((t) => mapIndustryToCategory(t.industry) === category)
                          .length
                      }
                      )
                    </span>
                  )}
                </button>
              ))}
            </div>
            {selectedFilter !== 'All' && (
              <div className="mt-4 text-center">
                <p className="text-[13px] text-[#666666] dark:text-white/70">
                  Showing {filteredTestimonials.length} of {testimonials.length} testimonials
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Grid - 300x240px cards */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[16px] text-[#666666] dark:text-white/70">
                  No testimonials match your filter. Try selecting a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="
                      w-full max-w-[300px] h-[240px]
                      bg-white dark:bg-slate-800
                      border border-[#E0E0E0] dark:border-slate-700
                      rounded-lg
                      p-6
                      flex flex-col
                      hover:shadow-md hover:border-brand-bright-blue
                      transition-all duration-200
                    "
                  >
                    {/* Quote Icon - 20x20px in #0077D9 */}
                    <Quote className="h-5 w-5 text-brand-bright-blue mb-3 flex-shrink-0" aria-hidden="true" />

                    {/* Quote Text - 14px italic #333333 */}
                    <blockquote className="flex-1 mb-4 overflow-hidden">
                      <p className="text-[14px] text-[#333333] dark:text-white/90 leading-relaxed italic line-clamp-4">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex-shrink-0">
                      {/* Name - 14px bold #002A86 */}
                      <p className="text-[14px] font-bold text-brand-deep-blue dark:text-white mb-1">
                        {testimonial.name}
                      </p>
                      {/* Title - 12px #666666 */}
                      <p className="text-[12px] text-[#666666] dark:text-white/70 leading-tight">
                        {testimonial.title}
                        {testimonial.company && (
                          <>
                            <br />
                            {testimonial.company}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default TestimonialsExplorer
