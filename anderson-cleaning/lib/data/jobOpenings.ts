/**
 * Job Openings Data
 * Configure open positions here for /apply page
 */

import { JobPostingData } from '@/components/seo/JobPosting'

export const jobOpenings: JobPostingData[] = [
  // Add job postings here when positions are open
  // Example: See component README for structure
]

export function hasActiveJobs(): boolean {
  return jobOpenings.length > 0
}

export function getActiveJobs(): JobPostingData[] {
  const today = new Date().toISOString().split('T')[0]
  return jobOpenings.filter((job) => !job.validThrough || job.validThrough >= today)
}
