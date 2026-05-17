import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('server baseline covers session trust and internal service boundaries', async () => {
  const content = await readMarkdown('rules/baseline/server.md');

  for (const term of [
    'session',
    'cookie',
    'CSRF',
    'service-to-service',
    'internal API',
    'authorization cache invalidation',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('database baseline covers restore drills and online migration safety', async () => {
  const content = await readMarkdown('rules/baseline/database.md');

  for (const term of [
    'backup restore drill',
    'restore evidence',
    'expand/contract',
    'online migration',
    'row-level',
    'tenant partition',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('api contract baseline and overlay cover authz semantics and lifecycle contracts', async () => {
  const baseline = await readMarkdown('rules/baseline/api-contract.md');
  const overlay = await readMarkdown('rules/references/api-contract/base.md');

  for (const term of [
    'authorization semantics',
    'access scope',
    'deprecation lifecycle',
    'rate-limit',
    'retry headers',
    'webhook ordering',
    'eventual consistency',
  ]) {
    assert.match(`${baseline}\n${overlay}`, new RegExp(term, 'i'));
  }
});

test('scorecard reflects restore and authz semantic migration risk', async () => {
  const scorecard = await readMarkdown('skills/agentic-safety-review/references/audit-scorecard.md');

  assert.match(scorecard, /restore drill/i);
  assert.match(scorecard, /authorization semantics/i);
  assert.match(scorecard, /online migration/i);
});
