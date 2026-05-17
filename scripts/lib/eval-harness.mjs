import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { auditRepo } from './repo-audit.mjs';

const scoreWeights = {
  recall: 25,
  precision: 20,
  verdictAccuracy: 15,
  evidenceQuality: 15,
  actionability: 15,
  domainCoverage: 10,
};

function toSet(values) {
  return new Set(values);
}

function intersection(left, right) {
  return [...left].filter((value) => right.has(value));
}

function divide(numerator, denominator, emptyValue = 1) {
  if (denominator === 0) return emptyValue;
  return numerator / denominator;
}

function hasUsableEvidence(finding) {
  return Array.isArray(finding.evidence)
    && finding.evidence.length > 0
    && finding.evidence.every((item) => {
      if (typeof item === 'string') return !/^Missing Evidence/i.test(item);
      if (['missing_evidence', 'needs_human_review'].includes(finding.claim_type)) {
        return Boolean(item.path || item.snippet);
      }
      return item.strength !== 'missing' && !/^Missing Evidence/i.test(item.snippet ?? '');
    });
}

function hasActionableStrategy(finding) {
  return typeof finding.strategy === 'string' && finding.strategy.length > 0;
}

function calculateOverallScore(metrics) {
  const weighted = Object.entries(scoreWeights).reduce((total, [metric, weight]) => {
    return total + (metrics[metric] * weight);
  }, 0);
  return Math.round(weighted);
}

function domainFromRule(ruleId, findings) {
  const finding = findings.find((item) => item.ruleId === ruleId);
  if (finding) return finding.domains ?? [];
  if (ruleId.startsWith('ASR-DB')) return ['database'];
  if (ruleId.startsWith('ASR-PAY')) return ['payments-entitlements'];
  if (ruleId.startsWith('ASR-DOCKER')) return ['docker-runtime'];
  if (ruleId.startsWith('ASR-RUNTIME')) return ['docker-runtime', 'ci-cd', 'agent-config'];
  if (ruleId.startsWith('ASR-API')) return ['api-contract'];
  if (ruleId.startsWith('ASR-CI')) return ['ci-cd'];
  if (ruleId.startsWith('ASR-AGENT') || ruleId.startsWith('ASR-LOCAL')) return ['agent-config'];
  if (ruleId.startsWith('ASR-IAM')) return ['cloud-iam'];
  if (ruleId.startsWith('ASR-SC')) return ['supply-chain'];
  if (ruleId.startsWith('ASR-AI')) return ['data-privacy', 'agent-config'];
  return ['unknown'];
}

function calculateDomainScores(caseResults) {
  const domainStats = new Map();

  function ensure(domain) {
    if (!domainStats.has(domain)) {
      domainStats.set(domain, { expected: 0, actual: 0, truePositive: 0 });
    }
    return domainStats.get(domain);
  }

  for (const result of caseResults) {
    for (const ruleId of result.expectedFindings) {
      for (const domain of domainFromRule(ruleId, result.actualFindings)) {
        ensure(domain).expected += 1;
      }
    }

    for (const finding of result.actualFindings) {
      for (const domain of finding.domains ?? []) {
        ensure(domain).actual += 1;
      }
    }

    for (const ruleId of result.truePositiveFindings) {
      for (const domain of domainFromRule(ruleId, result.actualFindings)) {
        ensure(domain).truePositive += 1;
      }
    }
  }

  return Object.fromEntries([...domainStats.entries()].sort().map(([domain, stats]) => {
    const recall = divide(stats.truePositive, stats.expected);
    const precision = divide(stats.truePositive, stats.actual);
    return [domain, {
      expected: stats.expected,
      actual: stats.actual,
      truePositive: stats.truePositive,
      recall,
      precision,
      score: Math.round(((recall + precision) / 2) * 100),
    }];
  }));
}

