# Quick Start — Installation & First Use Guide

[Español](../QUICKSTART.md) · [Development Workflow](WORKFLOW.md) · [Quality Gates](QUALITY.md) · [CLI Reference (es)](../CLI.md) · [Back to README](../../README.md)

**Goal:** Guide an AI agent from an empty directory or existing project to disciplined, verifiable software delivery without speculative overengineering.

**Prerequisites:**
- **Node.js:** Version `>= 20.0.0` (Node 20 technically compatible but reaches EOL in April 2026; Node 22 & 24 LTS verified in CI; Node 26 current/LTS unverified) for the Specspire CLI and verification scripts.
- **Skills Installer:** Node.js `>= 22.20.0` if using `npx skills add` (independent requirement of the official `skills` CLI).
- **Git:** Installed and available in PATH.
- **AI Coding Agent:** Any environment supporting the Agent Skills standard (T3 Code, Antigravity, Claude Code, Cursor, Codex, Windsurf, Cline, etc.).

---

## Choose Your Installation Path

Specspire provides two complementary adoption paths:

| Mode | What You Get | Who It Is For |
|---|---|---|
| **Path A: Skill-only** (`npx skills add`) | Installs `SKILL.md` and 30 technical references (15 ES + 15 EN) in your agent's skills directory. Does not install the CLI or create `PROJECT.md`/`AGENTS.md`. | Developers who want disciplined agent guidance in chat without adding CLI tools or Markdown templates to their repository. |
| **Path B: Full Kit** (local `init`) | Installs the Skill + Specspire CLI (`init`, `doctor`, `next`, `feature`) + up to 34 project files with 16 bilingual templates. Preserves existing files. | Teams seeking persistent repository specification management (`PROJECT.md`, `AGENTS.md`, `specs/`). |

---

## Path A — Skill-only (Recommended for Agent Chat)

### 1. Installation via Skills CLI

Run in your project root or development workspace:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

The installer detects your active agent or prompts to confirm the agent-specific destination directory (for example `.agents/skills/specspire/`, `.claude/skills/specspire/`, `.cursor/skills/specspire/`, or `.gemini/skills/specspire/`).

> [!NOTE]
> Skill-only mode installs the procedural guidance and technical references for your AI agent. It does not install the Specspire CLI command into your terminal, nor does it automatically create `PROJECT.md` or `AGENTS.md` in the project root. Project context is established conversationally in chat.

### 2. Verify Installation

Confirm that the skill files are present in your skills directory:

```bash
# Verify main SKILL.md entrypoint and references (adjust path for your agent)
ls -la .agents/skills/specspire/SKILL.md
ls -la .agents/skills/specspire/references/
```

You should see `SKILL.md`, 15 Spanish references in `references/`, and 15 English references in `references/en/`.

### 3. Refresh or Restart the Agent

If your editor or agent session was open during installation:
- In **T3 Code / Antigravity**: Skills are dynamically reloaded or detected upon starting a new turn.
- In **Cursor / Claude Code**: Restart the window or terminal session to ensure the agent's skills directory is indexed.

### 4. Initial Steering Prompt (First Prompt)

Start a conversation with your agent by pasting:

```text
Use the specspire skill. Review our project goals and identify the current phase before writing any code.
```

### 5. Expected Agent Response

Instructs your agent to adopt the 4-line status format and establish boundaries before creating or modifying files:

```text
Phase: 0 · Context & Discovery
Next action: Review problem statement, target users, and non-goals in conversation.
Verification: Confirm agreed scope with developer before creating any files.
Real blocker (if any): None.
```

### 6. Updating the Installed Skill

To inspect and update skills managed by the official `skills` CLI:

```bash
# List installed skills and their locations
npx skills list

# Check for remote updates
npx skills check

# Update installed skills to the latest release
npx skills update
```

> [!WARNING]
> If you made local modifications to the Skill files, make a backup before running `npx skills update`, as the skill manager will update the files in the Skill directory.

---

## Path B — Full Kit (Repository Scaffolding & CLI Governance)

Use the Full Kit when you want to persist specifications, plans, and task breakdowns in version-controlled Markdown documents and audit documentation integrity with the Specspire CLI.

### 1. Initialize the Project

For a new developer, the Specspire CLI can be invoked in two ways:

