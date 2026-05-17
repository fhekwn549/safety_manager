# Agentic Safety Review Report

Verdict: BLOCK
Mode: Audit Mode
Scope: docker-runtime, ci-cd, agent-config, cloud-iam, supply-chain, data-privacy
Fixture: sample-expanded-risk

## Summary

- Current work: fixture self-test
- Baseline rules loaded: yes
- Reference overlays loaded: yes
- Reference overlay details: data-privacy/ai-data-boundary
- Repo-local conventions reviewed: yes
- External scanner evidence: not provided

## Findings

### ASR-DOCKER-001: Container does not prove non-root runtime

Severity: high
Decision: BLOCK
Affected domains: docker-runtime
Blast radius: module
Evidence:
- Dockerfile
- docker-compose.yml
Reasoning:
- Fixture evidence matches ASR-DOCKER-001.
Required action:
- Follow Incremental Refactor.

### ASR-DOCKER-002: Privileged runtime settings weaken isolation

Severity: critical
Decision: BLOCK
Affected domains: docker-runtime
Blast radius: system
Evidence:
- Dockerfile
- docker-compose.yml
Reasoning:
- Fixture evidence matches ASR-DOCKER-002.
Required action:
- Follow Human Architecture Review Required.

### ASR-RUNTIME-001: Untrusted workload shares Linux kernel without mitigation evidence

Severity: critical
Decision: BLOCK
Affected domains: docker-runtime, ci-cd, agent-config
Blast radius: system
Evidence:
- Dockerfile
- docker-compose.yml
Reasoning:
- Fixture evidence matches ASR-RUNTIME-001.
Required action:
- Follow MIGRATION_PLAN_REQUIRED.

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

### ASR-SC-003: Dependency lifecycle scripts are not bounded

Severity: high
Decision: BLOCK
Affected domains: supply-chain
Blast radius: module
Evidence:
- package.json
Reasoning:
- Fixture evidence matches ASR-SC-003.
Required action:
- Follow Incremental Refactor with Human Checkpoints.

### ASR-SC-004: Package publishing authority is not protected

Severity: critical
Decision: BLOCK
Affected domains: supply-chain
Blast radius: system
Evidence:
- package.json
Reasoning:
- Fixture evidence matches ASR-SC-004.
Required action:
- Follow Human Architecture Review Required.

### ASR-SC-007: Dependency confusion boundary is ambiguous

Severity: high
Decision: BLOCK
Affected domains: supply-chain
Blast radius: module
Evidence:
- package.json
Reasoning:
- Fixture evidence matches ASR-SC-007.
Required action:
- Follow Incremental Refactor with Human Checkpoints.

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
Domain modifiers: ASR-DOCKER-001, ASR-DOCKER-002, ASR-RUNTIME-001, ASR-IAM-003, ASR-IAM-004, ASR-IAM-006, ASR-SC-003, ASR-SC-004, ASR-SC-007, ASR-AI-001, ASR-AI-002, ASR-AI-003, ASR-AI-004
Hard triggers: ASR-DOCKER-002, ASR-RUNTIME-001, ASR-IAM-003, ASR-IAM-004, ASR-SC-004, ASR-AI-001, ASR-AI-002, ASR-AI-003
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
