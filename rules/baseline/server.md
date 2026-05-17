# Server Baseline Rules

## ASR-SRV-001: Authentication and authorization are separate decisions

Rule ID: ASR-SRV-001
Severity: critical
Rationale: Knowing who a caller is does not prove what they may access.
Evidence: Auth middleware, policy checks, route handlers, and denied-access tests.
Confidence: High

## ASR-SRV-002: Tenant and ownership boundaries apply to every read and write

Rule ID: ASR-SRV-002
Severity: critical
Rationale: Missing boundary filters create cross-user and cross-tenant data exposure.
Evidence: Query scopes, service methods, policy tests, and data access patterns.
Confidence: High

## ASR-SRV-003: Trust boundaries validate external input

Rule ID: ASR-SRV-003
Severity: high
Rationale: API, queue, webhook, file, and job inputs are attacker-controlled until validated.
Evidence: Schema validation, parser behavior, error handling, and fuzz or contract tests.
Confidence: High

## ASR-SRV-004: Critical mutations are transactional and idempotent

Rule ID: ASR-SRV-004
Severity: high
Rationale: Money, entitlement, inventory, and ownership mutations must survive retries and partial failures.
Evidence: Transaction boundaries, idempotency keys, retry behavior, and rollback tests.
Confidence: High

## ASR-SRV-005: Error responses avoid sensitive disclosure

Rule ID: ASR-SRV-005
Severity: high
Rationale: Server errors must not expose stack traces, internal queries, tokens, or provider internals.
Evidence: Error middleware, production config, response examples, and negative tests.
Confidence: High

## ASR-SRV-006: Background jobs preserve authorization context

Rule ID: ASR-SRV-006
Severity: high
Rationale: Async jobs can bypass request-time authorization if actor, tenant, and purpose are not carried forward.
Evidence: Job payload schema, actor id, tenant id, policy checks, and retry behavior.
Confidence: Medium

## ASR-SRV-007: External service callbacks verify trust boundaries

Rule ID: ASR-SRV-007
Severity: critical
Rationale: Webhooks and callbacks can mutate state and must prove origin and replay safety.
Evidence: Signature verification, timestamp tolerance, idempotency record, and tests.
Confidence: High

## ASR-SRV-008: Rate and abuse controls protect expensive paths

Rule ID: ASR-SRV-008
Severity: medium
Rationale: Login, search, export, AI, and billing paths can be abused without throttling or quotas.
Evidence: Rate limits, quotas, abuse logs, and operational alerts.
Confidence: Operational Heuristic

## ASR-SRV-009: Browser session mutations protect cookie and CSRF boundaries

Rule ID: ASR-SRV-009
Severity: critical
Rationale: Cookie-backed session mutations need CSRF protection and explicit SameSite, secure, and httpOnly behavior.
Evidence: Session middleware, cookie flags, CSRF token or same-site strategy, mutation tests, and browser flow docs.
Confidence: High

## ASR-SRV-010: Internal service calls authenticate and invalidate authorization state

Rule ID: ASR-SRV-010
Severity: high
Rationale: service-to-service and internal API calls are trust boundaries, and authorization cache invalidation must follow role, tenant, and ownership changes.
Evidence: Internal API auth, service identity, policy cache invalidation, role-change tests, and audit evidence.
Confidence: High
