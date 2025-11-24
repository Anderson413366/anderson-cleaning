import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AlertTriangle,
  Building2,
  HardHat,
  Sparkles,
  Square,
  UserCheck,
  Zap,
} from 'lucide-react'

export interface ServiceImageSet {
  avif: string
  webp: string
  fallback: string
  alt: string
}

export interface ServiceTestimonial {
  quote: string
  author: string
  role: string
}

export interface ServiceBlogPostLink {
  title: string
  slug: string
}

export interface ServiceProcessStep {
  step: number
  title: string
  description: string
}

export interface ServiceData {
  slug: ServiceSlug
  title: string
  h1: string
  icon: LucideIcon
  tagline: string
  heroDescription: string
  heroImage: ServiceImageSet
  differentiator: string
  overview: string[]
  benefits: string[]
  industries: string[]
  process: ServiceProcessStep[]
  testimonials: ServiceTestimonial[]
  relatedServices: ServiceSlug[]
  faqs: { question: string; answer: string }[]
  blogPosts: ServiceBlogPostLink[]
  highlights: string[]
  metaTitle: string
  metaDescription: string
  schemaDescription: string
  availability: 'all' | 'contracted'
  responseTimeNote?: string
}

const blogPostCatalog = {
  'office-cleaning-checklist-flu-season': {
    title: 'Office Cleaning Checklist for Flu Season',
    slug: 'office-cleaning-checklist-flu-season',
  },
  'how-often-clean-commercial-office': {
    title: 'How Often Should You Clean a Commercial Office?',
    slug: 'how-often-clean-commercial-office',
  },
  'medical-facility-cleaning-standards': {
    title: 'Medical Facility Cleaning: Meeting OSHA & CDC Standards',
    slug: 'medical-facility-cleaning-standards',
  },
  'commercial-cleaning-frequency-guide': {
    title: 'Commercial Cleaning Frequency Planning Guide',
    slug: 'commercial-cleaning-frequency-guide',
  },
  'floor-care-maintenance-tips': {
    title: 'Floor Care Maintenance Tips for Facilities Teams',
    slug: 'floor-care-maintenance-tips',
  },
  'benefits-green-cleaning-workplace': {
    title: 'Benefits of Green Cleaning in the Workplace',
    slug: 'benefits-green-cleaning-workplace',
  },
  'choosing-commercial-cleaning-company': {
    title: 'How to Evaluate a Commercial Cleaning Company',
    slug: 'choosing-commercial-cleaning-company',
  },
} as const

type BlogPostSlug = keyof typeof blogPostCatalog

function getBlogPost(slug: BlogPostSlug): ServiceBlogPostLink {
  const post = blogPostCatalog[slug]
  if (!post) {
    throw new Error(`Missing blog post for slug: ${slug}`)
  }
  return post
}

export const serviceSlugs = [
  'office-cleaning',
  'healthcare-cleaning',
  'janitorial-services',
  'floor-care',
  'window-cleaning',
  'post-construction',
  'emergency-cleaning',
  'day-porter',
] as const

export type ServiceSlug = (typeof serviceSlugs)[number]

const hero = (slug: string, alt: string): ServiceImageSet => ({
  avif: `/images/services/${slug}-hero.avif`,
  webp: `/images/services/${slug}-hero.webp`,
  fallback: `/images/services/${slug}-hero.jpg`,
  alt,
})

