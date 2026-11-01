# Quick Start — VS Code

[Español](../QUICKSTART.md) · [Workflow](WORKFLOW.md) · [Quality gates](QUALITY.md) · [CLI (es)](../CLI.md) · [Back to README](../../README.md)

**Goal:** Turn an empty directory into a disciplined, guided project without preinstalling an unneeded framework or backend.

**Prerequisites:** Git and Node.js 20+ if you use the CLI; an agent compatible with Agent Skills for AI assistance.

**Unreleased local contract:** one Skill, 15 ES + 15 EN references; `init` installs 34 files (3 project documents + router + 30 references). Templates remain Spanish; English templates and `--lang` are future Phase 3 capabilities. No npm publication or bilingual availability in historical v0.9.0-beta.1 is implied.

Language selection: explicit preference → unambiguous request/project context → Spanish fallback. Load only relevant references in the selected language; comparison is reserved for explicitly requested translation, equivalence auditing or bilingual maintenance.

## 1. Open the project

In VS Code, open a new or existing folder. On Windows PowerShell:

```powershell
mkdir MyProject
cd MyProject
code .
```

## 2. Choose how to install Specspire

| Mode | What you get | Verification status |
|---|---|---|
| **Full kit, local copy** | `AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md` and the Skill in `.agents/skills/specspire/` | Verified locally; bilingual branch CI and agent pilots pending |
| **Skill only (local or manual)** | Only `SKILL.md` and its 30 references (15 ES + 15 EN), without CLI or project docs | Local bilingual files; real-agent bilingual activation not yet verified |
| **Remote: Skill only** (`npx skills add`) | Installs the Skill into `.agents/skills/specspire/` directly from GitHub | Historical v0.9.0-beta.1 evidence only (15 ES); does not verify this bilingual branch |
| **Remote: Full kit** (`npm exec github:`) | Installs the complete kit from the GitHub repository | Unverified end-to-end |

**Full kit (local).** With Specspire downloaded in a sibling folder, run from your project directory:

```powershell
node ../Specspire/bin/specspire.mjs init
node ../Specspire/bin/specspire.mjs doctor
```

`init` copies three project guide documents and the Skill without touching existing code. Running it again only adds missing files; it never overwrites existing ones. `doctor` inspects installed documents; it does not run application tests.

**Remote Skill-only.** Install the Skill directly from GitHub into your project:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

Or copy the `skills/specspire/` folder (including `references/`) into your agent's skills location. You do not need to run the CLI commands in this guide unless you also decide to scaffold the project guides.

## 3. Activate the Skill and describe what you are building

With the full kit, briefly fill in `PROJECT.md` or instruct the agent to do so with your initial requirements:

```text
Activate the specspire skill. Read AGENTS.md, PROJECT.md and README-DESARROLLO.md.
Here is the project goal or rubric: [paste requirements or project description].
Propose a minimal scope and flag any ambiguous requirements.
Give me only the first task and explain how to verify it.
```

**If context documents are missing** (skill-only install or existing codebase without the kit), provide the path to `SKILL.md`:

```text
Use the specspire skill located at [path to SKILL.md].
My goal is: [description]. Constraints: [stack, deadlines, rubric].
Maintain context within this conversation and propose only the next action.
Do not create files without explicit permission.
```

The agent maintains context in the conversation and only proposes writing a context file if you authorize it.

## 4. Follow the workflow without skipping stages

Open `README-DESARROLLO.md` and check off each step after verifying real evidence. To check the next documented step:

```powershell
node ../Specspire/bin/specspire.mjs next
```

To scaffold a new feature **after establishing the project context**:

```powershell
node ../Specspire/bin/specspire.mjs feature new contact-form
```

Open `specs/contact-form/spec.md`, complete it with the agent, and review it before planning.

## 5. Verify the delivery

Instruct the agent to execute **real project commands** (tests, linter, build, browser audits where applicable), verify requirements against observable output, and record anything that could not be run. Follow the protocol in [Quality gates](QUALITY.md).

## Updating an existing installation

`init` never replaces `SKILL.md`, existing references or project documents. A recognized legacy router yields `doctor` exit code 2 both before and after adding EN references; only a valid bilingual installation yields 0. Missing/invalid files yield 1. A customized legacy router may not match the known legacy fingerprint: inspect it manually rather than assuming it is a valid old release.

1. Review the [Changelog](../../CHANGELOG.md) and select the intended local source revision. Stop agent edits during migration. Use physical paths; inspect source, destination and ancestors for symlinks/junctions. Do not bypass protections or use traversal paths.
2. Before changing installed files, make a complete backup of `.agents/skills/specspire/` (including hidden directories) and the three project documents to a new, separate physical directory. Verify the backup contents and record its location; do not reuse an existing backup destination.
3. Create a clean comparison installation:

   ```powershell
   $newCopy = Join-Path $env:TEMP ('specspire-review-' + [guid]::NewGuid().ToString())
   node ../Specspire/bin/specspire.mjs init --target $newCopy
   git diff --no-index .agents/skills/specspire "$newCopy/.agents/skills/specspire"
   ```

   Inspect command results; `git diff --no-index` exit 1 means differences, not a failed installation. Stop on actual command errors.
4. Run the selected local CLI's `init` on the project to add missing files only. Compare every existing reference and the router against the clean copy. Merge accepted changes file by file, preserving intentional customizations. Integrate the bilingual protocol and all 30 links into a personalized old router; do not replace the directory wholesale. Keep project-specific `AGENTS.md`, `PROJECT.md` and `README-DESARROLLO.md` content.
5. Run `node ../Specspire/bin/specspire.mjs doctor` and inspect `$LASTEXITCODE`: 0 means the bilingual document contract passes; 2 means router migration remains; 1 requires correcting the reported missing/invalid files. Inspect the final diff and retain the backup. If rollback is needed, restore only reviewed files from that backup and rerun diagnostics; do not claim bilingual completion after restoring a legacy router.

## Common issues

| Situation | Recommended action |
|---|---|
| `node` is not available | Install Node.js 20+ or use a containerized environment |
| PowerShell blocks `npm.ps1` or `npx.ps1` | Use `npm.cmd` or `npx.cmd` (e.g. `npx.cmd skills ...`) without changing global system execution policies |
| `AGENTS.md` already exists | Specspire preserves it; manually add the link to `.agents/skills/specspire/SKILL.md` |
| Agent does not recognize the Skill | Explicitly provide the absolute or relative path to `SKILL.md`; check agent capability |
| Existing Spec Kit in project | Reuse its artifacts (`.specify/`); Specspire will not create a parallel spec tree |
| CLI command reports `TODO` | Complete and review that stage before advancing to the next |
| `doctor` reports incomplete or corrupted install | Inspect missing files; `init` restores missing files while preserving existing ones |
| Insecure destination (symlink detected) | Use a physical filesystem path without symbolic links in its ancestor tree |

[Back to README](../../README.md) · [CLI reference (es)](../CLI.md) · [Workflow guide](WORKFLOW.md) · [Versión en español](../QUICKSTART.md)
