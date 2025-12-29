# Atomik Landing Page — Comprehensive Audit

> **Generated:** 2025-12-29  
> **Purpose:** A reverse-engineered explainer for any new collaborator to understand the landing page end-to-end.

---

## 1) Executive Summary

### What the page is for
The Atomik landing page serves **two primary audiences**:
1. **Waitlist users** — Founders/product people who want early access to Atomik's spec-to-code automation.
2. **Investors** — Stakeholders who want to connect and receive a pitch deck.

### Current conversion paths
1. **Waitlist Flow:** Hero section → "Join Waitlist" button → Animated success overlay → "Enter Waitlist" CTA (currently a placeholder).
2. **Investor Flow:** Hero section → "Investors" button → Investor contact form (First Name, Last Name, Email, Company, Position) → Submit → `console.log` (no backend).

### 5 Strongest Things About the Current Build
| # | Strength |
|---|----------|
| 1 | **Premium visual design** — Dark theme, oklch color system, smooth Framer Motion animations, and polished micro-interactions. |
| 2 | **Clear value proposition** — "Ship real software without the friction" is immediately visible. |
| 3 | **Dual-audience separation** — Hero elegantly splits into waitlist vs investor paths. |
| 4 | **AI agent showcase** — Testimonial slider with personality-driven agent cards is engaging and differentiating. |
| 5 | **Responsive utility components** — `RevealOnScroll`, `SideNavigation`, `TestimonialSlider` are reusable and well-structured. |

### 5 Biggest Risks/Issues
| # | Risk | Category |
|---|------|----------|
| 1 | **No functional waitlist submission** — Forms log to console; no endpoint, no persistence. | Conversion |
| 2 | **No investor form backend** — Contact form data is lost on submit. | Conversion |
| 3 | **Missing analytics/tracking** — No event tracking for CTA clicks, form submissions, or scroll depth. | Tracking |
| 4 | **SEO gaps** — No OG tags, no sitemap, no robots.txt, no structured data. | SEO |
| 5 | **Unused components** — `Hero.tsx`, `Benefits.tsx`, `HowItWorks.tsx`, `Mechanics.tsx`, `Waitlist.tsx` exist but are not rendered. | Maintainability |

---

## 2) Information Architecture & Page Flow

| Order | Section ID | Component | Audience | Primary Message | Primary CTA | Secondary CTA | Next Action |
|-------|------------|-----------|----------|-----------------|-------------|---------------|-------------|
| 1 | `home` | `LetsWorkTogether` | Both | "Ship real software without the friction." | Join Waitlist | Investors | Proceed to success overlay |
| 2 | `manifesto` | `Manifesto` → `SpatialProblemShowcase` | Both | Pain points for Founders & Developers | — | Switcher (Founder/Developer) | Understand the problem |
| 3 | `agents` | `Agents` → `TestimonialSlider` | Both | "Meet Your New Workforce" | Navigation arrows | Thumbnails | Explore agents |
| 4 | `faq` | `FAQ` | Both | Common questions answered | Accordion expand | — | Read answers |
| 5 | — | `Footer` | Both | Brand + contact links | Email link | Social links | External navigation |

### Notes
- **Repetition:** "Join Waitlist" appears in header CTA and hero section.
- **Dead ends:** Footer links (Deck, Twitter, LinkedIn, Privacy, Terms) all point to `#` (non-functional).
- **Missing connective tissue:** No explicit "how it works" flow connecting pain → solution → agents → action.

---

## 3) Component Map & Ownership

### Route: `/` (`src/app/page.tsx`)

```
<main>
├── <SideNavigation />          (src/components/ui/side-navigation.tsx) — stateful, IntersectionObserver
├── <SiteHeader />              (src/components/SiteHeader.tsx) — stateful (scroll + mobile menu)
├── <RevealOnScroll>            (src/components/ui/reveal-on-scroll.tsx) — wrapper
│   └── <LetsWorkTogether />    (src/components/ui/lets-work-section.tsx) — stateful (mode, hover, click)
│       ├── <HeroGeometricBackground />  (src/components/ui/shape-landing-hero.tsx)
│       ├── <SlideTextButton /> x2       (src/components/kokonutui/slide-text-button.tsx)
│       └── <RideBookingForm />          (src/components/ui/ride-booking-form.tsx) — investor form
│           └── <AnimatedFolder />       (src/components/3d-folder.tsx)
├── <RevealOnScroll>
│   └── <Manifesto />           (src/components/Manifesto.tsx) — content-only wrapper
│       └── <SpatialProblemShowcase />  (src/components/spatial-product-showcase.tsx) — stateful
├── <RevealOnScroll>
│   └── <Agents />              (src/components/Agents.tsx) — content-only
│       └── <TestimonialSlider />       (src/components/ui/testimonial-slider.tsx) — stateful
├── <RevealOnScroll>
│   └── <FAQ />                 (src/components/FAQ.tsx) — stateful (accordion)
└── <RevealOnScroll>
    └── <Footer />              (src/components/Footer.tsx) — content-only
```

