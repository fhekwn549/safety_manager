import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  getCodexSkillDir,
  getGenericOutputPath,
  parseInstallArgs,
} from '../scripts/lib/install-targets.mjs';

const execFileAsync = promisify(execFile);

test('parseInstallArgs defaults to generic target', () => {
  assert.deepEqual(parseInstallArgs([]), {
    target: 'generic',
    output: null,
    force: false,
  });
});

test('parseInstallArgs accepts target, output, and force', () => {
  assert.deepEqual(
    parseInstallArgs(['--target', 'codex', '--output', 'out/ASR.md', '--force']),
    {
      target: 'codex',
      output: 'out/ASR.md',
      force: true,
    },
  );
});

test('getGenericOutputPath resolves explicit output against cwd', () => {
  assert.equal(
    getGenericOutputPath({ cwd: '/tmp/repo', output: 'docs/ASR.md' }),
    path.join('/tmp/repo', 'docs', 'ASR.md'),
  );
});

test('getGenericOutputPath defaults to cwd export file', () => {
  assert.equal(
    getGenericOutputPath({ cwd: '/tmp/repo', output: null }),
    path.join('/tmp/repo', 'AGENTIC_SAFETY_REVIEW.md'),
  );
});

test('getCodexSkillDir uses CODEX_HOME when present', () => {
  assert.equal(
    getCodexSkillDir({ env: { CODEX_HOME: '/tmp/codex-home' } }),
    path.join('/tmp/codex-home', 'skills', 'agentic-safety-review'),
  );
});

test('generic export writes combined skill and rules without overwrite by default', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'asr-export-'));
  const output = path.join(dir, 'ASR.md');

  await execFileAsync('node', ['scripts/export-generic.mjs', '--output', output], {
    cwd: new URL('..', import.meta.url),
  });

  const exported = await readFile(output, 'utf8');
  assert.match(exported, /# Agentic Safety Review/);
  assert.match(exported, /# Audit Mode Scorecard/);
  assert.match(exported, /# Runtime CVE Response/);
  assert.match(exported, /# Domain Score Modifiers/);
  assert.match(exported, /# Baseline Rulebook Index/);

  await assert.rejects(
    execFileAsync('node', ['scripts/export-generic.mjs', '--output', output], {
      cwd: new URL('..', import.meta.url),
    }),
    /already exists/,
  );
});

test('generic export supports force overwrite', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'asr-export-force-'));
  const output = path.join(dir, 'ASR.md');
  await writeFile(output, 'old', 'utf8');

  await execFileAsync('node', ['scripts/export-generic.mjs', '--output', output, '--force'], {
    cwd: new URL('..', import.meta.url),
  });

  const exported = await readFile(output, 'utf8');
  assert.match(exported, /# Agentic Safety Review/);
  assert.doesNotMatch(exported, /^old$/);
});

test('codex install copies skill with references and rules without overwriting by default', async () => {
  const codexHome = await mkdtemp(path.join(tmpdir(), 'asr-codex-'));

  await execFileAsync('node', ['scripts/install.mjs', '--target', 'codex'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, CODEX_HOME: codexHome },
  });

  const skillDir = path.join(codexHome, 'skills', 'agentic-safety-review');
  await stat(path.join(skillDir, 'SKILL.md'));
  await stat(path.join(skillDir, 'references', 'runtime-cve-response.md'));
  await stat(path.join(skillDir, 'rules', 'domain-score-modifiers.md'));
  await stat(path.join(skillDir, 'rules', 'baseline', 'server.md'));

  await assert.rejects(
    execFileAsync('node', ['scripts/install.mjs', '--target', 'codex'], {
      cwd: new URL('..', import.meta.url),
      env: { ...process.env, CODEX_HOME: codexHome },
    }),
    /already exists/,
  );
});
