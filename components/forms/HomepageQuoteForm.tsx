'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
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

interface HomepageQuoteFormState {
  name: string
  company: string
  email: string
  phone: string
  facilityType: string
}

/**
 * Homepage Quote Form - Custom branded styling per design requirements
 *
 * Design specifications:
 * - Labels: 14px, medium weight, #333333
 * - Inputs: 48px height, #FFFFFF background, 1px #D0D0D0 border
 * - Placeholder: #999999
 * - Focus: 2px #0077D9 border + shadow
 * - Button: #0077D9 background, white text, 16px bold
 * - Container: max-width 500px, centered, 40px padding
 */
export default function HomepageQuoteForm() {
  const [formData, setFormData] = useState<HomepageQuoteFormState>({
    name: '',
    company: '',
    email: '',
    phone: '',
    facilityType: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof HomepageQuoteFormState, string>>>({})
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

    if (errors[name as keyof HomepageQuoteFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof HomepageQuoteFormState, string>> = {}

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
        source: 'homepage',
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
    <div className="w-full max-w-[500px] mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-charcoal dark:text-white mb-2">
          Get Your Free Quote
        </h2>
        <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
          Response within 24 hours (Monday – Friday, 9 AM – 5 PM EST)
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
          <p>Your request was received. A member of our team will call or email you shortly.</p>
        </div>
      )}

      {submitError && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" aria-hidden="true" />
          <p>{submitError}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="homepage-website" className="block text-sm font-medium">
            Website
          </label>
          <input
            id="homepage-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {/* Name field */}
        <div>
          <label
            htmlFor="homepage-name"
            className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2"
          >
            Your Name <span className="text-brand-red">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="text"
            id="homepage-name"
            name="name"
            required
            aria-required="true"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="John Smith"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'homepage-name-error' : undefined}
          />
          {errors.name && (
            <p id="homepage-name-error" className="mt-2 text-sm text-brand-red">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company field */}
        <div>
          <label
            htmlFor="homepage-company"
            className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2"
          >
            Company Name <span className="text-brand-red">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="text"
            id="homepage-company"
            name="company"
            required
            aria-required="true"
            value={formData.company}
            onChange={handleChange}
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="ABC Corp"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'homepage-company-error' : undefined}
          />
          {errors.company && (
            <p id="homepage-company-error" className="mt-2 text-sm text-brand-red">
              {errors.company}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="homepage-email"
            className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2"
          >
            Business Email <span className="text-brand-red">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="email"
            id="homepage-email"
            name="email"
            required
            aria-required="true"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="john@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'homepage-email-error' : undefined}
          />
          {errors.email && (
            <p id="homepage-email-error" className="mt-2 text-sm text-brand-red">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label
            htmlFor="homepage-phone"
            className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2"
          >
            Phone Number <span className="text-brand-red">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="tel"
            id="homepage-phone"
            name="phone"
            required
            aria-required="true"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="(413) 306-5053"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'homepage-phone-error' : undefined}
          />
          {errors.phone && (
            <p id="homepage-phone-error" className="mt-2 text-sm text-brand-red">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Facility Type field */}
        <div>
          <label
            htmlFor="homepage-facility"
            className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2"
          >
            Facility Type <span className="text-brand-red">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="homepage-facility"
            name="facilityType"
            required
            aria-required="true"
            value={formData.facilityType}
            onChange={handleChange}
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666666%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-12"
            aria-invalid={!!errors.facilityType}
            aria-describedby={errors.facilityType ? 'homepage-facility-error' : undefined}
          >
            {FACILITY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.facilityType && (
            <p id="homepage-facility-error" className="mt-2 text-sm text-brand-red">
              {errors.facilityType}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[48px] bg-brand-bright-blue hover:bg-[#0066CC] disabled:bg-brand-bright-blue/50 text-white font-bold text-base rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-bright-blue focus:ring-offset-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Get My Free Quote
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <FormLegalNotice className="text-center" />

        <p className="text-xs text-center text-neutral-charcoal/60 dark:text-white/70">
          We respond within 24 hours • Current clients have 24/7 emergency support
        </p>
      </form>
    </div>
  )
}
