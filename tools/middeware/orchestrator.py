#!/usr/bin/env python3
"""
lode UI Generation Middleware Orchestrator

Translates user prompts into skill-driven design generation via opencode CLI,
post-processes results into TypeUI component JSON, and saves artifacts.

Flow:
  1. parse_prompt(prompt) -> normalized object (title, components, style, intent)
  2. select_skills(prompt_obj, skill_index) -> ordered list of skill templates
  3. build_skill_input(skill, prompt_obj) -> combined skill prompt
  4. call_opencode_cli(skill_input) -> raw_result (stdout / file output)
  5. postprocess_to_typeui(raw_result) -> typeui_json
  6. validate_typeui(typeui_json) -> success/fail
  7. write_output(repo_path, typeui_json, html_output, logs)
"""

from __future__ import annotations

import json
import logging
import os
import re
import subprocess
import sys
import tempfile
import time
import uuid
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Any, Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("lode-orchestrator")

# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

@dataclass
class ParsedPrompt:
    """Structured representation of a user's design prompt."""
    raw: str
    title: str = ""
    components: list[str] = field(default_factory=list)
    style_keywords: list[str] = field(default_factory=list)
    intent: str = "landing-page"
    platform: str = "desktop"
    mood: str = "professional"

    def summary(self) -> str:
        return (
            f"title={self.title} | intent={self.intent} | platform={self.platform} | "
            f"components={self.components} | style={self.style_keywords} | mood={self.mood}"
        )


@dataclass
class SkillTemplate:
    """A design skill definition loaded from the skill index."""
    slug: str
    name: str
    source: str
    path: str
    description: str
    tokens: dict[str, str] = field(default_factory=dict)
    typography: dict[str, Any] = field(default_factory=dict)
    spacing: list[int] = field(default_factory=list)
    scenario: str = "design"


@dataclass
class TypeUIComponent:
    """A single TypeUI component definition."""
    type: str  # e.g. "button", "card", "header", "form", "input", "table"
    props: dict[str, Any] = field(default_factory=dict)
    children: list["TypeUIComponent"] = field(default_factory=list)
    tokens: dict[str, str] = field(default_factory=dict)


@dataclass
class TypeUIOutput:
    """Top-level TypeUI artifact output."""
    schema_version: str = "1.0.0"
    title: str = ""
    description: str = ""
    platform: str = "desktop"
    root: TypeUIComponent = field(default_factory=lambda: TypeUIComponent(type="root"))
    design_tokens: dict[str, Any] = field(default_factory=dict)
    meta: dict[str, Any] = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Prompt parsing
# ---------------------------------------------------------------------------

# Common UI components to detect in prompts
COMPONENT_PATTERNS: dict[str, list[str]] = {
    "header": ["header", "navigation", "nav", "navbar", "top bar"],
    "hero": ["hero", "headline", "banner", "jumbotron"],
    "form": ["form", "input", "signup", "sign-up", "sign in", "login", "register", "contact form"],
    "card": ["card", "tile", "panel", "grid"],
    "button": ["button", "cta", "call to action", "button group"],
    "table": ["table", "data table", "grid", "list view"],
    "chart": ["chart", "graph", "analytics", "statistics", "metrics"],
    "sidebar": ["sidebar", "side panel", "side nav", "side navigation"],
    "footer": ["footer", "bottom bar"],
    "modal": ["modal", "dialog", "popup", "overlay"],
    "accordion": ["accordion", "collapsible", "expandable"],
    "tabs": ["tabs", "tab bar", "tab navigation"],
    "testimonial": ["testimonial", "review", "quote", "social proof"],
    "pricing": ["pricing", "plan", "subscription", "tier"],
    "avatar": ["avatar", "profile picture", "user photo"],
    "badge": ["badge", "tag", "label", "pill", "chip"],
    "search": ["search", "search bar", "search input", "search box"],
    "dropdown": ["dropdown", "select", "menu"],
}

