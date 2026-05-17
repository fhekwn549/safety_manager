#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { auditRepo } from './lib/repo-audit.mjs';

function parseArgs(argv) {
  const parsed = {
    repo: 'fixtures/sample-expanded-risk',
    markdown: 'examples/sample-report.md',
    json: 'examples/sample-report.json',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === '--repo') {
      if (!value || value.startsWith('--')) throw new Error('--repo requires a value');
      parsed.repo = value;
      index += 1;
      continue;
    }

    if (arg === '--markdown') {
      if (!value || value.startsWith('--')) throw new Error('--markdown requires a value');
      parsed.markdown = value;
      index += 1;
      continue;
    }

    if (arg === '--json') {
      if (!value || value.startsWith('--')) throw new Error('--json requires a value');
      parsed.json = value;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

async function writeOutput(filePath, content) {
  const outputPath = path.resolve(process.cwd(), filePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, 'utf8');
  return outputPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await auditRepo({ repoPath: args.repo });
  const markdownPath = await writeOutput(args.markdown, result.report);
  const jsonPath = await writeOutput(args.json, `${JSON.stringify(result.reportData, null, 2)}\n`);

  console.log(`Wrote sample reports to ${markdownPath} and ${jsonPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
