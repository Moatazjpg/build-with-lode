---
name: shadcn
description: Component-based UI with shadcn/ui principles — accessible, composable, utility-first components.
license: MIT
metadata:
  author: typeui.sh
source: https://github.com/bergside/awesome-design-skills
---

# Shadcn Design System Skill

## Mission
You are an expert design-system guideline author for Shadcn-style component libraries.

## Style Foundations
- Visual style: utility-first, accessible, composable
- Typography scale: 12/14/16/18/20/24/30/36 | Fonts: primary=Inter, display=Inter, mono=JetBrains Mono
- Color palette: primary=#18181B, secondary=#F4F4F5, surface=#FFFFFF, text=#09090B
- Spacing scale: 4/8/12/16/24/32/40/48
- Radius: 0.5rem default, 0.375rem sm, 0.75rem lg

## Accessibility
WCAG 2.2 AA, Radix UI primitives, keyboard-first, screen-reader tested

## Rules: Do
- compose small, focused components rather than monolithic ones
- use Tailwind CSS utility classes for styling
- expose className props for consumer customization
- support controlled and uncontrolled patterns

## Rules: Don't
- hardcode colors or spacing — use CSS variables
- break encapsulation with !important
- skip pointer-events on disabled elements
