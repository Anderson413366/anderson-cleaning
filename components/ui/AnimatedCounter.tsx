'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string // e.g., "4,200+" or "18,000+"
  label: string
  icon?: React.ReactNode
  duration?: number // Animation duration in milliseconds
}

export default function AnimatedCounter({
  value,
  label,
  icon,
  duration = 2000
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only animate once when component comes into view
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true)
          animateCounter()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounter = () => {
    // Extract the numeric value (e.g., "4,200+" -> 4200)
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const hasSuffix = value.includes('+') || value.includes('K') || value.includes('M')
    const suffix = hasSuffix ? value.match(/[+KM]/)?.[0] || '' : ''

    // Animation steps
    const steps = 60
    const increment = numericValue / steps
    const stepDuration = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const currentValue = Math.floor(increment * currentStep)

      // Format with commas
      const formattedValue = currentValue.toLocaleString()
      setDisplayValue(formattedValue + suffix)

      if (currentStep >= steps) {
        // Ensure final value matches exactly
        const finalFormatted = numericValue.toLocaleString()
        setDisplayValue(finalFormatted + suffix)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }

  return (
    <div
      ref={counterRef}
      className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px]"
    >
      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20">
          {icon}
        </div>
      )}

      {/* Counter */}
      <div className="text-4xl md:text-5xl font-extrabold text-white tabular-nums">
        {displayValue}
      </div>

      {/* Label */}
      <div className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-wide text-center">
        {label}
      </div>
    </div>
  )
}
