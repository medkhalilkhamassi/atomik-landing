# Free Analytics & Attribution Guide

This project implements a "free analytics" system using Netlify Forms hidden fields. This allows us to track where users are coming from (UTMs, Referrers) and which buttons they clicked (CTA Source) without needing external analytics tools like Google Analytics or Mixpanel.

## How it Works

1.  **Attribution Extraction**: On page load, `src/lib/attribution.ts` extracts:
    *   UTM parameters (`utm_source`, `utm_medium`, etc.) from the URL.
    *   `referrer` (where they came from before landing here).
    *   `landing_path` (the current page path).

2.  **CTA Source Tracking**:
    *   When a user clicks a button (e.g., "Join Waitlist" in the Header vs. Hero), we update a `cta_source` state variable.
    *   Values include: `header`, `hero_primary`, `hero_secondary`.

3.  **Data Submission**:
    *   When the form is submitted, these values are passed as hidden form fields.
    *   Netlify captures these fields along with the user's name/email.

## Analyzing Data in Netlify

Go to your Netlify Dashboard -> **Forms**. You will see submissions for `waitlist` and `investor-contact`.

Each submission will now include:

*   **cta_source**: The exact button the user clicked to open the form.
*   **utm_source / utm_medium / utm_campaign**: Ad or campaign tracking data.
*   **referrer**: The URL of the site they visited before yours.
*   **landing_path**: The page they were on when they converted.
*   **submitted_at**: The ISO timestamp of the submission.

### Example Analysis

*   **Filter by Source**: Export the form submissions to CSV. Sort by `utm_source` to see which campaigns are driving the most leads.
*   **Optimize UI**: Compare `cta_source` counts. If `hero_primary` has 100 clicks and `header` has 5, you know the Hero button is your main driver.
