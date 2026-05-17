#!/usr/bin/env node
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { formatEvaluationMarkdown, runEvaluation } from './lib/eval-harness.mjs';
import { auditRepo } from './lib/repo-audit.mjs';

const defaultFixtures = [
  'sample-expanded-risk',
  'unsafe-docker',
  'unsafe-supply-chain',
  'unsafe-ai-data-boundary',
  'unsafe-cloud-iam',
  'safe-basic-service',
];

const repoUrl = 'https://github.com/fhekwn549/safety_manager';
const sampleReportUrl = `${repoUrl}/blob/main/review-pack/sample-reports/sample-expanded-risk.md`;
const rubricUrl = `${repoUrl}/blob/main/review-pack/reviewer-rubric.md`;
const codeQualityRubricUrl = `${repoUrl}/blob/main/review-pack/code-quality-rubric.md`;

function parseArgs(argv) {
  const parsed = {
    output: 'review-pack',
    fixtures: defaultFixtures,
    clean: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === '--output') {
      if (!value || value.startsWith('--')) throw new Error('--output requires a value');
      parsed.output = value;
      index += 1;
      continue;
    }

    if (arg === '--fixtures') {
      if (!value || value.startsWith('--')) throw new Error('--fixtures requires a comma-separated value');
      parsed.fixtures = value.split(',').map((fixture) => fixture.trim()).filter(Boolean);
      if (parsed.fixtures.length === 0) throw new Error('--fixtures must include at least one fixture');
      index += 1;
      continue;
    }

    if (arg === '--clean') {
      parsed.clean = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

function assertSafeCleanTarget(outputRoot) {
  const cwd = path.resolve(process.cwd());
  const root = path.parse(outputRoot).root;
  const relativeFromOutputToCwd = path.relative(outputRoot, cwd);

  if (
    outputRoot === root
    || outputRoot === cwd
    || (!relativeFromOutputToCwd.startsWith('..') && relativeFromOutputToCwd !== '')
  ) {
    throw new Error(`Refusing to clean unsafe output directory: ${outputRoot}`);
  }
}

async function writeText(outputRoot, relativePath, content, files) {
  const filePath = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, 'utf8');
  files.push(relativePath.split(path.sep).join('/'));
}

function readme(fixtures) {
  return `# Safety Manager Review Pack

This review pack is for public practical feedback on Safety Manager as an agentic coding guardrail and review signal tool.

The reports in this folder come from deterministic fixtures. They are meant to show how the tool explains risk signals, missing evidence, and remediation paths for agent-assisted coding work.

## What To Review

- Finding usefulness: does each finding help a maintainer make a better decision?
- Evidence credibility: does cited evidence support the finding?
- False positives: where would this tool likely over-warn?
- Actionability: is the recommended next step concrete enough?

## Reproduce

\`\`\`bash
npm install
npm test
npm run eval
npm run review-pack
\`\`\`

## Contents

- \`sample-reports/\`: generated audit reports for ${fixtures.length} fixture repos.
- \`eval-report.md\`: benchmark behavior on labeled fixtures.
- \`known-limitations.md\`: current boundaries and failure modes.
- \`reviewer-rubric.md\`: scoring rubric for reviewers.
- \`code-quality-rubric.md\`: implementation-quality review checklist for maintainability signals.
- \`feedback-template.md\`: structured feedback form.
- \`feedback-template.csv\`: spreadsheet-friendly feedback form.
- \`post-draft.md\`: draft community post.

## Scope

Safety Manager looks for review signals in repo evidence and rulebook overlays. It does not prove exploitability or replace human review. Treat every finding as a prompt for evidence-based review.
`;
}

function codeQualityRubric() {
  return `# Code Quality Rubric

This rubric adds implementation-quality review to the safety review pack. It is inspired by common clean-coding and maintainability principles, but it does not quote or require any specific book or style guide.

Score each area from 1 to 5.

| Area | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Naming | Names hide intent or overload domain terms | Mostly clear with some ambiguous names | Names reveal intent and match domain language |
| Function size | Large mixed-purpose functions | Some functions do multiple jobs | Small cohesive functions with one clear job |
| Duplication | Same logic repeated across paths | Some repeated patterns | Shared behavior is factored without hiding clarity |
| Control flow | Deep nesting or surprising paths | Mostly readable | Simple predictable flow and early exits where useful |
| Error handling | Silent failure or unclear recovery | Some errors surfaced | Errors are explicit, actionable, and tested |
| Boundary clarity | Business logic mixed with IO/framework concerns | Partial separation | Domain logic, IO, config, and adapters are easy to distinguish |
| Tests | No meaningful behavior tests | Main path covered | Behavior, edge cases, and regression risks covered |
| Change safety | Small changes require broad edits | Moderate blast radius | Local changes are easy to reason about and verify |

## Reviewer Questions

- Which code path was hardest to understand quickly?
- Which name, function, or module should be changed first?
- Where is duplication hiding a missing abstraction?
- Where does the implementation mix business rules with IO, CLI, filesystem, network, or framework details?
- Which behavior needs a regression test before the next refactor?
- Which recommendation would improve maintainability without turning into subjective style policing?

## Not A Style Gate

Do not use this rubric to enforce personal formatting preferences. Use it to find maintainability risks that affect review confidence, future changes, and testability.
`;
}

function knownLimitations() {
  return `# Known Limitations

Safety Manager is not a vulnerability scanner, CVE detector, exploit validator, or compliance certification tool.

## False Positives

Rules are conservative and evidence-driven. A repo can trigger a finding when the code is acceptable but the fixture or repo lacks clear proof of ownership, isolation, compatibility, runtime mitigation, or human-review workflow.

## False Negatives

The tool can miss risks when evidence is hidden in unsupported file types, external systems, runtime configuration, SaaS settings, private docs, or deployment state.

## Fixture Bias

The current benchmark is based on small deterministic fixtures. Scores show fixture behavior, not broad real-world accuracy.

## Evidence Limits

Reports cite local files and missing evidence. They do not inspect live cloud resources, production kernels, package registry settings, secrets managers, or CI provider state.

## Severity Limits

Severity is calibrated for review priority. It is not a claim that a repo is exploitable or that a security incident exists.
`;
}

function reviewerRubric() {
  return `# Reviewer Rubric

Score each area from 1 to 5.

| Area | 1 | 3 | 5 |
| --- | --- | --- | --- |
| Finding usefulness | Noise or unclear value | Sometimes useful | Consistently helps review decisions |
| Evidence credibility | Evidence does not support claim | Partially supports claim | Directly supports claim |
| False positive risk | Likely too noisy | Mixed | Calibrated and easy to dismiss |
| Actionability | No clear next step | Some guidance | Concrete next safe action |
| Severity calibration | Overstates risk | Mostly reasonable | Matches practical review priority |

## Review Questions

- Which findings would you keep in a real code review?
- Which findings should be downgraded, merged, or removed?
- What evidence would make each finding more credible?
- What wording sounds like an unsupported vulnerability claim?
- What output format would make this easier to use in PR review?
`;
}

function feedbackTemplate() {
  return `# Feedback Template

Reviewer:

Context reviewed:

## Finding Usefulness

- Most useful finding:
- Least useful finding:
- Findings to remove or merge:

## Evidence Credibility

- Evidence that felt strong:
- Evidence that felt weak:
- Missing evidence that should be requested:

## False Positives / False Negatives

- Likely false positive:
- Why:
- Suggested wording or rule change:
- Likely false negative:
- Missing rule, pattern, or fixture:
- Suggested evidence to catch it:
- Reviewer verdict: true positive | false positive | false negative | unclear

## Actionability

- Most actionable recommendation:
- Recommendation that needs rewrite:
- Suggested next action:

## Overall

- Would you run this in agentic coding review?
- What would block adoption?
- Top three changes:
`;
}

function feedbackCsv() {
  return 'report,finding_id,claim_type,confidence,evidence_strength,reviewer_verdict,usefulness_1_5,evidence_credibility_1_5,false_positive_risk_1_5,false_negative_risk_1_5,actionability_1_5,severity_calibration_1_5,notes\n';
}

function postDraft() {
  return `# I built an experimental safety review tool for agentic coding projects and need brutally honest feedback

I built Safety Manager, an experimental agentic coding guardrail and review signal tool. It is meant to extend Codex/Claude/Cursor-style self-review with an explicit rulebook, claim-strength metadata, evidence requirements, and repeatable fixture evals.

It reviews local repo evidence against a small rulebook and produces findings, evidence notes, missing-evidence notes, claim type, confidence, evidence strength, and suggested next actions.

I am looking for practical feedback, not praise. I want to know whether the findings would help in real agent-assisted coding review, where the evidence is weak, and where the tool over-warns.

## What it is

- Local rulebook and fixture-based audit tool.
- Review signal generator for agentic coding projects.
- Self-review extension prompt/rule layer for coding agents.
- Report generator with sample reports, line/snippet evidence, and a benchmark eval report.
- MIT-licensed project.

## What it is not

- Not a vulnerability scanner.
- Not a CVE detector.
- Not proof that any real repo is vulnerable.
- Not a replacement for human security review.
- Not a claim that this is more accurate than built-in model self-review.

## Try it

\`\`\`bash
npm install
npm test
npm run eval
npm run review-pack
\`\`\`

## Feedback I need

- Finding usefulness: would this finding help you review an agent-written change?
- Evidence credibility: does the cited evidence justify the conclusion?
- False positives / false negatives: what would create noise or miss important review signals in real repos?
- Actionability: is the recommended next step specific enough?
- Code quality: do the implementation-quality checks catch maintainability issues without becoming subjective style noise?
- Claim calibration: are \`claim_type\`, \`confidence\`, and \`evidence_strength\` useful, or too much structure?

Links:

- GitHub repo: ${repoUrl}
- Sample report: ${sampleReportUrl}
- Eval report: ${repoUrl}/blob/main/review-pack/eval-report.md
- Review rubric: ${rubricUrl}
- Code quality rubric: ${codeQualityRubricUrl}
`;
}

async function buildReviewPack({ output, fixtures, clean }) {
  const outputRoot = path.resolve(process.cwd(), output);
  if (clean) {
    assertSafeCleanTarget(outputRoot);
    await rm(outputRoot, { recursive: true, force: true });
  }
  await mkdir(outputRoot, { recursive: true });

  const files = [];
  await writeText(outputRoot, 'README.md', readme(fixtures), files);
  await writeText(outputRoot, 'known-limitations.md', knownLimitations(), files);
  await writeText(outputRoot, 'reviewer-rubric.md', reviewerRubric(), files);
  await writeText(outputRoot, 'code-quality-rubric.md', codeQualityRubric(), files);
  await writeText(outputRoot, 'feedback-template.md', feedbackTemplate(), files);
  await writeText(outputRoot, 'feedback-template.csv', feedbackCsv(), files);
  await writeText(outputRoot, 'post-draft.md', postDraft(), files);

  for (const fixture of fixtures) {
    const audit = await auditRepo({ repoPath: path.join('fixtures', fixture) });
    await writeText(outputRoot, path.join('sample-reports', `${fixture}.md`), audit.report, files);
    await writeText(outputRoot, path.join('sample-reports', `${fixture}.json`), `${JSON.stringify(audit.reportData, null, 2)}\n`, files);
  }

  const evaluation = await runEvaluation({ casesPath: 'eval/cases.json' });
  await writeText(outputRoot, 'eval-report.md', formatEvaluationMarkdown(evaluation), files);
  await writeText(outputRoot, 'eval-report.json', `${JSON.stringify(evaluation, null, 2)}\n`, files);

  const sampleReports = await readdir(path.join(outputRoot, 'sample-reports'));
  const manifest = {
    generatedBy: 'npm run review-pack',
    fixtures,
    files: [...files, 'manifest.json'].sort(),
    sampleReports: sampleReports.sort(),
  };
  await writeText(outputRoot, 'manifest.json', `${JSON.stringify(manifest, null, 2)}\n`, files);

  return { outputRoot, manifest };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { outputRoot } = await buildReviewPack(args);
  console.log(`Wrote review pack to ${outputRoot}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
