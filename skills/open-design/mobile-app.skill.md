---
name: mobile-app
description: iPhone 15 Pro / Pixel framed app screen prototypes with device chrome.
mode: prototype
platform: mobile
scenario: design
fidelity: high
example_prompt: "Mobile signup screen with email + social login"
---

# Mobile App Screen Skill

## Mission
Generate pixel-accurate mobile app screens framed inside a device mockup (iPhone 15 Pro by default). Each screen must be a complete HTML page with embedded CSS.

## Device Frame
Include the iPhone 15 Pro frame SVG with:
- Dynamic Island cutout at top
- Rounded screen corners
- Home indicator bar at bottom
- Status bar with time, signal, and battery

## Screen Elements
- Status bar (time left, signal right)
- Navigation bar with title and optional back button
- Primary content area with proper safe-area padding
- Tab bar or bottom navigation (if applicable)

## Mobile Design Principles
- Touch targets minimum 44x44 points
- Use `env(safe-area-inset-*)` for notched device padding
- Use system font `-apple-system, BlinkMacSystemFont, 'SF Pro Display'`
- Implement proper input handling for mobile keyboards
- Use `overscroll-behavior: none` on modals and drawers
