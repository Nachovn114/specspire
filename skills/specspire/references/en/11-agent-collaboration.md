# Annex · Agent Orchestration (Optional)

**For a small form, use only one agent.** Parallelize only if there are at least two independent tasks and tooling supports isolated sessions.

1. Separate responsibilities: planning/contracts, implementation and review. Do not have two agents edit the same directory or the same files simultaneously.
2. Create a branch and **git worktree per task** if the environment supports it. Avoid copying credentials between worktrees. Each agent receives spec, task, allowed files and acceptance tests.
3. Implementation returns diff, actually executed tests and risks; independent review checks spec and standards before merging.
4. Sequential integration: resolve conflicts, run the combined suite, analyze contracts and review total diff. No agent automatically approves its own work.
5. If tooling does not support worktrees/subagents, follow the same process sequentially. Quality matters more than concurrency.
6. Push, merge, deployment and actions incurring costs are owner decisions; do not automate them without authorization.

**Checklist:** Confirmed isolation · clear ownership · tests per branch · independent review · verified final integration.

