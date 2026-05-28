---
name: saas-landing
description: Marketing landing page with hero, features, pricing, and CTA sections.
mode: prototype
platform: desktop
scenario: marketing
fidelity: high
example_prompt: "SaaS landing page for a project management tool"
---

# SaaS Landing Page Skill

## Mission
Create a conversion-optimized SaaS landing page. Focus on clear value proposition, social proof, and compelling CTAs.

## Required Sections
1. **Navigation** — Sticky header with logo, nav links, and CTA button
2. **Hero** — Headline, subheadline, primary CTA, secondary CTA, and hero visual
3. **Social Proof** — Customer logos or testimonial strip
4. **Features** — 3-column grid with icons, titles, and descriptions
5. **How It Works** — 3-step numbered process
6. **Pricing** — 3-tier pricing cards with feature lists
7. **FAQ** — Accordion with common questions
8. **Footer** — Links, social icons, copyright

## Design Tokens
Use CSS custom properties in `:root`:
```css
:root {
  --color-primary: #6366F1;
  --color-primary-hover: #4F46E5;
  --color-secondary: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text: #0F172A;
  --color-text-muted: #64748B;
  --color-border: #E2E8F0;
  --color-success: #22C55E;
  --font-sans: 'Inter', system-ui, sans-serif;
  --spacing-section: 5rem;
  --max-width: 1200px;
}
```

## Conversion Patterns
- Primary CTA must contrast against hero background
- Pricing should highlight a "Most Popular" tier
- Testimonials should include name, title, company, and photo
- FAQ should use accordion pattern for space efficiency
