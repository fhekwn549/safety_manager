# Payments Entitlements Reconciliation Overlay

This overlay strengthens payments and entitlements baseline rules. It cannot weaken baseline rules or remove evidence requirements.

## Strengthened Guidance

- Immutable ownership: money, credits, subscriptions, and entitlements must map to immutable internal account or user ids.
- Webhook idempotency: provider events must be stored with unique event ids before local mutation.
- Ledger: entitlement grants, revocations, transfers, refunds, and cancellations need ledger or history evidence.
- Reconciliation: provider state and local state need a periodic or on-demand reconciliation path.
- Refund and cancel: state transitions need explicit policy checks and support-visible history.
- Transfer: cross-user transfer requires approval evidence, audit trail, and negative tests.
- Invoice and tax records: invoice, receipt, credit note, and tax calculation outputs are legal record material and need append-only correction or voiding behavior rather than silent mutation.
- Dispute and chargeback: dispute, chargeback, evidence-submitted, won, lost, and reversed states need a state machine that preserves paid-access decisions and finance history.
- Proration and plan-change: upgrade, downgrade, pause, resume, seat change, coupon, trial, and plan-change paths need proration evidence and idempotent entitlement recalculation.
- Grace period and failure-mode policy: payment failure, provider outage, webhook delay, retry exhaustion, and reconciliation mismatch need a documented grace period and failure-mode decision for paid access.

## Hard Triggers

- Client state is final authority for paid access.
- Mutable external claims identify payment or entitlement ownership.
- Provider webhook mutation lacks idempotency or raw event history.
- Invoice, tax, or other legal record material can be overwritten without append-only correction evidence.
- Dispute or chargeback handling changes entitlement state without a modeled state transition and audit trail.
- Payment failure-mode behavior grants or removes paid access without policy, grace period, and reconciliation evidence.
