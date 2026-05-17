# Agentic Safety Review Report

Verdict: BLOCK
Mode: Audit Mode
Scope: data-privacy, agent-config
Fixture: unsafe-ai-data-boundary

## Summary

- Current work: fixture self-test
- Baseline rules loaded: yes
- Reference overlays loaded: yes
- Reference overlay details: data-privacy/ai-data-boundary
- Repo-local conventions reviewed: yes
- External scanner evidence: not provided

## Findings

### ASR-AI-001: AI retrieval or trace path can mix tenant data

Severity: critical
Decision: BLOCK
Affected domains: data-privacy, agent-config
Blast radius: system
Evidence:
- ai-data-policy.yml
Reasoning:
- Fixture evidence matches ASR-AI-001.
Required action:
- Follow Human Architecture Review Required.

### ASR-AI-002: Training use lacks exclusion or opt-out evidence

Severity: critical
Decision: BLOCK
Affected domains: data-privacy
Blast radius: system
Evidence:
- ai-data-policy.yml
Reasoning:
- Fixture evidence matches ASR-AI-002.
Required action:
- Follow Human Architecture Review Required.

### ASR-AI-003: High-impact model-assisted decision lacks human review

Severity: critical
Decision: BLOCK
Affected domains: data-privacy, agent-config
Blast radius: system
Evidence:
- ai-data-policy.yml
Reasoning:
- Fixture evidence matches ASR-AI-003.
Required action:
- Follow Human Architecture Review Required.

### ASR-AI-004: Tool output crosses AI processor boundary without handling evidence

Severity: high
Decision: BLOCK
Affected domains: data-privacy, agent-config
Blast radius: module
Evidence:
- ai-data-policy.yml
Reasoning:
- Fixture evidence matches ASR-AI-004.
Required action:
- Follow Incremental Refactor with Human Checkpoints.

## Refactorability Scorecard

| Axis | Score | Evidence |
| --- | ---: | --- |
| Core Invariant Damage | 4 | fixture evidence |
| Blast Radius | 4 | fixture evidence |
| Migration Risk | 1 | fixture evidence |
| Testability | 1 | fixture coverage |
| Boundary Clarity | 4 | fixture evidence |
| Operational Evidence | 3 | fixture evidence |

Common score: fixture-derived
Domain modifiers: ASR-AI-001, ASR-AI-002, ASR-AI-003, ASR-AI-004
Hard triggers: ASR-AI-001, ASR-AI-002, ASR-AI-003
Final score: fixture-derived

## Recommended Remediation Strategy

Strategy: Incremental Refactor with Human Checkpoints

Why:
- Based on fixture findings and hard triggers.

Next safe action:
- Keep this fixture outcome stable when editing rules.

## Missing Evidence

- Missing Evidence entries are explicit where runtime, patch, or human-review evidence is not available.
