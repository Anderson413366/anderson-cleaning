/**
 * Unified Form Input Styles
 * Consistent styling across all form inputs, selects, and textareas
 */

export const formInputStyles = {
  base: 'w-full px-4 py-3 text-base border rounded-lg transition-all duration-150',
  colors: 'bg-white dark:bg-brand-deep-blue text-neutral-charcoal dark:text-white',
  border: 'border-brand-deep-blue dark:border-white',
  focus: 'focus:ring-2 focus:ring-brand-bright-blue focus:border-brand-bright-blue focus:outline-none',
  placeholder: 'placeholder:text-neutral-charcoal/50 dark:placeholder:text-white/50',
}

/**
 * Complete input className string
 */
export const inputClassName = `${formInputStyles.base} ${formInputStyles.colors} ${formInputStyles.border} ${formInputStyles.focus} ${formInputStyles.placeholder}`

/**
 * Label styles
 */
export const labelClassName = 'block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-2'

/**
 * Error message styles
 */
export const errorClassName = 'mt-1 text-sm text-red-600 dark:text-red-400'
