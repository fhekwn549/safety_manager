import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('expanded reference overlay index lists productization overlays', async () => {
  const index = await readMarkdown('rules/references/README.md');
  const config = await readFile(new URL('../examples/config.example.yaml', import.meta.url), 'utf8');

  for (const overlay of [
    'ci-cd/runner-hardening.md',
    'data-privacy/export-deletion.md',
    'payments-entitlements/reconciliation.md',
    'observability/audit-trails.md',
  ]) {
    assert.match(index, new RegExp(overlay));
  }

  assert.match(config, /runner-hardening/);
  assert.match(config, /export-deletion/);
  assert.match(config, /reconciliation/);
  assert.match(config, /audit-trails/);
});

for (const [path, terms] of Object.entries({
  'rules/references/ci-cd/runner-hardening.md': ['fork', 'runner', 'artifact provenance', 'rollback', 'strengthens'],
  'rules/references/data-privacy/export-deletion.md': ['minimization', 'export', 'deletion', 'retention', 'access logging'],
  'rules/references/payments-entitlements/reconciliation.md': ['immutable ownership', 'webhook idempotency', 'ledger', 'refund', 'transfer'],
  'rules/references/observability/audit-trails.md': ['audit trail', 'correlation', 'redaction', 'alert', 'runtime evidence'],
})) {
  test(`${path} strengthens baseline guidance`, async () => {
    const content = await readMarkdown(path);

    assert.match(content, /strengthen/i);
    assert.match(content, /cannot weaken/i);
    for (const term of terms) {
      assert.match(content, new RegExp(term, 'i'));
    }
  });
}
