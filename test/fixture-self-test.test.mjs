import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { auditFixture, runFixtureSelfTests } from '../scripts/lib/fixture-audit.mjs';

const execFileAsync = promisify(execFile);

const expected = {
  'safe-basic-service': {
    verdict: 'PASS',
    findings: [],
  },
  'bad-identity-payment': {
    verdict: 'BLOCK',
    findings: ['ASR-DB-001', 'ASR-PAY-001'],
  },
  'unsafe-docker': {
    verdict: 'BLOCK',
    findings: ['ASR-DOCKER-001', 'ASR-DOCKER-002', 'ASR-RUNTIME-001'],
  },
  'unsafe-api-contract': {
    verdict: 'MIGRATION_PLAN_REQUIRED',
    findings: ['ASR-API-001', 'ASR-API-002'],
  },
  'unsafe-ci': {
    verdict: 'BLOCK',
    findings: ['ASR-CI-001', 'ASR-CI-002', 'ASR-CI-005'],
  },
  'agent-config-risk': {
    verdict: 'NEEDS_HUMAN_REVIEW',
    findings: ['ASR-AGENT-001', 'ASR-AGENT-002', 'ASR-LOCAL-001'],
  },
  'unsafe-cloud-iam': {
    verdict: 'BLOCK',
    findings: ['ASR-IAM-003', 'ASR-IAM-004', 'ASR-IAM-006'],
  },
  'unsafe-supply-chain': {
    verdict: 'BLOCK',
    findings: ['ASR-SC-003', 'ASR-SC-004', 'ASR-SC-007'],
  },
  'unsafe-ai-data-boundary': {
    verdict: 'BLOCK',
    findings: ['ASR-AI-001', 'ASR-AI-002', 'ASR-AI-003', 'ASR-AI-004'],
  },
};

for (const [fixtureName, expectation] of Object.entries(expected)) {
  test(`${fixtureName} fixture returns expected verdict and findings`, async () => {
    const result = await auditFixture(`fixtures/${fixtureName}`);

    assert.equal(result.verdict, expectation.verdict);
    assert.deepEqual(
      result.findings.map((finding) => finding.ruleId),
      expectation.findings,
    );
    assert.match(result.report, /# Agentic Safety Review Report/);
    assert.match(result.report, /## Findings/);
    assert.match(result.report, /## Refactorability Scorecard/);
    assert.match(result.report, /## Recommended Remediation Strategy/);
    assert.match(result.report, /## Missing Evidence/);
  });
}

test('repo-local rules cannot weaken baseline rules', async () => {
  const result = await auditFixture('fixtures/agent-config-risk');

  assert.equal(result.verdict, 'NEEDS_HUMAN_REVIEW');
  assert.ok(result.findings.some((finding) => finding.ruleId === 'ASR-LOCAL-001'));
  assert.match(result.report, /Repo-local rule attempts to weaken baseline/);
});

test('fixture self-test runner checks all expected fixtures', async () => {
  const result = await runFixtureSelfTests();

  assert.equal(result.ok, true);
  assert.deepEqual(
    result.results.map((fixture) => fixture.name).sort(),
    Object.keys(expected).sort(),
  );
});

test('self-test CLI writes reports locally without external credentials', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'asr-fixture-reports-'));

  const { stdout } = await execFileAsync(
    'node',
    ['scripts/self-test.mjs', '--output', outputDir],
    { cwd: new URL('..', import.meta.url) },
  );

  assert.match(stdout, /Fixture self-tests passed/);
  for (const fixtureName of Object.keys(expected)) {
    await stat(path.join(outputDir, `${fixtureName}.md`));
    const report = await readFile(path.join(outputDir, `${fixtureName}.md`), 'utf8');
    assert.match(report, /# Agentic Safety Review Report/);
  }
});
