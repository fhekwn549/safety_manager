# Supply Chain Baseline Rules

## ASR-SC-001: Dependency lockfile changes are reviewed

Rule ID: ASR-SC-001
Severity: high
Rationale: Lockfile changes can alter executed code even when application source looks unchanged.
Evidence: Lockfile diff, package manager version, dependency update source, and review record.
Confidence: High

## ASR-SC-002: Dependency provenance is known for critical packages

Rule ID: ASR-SC-002
Severity: high
Rationale: Dependency provenance helps distinguish expected packages from abandoned, renamed, or unexpected sources.
Evidence: Package registry source, repository link, release metadata, maintainer history, and dependency review output.
Confidence: Medium

## ASR-SC-003: Dependency lifecycle scripts are bounded

Rule ID: ASR-SC-003
Severity: high
Rationale: Install and build lifecycle scripts execute before normal project controls can validate the dependency graph.
Evidence: Package manager script policy, install flags, allowlist, CI logs, and dependency review.
Confidence: High

## ASR-SC-004: Package publishing authority is protected

Rule ID: ASR-SC-004
Severity: critical
Rationale: Package publishing authority can distribute unsafe artifacts to every downstream consumer.
Evidence: Registry permissions, release job identity, namespace ownership, two-person approval, and publishing logs.
Confidence: High

## ASR-SC-005: Maintainer trust changes are reviewed

Rule ID: ASR-SC-005
Severity: medium
Rationale: Maintainer trust changes can alter package behavior, release authority, or dependency update risk.
Evidence: Maintainer change log, ownership review, package transfer record, repository activity, and risk note.
Confidence: Operational Heuristic

## ASR-SC-006: SBOM and artifact attestation exist for releases

Rule ID: ASR-SC-006
Severity: high
Rationale: SBOM and artifact attestation evidence connect released artifacts to reviewed source and build steps.
Evidence: SBOM file, artifact attestation, build provenance, release tag, and artifact digest.
Confidence: Medium

## ASR-SC-007: Dependency confusion boundaries are explicit

Rule ID: ASR-SC-007
Severity: high
Rationale: Private package names and mixed registries need clear resolution boundaries to prevent unintended package source selection.
Evidence: Registry config, scoped package rules, internal namespace reservation, install logs, and package manager policy.
Confidence: High

## ASR-SC-008: Release signing is validated before consumption

Rule ID: ASR-SC-008
Severity: high
Rationale: Release signing and verification protect consumers from artifact substitution and unreviewed release paths.
Evidence: Signing policy, trusted keys, verification logs, release signing record, and consumer validation step.
Confidence: Medium
