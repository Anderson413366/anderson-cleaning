'use client'

/**
 * Sanity Studio
 *
 * Content management interface for Anderson Cleaning Company
 * Access at: /studio
 *
 * NOTE: This route should be protected with authentication in production
 *
 * The studio is dynamically imported to avoid loading the large Sanity bundle
 * (~1.3MB) on every page. It's only loaded when visiting /studio.
 */

import dynamic from 'next/dynamic'

// Dynamically import the studio to keep it out of the main bundle
const Studio = dynamic(
  () => import('./Studio'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-bright-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-charcoal/70">Loading Sanity Studio...</p>
        </div>
      </div>
    ),
  }
)

export default function StudioPage() {
  return <Studio />
}