function calculateRuleCoverage(caseResults) {
  const ruleStats = new Map();

  function ensure(ruleId, findings) {
    if (!ruleStats.has(ruleId)) {
      ruleStats.set(ruleId, {
        domain: domainFromRule(ruleId, findings).join(', '),
        expected: 0,
        actual: 0,
        truePositive: 0,
        falsePositive: 0,
        falseNegative: 0,
      });
    }
    return ruleStats.get(ruleId);
  }

  for (const result of caseResults) {
    for (const ruleId of result.expectedFindings) {
      const stats = ensure(ruleId, result.actualFindings);
      stats.expected += 1;
    }

    for (const finding of result.actualFindings) {
      const stats = ensure(finding.ruleId, result.actualFindings);
      stats.actual += 1;
    }

    for (const ruleId of result.truePositiveFindings) {
      const stats = ensure(ruleId, result.actualFindings);
      stats.truePositive += 1;
    }

    for (const ruleId of result.falsePositiveFindings) {
      const stats = ensure(ruleId, result.actualFindings);
      stats.falsePositive += 1;
    }

    for (const ruleId of result.falseNegativeFindings) {
      const stats = ensure(ruleId, result.actualFindings);
      stats.falseNegative += 1;
    }
  }

  return Object.fromEntries([...ruleStats.entries()].sort().map(([ruleId, stats]) => {
    const recall = divide(stats.truePositive, stats.expected);
    const precision = divide(stats.truePositive, stats.actual);
    return [ruleId, {
      ...stats,
      recall,
      precision,
    }];
  }));
}

export async function loadCases(casesPath) {
  const absolutePath = path.resolve(process.cwd(), casesPath);
  return JSON.parse(await readFile(absolutePath, 'utf8'));
}

export async function runEvaluation({ casesPath = 'eval/cases.json' } = {}) {
  const cases = await loadCases(casesPath);
  const caseResults = [];
  let expectedFindingCount = 0;
  let actualFindingCount = 0;
  let truePositiveCount = 0;
  let verdictMatchCount = 0;
  let evidenceQualityCount = 0;
  let actionabilityCount = 0;
  const expectedDomains = new Set();
  const coveredDomains = new Set();

  for (const evalCase of cases) {
    const audit = await auditRepo({ repoPath: evalCase.repo });
    const expectedSet = toSet(evalCase.expectedFindings);
    const actualRuleIds = audit.findings.map((finding) => finding.ruleId);
    const actualSet = toSet(actualRuleIds);
    const truePositiveFindings = intersection(expectedSet, actualSet);
    const falseNegativeFindings = [...expectedSet].filter((ruleId) => !actualSet.has(ruleId));
    const falsePositiveFindings = actualRuleIds.filter((ruleId) => !expectedSet.has(ruleId));

    expectedFindingCount += expectedSet.size;
    actualFindingCount += actualRuleIds.length;
    truePositiveCount += truePositiveFindings.length;
    if (audit.verdict === evalCase.expectedVerdict) verdictMatchCount += 1;
    evidenceQualityCount += audit.findings.filter(hasUsableEvidence).length;
    actionabilityCount += audit.findings.filter(hasActionableStrategy).length;

    for (const ruleId of evalCase.expectedFindings) {
      for (const domain of domainFromRule(ruleId, audit.findings)) {
        expectedDomains.add(domain);
      }
    }
    for (const ruleId of truePositiveFindings) {
      for (const domain of domainFromRule(ruleId, audit.findings)) {
        coveredDomains.add(domain);
      }
    }

    caseResults.push({
      name: evalCase.name,
      repo: evalCase.repo,
      expectedVerdict: evalCase.expectedVerdict,
      actualVerdict: audit.verdict,
      expectedFindings: evalCase.expectedFindings,
      actualFindings: audit.findings,
      truePositiveFindings,
      falseNegativeFindings,
      falsePositiveFindings,
      passed: audit.verdict === evalCase.expectedVerdict && falseNegativeFindings.length === 0 && falsePositiveFindings.length === 0,
    });
  }

  const metrics = {
    recall: divide(truePositiveCount, expectedFindingCount),
    precision: divide(truePositiveCount, actualFindingCount),
    verdictAccuracy: divide(verdictMatchCount, cases.length),
    evidenceQuality: divide(evidenceQualityCount, actualFindingCount),
    actionability: divide(actionabilityCount, actualFindingCount),
    domainCoverage: divide(intersection(expectedDomains, coveredDomains).length, expectedDomains.size),
  };

  return {
    summary: {
      caseCount: cases.length,
      expectedFindingCount,
      actualFindingCount,
      truePositiveCount,
      falsePositiveCount: actualFindingCount - truePositiveCount,
      falseNegativeCount: expectedFindingCount - truePositiveCount,
      verdictMatchCount,
    },
    metrics,
    score: {
      weights: scoreWeights,
      overall: calculateOverallScore(metrics),
    },
    domainScores: calculateDomainScores(caseResults),
    ruleCoverage: calculateRuleCoverage(caseResults),
    cases: caseResults,
  };
}

