'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * Breadcrumb navigation component
 *
 * Features:
 * - Automatic breadcrumb generation from URL path
 * - SEO-friendly with structured data (BreadcrumbList schema)
 * - Accessible with aria-label and proper semantic HTML
 * - Responsive design
 * - Smart labeling for common pages
 *
 * Styling per requirements:
 * - 12px font size
 * - Links: #0077D9 (brand-bright-blue)
 * - Separators: #666666
 * - Current page: #333333 (non-clickable)
 *
 * @example
 * <Breadcrumbs />
 */
export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (!pathname || pathname === '/') {
    return null
  }

  const breadcrumbs = generateBreadcrumbs(pathname)

  // Don't render if only home breadcrumb (should never happen due to check above)
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 px-4 lg:px-0">
      <ol
        className="flex flex-wrap items-center gap-2 text-xs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li
              key={crumb.href || crumb.label}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {crumb.href && !isLast ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-brand-bright-blue hover:underline transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                  <meta itemProp="position" content={String(index + 1)} />
                  {!isLast && (
                    <ChevronRight
                      className="h-3 w-3 text-[#666666]"
                      aria-hidden="true"
                    />
                  )}
                </>
              ) : (
                <>
                  <span
                    className={isLast ? 'text-[#333333] dark:text-white' : 'text-brand-bright-blue'}
                    itemProp={isLast ? 'name' : 'item'}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.label}
                  </span>
                  <meta itemProp="position" content={String(index + 1)} />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  // Remove leading/trailing slashes and split
  const pathSegments = pathname.replace(/^\/|\/$/g, '').split('/')

  // Build breadcrumbs progressively
  let currentPath = ''

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1

    // Format label
    const label = formatBreadcrumbLabel(segment, pathSegments, index)

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath
    })
  })

  return breadcrumbs
}

/**
 * Format breadcrumb labels from URL segments
 */
function formatBreadcrumbLabel(
  segment: string,
  allSegments: string[],
  index: number
): string {
  // Handle special cases
  const specialLabels: Record<string, string> = {
    'services': 'Services',
    'industries': 'Industries',
    'locations': 'Service Areas',
    'blog': 'Blog',
    'about': 'About Us',
    'contact': 'Contact Us',
    'quote': 'Request a Quote',
    'faq': 'FAQ',
    'careers': 'Careers',
    'testimonials': 'Testimonials',
    'case-studies': 'Case Studies',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
    'promotions': 'Special Offers',
    'supply-management': 'Supply Management',
  }

  if (specialLabels[segment]) {
    return specialLabels[segment]
  }

  // For dynamic segments (service names, locations, etc.)
  // Convert "office-cleaning" → "Office Cleaning"
  // Convert "springfield-ma" → "Springfield, MA"

  // Handle location slugs with state abbreviations
  if (allSegments[index - 1] === 'locations' && segment.includes('-')) {
    return formatLocationLabel(segment)
  }

  // Default: capitalize each word
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format location labels
 * Example: "springfield-ma" → "Springfield, MA"
 */
function formatLocationLabel(slug: string): string {
  const parts = slug.split('-')

  // Check if last part is a state abbreviation (2 letters)
  const lastPart = parts[parts.length - 1]
  if (lastPart && lastPart.length === 2) {
    // State abbreviation - separate with comma
    const cityParts = parts.slice(0, -1)
    const city = cityParts
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    return `${city}, ${lastPart.toUpperCase()}`
  }

  // Default formatting
  return parts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
