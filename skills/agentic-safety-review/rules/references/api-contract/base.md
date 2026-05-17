# API Contract Reference Overlay

This overlay strengthens API contract review for public or semi-public APIs.

## References

- Stripe API design patterns for idempotency and error consistency.
- GitHub REST API patterns for versioning, pagination, and compatibility.
- Slack API patterns for webhooks, events, and retry behavior.

## Strengthened Rules

- Versioning: public behavior changes require a client impact note and compatibility decision.
- Compatibility: response field removal, enum removal, required field addition, and nullable changes require migration notes.
- Pagination: cursor semantics, sort stability, and duplicate handling must be documented.
- Webhooks: signature verification, timestamp tolerance, replay protection, and idempotency are required.
- Error schema: status, code, message, and retryability must remain stable or be versioned.
- Idempotency: retryable mutations require idempotency keys or equivalent duplicate suppression.
- Authorization semantics: access scope, tenant visibility, ownership meaning, and permission side effects are part of compatibility review.
- Deprecation lifecycle: announce, monitor, warn, and remove steps should be explicit.
- Rate-limit and retry headers: clients need stable headers and retry guidance.
- Webhook ordering: event ordering and eventual consistency expectations must be documented.
