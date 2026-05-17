# Platform Adapters

The package keeps rule content platform-agnostic and keeps adapter behavior thin.

## Generic Markdown

Use:

```bash
./install.sh --target generic --output ./AGENTIC_SAFETY_REVIEW.md
```

The export combines the skill entrypoint, skill references, baseline rules, reference overlays, and examples into one markdown file.

## Codex

Use:

```bash
./install.sh --target codex
```

The installer copies the skill to `$CODEX_HOME/skills/agentic-safety-review` or `~/.codex/skills/agentic-safety-review`.

Existing targets are not overwritten unless `--force` is provided.

## Claude Code

Use:

```bash
./install.sh --target claude
```

The installer copies the skill to `$CLAUDE_HOME/skills/agentic-safety-review` or `~/.claude/skills/agentic-safety-review`.

## Cursor

Use:

```bash
./install.sh --target cursor
```

The installer writes `.cursor/rules/agentic-safety-review.mdc` in the current directory. Use `--output` to choose a different file.

## Gemini

Use:

```bash
./install.sh --target gemini
```

The installer writes `GEMINI_AGENTIC_SAFETY_REVIEW.md` in the current directory. Use `--output` to choose a different file.
