/**
 * Sanity Image Utilities
 *
 * Provides image URL builder and Next.js Image loader
 * for optimized image delivery via Sanity CDN
 */

import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client, sanityConfig } from './sanity.client'

// Initialize the image URL builder
const builder = imageUrlBuilder(client)

/**
 * Generate optimized image URLs from Sanity image sources
 *
 * @example
 * ```tsx
 * const imageUrl = urlFor(post.featuredImage)
 *   .width(800)
 *   .height(600)
 *   .fit('crop')
 *   .url()
 * ```
 */
export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source)
}

/**
 * Next.js Image Loader for Sanity CDN
 *
 * Automatically optimizes images with proper width and quality
 *
 * @example
 * ```tsx
 * <Image
 *   src={post.featuredImage}
 *   loader={sanityLoader}
 *   width={800}
 *   height={600}
 *   alt="Featured image"
 * />
 * ```
 */
export function sanityLoader({
  src,
  width,
  quality,
}: {
  src: SanityImageSource | string
  width: number
  quality?: number
}): string {
  // If src is already a full URL, return it
  if (typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'))) {
    return src
  }

  // Build optimized URL
  return urlFor(src).width(width).quality(quality || 85).auto('format').url()
}

/**
 * Get responsive image srcset for Sanity images
 *
 * @example
 * ```tsx
 * const srcset = getImageSrcSet(image, [400, 800, 1200])
 * ```
 */
export function getImageSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600]
): string {
  return widths
    .map((width) => {
      const url = urlFor(source).width(width).auto('format').url()
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Get image dimensions from Sanity image metadata
 */
export function getImageDimensions(source: any) {
  if (!source?.asset?._ref) {
    return { width: 0, height: 0, aspectRatio: 0 }
  }

  // Parse dimensions from Sanity asset reference
  // Format: image-<id>-<width>x<height>-<format>
  const ref = source.asset._ref
  const dimensions = ref.split('-')[2]

  if (!dimensions) {
    return { width: 0, height: 0, aspectRatio: 0 }
  }

  const [width, height] = dimensions.split('x').map(Number)
  const aspectRatio = width / height

  return { width, height, aspectRatio }
}

/**
 * Get blur data URL for placeholder
 *
 * Uses Sanity's automatic blur hash generation
 */
export function getImageBlurDataURL(source: SanityImageSource): string {
  return urlFor(source).width(20).blur(50).quality(30).url()
}

// Export sanity config for use in next.config.js
export { sanityConfig }
