import type { Config } from 'tailwindcss'
import tailwindForms from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0A2342',
        'brand-emerald': '#00A57E',
        'neutral-off-white': '#F7F7F7',
        'neutral-light-grey': '#EDEDED',
        'neutral-charcoal': '#1A1A1A',
        primary: {
          DEFAULT: '#0A2342',
          50: '#E6EBF2',
          100: '#CDD7E5',
          200: '#9BAECB',
          300: '#6986B1',
          400: '#375D97',
          500: '#0A2342',
          600: '#081C35',
          700: '#061528',
          800: '#040E1A',
          900: '#02070D',
        },
        accent: {
          DEFAULT: '#00A57E',
          50: '#E6F7F3',
          100: '#CCEFE7',
          200: '#99DFCF',
          300: '#66CFB7',
          400: '#33BF9F',
          500: '#00A57E',
          600: '#008465',
          700: '#00634C',
          800: '#004232',
          900: '#002119',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['40px', { lineHeight: '1.3', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        button: ['18px', { lineHeight: '1.3', fontWeight: '500' }],
        'button-sm': ['16px', { lineHeight: '1.3', fontWeight: '500' }],
      },
      spacing: {
        // Consistent spacing scale for OCD-friendly layouts
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      borderRadius: {
        // Consistent border radius
        DEFAULT: '0.5rem', // 8px
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
      boxShadow: {
        // Elevation system
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      animation: {
        // Respect prefers-reduced-motion
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        // Consistent transition timings
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [tailwindForms, tailwindTypography],
}
export default config
