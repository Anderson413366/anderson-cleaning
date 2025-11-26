'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { submitQuickQuoteRequest } from '@/lib/forms/quickQuoteClient'
import {
  FACILITY_TYPES,
  ERROR_MESSAGES,
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
  isValidName,
} from '@/components/forms/quickQuoteHelpers'
import FormLegalNotice from './FormLegalNotice'

interface HeroQuickQuoteFormState {
  name: string
  company: string
  email: string
  phone: string
  facilityType: string
}

export default function HeroQuickQuoteForm() {
  const [formData, setFormData] = useState<HeroQuickQuoteFormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    facilityType: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof HeroQuickQuoteFormState, string>>>({})
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (errors[name as keyof HeroQuickQuoteFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof HeroQuickQuoteFormState, string>> = {}

    if (!isValidName(formData.name)) newErrors.name = ERROR_MESSAGES.name
    if (!formData.company.trim()) newErrors.company = ERROR_MESSAGES.company
    if (!isValidEmail(formData.email)) newErrors.email = ERROR_MESSAGES.email
    if (!isValidPhone(formData.phone)) newErrors.phone = ERROR_MESSAGES.phone
    if (!formData.facilityType) newErrors.facilityType = ERROR_MESSAGES.facilityType

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      facilityType: '',
    })
    setErrors({})
    setIsSuccess(false)
    setSubmitError(null)
    setHoneypot('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitQuickQuoteRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        facilityType: formData.facilityType,
        company: formData.company,
        source: 'hero',
        website: honeypot,
      })
      setIsSuccess(true)
      setTimeout(resetForm, 4000)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your request right now. Please try again shortly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-6">
        <h2 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-2">Get Your Free Quote</h2>
        <p className="text-neutral-charcoal/70 dark:text-white/80">
          Response within 24 hours (Monday – Friday, 9 AM – 5 PM EST)
        </p>
      </div>

      {isSuccess && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />
          <p>Your request was received. A member of our team will call or email you shortly.</p>
        </div>
      )}

      {submitError && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
          <p>{submitError}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="hero-website" className="block text-sm font-semibold text-neutral-charcoal/80">
            Website
          </label>
          <input
            id="hero-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="hero-name"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1"
          >
            Your Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="hero-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-brand-deep-blue/20 dark:border-white/20 rounded-lg focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white"
            placeholder="John Smith"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'hero-name-error' : undefined}
          />
          {errors.name && (
            <p id="hero-name-error" className="mt-1 text-sm text-brand-red">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hero-company"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1"
          >
            Company Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="hero-company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-brand-deep-blue/20 dark:border-white/20 rounded-lg focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white"
            placeholder="ABC Corp"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'hero-company-error' : undefined}
          />
          {errors.company && (
            <p id="hero-company-error" className="mt-1 text-sm text-brand-red">
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hero-email"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1"
          >
            Business Email <span className="text-error">*</span>
          </label>
          <input
            type="email"
            id="hero-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-brand-deep-blue/20 dark:border-white/20 rounded-lg focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white"
            placeholder="john@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'hero-email-error' : undefined}
          />
          {errors.email && (
            <p id="hero-email-error" className="mt-1 text-sm text-brand-red">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hero-phone"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1"
          >
            Phone Number <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            id="hero-phone"
            name="phone"
            required
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-brand-deep-blue/20 dark:border-white/20 rounded-lg focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white"
            placeholder="(413) 306-5053"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'hero-phone-error' : undefined}
          />
          {errors.phone && (
            <p id="hero-phone-error" className="mt-1 text-sm text-brand-red">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="hero-facility"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1"
          >
            Facility Type <span className="text-error">*</span>
          </label>
          <select
            id="hero-facility"
            name="facilityType"
            required
            value={formData.facilityType}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-brand-deep-blue/20 dark:border-white/20 rounded-lg focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white"
            aria-invalid={!!errors.facilityType}
            aria-describedby={errors.facilityType ? 'hero-facility-error' : undefined}
          >
            {FACILITY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.facilityType && (
            <p id="hero-facility-error" className="mt-1 text-sm text-brand-red">
              {errors.facilityType}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-accent-500 hover:bg-accent-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Get My Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <FormLegalNotice className="text-center" />

        <p className="text-xs text-center text-neutral-charcoal/60 dark:text-white/70">
          We respond within 24 hours • Current clients have 24/7 emergency support
        </p>
      </form>
    </div>
  )
}
