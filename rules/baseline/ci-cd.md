# CI/CD Baseline Rules

## ASR-CI-001: Workflow tokens use least privilege

Rule ID: ASR-CI-001
Severity: high
Rationale: Broad CI permissions turn code execution into repository or deployment compromise.
Evidence: Workflow permissions, token scopes, branch protection, and release job config.
Confidence: High

## ASR-CI-009: Build caches respect branch trust

Rule ID: ASR-CI-009
Severity: high
Rationale: Cache poisoning can let untrusted branches or forks influence trusted builds.
Evidence: Cache keys, restore keys, branch trust policy, fork behavior, and dependency cache scope.
Confidence: High

## ASR-CI-010: Release identity prefers short-lived OIDC and attestations

Rule ID: ASR-CI-010
Severity: high
Rationale: Long-lived deploy identity increases blast radius compared with OIDC, SBOM, and artifact attestation evidence.
Evidence: OIDC trust policy, deploy role scope, SBOM, artifact attestation, and release provenance.
Confidence: Medium

## ASR-CI-002: Fork and untrusted PR execution cannot access secrets

Rule ID: ASR-CI-002
Severity: critical
Rationale: PR code is untrusted and may exfiltrate available credentials.
Evidence: Trigger config, secret availability, runner type, and job permissions.
Confidence: High

## ASR-CI-003: Dependency lifecycle scripts are supply-chain risk

Rule ID: ASR-CI-003
Severity: high
Rationale: Install scripts run code before project tests can defend the pipeline.
Evidence: Package manager config, lockfiles, install flags, and dependency review.
Confidence: High

## ASR-CI-004: Release jobs have provenance and rollback evidence

Rule ID: ASR-CI-004
Severity: medium
Rationale: Production releases need traceability and a practical rollback path.
Evidence: Tags, artifacts, attestations, deployment logs, and rollback process.
Confidence: Medium

## ASR-CI-005: Self-hosted runners isolate untrusted code

Rule ID: ASR-CI-005
Severity: critical
Rationale: Fork or plugin code on long-lived runners can persist, reach sensitive env, or exploit the host.
Evidence: Runner lifecycle, isolation model, teardown logs, and credential boundary.
Confidence: High

## ASR-CI-006: Generated artifacts are reviewed before release

Rule ID: ASR-CI-006
Severity: high
Rationale: Generated artifacts can smuggle code or configuration that source review misses.
Evidence: Artifact diff, generation command, review policy, and reproducibility notes.
Confidence: Medium

## ASR-CI-007: Deploy environments require explicit approval boundaries

Rule ID: ASR-CI-007
Severity: high
Rationale: Automated deploys need clear promotion, approval, and rollback boundaries.
Evidence: Environment protection, approval config, deployment logs, and rollback runbook.
Confidence: Medium

## ASR-CI-008: Build scripts avoid implicit remote execution

Rule ID: ASR-CI-008
Severity: high
Rationale: Curl-pipe-shell, unpinned installers, and mutable remote scripts bypass review.
Evidence: Workflow commands, pinned versions, checksums, and dependency source review.
Confidence: High