export function formatEvaluationMarkdown(result) {
  const metricRows = [
    ['Recall', result.metrics.recall, result.score.weights.recall],
    ['Precision', result.metrics.precision, result.score.weights.precision],
    ['Verdict Accuracy', result.metrics.verdictAccuracy, result.score.weights.verdictAccuracy],
    ['Evidence Quality', result.metrics.evidenceQuality, result.score.weights.evidenceQuality],
    ['Actionability', result.metrics.actionability, result.score.weights.actionability],
    ['Domain Coverage', result.metrics.domainCoverage, result.score.weights.domainCoverage],
  ].map(([name, value, weight]) => `| ${name} | ${(value * 100).toFixed(1)}% | ${weight} |`).join('\n');

  const domainRows = Object.entries(result.domainScores)
    .map(([domain, score]) => `| ${domain} | ${score.score} | ${(score.recall * 100).toFixed(1)}% | ${(score.precision * 100).toFixed(1)}% | ${score.expected} | ${score.actual} |`)
    .join('\n');

  const coverageRows = Object.entries(result.ruleCoverage)
    .map(([ruleId, coverage]) => `| ${ruleId} | ${coverage.domain} | ${coverage.expected} | ${coverage.actual} | ${coverage.truePositive} | ${coverage.falsePositive} | ${coverage.falseNegative} | ${(coverage.recall * 100).toFixed(1)}% | ${(coverage.precision * 100).toFixed(1)}% |`)
    .join('\n');

  const caseRows = result.cases
    .map((evalCase) => {
      const status = evalCase.passed ? 'PASS' : 'FAIL';
      return `| ${evalCase.name} | ${status} | ${evalCase.expectedVerdict} | ${evalCase.actualVerdict} | ${evalCase.truePositiveFindings.length}/${evalCase.expectedFindings.length} | ${evalCase.falsePositiveFindings.join(', ') || 'none'} |`;
    })
    .join('\n');

  return `# Safety Manager Evaluation Report

Overall Score: ${result.score.overall}/100

## Summary

- Benchmark cases: ${result.summary.caseCount}
- Expected findings: ${result.summary.expectedFindingCount}
- Actual findings: ${result.summary.actualFindingCount}
- True positives: ${result.summary.truePositiveCount}
- False positives: ${result.summary.falsePositiveCount}
- False negatives: ${result.summary.falseNegativeCount}
- Verdict matches: ${result.summary.verdictMatchCount}

## Metrics

| Metric | Value | Weight |
| --- | ---: | ---: |
${metricRows}

## Domain Scores

| Domain | Score | Recall | Precision | Expected | Actual |
| --- | ---: | ---: | ---: | ---: | ---: |
${domainRows}

## Coverage Matrix

This matrix shows fixture coverage by rule. It is benchmark coverage, not real-world accuracy.

| Rule | Domain | Expected | Actual | True Positive | False Positive | False Negative | Recall | Precision |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${coverageRows}

## Cases

| Case | Status | Expected Verdict | Actual Verdict | Findings Matched | False Positives |
| --- | --- | --- | --- | ---: | --- |
${caseRows}
`;
}
