# Code Quality Rubric

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
