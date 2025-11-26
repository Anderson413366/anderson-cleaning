'use client'

import React, { forwardRef } from 'react'
import { FormInputProps } from '@/lib/careers/types'
import { AppContext } from '@/lib/careers/AppContext' // Assuming AppContext is in App.tsx

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, className, error, type = 'text', isRequired, ...props }, ref) => {
    const context = React.useContext(AppContext)
    if (!context) throw new Error('AppContext not found')
    const { t } = context

    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1"
        >
          {label}
          {isRequired && (
            <span className="text-brand-red ml-1">{t('requiredFieldIndicator') as string}</span>
          )}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          ref={ref}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border-2 border-brand-deep-blue/20 dark:border-white/20 rounded-md shadow-sm placeholder-neutral-charcoal/50 dark:placeholder-white/50
                      focus:outline-none focus:border-brand-bright-blue focus:shadow-[0_0_0_3px_rgba(0,119,217,0.2)] sm:text-sm transition-all
                      ${error ? 'border-brand-red dark:border-brand-red' : ''} ${className || ''}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
      </div>
    )
  }
)
FormInput.displayName = 'FormInput'

export default FormInput
