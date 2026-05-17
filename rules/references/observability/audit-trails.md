# Observability Audit Trails Overlay

This overlay strengthens observability baseline rules. It cannot weaken baseline rules or remove evidence requirements.

## Strengthened Guidance

- Audit trail: critical mutations must capture actor, target, action, before/after state, and correlation id.
- Correlation: request, job, provider event, deployment, and runtime records should share correlation fields.
- Redaction: logs must redact sensitive values while preserving operator detail.
- Error visibility: user-safe errors and operator diagnostics must be separated.
- Alert: critical invariant failures need owner, threshold, and runbook.
- Runtime evidence: runner escape, privilege change, suspicious setuid execution, and unexpected process behavior need detection or missing-evidence reporting.
- Rollback: deploy evidence should connect release marker, health signal, and rollback action.
- Alert owner and response SLA: every critical alert needs an alert owner, response SLA, escalation path, and stale-owner review evidence.
- Tamper resistance: audit logs for payments, entitlements, permissions, privacy, deployment, and runtime safety events need tamper resistance or tamper evidence.
- Metric label hygiene: metric label values must avoid user content, PII, tokens, high-cardinality identifiers, and other sensitive-data leakage paths.
- Incident reconstruction: incident reconstruction needs enough linked evidence to rebuild timeline, actor, target, decision point, deploy version, external provider event, and customer impact.

## Hard Triggers

- Critical payment, entitlement, permission, or privacy mutation has no audit trail.
- Runtime compromise indicators cannot be investigated from available evidence.
- Sensitive log redaction is missing for production logs.
- Critical alerts have no alert owner, response SLA, or escalation path.
- Critical audit logs can be modified or deleted without tamper resistance or tamper evidence.
- Metric label values expose sensitive-data leakage or unbounded user-controlled identifiers.
- Incident reconstruction cannot connect audit trail, logs, metrics, traces, deploy marker, and provider event evidence.
