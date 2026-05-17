# Data Privacy Export And Deletion Overlay

This overlay strengthens data privacy baseline rules. It cannot weaken baseline rules or remove evidence requirements.

## Strengthened Guidance

- Data minimization: new collection must name the product purpose and retention expectation.
- Export: bulk export requires authorization, access logging, target format, and downstream handling notes.
- Import: imported data must pass validation, ownership mapping, and environment checks.
- Deletion: deletion workflows must include primary stores, derived stores, logs, backups, and third-party processors where applicable.
- Retention: retention behavior must be explicit for production, preview, test, and local environments.
- Access logging: sensitive reads and bulk operations need actor, target, purpose, and correlation evidence.
- AI/LLM processing: prompts, attachments, embeddings, tool outputs, and retrieved context need an explicit processing boundary before being sent to any model or agent runtime.
- Prompt retention: model calls must document prompt retention, transcript retention, deletion path, and whether retained material can be reviewed by a vendor operator.
- Model training: production or user-derived data must not be used for model training or fine-tuning unless consent, opt-out, retention, and deletion behavior are documented.
- Vendor inference: third-party inference needs vendor inference evidence for data use, subprocessors, logging, regional processing, and incident contact paths.
- Data residency: data residency and regional transfer behavior must be stated for exports, imports, backups, analytics, AI processing, and support tooling.
- Subject access: subject access export results need verification that primary data, derived data, and processor-held data are included or explicitly excluded by policy.
- Consent and opt-out: consent, opt-out, deletion, and marketing preference changes must propagate to downstream processors, analytics stores, AI/LLM usage, and support views.

## Hard Triggers

- Production PII is copied into non-production environments without masking or approval evidence.
- Deletion claims exist without validation evidence.
- Export flow bypasses normal authorization or audit trails.
- AI/LLM or vendor inference receives PII without prompt retention, model training, data residency, and regional transfer evidence.
- Consent or opt-out state is collected but not enforced across downstream processors or AI/LLM data paths.
- Subject access export exists without verification of derived data and processor-held data coverage.
