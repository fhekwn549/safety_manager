# Safety Manager Review Pack

This review pack is for public practical feedback on Safety Manager as an agentic coding guardrail and review signal tool.

The reports in this folder come from deterministic fixtures. They are meant to show how the tool explains risk signals, missing evidence, and remediation paths for agent-assisted coding work.

## What To Review

- Finding usefulness: does each finding help a maintainer make a better decision?
- Evidence credibility: does cited evidence support the finding?
- False positives: where would this tool likely over-warn?
- Actionability: is the recommended next step concrete enough?

## Reproduce

```bash
npm install
npm test
npm run eval
npm run review-pack
```

## Contents

- `sample-reports/`: generated audit reports for 6 fixture repos.
- `eval-report.md`: benchmark behavior on labeled fixtures.
- `known-limitations.md`: current boundaries and failure modes.
- `reviewer-rubric.md`: scoring rubric for reviewers.
- `feedback-template.md`: structured feedback form.
- `feedback-template.csv`: spreadsheet-friendly feedback form.
- `post-draft.md`: draft community post.

## Scope

Safety Manager looks for review signals in repo evidence and rulebook overlays. It does not prove exploitability or replace human review. Treat every finding as a prompt for evidence-based review.
