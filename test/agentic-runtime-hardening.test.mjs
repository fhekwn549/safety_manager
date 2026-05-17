import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readMarkdown(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
}

test('ci-cd baseline covers cache trust, OIDC, and SBOM evidence', async () => {
  const content = await readMarkdown('rules/baseline/ci-cd.md');

  for (const term of [
    'cache poisoning',
    'branch trust',
    'OIDC',
    'long-lived',
    'SBOM',
    'attestation',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('docker runtime baseline covers image trust and kernel policy evidence', async () => {
  const content = await readMarkdown('rules/baseline/docker-runtime.md');

  for (const term of [
    'base image EOL',
    'pinned digest',
    'seccomp',
    'AppArmor',
    'SELinux',
    'profile evidence',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('agent config baseline covers MCP provenance and output exfiltration', async () => {
  const content = await readMarkdown('rules/baseline/agent-config.md');

  for (const term of [
    'MCP server provenance',
    'update pinning',
    'tool output exfiltration',
    'external sink',
    'privileged tool bundle',
    'human approval',
  ]) {
    assert.match(content, new RegExp(term, 'i'));
  }
});

test('wave 1 overlays and score modifiers include hardening guidance', async () => {
  const runner = await readMarkdown('rules/references/ci-cd/runner-hardening.md');
  const docker = await readMarkdown('rules/references/docker/base.md');
  const modifiers = await readMarkdown('rules/domain-score-modifiers.md');

  assert.match(runner, /cache poisoning/i);
  assert.match(runner, /OIDC/i);
  assert.match(runner, /SBOM/i);
  assert.match(docker, /pinned digest/i);
  assert.match(docker, /seccomp/i);
  assert.match(docker, /AppArmor/i);
  assert.match(docker, /SELinux/i);
  assert.match(modifiers, /tool output exfiltration/i);
  assert.match(modifiers, /cache poisoning/i);
});
