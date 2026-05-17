import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('sample reports include cloud IAM, supply-chain, and AI data boundary findings', async () => {
  const markdown = await readFile(new URL('../examples/sample-report.md', import.meta.url), 'utf8');
  const json = JSON.parse(await readFile(new URL('../examples/sample-report.json', import.meta.url), 'utf8'));

  for (const term of [
    'cloud-iam',
    'supply-chain',
    'ai-data-boundary',
    'ASR-IAM-004',
    'ASR-SC-004',
    'ASR-AI-001',
  ]) {
    assert.match(markdown, new RegExp(term, 'i'));
  }

  assert.ok(json.scope.includes('cloud-iam'));
  assert.ok(json.scope.includes('supply-chain'));
  assert.ok(json.scope.includes('data-privacy'));
  assert.ok(json.findings.some((finding) => finding.ruleId === 'ASR-IAM-004'));
  assert.ok(json.findings.some((finding) => finding.ruleId === 'ASR-SC-004'));
  assert.ok(json.findings.some((finding) => finding.ruleId === 'ASR-AI-001'));
});
