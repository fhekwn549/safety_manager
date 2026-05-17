# Database Baseline Rules

## ASR-DB-001: Ownership uses immutable internal identifiers

Rule ID: ASR-DB-001
Severity: critical
Rationale: Mutable external claims such as email or phone can transfer ownership accidentally.
Evidence: Schema, foreign keys, migrations, model definitions, and ownership query paths.
Confidence: High

## ASR-DB-009: Backup restore drills prove rollback evidence

Rule ID: ASR-DB-009
Severity: high
Rationale: A backup is not reliable until a backup restore drill proves restore evidence and data validation.
Evidence: Restore drill record, backup age, validation query, recovery time, and operator notes.
Confidence: Medium

## ASR-DB-010: Online migrations use expand/contract safety

Rule ID: ASR-DB-010
Severity: high
Rationale: Online migration of tenant partition, row-level isolation, or hot tables needs expand/contract sequencing.
Evidence: Expand/contract plan, dual-read or dual-write notes, row-level policy tests, tenant partition validation, and rollback path.
Confidence: High

## ASR-DB-002: Destructive migration requires rollout and rollback evidence

Rule ID: ASR-DB-002
Severity: critical
Rationale: Data deletion and incompatible schema changes can create permanent production loss.
Evidence: Migration plan, backup, validation, backward compatibility, and rollback path.
Confidence: High

## ASR-DB-003: Constraint and index changes consider existing data

Rule ID: ASR-DB-003
Severity: high
Rationale: Unique, foreign key, and index changes can fail deploys or lock production tables.
Evidence: Data profiling, lock strategy, backfill plan, and deploy sequencing.
Confidence: High

## ASR-DB-004: Critical records are auditable

Rule ID: ASR-DB-004
Severity: high
Rationale: Payments, entitlements, permissions, and privacy actions need traceable history.
Evidence: Ledger, event history, audit table, correlation id, and retention policy.
Confidence: High

## ASR-DB-005: Transaction boundaries protect multi-record invariants

Rule ID: ASR-DB-005
Severity: high
Rationale: Multi-record updates can leave partial state without transaction or compensation design.
Evidence: Transaction use, isolation notes, retry handling, and failure tests.
Confidence: High

## ASR-DB-006: Backfills are resumable and validated

Rule ID: ASR-DB-006
Severity: high
Rationale: Large data repairs fail in production unless they can resume and prove correctness.
Evidence: Backfill script, checkpointing, validation query, dry run, and rollback plan.
Confidence: Medium

## ASR-DB-007: Read models cannot become authority silently

Rule ID: ASR-DB-007
Severity: high
Rationale: Caches, projections, and denormalized tables can drift from authoritative writes.
Evidence: Source-of-truth docs, invalidation flow, reconciliation job, and tests.
Confidence: Medium

## ASR-DB-008: Permission data changes are migration-safe

Rule ID: ASR-DB-008
Severity: critical
Rationale: Role, policy, and entitlement schema changes can grant or remove access unexpectedly.
Evidence: Migration plan, compatibility tests, policy diff, and rollback notes.
Confidence: High
