# Secrets And Config Baseline Rules

## ASR-SEC-001: Secrets are never committed or generated into source artifacts

Rule ID: ASR-SEC-001
Severity: critical
Rationale: Source and generated artifacts spread beyond runtime secret controls.
Evidence: Secret scanner output, config files, generated bundles, snapshots, and logs.
Confidence: High

## ASR-SEC-002: Environment separation is explicit

Rule ID: ASR-SEC-002
Severity: high
Rationale: Production defaults in local or test environments cause accidental data exposure.
Evidence: Config schema, environment templates, deployment config, and docs.
Confidence: High

## ASR-SEC-003: Long-lived credentials require rotation and revocation

Rule ID: ASR-SEC-003
Severity: high
Rationale: Credentials without revocation paths remain dangerous after exposure.
Evidence: Secret manager metadata, rotation docs, owner, and incident procedure.
Confidence: Medium
