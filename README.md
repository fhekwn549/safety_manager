# Agentic Safety Review

Agentic Safety Review is a portable skill and rulebook package for baseline-first service architecture safety review. It helps an agent review new work and existing repos against common safety invariants before unsafe local conventions spread further.

It is an agentic coding guardrail and review signal tool, not a vulnerability scanner. Findings should be treated as evidence-backed review prompts that can include false positives or missing evidence.

repo-local rules cannot weaken baseline safety. Local rules may add stricter project requirements, but a local convention that conflicts with the baseline must be reported as drift.

## Modes

Build Mode is for new service or feature work. Use it before implementation to identify relevant domains, load baseline rules, choose reference overlays, and record hard blockers. Use it again after implementation to review the resulting diff.

Audit Mode is for existing repos or packages. It collects repo conventions, compares them with baseline rules, ranks findings, calculates the Refactorability Scorecard, recommends a remediation strategy, and creates a rebuild brief when needed.

## Install

Generic markdown export:

```bash
./install.sh --target generic --output ./AGENTIC_SAFETY_REVIEW.md
```

Codex skill install:

```bash
./install.sh --target codex
```

The installer does not overwrite existing files by default. Use `--force` only when you intentionally want to replace the target.

## Usage

Supported baseline domains include `frontend`, `server`, `database`, `api-contract`, `docker-runtime`, `ci-cd`, `sensitive-config`, `agent-config`, `observability`, `data-privacy`, `payments-entitlements`, `cloud-iam`, and `supply-chain`. The `data-privacy/ai-data-boundary` overlay covers prompt, retrieval, training, tenant, and tool-output boundaries for AI-enabled systems.

Run local tests:

```bash
npm test
```

Run fixture self-tests and write reports. The self-test suite currently covers 9 fixtures, including `unsafe-cloud-iam`, `unsafe-supply-chain`, and `unsafe-ai-data-boundary`.

```bash
npm run self-test -- --output ./tmp/reports
```

Audit a local repo:

```bash
npm run audit -- --repo ./fixtures/unsafe-docker --output ./tmp/report.md
npm run audit -- --repo ./fixtures/unsafe-docker --output ./tmp/report.json --format json
```

Regenerate the checked-in sample markdown and JSON reports from fixture evidence:

```bash
npm run generate:sample-report
```

Measure benchmark performance against the labeled fixture corpus:

```bash
npm run eval
```

The evaluation report writes `eval/report.md` and `eval/report.json`. It scores Recall, Precision, verdict accuracy, evidence quality, actionability, and domain coverage into an Overall Score. This score measures current benchmark behavior, not general real-world accuracy.

Build a public feedback bundle with sample reports, limitations, reviewer rubric, feedback template, eval report, and discussion post draft:

```bash
npm run review-pack
```

The review pack writes `review-pack/` and is intended for practical feedback on finding usefulness, evidence credibility, false positives, and actionability.

Useful docs:

- [Usage guide](docs/usage.md)
- [Rule authoring guide](docs/rule-authoring.md)
- [Sample report](examples/sample-report.md)
- [Sample JSON report](examples/sample-report.json)

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

Rebuild From Baseline produces a rebuild brief. It does not authorize immediate implementation.
