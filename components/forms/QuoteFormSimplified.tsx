'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Phone, Mail, CheckCircle2, Loader2, DollarSign, ChevronRight, ChevronLeft, Building2, Hospital, GraduationCap, ShoppingBag, Warehouse, MoreHorizontal, Check, X } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'
import FormLegalNotice from './FormLegalNotice'

// Simplified validation schema - all in one
const quoteSchema = z.object({
  // Contact Info
  fullName: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^\d{10}$|^\(\d{3}\)\s?\d{3}-\d{4}$/, 'Valid phone number required'),

  // Facility Info
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Valid 5-digit ZIP code required'),
  facilityType: z.string().min(1, 'Please select facility type'),
  squareFootage: z.number().min(1000, 'Minimum 1,000 sq ft').optional(),
  cleaningFrequency: z.string().min(1, 'Please select frequency'),

  // Optional
  desiredStartDate: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, 'You must agree to be contacted'),

  // Honeypot
  website: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const facilityTypes = [
  { value: 'office', label: 'Office Building', icon: Building2 },
  { value: 'medical', label: 'Medical/Healthcare', icon: Hospital },
  { value: 'education', label: 'School/Education', icon: GraduationCap },
  { value: 'retail', label: 'Retail Store', icon: ShoppingBag },
  { value: 'industrial', label: 'Industrial/Warehouse', icon: Warehouse },
  { value: 'other', label: 'Other', icon: MoreHorizontal },
]

const frequencies = [
  { value: 'daily', label: 'Daily (5x per week)', rate: 0.06 },
  { value: '3x-week', label: '3x per week', rate: 0.05 },
  { value: '2x-week', label: '2x per week', rate: 0.045 },
  { value: 'weekly', label: 'Weekly', rate: 0.04 },
  { value: 'biweekly', label: 'Bi-weekly', rate: 0.035 },
]

interface QuoteFormSimplifiedProps {
  onSuccess?: () => void
}

