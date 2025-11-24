# Anderson Cleaning Company - Documentation Index

Complete guide to all documentation in this repository.

## 📋 Quick Navigation

### Core Documentation
- **[README.md](./README.md)** - Project overview, tech stack, getting started
- **[CLAUDE.md](./CLAUDE.md)** - Complete development guide for Claude Code AI
- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** - GitHub Copilot configuration

### Setup & Configuration Guides
Located in `/docs-setup-guides/`:
- **[README.md](./docs-setup-guides/README.md)** - Setup guides overview
- **[DNS_MIGRATION_CHECKLIST.md](./docs-setup-guides/DNS_MIGRATION_CHECKLIST.md)** - Domain migration steps
- **[FORMS_SETUP_GUIDE.md](./docs-setup-guides/FORMS_SETUP_GUIDE.md)** - Complete forms system setup
- **[FORMS_QUICK_SETUP.md](./docs-setup-guides/FORMS_QUICK_SETUP.md)** - Quick start for forms
- **[RESEND_DNS_SETUP.md](./docs-setup-guides/RESEND_DNS_SETUP.md)** - Resend email service DNS configuration
- **[SANITY_CMS_GUIDE.md](./docs-setup-guides/SANITY_CMS_GUIDE.md)** - Sanity CMS setup and usage
- **[SUPABASE_SETUP.md](./docs-setup-guides/SUPABASE_SETUP.md)** - Supabase database configuration

### Brand & Design
Located in `/public/`:
- **[OG-IMAGE-GUIDE.md](./public/OG-IMAGE-GUIDE.md)** - **Official brand colors (Pantone specs)** + Open Graph image specs
- **[brand/README.md](./public/brand/README.md)** - Brand asset package documentation

### Component Documentation
- **[components/README.md](./components/README.md)** - Component architecture and patterns

### Archive
- **[ARCHIVE/README.md](./ARCHIVE/README.md)** - Historical documentation and completed reports

---

## 🎨 Official Brand Colors (Pantone Specifications)

**Found in:** `public/OG-IMAGE-GUIDE.md`

- **Deep Blue**: #002A86 (Pantone 2747C) - Primary brand color
- **Bright Blue**: #0077D9 (Pantone 3005C) - Accents & CTAs
- **Red**: #C8102E (Pantone 193C) - Alerts & errors
- **White**: #FFFFFF

---

## 📁 Documentation Organization

### Active Documentation (Root Level)
Files that are actively maintained and referenced:
```
├── README.md                          # Main project readme
├── CLAUDE.md                          # Claude Code development guide
├── DOCUMENTATION_INDEX.md             # This file
└── .github/
    └── copilot-instructions.md        # GitHub Copilot config
```

### Setup Guides (Organized Folder)
All setup and configuration guides in one location:
```
docs-setup-guides/
├── README.md                          # Guides overview
├── DNS_MIGRATION_CHECKLIST.md         # Domain migration
├── FORMS_SETUP_GUIDE.md               # Forms system (detailed)
├── FORMS_QUICK_SETUP.md               # Forms system (quick start)
├── RESEND_DNS_SETUP.md                # Email DNS setup
├── SANITY_CMS_GUIDE.md                # CMS configuration
└── SUPABASE_SETUP.md                  # Database setup
```

### Brand Documentation (Public Assets)
Design and brand specifications:
```
public/
├── OG-IMAGE-GUIDE.md                  # OFFICIAL COLORS + OG images
└── brand/
    └── README.md                      # Brand assets guide
```

### Historical Archive
Completed reports and historical documentation:
```
ARCHIVE/
├── README.md                          # Archive overview
├── completed-reports/                 # Verification & validation reports
│   ├── ai_handover.md
│   ├── FIXES_COMPLETED_SUMMARY.md
│   ├── FOLDER_MAP.md
│   ├── FORM_VERIFICATION_REPORT.md
│   ├── FRONTEND_VERIFICATION_REPORT.md
│   └── LOCATION_PAGES_SEO_VALIDATION.md
└── old-archive/                       # Previous archive folder
    └── _ARCHIVE_FOR_REVIEW/
```

---

## 🔍 Finding What You Need

### "I need to set up..."
→ Go to `/docs-setup-guides/` and check the README

### "What are the official brand colors?"
→ `public/OG-IMAGE-GUIDE.md` (lines 3-7)

### "How do I develop with Claude Code?"
→ `CLAUDE.md` - comprehensive development guide

### "I want to understand the project structure"
→ `README.md` - project overview and architecture

### "Where are completed verification reports?"
→ `ARCHIVE/completed-reports/`

---

## 📝 Documentation Standards

### File Naming Conventions
- **UPPERCASE_WITH_UNDERSCORES.md** - Project documentation (README.md, CLAUDE.md)
- **lowercase-with-dashes.md** - Component/feature docs
- **Category-Name.md** - Mixed case for guides

### Location Guidelines
- **Root level:** Core project documentation only
- **docs-setup-guides/:** All setup and configuration guides
- **public/:** Design specs and public asset documentation
- **ARCHIVE/:** Historical and completed documentation
- **Component folders:** Component-specific README files

### Maintenance
- Keep active documentation in appropriate folders
- Archive completed reports in `/ARCHIVE/completed-reports/`
- Update this index when adding new documentation
- Review and update documentation quarterly

---

## 📅 Last Updated

**Date:** 2025-11-24
**Maintainer:** Anderson Cleaning Company Development Team
**Organization by:** Claude Code Assistant

---

## 🚀 Quick Start

New to the project? Read these in order:
1. [README.md](./README.md) - Understand the project
2. [CLAUDE.md](./CLAUDE.md) - Learn development patterns
3. [docs-setup-guides/README.md](./docs-setup-guides/README.md) - Configure your environment
4. [public/OG-IMAGE-GUIDE.md](./public/OG-IMAGE-GUIDE.md) - Learn brand colors
