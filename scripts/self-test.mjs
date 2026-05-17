#!/usr/bin/env node
import { runFixtureSelfTests } from './lib/fixture-audit.mjs';

function parseArgs(argv) {
  const parsed = { outputDir: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === '--output') {
      if (!value || value.startsWith('--')) throw new Error('--output requires a value');
      parsed.outputDir = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await runFixtureSelfTests({ outputDir: args.outputDir });
  if (!result.ok) {
    for (const failure of result.failures) console.error(failure);
    process.exitCode = 1;
    return;
  }
  console.log(`Fixture self-tests passed (${result.results.length} fixtures).`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
