import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { auditRepo } from '../scripts/lib/repo-audit.mjs';

const execFileAsync = promisify(execFile);

test('auditRepo audits safe fixture path as PASS', async () => {
  const result = await auditRepo({ repoPath: 'fixtures/safe-basic-service' });

  assert.equal(result.verdict, 'PASS');
  assert.deepEqual(result.findings, []);
  assert.match(result.report, /# Agentic Safety Review Report/);
  assert.match(result.report, /Scope: fixture/);
});

test('auditRepo audits unsafe docker fixture with runtime exposure', async () => {
  const result = await auditRepo({ repoPath: 'fixtures/unsafe-docker' });

  assert.equal(result.verdict, 'BLOCK');
  assert.deepEqual(
    result.findings.map((finding) => finding.ruleId),
    ['ASR-DOCKER-001', 'ASR-DOCKER-002', 'ASR-RUNTIME-001'],
  );
  assert.match(result.report, /## Runtime CVE Exposure/);
});

test('audit CLI writes markdown report for target repo', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'asr-audit-cli-'));
  const output = path.join(outputDir, 'report.md');

  const { stdout } = await execFileAsync(
    'node',
    ['scripts/audit.mjs', '--repo', 'fixtures/unsafe-api-contract', '--output', output],
    { cwd: new URL('..', import.meta.url) },
  );

  assert.match(stdout, /Wrote audit report/);
  await stat(output);
  const report = await readFile(output, 'utf8');
  assert.match(report, /Verdict: MIGRATION_PLAN_REQUIRED/);
  assert.match(report, /ASR-API-001/);
  assert.match(report, /## Refactorability Scorecard/);
  assert.match(report, /## Recommended Remediation Strategy/);
  assert.match(report, /## Missing Evidence/);
});

test('audit CLI rejects missing repo argument', async () => {
  await assert.rejects(
    execFileAsync('node', ['scripts/audit.mjs'], {
      cwd: new URL('..', import.meta.url),
    }),
    /--repo requires a value|--repo is required/,
  );
});
