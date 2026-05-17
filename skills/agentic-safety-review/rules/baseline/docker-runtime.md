# Docker Runtime Baseline Rules

## ASR-DOCKER-001: Containers run as non-root by default

Rule ID: ASR-DOCKER-001
Severity: high
Rationale: Root inside a container increases host and workload impact when isolation fails.
Evidence: Dockerfile USER, runtime securityContext, image metadata, and deployment manifests.
Confidence: High

## ASR-DOCKER-002: Privileged runtime settings require human review

Rule ID: ASR-DOCKER-002
Severity: critical
Rationale: Privileged mode, host mounts, Docker socket, and broad capabilities weaken isolation.
Evidence: Compose, Kubernetes, systemd, and runtime flags.
Confidence: High

## ASR-DOCKER-003: Build secrets do not persist in layers

Rule ID: ASR-DOCKER-003
Severity: critical
Rationale: Image layers, build logs, and generated artifacts may expose credentials permanently.
Evidence: Dockerfile, build args, secret mounts, image history, and scanner output.
Confidence: High

## ASR-DOCKER-004: Runtime config is separate from build config

Rule ID: ASR-DOCKER-004
Severity: medium
Rationale: Build-time defaults can leak production assumptions into reusable images.
Evidence: Dockerfile, env config, deployment manifests, and config documentation.
Confidence: Medium

## ASR-DOCKER-005: Linux capabilities are minimized

Rule ID: ASR-DOCKER-005
Severity: high
Rationale: Extra capabilities can bypass container isolation and expand host impact.
Evidence: Compose, Kubernetes securityContext, runtime flags, and capability rationale.
Confidence: High

## ASR-DOCKER-006: Host mounts are narrowly justified

Rule ID: ASR-DOCKER-006
Severity: critical
Rationale: Host mounts can expose filesystem, container runtime, or node credentials to workloads.
Evidence: Volume config, mount mode, path allowlist, and human approval notes.
Confidence: High

## ASR-DOCKER-007: Healthcheck and readiness match deployment behavior

Rule ID: ASR-DOCKER-007
Severity: medium
Rationale: A running process is not proof that the service can receive traffic safely.
Evidence: Docker healthcheck, Kubernetes probes, dependency checks, and rollout behavior.
Confidence: Medium

## ASR-DOCKER-008: Resource limit and filesystem defaults are explicit

Rule ID: ASR-DOCKER-008
Severity: medium
Rationale: Missing resource limit or writable filesystem defaults make failure and compromise harder to contain.
Evidence: CPU and memory limits, read-only filesystem setting, temp storage plan, and runtime docs.
Confidence: Operational Heuristic

## ASR-DOCKER-009: Base image trust is explicit

Rule ID: ASR-DOCKER-009
Severity: high
Rationale: Unpinned images and base image EOL can silently introduce vulnerable runtime layers.
Evidence: Pinned digest, base image EOL status, update owner, image scan, and rebuild cadence.
Confidence: High

## ASR-DOCKER-010: Kernel policy profiles are reviewed

Rule ID: ASR-DOCKER-010
Severity: high
Rationale: seccomp, AppArmor, and SELinux profile evidence limits host impact when container isolation is stressed.
Evidence: seccomp profile, AppArmor profile, SELinux context, runtime manifest, and exception rationale.
Confidence: Medium
