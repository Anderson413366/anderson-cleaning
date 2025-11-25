'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ChevronDown, ChevronUp, Search, HelpCircle, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { inputClassName } from '@/lib/styles/formStyles'

const faqCategories = {
  'Pricing & Contracts': [
    {
      question: 'Do I need to sign a long-term contract?',
      answer:
        'We offer both month-to-month agreements and longer-term contracts. Month-to-month agreements provide maximum flexibility with a 30-day notice period. Longer contracts (typically 1-3 years) often come with discounted rates and guaranteed pricing. We work with you to find the arrangement that best fits your needs.',
    },
    {
      question: 'How do you determine pricing?',
      answer:
        'Our pricing is based on several factors including: square footage of your facility, frequency of cleaning (daily, weekly, bi-weekly), specific services required (basic janitorial, floor care, window cleaning), and any special requirements (medical-grade disinfection, green cleaning). We provide free on-site walk-throughs to give you an accurate, customized quote with no hidden fees.',
    },
    {
      question: 'Are there any hidden fees or additional charges?',
      answer:
        'No. We believe in transparent pricing. Your quote includes all regular services, supplies, equipment, and management. Any additional services (like emergency cleaning or one-time deep cleans) will be discussed and approved by you before any work is performed.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept checks, ACH/direct deposit, and all major credit cards. Most of our commercial clients prefer monthly invoicing with net-30 payment terms, which we offer to established accounts.',
    },
  ],
  'Service & Scheduling': [
    {
      question: 'What if I\'m not satisfied with a cleaning?',
      answer:
        'We have a 100% satisfaction guarantee. If you\'re not satisfied with any aspect of our service, contact us within 24 hours and we\'ll return to re-clean the area at no additional cost. We also conduct regular quality audits and maintain open communication to address any concerns immediately. Your dedicated account manager is available 24/7 to ensure your needs are met.',
    },
    {
      question: 'Can I change my cleaning schedule?',
      answer:
        'Yes! We understand that business needs change. You can adjust your cleaning frequency or schedule with reasonable notice (typically 1-2 weeks). We work around your business hours and can accommodate special events, holiday schedules, or temporary changes.',
    },
    {
      question: 'What happens if you miss a scheduled cleaning?',
      answer:
        'In the rare event we must reschedule (due to severe weather or emergency), we\'ll notify you immediately and arrange a make-up cleaning at a convenient time. For contracted services, any missed cleanings are prorated from your bill or made up within the same billing period.',
    },
    {
      question: 'Do you provide cleaning supplies and equipment?',
      answer:
        'Yes. We provide all cleaning supplies, equipment, and products as part of our service. We use professional-grade, EPA-registered products and maintain our own commercial equipment. If you have preferences (like green cleaning products or specific brands), we can accommodate those requests.',
    },
    {
      question: 'Can you work around our business hours?',
      answer:
        'Absolutely. We offer flexible scheduling including after-hours, overnight, and weekend cleaning to minimize disruption to your business operations. Many of our clients prefer evening cleaning (6 PM - midnight) or early morning (4 AM - 8 AM) to ensure a fresh, clean facility when employees arrive.',
    },
  ],
  'Staff & Safety': [
    {
      question: 'How do you vet your cleaning staff?',
      answer:
        'All Anderson Cleaning Company employees undergo comprehensive background checks before hire, including criminal history, employment verification, and reference checks. We only hire W-2 employees (no subcontractors) who complete 40+ hours of training on cleaning techniques, safety protocols, and customer service. All staff are bonded and insured for your protection.',
    },
    {
      question: 'Will I have the same cleaning team each time?',
      answer:
        'Yes. We assign dedicated teams to each facility to ensure consistency and familiarity with your specific needs and preferences. If a team member is sick or on vacation, trained backup staff will cover, and we\'ll notify you of any personnel changes.',
    },
    {
      question: 'Are your employees bonded and insured?',
      answer:
        'Yes. We carry comprehensive general liability insurance, workers\' compensation insurance, and employee bonding. We provide certificates of insurance upon request and can add your business as an additional insured if required.',
    },
    {
      question: 'What COVID-19 safety measures do you follow?',
      answer:
        'We follow CDC and OSHA guidelines including enhanced disinfection of high-touch surfaces, use of EPA-registered disinfectants effective against SARS-CoV-2, and regular health screenings for our staff. We can implement specific protocols based on your facility\'s requirements.',
    },
  ],
  'Services & Capabilities': [
    {
      question: 'What types of facilities do you service?',
      answer:
        'We specialize in B2B commercial cleaning including: office buildings, medical facilities (clinics, dental offices, physical therapy), educational facilities (schools, daycare centers, training centers), retail stores, light manufacturing and warehouses.',
    },
    {
      question: 'Do you provide specialized cleaning for medical offices?',
      answer:
        'Yes. We have extensive experience with medical facility cleaning and follow OSHA bloodborne pathogen standards, CDC guidelines, and use medical-grade disinfectants. Our teams are trained in exam room turnover, waiting area sanitation, and proper disposal of biohazard materials.',
    },
    {
      question: 'Can you handle one-time or seasonal deep cleaning?',
      answer:
        'Yes. While we specialize in ongoing contracts, we also provide one-time services including move-in/move-out cleaning, post-construction cleanup, seasonal deep cleans, carpet cleaning, and floor stripping/waxing. Contact us for a custom quote.',
    },
    {
      question: 'Do you offer green cleaning options?',
      answer:
        'Yes! We offer comprehensive green cleaning programs using Green Seal or EPA Safer Choice certified products, microfiber technology, and HEPA filtration vacuums. Green cleaning can support LEED certification and improves indoor air quality with no sacrifice in effectiveness.',
    },
    {
      question: 'What is included in your standard office cleaning?',
      answer:
        'Standard office cleaning typically includes: emptying trash and recycling, vacuuming carpets, mopping hard floors, dusting surfaces and furniture, cleaning and sanitizing restrooms, restocking restroom supplies, cleaning break room/kitchen areas, wiping down high-touch surfaces, and spot cleaning glass doors/partitions. We customize our service based on your facility\'s specific needs.',
    },
  ],
  'Coverage & Contact': [
    {
      question: 'What areas do you serve?',
      answer:
        'We service commercial facilities within 100 miles of West Springfield, MA, including all of Western Massachusetts (Springfield, Worcester, Northampton, Amherst, Pittsfield) and Northern Connecticut (Hartford area). If you\'re unsure whether your location is within our service area, contact us—we\'re happy to check!',
    },
    {
      question: 'How quickly do you respond to service requests?',
      answer:
        'We respond to all inquiries within 24 hours during our office hours (Monday – Friday, 9 AM – 5 PM EST). For emergency cleaning needs involving current clients, we provide 24/7 coverage with on-site arrival in 2 hours or less.',
    },
    {
      question: 'What if we have an emergency cleaning need?',
      answer:
        'Current clients can call our 24/7 emergency line and we\'ll dispatch a team immediately. Emergencies include pipe bursts, bathroom accidents, urgent spills, and similar facility incidents. We guarantee on-site arrival within 2 hours or less and premium rates apply for after-hours service.',
    },
    {
      question: 'Can I get a quote without an on-site visit?',
      answer:
        'While we can provide rough estimates over the phone or via email with basic information (square footage, facility type, cleaning frequency), we strongly recommend an on-site walk-through for accurate pricing. This allows us to see your specific needs, ask questions, and provide a customized proposal. Walk-throughs are free and typically take 15-30 minutes.',
    },
  ],
}

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question)
  }

  const filterQuestions = () => {
    if (!searchQuery) return faqCategories

    const filtered: Partial<typeof faqCategories> = {}
    Object.entries(faqCategories).forEach(([category, questions]) => {
      const matchingQuestions = questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (matchingQuestions.length > 0) {
        filtered[category as keyof typeof faqCategories] = matchingQuestions
      }
    })
    return filtered
  }

  const filteredFAQs = filterQuestions()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="hero-section bg-brand-deep-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <HelpCircle className="h-16 w-16 text-accent-400 mx-auto" />
            </div>
            <h1 className="font-extrabold mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-body text-white/80 leading-relaxed">
              Find answers to common questions about our commercial cleaning services, pricing,
              scheduling, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section
        className="bg-white dark:bg-slate-900 py-8 border-b border-neutral-light-grey dark:border-slate-700"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-bright-blue dark:text-brand-bright-blue" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-brand-bright-blue bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white placeholder:text-neutral-charcoal/50 dark:placeholder:text-white/50 focus:outline-none focus:shadow-[0_0_0_4px_rgba(0,119,217,0.25)] transition-shadow duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {Object.entries(filteredFAQs).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-charcoal/70 dark:text-white/80 text-body">
                  No questions found matching "{searchQuery}". Try a different search term or browse
                  all categories.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              Object.entries(filteredFAQs).map(([category, questions], categoryIndex) => (
                <div key={category} className="mb-12">
                  <h2 className={`text-h3 leading-normal font-bold text-brand-deep-blue dark:text-brand-bright-blue mb-4 ${categoryIndex === 0 ? 'mt-0' : 'mt-12'}`}>
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {questions.map((faq, index) => {
                      const questionId = `${category}-${index}`
                      const isOpen = openQuestion === questionId
                      return (
                        <div
                          key={index}
                          className="bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden transition-all duration-300"
                        >
                          <h3>
                            <button
                              onClick={() => toggleQuestion(questionId)}
                              className="group w-full px-6 py-5 text-left flex items-start justify-between hover:bg-neutral-off-white dark:hover:bg-slate-600 transition-colors min-h-[44px]"
                              aria-expanded={isOpen}
                              aria-controls={`faq-answer-${questionId}`}
                            >
                              <span className="font-semibold text-neutral-charcoal dark:text-white text-body pr-4">
                                {faq.question}
                              </span>
                              {isOpen ? (
                                <ChevronUp
                                  className="h-6 w-6 text-brand-deep-blue dark:text-brand-bright-blue flex-shrink-0 transition-transform"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDown
                                  className="h-6 w-6 text-neutral-charcoal/50 group-hover:text-brand-deep-blue dark:group-hover:text-brand-bright-blue group-hover:rotate-180 flex-shrink-0 transition-all duration-300"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          </h3>
                          {isOpen && (
                            <div
                              id={`faq-answer-${questionId}`}
                              role="region"
                              aria-labelledby={`faq-question-${questionId}`}
                              className="px-6 py-5 bg-neutral-off-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-600"
                            >
                              <p className="text-neutral-charcoal/80 dark:text-white/80 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-brand-deep-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-body text-white/80 mb-8">
              Our team is here to help! We respond to all inquiries within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="accent" size="lg">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <a href="tel:+14133065053">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call (413) 306-5053
                </Button>
              </a>
            </div>
            <p className="text-sm text-brand-bright-blue/70 mt-6">
              Monday – Friday: 9 AM – 5 PM EST | 24/7 emergency support for current clients
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