### Content Location
- **Hardcoded in components:** All copy (headlines, descriptions, FAQ items, agent quotes).
- **No CMS, JSON, or MDX files** for content management.

### Image/Icon Location
- `public/images/` — Agent avatars (mary-v3.png, john-v3.png, etc.), founder/developer personas.
- `public/` — pdf.png, doc.png, ppt.png (investor form folder icons).
- `lucide-react` — All inline icons.

### Global Layout
- `src/app/layout.tsx` — Wraps with Inter font, dark mode (`<html className="dark">`), metadata.

---

## 4) Design System

### Typography
| Element | Implementation |
|---------|----------------|
| Font Family | `Inter` via `next/font/google`, fallback to `Geist, sans-serif` |
| Body | `--font-sans: Geist, sans-serif` |
| Headings | `text-5xl` to `text-8xl`, `font-bold` or `font-light` |
| Body Text | `text-lg`, `text-muted-foreground` |

### Color Palette (Dark Mode Active)
| Token | Value (oklch) | Usage |
|-------|---------------|-------|
| `--background` | `oklch(0 0 0)` | Page background |
| `--foreground` | `oklch(1 0 0)` | Primary text |
| `--primary` | `oklch(1 0 0)` | Buttons, CTAs |
| `--muted-foreground` | `oklch(0.72 0 0)` | Secondary text |
| `--accent` | `oklch(0.32 0 0)` | Hover states |
| `--border` | `oklch(0.26 0 0)` | Borders |
| `--folder-front/back/tab` | oklch warm tones | 3D folder animation |

### Spacing & Layout
- Base spacing: `--spacing: 0.25rem`
- Max-width: `max-w-7xl`, `max-w-6xl`, `max-w-4xl` depending on section
- Breakpoints: Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Scroll snap: `scroll-snap-type: y mandatory` on `<html>`

### Component Styling Approach
- **Tailwind CSS 4** with `@theme inline` custom properties.
- **`cn()` utility** from `@/lib/utils` (clsx + tailwind-merge).
- **No CSS modules or styled-components**.

### Light/Dark Mode
- **Forced dark mode:** `<html lang="en" className="dark">` in layout.
- **No toggle** or user preference detection.

### Animation/Motion
- **Library:** `framer-motion` (v12.23.26) + `motion` package.
- **Usage:** Page transitions (`RevealOnScroll`), testimonial slider, spatial showcase, folder animation, button hovers.
- **Reduced motion:** Not explicitly supported.

---

## 5) Section-by-Section Teardown

### 5.1 Hero / LetsWorkTogether
| Attribute | Detail |
|-----------|--------|
| **File** | `src/components/ui/lets-work-section.tsx` |
| **ID** | `#home` |
| **Layout** | Centered flex, full-viewport height |
| **Headline** | "Ship real software / without the friction." |
| **Subheadline** | "Atomik turns ideas into scoped, test-verified tasks..." |
| **CTAs** | "Join Waitlist" (primary), "Investors" (ghost) |
| **Behavior** | Click → overlay transition → mode-specific view |
| **Waitlist View** | "Automated / The Future" + "Enter Waitlist" button + "Limited Spots" |
| **Investor View** | `<RideBookingForm />` with 3D folder animation |
| **A11y** | Back button has `aria-label`; inputs have `aria-label` |
| **Perf** | Large Framer Motion animation trees |

### 5.2 Manifesto / SpatialProblemShowcase
| Attribute | Detail |
|-----------|--------|
| **File** | `src/components/Manifesto.tsx`, `src/components/spatial-product-showcase.tsx` |
| **ID** | `#manifesto` |
| **Layout** | Full-screen, centered, 800px height container |
| **Purpose** | Dual-perspective pain point showcase (Founder vs Developer) |
| **Switcher** | Bottom pill toggle between "Founder" and "Developer" |
| **Visual** | Large circular persona image with animated rings |
| **Copy** | "The Product Trap" / "The Sales Grind" + descriptions |
| **Stats** | Feature bars (Time Lost, Hiring Risk, Unpaid Admin, Payment Risk) |
| **A11y** | Buttons lack explicit labels; decorative elements lack aria-hidden |

