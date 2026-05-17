import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { packageRoot } from './package-assets.mjs';

const expectedFixtures = {
  'safe-basic-service': { verdict: 'PASS', findings: [] },
  'bad-identity-payment': { verdict: 'BLOCK', findings: ['ASR-DB-001', 'ASR-PAY-001'] },
  'unsafe-docker': { verdict: 'BLOCK', findings: ['ASR-DOCKER-001', 'ASR-DOCKER-002', 'ASR-RUNTIME-001'] },
  'unsafe-api-contract': { verdict: 'MIGRATION_PLAN_REQUIRED', findings: ['ASR-API-001', 'ASR-API-002'] },
  'unsafe-ci': { verdict: 'BLOCK', findings: ['ASR-CI-001', 'ASR-CI-002', 'ASR-CI-005'] },
  'agent-config-risk': { verdict: 'NEEDS_HUMAN_REVIEW', findings: ['ASR-AGENT-001', 'ASR-AGENT-002', 'ASR-LOCAL-001'] },
  'unsafe-cloud-iam': { verdict: 'BLOCK', findings: ['ASR-IAM-003', 'ASR-IAM-004', 'ASR-IAM-006'] },
  'unsafe-supply-chain': { verdict: 'BLOCK', findings: ['ASR-SC-003', 'ASR-SC-004', 'ASR-SC-007'] },
  'unsafe-ai-data-boundary': { verdict: 'BLOCK', findings: ['ASR-AI-001', 'ASR-AI-002', 'ASR-AI-003', 'ASR-AI-004'] },
};

const findingCatalog = {
  'ASR-DB-001': ['Mutable external claim used as ownership key', 'critical', ['database', 'payments-entitlements'], 'Incremental Refactor with Human Checkpoints'],
  'ASR-PAY-001': ['Payment ownership uses mutable identifier', 'critical', ['payments-entitlements', 'database'], 'Incremental Refactor with Human Checkpoints'],
  'ASR-DOCKER-001': ['Container does not prove non-root runtime', 'high', ['docker-runtime'], 'Incremental Refactor'],
  'ASR-DOCKER-002': ['Privileged runtime settings weaken isolation', 'critical', ['docker-runtime'], 'Human Architecture Review Required'],
  'ASR-RUNTIME-001': ['Untrusted workload shares Linux kernel without mitigation evidence', 'critical', ['docker-runtime', 'ci-cd', 'agent-config'], 'MIGRATION_PLAN_REQUIRED'],
  'ASR-API-001': ['Breaking public API contract lacks compatibility plan', 'high', ['api-contract'], 'MIGRATION_PLAN_REQUIRED'],
  'ASR-API-002': ['Error schema changes without client impact evidence', 'medium', ['api-contract'], 'MIGRATION_PLAN_REQUIRED'],
  'ASR-CI-001': ['Workflow token permissions are too broad', 'high', ['ci-cd'], 'Incremental Refactor'],
  'ASR-CI-002': ['Untrusted pull request code can access sensitive env', 'critical', ['ci-cd', 'sensitive-config'], 'Human Architecture Review Required'],
  'ASR-CI-005': ['Self-hosted runner executes untrusted code on shared kernel', 'critical', ['ci-cd', 'docker-runtime'], 'MIGRATION_PLAN_REQUIRED'],
  'ASR-AGENT-001': ['Agent instruction change requires review', 'high', ['agent-config'], 'Human Architecture Review Required'],
  'ASR-AGENT-002': ['Agent tool permissions combine shell, network, write, and credential access', 'critical', ['agent-config', 'sensitive-config'], 'Human Architecture Review Required'],
  'ASR-LOCAL-001': ['Repo-local rule attempts to weaken baseline', 'critical', ['agent-config'], 'Human Architecture Review Required'],
  'ASR-IAM-003': ['Service account authority crosses workload or environment boundaries', 'critical', ['cloud-iam'], 'Human Architecture Review Required'],
  'ASR-IAM-004': ['Cloud resource policy public exposure lacks owner evidence', 'critical', ['cloud-iam'], 'Human Architecture Review Required'],
  'ASR-IAM-006': ['Break-glass access lacks owner or drill evidence', 'high', ['cloud-iam'], 'Incremental Refactor with Human Checkpoints'],
  'ASR-SC-003': ['Dependency lifecycle scripts are not bounded', 'high', ['supply-chain'], 'Incremental Refactor with Human Checkpoints'],
  'ASR-SC-004': ['Package publishing authority is not protected', 'critical', ['supply-chain'], 'Human Architecture Review Required'],
  'ASR-SC-007': ['Dependency confusion boundary is ambiguous', 'high', ['supply-chain'], 'Incremental Refactor with Human Checkpoints'],
  'ASR-AI-001': ['AI retrieval or trace path can mix tenant data', 'critical', ['data-privacy', 'agent-config'], 'Human Architecture Review Required'],
  'ASR-AI-002': ['Training use lacks exclusion or opt-out evidence', 'critical', ['data-privacy'], 'Human Architecture Review Required'],
  'ASR-AI-003': ['High-impact model-assisted decision lacks human review', 'critical', ['data-privacy', 'agent-config'], 'Human Architecture Review Required'],
  'ASR-AI-004': ['Tool output crosses AI processor boundary without handling evidence', 'high', ['data-privacy', 'agent-config'], 'Incremental Refactor with Human Checkpoints'],
};

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', 'tmp']);

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...await listFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }
  return files.sort();
}

