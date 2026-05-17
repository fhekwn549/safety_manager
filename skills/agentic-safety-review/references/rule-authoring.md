# Rule Authoring Reference

Use `docs/rule-authoring.md` for the full contributor-facing guide.

Baseline rules must include:

- Rule ID:
- Severity:
- Rationale:
- Evidence:
- Confidence:

Repo-local rules can strengthen baseline rules but cannot weaken baseline safety. Reference overlays may strengthen or refine baseline rules but cannot remove evidence requirements or hard triggers.

Domain-specific score modifiers are additive. They can increase risk scores and define hard triggers, but they cannot lower common scorecard values.
