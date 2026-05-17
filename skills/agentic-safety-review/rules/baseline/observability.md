# Observability Baseline Rules

## ASR-OBS-001: Critical mutations emit audit evidence

Rule ID: ASR-OBS-001
Severity: high
Rationale: Security, payment, entitlement, and privacy incidents require traceable events.
Evidence: Audit logs, event schema, actor id, target id, correlation id, and retention.
Confidence: High

## ASR-OBS-002: Logs redact sensitive data

Rule ID: ASR-OBS-002
Severity: critical
Rationale: Logs are widely replicated and often less protected than primary stores.
Evidence: Logger config, redaction rules, examples, and test snapshots.
Confidence: High

## ASR-OBS-003: Deploys expose rollback and diagnosis signals

Rule ID: ASR-OBS-003
Severity: medium
Rationale: Operators need enough evidence to identify and reverse bad releases.
Evidence: Health checks, metrics, release markers, alerts, and rollback docs.
Confidence: Medium

## ASR-OBS-004: Correlation ids cross service boundaries

Rule ID: ASR-OBS-004
Severity: medium
Rationale: Incidents cannot be reconstructed when requests, jobs, and provider calls cannot be joined.
Evidence: Request id propagation, job metadata, provider metadata, and log examples.
Confidence: Medium

## ASR-OBS-005: Error visibility distinguishes user and operator detail

Rule ID: ASR-OBS-005
Severity: medium
Rationale: Users need safe messages while operators need actionable diagnostics.
Evidence: Error mapping, internal logs, alert routing, and redaction behavior.
Confidence: Medium

## ASR-OBS-006: Alerts exist for critical invariant failures

Rule ID: ASR-OBS-006
Severity: high
Rationale: Payment, entitlement, auth, privacy, and runtime failures need timely detection.
Evidence: Alert rules, thresholds, owners, runbooks, and test incidents.
Confidence: Operational Heuristic

## ASR-OBS-007: Audit trail records actor and target

Rule ID: ASR-OBS-007
Severity: high
Rationale: Critical changes must identify who acted, what changed, and which object was affected.
Evidence: Audit schema, actor id, target id, before/after data, and retention.
Confidence: High

## ASR-OBS-008: Runtime security events are observable

Rule ID: ASR-OBS-008
Severity: high
Rationale: Privilege changes, runner escapes, and unusual process behavior need detection evidence.
Evidence: Runtime logs, kernel or host telemetry, alert rules, and incident workflow.
Confidence: Operational Heuristic
