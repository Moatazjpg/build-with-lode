---
name: dashboard
description: Admin dashboard with sidebar navigation, data tables, charts, and KPI cards.
mode: prototype
platform: desktop
scenario: operation
fidelity: high
example_prompt: "Admin dashboard for a SaaS analytics platform"
---

# Dashboard Skill

## Mission
Generate a functional admin dashboard with sidebar navigation, KPI cards, data tables, and charts. All data should be realistic mock data embedded in the HTML.

## Layout Structure
- **Sidebar** (260px) — Logo, nav items with icons, user menu at bottom
- **Header** — Search bar, notifications, user avatar
- **Main content** — Responsive grid of widgets

## Required Components
1. **KPI Cards** — 4 metric cards with label, value, trend indicator (up/down), and icon
2. **Chart Area** — Placeholder for line/bar chart (use CSS/SVG chart — no external libraries)
3. **Data Table** — Sortable table with columns, rows, status badges, and action buttons
4. **Activity Feed** — Time-ordered list with avatars and status dots

## CSS Architecture
Use CSS Grid for the main layout:
```css
.dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr;
  height: 100vh;
}
```

## Interactive Elements
- Sidebar nav items must have active and hover states
- Data table rows must have hover highlight
- KPI cards must have subtle hover elevation
- Notification bell must have badge with count
