# Docker Runtime Reference Overlay

This overlay strengthens Docker and runtime review for deployable Linux workloads.

## References

- Docker official security guidance.
- Kubernetes pod security guidance.
- CIS Docker and container hardening guidance.

## Strengthened Rules

- Non-root: images and runtime manifests should run as non-root unless a narrow constraint is documented.
- Capabilities: drop default capabilities where feasible and add only explicitly required capabilities.
- Host mounts: host paths, Docker socket, device mounts, and privileged mode require human review.
- Build hygiene: secrets must use secret mounts or external secret stores, not ARG, ENV, image layers, or logs.
- Healthcheck: services need health evidence appropriate to deployment and rollback decisions.
- Runtime config: build-time and runtime config must be separated.
- Shared kernel: untrusted workloads need kernel patch evidence, seccomp, and isolation review.
- Image trust: production images should use pinned digest references and track base image EOL status.
- Kernel profiles: seccomp, AppArmor, and SELinux settings should be documented with exception rationale.
