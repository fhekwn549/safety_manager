import path from 'node:path';

const VALID_TARGETS = new Set(['generic', 'codex', 'claude', 'cursor', 'gemini']);

export function parseInstallArgs(argv) {
  const parsed = {
    target: 'generic',
    output: null,
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--force') {
      parsed.force = true;
      continue;
    }

    if (arg === '--target') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('--target requires a value');
      }
      if (!VALID_TARGETS.has(value)) {
        throw new Error(`Unsupported target: ${value}`);
      }
      parsed.target = value;
      index += 1;
      continue;
    }

    if (arg === '--output') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('--output requires a value');
      }
      parsed.output = value;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

export function getGenericOutputPath({ cwd, output }) {
  if (output) {
    return path.resolve(cwd, output);
  }
  return path.join(cwd, 'AGENTIC_SAFETY_REVIEW.md');
}

export function getCodexSkillDir({ env }) {
  const codexHome = env.CODEX_HOME ?? path.join(env.HOME, '.codex');
  return path.join(codexHome, 'skills', 'agentic-safety-review');
}

export function getClaudeSkillDir({ env }) {
  const claudeHome = env.CLAUDE_HOME ?? path.join(env.HOME, '.claude');
  return path.join(claudeHome, 'skills', 'agentic-safety-review');
}

export function getCursorRulesPath({ cwd, output }) {
  if (output) {
    return path.resolve(cwd, output);
  }
  return path.join(cwd, '.cursor', 'rules', 'agentic-safety-review.mdc');
}

export function getGeminiOutputPath({ cwd, output }) {
  if (output) {
    return path.resolve(cwd, output);
  }
  return path.join(cwd, 'GEMINI_AGENTIC_SAFETY_REVIEW.md');
}