# Style keywords to detect
STYLE_PATTERNS: dict[str, list[str]] = {
    "modern": ["modern", "contemporary", "fresh"],
    "minimal": ["minimal", "simple", "clean", "white space", "whitespace"],
    "dark": ["dark", "dark mode", "night"],
    "colorful": ["colorful", "vibrant", "bright", "bold"],
    "corporate": ["corporate", "business", "enterprise", "professional"],
    "editorial": ["editorial", "magazine", "narrative"],
    "playful": ["playful", "fun", "friendly", "warm"],
    "luxury": ["luxury", "premium", "elegant", "sophisticated"],
}


def parse_prompt(prompt: str) -> ParsedPrompt:
    """Parse a natural-language prompt into a structured ParsedPrompt."""
    lower = prompt.lower()

    parsed = ParsedPrompt(raw=prompt)

    # Extract title — first sentence or first 60 chars
    first_sentence = re.split(r'[.!?\n]', prompt.strip())[0].strip()
    parsed.title = first_sentence[:80] if len(first_sentence) > 80 else first_sentence

    # Detect components
    detected_components: set[str] = set()
    for component, patterns in COMPONENT_PATTERNS.items():
        for pattern in patterns:
            if pattern in lower:
                detected_components.add(component)
                break
    parsed.components = list(detected_components)

    # Detect style keywords
    detected_styles: set[str] = set()
    for style, patterns in STYLE_PATTERNS.items():
        for pattern in patterns:
            if pattern in lower:
                detected_styles.add(style)
                break
    parsed.style_keywords = list(detected_styles)

    # Detect intent
    if any(w in lower for w in ["landing", "homepage", "home page", "marketing"]):
        parsed.intent = "landing-page"
    elif any(w in lower for w in ["dashboard", "admin", "analytics", "kpi"]):
        parsed.intent = "dashboard"
    elif any(w in lower for w in ["signup", "sign-up", "register", "sign in", "login", "auth"]):
        parsed.intent = "auth"
    elif any(w in lower for w in ["pricing", "pricing page", "plans"]):
        parsed.intent = "pricing"
    elif any(w in lower for w in ["saas", "app", "application", "web app"]):
        parsed.intent = "saas"
    elif any(w in lower for w in ["mobile", "phone", "iphone", "android"]):
        parsed.intent = "mobile-app"
    elif any(w in lower for w in ["form", "survey", "questionnaire"]):
        parsed.intent = "form"

    # Detect platform
    if any(w in lower for w in ["mobile", "phone", "iphone", "android", "tablet"]):
        parsed.platform = "mobile"
    elif any(w in lower for w in ["desktop", "web", "browser"]):
        parsed.platform = "desktop"

    # Detect mood
    if any(w in lower for w in ["professional", "corporate", "business", "enterprise"]):
        parsed.mood = "professional"
    elif any(w in lower for w in ["playful", "fun", "friendly", "warm", "casual"]):
        parsed.mood = "playful"
    elif any(w in lower for w in ["luxury", "premium", "elegant", "sophisticated", "high-end"]):
        parsed.mood = "luxury"
    elif any(w in lower for w in ["dark", "edgy", "grunge", "bold"]):
        parsed.mood = "bold"
    elif any(w in lower for w in ["minimal", "clean", "simple"]):
        parsed.mood = "minimal"

    logger.info("Parsed prompt: %s", parsed.summary())
    return parsed


# ---------------------------------------------------------------------------
# Skill selection
# ---------------------------------------------------------------------------

SKILL_INDEX_CACHE: Optional[dict[str, Any]] = None


def load_skill_index(repo_path: str | Path = ".") -> dict[str, SkillTemplate]:
    """Load the skill index from /skills/index.json."""
    global SKILL_INDEX_CACHE
    index_path = Path(repo_path) / "skills" / "index.json"

    if not index_path.exists():
        logger.warning("Skill index not found at %s, using defaults", index_path)
        return _default_skill_index()

    with open(index_path, encoding="utf-8") as f:
        raw = json.load(f)

    SKILL_INDEX_CACHE = raw.get("skills", {})

    skills: dict[str, SkillTemplate] = {}
    for slug, data in SKILL_INDEX_CACHE.items():
        skills[slug] = SkillTemplate(
            slug=slug,
            name=data.get("name", slug),
            source=data.get("source", "unknown"),
            path=data.get("path", ""),
            description=data.get("description", ""),
            tokens=data.get("tokens", {}),
            typography=data.get("typography", {}),
            spacing=data.get("spacing", []),
            scenario=data.get("scenario", "design"),
        )
    return skills


