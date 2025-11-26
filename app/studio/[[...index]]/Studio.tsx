'use client'

/**
 * Sanity Studio Component
 *
 * This component is dynamically imported to keep the large Sanity bundle
 * out of the main application bundle. Only loaded when visiting /studio.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function Studio() {
  return <NextStudio config={config} />
}
