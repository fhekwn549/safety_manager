# CI/CD Runner Hardening Overlay

This overlay strengthens baseline CI/CD rules. It cannot weaken baseline rules or remove evidence requirements.

## Strengthened Guidance

- Fork safety: untrusted fork code must not run with privileged tokens, deployment authority, or sensitive environment values.
- Runner isolation: self-hosted runner jobs that execute untrusted code should use ephemeral runner isolation or VM boundaries.
- Artifact provenance: generated artifacts need source commit, build command, dependency lock, and review evidence before release.
- Rollback: release jobs need a documented rollback path and operator evidence.
- Dependency lifecycle: install scripts and generated code are treated as untrusted execution unless pinned and reviewed.
- Cache poisoning: cache keys and restore keys must separate fork, branch trust, OS, lockfile, and dependency source.
- OIDC: cloud deploy identity should use short-lived OIDC federation instead of long-lived deploy material when supported.
- SBOM: release artifacts should have SBOM and attestation evidence tied to source commit and build inputs.

## Hard Triggers

- A long-lived self-hosted runner executes untrusted code and can reach release or deployment authority.
- Artifact provenance is missing for release assets.
- Rollback evidence is missing for production deployment jobs.
- Trusted release jobs restore caches written by untrusted branches or forks.
