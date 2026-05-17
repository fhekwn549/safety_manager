# I built an experimental safety review tool for agentic coding projects and need brutally honest feedback

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

```bash
npm install
npm test
npm run eval
npm run review-pack
```

## Feedback I need

- Finding usefulness: would this finding help you review an agent-written change?
- Evidence credibility: does the cited evidence justify the conclusion?
- False positives / false negatives: what would create noise or miss important review signals in real repos?
- Actionability: is the recommended next step specific enough?
- Code quality: do the implementation-quality checks catch maintainability issues without becoming subjective style noise?
- Claim calibration: are `claim_type`, `confidence`, and `evidence_strength` useful, or too much structure?

Links:

- GitHub repo: https://github.com/fhekwn549/safety_manager
- Sample report: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/sample-reports/sample-expanded-risk.md
- Eval report: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/eval-report.md
- Review rubric: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/reviewer-rubric.md
- Code quality rubric: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/code-quality-rubric.md
