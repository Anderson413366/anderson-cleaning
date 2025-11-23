'use client'

import { useMemo, useState } from 'react'
import { Filter, Star } from 'lucide-react'
import { Testimonial } from '@/lib/testimonials/types'
import { inputClassName, labelClassName } from '@/lib/styles/formStyles'

interface TestimonialsExplorerProps {
  testimonials: Testimonial[]
}

const getUniqueValues = (items: Testimonial[], key: 'industry' | 'service') => {
  return ['All', ...Array.from(new Set(items.map((item) => item[key])))]
}

const TestimonialsExplorer = ({ testimonials }: TestimonialsExplorerProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [selectedService, setSelectedService] = useState('All')

  const industries = useMemo(() => getUniqueValues(testimonials, 'industry'), [testimonials])
  const services = useMemo(() => getUniqueValues(testimonials, 'service'), [testimonials])

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      const matchesIndustry =
        selectedIndustry === 'All' || testimonial.industry === selectedIndustry
      const matchesService = selectedService === 'All' || testimonial.service === selectedService
      return matchesIndustry && matchesService
    })
  }, [selectedIndustry, selectedService, testimonials])

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? 'fill-brand-bright-blue text-brand-bright-blue'
              : 'fill-neutral-light-grey text-neutral-light-grey dark:fill-slate-700 dark:text-slate-700'
          }`}
        />
      ))}
    </div>
  )

  const totalCount = testimonials.length
  const showCount = selectedIndustry !== 'All' || selectedService !== 'All'

  return (
    <>
      {/* Filters */}
      <section className="py-12 bg-neutral-off-white dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h2 className="text-body font-semibold text-neutral-charcoal dark:text-white">
                Filter Testimonials
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className={inputClassName}
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry === 'All' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClassName}>Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className={inputClassName}
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service === 'All' ? 'All Services' : service}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {showCount && (
              <div className="mt-4">
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                  Showing {filteredTestimonials.length} of {totalCount} testimonials
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {filteredTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
                  No testimonials match your filter criteria. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="h-full flex flex-col bg-white dark:bg-slate-800 border-2 border-neutral-light-grey dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-brand-bright-blue transition-all duration-300"
                  >
                    <div className="mb-4">{renderStars(testimonial.rating)}</div>
                    <blockquote className="flex-1 mb-6">
                      <p className="text-body text-neutral-charcoal/80 dark:text-white/80 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>
                    <div className="border-t border-neutral-light-grey dark:border-slate-700 pt-4">
                      <p className="font-bold text-neutral-charcoal dark:text-white mb-1">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-white/80 mb-1">
                        {testimonial.title}
                      </p>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-white/80 mb-3">
                        {testimonial.company}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20 text-brand-bright-blue text-xs font-semibold rounded-full">
                          {testimonial.industry}
                        </span>
                        <span className="inline-block px-3 py-1 bg-brand-deep-blue/10 dark:bg-brand-deep-blue/20 text-brand-deep-blue dark:text-brand-bright-blue text-xs font-semibold rounded-full">
                          {testimonial.service}
                        </span>
                      </div>
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
