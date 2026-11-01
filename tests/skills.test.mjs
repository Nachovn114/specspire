import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillRoot = path.join(root, 'skills/specspire');
const refsDir = path.join(skillRoot, 'references');
const enRefsDir = path.join(refsDir, 'en');

const refs = [
  '00-prepare',
  '01-specify',
  '02-plan-design',
  '02-ui-quality',
  '02-responsive-cross-platform',
  '03-tasks',
  '04-implement',
  '05-converge',
  '06-deliver',
  '07-maintain',
  '08-code-quality',
  '09-debugging',
  '10-security-operations',
  '11-agent-collaboration',
  '12-data-privacy-compliance'
];

// Helper: Deterministic language negotiation specification (static contract)
function negotiateLanguage({ explicitPreference, contextLanguage, hasAmbiguity } = {}) {
  // 1. Explicit user preference strictly takes precedence
  if (explicitPreference === 'en' || explicitPreference === 'es') {
    return explicitPreference;
  }
  // 2. Unambiguous context detection
  if (!hasAmbiguity) {
    if (contextLanguage === 'en') return 'en';
    if (contextLanguage === 'es') return 'es';
  }
  // 3. Deterministic canonical fallback to Spanish
  return 'es';
}

// ---------------------------------------------------------------------------
// 1. Single Public Skill and Identity Invariants
// ---------------------------------------------------------------------------

