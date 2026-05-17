import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

const baselineDomains = [
  'frontend',
  'server',
  'database',
  'api-contract',
  'docker-runtime',
  'ci-cd',
  'sensitive-config',
  'agent-config',
  'observability',
  'data-privacy',
  'payments-entitlements',
  'cloud-iam',
  'supply-chain',
];

test('baseline index lists every supported domain', async () => {
  const index = await readMarkdown('rules/baseline/README.md');

  assert.match(index, /# Baseline Rulebook Index/);
  for (const domain of baselineDomains) {
    assert.match(index, new RegExp(domain));
  }
});

for (const domain of baselineDomains) {
  test(`${domain} baseline file has decision-rule metadata`, async () => {
    const content = await readMarkdown(`rules/baseline/${domain}.md`);

    assert.match(content, /^# /m);
    assert.match(content, /Rule ID:/);
    assert.match(content, /Severity:/);
    assert.match(content, /Rationale:/);
    assert.match(content, /Evidence:/);
    assert.match(content, /Confidence:/);
  });
}

test('reference overlay index and MVP overlays are present', async () => {
  const index = await readMarkdown('rules/references/README.md');
  const api = await readMarkdown('rules/references/api-contract/base.md');
  const docker = await readMarkdown('rules/references/docker/base.md');
  const config = await readMarkdown('examples/config.example.yaml');

  assert.match(index, /strengthen or refine/i);
  assert.match(api, /versioning/i);
  assert.match(api, /idempotency/i);
  assert.match(docker, /non-root/i);
  assert.match(docker, /capabilities/i);
  assert.match(config, /reference_overlays/);
});
