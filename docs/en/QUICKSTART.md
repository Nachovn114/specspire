# Quick Start — VS Code

[Español](../QUICKSTART.md) · [Workflow](WORKFLOW.md) · [Quality gates](QUALITY.md) · [CLI (es)](../CLI.md) · [Back to README](../../README.md)

**Goal:** Turn an empty directory into a disciplined, guided project without preinstalling an unneeded framework or backend.

**Prerequisites:** Git and Node.js 20+ if you use the CLI; an agent compatible with Agent Skills for AI assistance.

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
| **Full kit, local copy** | `AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md` and the Skill in `.agents/skills/specspire/` | Verified locally with test suite and CI |
| **Skill only (local or manual)** | Only `SKILL.md` and its 15 references, without CLI or project docs | Activation tested in Google Antigravity (Phase 0); other agents unverified |
| **Remote: Skill only** (`npx skills add`) | Installs the Skill into `.agents/skills/specspire/` directly from GitHub | Verified from GitHub (1 Skill, 15 references); activation tested in Phase 0 |
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

`init` does not replace an existing Skill or `AGENTS.md`, so running it again **does not overwrite** your customizations. To update in a controlled way:

1. Review the [Changelog](../../CHANGELOG.md) for the new version.
2. Install a clean copy into a temporary directory and inspect the diff:

   ```powershell
   $newCopy = Join-Path $env:TEMP ('specspire-' + (Get-Date -Format 'yyyyMMddHHmmss'))
   node ../Specspire/bin/specspire.mjs init --target $newCopy
   git diff --no-index .agents\skills\specspire "$newCopy\.agents\skills\specspire"
   ```

3. If you accept the changes, copy the updated Skill files and run `doctor`:

   ```powershell
   Copy-Item -Recurse -Force "$newCopy\.agents\skills\specspire\*" .agents\skills\specspire\
   node ../Specspire/bin/specspire.mjs doctor
   ```

4. Manually port any desired updates from `$newCopy\AGENTS.md` into your `AGENTS.md`; your custom rules remain intact. `PROJECT.md` and `README-DESARROLLO.md` belong to your project: do not replace them.

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