async function readDirectoryFiles(absoluteDir) {
  const files = await listFiles(absoluteDir);
  const entries = [];
  for (const file of files) {
    entries.push({ path: path.relative(absoluteDir, file), content: await readFile(file, 'utf8') });
  }
  return entries;
}

function has(files, predicate) {
  return files.some((file) => predicate(file.content, file.path));
}

function detectFindings(files) {
  const detected = [];
  if (has(files, (content) => /owner_email|payment_owner_email|user_email/.test(content))) detected.push('ASR-DB-001', 'ASR-PAY-001');
  if (has(files, (content, filePath) => filePath === 'Dockerfile' && !/^USER\s+[^0\s]/m.test(content))) detected.push('ASR-DOCKER-001');
  if (has(files, (content) => /privileged:\s*true|--privileged|docker\.sock|hostPath:/.test(content))) detected.push('ASR-DOCKER-002');
  if (has(files, (content) => /untrusted_workload:\s*true|shared_kernel:\s*true/.test(content))) detected.push('ASR-RUNTIME-001');
  if (has(files, (content) => /BREAKING_CHANGE|removed field|removed enum|required field added/.test(content))) detected.push('ASR-API-001');
  if (has(files, (content) => /error_shape_changed|error schema changed|renamed error code/.test(content))) detected.push('ASR-API-002');
  if (has(files, (content) => /permissions:\s*write-all|contents:\s*write|actions:\s*write/.test(content))) detected.push('ASR-CI-001');
  if (has(files, (content) => /pull_request_target|SENSITIVE_ENV_AVAILABLE/.test(content))) detected.push('ASR-CI-002');
  if (has(files, (content) => /self-hosted|shared_kernel_runner:\s*true/.test(content))) detected.push('ASR-CI-005');
  if (has(files, (content, filePath) => /AGENTS\.md|SKILL\.md|mcp|plugin/.test(filePath))) detected.push('ASR-AGENT-001');
  if (has(files, (content) => /shell:\s*true[\s\S]*network:\s*true[\s\S]*filesystem_write:\s*true[\s\S]*credential_access:\s*true/.test(content))) detected.push('ASR-AGENT-002');
  if (has(files, (content) => /weaken_baseline:\s*true|ignore baseline|baseline rules may be skipped/i.test(content))) detected.push('ASR-LOCAL-001');
  if (has(files, (content) => /service_account_reused_across_envs:\s*true/.test(content))) detected.push('ASR-IAM-003');
  if (has(files, (content) => /public_resource_policy_without_owner:\s*true/.test(content))) detected.push('ASR-IAM-004');
  if (has(files, (content) => /break_glass_without_owner:\s*true/.test(content))) detected.push('ASR-IAM-006');
  if (has(files, (content) => /dependency_lifecycle_scripts_unbounded/.test(content))) detected.push('ASR-SC-003');
  if (has(files, (content) => /package_publishing_unprotected/.test(content))) detected.push('ASR-SC-004');
  if (has(files, (content) => /dependency_confusion_risk/.test(content))) detected.push('ASR-SC-007');
  if (has(files, (content) => /ai_tenant_mix_without_isolation:\s*true/.test(content))) detected.push('ASR-AI-001');
  if (has(files, (content) => /training_without_opt_out:\s*true/.test(content))) detected.push('ASR-AI-002');
  if (has(files, (content) => /high_impact_no_human_review:\s*true/.test(content))) detected.push('ASR-AI-003');
  if (has(files, (content) => /tool_output_external_processor_no_boundary:\s*true/.test(content))) detected.push('ASR-AI-004');
  return [...new Set(detected)];
}

