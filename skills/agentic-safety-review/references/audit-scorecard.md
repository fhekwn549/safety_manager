# Audit Mode Scorecard

Audit Mode reviews an existing repo or package against baseline rules. It reports baseline drift with evidence, records affected domains, rank findings by risk, calculates the Refactorability Scorecard, and recommends a remediation strategy.

## Finding Ranking

Rank findings before writing the final report. Highest-risk findings appear first.

Use this ordering:

1. Hard triggers that force BLOCK, MIGRATION_PLAN_REQUIRED, NEEDS_HUMAN_REVIEW, or Rebuild From Baseline.
2. Critical severity findings that affect identity, ownership, authorization, tenant isolation, money, entitlements, data deletion, secrets, production deploys, or public API compatibility.
3. Findings with broad blast radius across multiple modules, services, workflows, or deployment paths.
4. Findings that create migration risk for data, clients, contracts, rollouts, rollback, or external integrations.
5. Findings with missing evidence that prevents reliable agent judgment.

For each finding, state severity, blast radius, evidence, affected domains, and required action.

## Common Refactorability Scorecard

Each common axis is scored 0-5. Higher scores mean the repo is harder to repair safely.

| Axis | 0-1 | 2-3 | 4-5 |
| --- | --- | --- | --- |
| Core Invariant Damage | Core identity, ownership, authz, tenant, money, and entitlement invariants are intact. | Some critical paths rely on weak or ambiguous invariants. | Core invariants are absent, contradictory, or broadly violated. |
| Blast Radius | Drift is isolated to one small area. | Drift affects several modules or workflows. | Drift is systemic across layers, services, or deploy paths. |
| Migration Risk | Changes are local and backward compatible. | Data, API, or rollout sequencing needs explicit planning. | Repair requires risky data migration, contract breakage, or production cutover. |
| Testability | Behavior is covered by useful tests, contracts, fixtures, or examples. | Some safety-critical behavior can be tested, but gaps remain. | Critical behavior has little evidence and no reliable regression harness. |
| Boundary Clarity | Frontend, server, database, infra, and domain boundaries are clear. | Boundaries exist but are leaky or inconsistently enforced. | Boundaries are unclear enough that fixes risk changing unrelated behavior. |
| Operational Evidence | Logs, audit trails, metrics, deploy config, and rollback evidence are present. | Some operational evidence exists, but it is incomplete. | Production behavior, rollback, or incident diagnosis cannot be inferred. |

## Domain Extensions

Domain rule packs may add domain-specific score modifiers and hard triggers. They are additive only:

- Domain-specific score modifiers can increase one or more common score axes.
- Domain-specific score modifiers cannot reduce the common score.
- Hard triggers can force a strategy or verdict even when the numeric score is lower.
- Hard triggers must cite the rule, evidence, affected domains, and uncertainty.

See `rules/domain-score-modifiers.md`.

## Active Runtime Vulnerability Pressure

AI-assisted vulnerability discovery can compress the patch window for kernel, runtime, CI, and sandbox flaws. When an audit finds untrusted code running on shared-kernel isolation, treat the environment as high pressure even if no exploit validation is performed.

Apply these modifiers when evidence supports them:

- Add 1-2 to Migration Risk when kernel patch state, running kernel version, reboot evidence, or vendor mitigation evidence is missing for a currently exploited local privilege escalation class.
- Add 1-2 to Blast Radius when multiple containers, jobs, users, tenants, or agent sessions share one Linux kernel.
- Add 1 to Operational Evidence when monitoring only checks on-disk file integrity and cannot explain in-memory compromise paths such as setuid page-cache corruption.
- Use Human Architecture Review Required when the system handles regulated data or customer workloads and shared-kernel isolation is the main tenant boundary.

## Core Service Migration Pressure

Increase Migration Risk when restore drill evidence, online migration sequencing, or authorization semantics evidence is missing. Database backup without restore drill proof is weak rollback evidence. API changes that alter authorization semantics, access scope, tenant visibility, or ownership meaning can be breaking changes even when the schema is stable. Online migration plans should explain expand/contract sequencing before production data or client compatibility is touched.

## Strategy Selection

Start with the common score total, then apply domain modifiers and hard triggers.

| Score | Default strategy |
| --- | --- |
| 0-10 | Incremental Refactor |
| 11-18 | Incremental Refactor with Human Checkpoints |
| 19-24 | Strangler Migration |
| 25-30 or multiple severe hard triggers | Rebuild From Baseline |

Use Human Architecture Review Required instead of a purely numeric recommendation when the repo is in a regulated or high-risk domain and required evidence is missing, contradictory, or outside agent authority.

## Rebuild From Baseline Rule

When recommending Rebuild From Baseline, the agent must create a rebuild brief and must not start implementation. The brief preserves useful product and domain knowledge while discarding unsafe architecture decisions.
