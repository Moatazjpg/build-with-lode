#!/usr/bin/env python3
"""Tests for the lode UI generation middleware orchestrator."""

import json
import os
import sys
import tempfile
from pathlib import Path

# Add the middleware directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "tools", "middeware"))

from orchestrator import (
    parse_prompt,
    load_skill_index,
    select_skills,
    build_skill_input,
    postprocess_to_typeui,
    validate_typeui,
    parse_html_to_typeui,
    TypeUIOutput,
    TypeUIComponent,
    SkillTemplate,
    ParsedPrompt,
)


# ---------------------------------------------------------------------------
# Tests: parse_prompt
# ---------------------------------------------------------------------------

def test_parse_prompt_landing_page():
    p = parse_prompt("Create a landing page for my coffee roastery in Brooklyn")
    assert p.intent == "landing-page"
    assert p.platform == "desktop"
    assert len(p.title) > 0


def test_parse_prompt_mobile_signup():
    p = parse_prompt("Create a mobile signup screen with email + social login, clean/modern")
    assert p.intent == "auth"
    assert p.platform == "mobile"
    assert "form" in p.components
    assert "clean" in p.style_keywords or "modern" in p.style_keywords


def test_parse_prompt_dashboard():
    p = parse_prompt("Design an admin dashboard with analytics, charts, and a data table")
    assert p.intent == "dashboard"
    assert "table" in p.components
    assert "chart" in p.components


def test_parse_prompt_pricing():
    p = parse_prompt("Build a pricing page with 3 tiers for my SaaS product")
    assert p.intent == "pricing"
    assert "pricing" in p.components


def test_parse_prompt_empty():
    p = parse_prompt("")
    assert p.title == ""
    assert p.components == []
    assert p.intent == "landing-page"
    assert p.platform == "desktop"


def test_parse_prompt_style_detection():
    p = parse_prompt("A minimalist, clean landing page")
    assert "minimal" in p.style_keywords or "clean" in p.style_keywords
    assert p.mood == "minimal"


# ---------------------------------------------------------------------------
# Tests: load_skill_index
# ---------------------------------------------------------------------------

def test_load_skill_index():
    repo = Path(__file__).parent.parent  # repo root
    skills = load_skill_index(repo)
    assert len(skills) > 0
    assert "modern" in skills
    assert "clean" in skills


def test_load_skill_index_missing():
    """Fallback when index.json doesn't exist."""
    with tempfile.TemporaryDirectory() as tmp:
        skills = load_skill_index(tmp)
        assert len(skills) > 0


# ---------------------------------------------------------------------------
# Tests: select_skills
# ---------------------------------------------------------------------------

def test_select_skills_landing():
    p = ParsedPrompt(
        raw="landing page for a SaaS",
        title="SaaS Landing",
        components=["hero", "form"],
        style_keywords=["modern"],
        intent="landing-page",
        platform="desktop",
        mood="professional",
    )
    repo = Path(__file__).parent.parent
    skills = load_skill_index(repo)
    selected = select_skills(p, skills)
    assert len(selected) > 0
    assert selected[0].slug in ("modern", "clean", "minimal", "editorial", "bento")


def test_select_skills_dashboard():
    p = ParsedPrompt(
        raw="admin dashboard",
        title="Admin Dashboard",
        components=["table", "chart"],
        style_keywords=["modern"],
        intent="dashboard",
        platform="desktop",
        mood="professional",
    )
    repo = Path(__file__).parent.parent
    skills = load_skill_index(repo)
    selected = select_skills(p, skills)
    assert len(selected) > 0
    assert "dashboard" in [s.slug for s in selected]


# ---------------------------------------------------------------------------
# Tests: build_skill_input
# ---------------------------------------------------------------------------

def test_build_skill_input():
    skill = SkillTemplate(
        slug="clean", name="Clean", source="awesome-design-skills",
        path="skills/awesome-design-skills/clean/SKILL.md",
        description="Test description",
        tokens={"primary": "#3B82F6"},
        typography={"primary": "Inter"},
        spacing=[8, 16, 24],
        scenario="design",
    )
    prompt = ParsedPrompt(
        raw="Test prompt", title="Test", components=["hero", "form"],
        style_keywords=["clean"], intent="landing-page", platform="desktop",
        mood="professional",
    )
    result = build_skill_input(skill, prompt)
    assert "Clean" in result
    assert "#3B82F6" in result
    assert "hero" in result or "Test" in result
    assert "WCAG" in result


# ---------------------------------------------------------------------------
# Tests: postprocess_to_typeui / parse_html_to_typeui
# ---------------------------------------------------------------------------