export default function QuoteFormSimplified({ onSuccess }: QuoteFormSimplifiedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onBlur',
    defaultValues: {
      consent: false,
    },
  })

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('quoteFormData')
    const savedStep = localStorage.getItem('quoteFormStep')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      Object.keys(parsed).forEach((key) => {
        setValue(key as keyof QuoteFormData, parsed[key])
      })
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep))
    }
  }, [setValue])

  // Save form data to localStorage on change
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('quoteFormData', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem('quoteFormStep', currentStep.toString())
  }, [currentStep])

  const squareFootage = watch('squareFootage')
  const cleaningFrequency = watch('cleaningFrequency')
  const selectedFacilityType = watch('facilityType')

  // Calculate instant estimate
  useEffect(() => {
    if (squareFootage && squareFootage >= 1000 && cleaningFrequency) {
      const freq = frequencies.find((f) => f.value === cleaningFrequency)
      if (freq) {
        const monthlyEstimate = squareFootage * freq.rate * 4.33 // 4.33 weeks per month
        setEstimate({
          low: Math.round(monthlyEstimate * 0.9),
          high: Math.round(monthlyEstimate * 1.1),
        })
      }
    } else {
      setEstimate(null)
    }
  }, [squareFootage, cleaningFrequency])

  // Step navigation handlers
  const handleNext = async () => {
    let fieldsToValidate: (keyof QuoteFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'company', 'email', 'phone']
    } else if (currentStep === 2) {
      fieldsToValidate = ['address', 'city', 'zipCode', 'facilityType', 'squareFootage']
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Helper to get field validation state
  const getFieldState = (fieldName: keyof QuoteFormData) => {
    const hasError = !!errors[fieldName]
    const isTouched = !!touchedFields[fieldName] || !!dirtyFields[fieldName]
    const isValid = isTouched && !hasError

    return {
      hasError,
      isValid,
      className: hasError
        ? 'border-brand-red focus:border-brand-red focus:shadow-[0_0_0_3px_rgba(200,16,46,0.2)]'
        : isValid
        ? 'border-brand-bright-blue focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)]'
        : 'border-brand-deep-blue/20 dark:border-white/20 focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)]',
    }
  }

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Check honeypot
      if (data.website) {
        throw new Error('Invalid submission detected')
      }

      // Send to backend
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit quote request')
      }

      // Track with analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: 'form_submission',
          form_name: 'quote_request_simplified',
          facility_type: data.facilityType,
          cleaning_frequency: data.cleaningFrequency,
        })
      }

      // Clear saved form data
      localStorage.removeItem('quoteFormData')
      localStorage.removeItem('quoteFormStep')

      // Show success message
      setSubmitSuccess(true)
      onSuccess?.()
    } catch (error) {
      console.error('Quote submission error:', error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : `There was an error submitting your request. Please call us at ${CONTACT_INFO.phone.formatted}.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message if form submitted successfully
  if (submitSuccess) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/20">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-green-800 dark:text-green-200">
            Thank You for Your Quote Request!
          </h2>
          <p className="mb-4 text-green-700 dark:text-green-300">
            We've received your request and will contact you within 24 hours (Monday–Friday, 9 AM – 5 PM EST).
          </p>
          <div className="rounded-lg bg-white p-4 dark:bg-slate-800">
            <p className="mb-2 text-sm font-semibold text-neutral-charcoal dark:text-white">
              What happens next?
            </p>
            <ul className="space-y-2 text-left text-sm text-neutral-charcoal/70 dark:text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>Check your email for a confirmation (check spam if you don't see it)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>Our team will review your facility requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>We'll reach out with a customized quote and next steps</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={CONTACT_INFO.phone.href}
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-bright-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
            >
              <Phone className="h-5 w-5" />
              Call Us Now: {CONTACT_INFO.phone.formatted}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-brand-bright-blue px-6 py-3 font-semibold text-brand-bright-blue transition-colors hover:bg-brand-bright-blue hover:text-white dark:text-white dark:hover:bg-brand-bright-blue"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold text-neutral-charcoal dark:text-white">
          Request Your Free Quote
        </h2>
        <p className="text-neutral-charcoal/70 dark:text-white/80 mb-6">
          No spam, no pressure. Just honest pricing for quality commercial cleaning.
        </p>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center w-full">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                      step === currentStep
                        ? 'border-brand-bright-blue bg-brand-bright-blue text-white'
                        : step < currentStep
                        ? 'border-brand-bright-blue bg-brand-bright-blue text-white'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 w-full mx-2 rounded transition-all ${
                        step < currentStep
                          ? 'bg-brand-bright-blue'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-neutral-charcoal/60 dark:text-white/60">
            <span className={currentStep === 1 ? 'font-semibold text-brand-bright-blue' : ''}>Contact Info</span>
            <span className={currentStep === 2 ? 'font-semibold text-brand-bright-blue' : ''}>Facility Details</span>
            <span className={currentStep === 3 ? 'font-semibold text-brand-bright-blue' : ''}>Service Needs</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mb-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-neutral-charcoal dark:text-white">No Contracts Required</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-neutral-charcoal dark:text-white">Licensed & Insured</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-neutral-charcoal dark:text-white">24-Hour Response</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="rounded-xl border-2 border-neutral-light-grey bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        {/* Error Message */}
        {submitError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-400">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-deep-blue dark:text-brand-bright-blue mb-6">
                Your Information
              </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('fullName')}
                    id="fullName"
                    type="text"
                    className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('fullName').className}`}
                    placeholder="John Smith"
                  />
                  {getFieldState('fullName').isValid && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {getFieldState('fullName').hasError && (
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  )}
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('company')}
                    id="company"
                    type="text"
                    className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('company').className}`}
                    placeholder="ABC Corporation"
                  />
                  {getFieldState('company').isValid && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {getFieldState('company').hasError && (
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  )}
                </div>
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('email').className}`}
                    placeholder="john@company.com"
                  />
                  {getFieldState('email').isValid && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {getFieldState('email').hasError && (
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('phone')}
                    id="phone"
                    type="tel"
                    className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('phone').className}`}
                    placeholder={CONTACT_INFO.phone.formatted}
                  />
                  {getFieldState('phone').isValid && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {getFieldState('phone').hasError && (
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  )}
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                )}
              </div>
            </div>
            </div>
          )}

          {/* Step 2: Facility Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-deep-blue dark:text-brand-bright-blue mb-6">
                Facility Details
              </h3>

            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('address')}
                  id="address"
                  type="text"
                  className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('address').className}`}
                  placeholder="123 Main Street"
                />
                {getFieldState('address').isValid && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {getFieldState('address').hasError && (
                  <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                )}
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('city')}
                    id="city"
                    type="text"
                    className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('city').className}`}
                    placeholder="Springfield"
                  />
                  {getFieldState('city').isValid && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {getFieldState('city').hasError && (
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  )}
                </div>
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="zipCode" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('zipCode')}
                    id="zipCode"
                    type="text"
                    className={`w-full rounded-lg border-2 px-4 py-3 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors min-h-[48px] ${getFieldState('zipCode').className}`}
                    placeholder="01089"
                    maxLength={5}
                  />
                  {getFieldState('zipCode').isValid && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {getFieldState('zipCode').hasError && (
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                  )}
                </div>
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            {/* Facility Type - Card Selection */}
            <div className="col-span-full">
              <label className="mb-4 block text-sm font-medium text-neutral-charcoal dark:text-white">
                Facility Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {facilityTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = selectedFacilityType === type.value
                  return (
                    <label
                      key={type.value}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-bright-blue bg-brand-bright-blue/5 dark:bg-brand-bright-blue/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-brand-bright-blue/50 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <input
                        {...register('facilityType')}
                        type="radio"
                        value={type.value}
                        className="sr-only"
                      />
                      <Icon
                        className={`h-8 w-8 mb-2 ${
                          isSelected
                            ? 'text-brand-bright-blue'
                            : 'text-neutral-charcoal/60 dark:text-white/60'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium text-center ${
                          isSelected
                            ? 'text-brand-bright-blue'
                            : 'text-neutral-charcoal dark:text-white'
                        }`}
                      >
                        {type.label}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-brand-bright-blue" />
                      )}
                    </label>
                  )
                })}
              </div>
              {errors.facilityType && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.facilityType.message}
                </p>
              )}
            </div>

              <div>
                <label htmlFor="squareFootage" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Approximate Square Footage
                </label>
                <input
                  {...register('squareFootage', { valueAsNumber: true })}
                  id="squareFootage"
                  type="number"
                  className="w-full rounded-lg border-2 border-brand-deep-blue/20 px-4 py-3 focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none dark:border-white/20 dark:bg-slate-900 dark:text-white min-h-[48px]"
                  placeholder="5000"
                  min="1000"
                />
                <p className="mt-1 text-xs text-neutral-charcoal/60 dark:text-neutral-charcoal">Minimum: 1,000 sq ft</p>
                {errors.squareFootage && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.squareFootage.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Service Needs */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-deep-blue dark:text-brand-bright-blue mb-6">
                Service Needs
              </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="cleaningFrequency" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Desired Cleaning Frequency <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('cleaningFrequency')}
                    id="cleaningFrequency"
                    className={`w-full h-12 rounded-lg border-2 px-4 pr-10 focus:ring-2 dark:bg-slate-900 dark:text-white transition-colors ${getFieldState('cleaningFrequency').className}`}
                  >
                    <option value="">Select frequency...</option>
                    {frequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                  {getFieldState('cleaningFrequency').isValid && (
                    <Check className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 pointer-events-none" />
                  )}
                  {getFieldState('cleaningFrequency').hasError && (
                    <X className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500 pointer-events-none" />
                  )}
                </div>
                {errors.cleaningFrequency && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.cleaningFrequency.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="desiredStartDate" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  When do you need service?
                </label>
                <input
                  {...register('desiredStartDate')}
                  id="desiredStartDate"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg border-2 border-brand-deep-blue/20 px-4 py-3 focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none dark:border-white/20 dark:bg-slate-900 dark:text-white min-h-[48px]"
                />
              </div>
            </div>

          {/* Instant Estimate */}
          {estimate && (
            <div className="rounded-lg border-2 border-green-300 bg-green-50 p-6 dark:border-green-700 dark:bg-green-900/20">
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-700 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">
                  Estimated Monthly Investment
                </h3>
              </div>
              <p className="mb-2 text-3xl font-bold text-green-700 dark:text-green-400">
                ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
              </p>
              <p className="mb-4 text-sm text-neutral-charcoal/70 dark:text-white/70">
                *Final pricing based on on-site assessment
              </p>
              <ul className="space-y-1 text-sm text-neutral-charcoal/80 dark:text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  All cleaning supplies included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Licensed & insured staff
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Satisfaction guaranteed
                </li>
              </ul>
            </div>
          )}

          {/* Additional Information */}
          <div>
            <label htmlFor="specialRequests" className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
              Additional Information (Optional)
            </label>
            <textarea
              {...register('specialRequests')}
              id="specialRequests"
              rows={4}
              maxLength={500}
              className="w-full rounded-lg border-2 border-brand-deep-blue/20 px-4 py-3 focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] focus:outline-none dark:border-white/20 dark:bg-slate-900 dark:text-white min-h-[48px]"
              placeholder="Tell us about any special requirements, current challenges, or questions..."
            />
            <p className="mt-1 text-xs text-neutral-charcoal/60 dark:text-neutral-charcoal">
              {watch('specialRequests')?.length || 0}/500 characters
            </p>
          </div>

          {/* Consent */}
          <div className="flex items-start gap-3 rounded-lg border-2 border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-slate-900">
            <input
              {...register('consent')}
              type="checkbox"
              id="consent"
              className="mt-1 h-6 w-6 rounded border-2 border-brand-deep-blue text-brand-bright-blue focus:ring-brand-bright-blue focus:ring-2 cursor-pointer"
            />
            <label htmlFor="consent" className="flex-1 text-sm text-neutral-charcoal/80 dark:text-white/80 cursor-pointer">
              I agree to be contacted by Anderson Cleaning Company regarding this quote request. We respond
              within 24 hours during office hours ({CONTACT_INFO.hours.office}).{' '}
              <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.consent.message}</p>
          )}

            </div>
          )}

          {/* Honeypot */}
          <input
            {...register('website')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px]"
            aria-hidden="true"
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                variant="accent"
                onClick={handleNext}
                className="flex items-center gap-2 ml-auto"
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="ml-auto h-12 px-8 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Quote Request'
                )}
              </Button>
            )}
          </div>

          {currentStep === totalSteps && (
            <div className="space-y-4 mt-4">
              <div className="text-center text-sm text-neutral-charcoal/70 dark:text-white/70">
                <p>✓ No contracts required · ✓ Response within 24 hours · ✓ No spam</p>
              </div>
              <FormLegalNotice className="text-center" />
            </div>
          )}
        </form>
      </div>

      {/* Bottom Contact */}
      <div className="mt-8 text-center">
        <p className="mb-2 text-neutral-charcoal/70 dark:text-white/80">
          Questions? Call us directly at{' '}
          <a
            href={CONTACT_INFO.phone.href}
            className="font-semibold text-brand-bright-blue hover:underline"
          >
            {CONTACT_INFO.phone.formatted}
          </a>
        </p>
        <p className="text-sm text-neutral-charcoal/60 dark:text-neutral-charcoal">{CONTACT_INFO.hours.office}</p>
      </div>
    </div>
  )
}
