# lode UI Generation Middleware

Orchestrates design prompt → skill selection → opencode CLI → TypeUI component output pipeline.

## Quick Start

```bash
# Install dependencies
pip install fastapi uvicorn pytest

# Run with a test prompt (simulated, no opencode needed)
python tools/middeware/orchestrator.py --prompt "Create a mobile signup screen with email + social login" --skip-cli

# Run with real opencode CLI
python tools/middeware/orchestrator.py --prompt "Landing page for a coffee roastery" --repo-path .

# Save output to file
python tools/middeware/orchestrator.py --prompt "Admin dashboard with analytics" --skip-cli --output result.json
```

## Run as API Server

```bash
uvicorn orchestrator:create_app --host 0.0.0.0 --port 8399 --factory
curl -X POST http://localhost:8399/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Landing page for a coffee roastery in Brooklyn","skip_cli":true}'
```

## Run Tests

```bash
python -m pytest tests/test_orchestrator.py -v
```

## Pipeline Flow

```
User Prompt
    │
    ▼
parse_prompt() ──► ParsedPrompt { title, components[], style[], intent }
    │
    ▼
select_skills() ──► [SkillTemplate, SkillTemplate, ...]
    │
    ▼
build_skill_input() ──► skill.md-style prompt
    │
    ▼
call_opencode_cli() ──► raw HTML output
    │
    ▼
postprocess_to_typeui() ──► TypeUIOutput { root: Component, tokens, meta }
    │
    ▼
validate_typeui() ──► (valid, errors[])
    │
    ▼
write_output() ──► /generated/{run_id}_{title}.typeui.json
                   /generated/{run_id}_{title}.html
```

## Architecture

- `orchestrator.py` — main pipeline (CLI + FastAPI)
- `skills/index.json` — combined skill index from open-design, awesome-design-skills, and typeui
- `skills/open-design/` — skill definitions from open-design (converted to SKILL.md format)
- `skills/awesome-design-skills/` — design system SKILL.md files from awesome-design-skills
- `tests/` — unit tests and end-to-end tests
- `generated/` — output artifacts (.typeui.json, .html, .log)

## Example

```bash
python tools/middeware/orchestrator.py \
  --prompt "Create a mobile signup screen with email + social login, clean/modern, primary CTA" \
  --skip-cli
```

This produces:
1. A `.typeui.json` file with the parsed component tree and design tokens
2. A `.html` preview with the generated design
3. A `.log` file with the execution trace
