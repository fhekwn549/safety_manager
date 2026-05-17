# Known Limitations

Safety Manager is not a vulnerability scanner, CVE detector, exploit validator, or compliance certification tool.

## False Positives

Rules are conservative and evidence-driven. A repo can trigger a finding when the code is acceptable but the fixture or repo lacks clear proof of ownership, isolation, compatibility, runtime mitigation, or human-review workflow.

## False Negatives

The tool can miss risks when evidence is hidden in unsupported file types, external systems, runtime configuration, SaaS settings, private docs, or deployment state.

## Fixture Bias

The current benchmark is based on small deterministic fixtures. Scores show fixture behavior, not broad real-world accuracy.

## Evidence Limits

Reports cite local files and missing evidence. They do not inspect live cloud resources, production kernels, package registry settings, secrets managers, or CI provider state.

## Severity Limits

Severity is calibrated for review priority. It is not a claim that a repo is exploitable or that a security incident exists.
