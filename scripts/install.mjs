#!/usr/bin/env node
import { cp, mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildGenericExport } from './export-generic.mjs';
import { packageRoot } from './lib/package-assets.mjs';
import {
  getClaudeSkillDir,
  getCodexSkillDir,
  getCursorRulesPath,
  getGeminiOutputPath,
  getGenericOutputPath,
  parseInstallArgs,
} from './lib/install-targets.mjs';

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function writeExport(outputPath, force) {
  if (!force && await exists(outputPath)) {
    throw new Error(`Output already exists: ${outputPath}`);
  }
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await buildGenericExport(), 'utf8');
  return outputPath;
}

async function copySkill(skillDir, force) {
  if (!force && await exists(skillDir)) {
    throw new Error(`Skill directory already exists: ${skillDir}`);
  }
  await mkdir(path.dirname(skillDir), { recursive: true });
  await cp(path.join(packageRoot, 'skills', 'agentic-safety-review'), skillDir, {
    recursive: true,
    force,
    errorOnExist: !force,
  });
  return skillDir;
}

async function main() {
  const args = parseInstallArgs(process.argv.slice(2));
  let outputPath;

  if (args.target === 'generic') {
    outputPath = await writeExport(getGenericOutputPath({ cwd: process.cwd(), output: args.output }), args.force);
  } else if (args.target === 'codex') {
    outputPath = await copySkill(getCodexSkillDir({ env: process.env }), args.force);
  } else if (args.target === 'claude') {
    outputPath = await copySkill(getClaudeSkillDir({ env: process.env }), args.force);
  } else if (args.target === 'cursor') {
    outputPath = await writeExport(getCursorRulesPath({ cwd: process.cwd(), output: args.output }), args.force);
  } else if (args.target === 'gemini') {
    outputPath = await writeExport(getGeminiOutputPath({ cwd: process.cwd(), output: args.output }), args.force);
  }

  console.log(`Installed ${args.target} target to ${outputPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
