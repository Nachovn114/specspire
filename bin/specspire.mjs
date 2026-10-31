#!/usr/bin/env node
import { constants, copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const kit = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VERSION = JSON.parse(readFileSync(join(kit, 'package.json'), 'utf8')).version;
const refs = ['00-prepare', '01-specify', '02-plan-design', '02-ui-quality', '02-responsive-cross-platform', '03-tasks', '04-implement', '05-converge', '06-deliver', '07-maintain', '08-code-quality', '09-debugging', '10-security-operations', '11-agent-collaboration', '12-data-privacy-compliance'];
const stages = {
  new: { file: 'spec.md', template: 'spec.md', requires: [] },
  plan: { file: 'plan.md', template: 'plan.md', requires: [['spec.md', 'TODO_SPEC']] },
  design: { file: 'design.md', template: 'design.md', requires: [['spec.md', 'TODO_SPEC']] },
  tasks: { file: 'tasks.md', template: 'tasks.md', requires: [['spec.md', 'TODO_SPEC'], ['plan.md', 'TODO_PLAN']] },
  review: { file: 'review.md', template: 'review.md', requires: [['tasks.md', 'TODO_TASK']] },
};
const required = [
  'README-DESARROLLO.md', 'PROJECT.md', 'AGENTS.md',
  '.agents/skills/specspire/SKILL.md',
  ...refs.map(n => `.agents/skills/specspire/references/${n}.md`)
];
const tokenFor = file => `TODO_${file === 'spec.md' ? 'SPEC' : file === 'tasks.md' ? 'TASK' : file.replace('.md', '').toUpperCase()}`;
function validateSkill(content) {
  const normalized = content.replaceAll('\r\n', '\n');
  if (!/^---\nname: specspire\ndescription: [^\n]*\S[^\n]*\n---(?:\n|$)/u.test(normalized)) throw new Error('SKILL.md: frontmatter inválido');
  if (!normalized.split('\n---')[1]?.trim()) throw new Error('SKILL.md: instrucciones vacías');
  for (const ref of refs) if (!normalized.includes(`references/${ref}.md`)) throw new Error(`Referencia no enlazada: ${ref}`);
}

function help() {
  console.log(`Specspire ${VERSION} — una Skill, ciclo completo de desarrollo

  specspire init [--target RUTA] [--dry-run]
  specspire doctor [--target RUTA]
  specspire status [--target RUTA]
  specspire next [SLUG] [--target RUTA]
  specspire feature new SLUG [--target RUTA]
  specspire feature plan SLUG [--target RUTA]
  specspire feature design SLUG [--target RUTA]   (solo con UI)
  specspire feature tasks SLUG [--target RUTA]
  specspire feature review SLUG [--target RUTA]
  specspire validate-source

SLUG: letras minúsculas, números y guiones (ej.: formulario-contacto).
No sobrescribe archivos. Las plantillas NO implementan ni verifican código.`);
}
function parse(argv) {
  const args = [], opts = { target: resolve('.'), dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--target' || arg === '-t') {
      if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw new Error(`Falta ruta después de ${arg}`);
      opts.target = resolve(argv[++i]);
    } else if (arg === '--dry-run') opts.dryRun = true;
    else if (arg === '--help' || arg === '-h') return { command: 'help', ...opts };
    else if (arg.startsWith('-')) throw new Error(`Argumento desconocido: ${arg}`);
    else args.push(arg);
  }
  return { command: args.shift() || 'help', args, ...opts };
}
function isSymlink(p) {
  try { return lstatSync(p).isSymbolicLink(); }
  catch (err) { if (err.code === 'ENOENT') return false; throw err; }
}
function secureDestination(base, target) {
  // Also protect ancestor components of the supplied project root.
  let abs = resolve(base);
  while (dirname(abs) !== abs) {
    if (isSymlink(abs)) throw new Error(`Destino inseguro (symlink): ${abs}`);
    abs = dirname(abs);
  }
  const rel = relative(resolve(base), resolve(target));
  if (rel === '..' || rel.startsWith('..' + sep) || rel.startsWith(sep)) throw new Error('Archivo fuera del proyecto');
  let current = resolve(base);
  if (isSymlink(current)) throw new Error(`Destino inseguro (symlink): ${current}`);
  for (const part of rel.split(sep)) {
    if (!part) continue;
    current = join(current, part);
    if (isSymlink(current)) throw new Error(`Destino inseguro (symlink): ${current}`);
  }
}
function sources() {
  return [
    ...['README-DESARROLLO.md', 'PROJECT.md', 'AGENTS.md'].map(n => ({ src: join(kit, 'templates', n), dest: n })),
    { src: join(kit, 'skills/specspire/SKILL.md'), dest: '.agents/skills/specspire/SKILL.md' },
    ...refs.map(n => ({ src: join(kit, `skills/specspire/references/${n}.md`), dest: `.agents/skills/specspire/references/${n}.md` })),
  ];
}
function installOne({ src, dest }, target, dryRun) {
  const output = resolve(target, dest);
  secureDestination(target, output);
  if (!existsSync(src)) throw new Error(`Falta archivo del kit: ${src}`);
  if (existsSync(output)) { console.log(`  EXISTE   ${dest}`); return false; }
  if (!dryRun) {
    mkdirSync(dirname(output), { recursive: true });
    secureDestination(target, output);
    try { copyFileSync(src, output, constants.COPYFILE_EXCL); }
    catch (err) { if (err.code !== 'EEXIST') throw err; console.log(`  EXISTE   ${dest}`); return false; }
  }
  console.log(`  ${dryRun ? 'CREARÍA' : 'CREADO '}  ${dest}`);
  return true;
}
function init({ target, dryRun, args }) {
  if (args.length) throw new Error('Uso: init [--target RUTA] [--dry-run]');
  console.log(`Specspire ${VERSION} → ${target}${dryRun ? ' (simulación)' : ''}`);
  let count = 0;
  for (const file of sources()) if (installOne(file, target, dryRun)) count++;
  console.log(`\n${count} archivos ${dryRun ? 'previstos' : 'creados'}, ${required.length - count} existentes.`);
  console.log('Siguiente: abre README-DESARROLLO.md, etapa 0 · Preparar.');
  if (existsSync(join(target, 'AGENTS.md')) && !readFileSync(join(target, 'AGENTS.md'),'utf8').includes('specspire'))
    console.log('AVISO: tu AGENTS.md existente no enlaza la Skill: añade esa referencia manualmente.');
}
function doctor({ target, args }) {
  if (args.length) throw new Error('Uso: doctor [--target RUTA]');
  let missing = 0, corrupt = 0;
  for (const name of required) {
    const file = join(target, name);
    try {
      secureDestination(target, file);
      const stat = lstatSync(file);
      if (!stat.isFile()) throw new Error('no es un archivo regular');
      const content = readFileSync(file, 'utf8');
      if (!content.trim()) throw new Error('contenido vacío');
      if (name.endsWith('/SKILL.md')) validateSkill(content);
    } catch (err) {
      if (err.code === 'ENOENT') { missing++; console.error(`FALTA ${name}`); }
      else { corrupt++; console.error(`CORRUPTO ${name}: ${err.message}`); }
    }
  }
  if (missing || corrupt) {
    console.error(`FAIL: instalación ${corrupt ? 'corrupta' : 'incompleta'} (${missing} faltantes, ${corrupt} inválidos).`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${required.length} archivos de la Skill y documentación instalados.`);
    if (!readFileSync(join(target, 'AGENTS.md'), 'utf8').includes('specspire')) console.log('AVISO: enlaza la Skill desde AGENTS.md.');
  }
  console.log('AVISO: doctor NO evalúa calidad del código, pruebas ni requisitos.');
}
function feature({ target, args, dryRun }) {
  const [stage, slug, ...extras] = args;
  if (!Object.hasOwn(stages, stage) || !slug || extras.length) throw new Error('Uso: feature <new|plan|design|tasks|review> <slug>');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug)) throw new Error('SLUG inválido; usa minúsculas, números y guiones.');
  if (!existsSync(join(target, 'PROJECT.md'))) throw new Error('Primero ejecuta init y prepara PROJECT.md.');
  if (existsSync(join(target, '.specify'))) throw new Error('Detectado Spec Kit oficial: utiliza sus comandos y artefactos existentes; evita un flujo paralelo.');
  const folder = resolve(target, 'specs', slug);
  const { file, template, requires } = stages[stage];
  const dest = join(folder, file);
  secureDestination(target, dest);
  if (stage === 'tasks' && existsSync(join(folder, 'design.md'))) {
    secureDestination(target, join(folder, 'design.md'));
    if (readFileSync(join(folder, 'design.md'), 'utf8').includes(tokenFor('design.md'))) throw new Error('Completa los TODO de design.md antes de avanzar.');
  }
  for (const [name, token] of requires) {
    const path = join(folder, name);
    if (!existsSync(path)) throw new Error(`Primero crea y completa specs/${slug}/${name}.`);
    if (readFileSync(path, 'utf8').includes(token)) throw new Error(`Completa los TODO de specs/${slug}/${name} antes de avanzar.`);
    if (name === 'spec.md' && readFileSync(path, 'utf8').includes('[ACLARAR:')) throw new Error(`Resuelve las dudas [ACLARAR] de specs/${slug}/spec.md antes de avanzar.`);
  }
  const source = join(kit, 'templates/feature', template);
  if (existsSync(dest)) { console.log(`EXISTE specs/${slug}/${file} (no sobrescrito).`); return; }
  if (!dryRun) {
    const content = readFileSync(source, 'utf8')
      .replaceAll('{{FEATURE}}', slug)
      .replaceAll('{{DATE}}', new Date().toISOString().slice(0,10));
    mkdirSync(folder, { recursive: true });
    secureDestination(target, dest);
    try { writeFileSync(dest, content, { encoding: 'utf8', flag: 'wx' }); }
    catch (err) { if (err.code !== 'EEXIST') throw err; console.log(`EXISTE specs/${slug}/${file} (no sobrescrito).`); return; }
  }
  console.log(`${dryRun ? 'CREARÍA' : 'CREADO'} specs/${slug}/${file}`);
  console.log('La plantilla está PENDIENTE: complétala con el agente, revisa y verifica el Gate antes de avanzar.');
}
function status({ target, args }) {
  if (args.length) throw new Error('Uso: status [--target RUTA]');
  if (!existsSync(join(target, 'PROJECT.md'))) throw new Error('Primero ejecuta init.');
  console.log(`Specspire · documentos en ${target}`);
  const folder = join(target, 'specs');
  const dirs = existsSync(folder) ? readdirSync(folder, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort() : [];
  if (!dirs.length) { console.log('Sin funcionalidades. Siguiente: feature new <slug>'); return; }
  for (const slug of dirs) {
    console.log(`\n${slug}:`);
    for (const [stage, value] of Object.entries(stages)) {
      const file = join(folder, slug, value.file);
      const token = tokenFor(value.file);
      if (!existsSync(file)) console.log(`  - ${value.file}: no creado${stage === 'design' ? ' (opcional)' : ''}`);
      else if (readFileSync(file, 'utf8').includes(token)) console.log(`  ~ ${value.file}: por completar`);
      else console.log(`  + ${value.file}: sin marcadores TODO (revisar contenido y evidencias manualmente)`);
    }
  }
  console.log('\nEl estado documental no equivale a software probado ni entrega aprobada.');
}
function next({ target, args }) {
  if (args.length > 1) throw new Error('Uso: next [SLUG] [--target RUTA]');
  if (!existsSync(join(target, 'PROJECT.md'))) throw new Error('Primero ejecuta init.');
  if (existsSync(join(target, '.specify'))) { console.log('Detectado Spec Kit oficial: usa sus artefactos; no crees flujos paralelos.'); return; }
  const slug = args[0];
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug)) throw new Error('SLUG inválido.');
  const project = readFileSync(join(target, 'PROJECT.md'), 'utf8');
  if (project.includes('_Nombre_') || project.includes('_Qué problema resuelve_')) {
    console.log('Fase 0 · Completa PROJECT.md: objetivo, usuarios, restricciones y alcance.');
    console.log('Este diagnóstico es DOCUMENTAL; confirma la fase con tu agente.'); return;
  }
  const specs = join(target, 'specs');
  const dirs = existsSync(specs) ? readdirSync(specs, {withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name).sort() : [];
  if (!dirs.length) { console.log('Fase 1 · Crea tu primera funcionalidad: specspire feature new <slug>'); return; }
  if (!slug && dirs.length > 1) { console.log(`Especifica una función: specspire next <slug>. Disponibles: ${dirs.join(', ')}`); return; }
  const name = slug || dirs[0];
  if (!dirs.includes(name)) throw new Error(`Funcionalidad inexistente: ${name}`);
  const dir = join(specs, name);
  const order = [
    ['spec.md',tokenFor('spec.md'),'Fase 1 · Completa spec.md y valida criterios de aceptación.','feature new'],
    ['plan.md',tokenFor('plan.md'),'Fase 2 · Completa plan.md y justifica stack/arquitectura.','feature plan'],
    ...(existsSync(join(dir, 'design.md')) ? [['design.md', tokenFor('design.md'), 'Fase 2 · Completa design.md y verifica la dirección UI/UX.', 'feature design']] : []),
    ['tasks.md',tokenFor('tasks.md'),'Fase 3 · Completa tasks.md con tareas y pruebas por requisito.','feature tasks'],
    ['review.md',tokenFor('review.md'),'Fase 4–5 · Implementa tareas, ejecuta tests y registra evidencia en review.md.','feature review'],
  ];
  for (const [file,token,action,command] of order) {
    const p = join(dir,file);
    if (!existsSync(p)) { console.log(`${name}: ${action} Primero: specspire ${command} ${name}`); return; }
    const content = readFileSync(p,'utf8');
    if (content.includes(token) || (file==='spec.md' && content.includes('[ACLARAR:'))) {
      console.log(`${name}: ${action}`); return;
    }
  }
  console.log(`${name}: documentación sin marcadores TODO. Revisa tests, criterios, CI y UX reales antes de declarar terminado.`);
  console.log('AVISO: este comando NO ejecuta ni certifica pruebas de software.');
}
function validateSource() {
  for (const {src, dest} of sources()) {
    if (!existsSync(src) || !readFileSync(src,'utf8').trim()) throw new Error(`Fuente faltante o vacía: ${dest}`);
  }
  const skill = readFileSync(join(kit, 'skills/specspire/SKILL.md'), 'utf8');
  validateSkill(skill);
  const dirs = readdirSync(join(kit, 'skills'));
  if (dirs.length !== 1 || dirs[0] !== 'specspire') throw new Error('Debe haber una sola Skill principal');
  for (const s of Object.values(stages)) {
    const file = join(kit, 'templates/feature', s.template);
    if (!existsSync(file) || !readFileSync(file,'utf8').includes('{{FEATURE}}')) throw new Error(`Plantilla inválida: ${s.template}`);
  }
  console.log(`PASS: 1 Skill, ${refs.length} referencias, 3 plantillas de instalación y ${Object.keys(stages).length} plantillas progresivas.`);
}
try {
  const opts = parse(process.argv.slice(2));
  switch (opts.command) {
    case 'help': help(); break;
    case 'init': init(opts); break;
    case 'doctor': doctor(opts); break;
    case 'status': status(opts); break;
    case 'next': next(opts); break;
    case 'feature': feature(opts); break;
    case 'validate-source': if (opts.args.length) throw new Error('Uso: validate-source'); validateSource(); break;
    default: throw new Error(`Comando desconocido: ${opts.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}
