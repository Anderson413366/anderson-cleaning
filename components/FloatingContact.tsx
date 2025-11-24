'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, FileText, MessageCircle, X } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

const CONTACT_LINKS = [
  {
    href: CONTACT_INFO.phone.href,
    label: CONTACT_INFO.phone.formatted,
    icon: Phone,
    ariaLabel: 'Call Anderson Cleaning Company',
  },
  {
    href: 'mailto:info@andersoncleaning.com',
    label: 'info@andersoncleaning.com',
    icon: Mail,
    ariaLabel: 'Email Anderson Cleaning Company',
  },
  {
    href: '/quote',
    label: 'Request Quote',
    icon: FileText,
    ariaLabel: 'Request a cleaning quote',
  },
] as const

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-40 hidden lg:block">
      {isOpen && (
        <div className="mb-4 w-72 rounded-2xl bg-white p-4 text-neutral-charcoal shadow-xl dark:bg-slate-900 dark:text-white">
          <h3 className="mb-3 text-lg font-semibold">Contact Us</h3>
          <div className="space-y-3">
            {CONTACT_LINKS.map(({ href, label, icon: Icon, ariaLabel }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-sm text-neutral-charcoal transition hover:text-brand-bright-blue dark:text-white dark:hover:text-brand-bright-blue/90"
                aria-label={ariaLabel}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="border-t pt-3 text-xs text-neutral-charcoal/70 dark:text-white/70">
              <p>24/7 Emergency Service Available</p>
              <p className="mt-1">Response within 2 hours</p>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-brand-bright-blue p-4 text-white shadow-lg transition hover:bg-[#006bc4]"
        aria-label="Toggle contact options"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  )
}