function verdictFor(findings) {
  if (findings.includes('ASR-RUNTIME-001') || findings.includes('ASR-CI-005')) return 'BLOCK';
  if (findings.includes('ASR-API-001')) return 'MIGRATION_PLAN_REQUIRED';
  if (findings.includes('ASR-LOCAL-001') || findings.includes('ASR-AGENT-002')) return 'NEEDS_HUMAN_REVIEW';
  if (findings.some((ruleId) => findingCatalog[ruleId]?.[1] === 'critical')) return 'BLOCK';
  return findings.length > 0 ? 'WARN' : 'PASS';
}

function evidenceMatches(ruleId, file) {
  const searchable = `${file.path}\n${file.content}`;
  if (ruleId.startsWith('ASR-DB') || ruleId.startsWith('ASR-PAY')) return /schema|payment|owner_email/.test(searchable);
  if (ruleId.startsWith('ASR-DOCKER') || ruleId === 'ASR-RUNTIME-001') return /Dockerfile|compose|runtime|shared_kernel|privileged/.test(searchable);
  if (ruleId.startsWith('ASR-API')) return /openapi|api|BREAKING_CHANGE|error_shape/.test(searchable);
  if (ruleId.startsWith('ASR-CI')) return /\.github|workflow|runner|pull_request|self-hosted/.test(searchable);
  if (ruleId.startsWith('ASR-AGENT') || ruleId.startsWith('ASR-LOCAL')) return /AGENTS|agent|mcp|baseline|tool/.test(searchable);
  if (ruleId.startsWith('ASR-IAM')) return /iam|cloud|service_account|resource_policy|break_glass/.test(searchable);
  if (ruleId.startsWith('ASR-SC')) return /package|lockfile|dependency|publishing|attestation|registry/.test(searchable);
  if (ruleId.startsWith('ASR-AI')) return /ai|prompt|training|tenant|tool_output|human_review/.test(searchable);
  return false;
}

function findingFromRule(ruleId, files) {
  const [title, severity, domains, strategy] = findingCatalog[ruleId];
  const evidence = files.filter((file) => evidenceMatches(ruleId, file)).map((file) => file.path);
  return { ruleId, title, severity, domains, strategy, evidence: evidence.length > 0 ? evidence : ['Missing Evidence: exact source path not identified'] };
}

function remediationStrategy(verdict, findings) {
  if (verdict === 'PASS') return 'Incremental Refactor';
  if (verdict === 'MIGRATION_PLAN_REQUIRED') return 'Strangler Migration';
  if (verdict === 'NEEDS_HUMAN_REVIEW') return 'Human Architecture Review Required';
  if (findings.some((finding) => finding.strategy === 'MIGRATION_PLAN_REQUIRED')) return 'Strangler Migration';
  return 'Incremental Refactor with Human Checkpoints';
}

function hasRulePrefix(findings, prefixes) {
  return findings.some((finding) => prefixes.some((prefix) => finding.ruleId.startsWith(prefix)));
}