def _default_skill_index() -> dict[str, SkillTemplate]:
    """Fallback skills if index.json is missing."""
    return {
        "clean": SkillTemplate(
            slug="clean", name="Clean", source="builtin", path="",
            description="Clean, minimal design", scenario="design"
        ),
    }


SCENARIO_TO_INTENT: dict[str, list[str]] = {
    "landing-page": ["modern", "clean", "minimal", "editorial", "bento"],
    "dashboard": ["dashboard", "clean", "modern"],
    "saas": ["modern", "clean", "corporate", "shadcn"],
    "auth": ["clean", "minimal", "modern"],
    "pricing": ["corporate", "modern", "clean"],
    "mobile-app": ["minimal", "modern", "shadcn"],
    "form": ["clean", "minimal"],
}


def select_skills(prompt: ParsedPrompt, skill_index: dict[str, SkillTemplate]) -> list[SkillTemplate]:
    """Rank and select skills matching the parsed prompt."""
    candidates: list[tuple[SkillTemplate, int]] = []

    intent_skills = SCENARIO_TO_INTENT.get(prompt.intent, ["clean", "modern"])
    style_map = {
        "modern": "modern",
        "minimal": "minimal",
        "corporate": "corporate",
        "editorial": "editorial",
        "clean": "clean",
    }

    # Score each skill
    for slug, skill in skill_index.items():
        score = 0
        # Match by scenario
        if slug in intent_skills:
            score += 5
        # Match by style keywords
        for kw in prompt.style_keywords:
            if kw == slug:
                score += 3
            if kw in skill.name.lower():
                score += 2
        # Match by mood
        if prompt.mood in [skill.name.lower(), skill.scenario]:
            score += 2
        candidates.append((skill, score))

    # Sort by descending score
    candidates.sort(key=lambda x: -x[1])
    matched = [s for s, _ in candidates if _ > 0]

    # Fallback to top intent matches
    if not matched:
        matched = [skill_index[s] for s in intent_skills if s in skill_index][:3]

    logger.info("Selected skills: %s", [s.name for s in matched[:3]])
    return matched[:3]


# ---------------------------------------------------------------------------
# Skill input builder
# ---------------------------------------------------------------------------

def build_skill_input(skill: SkillTemplate, prompt: ParsedPrompt) -> str:
    """Build a combined prompt string from a skill template + parsed user prompt."""
    lines: list[str] = []

    lines.append(f"# Generate: {prompt.title}")
    lines.append(f"")
    lines.append(f"**Style**: {skill.name} design system")
    lines.append(f"**Platform**: {prompt.platform}")
    lines.append(f"**Mood**: {prompt.mood}")
    if skill.tokens:
        lines.append(f"**Color tokens**: {json.dumps(skill.tokens)}")
    if skill.typography:
        lines.append(f"**Typography**: {json.dumps(skill.typography)}")
    if skill.spacing:
        lines.append(f"**Spacing scale**: {skill.spacing}")
    if prompt.components:
        lines.append(f"**UI components to include**: {', '.join(prompt.components)}")
    lines.append("")
    lines.append("## Design System Rules")
    lines.append(f"- Follow the {skill.name} style: {skill.description}")
    lines.append("- Use CSS custom properties for all colors, fonts, and spacing")
    lines.append("- Ensure WCAG 2.1 AA compliance (contrast ratio >= 4.5:1)")
    lines.append("- Include responsive breakpoints at 320px, 768px, and 1440px")
    lines.append("- All interactive elements must have hover, focus, and active states")
    lines.append("")
    lines.append("## User Request")
    lines.append(prompt.raw)
    lines.append("")
    lines.append("## Output Format")
    lines.append("Return a complete, single-file HTML document with embedded CSS and JS.")
    lines.append("Start with `<!DOCTYPE html>` and end with `</html>`.")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# opencode CLI invocation
