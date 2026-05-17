# Agent Config Baseline Rules

## ASR-AGENT-001: Agent instruction changes are security-sensitive

Rule ID: ASR-AGENT-001
Severity: high
Rationale: Instruction files can change tool use, trust boundaries, and review behavior.
Evidence: AGENTS.md, CLAUDE.md, skill files, plugin files, and diff review.
Confidence: High

## ASR-AGENT-002: Tool permission combinations require blast-radius review

Rule ID: ASR-AGENT-002
Severity: critical
Rationale: Shell, network, filesystem write, and credential access together create escalation paths.
Evidence: MCP config, plugin manifest, sandbox config, environment variables, and allowed tools.
Confidence: High

## ASR-AGENT-003: External instructions are untrusted until reviewed

Rule ID: ASR-AGENT-003
Severity: high
Rationale: Remote instructions, installers, and generated prompts can inject behavior.
Evidence: Fetch sources, checksums, review path, and privilege separation.
Confidence: High

## ASR-AGENT-004: Prompt injection risk is reviewed for instruction sources

Rule ID: ASR-AGENT-004
Severity: high
Rationale: Docs, issues, web pages, and generated files can contain instructions that conflict with trusted policy.
Evidence: Source trust classification, instruction hierarchy, and ignored untrusted directives.
Confidence: High

## ASR-AGENT-005: MCP endpoints have narrow authority

Rule ID: ASR-AGENT-005
Severity: critical
Rationale: MCP tools can combine data access, network calls, and writes across trust boundaries.
Evidence: MCP config, allowed tools, auth scope, network scope, and audit logs.
Confidence: High

## ASR-AGENT-006: Plugin install paths are reviewed

Rule ID: ASR-AGENT-006
Severity: high
Rationale: Plugins and skills can alter agent behavior after installation.
Evidence: Plugin manifest, install script, file writes, source review, and update path.
Confidence: Medium

## ASR-AGENT-009: MCP server provenance and updates are pinned

Rule ID: ASR-AGENT-009
Severity: high
Rationale: MCP server provenance and update pinning prevent unreviewed tool behavior changes.
Evidence: MCP server source, version pin, checksum or lockfile, update process, and owner review.
Confidence: High

## ASR-AGENT-010: Tool output exfiltration paths are bounded

Rule ID: ASR-AGENT-010
Severity: critical
Rationale: Tool output exfiltration to an external sink can leak code, data, prompts, sensitive values, or operational evidence.
Evidence: Network egress policy, external sink allowlist, log routing, clipboard/upload controls, and human approval for privileged tool bundle use.
Confidence: High

## ASR-AGENT-007: Shell and filesystem writes are scoped

Rule ID: ASR-AGENT-007
Severity: high
Rationale: Shell plus broad filesystem access can modify trusted project or user state.
Evidence: Sandbox policy, writable roots, denied paths, and command log.
Confidence: High

## ASR-AGENT-008: Credential access is separated from code execution

Rule ID: ASR-AGENT-008
Severity: critical
Rationale: Agent-run code should not inherit credentials that are unrelated to the task.
Evidence: Environment allowlist, secret manager policy, process env review, and isolation boundary.
Confidence: High
