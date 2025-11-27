/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode for better development experience
  reactStrictMode: true,

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

  // Compiler optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // Compression
  compress: true,

  // Production source maps for better debugging and Lighthouse compliance
  // Safe for client-side code (already visible in browser)
  productionBrowserSourceMaps: true,

  // Performance optimizations
  poweredByHeader: false,
  generateEtags: true,

  // Production URL (for absolute URLs in metadata)
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || 'development',
  },

  // Headers for caching (security headers handled by middleware.ts)
  async headers() {
    return [
      {
        // Cache static assets - 1 year (safe for versioned/hashed files)
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images - 1 year (content rarely changes, URLs can be versioned)
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache Next.js hashed static files - 1 year (safe because hashed)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts - 1 year (fonts rarely change)
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache brand assets - 1 year (logos, icons rarely change)
        source: '/brand/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache certification logos - 1 year
        source: '/certifications/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // URL redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/apply',
        destination: '/careers',
        permanent: true,
      },
      // Blog migration redirects from hub.andersoncleaning.com
      {
        source: '/:slug(office-cleaning-checklist-flu-season|benefits-green-cleaning-workplace|commercial-cleaning-frequency-guide|medical-facility-cleaning-standards|choosing-commercial-cleaning-company|floor-care-maintenance-tips)',
        destination: 'https://andersoncleaning.com/blog/:slug',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'hub.andersoncleaning.com',
          },
        ],
      },
      {
        source: '/',
        destination: 'https://andersoncleaning.com/blog',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'hub.andersoncleaning.com',
          },
        ],
      },
    ]
  },

  // URL rewrites
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },

  // Webpack configuration - use Next.js defaults with deterministic module IDs
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      }
    }
    return config
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    // Tree-shake these packages to only include used exports
    // Note: Modern browser targeting via "browserslist" in package.json
    optimizePackageImports: [
      'lucide-react',        // Only import used icons
      'react-hook-form',     // Form utilities
      'zod',                 // Schema validation
      'date-fns',            // Date utilities (if used)
    ],
  },
}

module.exports = nextConfig
