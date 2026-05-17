import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

test('review pack command writes public feedback bundle', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'asr-review-pack-'));

  const { stdout } = await execFileAsync(
    'npm',
    ['run', 'review-pack', '--', '--output', outputDir, '--clean'],
    { cwd: new URL('..', import.meta.url) },
  );

  assert.match(stdout, /Wrote review pack/);

  const requiredFiles = [
    'README.md',
    'known-limitations.md',
    'reviewer-rubric.md',
    'feedback-template.md',
    'feedback-template.csv',
    'eval-report.md',
    'eval-report.json',
    'post-draft.md',
    'manifest.json',
  ];

  for (const file of requiredFiles) {
    const content = await readFile(path.join(outputDir, file), 'utf8');
    assert.ok(content.length > 0, `${file} should not be empty`);
  }

  const sampleReports = await readdir(path.join(outputDir, 'sample-reports'));
  assert.ok(sampleReports.includes('sample-expanded-risk.md'));
  assert.ok(sampleReports.includes('sample-expanded-risk.json'));
  assert.ok(sampleReports.includes('safe-basic-service.md'));

  const readme = await readFile(path.join(outputDir, 'README.md'), 'utf8');
  assert.match(readme, /agentic coding guardrail/i);
  assert.match(readme, /review signal/i);
  assert.match(readme, /false positives/i);
  assert.doesNotMatch(readme, /vulnerability scanner/i);

  const limitations = await readFile(path.join(outputDir, 'known-limitations.md'), 'utf8');
  assert.match(limitations, /not a vulnerability scanner/i);
  assert.match(limitations, /false positives/i);

  const postDraft = await readFile(path.join(outputDir, 'post-draft.md'), 'utf8');
  assert.match(postDraft, /I built an experimental safety review tool for agentic coding projects and need brutally honest feedback/);
  assert.match(postDraft, /finding usefulness/i);
  assert.match(postDraft, /evidence credibility/i);
  assert.match(postDraft, /false positives/i);
  assert.match(postDraft, /actionability/i);

  const manifest = JSON.parse(await readFile(path.join(outputDir, 'manifest.json'), 'utf8'));
  assert.deepEqual(manifest.fixtures, [
    'sample-expanded-risk',
    'unsafe-docker',
    'unsafe-supply-chain',
    'unsafe-ai-data-boundary',
    'unsafe-cloud-iam',
    'safe-basic-service',
  ]);
  assert.ok(manifest.files.includes('manifest.json'));
  assert.ok(manifest.files.includes('sample-reports/sample-expanded-risk.md'));

  const allText = await Promise.all([
    ...requiredFiles.map((file) => readFile(path.join(outputDir, file), 'utf8')),
    ...sampleReports.map((file) => readFile(path.join(outputDir, 'sample-reports', file), 'utf8')),
  ]);
  assert.doesNotMatch(allText.join('\n'), /\/home\/|fhekwn549|safety_manager/);
});

test('review pack command accepts a custom fixture list', async () => {
  const outputDir = await mkdtemp(path.join(tmpdir(), 'asr-review-pack-custom-'));

  await execFileAsync(
    'npm',
    ['run', 'review-pack', '--', '--output', outputDir, '--fixtures', 'safe-basic-service', '--clean'],
    { cwd: new URL('..', import.meta.url) },
  );

  const sampleReports = await readdir(path.join(outputDir, 'sample-reports'));
  assert.deepEqual(sampleReports.sort(), ['safe-basic-service.json', 'safe-basic-service.md']);

  const manifest = JSON.parse(await readFile(path.join(outputDir, 'manifest.json'), 'utf8'));
  assert.deepEqual(manifest.fixtures, ['safe-basic-service']);
});

test('review pack command rejects dangerous clean output targets', async () => {
  await assert.rejects(
    execFileAsync(
      'npm',
      ['run', 'review-pack', '--', '--output', '.', '--clean'],
      { cwd: new URL('..', import.meta.url) },
    ),
    /Refusing to clean unsafe output directory/,
  );
});
