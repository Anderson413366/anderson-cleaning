#!/usr/bin/env node

/**
 * Internal Link Integrity Crawler
 *
 * Crawls internal links from a deployed site (preview or production)
 * and fails if any internal links return 3xx/4xx/5xx status codes.
 *
 * Usage:
 *   DEPLOY_URL=https://your-preview.vercel.app npm run crawl:prod
 *
 * Environment Variables:
 *   DEPLOY_URL - Base URL to crawl (required)
 *   MAX_DEPTH  - Maximum crawl depth (default: 3)
 *   MAX_PAGES  - Maximum pages to crawl (default: 100)
 */

import * as https from 'https'
import * as http from 'http'
import { URL } from 'url'

interface CrawlResult {
  url: string
  status: number
  statusText: string
  referrer: string
  depth: number
}

interface CrawlStats {
  totalPages: number
  successPages: number
  redirects: number
  clientErrors: number
  serverErrors: number
  skipped: number
}

class LinkCrawler {
  private baseUrl: URL
  private maxDepth: number
  private maxPages: number
  private visited: Set<string> = new Set()
  private toVisit: Array<{ url: string; referrer: string; depth: number }> = []
  private results: CrawlResult[] = []
  private stats: CrawlStats = {
    totalPages: 0,
    successPages: 0,
    redirects: 0,
    clientErrors: 0,
    serverErrors: 0,
    skipped: 0,
  }

  constructor(baseUrl: string, maxDepth = 3, maxPages = 100) {
    this.baseUrl = new URL(baseUrl)
    this.maxDepth = maxDepth
    this.maxPages = maxPages
  }

  /**
   * Check if URL is internal (same host)
   */
  private isInternalUrl(url: URL): boolean {
    return url.hostname === this.baseUrl.hostname
  }

