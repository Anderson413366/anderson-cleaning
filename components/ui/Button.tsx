'use client'

import React, { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import type { ButtonProps } from './button.types'

const Button = forwardRef<HTMLButtonElement | HTMLDivElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    // Base styles with 10px border-radius and proper focus states
    const baseStyles =
      'inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background dark:ring-offset-slate-900'

    let variantStyles = ''
    switch (variant) {
      case 'outline':
      case 'secondary':
        // SECONDARY BUTTON (Outline) - 2px solid bright blue border
        variantStyles =
          'border-2 border-brand-bright-blue bg-transparent text-brand-bright-blue hover:bg-[rgba(0,119,217,0.08)] active:bg-[rgba(0,119,217,0.12)] dark:border-white dark:text-white dark:hover:bg-white/10'
        break
      case 'ghost':
      case 'tertiary':
        // TERTIARY BUTTON (Ghost/Text link) - No border, color text
        variantStyles =
          'border-none bg-transparent text-brand-deep-blue hover:text-brand-bright-blue dark:text-white dark:hover:text-brand-bright-blue'
        break
      case 'link':
        variantStyles =
          'underline-offset-4 hover:underline text-brand-bright-blue dark:text-brand-bright-blue'
        break
      case 'destructive':
        variantStyles = 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-700 dark:hover:bg-red-800'
        break
      case 'primary':
      case 'accent':
      default:
        // PRIMARY BUTTON - Bright blue background, white text
        variantStyles =
          'bg-brand-bright-blue text-white hover:bg-[#006bc4] active:bg-[#005aa3] dark:bg-brand-bright-blue dark:hover:bg-[#006bc4] dark:active:bg-[#005aa3]'
    }

    let sizeStyles = ''
    switch (size) {
      case 'sm':
        // Small/tertiary buttons: 48px on mobile, 40px on desktop (md+) for touch targets
        sizeStyles = 'h-12 md:h-10 px-6 text-sm'
        break
      case 'lg':
        // Large buttons: standardized to 48px for consistency, 24px L/R padding
        sizeStyles = 'h-12 px-6 text-base font-semibold'
        break
      case 'icon':
        // Icon buttons: 48px minimum for mobile touch targets
        sizeStyles = 'h-12 w-12'
        break
      default: // 'default' size - standard button size (primary/secondary)
        // Standardized: 48px height, 24px L/R padding
        sizeStyles = 'h-12 px-6 text-base font-medium'
    }

    const finalClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className || ''}`

    if (asChild) {
      // When asChild is true, render as div
      // Extract only div-compatible props
      const {
        disabled,
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        name,
        type,
        value,
        onToggle,
        ...divCompatibleProps
      } = props

      return (
        <div
          className={finalClassName}
          ref={ref as React.Ref<HTMLDivElement>}
          {...(divCompatibleProps as React.HTMLAttributes<HTMLDivElement>)}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </div>
      )
    } else {
      // When asChild is false, render as button
      return (
        <button
          className={finalClassName}
          ref={ref as React.Ref<HTMLButtonElement>}
          {...props}
          disabled={props.disabled || isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </button>
      )
    }
  }
)
Button.displayName = 'Button'

export { Button }
