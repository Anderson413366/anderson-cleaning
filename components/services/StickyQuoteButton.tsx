'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export default function StickyQuoteButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 max-w-xs rounded-2xl border border-brand-deep-blue/10 bg-white/95 p-4 shadow-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-900/95 ${
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <p className="text-sm font-semibold text-neutral-charcoal dark:text-white">Need help fast?</p>
      <p className="text-sm text-neutral-charcoal/70 dark:text-white/70">Request a quote within 24 hours.</p>
      <div className="mt-3 flex flex-col gap-2">
        <Link href="/quote">
          <Button size="sm" className="w-full justify-center">
            Request Quote
          </Button>
        </Link>
        <a
          href="tel:+14133065053"
          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-light-grey px-3 py-2 text-sm font-semibold text-brand-deep-blue transition hover:bg-neutral-off-white dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
        >
          <Phone className="h-4 w-4" /> (413) 306-5053
        </a>
      </div>
      <p className="mt-2 text-xs text-neutral-charcoal/60 dark:text-white/60">Serving Western MA &amp; Northern CT</p>
    </div>
  )
}
