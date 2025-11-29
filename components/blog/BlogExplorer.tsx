'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedDate: string
  image: string
}

interface BlogExplorerProps {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterError, setNewsletterError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  // Filter by search query and category
  const filteredPosts = posts.filter((post) => {
    // Filter by search query (case-insensitive search in title, excerpt, and category)
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by category
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const hasMorePosts = visibleCount < filteredPosts.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setVisibleCount(6) // Reset to 6 when changing category
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setVisibleCount(6) // Reset to 6 when searching
  }

  const handleImageError = (slug: string) => {
    setImageErrors((prev) => new Set(prev).add(slug))
  }

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newsletterEmail) return
    setNewsletterStatus('loading')
    setNewsletterError(null)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Unable to subscribe right now.')
      }
      setNewsletterStatus('success')
      setNewsletterEmail('')
      setTimeout(() => setNewsletterStatus('idle'), 4000)
    } catch (error) {
      setNewsletterStatus('error')
      setNewsletterError(
        error instanceof Error
          ? error.message
          : 'There was an error subscribing. Please try again.'
      )
    }
  }

  return (
    <>
      {/* Search Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-neutral-light-grey dark:border-slate-700 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#999999] dark:text-white/50" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search cleaning tips, compliance guides, industry insights..."
                className="w-full h-[48px] pl-12 pr-4 text-[16px] text-[#333333] dark:text-white bg-white dark:bg-slate-800 border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-white/50 focus:border-brand-bright-blue focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,119,217,0.1)] transition-all"
                aria-label="Search blog articles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-neutral-off-white dark:bg-slate-900 border-b border-neutral-light-grey dark:border-slate-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = category === selectedCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isActive}
                  className={`category-pill ${isActive ? 'active' : ''}`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col bg-white dark:bg-slate-800 border border-[#E0E0E0] dark:border-slate-700 rounded-lg overflow-hidden shadow-sm hover:-translate-y-1 hover:border-brand-bright-blue transition-all duration-300 cursor-pointer group"
              >
                {/* Image - 16:9 aspect ratio with 4px border-radius and brand gradient fallback */}
                <div className="relative aspect-video overflow-hidden rounded-t-[4px]" style={{ background: 'linear-gradient(135deg, #0077D9 0%, #002A86 100%)' }}>
                  {imageErrors.has(post.slug) ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="text-white/30 text-6xl font-bold mb-2">AC</div>
                        <div className="text-white/50 text-sm font-medium">Anderson Cleaning</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        quality={85}
                        onError={() => handleImageError(post.slug)}
                      />
                      {/* Deep Blue overlay at 60% opacity */}
                      <div className="absolute inset-0 bg-brand-deep-blue/60" aria-hidden="true" />
                    </>
                  )}
                </div>

                {/* Content - 24px padding */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Category Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-brand-deep-blue/90 dark:bg-brand-deep-blue text-white text-[12px] font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Date and Read Time - 12px #999999 */}
                  <div className="flex items-center gap-3 text-[12px] text-[#999999] dark:text-white/50 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <span>
                        {new Date(post.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <span aria-hidden="true">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Heading - 16px bold #002A86 */}
                  <h2 className="text-[16px] leading-snug font-bold text-brand-deep-blue dark:text-white mb-2 line-clamp-2 group-hover:text-brand-bright-blue transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt - 14px #666666, 2 lines max */}
                  <p className="text-[14px] text-[#666666] dark:text-white/80 mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-brand-bright-blue font-semibold text-[14px] group-hover:gap-3 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Section */}
          {(hasMorePosts || visibleCount > 0) && (
            <div className="mt-12 text-center">
              {/* Post Count */}
              <p className="text-sm text-neutral-charcoal/60 dark:text-white/60 mb-6">
                Showing {visibleCount} of {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </p>

              {/* Load More Button */}
              {hasMorePosts && (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-brand-deep-blue dark:border-brand-bright-blue text-brand-deep-blue dark:text-brand-bright-blue font-semibold rounded-lg transition-all duration-200 hover:bg-brand-deep-blue hover:text-white dark:hover:bg-brand-bright-blue dark:hover:text-white"
                >
                  Load More Articles
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              Get Cleaning Tips Delivered
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              Subscribe to our newsletter for monthly cleaning tips, industry updates, and exclusive
              offers.
            </p>
            <form className="flex flex-col gap-3 max-w-md mx-auto" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="your.email@company.com"
                required
                className="w-full h-[48px] px-4 text-[16px] text-[#333333] dark:text-white bg-white dark:bg-slate-800 border border-[#D0D0D0] dark:border-slate-600 rounded-lg placeholder:text-[#999999] dark:placeholder:text-white/50 focus:border-brand-bright-blue focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,119,217,0.1)]"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="w-full h-[48px] bg-brand-bright-blue hover:bg-brand-deep-blue text-white text-[12px] font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsletterStatus === 'loading' ? 'Subscribing...' : newsletterStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === 'error' && newsletterError && (
              <p className="text-sm text-red-500 mt-2">{newsletterError}</p>
            )}
            {newsletterStatus === 'success' && (
              <p className="text-sm text-brand-bright-blue mt-2">Thanks! Check your inbox to confirm.</p>
            )}
            <p className="text-xs text-neutral-charcoal/60 dark:text-white/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
