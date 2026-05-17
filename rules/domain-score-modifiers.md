# Domain Score Modifiers

Domain score modifiers extend the common Refactorability Scorecard used by Audit Mode.

Modifiers are additive only. They cannot lower the common score, cannot erase a finding, and cannot override a hard trigger.

Each domain rule pack may define:

- Score modifiers: numeric additions to common score axes when domain evidence increases repair risk.
- Hard trigger: a condition that forces a verdict or remediation strategy regardless of the numeric score.

## database

Score modifiers:

- Add 1-2 to Core Invariant Damage when ownership uses mutable external claims such as email, phone, display name, or provider-specific mutable fields.
- Add 1-2 to Migration Risk when schema repair needs backfill, lock-sensitive index changes, destructive migration, or multi-step deploy sequencing.
- Add 1 to Operational Evidence when critical records have no audit trail, ledger, history, or validation evidence.

Hard triggers:

- Payment, entitlement, tenant, or permission ownership depends on mutable external claims.
- Destructive migration lacks backup, rollback, validation, or compatibility plan.

## docker-runtime

Score modifiers:

- Add 1-2 to Blast Radius when unsafe runtime defaults are copied across multiple services or deployment manifests.
- Add 1 to Operational Evidence when healthcheck, resource limit, runtime config separation, or rollback evidence is missing.
- Add 1-2 to Blast Radius when containers that run untrusted code share a Linux kernel with other workloads.
- Add 1-2 to Migration Risk when kernel LPE patch, reboot, seccomp, or module mitigation evidence is missing for shared Linux kernel hosts.
- Add 1 to Operational Evidence when base image EOL, pinned digest, seccomp, AppArmor, or SELinux evidence is missing.

Hard triggers:

- Runtime uses privileged mode, broad Linux capabilities, host root mount, Docker socket mount, or root user without documented constraint.
- Build secrets may be persisted into image layers, logs, or generated artifacts.
- Untrusted code runs in containers where shared Linux kernel isolation is the primary tenant boundary and kernel LPE mitigation evidence is missing.
- Production runtime uses unpinned or EOL base images with no owner or rebuild cadence.

## api-contract

Score modifiers:

- Add 1-2 to Migration Risk when public API changes affect versioning, response shape, error shape, pagination, webhook behavior, or idempotency.
- Add 1 to Testability when no contract tests, generated clients, compatibility fixtures, or examples cover the change.

Hard triggers:

- Breaking public contract change lacks compatibility plan and client impact evidence.
- Webhook or retryable mutation lacks signature verification, replay protection, or idempotency handling.

## ci-cd

Score modifiers:

- Add 1-2 to Blast Radius when a self-hosted runner, build farm, or long-lived worker executes untrusted code from pull requests, forks, plugins, generated scripts, or dependency lifecycle hooks.
- Add 1-2 to Operational Evidence when runner image version, running kernel, kernel patch state, reboot evidence, or teardown evidence is missing.
- Add 1 to Boundary Clarity when job credentials, package publishing tokens, cloud credentials, or deployment permissions are reachable from the same user or container context that executes untrusted code.
- Add 1-2 to Migration Risk when cache poisoning can cross branch trust boundaries.
- Add 1 to Operational Evidence when OIDC, SBOM, or artifact attestation evidence is missing for release jobs.

Hard triggers:

- A self-hosted runner executes untrusted code on a shared Linux kernel and is not an ephemeral runner.
- Untrusted CI jobs can reach privileged host mounts, Docker socket, package release credentials, cloud credentials, or deployment credentials.
- Trusted release jobs restore caches produced by untrusted branches, forks, or dependency lifecycle scripts.

## payments-entitlements

Score modifiers:

- Add 1-3 to Core Invariant Damage when money, credits, subscription state, ownership, transfer, refund, cancellation, or entitlements have ambiguous authority.
- Add 1-2 to Operational Evidence when critical mutations lack audit trail, correlation id, reconciliation path, or support-visible history.

Hard triggers:

- Client state is the final authority for money, credits, ownership, or entitlements.
- Refund, cancellation, transfer, or entitlement mutation lacks idempotency and auditability.

## agent-config

Score modifiers:

- Add 1-2 to Blast Radius when instruction files, installers, plugins, MCP config, shell tools, network access, filesystem write, or credential access are combined.
- Add 1 to Boundary Clarity when trusted and untrusted instructions are not separated.
- Add 1-2 to Blast Radius when an agent sandbox runs untrusted code on a shared Linux kernel with other users, jobs, tenants, or sensitive host credentials.
- Add 1 to Migration Risk when the sandbox cannot prove kernel LPE mitigation, runner recycling, filesystem isolation, and credential scoping.
- Add 1-2 to Blast Radius when tool output exfiltration can reach an external sink without allowlist or human approval.
- Add 1 to Operational Evidence when MCP server provenance, version pinning, or update review evidence is missing.

Hard triggers:

- External instruction source can alter trusted agent behavior without review.
- Installer or postinstall script can write privileged paths or access credentials without explicit human approval.
- An agent sandbox executes untrusted code with shell access on a shared Linux kernel and can reach credentials, host mounts, or persistent workspace state.
- A privileged tool bundle combines shell, network, filesystem write, sensitive value reachability, and external sink access without human approval.

## cloud-iam

Score modifiers:

- Add 1-2 to Blast Radius when cloud identities have broad account, project, subscription, or organization-level authority.
- Add 1 to Boundary Clarity when service account, workload identity, human access, and break-glass access are not separated.
- Add 1-2 to Operational Evidence when IAM audit log, role assumption, policy update, resource exposure, or temporary elevation evidence is missing.
- Add 1 to Migration Risk when access repair requires cross-account trust changes, federation remapping, or staged role replacement.

Hard triggers:

- Public resource policy exposes protected storage, queue, key, function, or invocation paths without documented owner and access evidence.
- Service account authority is reused across production and non-production environments without separation evidence.
- Break-glass access has no owner, activation log, alert, revocation path, or drill evidence.
- Cross-account or federated trust accepts broad principals, audiences, groups, or session duration without constraint evidence.

## supply-chain

Score modifiers:

- Add 1-2 to Blast Radius when dependency, build, or package publishing authority affects multiple services or downstream consumers.
- Add 1 to Operational Evidence when lockfile review, dependency provenance, SBOM, artifact attestation, or release signing evidence is missing.
- Add 1 to Boundary Clarity when public and private registry resolution, package namespace ownership, or publishing identity boundaries are ambiguous.
- Add 1 to Migration Risk when dependency repair requires package replacement, namespace migration, or coordinated consumer release.

Hard triggers:

- Package publishing authority lacks protected identity, owner review, release log, or two-person approval for critical packages.
- Private package names can resolve from an unintended public registry without namespace or registry boundary evidence.
- Released artifacts cannot be linked to reviewed source, SBOM, artifact attestation, or release signing evidence.

## ai-data-boundary

Score modifiers:

- Add 1-2 to Boundary Clarity when prompt boundary, retrieval boundary, tenant isolation, or tool output handling is unclear.
- Add 1-2 to Core Invariant Damage when AI-assisted decisions affect payments, permissions, privacy rights, account status, or eligibility.
- Add 1 to Operational Evidence when transcript retention, training exclusion, opt-out propagation, processor evidence, or human review evidence is missing.

Hard triggers:

- AI processing can mix tenant data through retrieval, embeddings, cache, prompt reuse, or trace storage without tenant isolation evidence.
- User-derived data can be used for training without training exclusion, consent, opt-out, and deletion evidence.
- High-impact model-assisted decisions have no human review, appeal, audit trail, or fallback path.
