# AI Data Boundary Overlay

This overlay strengthens data privacy and agent-config baseline rules for AI-enabled systems. It cannot weaken baseline rules or remove evidence requirements.

## Strengthened Guidance

- Prompt boundary: prompts, attachments, transcripts, system messages, and model-visible context need a documented prompt boundary before model invocation.
- Retrieval boundary: retrieval sources, embeddings, vector indexes, and generated context must enforce authorization, tenant isolation, freshness, and deletion behavior.
- Training exclusion: production or user-derived data must have a documented training exclusion or an explicit consent and opt-out path before model training or fine-tuning.
- Tenant isolation: tenant, account, workspace, and environment boundaries must be preserved across prompts, retrieval, caches, evaluations, and model traces.
- Tool output boundary: tool output returned to a model or external processor must be classified for sensitive data, customer data, operational evidence, and retention behavior.
- Human review: high-impact model-assisted decisions need a human review path, appeal path, and audit trail.
- Processor evidence: external model or inference providers need documented retention, logging, subprocessors, region, incident contact, and deletion behavior.
- Evaluation data: eval sets and prompt regression fixtures must avoid production data unless consent, retention, masking, and deletion evidence exist.

## Hard Triggers

- AI processing can mix tenant data through retrieval, embeddings, cache, prompt reuse, or trace storage without tenant isolation evidence.
- User-derived data can be used for training without training exclusion, consent, opt-out, and deletion evidence.
- High-impact model-assisted decisions have no human review, appeal, audit trail, or fallback path.
- Tool output containing sensitive data is sent to a model or external processor without boundary and retention evidence.
