# Design System Skill Blueprint

Canonical source-of-truth blueprint for authoring reusable `skill.md` files for design systems.

## Purpose
Use this blueprint to keep design-system skills consistent, implementation-ready, and SEO-friendly.

## Required `skill.md` Structure

```md
---
name: design-system-[brand-or-scope]
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards.
---

# [Design System Name]

## Mission
One paragraph describing the system objective and target product experience.

## Style Foundations
- Visual style: [keywords]
- Typography scale: [token list]
- Color palette: [semantic tokens + values]
- Spacing scale: [token list]

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required

## Rules: Do / Don't
- Use semantic tokens, not raw hex values
- Define all required states (default, hover, focus, active, disabled, loading, error)
- Do not allow low-contrast text or hidden focus indicators
```

## Quality Gates
- Every non-negotiable rule uses "must"
- Every recommendation uses "should"
- Every accessibility rule is testable in implementation
