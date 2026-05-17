import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

test('sample report generator writes markdown and JSON from fixture evidence', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'asr-sample-report-'));
  const markdownOutput = path.join(outputDir, 'sample-report.md');
  const jsonOutput = path.join(outputDir, 'sample-report.json');

  const { stdout } = await execFileAsync(
    'node',
    [
      'scripts/generate-sample-report.mjs',
      '--repo',
      'fixtures/sample-expanded-risk',
      '--markdown',
      markdownOutput,
      '--json',
      jsonOutput,
    ],
    { cwd: new URL('..', import.meta.url) },
  );

  assert.match(stdout, /Wrote sample reports/);

  const markdown = await readFile(markdownOutput, 'utf8');
  const json = JSON.parse(await readFile(jsonOutput, 'utf8'));

  for (const term of [
    'ASR-RUNTIME-001',
    'ASR-IAM-004',
    'ASR-SC-004',
    'ASR-AI-001',
    'Runtime CVE Exposure',
  ]) {
    assert.match(markdown, new RegExp(term));
  }

  assert.equal(json.verdict, 'BLOCK');
  assert.ok(json.runtimeCveExposure);
  assert.ok(json.findings.some((finding) => finding.ruleId === 'ASR-IAM-004'));
  assert.ok(json.findings.some((finding) => finding.ruleId === 'ASR-SC-004'));
  assert.ok(json.findings.some((finding) => finding.ruleId === 'ASR-AI-001'));
});