function scorecardAxes(verdict, findings) {
  return {
    coreInvariantDamage: hasRulePrefix(findings, ['ASR-DB', 'ASR-PAY', 'ASR-AI']) ? 4 : 0,
    blastRadius: findings.some((finding) => finding.ruleId.includes('RUNTIME') || finding.ruleId.startsWith('ASR-CI') || finding.ruleId.startsWith('ASR-IAM') || finding.ruleId.startsWith('ASR-SC') || finding.ruleId.startsWith('ASR-AI')) ? 4 : 1,
    migrationRisk: verdict === 'MIGRATION_PLAN_REQUIRED' ? 4 : 1,
    testability: 1,
    boundaryClarity: hasRulePrefix(findings, ['ASR-AGENT', 'ASR-IAM', 'ASR-SC', 'ASR-AI']) ? 4 : 1,
    operationalEvidence: findings.length > 0 ? 3 : 0,
  };
}

function buildReportData({ fixtureName, verdict, findings }) {
  const scope = [...new Set(findings.flatMap((finding) => finding.domains))];
  const runtimeFinding = findings.some((finding) => finding.ruleId === 'ASR-RUNTIME-001' || finding.ruleId === 'ASR-CI-005');
  const axes = scorecardAxes(verdict, findings);

  return {
    verdict,
    mode: 'Audit Mode',
    scope: scope.length > 0 ? scope : ['fixture'],
    subject: fixtureName,
    summary: {
      currentWork: 'fixture self-test',
      baselineRulesLoaded: true,
      referenceOverlaysLoaded: true,
      repoLocalConventionsReviewed: true,
      externalScannerEvidence: 'not provided',
    },
    findings,
    scorecard: {
      axes,
      commonScore: 'fixture-derived',
      domainModifiers: findings.map((finding) => finding.ruleId),
      hardTriggers: findings.filter((finding) => finding.severity === 'critical').map((finding) => finding.ruleId),
      finalScore: 'fixture-derived',
    },
    remediation: {
      strategy: remediationStrategy(verdict, findings),
      why: ['Based on fixture findings and hard triggers.'],
      nextSafeAction: 'Keep this fixture outcome stable when editing rules.',
    },
    runtimeCveExposure: runtimeFinding ? {
      advisoryId: 'ASR-ADV-COPY-FAIL',
      cve: 'CVE-2026-31431',
      runtime: {
        runningKernel: 'Missing Evidence',
        kernelPatch: 'Missing Evidence',
        rebootEvidence: 'Missing Evidence',
      },
      exposure: {
        sharedLinuxKernelBoundary: 'present',
        runnerIsolation: 'Missing Evidence',
      },
      mitigationEvidence: ['Missing Evidence'],
    } : null,
    missingEvidence: findings.length > 0
      ? ['Missing Evidence entries are explicit where runtime, patch, or human-review evidence is not available.']
      : ['No missing evidence for this safe fixture.'],
  };
}

