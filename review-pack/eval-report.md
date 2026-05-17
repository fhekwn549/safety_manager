# Safety Manager Evaluation Report

Overall Score: 100/100

## Summary

- Benchmark cases: 9
- Expected findings: 23
- Actual findings: 23
- True positives: 23
- False positives: 0
- False negatives: 0
- Verdict matches: 9

## Metrics

| Metric | Value | Weight |
| --- | ---: | ---: |
| Recall | 100.0% | 25 |
| Precision | 100.0% | 20 |
| Verdict Accuracy | 100.0% | 15 |
| Evidence Quality | 100.0% | 15 |
| Actionability | 100.0% | 15 |
| Domain Coverage | 100.0% | 10 |

## Domain Scores

| Domain | Score | Recall | Precision | Expected | Actual |
| --- | ---: | ---: | ---: | ---: | ---: |
| agent-config | 100 | 100.0% | 100.0% | 7 | 7 |
| api-contract | 100 | 100.0% | 100.0% | 2 | 2 |
| ci-cd | 100 | 100.0% | 100.0% | 4 | 4 |
| cloud-iam | 100 | 100.0% | 100.0% | 3 | 3 |
| data-privacy | 100 | 100.0% | 100.0% | 4 | 4 |
| database | 100 | 100.0% | 100.0% | 2 | 2 |
| docker-runtime | 100 | 100.0% | 100.0% | 4 | 4 |
| payments-entitlements | 100 | 100.0% | 100.0% | 2 | 2 |
| sensitive-config | 100 | 100.0% | 100.0% | 2 | 2 |
| supply-chain | 100 | 100.0% | 100.0% | 3 | 3 |

## Cases

| Case | Status | Expected Verdict | Actual Verdict | Findings Matched | False Positives |
| --- | --- | --- | --- | ---: | --- |
| safe-basic-service | PASS | PASS | PASS | 0/0 | none |
| bad-identity-payment | PASS | BLOCK | BLOCK | 2/2 | none |
| unsafe-docker | PASS | BLOCK | BLOCK | 3/3 | none |
| unsafe-api-contract | PASS | MIGRATION_PLAN_REQUIRED | MIGRATION_PLAN_REQUIRED | 2/2 | none |
| unsafe-ci | PASS | BLOCK | BLOCK | 3/3 | none |
| agent-config-risk | PASS | NEEDS_HUMAN_REVIEW | NEEDS_HUMAN_REVIEW | 3/3 | none |
| unsafe-cloud-iam | PASS | BLOCK | BLOCK | 3/3 | none |
| unsafe-supply-chain | PASS | BLOCK | BLOCK | 3/3 | none |
| unsafe-ai-data-boundary | PASS | BLOCK | BLOCK | 4/4 | none |
