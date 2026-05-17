# Payments And Entitlements Baseline Rules

## ASR-PAY-001: Money and entitlement ownership uses immutable IDs

Rule ID: ASR-PAY-001
Severity: critical
Rationale: Mutable claims can transfer paid access or financial records to the wrong account.
Evidence: Schema, provider mapping, account id usage, and migration history.
Confidence: High

## ASR-PAY-002: Payment and entitlement changes are idempotent

Rule ID: ASR-PAY-002
Severity: critical
Rationale: Retries and duplicate webhooks must not double-charge or double-grant access.
Evidence: Idempotency keys, webhook event storage, transaction boundaries, and tests.
Confidence: High

## ASR-PAY-003: Entitlement state has history or ledger evidence

Rule ID: ASR-PAY-003
Severity: high
Rationale: Support, audit, and reconciliation need to explain state transitions.
Evidence: Ledger, event log, provider sync, actor id, and correlation id.
Confidence: High

## ASR-PAY-004: Refund, cancel, and transfer flows are guarded

Rule ID: ASR-PAY-004
Severity: high
Rationale: Edge transitions can leak access, revoke the wrong user, or lose money.
Evidence: State machine, policy checks, provider contract, and tests.
Confidence: High

## ASR-PAY-005: Webhook events are stored before mutation

Rule ID: ASR-PAY-005
Severity: critical
Rationale: Payment providers retry and reorder events; raw event history supports idempotency and audit.
Evidence: Event table, unique provider event id, signature check, and replay tests.
Confidence: High

## ASR-PAY-006: Provider state and local state reconcile

Rule ID: ASR-PAY-006
Severity: high
Rationale: Subscription, invoice, and entitlement state can drift between provider and app.
Evidence: Reconciliation job, mismatch handling, provider API reads, and support workflow.
Confidence: High

## ASR-PAY-007: Cross-user transfer requires explicit approval

Rule ID: ASR-PAY-007
Severity: critical
Rationale: Moving credits, subscriptions, or ownership can grant value to the wrong account.
Evidence: Policy check, audit trail, approval record, and negative tests.
Confidence: High

## ASR-PAY-008: Client cannot grant or extend entitlement authority

Rule ID: ASR-PAY-008
Severity: critical
Rationale: The server or provider-backed system must be authority for paid access.
Evidence: Server checks, provider sync, entitlement source of truth, and denied-client tests.
Confidence: High
