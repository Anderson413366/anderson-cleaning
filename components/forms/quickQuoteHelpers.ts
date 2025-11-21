export const FACILITY_TYPES = [
  { value: '', label: 'Select facility type...' },
  { value: 'office', label: 'Office Building' },
  { value: 'medical', label: 'Medical Office/Clinic' },
  { value: 'educational', label: 'Educational Facility' },
  { value: 'retail', label: 'Retail Store' },
  { value: 'manufacturing', label: 'Manufacturing/Warehouse' },
  { value: 'warehouse', label: 'Warehouse/Distribution' },
  { value: 'other', label: 'Other' },
]

export const ERROR_MESSAGES = {
  name: 'Please enter your full name (at least 2 characters)',
  email: 'Please enter a valid business email address',
  phone: 'Please enter a valid phone number',
  facilityType: 'Please select your facility type',
  company: 'Please enter your company name',
}

export const RESPONSE_TIME_TEXT = '✓ We respond in 30 minutes or less'

export const formatPhoneNumber = (value: string): string => {
  const phoneNumber = value.replace(/\D/g, '')

  if (phoneNumber.length <= 3) {
    return phoneNumber
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneDigits = phone.replace(/\D/g, '')
  return phoneDigits.length === 10
}

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2
}