# ---------------------------------------------------------------------------

def find_opencode() -> Optional[str]:
    """Locate the opencode CLI on PATH."""
    try:
        result = subprocess.run(
            ["where", "opencode"],
            capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            path = result.stdout.strip().split("\n")[0].strip()
            if path:
                return path
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass

    # Common install locations
    candidates = [
        os.path.expanduser("~/.opencode/bin/opencode"),
        os.path.expanduser("~/.local/bin/opencode"),
        "/usr/local/bin/opencode",
        "C:\\Users\\MSI\\AppData\\Local\\opencode\\opencode.exe",
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
    return None


def call_opencode_cli(skill_input: str, timeout: int = 120) -> dict[str, Any]:
    """
    Invoke opencode CLI with the skill input prompt and capture the result.

    Falls back to a simulated result if opencode is not available.
    """
    opencode_path = find_opencode()

    if opencode_path is None:
        logger.warning("opencode CLI not found, using simulated output")
        return _simulate_opencode_output(skill_input)

    # Write input to a temp file
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".md", delete=False, encoding="utf-8"
    ) as f:
        f.write(skill_input)
        temp_path = f.name

    try:
        cmd = [opencode_path, "run", "--input", temp_path]
        logger.info("Running: %s", " ".join(cmd))

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
            env={**os.environ, "OPENCODE_SKILL_MODE": "true"},
        )

        output = {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode,
            "success": result.returncode == 0,
        }

        # Check for HTML output in stdout
        html_match = re.search(
            r"<!DOCTYPE html[\s\S]*?</html>",
            result.stdout,
            re.IGNORECASE
        )
        if html_match:
            output["html"] = html_match.group(0)

        logger.info("opencode CLI finished with return code %d", result.returncode)

        if not output["success"]:
            logger.error("opencode stderr: %s", result.stderr[:500])

        return output

    except subprocess.TimeoutExpired:
        logger.error("opencode CLI timed out after %ds", timeout)
        return {"success": False, "error": f"timeout after {timeout}s", "stdout": "", "stderr": ""}
    finally:
        os.unlink(temp_path)


