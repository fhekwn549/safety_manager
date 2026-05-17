import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditRepo } from '../scripts/lib/repo-audit.mjs';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('runtime advisory metadata documents defensive evidence workflow', async () => {
  const index = await readMarkdown('rules/advisories/README.md');
  const advisory = await readMarkdown('rules/advisories/copy-fail-shared-kernel.md');

  assert.match(index, /advisory metadata/i);
  assert.match(index, /must not include exploit/i);
  assert.match(advisory, /Advisory ID: ASR-ADV-COPY-FAIL/);
  assert.match(advisory, /CVE-2026-31431/);
  assert.match(advisory, /shared Linux kernel/i);
  assert.match(advisory, /Mitigation evidence:/);
  assert.match(advisory, /Hard triggers:/);
  assert.match(advisory, /Missing evidence:/);
});

test('runtime exposure reports cite advisory id in markdown and JSON data', async () => {
  const result = await auditRepo({ repoPath: 'fixtures/unsafe-docker' });

  assert.match(result.report, /Advisory: ASR-ADV-COPY-FAIL/);
  assert.equal(result.reportData.runtimeCveExposure.advisoryId, 'ASR-ADV-COPY-FAIL');
  assert.equal(result.reportData.runtimeCveExposure.cve, 'CVE-2026-31431');
});
