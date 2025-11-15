module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/services',
        'http://localhost:3000/apply',
      ],
      numberOfRuns: 3,
      settings: {
        // Use mobile preset for stricter performance budgets
        preset: 'mobile',
        // Simulated mobile throttling
        throttling: {
          rttMs: 150, // 4G latency
          throughputKbps: 1638, // 4G download speed
          cpuSlowdownMultiplier: 4, // Simulated mobile CPU
        },
        // Form factor
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false,
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // ===== PERFORMANCE BUDGETS (MOBILE) =====
        'categories:performance': ['error', { minScore: 0.9 }], // >= 90

        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // LCP <= 2.5s
        'total-blocking-time': ['error', { maxNumericValue: 150 }], // TBT <= 150ms
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }], // CLS <= 0.1

        // Other Performance Metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }], // FCP <= 1.8s
        'speed-index': ['warn', { maxNumericValue: 3400 }], // SI <= 3.4s
        'interactive': ['warn', { maxNumericValue: 3800 }], // TTI <= 3.8s

        // Resource Budgets
        'total-byte-weight': ['warn', { maxNumericValue: 3000000 }], // Total <= 3MB
        'dom-size': ['warn', { maxNumericValue: 1500 }], // DOM nodes <= 1500

        // JavaScript Budgets
        'bootup-time': ['warn', { maxNumericValue: 3000 }], // JS execution <= 3s
        'mainthread-work-breakdown': ['warn', { maxNumericValue: 4000 }], // Main thread work <= 4s

        // ===== ACCESSIBILITY =====
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'color-contrast': 'error',
        'image-alt': 'error',
        'button-name': 'error',
        'link-name': 'error',
        'label': 'error',
        'aria-required-attr': 'error',
        'aria-valid-attr': 'error',
        'heading-order': 'warn',

        // ===== BEST PRACTICES =====
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'errors-in-console': 'warn',
        'uses-http2': 'warn',
        'uses-passive-event-listeners': 'warn',
        'no-vulnerable-libraries': 'warn',
        'image-aspect-ratio': 'warn',
        'image-size-responsive': 'warn',

        // ===== SEO =====
        'categories:seo': ['error', { minScore: 0.9 }],
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'canonical': 'warn',
        'robots-txt': 'warn',
        'hreflang': 'warn',

        // ===== PWA =====
        'viewport': 'error',
        'themed-omnibox': 'warn',
        'maskable-icon': 'off', // Optional for now

        // ===== SECURITY =====
        'csp-xss': 'off', // We have custom CSP implementation
        'uses-https': 'error',

        // ===== NETWORK =====
        'uses-long-cache-ttl': 'warn',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',
        'uses-text-compression': 'warn',
        'uses-rel-preconnect': 'warn',
        'font-display': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
