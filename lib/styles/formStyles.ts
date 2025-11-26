/**
 * Unified Form Input Styles
 * Consistent styling across all form inputs, selects, and textareas
 *
 * Specs:
 * - Input height: 48px minimum
 * - Input text: 16px #333333
 * - Placeholder: #999999
 * - Focus: 2px border #0077D9, white bg, shadow 0 0 0 4px rgba(0,119,217,0.1)
 */

export const formInputStyles = {
  base: 'w-full px-4 py-3 min-h-[48px] text-[16px] border rounded-lg transition-all duration-150',
  colors: 'bg-white dark:bg-brand-deep-blue text-[#333333] dark:text-white',
  border: 'border-brand-deep-blue dark:border-white',
  focus: 'focus:border-2 focus:border-brand-bright-blue focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,119,217,0.1)] focus:outline-none',
  placeholder: 'placeholder:text-[#999999] dark:placeholder:text-white/50',
}

/**
 * Complete input className string
 */
export const inputClassName = `${formInputStyles.base} ${formInputStyles.colors} ${formInputStyles.border} ${formInputStyles.focus} ${formInputStyles.placeholder}`

/**
 * Label styles
 * Specs: 14px medium #333333, 12px spacing to input (mb-3 = 12px)
 */
export const labelClassName = 'block text-[14px] font-medium text-[#333333] dark:text-white/80 mb-3'

/**
 * Error message styles
 */
export const errorClassName = 'mt-1 text-sm text-red-600 dark:text-red-400'
