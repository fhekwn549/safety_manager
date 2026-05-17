import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { auditRepo } from '../scripts/lib/repo-audit.mjs';

const execFileAsync = promisify(execFile);

test('auditRepo exposes structured report data for JSON output', async () => {
  const result = await auditRepo({ repoPath: 'fixtures/unsafe-docker' });

  assert.equal(result.reportData.verdict, 'BLOCK');
  assert.equal(result.reportData.mode, 'Audit Mode');
  assert.deepEqual(result.reportData.findings.map((finding) => finding.ruleId), [
    'ASR-DOCKER-001',
    'ASR-DOCKER-002',
    'ASR-RUNTIME-001',
  ]);
  assert.ok(result.reportData.scorecard);
  assert.ok(result.reportData.runtimeCveExposure);
  assert.ok(Array.isArray(result.reportData.missingEvidence));
});

test('audit CLI writes JSON report when requested', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'asr-json-report-'));
  const output = path.join(outputDir, 'report.json');

  await execFileAsync(
    'node',
    ['scripts/audit.mjs', '--repo', 'fixtures/unsafe-ci', '--output', output, '--format', 'json'],
    { cwd: new URL('..', import.meta.url) },
  );

  const json = JSON.parse(await readFile(output, 'utf8'));
  assert.equal(json.verdict, 'BLOCK');
  assert.deepEqual(json.findings.map((finding) => finding.ruleId), [
    'ASR-CI-001',
    'ASR-CI-002',
    'ASR-CI-005',
  ]);
  assert.equal(json.remediation.strategy, 'Strangler Migration');
  assert.ok(json.runtimeCveExposure);
  assert.ok(json.missingEvidence.length > 0);
});

test('sample JSON report documents stable output shape', async () => {
  const json = JSON.parse(await readFile(new URL('../examples/sample-report.json', import.meta.url), 'utf8'));

  assert.equal(json.verdict, 'BLOCK');
  assert.equal(json.mode, 'Audit Mode');
  assert.ok(Array.isArray(json.scope));
  assert.ok(Array.isArray(json.findings));
  assert.ok(json.scorecard);
  assert.ok(json.remediation);
  assert.ok(json.runtimeCveExposure);
  assert.ok(Array.isArray(json.missingEvidence));
});
