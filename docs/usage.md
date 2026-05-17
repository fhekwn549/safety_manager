# Usage

This package can be used as a generic markdown instruction export or as a Codex skill.

Safety Manager is an agentic coding guardrail and review signal tool, not a vulnerability scanner. Findings are prompts for evidence-based review and can include false positives or missing runtime context.

## Install Targets

Generic markdown:

```bash
./install.sh --target generic --output ./AGENTIC_SAFETY_REVIEW.md
```

Codex:

```bash
./install.sh --target codex
```

Both targets refuse to overwrite existing files unless `--force` is provided.

## Build Mode

Use Build Mode before and after new service or feature work.

Supported baseline domains include `frontend`, `server`, `database`, `api-contract`, `docker-runtime`, `ci-cd`, `sensitive-config`, `agent-config`, `observability`, `data-privacy`, `payments-entitlements`, `cloud-iam`, and `supply-chain`.

Selected reference overlays include `data-privacy/ai-data-boundary` for prompt boundary, retrieval boundary, training exclusion, tenant isolation, human review, and tool-output evidence.

## Audit Mode

Use Audit Mode for existing repos or packages. Audit Mode reads repo-local conventions, compares them with baseline safety rules, reports baseline drift with evidence, calculates the Refactorability Scorecard, and recommends remediation.

Repo-local rules cannot weaken baseline safety. If a local rule says to skip or relax a baseline rule, report it as drift.

## Reports

Reports use the schema in `skills/agentic-safety-review/references/report-schema.md`.

Required sections:

- Summary
- Findings
- Refactorability Scorecard
- Recommended Remediation Strategy
- Missing Evidence

Include Runtime CVE Exposure when the repo runs Linux containers, self-hosted runners, build farms, or agent sandboxes where untrusted code shares a kernel.

Missing Evidence must be explicit. Do not treat missing patch, reboot, contract, test, rollback, or human decision evidence as PASS.

## Self-Test

Run:

```bash
npm run self-test
```

Write fixture reports:

```bash
npm run self-test -- --output ./tmp/reports
```

The deterministic regression suite currently covers 9 fixture repos.

## Local Repo Audit CLI

Run a markdown audit:

```bash
npm run audit -- --repo ./fixtures/unsafe-docker --output ./tmp/report.md
```

Run a JSON audit:

```bash
npm run audit -- --repo ./fixtures/unsafe-docker --output ./tmp/report.json --format json
```

The CLI is deterministic and local. It maps local evidence patterns to the same report model used by fixture self-tests.

## Sample Report Generation

```bash
npm run generate:sample-report
```

## Evaluation Harness

`npm test` proves the package is internally consistent. It does not prove real-world audit quality.

Use the evaluation harness to score the detector against labeled benchmark cases:

```bash
npm run eval
```

Default outputs:

- `eval/report.md`
- `eval/report.json`

The report includes an Overall Score from 0 to 100. This is a benchmark-corpus score, not a guarantee that the detector will perform the same way on arbitrary production repos. Score dimensions include recall and precision.

## Public Review Pack

Build a public feedback bundle:

```bash
npm run review-pack
```

Default output:

- `review-pack/README.md`
- `review-pack/known-limitations.md`
- `review-pack/reviewer-rubric.md`
- `review-pack/feedback-template.md`
- `review-pack/sample-reports/`
- `review-pack/eval-report.md`
- `review-pack/post-draft.md`

Use this bundle to request practical feedback on finding usefulness, evidence credibility, false positives, and actionability. It uses deterministic fixture reports and does not claim that any real repo is vulnerable.
