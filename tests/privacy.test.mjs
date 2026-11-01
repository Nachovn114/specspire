import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync, realpathSync, rmSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bin = path.join(root, 'bin/specspire.mjs');
const runCli = (args, cwd) => spawnSync(process.execPath, [bin, ...args], { cwd, encoding: 'utf8' });
const withTemp = fn => {
  const d = realpathSync(mkdtempSync(path.join(tmpdir(), 'specspire-priv-')));
  try { fn(d); } finally { rmSync(d, { recursive: true, force: true }); }
};

// ============================================================================
// 1. Contratos documentales e integridad de la especificación técnica (pruebas estáticas)
// ============================================================================

test('privacy standard is wired through SKILL and lifecycle references with dates and jurisdiction', () => {
  const refName = '12-data-privacy-compliance.md';
  const skill = readFileSync(path.join(root, 'skills/specspire/SKILL.md'), 'utf8');
  assert.ok(skill.includes(`references/${refName}`), 'SKILL.md must link privacy reference');
  assert.ok(skill.includes('solo si trata datos personales'), 'SKILL.md routing must be strictly conditional');

  const standard = readFileSync(path.join(root, 'skills/specspire/references', refName), 'utf8');
  for (const term of [
    '31-10-2026',
    'Ley N° 19.628',
    'Ley N° 21.719',
    '01-12-2026',
    'Art. 14 ter',
    'Art. 14 quáter',
    'Art. 14 quinquies',
    'Art. 15 bis',
    'Art. 15 ter',
    'Art. 16 Ley 21.719',
    'Escenario A',
    'Escenario B',
    'Escenario C',
    'ARCOP',
    'PASS / FAIL / BLOCKED / NOT VERIFIED / N/A',
    '[ACLARAR:',
    'No constituye asesoramiento jurídico formal'
  ]) {
    assert.ok(standard.includes(term), `Privacy standard must include "${term}"`);
  }

  // Cross-lifecycle wiring
  assert.ok(readFileSync(path.join(root, 'skills/specspire/references/01-specify.md'), 'utf8').includes('datos personales'));
  assert.ok(readFileSync(path.join(root, 'skills/specspire/references/02-plan-design.md'), 'utf8').includes(refName));
  assert.ok(readFileSync(path.join(root, 'skills/specspire/references/05-converge.md'), 'utf8').includes(refName));
  assert.ok(readFileSync(path.join(root, 'skills/specspire/references/06-deliver.md'), 'utf8').includes('privacidad'));
});

test('distinguishes mock data (Escenario A) from real in-memory data (Escenario B) and full persistence (Escenario C)', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('Escenario A · Demo local con datos ficticios'));
  assert.ok(standard.includes('no generar políticas de privacidad ni avisos legales artificiales'));
  assert.ok(standard.includes('Escenario B · Interfaz que procesa datos personales reales solo en memoria'));
  assert.ok(standard.includes('No asumir exención automática de principios de licitud y finalidad'));
  assert.ok(standard.includes('Escenario C · Aplicación con persistencia, transmisión o terceros'));
});

test('distinguishes sensitive data (Art. 14) from protection of children and adolescents (Art. 16)', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('Categorías sensibles (Art. 10 Ley 19.628 / Art. 14 Ley 21.719 / Art. 9 GDPR)'));
  assert.ok(standard.includes('Datos de niños, niñas y adolescentes (específicamente Art. 16 Ley 21.719 / Art. 8 GDPR)'));
  assert.ok(standard.includes('representantes legales'));
});

test('multi-jurisdictional separation: does not extrapolate Chilean law outside territorial scope', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('no extrapolar leyes chilenas fuera de su ámbito'));
  assert.ok(standard.includes('GDPR en la UE'));
  assert.ok(standard.includes('LGPD en Brasil'));
  assert.ok(standard.includes('CCPA en California'));
});

test('distinguishes technical cookies from tracking cookies without universal banner imposition', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('no requieren banner de consentimiento invasivo'));
  assert.ok(standard.includes('No generar banners de cookies decorativos si el sistema no utiliza rastreadores'));
  assert.ok(standard.includes('P04'));
});

