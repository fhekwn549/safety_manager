# Sensitive Config Baseline Rules

## ASR-SCFG-001: Sensitive values are never committed or generated into source artifacts

Rule ID: ASR-SCFG-001
Severity: critical
Rationale: Source and generated artifacts spread beyond runtime controls.
Evidence: Scanner output, config files, generated bundles, snapshots, and logs.
Confidence: High

## ASR-SCFG-002: Environment separation is explicit

Rule ID: ASR-SCFG-002
Severity: high
Rationale: Production defaults in local or test environments cause accidental data exposure.
Evidence: Config schema, environment templates, deployment config, and docs.
Confidence: High

## ASR-SCFG-003: Long-lived credentials require rotation and revocation

Rule ID: ASR-SCFG-003
Severity: high
Rationale: Credentials without revocation paths remain dangerous after exposure.
Evidence: Credential owner, rotation docs, revocation path, and incident procedure.
Confidence: Medium

## ASR-SCFG-004: Runtime values do not appear in image layers

Rule ID: ASR-SCFG-004
Severity: critical
Rationale: Container image layers and build logs can preserve sensitive runtime values.
Evidence: Dockerfile, image history, build logs, and artifact review.
Confidence: High

## ASR-SCFG-005: Logs and snapshots redact sensitive values

Rule ID: ASR-SCFG-005
Severity: critical
Rationale: Logs, test snapshots, and crash dumps are copied broadly and retained longer than expected.
Evidence: Logger redaction, snapshot review, crash report config, and test output.
Confidence: High

## ASR-SCFG-006: Config defaults are safe for local and test use

Rule ID: ASR-SCFG-006
Severity: high
Rationale: Unsafe production-like defaults can connect tests or local runs to protected resources.
Evidence: Example env files, config schema, test defaults, and environment separation.
Confidence: Medium

## ASR-SCFG-007: Generated clients and bundles use allowlisted values

Rule ID: ASR-SCFG-007
Severity: high
Rationale: Code generation can copy sensitive config into browser bundles or published packages.
Evidence: Generator config, output review, public env allowlist, and package contents.
Confidence: Medium

## ASR-SCFG-008: Exposure response has an owner and validation path

Rule ID: ASR-SCFG-008
Severity: high
Rationale: Exposure handling needs a clear owner, rotation path, revocation path, and validation evidence.
Evidence: Owner metadata, response runbook, rotation record, revocation record, and audit trail.
Confidence: Medium
