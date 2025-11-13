'use client'

/**
 * Web Vitals Reporter Component
 *
 * Tracks and reports Core Web Vitals metrics to analytics services.
 * Uses the web-vitals library to measure real user performance.
 */

import { useEffect } from 'react'
import { reportWebVitals, initPerformanceMonitoring, observeLongTasks } from '@/lib/utils/analytics'

export default function WebVitalsReporter() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Initialize performance monitoring
    initPerformanceMonitoring()

    // Observe long tasks
    observeLongTasks()

    // Dynamically import web-vitals library
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      // Report Core Web Vitals
      onCLS(reportWebVitals)
      onFID(reportWebVitals)
      onFCP(reportWebVitals)
      onLCP(reportWebVitals)
      onTTFB(reportWebVitals)
      onINP(reportWebVitals)
    })
  }, [])

  // This component doesn't render anything
  return null
}
