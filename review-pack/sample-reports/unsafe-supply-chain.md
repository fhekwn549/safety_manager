# Agentic Safety Review Report

Verdict: BLOCK
Mode: Audit Mode
Scope: supply-chain
Fixture: unsafe-supply-chain

## Summary

- Current work: fixture self-test
- Baseline rules loaded: yes
- Reference overlays loaded: yes
- Repo-local conventions reviewed: yes
- External scanner evidence: not provided

## Findings

### ASR-SC-003: Dependency lifecycle scripts are not bounded

Severity: high
Decision: BLOCK
Claim type: confirmed_misconfiguration
Confidence: high
Evidence strength: direct
Affected domains: supply-chain
Blast radius: module
Evidence:
- package.json:7 - "dependency_lifecycle_scripts_unbounded": true,
Reasoning:
- Fixture evidence matches ASR-SC-003.
Required action:
- Follow Incremental Refactor with Human Checkpoints.

### ASR-SC-004: Package publishing authority is not protected

Severity: critical
Decision: BLOCK
Claim type: confirmed_misconfiguration
Confidence: high
Evidence strength: direct
Affected domains: supply-chain
Blast radius: system
Evidence:
- package.json:8 - "package_publishing_unprotected": true,
Reasoning:
- Fixture evidence matches ASR-SC-004.
Required action:
- Follow Human Architecture Review Required.

### ASR-SC-007: Dependency confusion boundary is ambiguous

Severity: high
Decision: BLOCK
Claim type: risky_pattern
Confidence: high
Evidence strength: direct
Affected domains: supply-chain
Blast radius: module
Evidence:
- package.json:9 - "dependency_confusion_risk": true
Reasoning:
- Fixture evidence matches ASR-SC-007.
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
Domain modifiers: ASR-SC-003, ASR-SC-004, ASR-SC-007
Hard triggers: ASR-SC-004
Final score: fixture-derived

## Recommended Remediation Strategy

Strategy: Incremental Refactor with Human Checkpoints

Why:
- Based on fixture findings and hard triggers.

Next safe action:
- Keep this fixture outcome stable when editing rules.

## Missing Evidence

- Missing Evidence entries are explicit where runtime, patch, or human-review evidence is not available.
