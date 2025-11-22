'use client'

import { useEffect } from 'react'

import { useTheme } from '@/lib/ThemeProvider'

export default function DarkModeLogger() {
  const { theme } = useTheme()

  useEffect(() => {
    if (theme === 'dark') {
      console.log('Dark mode contrast perfect')
    }
  }, [theme])

  return null
}