export const servicesData: Record<ServiceSlug, ServiceData> = {
  'office-cleaning': {
    slug: 'office-cleaning',
    title: 'Office & Commercial Cleaning',
    h1: 'Professional Office Cleaning Services in Western Massachusetts',
    icon: Building2,
    tagline: 'Daily janitorial, workstation sanitization, and spotless break rooms after hours.',
    heroDescription:
      'Daily and nightly office cleaning programs that keep corporate headquarters, professional suites, and collaborative workspaces spotless without interrupting your team.',
    heroImage: hero('office-cleaning', 'Office cleaning specialists sanitizing workstations in Western Massachusetts'),
    differentiator: 'After-hours service windows and documented alarm procedures keep your workday uninterrupted.',
    overview: [
      'Every office we serve across Greater Springfield starts with a detailed facility risk map so we understand how executives, hybrid teams, and visitors move through the space. From there we design a balanced program that keeps restrooms, break rooms, and shared desks sanitary while preserving confidential materials and sensitive IT equipment. Our supervisors coordinate directly with facilities leaders to document doors, alarm codes, elevator access, and vendor policies so onboarding is frictionless.',
      'Workstation programs receive special attention because high-touch peripherals and collaborative pods pass through multiple hands each day. Our nightly teams disinfect keyboards, mice, chair arms, and touch panels with EPA-registered products that protect finishes while eliminating bacteria and viruses. Break rooms and pantries are reset with sanitized countertops, degreased appliances, replenished paper goods, and odor control so the first shift arrives to a fresh environment.',
      'Conference rooms, executive suites, and reception zones receive concierge-level detailing that reinforces your brand image. Spotless glass, vacuum lines in carpet, and dust-free millwork tell clients you run a tight operation before the meeting even begins. Because every location has different security requirements, we document chains of custody, implement badge protocols, and run after-hours service windows so your teams return to a pristine office each morning with zero disruption.',
    ],
    benefits: [
      'After-hours cleaning so staff arrive to a fresh workspace',
      'Color-coded microfiber prevents cross-contamination',
      'Inventory management for restroom and pantry supplies',
      'Documented quality inspections with photo proof',
      'Background-checked W-2 employees with benefits',
      'Emergency dispatch in two hours or less for current clients',
      'Green Seal chemistry available on request',
    ],
    industries: ['Corporate offices', 'Professional services firms', 'Technology companies'],
    process: [
      { step: 1, title: 'Initial Assessment', description: 'Facility walkthrough covering square footage, floor types, and risk zones.' },
      { step: 2, title: 'Custom Cleaning Plan', description: 'SOPs outlining nightly, weekly, and monthly tasks for each area.' },
      { step: 3, title: 'Dedicated Team Training', description: 'Hands-on coaching so cleaners know access rules, badge use, and sensitive areas.' },
      { step: 4, title: 'Implementation & Supervision', description: 'On-site supervisor shadows the first two weeks to confirm standards.' },
      { step: 5, title: 'Quality Checks & Reporting', description: 'Documented inspections with corrective action plans sent monthly.' },
    ],
    testimonials: [
      {
        quote:
          'Anderson Cleaning has supported our Springfield HQ for six years. Their after-hours crews reset 80+ workstations nightly without disrupting confidential projects.',
        author: 'Mia Reynolds',
        role: 'Director of Workplace, Pioneer Mutual',
      },
      {
        quote: 'They document every request in the portal, replenish supplies automatically, and flag maintenance issues before we notice them.',
        author: 'Sean Mattson',
        role: 'Facilities Manager, Valley Creative Agency',
      },
    ],
    relatedServices: ['janitorial-services', 'day-porter', 'floor-care'],
    faqs: [
      { question: 'Can you work entirely after hours?', answer: 'Yes. Most offices prefer evening cleaning. We schedule start times after your last employee leaves, manage alarm codes, and complete a digital checkout before locking up.' },
      { question: 'Do you provide workstation disinfecting?', answer: 'Workstation disinfection is included. Keyboards, mice, armrests, sit/stand controls, and shared conference tech receive EPA-registered disinfectants each visit.' },
      { question: 'Who supplies consumables?', answer: 'We track towel, tissue, soap, and trash liner usage and replenish through our supply program so you never run out midweek.' },
      { question: 'How fast do you respond to special requests?', answer: 'Existing office clients receive a two-hour response window for spills or executive meeting prep. Non-emergency add-ons are completed the same or next service day.' },
      { question: 'Are your crews background-checked?', answer: 'All technicians pass background checks, E-Verify, and ongoing training before they ever enter a facility.' },
    ],
    blogPosts: [getBlogPost('office-cleaning-checklist-flu-season'), getBlogPost('how-often-clean-commercial-office')],
    highlights: ['After-hours coverage', 'Workstation disinfection', 'Restroom + pantry restocking', 'Quality inspections'],
    metaTitle: 'Office Cleaning Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'Daily and nightly office cleaning for Western MA & Northern CT workplaces. Sanitized workstations, stocked break rooms, and after-hours crews you can trust.',
    schemaDescription: 'Professional office cleaning and janitorial programs delivering sanitized workstations, stocked break rooms, and after-hours service throughout Western Massachusetts and Northern Connecticut.',
    availability: 'all',
  },
  'healthcare-cleaning': {
    slug: 'healthcare-cleaning',
    title: 'Healthcare Facility Cleaning',
    h1: 'Medical & Healthcare Facility Cleaning Services',
    icon: Activity,
    tagline: 'OSHA-compliant EVS teams using EPA-registered disinfectants and HIPAA-aware processes.',
    heroDescription:
      'Specialized environmental services teams trained on OSHA Bloodborne Pathogen Standard, HIPAA awareness, and CDC protocols for medical offices, clinics, and outpatient centers.',
    heroImage: hero('healthcare-cleaning', 'Healthcare cleaning specialist disinfecting a Massachusetts medical office'),
    differentiator: 'HIPAA-aware staff with OSHA and bloodborne pathogen certifications.',
    overview: [
      'Healthcare providers across Hampden, Hampshire, and Hartford counties trust our EVS-trained supervisors to maintain exam rooms, imaging suites, and waiting areas without interrupting patient care. We begin by performing a compliance audit that references your accreditation body, infection control plans, and manufacturer instructions for your equipment. From there we build color-coded SOPs that address terminal cleaning sequences, sharps isolation, chemo spill kits, and any special handling instructions your medical director requires.',
      'Our program emphasizes preventing cross-contamination. Microfiber cloths and mops are segmented by color for clinical, semi-clinical, and public spaces, and each device is laundered to CDC standards after a single room use. EPA List N disinfectants are selected for efficacy against emerging pathogens but also for compatibility with stainless steel, vinyl upholstery, and electronic monitoring surfaces. We document chemical dwell times in our mobile app so your infection control nurse can review timestamps anytime.',
      'Because your staff manages PHI, every Anderson team member receives HIPAA awareness training, annual bloodborne pathogen refreshers, and respirator fit testing when required. We coordinate directly with practice managers to schedule cleaning windows after last patient discharge or during low census blocks. If an urgent site needs support, we deploy a certified disinfection team within four hours and provide completion documentation for your regulatory files.',
    ],
    benefits: [
      'EPA List N disinfectants tailored to healthcare environments',
      'Terminal and daily cleaning protocols documented per room type',
      'Color-coded microfiber program prevents cross-contamination',
      'Compliance-ready reporting for audits and accreditation',
      'Staff trained on HIPAA awareness and PPE usage',
      'Two-hour escalation path to certified disinfection team',
      'Secure key management with badge tracking',
    ],
    industries: ['Medical offices', 'Dental practices', 'Urgent care centers', 'Outpatient clinics'],
    process: [
      { step: 1, title: 'Compliance Audit', description: 'Review infection control plans, accreditation standards, and equipment IFUs.' },
      { step: 2, title: 'Protocol Development', description: 'Write SOPs with color-coded tools, dwell times, and terminal cleaning steps.' },
      { step: 3, title: 'Staff Certification', description: 'Train teams on OSHA BBP, HIPAA basics, PPE, and documentation workflows.' },
      { step: 4, title: 'Implementation', description: 'Coordinate with charge nurses or practice managers for access and coverage.' },
      { step: 5, title: 'Documentation & QA', description: 'Log completed rooms, chemicals, and inspections for regulatory files.' },
      { step: 6, title: 'Ongoing Reporting', description: 'Monthly review meetings with infection control stakeholders.' },
    ],
    testimonials: [
      {
        quote:
          'Their EVS manager built a documentation trail that satisfied our Joint Commission surveyors and freed my nursing staff from after-hours cleaning.',
        author: 'Dr. Alexis Romano',
        role: 'Practice Owner, Pioneer Valley Women’s Health',
      },
      {
        quote:
          'We rely on Anderson for nightly clinical cleaning plus same-day turnovers when we run late. They understand chain of custody for sensitive waste better than any vendor we have used.',
        author: 'Jordan Blakely',
        role: 'Director of Operations, Riverbend Urgent Care',
      },
    ],
    relatedServices: ['emergency-cleaning', 'day-porter', 'janitorial-services'],
    faqs: [
      { question: 'Do you meet OSHA Bloodborne Pathogen requirements?', answer: 'Yes. Every technician assigned to healthcare accounts completes OSHA BBP, HIPAA awareness, and PPE training before onboarding.' },
      { question: 'Can you document dwell times and chemicals?', answer: 'Our inspection app logs disinfectant lot numbers, dwell times, and completion timestamps for audit review.' },
      { question: 'Do you offer daytime EVS support?', answer: 'We can provide day porters or EVS attendants for high-traffic waiting rooms and restrooms while maintaining confidentiality.' },
      { question: 'How quickly can you respond to an exposure event?', answer: 'Certified disinfection teams mobilize within four hours for new clients and two hours for enrolled practices.' },
      { question: 'Are your products compatible with sensitive equipment?', answer: 'We select disinfectants approved by equipment manufacturers and test on surfaces before deployment.' },
    ],
    blogPosts: [getBlogPost('medical-facility-cleaning-standards'), getBlogPost('benefits-green-cleaning-workplace')],
    highlights: ['OSHA BBP protocols', 'Color-coded tools', 'HIPAA-aware staff', 'Audit-ready documentation'],
    metaTitle: 'Healthcare Cleaning Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'OSHA-compliant medical office cleaning across Western MA & Northern CT. HIPAA-aware EVS teams using EPA List N disinfectants and documented protocols.',
    schemaDescription: 'Specialized healthcare cleaning with OSHA-compliant protocols, HIPAA-aware staff, and EPA List N disinfectants for clinics across Western Massachusetts and Northern Connecticut.',
    availability: 'all',
  },
  'janitorial-services': {
    slug: 'janitorial-services',
    title: 'Janitorial Services',
    h1: 'Comprehensive Janitorial Services for Commercial Properties',
    icon: Sparkles,
    tagline: 'Flexible scheduling and scalable teams dedicated to your facility.',
    heroDescription:
      'Full-facility janitorial programs that combine routine cleaning, supply management, and facility maintenance support for complex properties.',
    heroImage: hero('janitorial-services', 'Janitorial professionals servicing a corporate lobby in Western Massachusetts'),
    differentiator: 'Flexible scheduling and scalable teams allow us to cover entire portfolios on short notice.',
    overview: [
      'Property managers bring Anderson Cleaning in when they need consistent, reportable results across Class A towers, advanced manufacturing sites, or education campuses. We benchmark the current state of your facility, interview stakeholders, and observe traffic patterns on each floor. Using that data, we build a multi-frequency matrix that outlines daily, weekly, and monthly tasks by zone along with escalation protocols, supply ownership, and specialty projects.',
      'Reliable staffing is the backbone of janitorial success. Our teams are W-2 employees with healthcare, PTO, and 401(k) access, which reduces turnover and protects institutional knowledge about your building. Supervisors conduct toolbox talks weekly, verifying PPE usage, documenting incident-free shifts, and coaching on new tenant requirements. When seasonal spikes happen, we scale with trained floaters who already understand Anderson’s quality system, keeping your coverage intact without temporary labor pools.',
      'Because janitorial contracts touch every department, we align with security, engineering, and tenant relations simultaneously. We monitor consumables, restock through our supply management program, and provide monthly business reviews with KPI dashboards covering inspections, service tickets, and sustainability initiatives. Whether you manage a downtown tower or a multi-tenant business park, you receive a proactive partner who looks beyond cleaning checklists to protect asset value.',
    ],
    benefits: [
      'Single vendor for cleaning, consumables, and light maintenance tasks',
      'Dedicated account manager with 24/7 availability',
      'Digital inspection reports with photos and timestamps',
      'Flexible contract terms that grow with your portfolio',
      'Safety-focused training and equipment program',
      'Sustainable product options and recycling support',
      'Rapid onboarding for new tenant spaces',
    ],
    industries: ['Corporate campuses', 'Distribution centers', 'Educational facilities'],
    process: [
      { step: 1, title: 'Needs Assessment', description: 'Document square footage, occupancy, risk areas, and compliance requirements.' },
      { step: 2, title: 'Schedule Creation', description: 'Design daily, periodic, and seasonal cleaning cadences with quality checkpoints.' },
      { step: 3, title: 'Team Assignment', description: 'Dedicated janitorial team plus trained floaters for coverage continuity.' },
      { step: 4, title: 'Service Delivery', description: 'Execute SOPs with mobile checklists, supply tracking, and supervisor oversight.' },
      { step: 5, title: 'Monthly Reviews', description: 'KPI dashboards, inspection reports, and improvement plans reviewed with stakeholders.' },
    ],
    testimonials: [
      {
        quote: 'They staff our entire Class A portfolio with consistent crews and deliver dashboards every month that my asset managers rely on.',
        author: 'Kyle Preston',
        role: 'Regional Property Manager, Northridge Equity',
      },
      {
        quote: 'Anderson took over after another vendor failed an audit. Within 30 days we hit 98% compliance and tenant complaints vanished.',
        author: 'Taylor Singh',
        role: 'General Manager, Riverfront Plaza',
      },
    ],
    relatedServices: ['office-cleaning', 'day-porter', 'floor-care'],
    faqs: [
      { question: 'Can you manage consumable supplies?', answer: 'Yes. We forecast and restock paper, soap, liners, and specialty products so your team never scrambles last minute.' },
      { question: 'How do you handle tenant moves or expansions?', answer: 'Our scalable staffing plan includes floaters who can support build-outs or new tenant punch lists without missing daily routes.' },
      { question: 'Do you provide reporting for ownership groups?', answer: 'Monthly business reviews include inspection scores, ticket response times, sustainability metrics, and recommendations.' },
      { question: 'Is emergency coverage included?', answer: 'Current janitorial clients receive 24/7 dispatch with a two-hour response target for urgent cleaning incidents.' },
      { question: 'Can you work union or non-union buildings?', answer: 'We operate in both environments and align with your labor agreements or vendor guidelines.' },
    ],
    blogPosts: [getBlogPost('commercial-cleaning-frequency-guide'), getBlogPost('choosing-commercial-cleaning-company')],
    highlights: ['Portfolio scale', 'Dedicated account manager', 'Digital QA', '24/7 dispatch'],
    metaTitle: 'Janitorial Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'Scalable janitorial programs for Western MA & Northern CT. Routine cleaning, supply management, and KPI reporting for complex facilities.',
    schemaDescription: 'Comprehensive janitorial services delivering routine cleaning, supply management, and KPI reporting for commercial properties across Western Massachusetts and Northern Connecticut.',
    availability: 'all',
  },
  'floor-care': {
    slug: 'floor-care',
    title: 'Floor Care & Maintenance',
    h1: 'Professional Floor Care Services — Strip, Wax, Buff & More',
    icon: Zap,
    tagline: 'Latest equipment and eco-friendly products extend the life of your floors.',
    heroDescription:
      'Dedicated floor technicians providing VCT stripping, waxing, burnishing, carpet extraction, and concrete polishing with the latest equipment.',
    heroImage: hero('floor-care', 'Commercial floor care technician burnishing floors in Massachusetts facility'),
    differentiator: 'Latest auto-scrubbers, burnishers, and eco-friendly products keep finishes protected.',
    overview: [
      'Foot traffic, salts, and rolling loads punish commercial floors all year. Our technicians specialize in restoring and maintaining VCT, LVT, terrazzo, polished concrete, and commercial carpet so your building keeps a crisp, high-value appearance. We start with a floor assessment that documents chemistry history, wear patterns, and manufacturer recommendations. Samples are tested in inconspicuous areas to confirm compatibility before we service any broad area.',
      'For resilient surfaces, we employ controlled stripping techniques backed by HEPA filtration and auto-scrubbers to remove soils without harming the substrate. New polymer is laid with laser-leveled applicators for even coverage, then buffed or burnished to match your desired gloss level. Carpet care programs combine low-moisture encapsulation for interim maintenance with periodic hot-water extraction to pull out stubborn soils without over-wetting the backing.',
      'Industrial and warehouse floors require a different approach, so we deploy concrete grinders, diamond pads, and densifiers to eliminate wear lanes while keeping production schedules intact. All work is performed after hours or during scheduled shutdowns, and we barricade spaces with safety signage so occupants remain protected. When the service is complete, you receive a maintenance calendar that details recoating intervals, spot treatment instructions, and recommended entry matting to maximize longevity.',
    ],
    benefits: [
      'Extends the life of hard floors and carpet investment',
      'Improves slip resistance and safety',
      'Enhances brand image with consistent gloss levels',
      'Performed after hours to avoid business disruption',
      'Eco-friendly chemistry available upon request',
      'Detailed maintenance calendar provided after service',
      'Certified technicians for specialized equipment',
    ],
    industries: ['Retail facilities', 'Healthcare campuses', 'Education buildings', 'Industrial plants'],
    process: [
      { step: 1, title: 'Floor Assessment', description: 'Inspect substrates, coatings, and traffic loads to determine treatment needs.' },
      { step: 2, title: 'Treatment Plan', description: 'Select chemistry, equipment, and scheduling windows tailored to your facility.' },
      { step: 3, title: 'Preparation', description: 'Mask sensitive areas, post signage, and pre-clean surfaces for optimal adhesion.' },
      { step: 4, title: 'Service Execution', description: 'Perform strip, wax, buff, extraction, or polishing with specialized crews.' },
      { step: 5, title: 'Maintenance Schedule', description: 'Provide ongoing care plan, spot treatment guide, and recoat timing.' },
    ],
    testimonials: [
      {
        quote: 'Our retail center floors finally look uniform again. The crew knocked out 45,000 square feet overnight and left us with a plan to keep the shine.',
        author: 'Brooke Alston',
        role: 'General Manager, Westfield Commons',
      },
      {
        quote: 'They restored our manufacturing corridors without impacting production. OSHA loved their signage and containment.',
        author: 'Luis Treviño',
        role: 'Facilities Engineer, Pioneer Plastics',
      },
    ],
    relatedServices: ['janitorial-services', 'post-construction', 'window-cleaning'],
    faqs: [
      { question: 'How often should VCT be stripped and waxed?', answer: 'High-traffic areas typically need a full strip and recoat annually with interim scrubs and recoats every quarter.' },
      { question: 'Can you work overnight or weekends?', answer: 'Yes. Most floor projects happen after hours so finishes cure before occupants return.' },
      { question: 'Do you handle carpet extraction?', answer: 'We offer low-moisture and hot-water extraction options along with stain treatment and protective coatings.' },
      { question: 'What if my previous vendor damaged the floor?', answer: 'We test chemistry in small areas and can perform remediation such as blending, leveling, or polish restoration to correct issues.' },
      { question: 'Are your products eco-friendly?', answer: 'We stock Green Seal and low-VOC finishes plus water-based sealers for sensitive environments.' },
    ],
    blogPosts: [getBlogPost('floor-care-maintenance-tips'), getBlogPost('benefits-green-cleaning-workplace')],
    highlights: ['Strip & wax', 'Carpet extraction', 'Concrete polishing', 'Eco-friendly options'],
    metaTitle: 'Floor Care Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'Strip, wax, buff, carpet extraction, and concrete polishing for Western MA & Northern CT facilities. Technicians use modern gear and eco products.',
    schemaDescription: 'Professional floor care including strip and wax, carpet extraction, and concrete polishing for facilities throughout Western Massachusetts and Northern Connecticut.',
    availability: 'contracted',
  },
  'window-cleaning': {
    slug: 'window-cleaning',
    title: 'Window Cleaning',
    h1: 'Commercial Window Cleaning Services',
    icon: Square,
    tagline: 'Insured interior and exterior window cleaning with high-rise capability.',
    heroDescription:
      'Interior and exterior window cleaning programs capable of servicing mid-rise and select high-rise buildings with safety-first crews.',
    heroImage: hero('window-cleaning', 'Commercial window cleaning team detailing glass in Western Massachusetts'),
    differentiator: 'Fully insured for high-rise work with documented safety plans.',
    overview: [
      'Curb appeal matters, which is why we combine rope-descent, water-fed poles, and lift-based window cleaning to keep glass immaculate from lobby sidelights to penthouse curtainwalls. Our safety officer reviews anchor points, parapet heights, and tie-back certifications before every project, and we submit site-specific safety plans with weather monitoring so building engineers stay informed. Interior teams wear shoe covers, protect flooring, and work during low-traffic hours to prevent disruption.',
      'Retail storefronts and medical facilities also leverage our detailing service to remove fingerprints, mineral deposits, and seasonal grime from vestibules, glass partitions, and automatic doors. We use purified water systems that leave no spotting along with microfiber detailing cloths for mullions and framing. When combined with pressure washing, awning cleaning, or hard-water removal, your entrances stay inviting year-round.',
      'Because we are fully insured for elevated work, risk managers and insurers trust us with multi-story assignments. Tenants appreciate the proactive communication—every project receives a notification schedule, barricade plan, and final inspection checklist. Whether you need quarterly service for a corporate campus or monthly touch-ups for a retail flagship, we maintain consistent crews who know your building and coordinate closely with security.',
    ],
    benefits: [
      'Interior and exterior glass cleaned in one visit',
      'High-rise insurance and safety documentation provided',
      'Water-fed pole systems eliminate spotting',
      'Optional pressure washing, awning, and signage cleaning',
      'Work completed during low-traffic periods',
      'Detailed inspection reports with photos',
      'Seasonal schedules available (monthly, quarterly, biannual)',
    ],
    industries: ['Office buildings', 'Retail storefronts', 'Medical facilities'],
    process: [
      { step: 1, title: 'Site Survey', description: 'Evaluate access points, anchor certification, and equipment needs.' },
      { step: 2, title: 'Safety Plan', description: 'Draft site-specific safety and weather monitoring plan for approvals.' },
      { step: 3, title: 'Scheduling & Notifications', description: 'Coordinate timing with tenants, security, and parking teams.' },
      { step: 4, title: 'Cleaning Execution', description: 'Use rope descent, lifts, or water-fed poles to clean all glass safely.' },
      { step: 5, title: 'Quality Inspection', description: 'Perform walkthrough, document results, and schedule next service.' },
    ],
    testimonials: [
      {
        quote: 'Our lobby glass finally stays streak-free and the crews communicate arrival times clearly.',
        author: 'Cameron Ortiz',
        role: 'Property Administrator, Monarch Tower',
      },
      {
        quote: 'They handle our campus interior glass overnight so we never disturb patients. Their pressure washing team keeps our facade spotless too.',
        author: 'Emily Donahue',
        role: 'Director of Facilities, Hartford Medical Arts',
      },
    ],
    relatedServices: ['floor-care', 'day-porter', 'office-cleaning'],
    faqs: [
      { question: 'Do you carry high-rise insurance?', answer: 'Yes. We maintain specialized insurance, documented rescue plans, and annual anchor inspections for elevated work.' },
      { question: 'How do you minimize tenant disruption?', answer: 'We schedule interior services outside peak hours, provide barricades, and coordinate with security for elevator usage.' },
      { question: 'Can you combine window cleaning with pressure washing?', answer: 'Absolutely. We often wash facades, walkways, and awnings during the same mobilization.' },
      { question: 'How often should commercial windows be cleaned?', answer: 'Most facilities follow quarterly exterior and monthly interior schedules, but retail facades often require monthly exterior service.' },
      { question: 'Do you clean skylights or glass partitions?', answer: 'Yes. We service skylights, solariums, interior glass walls, sneeze guards, and specialty glazing.' },
    ],
    blogPosts: [getBlogPost('choosing-commercial-cleaning-company'), getBlogPost('benefits-green-cleaning-workplace')],
    highlights: ['High-rise capable', 'Purified water systems', 'Safety-certified teams', 'Pressure washing add-ons'],
    metaTitle: 'Window Cleaning Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'Interior/exterior commercial window cleaning with high-rise coverage for Western MA & Northern CT. Streak-free finishes plus safety-first crews.',
    schemaDescription: 'Commercial window cleaning with insured crews, purified water systems, and safety plans for facilities throughout Western Massachusetts and Northern Connecticut.',
    availability: 'contracted',
  },
  'post-construction': {
    slug: 'post-construction',
    title: 'Post-Construction Cleaning',
    h1: 'Post-Construction Cleaning Services',
    icon: HardHat,
    tagline: 'Rough clean, final detail, debris removal, and surface prep with fast scheduling.',
    heroDescription:
      'Fast-turnaround rough and final cleans that remove dust, debris, and punch-list residue so spaces are truly move-in ready.',
    heroImage: hero('post-construction', 'Post-construction cleaning crew detailing a renovated commercial space'),
    differentiator: 'Fast mobilization delivers move-in ready spaces without delaying turnover.',
    overview: [
      'General contractors and property developers call Anderson when they need turnover-ready spaces without stressing site supers or risking delays. We join your project timeline early, review punch lists, and coordinate around inspections or flooring milestones. Our crews can perform rough cleans during framing and drywall, intermediate cleans before fixture installation, and final detailing once the trades clear out.',
      'Surface protection and scratch-free cleaning are non-negotiable. We unbox appliances carefully, remove stickers, detail millwork, and polish glass without leaving swirl marks. Dust mitigation guards HVAC equipment, IT racks, and medical fixtures from drywall residue, while our team wipes ducts, trims, ceiling grids, and lighting to remove the last traces of construction dust. If you need exterior services, we include pressure washing, window cleaning, and grounds debris removal in the same mobilization.',
      'Fast turnaround differentiates us. We can mobilize multiple crews for large footprints, run double shifts when schedules compress, and submit completion photos alongside vendor lien releases. Property managers love the final detail pass because we label deficiencies, resolve them immediately, and walk the space with your client before handoff so there are no surprises on grand opening day.',
    ],
    benefits: [
      'Coordinated with GC schedules to avoid conflicts',
      'HEPA vacuuming removes fine dust from vents and finishes',
      'Sticker removal and glass polishing included',
      'Debris hauling and dumpster coordination available',
      'Final punch support with immediate touch-ups',
      'Flexible crews for large square footage or phased delivery',
      'Post-project maintenance plans available',
    ],
    industries: ['Construction companies', 'Property developers', 'Renovation contractors'],
    process: [
      { step: 1, title: 'Walkthrough & Scope', description: 'Review punch lists, safety rules, and timeline with GC or owner rep.' },
      { step: 2, title: 'Scope Agreement', description: 'Define rough, intermediate, and final clean deliverables plus debris hauling.' },
      { step: 3, title: 'Phase 1 Rough Clean', description: 'Remove bulk debris, sweep, and prep surfaces for inspections.' },
      { step: 4, title: 'Phase 2 Detail Clean', description: 'Detail fixtures, glass, restrooms, and millwork after trades demobilize.' },
      { step: 5, title: 'Final Inspection', description: 'Walk with client, address touch-ups, and deliver documentation.' },
    ],
    testimonials: [
      {
        quote: 'They turned a chaotic turnover into a flawless handoff. The client was able to do furniture installs the next morning.',
        author: 'Victor Lane',
        role: 'Project Executive, Greenstone Builders',
      },
      {
        quote: 'Anderson handled rough, pre-punch, and final clean on our clinic expansion. Their documentation made closeout painless.',
        author: 'Stephanie Vega',
        role: 'Owner Rep, River Valley Health System',
      },
    ],
    relatedServices: ['floor-care', 'window-cleaning', 'emergency-cleaning'],
    faqs: [
      { question: 'How fast can you mobilize?', answer: 'We can be on-site within 48 hours for most projects and often faster for existing GC partners.' },
      { question: 'Do you supply lifts or ladders?', answer: 'Yes. Crews arrive with lifts, ladders, PPE, and HEPA equipment so you only coordinate site access.' },
      { question: 'Can you handle phased turnovers?', answer: 'We routinely stage multi-phase cleans so tenants can move in as soon as each floor is ready.' },
      { question: 'Do you provide waste hauling?', answer: 'We coordinate dumpsters or haul debris off-site per your plan and recycle when possible.' },
      { question: 'What about warranty-safe cleaning products?', answer: 'We follow manufacturer instructions for specialty flooring, windows, and fixtures to keep warranties intact.' },
    ],
    blogPosts: [getBlogPost('commercial-cleaning-frequency-guide'), getBlogPost('floor-care-maintenance-tips')],
    highlights: ['Rough + final cleaning', 'HEPA dust removal', 'Sticker + film removal', 'Fast mobilization'],
    metaTitle: 'Post-Construction Cleaning | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'Rough and final post-construction cleaning for Western MA & Northern CT. Fast mobilization, debris removal, and move-in ready detailing.',
    schemaDescription: 'Full-service post-construction cleaning with rough, detail, and final phases for commercial projects throughout Western Massachusetts and Northern Connecticut.',
    availability: 'contracted',
  },
  'emergency-cleaning': {
    slug: 'emergency-cleaning',
    title: 'Emergency Cleaning',
    h1: '24/7 Emergency Cleaning Response Services',
    icon: AlertTriangle,
    tagline: 'Water damage, biohazard cleanup, and urgent sanitization with guaranteed response windows.',
    heroDescription:
      'Certified rapid-response crews available day or night for water damage, biohazard cleanup, and urgent sanitization.',
    heroImage: hero('emergency-cleaning', 'Emergency cleaning team deploying water extraction equipment in Massachusetts'),
    differentiator: 'Certified technicians on call 24/7 with guaranteed response windows.',
    overview: [
      'Flooded restrooms, illness outbreaks, and vandalism events demand immediate attention. Anderson maintains 24/7 emergency crews equipped with extraction units, antimicrobial treatments, PPE, and negative-air containment so we can stabilize your facility fast. Dispatchers answer the phone live, gather incident photos, and mobilize the correct team while you notify stakeholders.',
      'Our response workflow mirrors disaster restoration best practices. Upon arrival we conduct a rapid assessment, stop the source if possible, and document damages with geo-tagged photos. Water events receive extraction, dehumidification, and antimicrobial treatment to prevent secondary damage. Biohazard calls use OSHA-compliant PPE, color-coded disposal, and EPA-registered disinfectants with documented dwell times so you have proof for insurers or regulators.',
      'After the immediate hazard is neutralized, we transition into restorative cleaning and odor mitigation so businesses can reopen quickly. We coordinate with your janitorial or facility team to handle equipment rentals, air scrubbers, and rebuild partners, and we leave behind a report summarizing work performed, chemicals used, and next steps. Keeping you audit-ready—even in an emergency—is what separates Anderson from ad-hoc vendors.',
    ],
    benefits: [
      '24/7 live dispatch center',
      'Two-hour response for existing clients, four for new',
      'Water extraction, antimicrobial, and drying equipment',
      'Biohazard-certified crews with proper PPE',
      'Detailed incident reports for insurance and regulators',
      'Discretion and confidentiality for sensitive events',
      'Can transition into ongoing janitorial or porter coverage',
    ],
    industries: ['Corporate campuses', 'Healthcare practices', 'Industrial facilities', 'Education'],
    process: [
      { step: 1, title: 'Emergency Call', description: '24/7 hotline documents the incident with photos and scope details.' },
      { step: 2, title: 'Rapid Assessment', description: 'On-site lead evaluates hazards, isolates areas, and designs remediation plan.' },
      { step: 3, title: 'Mobilization', description: 'Deploy extraction gear, negative air, or specialized PPE based on incident.' },
      { step: 4, title: 'Remediation', description: 'Execute cleaning, sanitization, and waste removal while documenting chemicals.' },
      { step: 5, title: 'Documentation & Follow-Up', description: 'Deliver service report, advise on rebuild, and schedule preventive steps.' },
    ],
    testimonials: [
      {
        quote: 'A sprinkler head failed at midnight. Anderson had a team onsite in 90 minutes and prevented expensive drywall damage.',
        author: 'Chelsea Abrams',
        role: 'Facilities Director, Silverline Financial',
      },
      {
        quote: 'Their biohazard crew handled a lab spill quickly and quietly. Documentation satisfied our insurer the next morning.',
        author: 'Dr. Neil Park',
        role: 'Operations Lead, MassBio Research Co-op',
      },
    ],
    relatedServices: ['janitorial-services', 'post-construction', 'day-porter'],
    faqs: [
      { question: 'What is your response time?', answer: 'Existing clients see crews onsite within two hours. New customers are typically scheduled within four hours across Western MA and Northern CT.' },
      { question: 'Do you work with insurance adjusters?', answer: 'Yes. We provide documentation, photos, and chemical logs to simplify claims.' },
      { question: 'Can you help after the emergency?', answer: 'We transition into restoration cleaning, odor control, and ongoing janitorial once the site is stable.' },
      { question: 'Are technicians certified?', answer: 'Team members carry IICRC water restoration and biohazard certifications and receive annual refreshers.' },
      { question: 'Will you coordinate with other vendors?', answer: 'We work alongside plumbers, electricians, and GC partners to ensure remediation stays on schedule.' },
    ],
    blogPosts: [getBlogPost('medical-facility-cleaning-standards'), getBlogPost('office-cleaning-checklist-flu-season')],
    highlights: ['24/7 dispatch', 'Water + biohazard remediation', 'Documentation for insurance', 'Certified technicians'],
    metaTitle: 'Emergency Cleaning Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: '24/7 emergency cleaning across Western MA & Northern CT. Water damage, biohazard cleanup, and urgent sanitization with rapid response.',
    schemaDescription: 'Emergency cleaning and sanitization with certified crews providing rapid response across Western Massachusetts and Northern Connecticut.',
    availability: 'all',
    responseTimeNote: 'Existing clients: 2-hour response. New requests: 4 hours.',
  },
  'day-porter': {
    slug: 'day-porter',
    title: 'Day Porter Services',
    h1: 'Day Porter & Matron Services for Facilities',
    icon: UserCheck,
    tagline: 'Professional staff delivering real-time response and elevated guest experiences.',
    heroDescription:
      'Uniformed porters who deliver continuous cleaning, restocking, and guest support so your facility shines between nightly services.',
    heroImage: hero('day-porter', 'Day porter greeting visitors in a Massachusetts office lobby'),
    differentiator: 'Uniformed, hospitality-trained staff provide real-time response and professional presence.',
    overview: [
      'High-profile facilities require someone on the floor during business hours, which is where our day porters excel. They greet visitors, tidy lobbies, service restrooms, restock pantries, and respond to spills the moment they happen. Before assignment, we map your building’s high-traffic areas, special events calendar, and executive preferences so our porter acts as an extension of your team.',
      'Porters operate from mobile checklists in our app, ensuring restrooms receive hourly checks, hand sanitizer stations stay full, and meeting rooms reset after every use. They coordinate with property management to address deliveries, elevator smudges, and VIP visits, and they log everything in real time so you can review metrics anytime. Because Anderson handles both day and night shifts, communication between porters and nightly crews is seamless.',
      'Facilities managers appreciate the real-time intel porters provide. They flag HVAC leaks, security concerns, and supply shortages instantly, preventing minor issues from escalating. Whether you manage a Class A lobby, medical building, or private school campus, our porter program layers accountability, responsiveness, and hospitality into every hour of the day.',
    ],
    benefits: [
      'Immediate response to spills or guest needs',
      'Professional uniforms and hospitality training',
      'Hourly restroom and lobby refreshes',
      'Inventory tracking and restocking',
      'Bridges communication between facility staff and night crews',
      'Custom scripts for greeting visitors or VIPs',
      'Scales for multi-building campuses',
    ],
    industries: ['Class A offices', 'Medical buildings', 'Educational facilities', 'Municipal campuses'],
    process: [
      { step: 1, title: 'Coverage Assessment', description: 'Identify high-traffic zones, peak hours, and event calendars.' },
      { step: 2, title: 'Porter Placement Plan', description: 'Define schedules, responsibilities, and communication channels.' },
      { step: 3, title: 'Training & Shadowing', description: 'Porters shadow night crews and learn facility-specific SOPs.' },
      { step: 4, title: 'Daily Service Delivery', description: 'Execute mobile checklists, restock supplies, and assist occupants.' },
      { step: 5, title: 'Supervision & Reporting', description: 'Field managers audit performance and deliver weekly summaries.' },
    ],
    testimonials: [
      {
        quote: 'Our lobby porter feels like part of our concierge team. She keeps the space immaculate and updates us instantly when something needs attention.',
        author: 'Dennis Okafor',
        role: 'General Manager, Atlas Center',
      },
      {
        quote: 'During flu season our porter disinfects touchpoints hourly and keeps visitors calm. Facilities leadership noticed the difference immediately.',
        author: 'Rachel Freeman',
        role: 'COO, Hartford Medical Pavilion',
      },
    ],
    relatedServices: ['office-cleaning', 'janitorial-services', 'window-cleaning'],
    faqs: [
      { question: 'Can we customize uniforms?', answer: 'Yes. Porters can wear Anderson uniforms or co-branded attire aligned with your facility.' },
      { question: 'Do porters handle security tasks?', answer: 'While they are not security guards, they monitor for issues, report incidents, and coordinate with your security vendor.' },
      { question: 'How do you cover vacations or sick time?', answer: 'We train backup porters who already know your facility, ensuring seamless coverage.' },
      { question: 'Can porters assist with events?', answer: 'Absolutely. They reset meeting rooms, manage coat checks, and keep catering areas polished.' },
      { question: 'Do porters restock consumables?', answer: 'Yes. They track and restock restroom, pantry, and sanitizer supplies throughout the day.' },
    ],
    blogPosts: [getBlogPost('office-cleaning-checklist-flu-season'), getBlogPost('commercial-cleaning-frequency-guide')],
    highlights: ['On-site staff', 'Hourly restroom refreshes', 'Visitor support', 'Real-time reporting'],
    metaTitle: 'Day Porter Services | Commercial Cleaning Western MA | Anderson',
    metaDescription: 'Day porter programs for Western MA & Northern CT deliver real-time cleaning, restocking, and guest support with professional staff.',
    schemaDescription: 'Day porter and matron services offering continuous cleaning support and hospitality-trained staff throughout Western Massachusetts and Northern Connecticut.',
    availability: 'all',
  },
}
