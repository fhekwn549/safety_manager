# Agentic Safety Review Report

Verdict: BLOCK
Mode: Audit Mode
Scope: cloud-iam
Fixture: unsafe-cloud-iam

## Summary

- Current work: fixture self-test
- Baseline rules loaded: yes
- Reference overlays loaded: yes
- Repo-local conventions reviewed: yes
- External scanner evidence: not provided

## Findings

### ASR-IAM-003: Service account authority crosses workload or environment boundaries

Severity: critical
Decision: BLOCK
Affected domains: cloud-iam
Blast radius: system
Evidence:
- cloud-iam.yml
Reasoning:
- Fixture evidence matches ASR-IAM-003.
Required action:
- Follow Human Architecture Review Required.

### ASR-IAM-004: Cloud resource policy public exposure lacks owner evidence

Severity: critical
Decision: BLOCK
Affected domains: cloud-iam
Blast radius: system
Evidence:
- cloud-iam.yml
Reasoning:
- Fixture evidence matches ASR-IAM-004.
Required action:
- Follow Human Architecture Review Required.

### ASR-IAM-006: Break-glass access lacks owner or drill evidence

Severity: high
Decision: BLOCK
Affected domains: cloud-iam
Blast radius: module
Evidence:
- cloud-iam.yml
Reasoning:
- Fixture evidence matches ASR-IAM-006.
Required action:
- Follow Incremental Refactor with Human Checkpoints.

## Refactorability Scorecard

| Axis | Score | Evidence |
| --- | ---: | --- |
| Core Invariant Damage | 0 | fixture evidence |
| Blast Radius | 4 | fixture evidence |
| Migration Risk | 1 | fixture evidence |
| Testability | 1 | fixture coverage |
| Boundary Clarity | 4 | fixture evidence |
| Operational Evidence | 3 | fixture evidence |

Common score: fixture-derived
Domain modifiers: ASR-IAM-003, ASR-IAM-004, ASR-IAM-006
Hard triggers: ASR-IAM-003, ASR-IAM-004
Final score: fixture-derived

## Recommended Remediation Strategy

Strategy: Incremental Refactor with Human Checkpoints

Why:
- Based on fixture findings and hard triggers.

Next safe action:
- Keep this fixture outcome stable when editing rules.

## Missing Evidence

- Missing Evidence entries are explicit where runtime, patch, or human-review evidence is not available.
