import path from 'node:path';
import { auditDirectory } from './fixture-audit.mjs';

export async function auditRepo({ repoPath }) {
  if (!repoPath) {
    throw new Error('--repo is required');
  }

  const absoluteRepoPath = path.resolve(process.cwd(), repoPath);
  return auditDirectory({
    repoPath: absoluteRepoPath,
    name: path.basename(absoluteRepoPath),
  });
}
