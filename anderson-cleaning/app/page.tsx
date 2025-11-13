'use client'

import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'
import { Phone, Mail, MapPin, Clock, Shield, Users, Award, Headphones } from 'lucide-react'

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
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
              Small business care. Big business systems. Full-time salaried cleaners, 24/7 support, and corporate-grade quality—serving businesses within 100 miles of West Springfield, MA.
            </p>
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

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-accent-400 mt-1" />
                  <span>103 Wayside Avenue<br />West Springfield, MA 01089</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent-400" />
                  <span>info@andersoncleaning.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-accent-400 transition">Services</a></li>
                <li><a href="#about" className="hover:text-accent-400 transition">About Us</a></li>
                <li><a href="/apply" className="hover:text-accent-400 transition">Careers - Apply Now</a></li>
                <li><a href="#" className="hover:text-accent-400 transition">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Service Area</h3>
              <p className="mb-4">
                Serving businesses within 100 miles of West Springfield, MA—including Springfield, Worcester, Northampton, Amherst, Hartford (CT), and more.
              </p>
              <p className="text-sm text-gray-400 border-t border-gray-700 pt-4">
                <strong>B2B Only</strong> • No restaurants or 7-day/week cleaning
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
