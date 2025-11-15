# SEO Components

Structured data components for enhanced search engine optimization.

## JobPosting Component

Renders JSON-LD structured data for job postings to enable Google Job Search rich results.

### Usage

```tsx
import JobPosting, { JobPostingData } from '@/components/seo/JobPosting'
import { getActiveJobs } from '@/lib/data/jobOpenings'

export default function ApplyPage() {
  const jobs = getActiveJobs()

  return (
    <>
      {/* Render JobPosting schema for each active job */}
      {jobs.map((job, index) => (
        <JobPosting key={index} job={job} />
      ))}
      
      {/* Your page content */}
      <h1>Join Our Team</h1>
      {/* ... */}
    </>
  )
}
```

### Job Data Structure

```typescript
const exampleJob: JobPostingData = {
  title: 'Commercial Cleaning Specialist',
  description: 'Full job description here...',
  datePosted: '2025-01-15', // ISO 8601 format
  validThrough: '2025-04-15', // Optional: when job expires
  employmentType: 'FULL_TIME', // FULL_TIME | PART_TIME | CONTRACTOR | TEMPORARY | INTERN
  jobLocation: {
    address: {
      streetAddress: '123 Main St', // Optional
      addressLocality: 'Springfield',
      addressRegion: 'MA',
      postalCode: '01103', // Optional
      addressCountry: 'US',
    },
    remote: false, // Set true for remote positions
  },
  baseSalary: { // Optional
    currency: 'USD',
    value: {
      minValue: 18,
      maxValue: 22,
      unitText: 'HOUR', // HOUR | DAY | WEEK | MONTH | YEAR
    },
  },
  applicantLocationRequirements: { // Optional
    name: 'United States',
    addressCountry: 'US',
    addressRegion: 'MA',
  },
  jobBenefits: [ // Optional
    'Health insurance',
    'Paid training',
    'Flexible schedule',
  ],
  qualifications: 'High school diploma...', // Optional
  responsibilities: 'Perform cleaning tasks...', // Optional
  skills: ['Attention to detail', 'Teamwork'], // Optional
}
```

### Adding New Job Openings

1. Edit `lib/data/jobOpenings.ts`
2. Add job object to the `jobOpenings` array
3. Job will automatically appear in Google Job Search
4. Job will be filtered out after `validThrough` date

### Testing

Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results):
1. Deploy your page
2. Enter the URL
3. Verify JobPosting type appears
4. Check for errors/warnings

### SEO Benefits

- Appears in Google Job Search
- Rich results with salary, location, company info
- Increased visibility for job seekers
- Higher quality applicants

### Required Fields

Minimum required fields for Google Job Search:
- `title`
- `description` (min 200 characters)
- `datePosted`
- `employmentType`
- `jobLocation.address`
- `hiringOrganization` (automatically added)

### Best Practices

1. Keep descriptions detailed (300+ words recommended)
2. Update `datePosted` when re-posting
3. Set `validThrough` to auto-expire old listings
4. Include salary if possible (increases applicant quality)
5. Add `jobBenefits` to attract candidates
6. Use specific `skills` and `qualifications`
7. Monitor Google Search Console for warnings

### Resources

- [Google Job Posting Guidelines](https://developers.google.com/search/docs/appearance/structured-data/job-posting)
- [Schema.org JobPosting](https://schema.org/JobPosting)
- [Rich Results Test](https://search.google.com/test/rich-results)