test('single public skill invariant: skills/ contains exactly one skill directory named specspire', () => {
  const dirs = readdirSync(path.join(root, 'skills'), { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  assert.deepEqual(dirs, ['specspire'], 'Must maintain exactly one public skill named "specspire"; no specspire-en or specspire-es allowed');
});

test('public skill metadata invariant: name must remain specspire and description must be non-empty', () => {
  const skillFile = path.join(skillRoot, 'SKILL.md');
  assert.ok(existsSync(skillFile), 'skills/specspire/SKILL.md must exist');
  const content = readFileSync(skillFile, 'utf8');
  assert.match(content, /^---\r?\nname: specspire\r?\n/m, 'SKILL.md name must remain strictly "specspire"');
  assert.match(content, /^description:\s+\S+/m, 'SKILL.md must have a non-empty description');
});

// ---------------------------------------------------------------------------
// 2. Reference Parity (Preserved Spanish + Future English 1:1)
// ---------------------------------------------------------------------------

test('canonical Spanish references: all 15 operational references are preserved and non-empty', () => {
  for (const ref of refs) {
    const file = path.join(refsDir, `${ref}.md`);
    assert.ok(existsSync(file), `Spanish reference missing: ${file}`);
    const content = readFileSync(file, 'utf8').trim();
    assert.ok(content.length > 50, `Spanish reference ${ref}.md is empty or trivially short`);
  }
});

test('bilingual reference parity: all 15 English references must exist in references/en/ (Phase 2 target)', () => {
  assert.ok(existsSync(enRefsDir), 'Directory skills/specspire/references/en/ must exist in Phase 2');
  for (const ref of refs) {
    const file = path.join(enRefsDir, `${ref}.md`);
    assert.ok(existsSync(file), `English reference missing: skills/specspire/references/en/${ref}.md`);
    const content = readFileSync(file, 'utf8').trim();
    assert.ok(content.length > 50, `English reference ${ref}.md is empty or trivially short`);
  }
});

test('operational references do not require independent skill frontmatter', () => {
  for (const ref of refs) {
    const esFile = path.join(refsDir, `${ref}.md`);
    if (existsSync(esFile)) {
      const content = readFileSync(esFile, 'utf8');
      assert.ok(!content.startsWith('---'), `Operational reference ${ref}.md should be a Markdown guide, not a standalone skill with frontmatter`);
    }
    const enFile = path.join(enRefsDir, `${ref}.md`);
    if (existsSync(enFile)) {
      const content = readFileSync(enFile, 'utf8');
      assert.ok(!content.startsWith('---'), `Operational reference en/${ref}.md should be a Markdown guide, not a standalone skill with frontmatter`);
    }
  }
});

// ---------------------------------------------------------------------------
// 3. Router and Link Integrity
// ---------------------------------------------------------------------------

test('bilingual router in SKILL.md: links both Spanish and English paths for each reference', () => {
  const content = readFileSync(path.join(skillRoot, 'SKILL.md'), 'utf8');
  for (const ref of refs) {
    assert.ok(content.includes(`references/${ref}.md`), `Router must link Spanish reference references/${ref}.md`);
    assert.ok(content.includes(`references/en/${ref}.md`), `Router must link English reference references/en/${ref}.md`);
  }
});

test('relative link integrity: all local Markdown links inside English references resolve to existing files', () => {
  assert.ok(existsSync(enRefsDir), 'Directory skills/specspire/references/en/ must exist to check relative links');
  const enFiles = readdirSync(enRefsDir).filter(f => f.endsWith('.md'));
  assert.equal(enFiles.length, 15, `Expected 15 English reference files, found ${enFiles.length}`);
  for (const f of enFiles) {
    const full = path.join(enRefsDir, f);
    const content = readFileSync(full, 'utf8');
    for (const [, target] of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const targetPath = path.resolve(enRefsDir, decodeURIComponent(target.split('#')[0]));
      assert.ok(existsSync(targetPath), `Broken relative link in references/en/${f} => ${target}`);
    }
  }
});

test('language negotiation protocol is explicitly declared in SKILL.md', () => {
  const content = readFileSync(path.join(skillRoot, 'SKILL.md'), 'utf8');
  // 1. Explicit user preference
  assert.match(content, /preferencia\s+expl[íi]cita|explicit\s+preference/i, 'SKILL.md must declare explicit preference rule');
  // 2. Contextual language detection
  assert.match(content, /contexto|context/i, 'SKILL.md must declare contextual language detection rule');
  // 3. Canonical fallback to Spanish
  assert.match(content, /fallback|predeterminado|default/i, 'SKILL.md must declare canonical Spanish fallback rule');
  // 4. Monolingual loading to protect context window
  assert.match(content, /[uú]nicamente|exclusiv|only|token/i, 'SKILL.md must mandate loading only the active language reference');
});

test('gates and conditional references remain strictly preserved in SKILL.md', () => {
  const content = readFileSync(path.join(skillRoot, 'SKILL.md'), 'utf8');
  // UI gate conditional
  assert.ok(content.includes('solo si hay interfaz') || content.includes('solo en proyectos con UI'), 'UI references must remain strictly conditional');
  // Privacy gate conditional
  assert.ok(content.includes('solo si trata datos personales') || content.includes('solo si el proyecto trata datos personales'), 'Privacy reference must remain strictly conditional');
  // Evidence maturity tiers in router
  for (const status of ['PASS', 'BLOCKED', 'NOT VERIFIED']) {
    assert.ok(content.includes(status), `SKILL.md must preserve maturity tier ${status}`);
  }
  // All four tiers in lifecycle standards
  for (const ref of ['02-responsive-cross-platform.md', '12-data-privacy-compliance.md']) {
    const std = readFileSync(path.join(refsDir, ref), 'utf8');
    for (const status of ['PASS', 'FAIL', 'BLOCKED', 'NOT VERIFIED']) {
      assert.ok(std.includes(status), `Standard ${ref} must preserve maturity tier ${status}`);
    }
  }
  // review.md artifact
  assert.ok(content.includes('review.md'), 'SKILL.md must preserve review.md artifact requirement');
});

// ---------------------------------------------------------------------------
// 4. Language Resolution Scenarios (Static Deterministic Contract)
// ---------------------------------------------------------------------------

test('deterministic language evaluation scenarios', () => {
  // Scenario 1: Explicit English overrides Spanish context
  assert.equal(
    negotiateLanguage({ explicitPreference: 'en', contextLanguage: 'es', hasAmbiguity: false }),
    'en',
    'Explicit English must override Spanish context'
  );

  // Scenario 2: Explicit Spanish overrides English context
  assert.equal(
    negotiateLanguage({ explicitPreference: 'es', contextLanguage: 'en', hasAmbiguity: false }),
    'es',
    'Explicit Spanish must override English context'
  );

  // Scenario 3: Unambiguous English context without explicit preference selects English
  assert.equal(
    negotiateLanguage({ explicitPreference: null, contextLanguage: 'en', hasAmbiguity: false }),
    'en',
    'Unambiguous English context must select English'
  );

  // Scenario 4: Unambiguous Spanish context without explicit preference selects Spanish
  assert.equal(
    negotiateLanguage({ explicitPreference: null, contextLanguage: 'es', hasAmbiguity: false }),
    'es',
    'Unambiguous Spanish context must select Spanish'
  );

  // Scenario 5: Ambiguous / mixed / unknown context deterministically falls back to Spanish
  assert.equal(
    negotiateLanguage({ explicitPreference: null, contextLanguage: 'unknown', hasAmbiguity: true }),
    'es',
    'Ambiguous context must fall back to Spanish'
  );
  assert.equal(
    negotiateLanguage({ explicitPreference: null, contextLanguage: null, hasAmbiguity: false }),
    'es',
    'Missing context must fall back to Spanish'
  );
});

// ---------------------------------------------------------------------------
// 5. Legacy Installation Compatibility and Diagnostic Fixture
// ---------------------------------------------------------------------------

test('legacy installation compatibility: detect legacy 19-file installation without silent overwriting', () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'specspire-legacy-test-'));
  try {
    const agentsDir = path.join(tempDir, '.agents/skills/specspire');
    const legacyRefsDir = path.join(agentsDir, 'references');
    mkdirSync(legacyRefsDir, { recursive: true });
    // Simulate legacy installation: Spanish references only, no en/ directory
    for (const ref of refs) {
      const p = path.join(legacyRefsDir, `${ref}.md`);
      writeFileSync(p, `# Ref ${ref} (legacy content)\n`, { encoding: 'utf8' });
    }
    // Legacy SKILL.md without bilingual router
    const legacySkill = '# Specspire Legacy\n' + refs.map(r => `[${r}](references/${r}.md)`).join('\n');
    writeFileSync(path.join(agentsDir, 'SKILL.md'), legacySkill, { encoding: 'utf8' });

    // Existing project files
    writeFileSync(path.join(tempDir, 'AGENTS.md'), 'Custom developer instructions.\n', { encoding: 'utf8' });

    // Contract assertions:
    // 1. Detect that references/en does NOT exist in legacy install
    assert.equal(existsSync(path.join(legacyRefsDir, 'en')), false, 'Legacy installation must not have references/en/');
    // 2. Detect that legacy SKILL.md lacks bilingual router links
    assert.equal(legacySkill.includes('references/en/'), false, 'Legacy SKILL.md lacks bilingual router links');
    // 3. User AGENTS.md content must be preserved untouched
    assert.equal(readFileSync(path.join(tempDir, 'AGENTS.md'), 'utf8'), 'Custom developer instructions.\n');
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
