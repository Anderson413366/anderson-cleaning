/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode for better development experience
  reactStrictMode: true,

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
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
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

  // Headers for security and caching
  async headers() {
    return [
      {
        // Security headers for all pages
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Strong HSTS policy: 2 years, includeSubDomains, preload
          // Backup for middleware (some edge cases may not go through middleware)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
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

  // Webpack configuration - optimized chunk splitting for better caching and smaller initial load
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,

            // React core - small, critical, cached long-term
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              chunks: 'all',
              priority: 40,
              enforce: true,
            },

            // Sanity CMS - large, only needed for /studio route
            sanity: {
              name: 'sanity',
              test: /[\\/]node_modules[\\/](@sanity|sanity|@portabletext)[\\/]/,
              chunks: 'all',
              priority: 35,
              enforce: true,
            },

            // Sentry - loaded lazily, separate chunk
            sentry: {
              name: 'sentry',
              test: /[\\/]node_modules[\\/](@sentry|@opentelemetry)[\\/]/,
              chunks: 'all',
              priority: 35,
              enforce: true,
            },

            // Map libraries - only loaded on pages with maps
            maps: {
              name: 'maps',
              test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },

            // Form libraries - common across many pages
            forms: {
              name: 'forms',
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              chunks: 'all',
              priority: 25,
            },

            // UI utilities - icons, etc.
            ui: {
              name: 'ui',
              test: /[\\/]node_modules[\\/](lucide-react|clsx|tailwind-merge)[\\/]/,
              chunks: 'all',
              priority: 25,
            },

            // All other vendor code
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10,
            },

            // Common app code shared across pages
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
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
      '@sanity/client',      // Sanity client
      'date-fns',            // Date utilities (if used)
    ],
  },
}

module.exports = nextConfig
