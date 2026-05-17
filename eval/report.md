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

## Coverage Matrix

This matrix shows fixture coverage by rule. It is benchmark coverage, not real-world accuracy.

| Rule | Domain | Expected | Actual | True Positive | False Positive | False Negative | Recall | Precision |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ASR-AGENT-001 | agent-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-AGENT-002 | agent-config, sensitive-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-AI-001 | data-privacy, agent-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-AI-002 | data-privacy | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-AI-003 | data-privacy, agent-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-AI-004 | data-privacy, agent-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-API-001 | api-contract | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-API-002 | api-contract | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-CI-001 | ci-cd | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-CI-002 | ci-cd, sensitive-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-CI-005 | ci-cd, docker-runtime | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-DB-001 | database, payments-entitlements | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-DOCKER-001 | docker-runtime | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-DOCKER-002 | docker-runtime | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-IAM-003 | cloud-iam | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-IAM-004 | cloud-iam | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-IAM-006 | cloud-iam | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-LOCAL-001 | agent-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-PAY-001 | payments-entitlements, database | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-RUNTIME-001 | docker-runtime, ci-cd, agent-config | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-SC-003 | supply-chain | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-SC-004 | supply-chain | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |
| ASR-SC-007 | supply-chain | 1 | 1 | 1 | 0 | 0 | 100.0% | 100.0% |

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
