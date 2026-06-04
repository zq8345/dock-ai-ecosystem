# HERMES-002C Dispatcher Queue Summary

HERMES-002C connects the verification-only dispatcher queue snapshot to Mission Control.

## Scope

- Read `scripts/codex-task-dispatch.generated.json` during Mission Control data generation.
- Display Dispatcher Queue Summary in `/internal/mission-control/`.
- Show task count, pending, blocked, skipped, owner summary, safety summary, and a short task preview.

## Safety Boundary

- Does not execute the queue.
- Does not run the Codex task queue runner.
- Does not deploy.
- Does not merge or push.
- Does not modify the PMO Board.
- Does not expose command logs, secrets, tokens, or local absolute paths.

## Next Phase

HERMES-004 can define the runner execution strategy after PMO approval. HERMES-002C is display-only.
