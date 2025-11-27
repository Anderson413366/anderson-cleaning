'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { contactFormSchema, type ContactFormData } from '@/lib/validation/quote'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import FormLegalNotice from './FormLegalNotice'

interface ContactFormProps {
  onSuccess?: () => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')

      // Check honeypot field (client-side check)
      if (data.website) {
        throw new Error('Invalid submission detected')
      }

      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message')
      }

      // Track with Google Analytics dataLayer
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: 'form_submission',
          form_name: 'contact_form',
          form_type: 'simple',
        })
      }

      // Success!
      setSubmitStatus('success')
      reset()
      onSuccess?.()

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Contact submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-lg shadow-sm p-8 pb-12 lg:pb-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <h2 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-2">
            Send Us a Message
          </h2>
          <p className="text-neutral-charcoal/70 dark:text-white/80">
            Fill out the form below and we'll get back to you within 1 business day.
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="rounded-lg bg-brand-bright-blue/10 border border-brand-bright-blue/30 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-brand-deep-blue mb-1">
                Message Sent Successfully!
              </h4>
              <p className="text-sm text-brand-deep-blue/80">
                Thank you for contacting us. We'll respond to your message within 1 business day.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">
                Submission Error
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                There was an error sending your message. Please try again or call us at (413)
                306-5053.
              </p>
            </div>
          </div>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2">
            Name <span className="text-brand-red">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="John Smith"
          />
          {errors.name && <p className="mt-2 text-sm text-brand-red">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2">
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-2 text-sm text-brand-red">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2">
            Phone Number <span className="text-brand-red">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            autoComplete="tel"
            className="w-full h-[48px] px-4 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="(413) 306-5053"
          />
          {errors.phone && <p className="mt-2 text-sm text-brand-red">{errors.phone.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-[14px] font-medium text-[#333333] dark:text-white/90 mb-2">
            Message <span className="text-brand-red">*</span>
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            maxLength={1000}
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 text-neutral-charcoal dark:text-white border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-slate-400 focus:outline-none focus:border-[2px] focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.15)] transition-all"
            placeholder="Tell us about your cleaning needs, questions, or concerns..."
          />
          {errors.message && <p className="mt-2 text-sm text-brand-red">{errors.message.message}</p>}
        </div>

        {/* Honeypot field - spam prevention (hidden from all users and bots should fill it) */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website" className="block text-sm font-medium">
            Website
          </label>
          <input
            {...register('website')}
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </>
          )}
        </Button>

        <FormLegalNotice className="text-center" />
      </form>
    </div>
  )
}
