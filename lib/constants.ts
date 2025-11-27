/**
 * Global Contact Information Constants
 *
 * Use these constants anywhere contact information is needed
 * to ensure consistency across the site.
 */

export const CONTACT_INFO = {
  phone: {
    formatted: '(413) 306-5053',
    unformatted: '4133065053',
    href: 'tel:+14133065053',
    international: '+1 413 306 5053',
  },
  email: {
    general: 'info@andersoncleaning.com',
    support: 'support@andersoncleaning.com',
    href: 'mailto:info@andersoncleaning.com',
  },
  address: {
    street: '103 Wayside Avenue',
    city: 'West Springfield',
    state: 'MA',
    zip: '01089',
    full: '103 Wayside Avenue, West Springfield, MA 01089',
  },
  hours: {
    office: 'Monday - Friday, 9 AM - 5 PM EST',
    emergency: '24/7 emergency support for current clients',
  },
} as const

export const COMPANY_INFO = {
  name: 'Anderson Cleaning Company',
  legalName: 'Anderson Cleaning Company',
  tagline: 'Commercial Cleaning Excellence Since 2007',
  founded: 2007,
  serviceRadius: {
    miles: 60,
    center: 'West Springfield, MA',
    zipCode: '01089',
  },
} as const

export const YEARS_IN_BUSINESS = new Date().getFullYear() - COMPANY_INFO.founded
