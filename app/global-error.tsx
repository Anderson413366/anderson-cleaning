'use client'

import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw, Home, Phone, Mail } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-off-white dark:bg-slate-900">
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-8">
              <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Critical Error
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-lg mx-auto">
              We're sorry, but something went seriously wrong. Our team has been notified.
            </p>

            {error.digest && (
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-8">
                Error ID: {error.digest}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <RefreshCw className="h-5 w-5" aria-hidden="true" />
                Try Again
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:border-blue-500 transition-colors"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                Back to Home
              </a>
            </div>

            {/* Contact Options */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-xl p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">
                Need Immediate Assistance?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+14133065053"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 transition-colors"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">(413) 306-5053</span>
                </a>
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 transition-colors"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span className="font-semibold">info@andersoncleaning.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
