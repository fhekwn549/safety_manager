# Cloud IAM Baseline Rules

## ASR-IAM-001: Cloud identities use least privilege

Rule ID: ASR-IAM-001
Severity: high
Rationale: Broad cloud identity scope turns small application or pipeline mistakes into account-level compromise.
Evidence: IAM policies, role bindings, group membership, permission boundaries, and access review records.
Confidence: High

## ASR-IAM-002: Temporary elevation is explicit and time-bounded

Rule ID: ASR-IAM-002
Severity: high
Rationale: Temporary elevation without expiry or approval becomes standing access.
Evidence: Elevation request, approver, expiry, session duration, and revocation evidence.
Confidence: High

## ASR-IAM-003: Service account authority is scoped to workload purpose

Rule ID: ASR-IAM-003
Severity: critical
Rationale: Service account reuse spreads authority across services, jobs, and environments.
Evidence: Service account inventory, workload identity mapping, role assignment, and environment separation.
Confidence: High

## ASR-IAM-004: Resource policy public exposure is reviewed

Rule ID: ASR-IAM-004
Severity: critical
Rationale: Public resource policies can expose storage, queues, keys, or invocation paths outside expected trust boundaries.
Evidence: Storage bucket policies, queue policies, key policies, function policies, public access blocks, and scanner output.
Confidence: High

## ASR-IAM-005: Cross-account trust is constrained

Rule ID: ASR-IAM-005
Severity: high
Rationale: Cross-account trust can bypass local permission assumptions when principals, conditions, or external ids are broad.
Evidence: Trust policy, allowed principals, condition keys, external id use, organization boundary, and access logs.
Confidence: High

## ASR-IAM-006: Break-glass access has owner and drill evidence

Rule ID: ASR-IAM-006
Severity: high
Rationale: Break-glass access is necessary for outages but dangerous without ownership, monitoring, and periodic validation.
Evidence: Break-glass owner, storage path, approval path, activation log, alert, revocation path, and drill record.
Confidence: Medium

## ASR-IAM-007: Identity federation claims are bounded

Rule ID: ASR-IAM-007
Severity: high
Rationale: Identity federation links external identity claims to cloud authority and must constrain issuer, audience, groups, and session lifetime.
Evidence: OIDC or SAML config, issuer, audience, subject mapping, group mapping, session duration, and claim validation.
Confidence: High

## ASR-IAM-008: Cloud audit log coverage is sufficient for investigation

Rule ID: ASR-IAM-008
Severity: high
Rationale: IAM changes, role assumptions, policy updates, and resource exposure changes need audit log evidence to support investigation and rollback.
Evidence: Audit log configuration, retention, protected storage, alert rules, correlation fields, and sample query output.
Confidence: High
