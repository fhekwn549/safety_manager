#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { auditRepo } from './lib/repo-audit.mjs';

function parseArgs(argv) {
  const parsed = { repo: null, output: null, format: 'markdown' };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === '--repo') {
      if (!value || value.startsWith('--')) throw new Error('--repo requires a value');
      parsed.repo = value;
      index += 1;
    } else if (arg === '--output') {
      if (!value || value.startsWith('--')) throw new Error('--output requires a value');
      parsed.output = value;
      index += 1;
    } else if (arg === '--format') {
      if (!value || value.startsWith('--')) throw new Error('--format requires a value');
      parsed.format = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!parsed.repo) throw new Error('--repo is required');
  if (!['markdown', 'json'].includes(parsed.format)) throw new Error('--format must be markdown or json');
  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await auditRepo({ repoPath: args.repo });
  const content = args.format === 'json'
    ? `${JSON.stringify(result.reportData, null, 2)}\n`
    : result.report;
  if (args.output) {
    const outputPath = path.resolve(process.cwd(), args.output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, content, 'utf8');
    console.log(`Wrote audit report to ${outputPath}`);
  } else {
    process.stdout.write(content);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
