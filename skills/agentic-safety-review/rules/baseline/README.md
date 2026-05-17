# Baseline Rulebook Index

Baseline rules are platform-agnostic safety rules. Repo-local rules may strengthen these rules, but must not weaken them silently.

Supported domains:

- frontend
- server
- database
- api-contract
- docker-runtime
- ci-cd
- sensitive-config
- agent-config
- observability
- data-privacy
- payments-entitlements
- cloud-iam
- supply-chain

Each rule file uses decision-oriented metadata:

- Rule ID
- Severity
- Rationale
- Evidence
- Confidence