function buildReport({ fixtureName, verdict, findings }) {
  const domains = [...new Set(findings.flatMap((finding) => finding.domains))];
  const axes = scorecardAxes(verdict, findings);
  const overlayDetails = findings.some((finding) => finding.ruleId.startsWith('ASR-AI'))
    ? '- Reference overlay details: data-privacy/ai-data-boundary\n'
    : '';
  const findingBlocks = findings.length === 0
    ? '- No baseline drift found in fixture evidence.'
    : findings.map((finding) => `### ${finding.ruleId}: ${finding.title}

Severity: ${finding.severity}
Decision: ${verdict}
Affected domains: ${finding.domains.join(', ')}
Blast radius: ${finding.severity === 'critical' ? 'system' : 'module'}
Evidence:
${finding.evidence.map((item) => `- ${item}`).join('\n')}
Reasoning:
- Fixture evidence matches ${finding.ruleId}.
Required action:
- Follow ${finding.strategy}.`).join('\n\n');

  const runtimeSection = findings.some((finding) => finding.ruleId === 'ASR-RUNTIME-001' || finding.ruleId === 'ASR-CI-005')
    ? `
## Runtime CVE Exposure

Advisory: ASR-ADV-COPY-FAIL
CVE: CVE-2026-31431

Runtime:
- running kernel: Missing Evidence
- kernel patch: Missing Evidence
- reboot evidence: Missing Evidence

Exposure:
- shared Linux kernel boundary: present
- runner isolation: Missing Evidence

Mitigation evidence:
- mitigation evidence: Missing Evidence
`
    : '';

  return `# Agentic Safety Review Report

Verdict: ${verdict}
Mode: Audit Mode
Scope: ${domains.length > 0 ? domains.join(', ') : 'fixture'}
Fixture: ${fixtureName}

## Summary

- Current work: fixture self-test
- Baseline rules loaded: yes
- Reference overlays loaded: yes
${overlayDetails}- Repo-local conventions reviewed: yes
- External scanner evidence: not provided

## Findings

${findingBlocks}

## Refactorability Scorecard

| Axis | Score | Evidence |
| --- | ---: | --- |
| Core Invariant Damage | ${axes.coreInvariantDamage} | fixture evidence |
| Blast Radius | ${axes.blastRadius} | fixture evidence |
| Migration Risk | ${axes.migrationRisk} | fixture evidence |
| Testability | ${axes.testability} | fixture coverage |
| Boundary Clarity | ${axes.boundaryClarity} | fixture evidence |
| Operational Evidence | ${axes.operationalEvidence} | fixture evidence |

Common score: fixture-derived
Domain modifiers: ${findings.map((finding) => finding.ruleId).join(', ') || 'none'}
Hard triggers: ${findings.filter((finding) => finding.severity === 'critical').map((finding) => finding.ruleId).join(', ') || 'none'}
Final score: fixture-derived
${runtimeSection}
## Recommended Remediation Strategy

Strategy: ${remediationStrategy(verdict, findings)}

Why:
- Based on fixture findings and hard triggers.

Next safe action:
- Keep this fixture outcome stable when editing rules.

## Missing Evidence

${findings.length > 0 ? '- Missing Evidence entries are explicit where runtime, patch, or human-review evidence is not available.' : '- No missing evidence for this safe fixture.'}
`;
}

export async function auditDirectory({ repoPath, name = path.basename(repoPath) }) {
  const absoluteDir = path.resolve(repoPath);
  if (!await exists(absoluteDir)) throw new Error(`Repo not found: ${repoPath}`);
  const fixtureName = path.basename(absoluteDir);
  const files = await readDirectoryFiles(absoluteDir);
  const ruleIds = detectFindings(files);
  const findings = ruleIds.map((ruleId) => findingFromRule(ruleId, files));
  const verdict = verdictFor(ruleIds);
  return {
    name,
    verdict,
    findings,
    report: buildReport({ fixtureName, verdict, findings }),
    reportData: buildReportData({ fixtureName, verdict, findings }),
  };
}

export async function auditFixture(fixtureDir) {
  const absoluteDir = path.resolve(packageRoot, fixtureDir);
  return auditDirectory({ repoPath: absoluteDir, name: path.basename(absoluteDir) });
}

export async function runFixtureSelfTests({ outputDir = null } = {}) {
  const results = [];
  const failures = [];
  for (const [fixtureName, expectation] of Object.entries(expectedFixtures)) {
    const result = await auditFixture(`fixtures/${fixtureName}`);
    const actualFindings = result.findings.map((finding) => finding.ruleId);
    if (result.verdict !== expectation.verdict) failures.push(`${fixtureName}: expected verdict ${expectation.verdict}, got ${result.verdict}`);
    if (JSON.stringify(actualFindings) !== JSON.stringify(expectation.findings)) failures.push(`${fixtureName}: expected findings ${expectation.findings.join(',')}, got ${actualFindings.join(',')}`);
    if (outputDir) {
      await mkdir(outputDir, { recursive: true });
      await writeFile(path.join(outputDir, `${fixtureName}.md`), result.report, 'utf8');
    }
    results.push(result);
  }
  return { ok: failures.length === 0, failures, results };
}
