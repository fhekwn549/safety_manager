# Agentic Safety Review Report

Verdict: BLOCK
Mode: Audit Mode
Scope: docker-runtime, ci-cd, agent-config
Fixture: unsafe-docker

## Summary

- Current work: fixture self-test
- Baseline rules loaded: yes
- Reference overlays loaded: yes
- Repo-local conventions reviewed: yes
- External scanner evidence: not provided

## Findings

### ASR-DOCKER-001: Container does not prove non-root runtime

Severity: high
Decision: BLOCK
Claim type: missing_evidence
Confidence: medium
Evidence strength: missing
Affected domains: docker-runtime
Blast radius: module
Evidence:
- Dockerfile: Missing Evidence: no non-root USER directive found
Reasoning:
- Fixture evidence matches ASR-DOCKER-001.
Required action:
- Follow Incremental Refactor.

### ASR-DOCKER-002: Privileged runtime settings weaken isolation

Severity: critical
Decision: BLOCK
Claim type: confirmed_misconfiguration
Confidence: high
Evidence strength: direct
Affected domains: docker-runtime
Blast radius: system
Evidence:
- docker-compose.yml:4 - privileged: true
Reasoning:
- Fixture evidence matches ASR-DOCKER-002.
Required action:
- Follow Human Architecture Review Required.

### ASR-RUNTIME-001: Untrusted workload shares Linux kernel without mitigation evidence

Severity: critical
Decision: BLOCK
Claim type: needs_human_review
Confidence: medium
Evidence strength: indirect
Affected domains: docker-runtime, ci-cd, agent-config
Blast radius: system
Evidence:
- docker-compose.yml:6 - untrusted_workload: true
Reasoning:
- Fixture evidence matches ASR-RUNTIME-001.
Required action:
- Follow MIGRATION_PLAN_REQUIRED.

## Refactorability Scorecard

| Axis | Score | Evidence |
| --- | ---: | --- |
| Core Invariant Damage | 0 | fixture evidence |
| Blast Radius | 4 | fixture evidence |
| Migration Risk | 1 | fixture evidence |
| Testability | 1 | fixture coverage |
| Boundary Clarity | 1 | fixture evidence |
| Operational Evidence | 3 | fixture evidence |

Common score: fixture-derived
Domain modifiers: ASR-DOCKER-001, ASR-DOCKER-002, ASR-RUNTIME-001
Hard triggers: ASR-DOCKER-002, ASR-RUNTIME-001
Final score: fixture-derived

## Runtime CVE Exposure

Advisory: ASR-ADV-COPY-FAIL
CVE: CVE-2026-31431

Runtime:
- running kernel: Missing Evidence
- kernel patch: Missing Evidence
- reboot evidence: Missing Evidence

Exposure:
- shared Linux kernel boundary: present
- runner isolation: Missing Evidence

Mitigation evidence:
- mitigation evidence: Missing Evidence

## Recommended Remediation Strategy

Strategy: Strangler Migration

Why:
- Based on fixture findings and hard triggers.

Next safe action:
- Keep this fixture outcome stable when editing rules.

## Missing Evidence

- Missing Evidence entries are explicit where runtime, patch, or human-review evidence is not available.
