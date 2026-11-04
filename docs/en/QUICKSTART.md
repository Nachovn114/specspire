# Quick Start — Installation & First Use Guide

[Español](../QUICKSTART.md) · [Development Workflow](WORKFLOW.md) · [Quality Gates](QUALITY.md) · [CLI Reference (es)](../CLI.md) · [Back to README](../../README.md)

**Goal:** Guide an AI agent from an empty directory or existing project to disciplined, verifiable software delivery without speculative overengineering.

**Prerequisites:**
- **Node.js:** Version `>= 20.0.0` (LTS 20, 22, or 24) for the Specspire CLI and verification scripts.
- **Skills Installer:** Node.js `>= 22.20.0` if using `npx skills add` (requirement of the official `skills` CLI).
- **Git:** Installed and available in PATH.
- **AI Coding Agent:** Any environment supporting the Agent Skills standard (T3 Code, Antigravity, Claude Code, Cursor, Codex, Windsurf, Cline, etc.).

---

## Choose Your Installation Path

Specspire provides two complementary adoption paths:

| Mode | What You Get | Who It Is For |
|---|---|---|
| **Path A: Skill-only** (`npx skills add`) | Installs `SKILL.md` and 30 technical references (15 ES + 15 EN) in `.agents/skills/specspire/`. | Developers who want disciplined agent guidance in chat without adding CLI tools or Markdown templates to their repository. |
| **Path B: Full Kit** (local `init`) | Installs the Skill + Specspire CLI (`init`, `doctor`, `next`, `feature`) + 16 bilingual templates. | Teams seeking persistent repository specification management (`PROJECT.md`, `AGENTS.md`, `specs/`). |

---

## Path A — Skill-only (Recommended for Agent Chat)

### 1. Installation via Skills CLI

Run in your project root or development workspace:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

The installer detects your active agent or prompts to confirm the destination directory (defaulting to `.agents/skills/specspire/`).

> [!NOTE]
> Skill-only mode installs the procedural guidance and technical references for your AI agent. It does not automatically install the local Specspire CLI binary or initialize project Markdown templates in your root folder.

### 2. Verify Installation

Confirm that the skill files are present:

```bash
# Verify main SKILL.md entrypoint and references
ls -la .agents/skills/specspire/SKILL.md
ls -la .agents/skills/specspire/references/
```

You should see `SKILL.md`, 15 Spanish references in `references/`, and 15 English references in `references/en/`.

### 3. Refresh or Restart the Agent

If your editor or agent session was open during installation:
- In **T3 Code / Antigravity**: Skills are dynamically reloaded or detected upon starting a new turn.
- In **Cursor / Claude Code**: Restart the window or terminal session to ensure the `.agents/skills/` directory is indexed.

### 4. Initial Steering Prompt (First Prompt)

Start a conversation with your agent by pasting:

```text
Use the specspire skill. Review our project goals and identify the current phase before writing any code.
```

### 5. Expected Agent Response

Your agent reads `SKILL.md`, adopts the disciplined 4-line protocol, and stops any premature code generation:

```text
Phase: 0 · Context & Discovery
Next action: Review problem statement, target users, and non-goals in conversation.
Verification: Confirm agreed scope with developer before creating any files.
Blockers: None.
```

### 6. Updating the Installed Skill

To update the installed Skill to the latest release:

```bash
npx skills add Nachovn114/specspire --skill specspire --force
```

---

## Path B — Full Kit (Repository Scaffolding & CLI Governance)

Use the Full Kit when you want to persist specifications, plans, and task breakdowns in version-controlled Markdown documents.

### 1. Initialize the Project

With Specspire cloned or available in your workspace:

```powershell
# On Windows PowerShell (using node directly)
node path/to/specspire/bin/specspire.mjs init --lang en

# On Linux / macOS
node path/to/specspire/bin/specspire.mjs init --lang en
```

`init` installs 34 files:
- 3 core project guide documents (`AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md`).
- The complete Skill (`SKILL.md` + 30 technical references).

> [!IMPORTANT]
> **Safe, Idempotent Behavior:** `init` never overwrites existing project files. If you already have a customized `PROJECT.md` or `AGENTS.md`, Specspire preserves it intact and reports `EXISTE`.

### 2. Diagnose Environment (`doctor`)

Run the document integrity checker:

```bash
node path/to/specspire/bin/specspire.mjs doctor
```

Exit codes returned by `doctor`:
- `0`: PASS — Complete installation and verified bilingual contract (34 files).
- `1`: FAIL — Missing, empty, or corrupted files, or disallowed symlinks.
- `2`: MIGRATION REQUIRED — Recognized legacy router; manual update required.

### 3. Check Next Action (`next`)

To determine the next documented step based on your current file states:

```bash
node path/to/specspire/bin/specspire.mjs next
```

### 4. Progressive Feature Lifecycle (`feature`)

Once `PROJECT.md` context is defined and approved, scaffold and advance features incrementally:

```bash
# 1. Create requirements specification
node path/to/specspire/bin/specspire.mjs feature new auth-login --lang en

# 2. Plan architecture (after reviewing and approving spec.md)
node path/to/specspire/bin/specspire.mjs feature plan auth-login --lang en

# 3. UI design (only if the feature includes a user interface)
node path/to/specspire/bin/specspire.mjs feature design auth-login --lang en

# 4. Break down into testable tasks (after reviewing plan.md)
node path/to/specspire/bin/specspire.mjs feature tasks auth-login --lang en

# 5. Record review and execution receipts
node path/to/specspire/bin/specspire.mjs feature review auth-login --lang en
```

---

## Updating an Existing Installation

1. **Create a Backup:** Back up `.agents/skills/specspire/` and your project context files (`PROJECT.md`, `AGENTS.md`, `README-DESARROLLO.md`).
2. **Run `init`:** Run `init` to install newly added references without overwriting existing customized documents.
3. **Verify with `doctor`:** Run `doctor` and confirm it returns exit code `0`.

---

## Troubleshooting

| Issue | Root Cause | Resolution |
|---|---|---|
| **Skill not discovered by agent** | Agent searches in a different skills directory. | Explicitly pass the path in your prompt: `"Use the specspire skill located at .agents/skills/specspire/SKILL.md"`. |
| **Node.js version mismatch** | Node.js version is older than 20.0.0 (or older than 22.20.0 for `npx skills`). | Upgrade Node.js to an active LTS release (`nvm use 22` or install from nodejs.org). |
| **PowerShell script execution blocked** | Windows execution policy blocks `.ps1` scripts. | Execute with `node path/to/specspire/bin/specspire.mjs` directly or use `npm.cmd` / `npx.cmd`. |
| **Wrong installation directory** | `npx skills` placed the skill in a global or unintended folder. | Pass `--target .agents/skills/specspire` or move the folder to your agent's expected skills path. |
| **Symlink or junction rejected** | Specspire defensively blocks symlinks to prevent path traversal vulnerabilities. | Always install on real physical disk paths without symbolic links in ancestor directories. |
| **`doctor` reports exit code 1** | Missing references or corrupted template files. | Re-run `init` to restore missing files without overwriting existing files. |
| **`doctor` reports exit code 2** | An older beta `SKILL.md` was detected. | Review the diff against a clean installation and merge the bilingual router links. |
| **Skill-only vs Full Kit difference** | Skill-only mode does not provide the `specspire` terminal command. | By design: Skill-only governs agent chat; Full Kit adds CLI binary and local project templates. |

---

Next steps: [Development Workflow](WORKFLOW.md) · [Quality Gates](QUALITY.md) · [CLI Reference (es)](../CLI.md) · [Back to README](../../README.md)
