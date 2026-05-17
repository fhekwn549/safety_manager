# I built an experimental safety review tool for agentic coding projects and need brutally honest feedback

I built Safety Manager, an experimental agentic coding guardrail and review signal tool. It reviews local repo evidence against a small rulebook and produces findings, evidence notes, missing-evidence notes, and suggested next actions.

I am looking for practical feedback, not praise. I want to know whether the findings would help in real agent-assisted coding review, where the evidence is weak, and where the tool over-warns.

## What it is

- Local rulebook and fixture-based audit tool.
- Review signal generator for agentic coding projects.
- Report generator with sample reports and a benchmark eval report.

## What it is not

- Not a vulnerability scanner.
- Not a CVE detector.
- Not proof that any real repo is vulnerable.
- Not a replacement for human security review.

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
- False positives: what would create noise in real repos?
- Actionability: is the recommended next step specific enough?
- Code quality: do the implementation-quality checks catch maintainability issues without becoming subjective style noise?

Links:

- GitHub repo: https://github.com/fhekwn549/safety_manager
- Sample report: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/sample-reports/sample-expanded-risk.md
- Review rubric: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/reviewer-rubric.md
- Code quality rubric: https://github.com/fhekwn549/safety_manager/blob/main/review-pack/code-quality-rubric.md
