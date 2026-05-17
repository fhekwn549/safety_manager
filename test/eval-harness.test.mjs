import test from 'node:test';
import assert from 'node:assert/strict';
import { runEvaluation } from '../scripts/lib/eval-harness.mjs';

test('runEvaluation scores benchmark fixtures with precision, recall, and verdict accuracy', async () => {
  const result = await runEvaluation({ casesPath: 'eval/cases.json' });

  assert.equal(result.summary.caseCount, 9);
  assert.equal(result.summary.expectedFindingCount, 23);
  assert.equal(result.summary.actualFindingCount, 23);
  assert.equal(result.metrics.recall, 1);
  assert.equal(result.metrics.precision, 1);
  assert.equal(result.metrics.verdictAccuracy, 1);
  assert.equal(result.score.overall, 100);
});
