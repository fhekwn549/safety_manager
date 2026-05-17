# API Contract Baseline Rules

## ASR-API-001: Public contract changes require compatibility review

Rule ID: ASR-API-001
Severity: high
Rationale: Client integrations can break when response, request, or behavior changes silently.
Evidence: OpenAPI or GraphQL diff, client impact notes, versioning plan, and compatibility tests.
Confidence: High

## ASR-API-002: Error shape remains stable

Rule ID: ASR-API-002
Severity: medium
Rationale: Clients often branch on error code, status, and field shape.
Evidence: Error schema, examples, contract tests, and migration notes.
Confidence: Medium

## ASR-API-009: Authorization semantics are contract changes

Rule ID: ASR-API-009
Severity: high
Rationale: A change to authorization semantics, access scope, tenant visibility, or ownership meaning can break clients even when schema is unchanged.
Evidence: Access scope diff, policy notes, client impact review, migration notes, and compatibility tests.
Confidence: High

## ASR-API-010: Deprecation, rate-limit, and retry behavior are documented

Rule ID: ASR-API-010
Severity: medium
Rationale: Deprecation lifecycle, rate-limit headers, retry headers, webhook ordering, and eventual consistency shape client behavior.
Evidence: Deprecation timeline, rate-limit and retry headers, webhook ordering notes, eventual consistency docs, and examples.
Confidence: Medium

## ASR-API-003: Pagination and cursor semantics are explicit

Rule ID: ASR-API-003
Severity: medium
Rationale: Ambiguous pagination creates duplication, skipped records, and client data drift.
Evidence: API docs, cursor contract, sort stability, and tests for page transitions.
Confidence: Medium

## ASR-API-004: Webhooks verify authenticity and replay windows

Rule ID: ASR-API-004
Severity: critical
Rationale: Unsigned or replayable webhooks can forge state changes.
Evidence: Signature validation, timestamp tolerance, idempotency handling, and tests.
Confidence: High

## ASR-API-005: Versioning expectations are explicit

Rule ID: ASR-API-005
Severity: high
Rationale: Public clients need to know whether behavior changes are versioned, additive, or breaking.
Evidence: Version policy, changelog, route naming, headers, and client migration notes.
Confidence: High

## ASR-API-006: Required fields are added compatibly

Rule ID: ASR-API-006
Severity: high
Rationale: Adding required request fields breaks existing clients unless defaults or versions exist.
Evidence: Schema diff, default behavior, version gate, and compatibility tests.
Confidence: High

## ASR-API-007: Retryable operations prevent duplicate mutation

Rule ID: ASR-API-007
Severity: critical
Rationale: Network retries can create duplicate writes without idempotency or dedupe records.
Evidence: Idempotency key handling, duplicate request tests, and storage constraints.
Confidence: High

## ASR-API-008: Examples match actual contract

Rule ID: ASR-API-008
Severity: medium
Rationale: Stale examples mislead clients and agent-generated integrations.
Evidence: Generated examples, schema validation, docs tests, and sample responses.
Confidence: Medium
