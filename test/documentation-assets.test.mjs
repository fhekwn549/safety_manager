import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('README documents install targets, modes, verdicts, and self-tests', async () => {
  const readme = await readMarkdown('README.md');

  for (const term of [
    'Build Mode',
    'Audit Mode',
    'repo-local rules cannot weaken baseline safety',
    'PASS',
    'WARN',
    'BLOCK',
    'NEEDS_HUMAN_REVIEW',
    'MIGRATION_PLAN_REQUIRED',
    'Incremental Refactor',
    'Strangler Migration',
    'Rebuild From Baseline',
    'install.sh --target generic',
    'install.sh --target codex',
    'npm run self-test',
    'cloud-iam',
    'supply-chain',
    'ai-data-boundary',
    '9 fixtures',
    'npm run generate:sample-report',
    'npm run eval',
    'npm run review-pack',
    'Recall',
    'Precision',
    'review signal',
  ]) {
    assert.match(readme, new RegExp(term));
  }
});

test('usage guide explains Build Mode, Audit Mode, reports, and install examples', async () => {
  const usage = await readMarkdown('docs/usage.md');

  assert.match(usage, /Build Mode/);
  assert.match(usage, /Audit Mode/);
  assert.match(usage, /Generic markdown/);
  assert.match(usage, /Codex/);
  assert.match(usage, /Report/);
  assert.match(usage, /Missing Evidence/);
  assert.match(usage, /Runtime CVE Exposure/);
  assert.match(usage, /cloud-iam/);
  assert.match(usage, /supply-chain/);
  assert.match(usage, /ai-data-boundary/);
  assert.match(usage, /9 fixture/);
  assert.match(usage, /generate:sample-report/);
  assert.match(usage, /npm run eval/);
  assert.match(usage, /npm run review-pack/);
  assert.match(usage, /Overall Score/);
  assert.match(usage, /not a vulnerability scanner/i);
  assert.match(usage, /precision/i);
  assert.match(usage, /recall/i);
});

test('rule authoring guide explains domain rules and reference overlays', async () => {
  const authoring = await readMarkdown('docs/rule-authoring.md');

  assert.match(authoring, /Rule ID:/);
  assert.match(authoring, /Severity:/);
  assert.match(authoring, /Evidence:/);
  assert.match(authoring, /Confidence:/);
  assert.match(authoring, /reference overlay/i);
  assert.match(authoring, /strengthen or refine/i);
  assert.match(authoring, /cannot weaken/i);
  assert.match(authoring, /domain-specific score modifiers/i);
});

test('sample report includes expected report sections and Copy Fail style runtime section', async () => {
  const sample = await readMarkdown('examples/sample-report.md');

  for (const heading of [
    'Agentic Safety Review Report',
    'Findings',
    'Refactorability Scorecard',
    'Runtime CVE Exposure',
    'Recommended Remediation Strategy',
    'Missing Evidence',
  ]) {
    assert.match(sample, new RegExp(heading));
  }

  assert.match(sample, /ASR-RUNTIME-001/);
  assert.match(sample, /shared Linux kernel/);
});

test('skill entrypoint links usage and authoring references', async () => {
  const skill = await readMarkdown('skills/agentic-safety-review/SKILL.md');

  assert.match(skill, /references\/rule-authoring\.md/);
  assert.match(skill, /references\/platform-adapters\.md/);
});
