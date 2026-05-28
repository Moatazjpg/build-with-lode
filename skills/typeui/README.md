# TypeUI Integration

TypeUI (https://github.com/bergside/typeui) provides design skill definitions
and UI prompts for agentic tools. This directory integrates TypeUI patterns into
the lode generation pipeline.

## Structure

- `DESIGN.md` — Canonical blueprint for authoring design-system skill files
- Component patterns map to the TypeUI registry at https://www.typeui.sh/design-skills

## Component Mapping

When the orchestrator detects UI elements from generated HTML, it maps them to
TypeUI component types:

| Detected HTML | TypeUI Type    |
|---------------|----------------|
| `<header>`    | Header         |
| `.hero`       | Hero           |
| `.card`       | Card           |
| `.btn`        | Button         |
| `<footer>`    | Footer         |
| `.grid`       | Grid           |
| `form`        | Form           |
| `table`       | Table          |

## Output Format

Generated TypeUI artifacts follow this structure:
```json
{
  "schema_version": "1.0.0",
  "title": "Page Title",
  "components": ["Header", "Hero", "Card"],
  "design_tokens": {
    "colors": { "primary": "#..." },
    "typography": { "primary": "Inter" },
    "spacing": { "scale": [4, 8, 16, 24] }
  }
}
```
