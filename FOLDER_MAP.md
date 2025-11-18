# 📍 Folder Map - Quick Navigation Guide

> **Find anything fast** - Visual map of where everything lives

---

## 🗺️ MAIN FOLDERS (Top Level)

```
anderson-cleaning/
│
├── 📱 app/                      ← WEBSITE PAGES & ROUTES
├── 🧩 components/               ← REUSABLE UI COMPONENTS  
├── 🛠️ lib/                      ← HELPER CODE & UTILITIES
├── 🎨 styles/                   ← CSS & DESIGN FILES
├── 📄 public/                   ← IMAGES & STATIC FILES
├── 📚 docs-setup-guides/        ← SETUP INSTRUCTIONS
└── 🗑️ _ARCHIVE_FOR_REVIEW/      ← OLD FILES TO DELETE
```

---

## 📱 app/ - All Website Pages

```
app/
├── page.tsx                    ← 🏠 HOME PAGE (main landing)
├── about/page.tsx              ← ℹ️ ABOUT US PAGE
├── services/                   ← 🧹 ALL SERVICES PAGES
│   ├── page.tsx                   (services overview)
│   ├── office-cleaning/
│   ├── floor-carpet-care/
│   └── [slug]/                    (dynamic service pages)
├── industries/                 ← 🏭 INDUSTRY PAGES
├── contact/page.tsx            ← 📞 CONTACT PAGE
├── quote/page.tsx              ← 💰 QUOTE REQUEST FORM
├── testimonials/page.tsx       ← ⭐ CUSTOMER REVIEWS
├── blog/                       ← 📝 BLOG POSTS
├── careers/page.tsx            ← 💼 CAREERS PAGE
├── promotions/page.tsx         ← 🎁 SPECIAL OFFERS
├── faq/page.tsx                ← ❓ FAQ PAGE
└── api/                        ← ⚙️ BACKEND API ROUTES
    ├── contact/route.ts           (contact form handler)
    ├── quote/route.ts             (quote form handler)
    ├── careers/route.ts           (careers form handler)
    └── newsletter/route.ts        (newsletter signup)
```

**When to edit:**
- Change page content → Edit the page.tsx file
- Add new page → Create new folder with page.tsx
- Fix forms → Edit api/[form-name]/route.ts

---

## 🧩 components/ - Reusable UI Pieces

```
components/
├── ui/                         ← BASIC UI ELEMENTS
│   ├── Button.tsx                 (all buttons)
│   ├── Input.tsx                  (form inputs)
│   └── Card.tsx                   (content cards)
├── forms/                      ← FORM COMPONENTS
│   ├── ContactForm.tsx            (contact page form)
│   ├── QuoteForm.tsx              (quote request form)
│   └── NewsletterForm.tsx         (email signup)
├── sections/                   ← PAGE SECTIONS
│   ├── BeforeAfterSlider.tsx      (image comparisons)
│   └── ServiceAreaMap.tsx         (coverage map)
├── Header.tsx                  ← 📍 NAVIGATION BAR
├── Footer.tsx                  ← 📍 FOOTER
└── PromotionalModal.tsx        ← 🎁 POP-UP MODAL
```

**When to edit:**
- Change header/nav → components/Header.tsx
- Change footer → components/Footer.tsx
- Update forms → components/forms/[FormName].tsx
- Add new UI component → Create in ui/

---

## 🛠️ lib/ - Helper Code

```
lib/
├── validation/                 ← FORM VALIDATION RULES
│   └── quote.ts                   (all form schemas)
├── api/                        ← API HELPERS
│   ├── email.ts                   (send emails)
│   ├── rateLimit.ts               (prevent spam)
│   └── sanitize.ts                (clean input data)
├── supabase/                   ← DATABASE CONNECTION
│   ├── client.ts                  (client-side queries)
│   ├── server.ts                  (server-side queries)
│   └── types.ts                   (database types)
├── cms/                        ← CMS (SANITY) CODE
├── seo/                        ← SEO UTILITIES
└── ThemeProvider.tsx           ← 🌙 DARK MODE LOGIC
```

**When to edit:**
- Change form validation → lib/validation/quote.ts
- Fix email sending → lib/api/email.ts
- Update database queries → lib/supabase/

---

## 🎨 styles/ - Design & CSS

```
styles/
└── globals.css                 ← GLOBAL STYLES & THEME
```

**When to edit:**
- Change colors → tailwind.config.ts
- Change global styles → styles/globals.css

---

## 📄 public/ - Static Files

```
public/
├── favicon.ico                 ← BROWSER TAB ICON
├── robots.txt                  ← SEARCH ENGINE RULES
└── images/                     ← IMAGE FILES
```

**When to edit:**
- Add images → Put in public/images/
- Change favicon → Replace public/favicon.ico

---

## 📚 docs-setup-guides/ - Setup Instructions

```
docs-setup-guides/
├── README.md                   ← GUIDE TO GUIDES
├── FORMS_SETUP_GUIDE.md        ← Email & forms setup
├── DNS_MIGRATION_CHECKLIST.md  ← DNS configuration
├── RESEND_DNS_SETUP.md         ← Email DNS records
└── SUP ABASE_SETUP.md          ← Database setup
```

**When to use:**
- Setting up new features
- Configuring services
- Troubleshooting setup issues

---

## 🗑️ _ARCHIVE_FOR_REVIEW/ - Files to Delete

```
_ARCHIVE_FOR_REVIEW/
├── README.md                   ← WHAT'S IN HERE
└── (old files moved here)      ← REVIEW BEFORE DELETING
```

**What to do:**
1. Review each file
2. Decide if you need it
3. Delete when ready
4. This folder is NOT in git

---

## 🔧 CONFIG FILES (Root Level)

| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript settings |
| `tailwind.config.ts` | Design system & colors |
| `next.config.js` | Next.js configuration |
| `.env.local` | Secret keys (NOT in git) |
| `.gitignore` | Files to exclude from git |

---

## 🎯 QUICK FIND

**I want to...**

| Task | Go to |
|------|-------|
| Change homepage | `app/page.tsx` |
| Update navigation | `components/Header.tsx` |
| Fix contact form | `app/api/contact/route.ts` |
| Change colors | `tailwind.config.ts` |
| Add API key | `.env.local` |
| Set up email | `docs-setup-guides/FORMS_SETUP_GUIDE.md` |
| Update services | `app/services/page.tsx` |
| Change footer | `components/Footer.tsx` |

---

**Created:** November 17, 2025
**Purpose:** Easy navigation for neurodivergent developers
