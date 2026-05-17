import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  getClaudeSkillDir,
  getCursorRulesPath,
  getGeminiOutputPath,
  parseInstallArgs,
} from '../scripts/lib/install-targets.mjs';

const execFileAsync = promisify(execFile);

test('parseInstallArgs accepts additional platform targets', () => {
  assert.equal(parseInstallArgs(['--target', 'claude']).target, 'claude');
  assert.equal(parseInstallArgs(['--target', 'cursor']).target, 'cursor');
  assert.equal(parseInstallArgs(['--target', 'gemini']).target, 'gemini');
});

test('additional platform path helpers resolve defaults', () => {
  assert.equal(
    getClaudeSkillDir({ env: { CLAUDE_HOME: '/tmp/claude' } }),
    path.join('/tmp/claude', 'skills', 'agentic-safety-review'),
  );
  assert.equal(
    getCursorRulesPath({ cwd: '/tmp/repo', output: null }),
    path.join('/tmp/repo', '.cursor', 'rules', 'agentic-safety-review.mdc'),
  );
  assert.equal(
    getGeminiOutputPath({ cwd: '/tmp/repo', output: null }),
    path.join('/tmp/repo', 'GEMINI_AGENTIC_SAFETY_REVIEW.md'),
  );
});

test('claude install copies skill package without overwriting by default', async () => {
  const claudeHome = await mkdtemp(path.join(tmpdir(), 'asr-claude-'));

  await execFileAsync('node', ['scripts/install.mjs', '--target', 'claude'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, CLAUDE_HOME: claudeHome },
  });

  const skillDir = path.join(claudeHome, 'skills', 'agentic-safety-review');
  await stat(path.join(skillDir, 'SKILL.md'));
  await stat(path.join(skillDir, 'rules', 'baseline', 'sensitive-config.md'));

  await assert.rejects(
    execFileAsync('node', ['scripts/install.mjs', '--target', 'claude'], {
      cwd: new URL('..', import.meta.url),
      env: { ...process.env, CLAUDE_HOME: claudeHome },
    }),
    /already exists/,
  );
});

test('cursor install writes rules export', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'asr-cursor-'));

  await execFileAsync('node', [path.resolve(new URL('..', import.meta.url).pathname, 'scripts/install.mjs'), '--target', 'cursor'], {
    cwd: dir,
  });

  const output = path.join(dir, '.cursor', 'rules', 'agentic-safety-review.mdc');
  const content = await readFile(output, 'utf8');
  assert.match(content, /# Agentic Safety Review/);
  assert.match(content, /# Baseline Rulebook Index/);
});

test('gemini install writes instruction export', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'asr-gemini-'));

  await execFileAsync(
    'node',
    [path.resolve(new URL('..', import.meta.url).pathname, 'scripts/install.mjs'), '--target', 'gemini'],
    { cwd: dir },
  );

  const output = path.join(dir, 'GEMINI_AGENTIC_SAFETY_REVIEW.md');
  const content = await readFile(output, 'utf8');
  assert.match(content, /# Agentic Safety Review/);
  assert.match(content, /# Runtime CVE Response/);
});
