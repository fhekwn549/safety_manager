import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('skill entrypoint exposes Audit Mode scorecard workflow', async () => {
  const skill = await readMarkdown('skills/agentic-safety-review/SKILL.md');

  assert.match(skill, /Audit Mode/);
  assert.match(skill, /references\/audit-scorecard\.md/);
  assert.match(skill, /references\/drift-remediation\.md/);
  assert.match(skill, /Rebuild From Baseline/);
});

test('audit scorecard defines ranking, common axes, strategies, and rebuild brief behavior', async () => {
  const scorecard = await readMarkdown('skills/agentic-safety-review/references/audit-scorecard.md');

  for (const axis of [
    'Core Invariant Damage',
    'Blast Radius',
    'Migration Risk',
    'Testability',
    'Boundary Clarity',
    'Operational Evidence',
  ]) {
    assert.match(scorecard, new RegExp(axis));
  }

  for (const strategy of [
    'Incremental Refactor',
    'Incremental Refactor with Human Checkpoints',
    'Strangler Migration',
    'Rebuild From Baseline',
    'Human Architecture Review Required',
  ]) {
    assert.match(scorecard, new RegExp(strategy));
  }

  assert.match(scorecard, /rank findings/i);
  assert.match(scorecard, /severity/i);
  assert.match(scorecard, /blast radius/i);
  assert.match(scorecard, /domain-specific score modifiers/i);
  assert.match(scorecard, /hard triggers/i);
  assert.match(scorecard, /must not start implementation/i);
});

test('drift remediation reference requires evidence, affected domains, and rebuild brief sections', async () => {
  const remediation = await readMarkdown('skills/agentic-safety-review/references/drift-remediation.md');

  assert.match(remediation, /baseline drift/i);
  assert.match(remediation, /evidence/i);
  assert.match(remediation, /affected domains/i);

  for (const section of [
    'preserve',
    'discard',
    'new baseline architecture',
    'migration caution',
    'required human decisions',
  ]) {
    assert.match(remediation, new RegExp(section, 'i'));
  }
});

test('report schema includes scorecard and remediation output sections', async () => {
  const schema = await readMarkdown('skills/agentic-safety-review/references/report-schema.md');

  for (const heading of [
    'Findings',
    'Refactorability Scorecard',
    'Recommended Remediation Strategy',
    'Rebuild Brief',
    'Missing Evidence',
  ]) {
    assert.match(schema, new RegExp(heading));
  }
  assert.match(schema, /claim_type/);
  assert.match(schema, /confidence/);
  assert.match(schema, /evidence_strength/);
  assert.match(schema, /snippet/);
});

test('domain score modifiers define additive modifiers and hard triggers', async () => {
  const modifiers = await readMarkdown('rules/domain-score-modifiers.md');

  assert.match(modifiers, /additive/i);
  assert.match(modifiers, /cannot lower/i);
  assert.match(modifiers, /hard trigger/i);

  for (const domain of [
    'database',
    'docker-runtime',
    'api-contract',
    'payments-entitlements',
    'agent-config',
  ]) {
    assert.match(modifiers, new RegExp(domain));
  }
});