test('evidence strictness: design decisions do not constitute PASS and requires 4-tier maturity', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('Una decisión de diseño no constituye evidencia de cumplimiento'));
  assert.ok(standard.includes('Requisito especificado'));
  assert.ok(standard.includes('Control diseñado'));
  assert.ok(standard.includes('Control implementado'));
  assert.ok(standard.includes('Control efectivamente verificado'));

  const skill = readFileSync(path.join(root, 'skills/specspire/SKILL.md'), 'utf8');
  assert.ok(skill.includes('Una decisión de diseño no constituye evidencia'));

  const review = readFileSync(path.join(root, 'templates/feature/review.md'), 'utf8');
  assert.ok(review.includes('Una decisión de diseño no constituye evidencia de PASS'));
});

test('territorial jurisdiction: distinguishes mere web accessibility from directed offering and tracking', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('No asumir que un sitio está sujeto automáticamente al RGPD por ser accesible desde Europa'));
  assert.ok(standard.includes('Art. 3.2 RGPD'));
  assert.ok(standard.includes('oferta explícitamente dirigida a personas en la UE o seguimiento activo de su comportamiento'));
  assert.ok(standard.includes('No imponer a Chile requisitos propios de la Directiva ePrivacy europea'));
});

test('tracking and analytics: differentiates hashing pseudonymization, rejects obsolete TCF v2.2 and limits universal CMP', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('«sin cookies» equivale a anonimato'));
  assert.ok(standard.includes('no equivale a anonimización plena e irreversible'));
  assert.ok(standard.includes('no disponer de cuentas implica no tratar datos personales'));
  assert.ok(standard.includes('No asumir que cualquier herramienta analítica obliga automáticamente a instalar una CMP'));
  assert.ok(standard.includes('TCF v2.2 como recomendación vigente en 2026'));
  assert.ok(standard.includes('No clasificar automáticamente datos públicos de deportistas'));
  assert.ok(standard.includes('No declarar obligaciones universales de Registro de Actividades de Tratamiento (RAT) ni de Contrato de Encargo (DPA)'));
  assert.ok(standard.includes('No convertir decisiones de arquitectura clínica o de integración técnica'));
  assert.ok(standard.includes('Evaluar razonadamente la necesidad de una EIPD sin declararla obligatoria automáticamente'));
});

test('in-memory processing without storage constitutes personal data processing and limits N/A inference', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('El control específico no resulta aplicable al tratamiento evaluado, con justificación documentada'));
  assert.ok(standard.includes('No se puede inferir N/A únicamente por ausencia de almacenamiento, cuentas, backend, conexión a internet o cookies'));
  assert.ok(standard.includes('Los controles P01–P06 se evalúan individualmente según el tratamiento específico y no en bloque'));
  assert.ok(standard.includes('la verificación técnica de salvaguardas (PASS técnico) no equivale automáticamente a una certificación o validación jurídica de cumplimiento legal'));
  assert.ok(!standard.includes('ausencia demostrada de datos personales o almacenamiento'));

  const skill = readFileSync(path.join(root, 'skills/specspire/SKILL.md'), 'utf8');
  assert.ok(skill.includes('P01–P06 evaluados individualmente'));
  assert.ok(skill.includes('N/A exige justificación documentada por control y no se infiere por mera ausencia de almacenamiento'));
  assert.ok(skill.includes('sin asumir certificación jurídica automática'));

  const review = readFileSync(path.join(root, 'templates/feature/review.md'), 'utf8');
  assert.ok(review.includes('evaluados individualmente'));
  assert.ok(review.includes('el control específico no resulta aplicable al tratamiento evaluado, con justificación documentada; no inferible por mera ausencia de almacenamiento o backend'));
  assert.ok(review.includes('no equivale a certificación jurídica'));
});

