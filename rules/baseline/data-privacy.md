# Data Privacy Baseline Rules

## ASR-PRIV-001: Data collection has a stated purpose

Rule ID: ASR-PRIV-001
Severity: high
Rationale: Unbounded PII collection increases exposure and deletion obligations.
Evidence: Data model, product requirement, privacy notes, and retention policy.
Confidence: Medium

## ASR-PRIV-002: PII boundaries are visible in code and config

Rule ID: ASR-PRIV-002
Severity: high
Rationale: Engineers and agents need to know when data requires stricter handling.
Evidence: Schema annotations, docs, access controls, logging rules, and exports.
Confidence: Medium

## ASR-PRIV-003: Deletion and retention behavior is explicit

Rule ID: ASR-PRIV-003
Severity: high
Rationale: Privacy promises fail when backups, logs, and derived stores are ignored.
Evidence: Retention config, deletion workflow, backup policy, and tests.
Confidence: Medium

## ASR-PRIV-004: Access logging covers sensitive data reads

Rule ID: ASR-PRIV-004
Severity: high
Rationale: Sensitive data access needs traceability for abuse review and incident response.
Evidence: Access logs, actor id, purpose, target record, and retention period.
Confidence: Medium

## ASR-PRIV-005: Export and import flows preserve boundaries

Rule ID: ASR-PRIV-005
Severity: high
Rationale: Bulk data movement can bypass normal access control and minimization rules.
Evidence: Export authorization, import validation, file handling, and audit trail.
Confidence: Medium

## ASR-PRIV-006: Non-production environments avoid production PII

Rule ID: ASR-PRIV-006
Severity: critical
Rationale: Test, preview, and local environments often have weaker access controls.
Evidence: Data masking, seed data, environment separation, and access policy.
Confidence: High

## ASR-PRIV-007: Data sharing with third parties is explicit

Rule ID: ASR-PRIV-007
Severity: high
Rationale: Analytics, AI, email, and support tools can copy user data outside primary controls.
Evidence: Vendor list, data fields, purpose, opt-out behavior, and contract notes.
Confidence: Medium

## ASR-PRIV-008: Privacy-sensitive changes include rollback caution

Rule ID: ASR-PRIV-008
Severity: medium
Rationale: Once data is exported, logged, or sent externally, rollback may not remove exposure.
Evidence: Rollback notes, deletion path, downstream system list, and incident procedure.
Confidence: Operational Heuristic
