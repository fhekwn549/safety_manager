# Drift Remediation

Baseline drift is any repo-local convention, implementation pattern, generated artifact, runtime default, or documented instruction that weakens the baseline safety rules.

Repo-local convention can strengthen baseline rules. It cannot weaken them silently.

## Drift Finding Requirements

Every drift finding must include:

- Baseline rule or invariant in conflict.
- Evidence with file path, line reference when available, command output, config snippet, schema, migration, test result, or explicit missing evidence.
- Affected domains such as server, database, api-contract, docker-runtime, ci-cd, sensitive-config, agent-config, observability, data-privacy, payments-entitlements, cloud-iam, or supply-chain.
- Severity and blast radius.
- Whether current work directly touches, expands, or only observes the drift.
- Required remediation action.

## Remediation Strategies

### Incremental Refactor

Use when drift is isolated, tests or contracts can protect behavior, and repair can happen in small compatible changes.

Required report content:

- Target baseline state.
- First safe slice.
- Regression test or verification evidence.
- Rollback or revert path.

### Incremental Refactor with Human Checkpoints

Use when incremental repair is feasible but human approval is needed for domain meaning, data interpretation, rollout timing, security tradeoffs, or user impact.

Required report content:

- Same content as Incremental Refactor.
- Human checkpoint list.
- Decisions blocked on human input.

### Strangler Migration

Use when unsafe behavior is broad but can be wrapped, routed around, or replaced feature-by-feature without a full stop.

Required report content:

- Stable boundary for the strangler facade or adapter.
- Compatibility and coexistence strategy.
- Cutover milestones.
- Data sync, validation, and rollback plan.

### Rebuild From Baseline

Use when core invariants are too damaged, blast radius is systemic, migration risk is high, or hard triggers make repair unreliable.

Rebuild From Baseline produces a rebuild brief only. It must not start implementation.

The rebuild brief must include:

- preserve: requirements, domain concepts, workflows, user-visible behavior, APIs, tests, and operational knowledge worth keeping.
- discard: repo conventions, architecture, schema patterns, runtime defaults, instructions, or generated artifacts that conflict with baseline rules.
- new baseline architecture: core invariants, trust boundaries, ownership model, data model constraints, runtime assumptions, and deploy boundaries.
- migration caution: data, API, client, integration, production rollout, rollback, and observability risks.
- required human decisions: business, compliance, security, customer-impacting, or domain choices the agent cannot decide.

### Human Architecture Review Required

Use when the evidence is insufficient, contradictory, legally sensitive, security-sensitive, compliance-sensitive, or outside the agent's authority.

Required report content:

- Missing or contradictory evidence.
- Why agent judgment is unsafe.
- Specific questions for the human reviewer.
