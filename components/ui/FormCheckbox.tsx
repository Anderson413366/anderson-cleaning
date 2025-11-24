'use client'

import React, { forwardRef } from 'react'
import { FormCheckboxProps } from '@/lib/careers/types'

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, name, className, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={ref}
            className={`h-4 w-4 text-brand-deep-blue dark:text-brand-bright-blue bg-neutral-light-grey dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded focus:ring-brand-deep-blue dark:focus:ring-brand-bright-blue ${className || ''}`}
            {...props}
          />
          <label htmlFor={name} className="ml-2 block text-sm text-neutral-charcoal dark:text-white">
            {label}
          </label>
        </div>
        {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)
FormCheckbox.displayName = 'FormCheckbox'

export default FormCheckbox