### 5.3 Agents
| Attribute | Detail |
|-----------|--------|
| **File** | `src/components/Agents.tsx`, `src/components/ui/testimonial-slider.tsx` |
| **ID** | `#agents` |
| **Headline** | "Meet Your New Workforce" |
| **Layout** | 3-column grid (meta, image, text) |
| **Data** | 6 agents: Mary, John, Sally, Winston, Murat, Amelia |
| **Images** | `/images/{name}-v3.png` (2-2.6MB each!) |
| **Navigation** | Prev/Next buttons, thumbnail clicks, autoplay (5s) |
| **A11y** | Thumbnail buttons have `aria-label`; navigation buttons have `aria-label` |
| **Perf** | Images are unoptimized, very large (2MB+ each) |

### 5.4 FAQ
| Attribute | Detail |
|-----------|--------|
| **File** | `src/components/FAQ.tsx` |
| **ID** | `#faq` |
| **Headline** | "Frequently Asked Questions" |
| **Items** | 6 accordion items |
| **Behavior** | Click to expand, single-select (no exclusive collapse) |
| **A11y** | Button has semantic `<button>`, focus outline hidden |

### 5.5 Footer
| Attribute | Detail |
|-----------|--------|
| **File** | `src/components/Footer.tsx` |
| **Layout** | 3-column flex (brand, links, contact) |
| **Links** | Deck (#), Twitter (#), LinkedIn (#), Privacy (#), Terms (#), Email (mailto) |
| **Copy** | "ATOMIK / Specs In → Code Out." + copyright |
| **A11y** | Links are semantic `<a>` |

---

## 6) Waitlist Capture Implementation

### Current State: **Non-Functional**

| Attribute | Detail |
|-----------|--------|
| **Form Location** | Inside `LetsWorkTogether` overlay (waitlist mode) |
| **Fields** | None visible — the "Enter Waitlist" button triggers `handleFinalAction()` |
| **Submission** | `console.log("Action: waitlist")` — no actual form or API call |
| **Validation** | None |
| **Endpoint** | None |
| **Anti-spam** | None |
| **Storage** | None |
| **Success UX** | None (button click logs to console) |

### Failure Mode Table
| Scenario | Behavior |
|----------|----------|
| Network fails | N/A (no network call) |
| Endpoint 4xx/5xx | N/A |
| Duplicate email | N/A |
| Invalid input | N/A |
| Slow response | N/A |

### Note
`src/components/Hero.tsx` contains a **separate, unused** email form with an `<input type="email">` and "Join Waitlist" button, but it's not rendered in `page.tsx`.

---

## 7) Investor Funnel Implementation

### Current State: **Partially Implemented (No Backend)**

| Attribute | Detail |
|-----------|--------|
| **Form Location** | `src/components/ui/ride-booking-form.tsx` |
| **Triggered By** | Clicking "Investors" in hero |
| **Fields** | First Name, Last Name, Email, Company, Position |
| **Validation** | None (no required attributes, no pattern matching) |
| **Submission** | `onSearch({ firstName, lastName, email, company, position })` → `handleInvestorSearch()` → `console.log()` |
| **Endpoint** | None |
| **Success UX** | None |
| **Visual** | 3D animated folder with PDF/Doc/PPT icons |
| **Deck Link** | Not present in form; Footer has non-functional "Deck" link |

### Investor Readiness Info
| Element | Present | Location |
|---------|---------|----------|
| Team | Partially (agent personas) | Agents section |
| Market | Implied | Manifesto section |
| Traction | No | — |
| Roadmap | No | — |
| Financials | No | — |

### Gaps
- No downloadable pitch deck
- No Calendly or meeting booking
- No traction metrics
- Form data is not persisted

---

## 8) Tech Stack & Project Structure

| Category | Detail |
|----------|--------|
| **Framework** | Next.js 16.1.1 (App Router) |
| **React** | 19.2.3 |
| **Styling** | Tailwind CSS 4, `tw-animate-css` |
| **Animation** | Framer Motion 12.23.26, `motion` package |
| **Icons** | Lucide React, Tabler Icons |
| **Utilities** | clsx, tailwind-merge, class-variance-authority |
| **Build Output** | Static export (`output: 'export'`) |
| **Deployment** | Netlify (`.netlify/state.json` present) |
| **TypeScript** | 5.x |
| **Linting** | ESLint 9, eslint-config-next |
| **React Compiler** | Enabled (`reactCompiler: true`) |

### Project Structure
```
atomik-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main route
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Design tokens
│   │   └── favicon.ico
│   ├── components/
│   │   ├── *.tsx             # Section components
│   │   ├── ui/               # Reusable UI components
│   │   └── kokonutui/        # Third-party adapted component
│   └── lib/
│       └── utils.ts          # cn() utility
├── public/
│   ├── images/               # Agent/persona images
│   └── *.png, *.svg          # Icons, placeholders
├── package.json
├── next.config.ts
└── tailwind.config / postcss.config.mjs
```

---

## 9) Analytics, Tracking, and SEO

### Analytics
| Attribute | Status |
|-----------|--------|
| **Provider** | None |
| **Events Tracked** | None |

### SEO
| Attribute | Status | Location |
|-----------|--------|----------|
| **Title** | ✅ "Atomik \| Specs In → Code Out" | `layout.tsx` metadata |
| **Description** | ✅ Present | `layout.tsx` metadata |
| **OG Tags** | ❌ Missing | — |
| **Twitter Cards** | ❌ Missing | — |
| **Sitemap** | ❌ Missing | — |
| **Robots.txt** | ❌ Missing | — |
| **Schema.org** | ❌ Missing | — |
| **Canonical** | ❌ Missing | — |

### Missing Event Coverage
- Waitlist submit success/failure
- Investor form submit
- CTA clicks (Join Waitlist, Investors)
- Scroll depth
- FAQ expands
- Agent slide navigation

---

## 10) Issues List with Severity & Suggested Fixes

| # | Severity | Category | Location | Issue | Minimal Fix | Ideal Fix |
|---|----------|----------|----------|-------|-------------|-----------|
| 1 | **P0** | Conversion | `lets-work-section.tsx` | Waitlist CTA does nothing | Add form fields + API endpoint | Full waitlist flow with email validation, honeypot, success email |
| 2 | **P0** | Conversion | `ride-booking-form.tsx` | Investor form data lost | Wire to API endpoint | Backend with email notification, CRM integration |
| 3 | **P1** | Tracking | Global | No analytics | Add Plausible/Posthog/GA snippet | Full event tracking layer |
| 4 | **P1** | SEO | `layout.tsx` | Missing OG/Twitter tags | Add `openGraph` and `twitter` to metadata | Add sitemap, robots.txt, schema.org |
| 5 | **P1** | Perf | `public/images/` | Agent images 2-2.6MB each | Compress and convert to WebP | Use Next/Image with optimization, responsive srcset |
| 6 | **P1** | Conversion | `Footer.tsx` | All links point to `#` | Add real URLs or remove | Link to actual social profiles, legal pages |
| 7 | **P2** | Maintainability | `src/components/` | Unused components (Hero, Benefits, etc.) | Delete or archive | Document intent or integrate |
| 8 | **P2** | A11y | `FAQ.tsx` | Focus outline hidden | Add visible focus styles | Full keyboard navigation + ARIA |
| 9 | **P2** | A11y | Global | No reduced-motion support | Add `prefers-reduced-motion` media query | Respect user preference in Framer Motion |
| 10 | **P2** | UX | `ride-booking-form.tsx` | No form validation | Add `required` + pattern attributes | Inline validation with error messages |

---

## 11) Deliverables

### All CTAs

| Label | Section | Target | Tracking |
|-------|---------|--------|----------|
| Join Waitlist (Header) | SiteHeader | `#home` scroll | ❌ No |
| Join Waitlist (Hero) | LetsWorkTogether | Mode switch | ❌ No |
| Investors (Hero) | LetsWorkTogether | Mode switch | ❌ No |
| Enter Waitlist | LetsWorkTogether overlay | `console.log` | ❌ No |
| Submit (Investor Form) | RideBookingForm | `console.log` | ❌ No |
| Deck (Footer) | Footer | `#` | ❌ No |
| Twitter (Footer) | Footer | `#` | ❌ No |
| LinkedIn (Footer) | Footer | `#` | ❌ No |
| hello@atomik.dev | Footer | `mailto:` | ❌ No |

### All Forms

| Form | Location | Fields | Validation | Endpoint |
|------|----------|--------|------------|----------|
| Investor Contact | `ride-booking-form.tsx` | First Name, Last Name, Email, Company, Position | None | None (`console.log`) |
| Email (unused) | `Hero.tsx` | Email | None | None |

### External Dependencies

| Service | Status | Usage |
|---------|--------|-------|
| Netlify | Active | Deployment |
| Unsplash | Allowed | Remote images (not currently used) |
| ImageKit | Allowed | Remote images (not currently used) |
| Calendly | Not integrated | — |
| Stripe | Not integrated | — |
| Notion | Not integrated | — |

### How to Work on This Project

> **Onboarding Note:** This is a Next.js 16 (App Router) static site styled with Tailwind 4 and animated with Framer Motion. All content is hardcoded in React components — there's no CMS. The project builds to `./out` and deploys to Netlify. To run locally: `npm install && npm run dev`. To build: `npm run build`. Key files: `src/app/page.tsx` (route), `src/components/` (sections), `src/components/ui/` (reusable parts), `globals.css` (design tokens). The biggest gaps are form backend integration and analytics — prioritize those before launch.

---

*End of Audit*