def _simulate_opencode_output(prompt: str) -> dict[str, Any]:
    """Generate a realistic HTML output for testing without opencode CLI."""
    title_match = re.search(r"# Generate: (.+)", prompt)
    title = title_match.group(1) if title_match else "Generated Page"

    # Extract design tokens from prompt
    tokens = {}
    tokens_match = re.search(r'\*\*Color tokens\*\*: ({.+})', prompt)
    if tokens_match:
        try:
            tokens = json.loads(tokens_match.group(1))
        except json.JSONDecodeError:
            pass

    primary = tokens.get("primary", "#3B82F6")
    secondary = tokens.get("secondary", "#8B5CF6")
    surface = tokens.get("surface", "#FFFFFF")
    text_color = tokens.get("text", "#111827")

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <style>
    :root {{
      --primary: {primary};
      --secondary: {secondary};
      --surface: {surface};
      --text: {text_color};
      --spacing: 16px;
      --radius: 8px;
    }}
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: system-ui, -apple-system, sans-serif;
      color: var(--text);
      background: var(--surface);
      line-height: 1.6;
    }}
    .container {{ max-width: 1200px; margin: 0 auto; padding: 0 24px; }}
    header {{
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px 24px; border-bottom: 1px solid #e2e8f0;
    }}
    .hero {{
      padding: 80px 24px; text-align: center;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
    }}
    .hero h1 {{ font-size: 3rem; margin-bottom: 16px; }}
    .hero p {{ font-size: 1.2rem; max-width: 600px; margin: 0 auto 32px; opacity: 0.9; }}
    .btn {{
      display: inline-block; padding: 12px 32px; border-radius: var(--radius);
      background: white; color: var(--primary); font-weight: 600; text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }}
    .btn:hover {{ transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }}
    .btn:focus-visible {{ outline: 2px solid white; outline-offset: 2px; }}
    .features {{ padding: 80px 24px; }}
    .features h2 {{ text-align: center; margin-bottom: 48px; font-size: 2rem; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }}
    .card {{
      padding: 32px; border-radius: var(--radius); border: 1px solid #e2e8f0;
      transition: box-shadow 0.2s;
    }}
    .card:hover {{ box-shadow: 0 4px 16px rgba(0,0,0,0.08); }}
    .card h3 {{ margin-bottom: 8px; color: var(--primary); }}
    footer {{
      padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;
      color: #64748b; font-size: 0.875rem;
    }}
    @media (max-width: 768px) {{
      .hero h1 {{ font-size: 2rem; }}
      .hero {{ padding: 48px 24px; }}
    }}
    @media (max-width: 320px) {{
      .hero h1 {{ font-size: 1.5rem; }}
      .grid {{ grid-template-columns: 1fr; }}
    }}
    .skip-link {{
      position: absolute; top: -100%; left: 8px; padding: 8px 16px;
      background: var(--primary); color: white; z-index: 9999;
    }}
    .skip-link:focus {{ top: 8px; }}
  </style>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header>
    <strong style="font-size:1.25rem;">Lode</strong>
    <nav>
      <a href="#" style="margin-left:16px;color:var(--text);text-decoration:none;">Features</a>
      <a href="#" style="margin-left:16px;color:var(--text);text-decoration:none;">Pricing</a>
      <a href="#" style="margin-left:16px;color:var(--text);text-decoration:none;">About</a>
    </nav>
  </header>
  <main id="main">
    <section class="hero">
      <h1>{title}</h1>
      <p>Designed with the {tokens.get('name', 'Clean')} design system — modern, accessible, and responsive.</p>
      <a href="#" class="btn">Get started</a>
    </section>
    <section class="features">
      <div class="container">
        <h2>Key Features</h2>
        <div class="grid">
          <div class="card">
            <h3>Feature One</h3>
            <p style="color:#64748b;">Powerful capabilities designed for modern teams.</p>
          </div>
          <div class="card">
            <h3>Feature Two</h3>
            <p style="color:#64748b;">Seamless integration with your existing workflow.</p>
          </div>
          <div class="card">
            <h3>Feature Three</h3>
            <p style="color:#64748b;">Enterprise-grade security and reliability.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Lode. All rights reserved.</p>
  </footer>