  /**
   * Normalize URL for deduplication
   */
  private normalizeUrl(url: URL): string {
    // Remove trailing slash, sort query params, remove hash
    const normalized = new URL(url.href)
    normalized.hash = ''

    // Sort query parameters
    const params = Array.from(normalized.searchParams.entries()).sort()
    normalized.search = ''
    params.forEach(([key, value]) => {
      normalized.searchParams.append(key, value)
    })

    // Remove trailing slash
    let path = normalized.pathname
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1)
    }
    normalized.pathname = path

    return normalized.href
  }

  /**
   * Fetch URL and return status code
   */
  private async fetchUrl(url: string): Promise<{ status: number; statusText: string; body: string }> {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url)
      const protocol = urlObj.protocol === 'https:' ? https : http

      const options = {
        method: 'GET',
        headers: {
          'User-Agent': 'LinkIntegrityCrawler/1.0',
          Accept: 'text/html,application/xhtml+xml',
        },
        timeout: 10000, // 10 second timeout
      }

      const req = protocol.get(url, options, (res) => {
        let body = ''

        res.on('data', (chunk) => {
          body += chunk.toString()
        })

        res.on('end', () => {
          resolve({
            status: res.statusCode || 0,
            statusText: res.statusMessage || '',
            body,
          })
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Request timeout'))
      })
    })
  }

  /**
   * Extract links from HTML body
   */
  private extractLinks(html: string, baseUrl: URL): string[] {
    const links: string[] = []

    // Simple regex-based link extraction (handles most cases)
    // For production, consider using a proper HTML parser like cheerio
    const hrefRegex = /href=["']([^"']+)["']/gi
    let match: RegExpExecArray | null

    while ((match = hrefRegex.exec(html)) !== null) {
      try {
        const href = match[1]

        // Skip non-HTTP protocols
        if (
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('javascript:') ||
          href.startsWith('#')
        ) {
          continue
        }

        // Resolve relative URLs
        const absoluteUrl = new URL(href, baseUrl)

        // Only include internal links
        if (this.isInternalUrl(absoluteUrl)) {
          links.push(this.normalizeUrl(absoluteUrl))
        }
      } catch (error) {
        // Invalid URL, skip
        continue
      }
    }

    return [...new Set(links)] // Deduplicate
  }

  /**
   * Crawl a single URL
   */
  private async crawlUrl(
    url: string,
    referrer: string,
    depth: number
  ): Promise<void> {
    // Check if already visited
    const normalizedUrl = this.normalizeUrl(new URL(url))
    if (this.visited.has(normalizedUrl)) {
      return
    }

    // Mark as visited
    this.visited.add(normalizedUrl)

    // Check if we've hit the page limit
    if (this.visited.size > this.maxPages) {
      this.stats.skipped++
      return
    }

    try {
      console.log(`[${this.visited.size}/${this.maxPages}] Crawling: ${url} (depth: ${depth})`)

      const { status, statusText, body } = await this.fetchUrl(url)

      // Record result
      this.results.push({
        url,
        status,
        statusText,
        referrer,
        depth,
      })

      this.stats.totalPages++

      // Update stats
      if (status >= 200 && status < 300) {
        this.stats.successPages++

        // Extract links if within depth limit and is HTML
        if (depth < this.maxDepth && status === 200) {
          const links = this.extractLinks(body, new URL(url))

          for (const link of links) {
            if (!this.visited.has(link)) {
              this.toVisit.push({ url: link, referrer: url, depth: depth + 1 })
            }
          }
        }
      } else if (status >= 300 && status < 400) {
        this.stats.redirects++
      } else if (status >= 400 && status < 500) {
        this.stats.clientErrors++
      } else if (status >= 500) {
        this.stats.serverErrors++
      }
    } catch (error) {
      console.error(`Error crawling ${url}:`, error)
      this.results.push({
        url,
        status: 0,
        statusText: error instanceof Error ? error.message : 'Unknown error',
        referrer,
        depth,
      })
      this.stats.serverErrors++
    }
  }

  /**
   * Run the crawler
   */
  public async crawl(): Promise<boolean> {
    console.log('\n🔍 Starting internal link integrity crawl...')
    console.log(`📍 Base URL: ${this.baseUrl.href}`)
    console.log(`📊 Max depth: ${this.maxDepth}`)
    console.log(`📄 Max pages: ${this.maxPages}`)
    console.log('')

    // Start with the base URL
    this.toVisit.push({ url: this.baseUrl.href, referrer: 'START', depth: 0 })

    // Process queue
    while (this.toVisit.length > 0 && this.visited.size < this.maxPages) {
      const { url, referrer, depth } = this.toVisit.shift()!
      await this.crawlUrl(url, referrer, depth)

      // Add a small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return this.printResults()
  }

  /**
   * Print results and return success status
   */
  private printResults(): boolean {
    console.log('\n' + '='.repeat(80))
    console.log('📊 CRAWL STATISTICS')
    console.log('='.repeat(80))
    console.log(`Total pages crawled: ${this.stats.totalPages}`)
    console.log(`✅ Success (2xx):     ${this.stats.successPages}`)
    console.log(`↪️  Redirects (3xx):   ${this.stats.redirects}`)
    console.log(`❌ Client errors (4xx): ${this.stats.clientErrors}`)
    console.log(`🔥 Server errors (5xx): ${this.stats.serverErrors}`)
    console.log(`⏭️  Skipped:           ${this.stats.skipped}`)
    console.log('')

    // Find broken links (3xx/4xx/5xx)
    const brokenLinks = this.results.filter(
      (r) => r.status >= 300 || r.status === 0
    )

    if (brokenLinks.length > 0) {
      console.log('='.repeat(80))
      console.log('❌ BROKEN LINKS DETECTED')
      console.log('='.repeat(80))
      console.log('')

      // Group by status code
      const grouped = brokenLinks.reduce(
        (acc, link) => {
          const key = link.status || 0
          if (!acc[key]) acc[key] = []
          acc[key].push(link)
          return acc
        },
        {} as Record<number, CrawlResult[]>
      )

      // Print table for each status code
      Object.keys(grouped)
        .sort()
        .forEach((statusCode) => {
          const links = grouped[Number(statusCode)]
          console.log(`\n${statusCode} - ${links[0].statusText} (${links.length} URLs)`)
          console.log('-'.repeat(80))

          links.forEach((link) => {
            console.log(`  URL:      ${link.url}`)
            console.log(`  Referrer: ${link.referrer}`)
            console.log(`  Depth:    ${link.depth}`)
            console.log('')
          })
        })

      console.log('='.repeat(80))
      console.log(`\n❌ FAIL: ${brokenLinks.length} broken internal link(s) found\n`)
      return false
    } else {
      console.log('='.repeat(80))
      console.log('✅ SUCCESS: Internal link integrity OK')
      console.log('='.repeat(80))
      console.log('')
      return true
    }
  }
}

// Main execution
async function main() {
  const baseUrl = process.env.DEPLOY_URL || process.env.NEXT_PUBLIC_SITE_URL

  if (!baseUrl) {
    console.error('❌ Error: DEPLOY_URL environment variable is required')
    console.error('')
    console.error('Usage:')
    console.error('  DEPLOY_URL=https://your-preview.vercel.app npm run crawl:prod')
    console.error('')
    process.exit(1)
  }

  const maxDepth = parseInt(process.env.MAX_DEPTH || '3', 10)
  const maxPages = parseInt(process.env.MAX_PAGES || '100', 10)

  const crawler = new LinkCrawler(baseUrl, maxDepth, maxPages)
  const success = await crawler.crawl()

  process.exit(success ? 0 : 1)
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
}
