import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('data privacy overlay covers AI processing boundaries and regional rights evidence', async () => {
  const content = await readMarkdown('rules/references/data-privacy/export-deletion.md');

  for (const term of [
    'AI/LLM',
    'prompt retention',
    'model training',
    'vendor inference',
    'data residency',
    'regional transfer',
    'subject access',
    'consent',
    'opt-out',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('payments entitlements overlay covers finance records and paid-access failure modes', async () => {
  const content = await readMarkdown('rules/references/payments-entitlements/reconciliation.md');

  for (const term of [
    'invoice',
    'tax',
    'legal record',
    'dispute',
    'chargeback',
    'proration',
    'plan-change',
    'grace period',
    'failure-mode',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('observability overlay covers alert ownership, tamper evidence, and reconstruction signals', async () => {
  const content = await readMarkdown('rules/references/observability/audit-trails.md');

  for (const term of [
    'alert owner',
    'response SLA',
    'tamper resistance',
    'metric label',
    'sensitive-data leakage',
    'incident reconstruction',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});
