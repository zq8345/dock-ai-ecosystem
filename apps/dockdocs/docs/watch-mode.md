# Codex Watch Mode

OPS-111 adds a local DEV/QA watch mode for the Codex task queue runner.

The flow is:

```text
PMO Board
Queue Writer
scripts/codex-task-queue.generated.json
Codex runner --watch
Mission Control generated data
```

Watch mode is not a production daemon, Windows service, scheduled task, or
startup process. It only runs while the local command is active.

## Run Once

```powershell
node scripts/codex-task-queue-runner.mjs --queue scripts/codex-task-queue.generated.json --once
```

## Watch Locally

```powershell
node scripts/codex-task-queue-runner.mjs --queue scripts/codex-task-queue.generated.json --watch --interval 30
```

The runner executes only pending queue tasks whose commands are allowlisted by
the task itself. The generated PMO queue is verification-only and does not
include merge, push, deploy, reset, clean, delete, or force-push commands.

Watch activity is written under:

```text
.codex-task-queue/
```

Mission Control data is refreshed separately with:

```powershell
npm --workspace @dock/dockdocs run mission-control:generate
```

Do not use watch mode for production deployment automation.
