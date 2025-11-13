'use client'

import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Phone, Clock, Shield, Users, Award, Headphones } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-accent-500/20 border border-accent-400/30 rounded-full text-accent-300 text-sm font-medium mb-4">
                B2B Commercial Cleaning
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight animate-slide-up">
              Professional Commercial Cleaning with a{' '}
              <span className="text-accent-400">Personal Touch</span>
            </h1>
            <div className="text-xl md:text-2xl text-blue-100 mb-8 space-y-2 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <p className="font-semibold">Small business care. Big business systems.</p>
              <p>Full-time salaried cleaners • 24/7 support • Corporate-grade quality</p>
              <p className="text-lg text-blue-200">Serving businesses within 100 miles of West Springfield, MA</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                Get a Free Quote
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Schedule a Walk-Through
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center space-x-2">
                <Headphones className="h-5 w-5 text-accent-400" />
                <span>24/7 Support</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-accent-400" />
                <span>≤30 Min Response</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-accent-400" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive commercial cleaning solutions tailored to your facility's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Office & Commercial Cleaning',
                description: 'Nightly/weekly programs that keep your workplace spotless and safe.',
                icon: '🏢'
              },
              {
                title: 'Janitorial Services',
                description: 'Reliable, consistent, and accountable facility care.',
                icon: '🧹'
              },
              {
                title: 'Floor & Carpet Care',
                description: 'Extend the life and look of your floors. (Contracted clients only)',
                icon: '✨'
              },
              {
                title: 'Window Cleaning',
                description: 'Streak-free shine for a great first impression. (Contracted clients only)',
                icon: '🪟'
              },
              {
                title: 'Post-Construction Cleanup',
                description: 'Turnover-ready spaces. (Contracted clients only)',
                icon: '🏗️'
              },
              {
                title: 'Supply Management',
                description: 'Never run out again. We manage consumables for active clients.',
                icon: '📦'
              },
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <a href="#" className="text-primary-700 font-semibold hover:text-primary-800 inline-flex items-center">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Anderson Difference</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">What sets us apart in commercial cleaning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Personalized Attention',
                description: 'Local team, dedicated account manager, and site-specific SOPs.'
              },
              {
                icon: Shield,
                title: 'Corporate-Grade Standards',
                description: 'Checklists, quality audits, and documented processes.'
              },
              {
                icon: Award,
                title: 'Full-Time Salaried Staff',
                description: 'Stable, trained, background-checked professionals.'
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                description: 'We respond within 30 minutes—day or night.'
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-blue-900/30 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-700 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a cleaner, healthier workplace?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation quote today. We respond within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg">
              Get Your Free Quote
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
