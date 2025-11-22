'use client'

import React from 'react'
import { FormRadioGroupProps } from '@/lib/careers/types'
import { AppContext } from '@/lib/careers/AppContext'

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  error,
  isRequired,
}) => {
  const context = React.useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-1">
        {label}
        {isRequired && (
          <span className="text-red-500 ml-1">{t('requiredFieldIndicator') as string}</span>
        )}
      </label>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 text-primary dark:text-blue-500 bg-neutral-light-grey dark:bg-slate-700 border-gray-300 dark:border-slate-600 focus:ring-primary dark:focus:ring-blue-600"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-neutral-charcoal dark:text-white"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
}

export default FormRadioGroup