</body>
</html>"""

    return {
        "success": True,
        "html": html,
        "stdout": html,
        "stderr": "",
        "returncode": 0,
        "simulated": True,
    }


# ---------------------------------------------------------------------------
# Post-processing to TypeUI
# ---------------------------------------------------------------------------

TYPEUI_COMPONENT_MAP: dict[str, str] = {
    "header": "Header",
    "nav": "Navigation",
    "navbar": "Navigation",
    "hero": "Hero",
    "form": "Form",
    "card": "Card",
    "button": "Button",
    "table": "Table",
    "chart": "Chart",
    "sidebar": "Sidebar",
    "footer": "Footer",
    "modal": "Modal",
    "accordion": "Accordion",
    "tabs": "Tabs",
    "testimonial": "Testimonial",
    "pricing": "PricingCard",
    "avatar": "Avatar",
    "badge": "Badge",
    "search": "SearchInput",
    "dropdown": "DropdownMenu",
    "input": "Input",
    "textarea": "Textarea",
    "select": "Select",
    "checkbox": "Checkbox",
    "radio": "Radio",
}


def parse_html_to_typeui(html: str, prompt: ParsedPrompt, design_tokens: dict[str, Any]) -> TypeUIOutput:
    """Parse generated HTML into a TypeUI component tree by analyzing the HTML structure."""
    output = TypeUIOutput(
        title=prompt.title,
        description=f"Generated from prompt: {prompt.raw[:100]}...",
        platform=prompt.platform,
        design_tokens=design_tokens,
        meta={
            "generated_at": time.time(),
            "prompt": prompt.raw,
            "intent": prompt.intent,
            "mood": prompt.mood,
            "components_requested": prompt.components,
            "style_keywords": prompt.style_keywords,
        },
    )

    root = TypeUIComponent(type="root", props={"layout": "vertical", "platform": prompt.platform})
    output.root = root

    # Detect sections from HTML
    sections: list[tuple[str, int]] = []

    # Pattern-based detection
    if re.search(r'<header', html, re.IGNORECASE):
        sections.append(("Header", 0))
    if re.search(r'class="hero"|class="[^"]*hero[^"]*"', html):
        sections.append(("Hero", 1))
    if re.search(r'class="features"|class="[^"]*features[^"]*"', html):
        sections.append(("FeaturesSection", 2))
    if re.search(r'class="grid"|class="[^"]*grid[^"]*"', html):
        sections.append(("Grid", 3))

    # Detect cards (repeated div.card or article patterns)
    card_count = len(re.findall(r'class="[^"]*\bcard\b[^"]*"', html.lower()))
    if card_count > 0:
        for i in range(card_count):
            sections.append((f"Card_{i+1}", 4))

    # Detect buttons
    btn_count = len(re.findall(r'<(?:button|a)\s[^>]*class="[^"]*\bbtn\b[^"]*"', html))
    if btn_count > 0:
        sections.append(("ButtonGroup", 5))

    if re.search(r'<footer', html, re.IGNORECASE):
        sections.append(("Footer", 10))

    # Sort by position and add as children
    sections.sort(key=lambda x: x[1])
    for name, _ in sections:
        mapped = TYPEUI_COMPONENT_MAP.get(name.lower(), name)
        root.children.append(TypeUIComponent(
            type=mapped,
            props={"name": name, "source": "detected"},
            tokens={} if not design_tokens else {
                k: v for k, v in design_tokens.items()
                if k in ("primary", "secondary", "surface", "text")
            },
        ))

    return output


def postprocess_to_typeui(raw_result: dict[str, Any], prompt: ParsedPrompt, skill: SkillTemplate) -> TypeUIOutput:
    """Post-process an opencode output into a TypeUI output structure."""
    html = raw_result.get("html", raw_result.get("stdout", ""))

    design_tokens = {
        "colors": skill.tokens,
        "typography": skill.typography,
        "spacing": {"scale": skill.spacing},
        "style": skill.name.lower(),
    }

    if not html:
        logger.warning("No HTML found in opencode output, generating minimal output")
        return TypeUIOutput(
            title=prompt.title,
            description="No HTML generated",
            platform=prompt.platform,
            design_tokens=design_tokens,
            meta={"error": "no HTML in output"},
        )

    output = parse_html_to_typeui(html, prompt, design_tokens)
    output.design_tokens = design_tokens
    output.description = f"TypeUI artifact from {skill.name} skill"

    logger.info(
        "Post-processed TypeUI output: %d components detected",
        len(output.root.children)
    )
    return output


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate_typeui(output: TypeUIOutput) -> tuple[bool, list[str]]:
    """Validate a TypeUIOutput against basic schema rules."""
    errors: list[str] = []

    if not output.title:
        errors.append("Missing title")

    if not output.root:
        errors.append("Missing root component")

    if output.root and not output.root.children:
        errors.append("Root has no children — no components detected")

    if not output.design_tokens:
        errors.append("No design tokens defined")

    # Check for required token keys
    colors = output.design_tokens.get("colors", {})
    if not colors.get("primary"):
        errors.append("Missing primary color token")

    valid = len(errors) == 0
    logger.info("TypeUI validation: %s (%d warnings)", "PASS" if valid else "FAIL", len(errors))
    return valid, errors


# ---------------------------------------------------------------------------
# Output writer
# ---------------------------------------------------------------------------

def write_output(
    repo_path: str | Path,
    output: TypeUIOutput,
    html: str = "",
    logs: Optional[list[str]] = None,
) -> Path:
    """Write generated artifacts to the repo's /generated/ directory."""
    base = Path(repo_path) / "generated"
    base.mkdir(parents=True, exist_ok=True)

    run_id = str(uuid.uuid4())[:8]
    title_slug = output.title.lower().replace(" ", "-")[:30]
    prefix = f"{run_id}_{title_slug}"
    artifacts: list[Path] = []

    # Write TypeUI JSON
    typeui_path = base / f"{prefix}.typeui.json"
    with open(typeui_path, "w", encoding="utf-8") as f:
        json.dump({
            "schema_version": output.schema_version,
            "title": output.title,
            "description": output.description,
            "platform": output.platform,
            "root": asdict(output.root) if output.root else {},
            "design_tokens": output.design_tokens,
            "meta": output.meta,
        }, f, indent=2)
    artifacts.append(typeui_path)
    logger.info("Wrote TypeUI artifact: %s", typeui_path)

    # Write HTML preview
    if html:
        html_path = base / f"{prefix}.html"
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html)
        artifacts.append(html_path)
        logger.info("Wrote HTML preview: %s", html_path)

    # Write run log
    if logs:
        log_path = base / f"{prefix}.log"
        with open(log_path, "w", encoding="utf-8") as f:
            f.write("\n".join(logs))
        artifacts.append(log_path)
        logger.info("Wrote run log: %s", log_path)

    return base