test('P05 processor governance: offline does not infer N/A, roles distinguished, unconfirmed stays NOT VERIFIED or BLOCKED', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('La ausencia de internet, APIs o telemetría no demuestra por sí sola que no existan terceros encargados'));
  assert.ok(standard.includes('archivos entregados físicamente o mediante ejecución local'));
  assert.ok(standard.includes('funciones reales de responsable, encargado y terceros independientes'));
  assert.ok(standard.includes('No todo proveedor de datos, hosting o API es automáticamente encargado del tratamiento'));
  assert.ok(standard.includes('Si la relación no está confirmada, P05 debe permanecer NOT VERIFIED o BLOCKED'));
  assert.ok(standard.includes('N/A solo corresponde cuando la inaplicabilidad del control está suficientemente justificada'));

  const skill = readFileSync(path.join(root, 'skills/specspire/SKILL.md'), 'utf8');
  assert.ok(skill.includes('la ausencia de telemetría no descarta encargados'));

  const review = readFileSync(path.join(root, 'templates/feature/review.md'), 'utf8');
  assert.ok(review.includes('la ausencia de telemetría no descarta encargados'));
});

test('distinguishes pending decisions from real phase blockers and avoids automatic legal conclusions', () => {
  const standard = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
  assert.ok(standard.includes('No declarar que elegir Google Analytics, Meta Pixel, un proveedor de datos o una arquitectura específica impide comenzar la Fase 1'));
  assert.ok(standard.includes('Decisión pendiente:'));
  assert.ok(standard.includes('Riesgo pendiente:'));
  assert.ok(standard.includes('Bloqueo real:'));
  assert.ok(standard.includes('no debe asignarse automáticamente una base jurídica concreta'));
  assert.ok(standard.includes('términos y condiciones comerciales no son una obligación universal de privacidad'));
  assert.ok(standard.includes('reflejar el tratamiento efectivo, las jurisdicciones aplicables y las obligaciones verificadas'));
  assert.ok(standard.includes('exención universal para cualquier localStorage persistente'));
  assert.ok(standard.includes('La falta de cookies no demuestra ausencia de tratamiento de datos personales'));

  const skill = readFileSync(path.join(root, 'skills/specspire/SKILL.md'), 'utf8');
  assert.ok(skill.includes('Distinguir decisiones o riesgos pendientes de bloqueos reales que efectivamente impiden avanzar'));
  assert.ok(skill.includes('La falta de cookies no demuestra ausencia de tratamiento de datos personales'));
});

test('single public skill and 15 references preserved', () => {
  assert.equal(readdirSync(path.join(root, 'skills')).length, 1);
  const refs = readdirSync(path.join(root, 'skills/specspire/references')).filter(f => f.endsWith('.md'));
  assert.equal(refs.length, 15);
  assert.ok(refs.includes('12-data-privacy-compliance.md'));
});

// ============================================================================
// 2. Pruebas reales de integración de CLI (ejecución real de bin/specspire.mjs)
// ============================================================================

test('CLI integration: init installs the bilingual kit and doctor validates 34 files', () => withTemp(d => {
  const initRes = runCli(['init', '--target', d]);
  assert.equal(initRes.status, 0, initRes.stderr);

  const privRef = path.join(d, '.agents/skills/specspire/references/12-data-privacy-compliance.md');
  assert.ok(existsSync(privRef), 'Reference 12 must be installed by init');
  const enPrivRef = path.join(d, '.agents/skills/specspire/references/en/12-data-privacy-compliance.md');
  assert.ok(existsSync(enPrivRef), 'English privacy reference must be installed by init');
  assert.ok(readFileSync(enPrivRef, 'utf8').trim(), 'English privacy reference must not be empty');

  const docRes = runCli(['doctor', '--target', d]);
  assert.equal(docRes.status, 0, docRes.stderr);
  assert.match(docRes.stdout, /PASS: 34 archivos/);
}));

test('CLI integration: doctor detects missing 12-data-privacy-compliance reference', () => withTemp(d => {
  runCli(['init', '--target', d]);
  const privRef = path.join(d, '.agents/skills/specspire/references/12-data-privacy-compliance.md');
  rmSync(privRef);

  const docRes = runCli(['doctor', '--target', d]);
  assert.equal(docRes.status, 1);
  assert.match(docRes.stderr, /12-data-privacy-compliance\.md/);
}));

