import test from 'node:test';
import assert from 'node:assert/strict';
import { auditRepo } from '../scripts/lib/repo-audit.mjs';

for (const [fixtureName, expectation] of Object.entries({
  'unsafe-cloud-iam': {
    verdict: 'BLOCK',
    findings: ['ASR-IAM-003', 'ASR-IAM-004', 'ASR-IAM-006'],
    scope: ['cloud-iam'],
  },
  'unsafe-supply-chain': {
    verdict: 'BLOCK',
    findings: ['ASR-SC-003', 'ASR-SC-004', 'ASR-SC-007'],
    scope: ['supply-chain'],
  },
  'unsafe-ai-data-boundary': {
    verdict: 'BLOCK',
    findings: ['ASR-AI-001', 'ASR-AI-002', 'ASR-AI-003', 'ASR-AI-004'],
    scope: ['data-privacy', 'agent-config'],
  },
})) {
  test(`auditRepo detects ${fixtureName} domain findings`, async () => {
    const result = await auditRepo({ repoPath: `fixtures/${fixtureName}` });

    assert.equal(result.verdict, expectation.verdict);
    assert.deepEqual(
      result.findings.map((finding) => finding.ruleId),
      expectation.findings,
    );
    assert.deepEqual(result.reportData.scope, expectation.scope);
    assert.match(result.report, /# Agentic Safety Review Report/);
    assert.match(result.report, /## Findings/);
    assert.match(result.report, /## Refactorability Scorecard/);
    assert.match(result.report, /## Recommended Remediation Strategy/);
  });
}
