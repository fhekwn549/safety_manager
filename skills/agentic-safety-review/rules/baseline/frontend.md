# Frontend Baseline Rules

## ASR-FE-001: Client authorization is not security authority

Rule ID: ASR-FE-001
Severity: critical
Rationale: Client-side checks can improve UX but cannot protect privileged data or actions.
Evidence: Server-side authorization path, route guards, API checks, and tests for denied access.
Confidence: High

## ASR-FE-002: Sensitive state must reconcile with server authority

Rule ID: ASR-FE-002
Severity: high
Rationale: Auth, payment, entitlement, ownership, and permission state must not be final on the client.
Evidence: API contract, server validation, optimistic UI rollback, and reconciliation behavior.
Confidence: High

## ASR-FE-003: Secrets must not ship in bundles

Rule ID: ASR-FE-003
Severity: critical
Rationale: Browser bundles are public artifacts.
Evidence: Build config, environment variable prefixes, bundle scan, and secret scanner output.
Confidence: High

## ASR-FE-004: Client token storage minimizes exposure

Rule ID: ASR-FE-004
Severity: high
Rationale: Long-lived browser tokens are exposed to XSS, extensions, and local device compromise.
Evidence: Auth storage design, cookie flags, token lifetime, refresh flow, and XSS controls.
Confidence: High

## ASR-FE-005: Optimistic UI reconciles sensitive mutations

Rule ID: ASR-FE-005
Severity: high
Rationale: optimistic UI for money, credits, ownership, or permission changes can show false authority.
Evidence: Rollback behavior, server reconciliation, retry behavior, and mutation tests.
Confidence: High

## ASR-FE-006: Client validation matches server validation

Rule ID: ASR-FE-006
Severity: high
Rationale: Client-only validation is bypassable and can drift from server constraints.
Evidence: Shared schema, server validation tests, form validation, and API error handling.
Confidence: High

## ASR-FE-007: Sensitive bundle contents are reviewed

Rule ID: ASR-FE-007
Severity: high
Rationale: Generated bundles can expose internal endpoints, feature flags, or privileged assumptions.
Evidence: Build output review, source map policy, environment variable allowlist, and artifact scan.
Confidence: Medium

## ASR-FE-008: Frontend errors do not disclose internals

Rule ID: ASR-FE-008
Severity: medium
Rationale: Client-visible stack traces, internal ids, and raw provider errors help attackers map the system.
Evidence: Error boundary behavior, production build config, API error mapping, and screenshots.
Confidence: Medium