test('CLI integration: workflow advances cleanly for feature with "No aplica" without forcing privacy artifacts', () => withTemp(d => {
  runCli(['init', '--target', d]);

  // Set up project constitution
  const projPath = path.join(d, 'PROJECT.md');
  writeFileSync(projPath, readFileSync(projPath, 'utf8')
    .replace('_Nombre_', 'Calculadora')
    .replace('_Qué problema resuelve_', 'Operaciones matemáticas locales'));

  // Create new feature
  const featRes = runCli(['feature', 'new', 'suma-local', '--target', d]);
  assert.equal(featRes.status, 0, featRes.stderr);

  const specPath = path.join(d, 'specs/suma-local/spec.md');
  assert.ok(existsSync(specPath));
  assert.ok(readFileSync(specPath, 'utf8').includes('Datos personales y privacidad'));

  // Complete spec marking privacy as not applicable
  writeFileSync(specPath, readFileSync(specPath, 'utf8')
    .replaceAll('TODO_SPEC', 'No aplica: sin datos personales'));

  // Advance to plan: CLI must allow feature plan without error
  const planRes = runCli(['feature', 'plan', 'suma-local', '--target', d]);
  assert.equal(planRes.status, 0, planRes.stderr);
  assert.ok(existsSync(path.join(d, 'specs/suma-local/plan.md')));
}));

// English documentary integrity: scoped concepts and structure, not legal certification.
const enPrivacy = readFileSync(path.join(root, 'skills/specspire/references/en/12-data-privacy-compliance.md'), 'utf8');
const esPrivacy = readFileSync(path.join(root, 'skills/specspire/references/12-data-privacy-compliance.md'), 'utf8');
const uniqueMatches = (text, pattern) => [...new Set(text.match(pattern) || [])].sort();
const enBlock = pattern => {
  const block = enPrivacy.split(/\r?\n\s*\r?\n/).find(p => pattern.test(p));
  assert.ok(block, `Missing English section: ${pattern}`);
  return block;
};

test('EN privacy preserves statutory identifiers, dates and the currency warning', () => {
  assert.deepEqual(uniqueMatches(enPrivacy, /\b\d{2}-\d{2}-\d{4}\b/g), uniqueMatches(esPrivacy, /\b\d{2}-\d{2}-\d{4}\b/g));
  for (const law of ['19.628', '21.719']) {
    assert.ok(esPrivacy.includes(law)); assert.ok(enPrivacy.includes(law));
  }
  const framework = enBlock(/BCN/);
  assert.match(framework, /mandatory.*verify/i);
  assert.match(framework, /date.*amended.*subsequent/i);
});

test('EN privacy preserves territorial limits and separates ePrivacy applicability', () => {
  const framework = enBlock(/BCN/);
  for (const [law, territory] of [['GDPR','EU'],['LGPD','Brazil'],['CCPA','California']]) {
    assert.match(framework, new RegExp(`${law}[^,)]*${territory}`));
  }
  assert.match(framework, /do not extrapolate.*Chilean/i);
  const jurisdiction = enBlock(/Jurisdiction and territorial/);
  assert.match(jurisdiction, /do not assume.*GDPR.*accessible/i);
  assert.match(jurisdiction, /targeted.*monitoring/i);
  assert.match(jurisdiction, /3\.2 GDPR/);
  assert.match(jurisdiction, /do not impose.*ePrivacy.*Chile.*legal analysis/i);
});

test('EN privacy keeps distinct A/B/C scenarios and transient processing duties', () => {
  const scenarios = [...enPrivacy.matchAll(/^- \*\*Scenario ([ABC])\b([^\n]+)/gm)];
  assert.deepEqual(scenarios.map(m => m[1]), ['A','B','C']);
  assert.match(scenarios[0][2], /fictitious|synthetic/i);
  assert.match(scenarios[1][2], /real personal data.*memory/i);
  for (const concept of [/transient processing/i, /do not transmit/i, /do not persist/i, /do not log PII/i, /do not assume.*exemption/i]) assert.match(scenarios[1][2], concept);
  assert.match(scenarios[2][2], /persistence.*transmission.*third parties/i);
  assert.match(scenarios[2][2], /P01.P06/);
  assert.match(enBlock(/collection, use/), /constitutes data processing.*no permanent storage/i);
});