# ---------------------------------------------------------------------------
# Full orchestration pipeline
# ---------------------------------------------------------------------------

def run_pipeline(
    prompt: str,
    repo_path: str | Path = ".",
    skip_cli: bool = False,
) -> dict[str, Any]:
    """
    Full orchestration pipeline.

    Args:
        prompt: User's design prompt.
        repo_path: Path to the lode repo root.
        skip_cli: If True, skip opencode CLI and use simulated output.

    Returns:
        Dict with keys: prompt, parsed, selected_skills, skill_inputs, results, typeui_outputs,
                        validation_results, artifacts_dir, duration
    """
    logger.info("=" * 60)
    logger.info("Pipeline start — prompt: %s", prompt)
    logger.info("=" * 60)
    start_time = time.time()

    logs: list[str] = []
    logs.append(f"Prompt: {prompt}")
    logs.append(f"Started: {time.strftime('%Y-%m-%d %H:%M:%S')}")

    # Step 1: Parse prompt
    parsed = parse_prompt(prompt)
    logs.append(f"Parsed: {parsed.summary()}")

    # Step 2: Load skill index & select skills
    skill_index = load_skill_index(repo_path)
    selected_skills = select_skills(parsed, skill_index)
    logs.append(f"Selected skills: {[s.name for s in selected_skills]}")

    # Step 3-5: For each selected skill, run the generation
    all_results: list[dict[str, Any]] = []
    all_typeui: list[TypeUIOutput] = []
    all_validations: list[tuple[bool, list[str]]] = []

    for skill in selected_skills:
        logs.append(f"--- Skill: {skill.name} ---")

        # Build skill input
        skill_input = build_skill_input(skill, parsed)
        logs.append(f"Skill input built ({len(skill_input)} chars)")

        # Call opencode CLI (or simulate)
        if skip_cli:
            logger.info("Skipping opencode CLI (skip_cli=True)")
            result = _simulate_opencode_output(skill_input)
        else:
            result = call_opencode_cli(skill_input)
        all_results.append(result)
        logs.append(f"opencode result: success={result.get('success')}")

        # Post-process to TypeUI
        typeui = postprocess_to_typeui(result, parsed, skill)
        all_typeui.append(typeui)
        logs.append(f"TypeUI output: {len(typeui.root.children)} components")

        # Validate
        is_valid, errors = validate_typeui(typeui)
        all_validations.append((is_valid, errors))
        logs.append(f"Validation: {'PASS' if is_valid else 'FAIL'}")
        if errors:
            for e in errors:
                logs.append(f"  - {e}")

    # Step 6: Write outputs
    html = ""
    if all_results and all_results[0].get("html"):
        html = all_results[0]["html"]

    artifacts_dir = write_output(repo_path, all_typeui[0], html, logs)
    logs.append(f"Artifacts written to: {artifacts_dir}")

    duration = time.time() - start_time
    logs.append(f"Total duration: {duration:.2f}s")

    logger.info("Pipeline complete in %.2f seconds", duration)
    logger.info("Artifacts: %s", artifacts_dir)

    return {
        "prompt": prompt,
        "parsed": asdict(parsed),
        "selected_skills": [asdict(s) for s in selected_skills],
        "skill_inputs": [
            build_skill_input(s, parsed) for s in selected_skills
        ],
        "results": all_results,
        "typeui_outputs": [asdict(t) for t in all_typeui],
        "validation_results": all_validations,
        "artifacts_dir": str(artifacts_dir),
        "duration": duration,
    }


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def cli_main() -> None:
    """CLI entry point: `python orchestrator.py --prompt "..." [--skip-cli]`"""
    import argparse
    parser = argparse.ArgumentParser(
        description="lode UI Generation Middleware Orchestrator"
    )
    parser.add_argument(
        "--prompt", "-p",
        required=True,
        help="Design prompt (e.g. 'Create a mobile signup screen with email + social login')",
    )
    parser.add_argument(
        "--repo-path", "-r",
        default=".",
        help="Path to the lode repo root (default: current dir)",
    )
    parser.add_argument(
        "--skip-cli",
        action="store_true",
        help="Skip opencode CLI invocation (use simulated output)",
    )
    parser.add_argument(
        "--output", "-o",
        default=None,
        help="Output file path for the result JSON (default: stdout)",
    )

    args = parser.parse_args()

    result = run_pipeline(
        prompt=args.prompt,
        repo_path=args.repo_path,
        skip_cli=args.skip_cli,
    )

    output_json = json.dumps(result, indent=2, default=str)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output_json)
        logger.info("Result written to %s", args.output)
    else:
        print(output_json)


