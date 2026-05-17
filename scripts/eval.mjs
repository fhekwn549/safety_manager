#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { formatEvaluationMarkdown, runEvaluation } from './lib/eval-harness.mjs';

function parseArgs(argv) {
  const parsed = {
    cases: 'eval/cases.json',
    markdown: 'eval/report.md',
    json: 'eval/report.json',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === '--cases') {
      if (!value || value.startsWith('--')) throw new Error('--cases requires a value');
      parsed.cases = value;
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
  const result = await runEvaluation({ casesPath: args.cases });
  const markdownPath = await writeOutput(args.markdown, formatEvaluationMarkdown(result));
  const jsonPath = await writeOutput(args.json, `${JSON.stringify(result, null, 2)}\n`);

  console.log(`Wrote evaluation reports to ${markdownPath} and ${jsonPath}`);
  console.log(`Overall Score: ${result.score.overall}/100`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
