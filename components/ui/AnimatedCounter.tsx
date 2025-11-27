'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string // e.g., "4,200+" or "18,000+"
  label: string
  icon?: React.ReactNode
}

export default function AnimatedCounter({
  value,
  label,
  icon,
}: AnimatedCounterProps) {
  // Initialize with actual value to avoid "0" flash on initial render/SSR
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger subtle animation only once when component comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={counterRef}
      className={`flex flex-col items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 min-w-[180px] transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
      }`}
    >
      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20">
          {icon}
        </div>
      )}

      {/* Counter - Always shows actual value, never "0" */}
      <div className="text-4xl md:text-5xl font-extrabold text-white tabular-nums">
        {value}
      </div>

      {/* Label */}
      <div className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-wide text-center">
        {label}
      </div>
    </div>
  )
}