```bash
# Option 1: If you installed specspire as a local project dependency (npm install -D specspire)
npx specspire init --lang en

# Option 2: If you cloned the specspire repository
node path/to/specspire/bin/specspire.mjs init --lang en
```

`init` installs up to 34 files in your project:
- 3 core project guide documents (`AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md`).
- The complete Skill (`SKILL.md` + 30 technical references: 15 Spanish, 15 English).
- Makes 16 progressive templates available for subsequent `feature` commands.

> [!IMPORTANT]
> **Safe, Idempotent Behavior:** `init` never overwrites existing project files destructively. If you already have a customized `PROJECT.md` or `AGENTS.md`, Specspire preserves it intact and reports `EXISTE`.

### 2. Diagnose Environment (`doctor`)

Run the document integrity checker:

```bash
# With local package or npx
npx specspire doctor

# Or with cloned repository
node path/to/specspire/bin/specspire.mjs doctor
```

> [!NOTE]
> `doctor` checks document structure, physical file presence, and reference link integrity. It does not evaluate application source code quality or test outcomes.

Exit codes returned by `doctor`:
- `0`: PASS — Complete installation and verified bilingual contract (34 files).
- `1`: FAIL — Missing, empty, or corrupted files, or disallowed symlinks.
- `2`: MIGRATION REQUIRED — Recognized legacy router; manual update required.

### 3. Check Next Action (`next`)

To determine the next documented step based on your current file states:

```bash
npx specspire next
```

### 4. Progressive Feature Lifecycle (`feature`)

Once `PROJECT.md` context is defined and approved, scaffold and advance features incrementally using the 16 available progressive templates:

```bash
# 1. Create requirements specification
npx specspire feature new auth-login --lang en

# 2. Plan architecture (after reviewing and approving spec.md)
npx specspire feature plan auth-login --lang en

# 3. UI design (only if the feature includes a user interface)
npx specspire feature design auth-login --lang en

# 4. Break down into testable tasks (after reviewing plan.md)
npx specspire feature tasks auth-login --lang en

# 5. Record review and execution receipts
npx specspire feature review auth-login --lang en
```

---

## Updating an Existing Installation

1. **Create a Backup:** Back up `.agents/skills/specspire/` (or your agent's skills directory) and your project context files (`PROJECT.md`, `AGENTS.md`, `README-DESARROLLO.md`).
2. **If using Skill-only:** Run `npx skills check` and `npx skills update` to update references.
3. **If using Full Kit:** Run `init` to install newly added references without overwriting existing customized documents.
4. **Verify with `doctor`:** Run `doctor` and confirm it returns exit code `0`.

---

## Troubleshooting

| Issue | Root Cause | Resolution |
|---|---|---|
| **Skill not discovered by agent** | Agent searches in a different skills directory (e.g. `.claude/skills/`, `.cursor/skills/`). | Explicitly pass the path in your prompt or move the skill into the directory indexed by your environment. |
| **Node.js version mismatch** | Node.js version is older than 20.0.0 (or older than 22.20.0 for `npx skills`). | Specspire operates on Node.js `>= 20.0.0` (LTS 22 or 24 recommended in CI; Node 20 is EOL as of April 2026). External `skills` CLI requires Node.js `>= 22.20.0`. |
| **PowerShell script execution blocked** | Windows execution policy blocks `.ps1` scripts. | Execute with `node path/to/specspire/bin/specspire.mjs` directly or use `npx.cmd specspire`. |
| **Wrong installation directory** | `npx skills` placed the skill in a global or unintended folder. | Pass `--target` option to `skills` or move the folder to your agent's expected skills path. |
| **Symlink or junction rejected** | Specspire defensively blocks symlinks to prevent path traversal vulnerabilities. | Always install on real physical disk paths without symbolic links in ancestor directories. |
| **`doctor` reports exit code 1** | Missing references or corrupted template files. | Re-run `init` to restore missing files without overwriting existing files (`EXISTE`). |
| **`doctor` reports exit code 2** | An older beta `SKILL.md` was detected. | Review the diff against a clean installation and merge the bilingual router links. |
| **Skill-only vs Full Kit difference** | Skill-only mode does not provide the `specspire` terminal command. | By design: Skill-only governs agent chat; Full Kit adds CLI binary and local project templates. |

---

Next steps: [Development Workflow](WORKFLOW.md) · [Quality Gates](QUALITY.md) · [CLI Reference (es)](../CLI.md) · [Back to README](../../README.md)
