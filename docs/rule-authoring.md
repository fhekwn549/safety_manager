# Rule Authoring

Rules should be short decision rules that an agent can use during Build Mode or Audit Mode. Avoid broad educational checklists.

## Baseline Rule Format

Use this structure in `rules/baseline/<domain>.md`:

```markdown
## ASR-DOMAIN-001: Short rule title

Rule ID: ASR-DOMAIN-001
Severity: critical | high | medium | low | info
Rationale: Why this protects a service invariant.
Evidence: Files, commands, tests, schemas, configs, or reports that prove the rule is satisfied.
Confidence: High | Medium | Operational Heuristic | Vendor-specific Note
```

A baseline rule should protect one invariant. Good rules mention the evidence needed to accept or reject the change.

## Repo-Local Rules

Repo-local rules can strengthen baseline rules. They cannot weaken baseline rules.

Allowed:

- Add stricter tenant isolation requirements.
- Require project-specific audit fields.
- Require a narrower runtime profile.

Not allowed:

- Ignore baseline authentication, authorization, ownership, secret, runtime, or CI rules.
- Treat local convention as safe when it conflicts with baseline.
- Remove evidence requirements.

If a repo-local rule tries to weaken baseline safety, report it as drift.

## Reference Overlays

A reference overlay may strengthen or refine baseline rules for a domain. It cannot weaken the baseline.

Use overlays for domain-specific guidance such as API contract compatibility, Docker runtime hardening, or runtime CVE response.

Overlay guidance should include:

- Reference sources or design patterns.
- Strengthened evidence expectations.
- Compatibility or migration notes.
- Hard triggers when relevant.

## Domain-Specific Score Modifiers

Domain rule packs may define domain-specific score modifiers in `rules/domain-score-modifiers.md`.

Modifiers are additive:

- They can increase Core Invariant Damage, Blast Radius, Migration Risk, Testability, Boundary Clarity, or Operational Evidence scores.
- They cannot lower the score.
- They cannot erase findings.
- They cannot override hard triggers.

Hard triggers should cite the rule id, evidence, affected domains, and uncertainty.