# ---------------------------------------------------------------------------
# FastAPI server entry point (optional)
# ---------------------------------------------------------------------------

def create_app():
    """Create a FastAPI app for the orchestrator."""
    try:
        from fastapi import FastAPI, HTTPException
        from pydantic import BaseModel
    except ImportError:
        logger.error(
            "FastAPI not installed. Install with: pip install fastapi uvicorn"
        )
        raise

    app = FastAPI(
        title="lode UI Generation Middleware",
        description="Translate design prompts into TypeUI component JSON via skill-driven generation",
        version="1.0.0",
    )

    class GenerateRequest(BaseModel):
        prompt: str
        skip_cli: bool = False

    class GenerateResponse(BaseModel):
        success: bool
        typeui: Optional[dict] = None
        artifacts_dir: Optional[str] = None
        component_count: int = 0
        duration: float = 0.0
        validation_errors: list[str] = []

    @app.post("/generate", response_model=GenerateResponse)
    async def generate(req: GenerateRequest):
        """Generate a TypeUI design from a natural language prompt."""
        try:
            result = run_pipeline(
                prompt=req.prompt,
                repo_path=".",
                skip_cli=req.skip_cli,
            )

            typeui_output = result["typeui_outputs"][0] if result["typeui_outputs"] else {}
            validation = result["validation_results"][0] if result["validation_results"] else (True, [])

            return GenerateResponse(
                success=validation[0],
                typeui=typeui_output,
                artifacts_dir=result["artifacts_dir"],
                component_count=len(typeui_output.get("root", {}).get("children", [])),
                duration=result["duration"],
                validation_errors=validation[1],
            )
        except Exception as e:
            logger.exception("Generation failed")
            raise HTTPException(status_code=500, detail=str(e))

    @app.get("/health")
    async def health():
        return {"status": "ok"}

    return app


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    cli_main()