SAMPLE_HTML = """<!DOCTYPE html>
<html>
<head><title>Test</title>
<style>
:root { --primary: #3B82F6; }
.card { padding: 16px; }
.btn { display: inline-block; }
</style>
</head>
<body>
<a href="#main" class="skip-link">Skip</a>
<header><nav><a href="#">Home</a></nav></header>
<main>
<section class="hero"><h1>Test Page</h1></section>
<section class="features">
<div class="grid">
  <div class="card"><h3>Feature 1</h3></div>
  <div class="card"><h3>Feature 2</h3></div>
</div>
</section>
</main>
<footer><p>Footer</p></footer>
</body>
</html>"""


def test_parse_html_to_typeui():
    prompt = ParsedPrompt(
        raw="Test", title="Test", components=["hero", "card"],
        style_keywords=["clean"], intent="landing-page",
        platform="desktop", mood="professional",
    )
    tokens = {
        "colors": {"primary": "#3B82F6"},
        "typography": {"primary": "Inter"},
        "spacing": {"scale": [8, 16]},
    }
    result = parse_html_to_typeui(SAMPLE_HTML, prompt, tokens)
    assert result.title == "Test"
    assert result.root is not None
    # Should have detected header, hero, cards, etc.
    child_types = [c.type for c in result.root.children]
    assert "Header" in child_types
    assert "Hero" in child_types


def test_postprocess_to_typeui():
    prompt = ParsedPrompt(
        raw="Test landing", title="Test",
        components=[], style_keywords=[],
        intent="landing-page", platform="desktop", mood="professional",
    )
    skill = SkillTemplate(
        slug="clean", name="Clean", source="awesome-design-skills",
        path="", description="Test", scenario="design",
    )
    result = postprocess_to_typeui(
        {"html": SAMPLE_HTML, "stdout": SAMPLE_HTML, "success": True},
        prompt, skill,
    )
    assert result.title == "Test"
    assert len(result.root.children) >= 2


def test_postprocess_no_html():
    prompt = ParsedPrompt(
        raw="", title="Fail", components=[], style_keywords=[],
        intent="landing-page", platform="desktop", mood="professional",
    )
    skill = SkillTemplate(
        slug="clean", name="Clean", source="awesome-design-skills",
        path="", description="Test", scenario="design",
    )
    result = postprocess_to_typeui(
        {"html": "", "stdout": "", "success": False},
        prompt, skill,
    )
    assert result.meta.get("error") == "no HTML in output"


# ---------------------------------------------------------------------------
# Tests: validate_typeui
# ---------------------------------------------------------------------------

def test_validate_typeui_ok():
    output = TypeUIOutput(
        title="Test",
        root=TypeUIComponent(type="root", children=[
            TypeUIComponent(type="Header"),
        ]),
        design_tokens={"colors": {"primary": "#000"}},
    )
    valid, errors = validate_typeui(output)
    assert valid
    assert len(errors) == 0


def test_validate_typeui_no_title():
    output = TypeUIOutput(
        title="",
        root=TypeUIComponent(type="root", children=[TypeUIComponent(type="Header")]),
        design_tokens={"colors": {"primary": "#000"}},
    )
    valid, errors = validate_typeui(output)
    assert not valid
    assert any("title" in e.lower() for e in errors)


def test_validate_typeui_no_children():
    output = TypeUIOutput(
        title="Test",
        root=TypeUIComponent(type="root"),
        design_tokens={"colors": {"primary": "#000"}},
    )
    valid, errors = validate_typeui(output)
    assert not valid
    assert any("children" in e.lower() for e in errors)


def test_validate_typeui_no_primary_color():
    output = TypeUIOutput(
        title="Test",
        root=TypeUIComponent(type="root", children=[TypeUIComponent(type="Header")]),
        design_tokens={"colors": {}},
    )
    valid, errors = validate_typeui(output)
    assert not valid
    assert any("primary" in e.lower() for e in errors)


# ---------------------------------------------------------------------------
# Tests: full pipeline (with simulated opencode)
# ---------------------------------------------------------------------------

def test_full_pipeline():
    """Run the full pipeline with skip_cli=True (uses simulated output)."""
    from orchestrator import run_pipeline
    repo = Path(__file__).parent.parent
    result = run_pipeline(
        prompt="Create a landing page for a coffee roastery",
        repo_path=repo,
        skip_cli=True,
    )
    assert result["parsed"]["intent"] == "landing-page"
    assert len(result["selected_skills"]) > 0
    assert len(result["typeui_outputs"]) > 0
    assert result["validation_results"][0][0]  # First validation should pass
    assert result["duration"] > 0
    artifacts_dir = Path(result["artifacts_dir"])
    assert artifacts_dir.exists()
    # Check that JSON artifact was written
    typeui_files = list(artifacts_dir.glob("*.typeui.json"))
    assert len(typeui_files) > 0
    # Check that HTML was written
    html_files = list(artifacts_dir.glob("*.html"))
    assert len(html_files) > 0


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import pytest
    sys.exit(pytest.main([__file__, "-v"]))
