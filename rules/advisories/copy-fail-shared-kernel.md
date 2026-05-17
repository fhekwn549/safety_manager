# Copy Fail Shared Kernel Advisory

Advisory ID: ASR-ADV-COPY-FAIL
Public ID: CVE-2026-31431
Affected domains: docker-runtime, ci-cd, agent-config, sensitive-config, observability

## Summary

Copy Fail is represented here as a defensive shared Linux kernel exposure advisory. It is used to review environments where untrusted code runs on containers, self-hosted runners, build workers, or agent sandboxes that share a Linux kernel with other workloads.

This advisory must not include exploit details. It only defines evidence requirements, mitigation evidence, hard triggers, and missing evidence prompts.

## Evidence requirements

- running kernel version
- installed patched kernel version
- reboot evidence showing the patched kernel is active
- workload isolation model
- runner or sandbox lifecycle
- reachable credential and deployment permissions
- seccomp or module mitigation evidence where patching is not complete

## Mitigation evidence:

- vendor patch applied
- host reboot completed
- untrusted jobs moved to ephemeral runner isolation
- shared Linux kernel boundary removed or constrained
- AF_ALG or affected module access blocked for untrusted workloads
- high-value credentials removed from the affected execution path

## Hard triggers:

- Untrusted code runs on a shared Linux kernel and patch evidence is missing.
- Self-hosted runner executes fork, plugin, dependency, or generated code and is not ephemeral.
- Container runtime uses privileged mode, host mounts, broad capabilities, or host runtime socket access.
- Agent sandbox combines shell access with persistent workspace or credential reachability.

## Missing evidence:

- No running kernel version captured.
- Installed patched package exists, but reboot evidence is missing.
- Container image is updated, but host kernel is unknown.
- Isolation is claimed, but shared Linux kernel boundary is not documented.
- On-disk integrity checks exist, but runtime compromise detection is missing.
