'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { GlassIcon } from '@/components/ui/GlassIcon'
import CareerApplicationForm from '@/components/forms/CareerApplicationForm'
import {
  DollarSign,
  GraduationCap,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Globe,
  Heart,
  Shield,
  Award,
  Briefcase,
} from 'lucide-react'

type Language = 'en' | 'es' | 'pt' | 'ro'

const languageLabels: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  ro: 'Română',
}

const translations = {
  en: {
    hero: {
      title: 'Join Our Growing Team',
      subtitle: 'Competitive pay, comprehensive training, and real career advancement opportunities',
      cta: 'View Open Positions',
    },
    languageSelector: {
      label: 'Select Language',
    },
    culture: {
      sectionTitle: 'Why Work With Us',
      sectionSubtitle: 'At Anderson Cleaning Company, we believe our team members are our greatest asset. We invest in your success from day one.',
      values: [
        {
          icon: Heart,
          title: 'Family-Owned Values',
          description: 'We treat every team member like family. Our supportive environment means you\'re never just a number.',
        },
        {
          icon: GraduationCap,
          title: 'Training & Development',
          description: 'Comprehensive paid training program. Learn industry best practices and advance your skills.',
        },
        {
          icon: TrendingUp,
          title: 'Career Growth',
          description: 'Clear advancement paths from entry-level to supervisor and management positions.',
        },
        {
          icon: Shield,
          title: 'Stable Employment',
          description: 'W-2 employment with consistent schedules. No gig economy uncertainty here.',
        },
      ],
      benefits: {
        title: 'Benefits & Perks',
        items: [
          'Competitive hourly wages ($15-25/hr)',
          'Flexible scheduling options',
          'Paid training program',
          'Night shift differentials',
          'Opportunity for overtime',
          'Supportive team environment',
          'Professional development',
          'Safety equipment provided',
        ],
      },
    },
    positions: {
      sectionTitle: 'Current Openings',
      applyNow: 'Apply Now',
      roles: [
        {
          title: 'Cleaning Specialist',
          locationLabel: 'Springfield/Hartford Area',
          typeLabel: 'Part-time & Full-time',
          rateLabel: '$15-20/hour',
          bullets: [
            'Evening and night shifts',
            'No experience required',
            'Paid training provided',
          ],
        },
        {
          title: 'Field Supervisor',
          locationLabel: 'West Springfield, MA',
          typeLabel: 'Full-time W-2',
          rateLabel: '$20-25/hour',
          bullets: [
            '2+ years experience required',
            'Lead & train team members',
            'Company vehicle provided',
          ],
        },
        {
          title: 'Operations Assistant',
          locationLabel: 'Springfield/Hartford Area',
          typeLabel: 'Full-time or Part-time',
          rateLabel: '$18-22/hour',
          bullets: [
            'Evening shift (4:30–10 PM)',
            'Night differential included',
            'Flexible scheduling',
          ],
        },
      ],
    },
    application: {
      sectionTitle: 'Apply Today',
    },
  },
  es: {
    hero: {
      title: 'Únete a Nuestro Equipo',
      subtitle: 'Pago competitivo, capacitación completa y oportunidades reales de avance profesional',
      cta: 'Ver Posiciones Abiertas',
    },
    languageSelector: {
      label: 'Seleccionar Idioma',
    },
    culture: {
      sectionTitle: 'Por Qué Trabajar Con Nosotros',
      sectionSubtitle: 'En Anderson Cleaning Company, creemos que nuestros empleados son nuestro mayor activo. Invertimos en tu éxito desde el primer día.',
      values: [
        {
          icon: Heart,
          title: 'Valores Familiares',
          description: 'Tratamos a cada miembro del equipo como familia. Nuestro ambiente de apoyo significa que nunca eres solo un número.',
        },
        {
          icon: GraduationCap,
          title: 'Capacitación y Desarrollo',
          description: 'Programa de capacitación pagado completo. Aprende las mejores prácticas de la industria y avanza en tus habilidades.',
        },
        {
          icon: TrendingUp,
          title: 'Crecimiento Profesional',
          description: 'Caminos claros de avance desde nivel de entrada hasta posiciones de supervisor y gerencia.',
        },
        {
          icon: Shield,
          title: 'Empleo Estable',
          description: 'Empleo W-2 con horarios consistentes. Sin la incertidumbre de la economía gig.',
        },
      ],
      benefits: {
        title: 'Beneficios y Ventajas',
        items: [
          'Salarios por hora competitivos ($15-25/hr)',
          'Opciones de horario flexible',
          'Programa de capacitación pagado',
          'Diferenciales por turno nocturno',
          'Oportunidad de horas extras',
          'Ambiente de equipo solidario',
          'Desarrollo profesional',
          'Equipo de seguridad proporcionado',
        ],
      },
    },
    positions: {
      sectionTitle: 'Posiciones Abiertas',
      applyNow: 'Aplicar Ahora',
      roles: [
        {
          title: 'Especialista en Limpieza',
          locationLabel: 'Área Springfield/Hartford',
          typeLabel: 'Tiempo parcial y completo',
          rateLabel: '$15-20/hora',
          bullets: [
            'Turnos de tarde y noche',
            'No se requiere experiencia',
            'Capacitación pagada',
          ],
        },
        {
          title: 'Supervisor de Campo',
          locationLabel: 'West Springfield, MA',
          typeLabel: 'Tiempo completo W-2',
          rateLabel: '$20-25/hora',
          bullets: [
            '2+ años de experiencia requeridos',
            'Liderar y entrenar equipo',
            'Vehículo de empresa incluido',
          ],
        },
        {
          title: 'Asistente de Operaciones',
          locationLabel: 'Área Springfield/Hartford',
          typeLabel: 'Tiempo completo o parcial',
          rateLabel: '$18-22/hora',
          bullets: [
            'Turno nocturno (4:30–10 PM)',
            'Diferencial nocturno incluido',
            'Horario flexible',
          ],
        },
      ],
    },
    application: {
      sectionTitle: 'Aplica Hoy',
    },
  },
  pt: {
    hero: {
      title: 'Junte-se à Nossa Equipe',
      subtitle: 'Pagamento competitivo, treinamento completo e oportunidades reais de crescimento profissional',
      cta: 'Ver Vagas Abertas',
    },
    languageSelector: {
      label: 'Selecionar Idioma',
    },
    culture: {
      sectionTitle: 'Por Que Trabalhar Conosco',
      sectionSubtitle: 'Na Anderson Cleaning Company, acreditamos que nossos funcionários são nosso maior patrimônio. Investimos no seu sucesso desde o primeiro dia.',
      values: [
        {
          icon: Heart,
          title: 'Valores Familiares',
          description: 'Tratamos cada membro da equipe como família. Nosso ambiente acolhedor significa que você nunca é apenas um número.',
        },
        {
          icon: GraduationCap,
          title: 'Treinamento e Desenvolvimento',
          description: 'Programa de treinamento remunerado completo. Aprenda as melhores práticas do setor e avance suas habilidades.',
        },
        {
          icon: TrendingUp,
          title: 'Crescimento na Carreira',
          description: 'Caminhos claros de avanço desde nível inicial até posições de supervisor e gerência.',
        },
        {
          icon: Shield,
          title: 'Emprego Estável',
          description: 'Emprego W-2 com horários consistentes. Sem a incerteza da economia gig.',
        },
      ],
      benefits: {
        title: 'Benefícios e Vantagens',
        items: [
          'Salários por hora competitivos ($15-25/hr)',
          'Opções de horário flexível',
          'Programa de treinamento remunerado',
          'Adicionais noturnos',
          'Oportunidade de horas extras',
          'Ambiente de equipe solidário',
          'Desenvolvimento profissional',
          'Equipamento de segurança fornecido',
        ],
      },
    },
    positions: {
      sectionTitle: 'Vagas Abertas',
      applyNow: 'Candidatar-se',
      roles: [
        {
          title: 'Especialista em Limpeza',
          locationLabel: 'Área Springfield/Hartford',
          typeLabel: 'Meio período e integral',
          rateLabel: '$15-20/hora',
          bullets: [
            'Turnos de tarde e noite',
            'Não é necessária experiência',
            'Treinamento remunerado',
          ],
        },
        {
          title: 'Supervisor de Campo',
          locationLabel: 'West Springfield, MA',
          typeLabel: 'Período integral W-2',
          rateLabel: '$20-25/hora',
          bullets: [
            '2+ anos de experiência necessários',
            'Liderar e treinar equipe',
            'Veículo da empresa incluído',
          ],
        },
        {
          title: 'Assistente de Operações',
          locationLabel: 'Área Springfield/Hartford',
          typeLabel: 'Período integral ou parcial',
          rateLabel: '$18-22/hora',
          bullets: [
            'Turno noturno (4:30–10 PM)',
            'Adicional noturno incluído',
            'Horário flexível',
          ],
        },
      ],
    },
    application: {
      sectionTitle: 'Candidate-se Hoje',
    },
  },
  ro: {
    hero: {
      title: 'Alătură-te Echipei Noastre',
      subtitle: 'Plată competitivă, instruire completă și oportunități reale de avansare în carieră',
      cta: 'Vezi Pozițiile Deschise',
    },
    languageSelector: {
      label: 'Selectați Limba',
    },
    culture: {
      sectionTitle: 'De Ce Să Lucrezi Cu Noi',
      sectionSubtitle: 'La Anderson Cleaning Company, credem că membrii echipei noastre sunt cel mai mare atu al nostru. Investim în succesul tău din prima zi.',
      values: [
        {
          icon: Heart,
          title: 'Valori de Familie',
          description: 'Tratăm fiecare membru al echipei ca pe familie. Mediul nostru de sprijin înseamnă că nu ești niciodată doar un număr.',
        },
        {
          icon: GraduationCap,
          title: 'Instruire și Dezvoltare',
          description: 'Program de instruire plătit complet. Învață cele mai bune practici din industrie și avansează-ți abilitățile.',
        },
        {
          icon: TrendingUp,
          title: 'Creștere în Carieră',
          description: 'Căi clare de avansare de la nivel de intrare până la poziții de supervizor și management.',
        },
        {
          icon: Shield,
          title: 'Angajare Stabilă',
          description: 'Angajare W-2 cu program consistent. Fără incertitudinea economiei gig.',
        },
      ],
      benefits: {
        title: 'Beneficii și Avantaje',
        items: [
          'Salarii orare competitive ($15-25/oră)',
          'Opțiuni de program flexibil',
          'Program de instruire plătit',
          'Diferențiale pentru tura de noapte',
          'Oportunitate pentru ore suplimentare',
          'Mediu de echipă suportiv',
          'Dezvoltare profesională',
          'Echipament de siguranță furnizat',
        ],
      },
    },
    positions: {
      sectionTitle: 'Poziții Deschise',
      applyNow: 'Aplică Acum',
      roles: [
        {
          title: 'Specialist în Curățenie',
          locationLabel: 'Zona Springfield/Hartford',
          typeLabel: 'Part-time și full-time',
          rateLabel: '$15-20/oră',
          bullets: [
            'Ture de seară și noapte',
            'Nu este necesară experiență',
            'Instruire plătită',
          ],
        },
        {
          title: 'Supervizor de Teren',
          locationLabel: 'West Springfield, MA',
          typeLabel: 'Full-time W-2',
          rateLabel: '$20-25/oră',
          bullets: [
            '2+ ani experiență necesari',
            'Conduce și instruiește echipa',
            'Vehicul de companie inclus',
          ],
        },
        {
          title: 'Asistent Operațiuni',
          locationLabel: 'Zona Springfield/Hartford',
          typeLabel: 'Full-time sau part-time',
          rateLabel: '$18-22/oră',
          bullets: [
            'Tură de seară (4:30–10 PM)',
            'Diferențial de noapte inclus',
            'Program flexibil',
          ],
        },
      ],
    },
    application: {
      sectionTitle: 'Aplică Astăzi',
    },
  },
}

