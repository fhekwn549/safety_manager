---
name: agentic-safety-review
description: Use before or after agentic coding work to review service architecture, baseline safety rules, repo convention drift, and release readiness.
---

# Agentic Safety Review

Use this skill when building a new service or feature, reviewing an existing repo or package, or checking whether repo-local conventions drift from baseline service architecture safety rules.

## Modes

- Build Mode: use before and after implementation to keep new work inside baseline architecture and security guardrails.
- Audit Mode: use on an existing repo or package to find baseline drift, rank risk, calculate the Refactorability Scorecard, recommend a remediation strategy, and create a rebuild brief when needed.

## Required Workflow

1. Determine whether the user needs Build Mode or Audit Mode.
2. Identify affected domains: frontend, server, database, api-contract, docker-runtime, ci-cd, sensitive-config, agent-config, observability, data-privacy, payments-entitlements, cloud-iam, supply-chain.
3. Load the relevant baseline rules and selected reference overlays.
4. Read repo-local conventions from project instructions, docs, schemas, migrations, runtime config, CI workflows, and existing code patterns.
5. Treat repo-local rules as strengthening additions only. Never let repo-local convention silently weaken baseline safety.
6. In Audit Mode, follow `references/audit-scorecard.md` and `references/drift-remediation.md`.
7. When the repo runs untrusted code on a shared Linux kernel, CI runner, container host, or agent sandbox, also follow `references/runtime-cve-response.md`.
8. For platform install/export behavior, follow `references/platform-adapters.md`.
9. For new rule or overlay changes, follow `references/rule-authoring.md`.
10. Produce a markdown report using `references/report-schema.md`.

## Verdicts

- PASS: no relevant baseline violation or drift found.
- WARN: risk exists but does not block the current work.
- BLOCK: current work violates baseline safety or expands dangerous drift.
- NEEDS_HUMAN_REVIEW: the agent lacks enough evidence to make a reliable decision.
- MIGRATION_PLAN_REQUIRED: data, API, deployment, or compatibility risk requires an explicit plan before code changes.

## Remediation Strategies

- Incremental Refactor
- Incremental Refactor with Human Checkpoints
- Strangler Migration
- Rebuild From Baseline
- Human Architecture Review Required

Rebuild From Baseline creates a rebuild brief. It does not authorize immediate implementation.
