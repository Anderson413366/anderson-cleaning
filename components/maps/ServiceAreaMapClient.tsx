'use client'

import dynamic from 'next/dynamic'

const ServiceAreaMap = dynamic(() => import('@/components/maps/ServiceAreaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl bg-neutral-light-grey dark:bg-slate-800 flex items-center justify-center">
      <p className="text-neutral-charcoal/70 dark:text-white/70">Loading map...</p>
    </div>
  ),
})

export default function ServiceAreaMapClient() {
  return <ServiceAreaMap />
}
