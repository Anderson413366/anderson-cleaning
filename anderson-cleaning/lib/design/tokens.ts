/**
 * Design Tokens
 *
 * Centralized design system tokens exported from Tailwind config
 * for use in JavaScript/TypeScript code (animations, dynamic styling, etc.)
 */

export const colors = {
  primary: {
    DEFAULT: '#1D4ED8',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  accent: {
    DEFAULT: '#10B981',
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
} as const

export const spacing = {
  4: '1rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const

export const container = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
} as const

export const tokens = {
  colors,
  spacing,
  breakpoints,
  container,
} as const

export default tokens