function CareersContent() {
  const searchParams = useSearchParams()
  const [currentLang, setCurrentLang] = useState<Language>('en')

  useEffect(() => {
    const langParam = searchParams.get('lang')
    if (langParam && ['en', 'es', 'pt', 'ro'].includes(langParam)) {
      setCurrentLang(langParam as Language)
    }
  }, [searchParams])

  const t = translations[currentLang]

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    // Update URL without page reload
    const url = new URL(window.location.href)
    if (lang === 'en') {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', lang)
    }
    window.history.pushState({}, '', url.toString())
  }

  // Consistent icons for all job cards
  const roleIcons = {
    locationIcon: <MapPin className="h-4 w-4" aria-hidden="true" />,
    rateIcon: <DollarSign className="h-4 w-4" aria-hidden="true" />,
    typeIcon: <Briefcase className="h-4 w-4" aria-hidden="true" />,
  }

  return (
    <main>
      {/* Hero */}
      <section className="hero-section bg-gradient-to-br from-brand-deep-blue to-brand-bright-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Language Selector */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Globe className="h-4 w-4 text-white/80" aria-hidden="true" />
                <span className="text-sm text-white/80 sr-only">{t.languageSelector.label}</span>
                <div className="flex gap-1" role="group" aria-label={t.languageSelector.label}>
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                        currentLang === lang
                          ? 'bg-white text-brand-deep-blue'
                          : 'text-white hover:bg-white/20'
                      }`}
                      aria-pressed={currentLang === lang}
                      aria-label={languageLabels[lang]}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </div>
              </div>
              {currentLang !== 'en' && (
                <p className="text-[12px] text-white/60">
                  Application form available in English only
                </p>
              )}
            </div>

            <h1 className="font-extrabold mb-6 leading-tight">{t.hero.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#open-positions">
                <Button variant="accent" size="lg" className="min-w-[220px]">
                  {t.hero.cta}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us - Company Culture */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-4">
              {t.culture.sectionTitle}
            </h2>
            <p className="text-body text-neutral-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
              {t.culture.sectionSubtitle}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {t.culture.values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-neutral-off-white dark:bg-slate-800 border-2 border-brand-deep-blue/10 dark:border-white/10"
                >
                  <div className="flex justify-center mb-4">
                    <GlassIcon icon={IconComponent} size="lg" variant="solid" label={value.title} />
                  </div>
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-body-sm text-neutral-charcoal/80 dark:text-white/80">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-bright-blue/5 dark:bg-brand-bright-blue/10 rounded-2xl border-2 border-brand-bright-blue/20 dark:border-brand-bright-blue/30 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <GlassIcon icon={Award} size="md" variant="solid" label={t.culture.benefits.title} />
                <h3 className="text-2xl font-bold text-neutral-charcoal dark:text-white">
                  {t.culture.benefits.title}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.culture.benefits.items.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-body-sm text-neutral-charcoal/80 dark:text-white/80">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white text-center mb-12">
            {t.positions.sectionTitle}
          </h2>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {t.positions.roles.map((role) => (
              <div
                key={role.title}
                className="w-[300px] min-h-[280px] flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-[#E0E0E0] dark:border-slate-700 hover:border-brand-bright-blue transition-all duration-300 hover:-translate-y-1 p-5 shadow-sm"
              >
                {/* Title */}
                <h3 className="text-[16px] font-bold text-brand-deep-blue dark:text-white mb-2">{role.title}</h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-[#666666] dark:text-white/70 mb-1">
                  {roleIcons.locationIcon}
                  <span className="text-[13px]">{role.locationLabel}</span>
                </div>

                {/* Employment Type */}
                <div className="flex items-center gap-2 text-[#666666] dark:text-white/70 mb-1">
                  {roleIcons.typeIcon}
                  <span className="text-[13px]">{role.typeLabel}</span>
                </div>

                {/* Pay Rate */}
                <div className="flex items-center gap-2 text-brand-bright-blue mb-3">
                  {roleIcons.rateIcon}
                  <span className="text-[13px] font-bold">{role.rateLabel}</span>
                </div>

                {/* Bullets (3 max) */}
                <ul className="space-y-1 mb-3 flex-1">
                  {role.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[#666666] dark:text-white/70">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-bright-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-[12px] leading-tight">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Apply Button */}
                <a href="#application-form" className="inline-block w-full mt-auto">
                  <Button variant="secondary" size="sm" className="w-full text-[12px]">
                    {t.positions.applyNow}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white text-center mb-12">
            {t.application.sectionTitle}
          </h2>
          <div className="max-w-3xl mx-auto">
            <CareerApplicationForm />
          </div>
        </div>
      </section>
    </main>
  )
}

export default function CareersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-slate-900" />}>
      <CareersContent />
    </Suspense>
  )
}