test('EN privacy preserves governance roles, pseudonymization limits and rights', () => {
  const roles = enPrivacy.split(/\r?\n/).find(line => /^- \*\*Controller and processors/.test(line));
  assert.ok(roles);
  for (const concept of [/controller/i, /processor/i, /independent third parties/i, /not every.*automatically/i, /DPA/, /unconfirmed.*NOT VERIFIED or BLOCKED/, /N\/A.*justified/i]) assert.match(roles, concept);
  const pseudo = enPrivacy.split(/\r?\n/).find(line => /Pseudonymization vs\./.test(line));
  assert.ok(pseudo); assert.match(pseudo, /does not equate.*anonymization/i); assert.match(pseudo, /re-identification|correlation/i);
  const rights = enPrivacy.split(/\r?\n/).find(line => /\(ARCOP/.test(line));
  for (const term of ['Access','Rectification','Erasure','Opposition','Blocking','Portability']) assert.ok(rights?.includes(term), term);
  const impact = enPrivacy.split(/\r?\n/).find(line => /DPIA \/ EIPD/.test(line));
  assert.ok(impact); assert.match(impact, /high-risk/i); assert.match(impact, /without automatically.*mandatory/i);
});

test('EN privacy matrix preserves individual P01-P06 controls and evidence states', () => {
  const rows = text => text.split(/\r?\n/).filter(line => /^\| P0[1-6] \|/.test(line)).map(line => line.split('|').slice(1,-1).map(cell => cell.trim()));
  const enRows = rows(enPrivacy), esRows = rows(esPrivacy);
  assert.equal(enRows.length, 6);
  assert.deepEqual(enRows.map(r => r[0]), ['P01','P02','P03','P04','P05','P06']);
  assert.deepEqual(enRows.map(r => r[0]), esRows.map(r => r[0]));
  const states = ['PASS','FAIL','BLOCKED','NOT VERIFIED','N/A'];
  const criteria = [/inventory/i,/lawful|consent/i,/security/i,/cookies.*trackers/i,/processors.*transfers/i,/legal.*implementation/i];
  enRows.forEach((row,i) => {
    assert.equal(row.length, 4); assert.match(row[1], criteria[i]); assert.ok(row[3].length > 0);
    assert.deepEqual(row[2].split(' / '), states); assert.equal(row[2], esRows[i][2]);
  });
  assert.match(enBlock(/Individual evaluation/), /evaluated individually/i);
  const na = enPrivacy.split(/\r?\n/).find(line => /^- \*\*N\/A:/.test(line));
  assert.ok(na); assert.match(na, /documented justification/i); assert.match(na, /cannot be inferred.*absence of storage/i); assert.match(na, /transient.*constitutes.*processing/i);
});

test('EN privacy separates technical evidence from legal certification', () => {
  const evidence = enBlock(/Strict evidence/);
  assert.match(evidence, /Never mark.*PASS.*solely.*architecture/i);
  assert.match(evidence, /technical verification.*does not.*legal certification/i);
  const maturity = enBlock(/Maturity hierarchy/);
  assert.equal((maturity.match(/^\d\. /gm) || []).length, 4);
  for (const term of [/Specified/i,/Designed/i,/Implemented/i,/verified/i]) assert.match(maturity,term);
  const formal = enBlock(/Formal states/);
  for (const state of ['PASS','FAIL','BLOCKED','NOT VERIFIED','N/A']) assert.ok(formal.includes(`**${state}:**`));
  assert.match(enBlock(/Notice of professional limitations/), /does not constitute.*legal advice/i);
});


test('EN privacy preserves consent safeguards and alternative lawful bases', () => {
  const bases = enBlock(/Identify legal basis per purpose/);
  assert.match(bases, /Arts\. 12 and 13 Ley 21\.719/);
  assert.match(bases, /Art\. 6 GDPR/);
  const consent = bases.split(/\r?\n/).find(line => /Consent \(Art\. 12\)/.test(line));
  assert.ok(consent);
  for (const safeguard of [/prior/i, /freely given/i, /informed/i, /specific/i, /unambiguous/i, /demonstrable/i, /never pre-ticked/i, /forced consent/i]) assert.match(consent, safeguard);
  const alternatives = bases.split(/\r?\n/).find(line => /Other bases \(Art\. 13\)/.test(line));
  assert.ok(alternatives);
  for (const concept of [/contract/i, /legal obligation/i, /balanced legitimate interest/i, /right to object/i]) assert.match(alternatives, concept);
});
