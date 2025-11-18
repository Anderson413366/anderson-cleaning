# Supabase Tables in Use

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `contact_submissions` | Stores submissions from the `/contact` form. | `name`, `email`, `phone`, `company`, `message`, `source_page`, `ip_address`, `user_agent` |
| `quote_requests` | Records detailed quote requests submitted via `/quote` and hero forms. | `company_name`, `contact_name`, `email`, `phone`, `facility_type`, `square_footage`, `services[]`, `cleaning_frequency`, `special_requirements`, `metadata columns` |
| `newsletter_subscriptions` | Tracks newsletter signups from any page. | `email`, `source_page`, `ip_address`, `user_agent`, `status` |
| `career_applications` | Logs `/careers` applications (metadata only—files are emailed). | `name`, `email`, `phone`, `position`, `cover_letter`, `resume_filename`, `source_page`, `ip_address`, `user_agent` |

All inserts use `lib/forms/submissions.ts` so schema changes only need to be updated in one place.
