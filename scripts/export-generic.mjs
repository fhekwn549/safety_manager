#!/usr/bin/env node
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { packageRoot } from './lib/package-assets.mjs';
import { getGenericOutputPath, parseInstallArgs } from './lib/install-targets.mjs';

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }
  return files.sort();
}

export async function buildGenericExport() {
  const skillRoot = path.join(packageRoot, 'skills', 'agentic-safety-review');
  const sections = [];

  sections.push(await readFile(path.join(skillRoot, 'SKILL.md'), 'utf8'));

  for (const dir of [
    path.join(skillRoot, 'references'),
    path.join(skillRoot, 'rules'),
  ]) {
    for (const file of await listMarkdownFiles(dir)) {
      sections.push(await readFile(file, 'utf8'));
    }
  }

  return `${sections.join('\n\n---\n\n')}\n`;
}

async function main() {
  const args = parseInstallArgs(process.argv.slice(2));
  const outputPath = getGenericOutputPath({ cwd: process.cwd(), output: args.output });
  if (!args.force && await exists(outputPath)) {
    throw new Error(`Output already exists: ${outputPath}`);
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await buildGenericExport(), 'utf8');
  console.log(`Wrote generic export to ${outputPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
