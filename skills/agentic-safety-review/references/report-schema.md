# Report Schema

MVP reports are markdown. Keep scanner evidence and agent reasoning separate.

JSON output uses the same decision model as the markdown report. Stable top-level fields are `verdict`, `mode`, `scope`, `subject`, `summary`, `findings`, `scorecard`, `remediation`, `runtimeCveExposure`, and `missingEvidence`.

Each finding must separate risk priority from claim strength:

- `severity`: practical review priority if the signal is real.
- `claim_type`: `confirmed_misconfiguration`, `missing_evidence`, `risky_pattern`, or `needs_human_review`.
- `confidence`: `low`, `medium`, or `high`.
- `evidence_strength`: `direct`, `indirect`, `missing`, or `inferred`.

Evidence entries should include path, line, snippet, and strength when available. Missing evidence is valid evidence metadata, but it must not be presented as proof of exploitability.

```text
# Agentic Safety Review Report

Verdict: PASS | WARN | BLOCK | NEEDS_HUMAN_REVIEW | MIGRATION_PLAN_REQUIRED
Mode: Build Mode | Audit Mode
Scope: <affected domains>

## Summary

- Current work:
- Baseline rules loaded:
- Reference overlays loaded:
- Repo-local conventions reviewed:
- External scanner evidence:

## Findings

### <finding id>: <title>

Severity: info | low | medium | high | critical
Decision: PASS | WARN | BLOCK | NEEDS_HUMAN_REVIEW | MIGRATION_PLAN_REQUIRED
Claim type: confirmed_misconfiguration | missing_evidence | risky_pattern | needs_human_review
Confidence: low | medium | high
Evidence strength: direct | indirect | missing | inferred
Affected domains: <domains>
Blast radius: local | module | workflow | service | system | unknown
Evidence:
- <path:line - snippet, command output, config, schema, scanner result, or explicit missing evidence>
Reasoning:
- <agent reasoning, separate from evidence>
Required action:
- <required remediation>

## Refactorability Scorecard

| Axis | Score | Evidence |
| --- | ---: | --- |
| Core Invariant Damage | 0-5 | |
| Blast Radius | 0-5 | |
| Migration Risk | 0-5 | |
| Testability | 0-5 | |
| Boundary Clarity | 0-5 | |
| Operational Evidence | 0-5 | |

Common score:
Domain modifiers:
Hard triggers:
Final score:

## Recommended Remediation Strategy

Strategy: Incremental Refactor | Incremental Refactor with Human Checkpoints | Strangler Migration | Rebuild From Baseline | Human Architecture Review Required

Why:
- <scorecard and hard-trigger rationale>

Next safe action:
- <one bounded action, or human review request>

## Runtime CVE Exposure

Include when docker-runtime, ci-cd, or agent-config findings involve Linux hosts, containers, self-hosted runners, build farms, or agent sandboxes.

Runtime:
- advisory id:
- CVE:
- Linux distribution and version:
- running kernel:
- installed patched kernel:
- reboot evidence:
- kernel patch source:

Exposure:
- untrusted code path:
- shared Linux kernel boundary:
- runner isolation:
- container or sandbox isolation:
- privileged credentials reachable from workload:

Mitigation evidence:
- vendor patch applied:
- AF_ALG or affected module mitigation:
- seccomp profile blocks risky socket family when applicable:
- runner or sandbox is ephemeral:
- monitoring and incident evidence:

## Rebuild Brief

Include only when the recommended strategy is Rebuild From Baseline.

preserve:
- <requirements, domain concepts, workflows, behavior, tests, operational knowledge>

discard:
- <unsafe architecture, schema, runtime, instruction, or convention>

new baseline architecture:
- <core invariants and boundaries>

migration caution:
- <data, API, client, integration, rollout, rollback, observability risk>

required human decisions:
- <decisions the agent cannot make>

## Missing Evidence

- <explicit missing evidence; do not treat missing evidence as success>
```
