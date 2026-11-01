# Development guide — your project

**One step at a time.** Mark a phase complete only when you have evidence; the agent should explain the next action, not do everything at once.

## Start here

```text
Activate specspire. Read AGENTS.md, PROJECT.md, and README-DESARROLLO.md.
This is my project: [describe the objective or paste the assignment].
Identify the current phase. Give me just one action and explain how to verify it.
Do not add unnecessary frameworks, folders, or dependencies.
```

## Progress board

- [ ] **0 · Prepare** — Complete [PROJECT.md](PROJECT.md): objective, scope, and constraints.
- [ ] **1 · Specify** — Write behaviors and observable criteria (`spec.md`).
- [ ] **2 · Plan** — Choose the minimum stack; if there is UI, define the visual direction (`plan.md`, optional `design.md`).
- [ ] **3 · Organize** — Break work into tasks with dependencies and test criteria (`tasks.md`).
- [ ] **4 · Implement** — One task at a time, red test → green → refactor where appropriate.
- [ ] **5 · Verify** — Check requirements, tests, code, and UI according to scope (`review.md`).
- [ ] **6 · Deliver** — Product README, actual results, and clearly identified outstanding work.

## If the CLI is available

```bash
specspire next
specspire feature new feature-name --lang en
specspire feature plan feature-name --lang en
specspire feature design feature-name --lang en  # only with UI
specspire feature tasks feature-name --lang en
specspire feature review feature-name --lang en
specspire status
```

The language is not inherited automatically from `init --lang en`. Pass `--lang en` to each `feature` command to generate English documents; without it, generation defaults to Spanish.

If the CLI is not in your PATH, use `node PATH_TO_KIT/bin/specspire.mjs` as the prefix.

**Before finishing:** verify requirements, significant errors, execution, relevant tests, and documentation. If nothing was actually run, write **pending verification**.

**Bug:** reproduce → diagnose → fix → check for regressions. **Academic assignment:** the rubric takes priority.
