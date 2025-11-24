# Test Artifacts Archive

This directory contains historical test artifacts, reports, and test scripts that are no longer actively needed but preserved for reference.

## Contents

### Test Scripts
- **`test_forms.py`** - Legacy Python script for manual form testing (pre-Playwright)
  - Used for testing quote form submission
  - Replaced by automated Playwright E2E tests in `/tests/e2e/`

### Test Results & Reports
- **`test-results.json`** - Playwright test results from previous runs
- **`test-results/`** - Playwright test artifact folders from individual test runs
  - Contains screenshots, traces, and failure artifacts
  - From tests run on 2025-11-24
- **`playwright-report/`** - HTML test report from Playwright
  - Visual test results dashboard
  - Archived from 2025-11-24 test run

### Coverage Reports
- **`coverage/`** - Jest unit test coverage reports
  - HTML coverage report (index.html)
  - LCOV format reports
  - Clover XML format
  - From test run on 2025-11-19

## Why Archived?

These files are generated artifacts that:
- Take up significant disk space
- Are regenerated with each test run
- Are now properly .gitignored to prevent committing
- Contain historical data that may be useful for reference

## Active Testing

Current test infrastructure:
- **Unit Tests:** Jest with React Testing Library
  - Run: `npm run test:unit`
  - Coverage: Generated fresh in `/coverage/` (gitignored)

- **E2E Tests:** Playwright
  - Run: `npm run test:e2e`
  - Results: Generated fresh in `/test-results/` (gitignored)
  - Reports: Generated in `/playwright-report/` (gitignored)

- **A11y Tests:** Playwright with axe-core
  - Run: `npm run test:a11y`

## .gitignore Updates

These paths are now ignored to prevent future commits:
```gitignore
/coverage
/test-results/
/playwright-report/
```

---

**Archived:** 2025-11-24
**Last Test Run:** 2025-11-24 13:16 UTC
**Archive Reason:** Cleanup of root directory + prevent test artifacts in git
