import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync, readdirSync, cpSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'bin/specspire.mjs');
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
const temp = fn => {
  const dir = realpathSync(mkdtempSync(path.join(os.tmpdir(), 'specspire-')));
  try { return fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
};
const names = [
  'README-DESARROLLO.md','PROJECT.md','AGENTS.md','.agents/skills/specspire/SKILL.md',
  ...['00-prepare','01-specify','02-plan-design','02-ui-quality','02-responsive-cross-platform','03-tasks','04-implement','05-converge','06-deliver','07-maintain','08-code-quality','09-debugging','10-security-operations','11-agent-collaboration','12-data-privacy-compliance'].map(n=>`.agents/skills/specspire/references/${n}.md`)
];
const fill = (d, slug, file, token) => {
  const p = path.join(d, 'specs', slug, file);
  writeFileSync(p, readFileSync(p, 'utf8').replaceAll(token, 'Contenido revisado y verificado por el usuario'));
};

test('source validation: one skill, thirty references and five feature templates',()=>{
  const x=run('validate-source'); assert.equal(x.status,0,x.stderr); assert.equal(readdirSync(path.join(root,'skills')).length,1);
});

test('responsive reference is installed intact and required by doctor',()=>temp(d=>{
  assert.equal(run('init','--target',d).status,0);
  const ref='02-responsive-cross-platform.md';
  const installed=path.join(d,'.agents/skills/specspire/references',ref);
  assert.equal(readFileSync(installed,'utf8'),readFileSync(path.join(root,'skills/specspire/references',ref),'utf8'));
  rmSync(installed);
  const result=run('doctor','--target',d);
  assert.equal(result.status,1);assert.ok(result.stderr.includes(ref));
}));
test('init installs guidance without creating a framework or specs',()=>temp(d=>{
  const x=run('init','--target',d); assert.equal(x.status,0,x.stderr);
  names.forEach(n=>assert.ok(existsSync(path.join(d,n)),n));
  assert.equal(readdirSync(d).length,4);
  assert.equal(run('doctor','--target',d).status,0);
  assert.match(run('status','--target',d).stdout,/Sin funcionalidades/);
}));
test('idempotence: respect existing files and do not overwrite',()=>temp(d=>{
  writeFileSync(path.join(d,'AGENTS.md'),'MIS REGLAS\n');
  assert.equal(run('init','--target',d).status,0);
  assert.equal(run('init','--target',d).status,0);
  assert.equal(readFileSync(path.join(d,'AGENTS.md'),'utf8'),'MIS REGLAS\n');
}));
test('dry-run leaves no files or folders',()=>temp(d=>{
  const dest=path.join(d,'new'); assert.equal(run('init','--target',dest,'--dry-run').status,0); assert.equal(existsSync(dest),false);
}));
test('project feature stages are progressive and do not overwrite',()=>temp(d=>{
  assert.equal(run('init','--target',d).status,0);
  const feature=['feature','new','formulario-contacto','--target',d];
  assert.equal(run(...feature).status,0);
  const spec=path.join(d,'specs/formulario-contacto/spec.md'); assert.ok(existsSync(spec));
  assert.equal(run('feature','plan','formulario-contacto','--target',d).status,1,'must complete spec first');
  fill(d,'formulario-contacto','spec.md','TODO_SPEC');
  assert.equal(run('feature','plan','formulario-contacto','--target',d).status,0);
  assert.equal(run('feature','tasks','formulario-contacto','--target',d).status,1,'must complete plan first');
  fill(d,'formulario-contacto','plan.md','TODO_PLAN');
  assert.equal(run('feature','tasks','formulario-contacto','--target',d).status,0);
  fill(d,'formulario-contacto','tasks.md','TODO_TASK');
  assert.equal(run('feature','review','formulario-contacto','--target',d).status,0);
  const before=readFileSync(spec,'utf8'); assert.equal(run(...feature).status,0); assert.equal(readFileSync(spec,'utf8'),before);
  assert.match(run('status','--target',d).stdout,/review.md: por completar/);
}));
test('UI design is optional and can be created without tasks',()=>temp(d=>{
  run('init','--target',d);run('feature','new','form','--target',d);fill(d,'form','spec.md','TODO_SPEC');
  assert.equal(run('feature','design','form','--target',d).status,0);
  assert.ok(existsSync(path.join(d,'specs/form/design.md')));
}));
test('reject path traversal and invalid feature slugs',()=>temp(d=>{
  run('init','--target',d);
  for(const slug of ['../../escape','My Form','../tmp','x_y','f/abc']) assert.equal(run('feature','new',slug,'--target',d).status,1,slug);
  assert.equal(existsSync(path.join(d,'escape')),false);
}));
test('symlinks inside destination are blocked',()=>temp(d=>{
  const project=path.join(d,'project'), outside=path.join(d,'outside');
  mkdirSync(project);mkdirSync(outside);writeFileSync(path.join(outside,'sentinel'),'unchanged');
  symlinkSync(outside,path.join(project,'.agents'),process.platform==='win32'?'junction':'dir');
  const x=run('init','--target',project); assert.equal(x.status,1);assert.match(x.stderr,/Destino inseguro \(symlink\)/);
  assert.deepEqual(readdirSync(outside),['sentinel']);assert.equal(readFileSync(path.join(outside,'sentinel'),'utf8'),'unchanged');
}));
test('unsafe existing feature directory symlinks blocked',()=>temp(d=>{
  const project=path.join(d,'project'), outside=path.join(d,'outside');
  assert.equal(run('init','--target',project).status,0);mkdirSync(path.join(project,'specs'));mkdirSync(outside);
  writeFileSync(path.join(outside,'sentinel'),'unchanged');
  symlinkSync(outside,path.join(project,'specs/form'),process.platform==='win32'?'junction':'dir');
  const x=run('feature','new','form','--target',project);assert.equal(x.status,1);assert.match(x.stderr,/Destino inseguro \(symlink\)/);
  assert.deepEqual(readdirSync(outside),['sentinel']);assert.equal(readFileSync(path.join(outside,'sentinel'),'utf8'),'unchanged');
}));
test('doctor identifies incomplete installation',()=>temp(d=>{
  const x=run('doctor','--target',d); assert.equal(x.status,1);assert.match(x.stderr,/FALTA/);
}));
test('reject unsupported arguments, and feature before init',()=>temp(d=>{
  assert.equal(run('init','--unexpected').status,1);
  assert.equal(run('feature','new','form','--target',d).status,1);
  assert.equal(run('feature','wat','form','--target',d).status,1);
  assert.equal(run('init','--target').status,1);
}));
test('every local link inside skill resolves to source',()=>{
  const skillpath=path.join(root,'skills/specspire/SKILL.md'); const content=readFileSync(skillpath,'utf8');
  const links=[...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(m=>m[1]);
  for(const link of links.filter(x=>!/^https?:\/\//.test(x))) assert.ok(existsSync(path.resolve(path.dirname(skillpath),link)),link);
});
test('guided readme is compact, all phases represented',()=>{
  const guide=readFileSync(path.join(root,'templates/README-DESARROLLO.md'),'utf8');
  assert.ok(guide.split('\n').length<=65);
  for(const n of ['Preparar','Especificar','Planificar','Organizar','Implementar','Verificar','Entregar']) assert.ok(guide.includes(n),n);
});
test('Spec Kit official installation blocks parallel feature documents',()=>temp(d=>{
  run('init','--target',d);mkdirSync(path.join(d,'.specify'));
  const x=run('feature','new','form','--target',d);
  assert.equal(x.status,1);assert.match(x.stderr,/Spec Kit oficial/);
}));
test('feature dry run does not create spec',()=>temp(d=>{
  run('init','--target',d);
  assert.equal(run('feature','new','form','--target',d,'--dry-run').status,0);
  assert.equal(existsSync(path.join(d,'specs')),false);
}));

test('stack recommendation policy requires official-source checks and transparent offline fallback',()=>{
  const phase=readFileSync(path.join(root,'skills/specspire/references/02-plan-design.md'),'utf8');
  const plan=readFileSync(path.join(root,'templates/feature/plan.md'),'utf8');
  for(const term of ['documentación oficial','compatibilidad','Sin acceso a Internet','alternativa','no crees otro documento']) assert.ok(phase.toLowerCase().includes(term.toLowerCase()),term);
  for(const term of ['Selección de stack','fecha de revisión','No necesitamos']) assert.ok(plan.includes(term),term);
});


test('next guides junior to correct document without claiming code completion',()=>temp(d=>{
  run('init','--target',d);
  assert.match(run('next','--target',d).stdout,/Fase 0/);
  const project=path.join(d,'PROJECT.md');
  writeFileSync(project,readFileSync(project,'utf8').replace('_Nombre_','Mi Proyecto').replace('_Qué problema resuelve_','Permitir registrar contacto'));
  assert.match(run('next','--target',d).stdout,/Fase 1/);
  run('feature','new','formulario','--target',d);
  assert.match(run('next','formulario','--target',d).stdout,/Completa spec.md/);
  fill(d,'formulario','spec.md','TODO_SPEC');
  assert.match(run('next','formulario','--target',d).stdout,/feature plan/);
}));

test('single public skill, quality standards and evidence-first gates wired',()=>{
  const skill=readFileSync(path.join(root,'skills/specspire/SKILL.md'),'utf8');
  for(const needle of ['08-code-quality.md','09-debugging.md','10-security-operations.md','11-agent-collaboration.md','12-data-privacy-compliance.md','RED','GREEN','REFACTOR','evidencia','UI']) assert.ok(skill.includes(needle),needle);
  assert.equal(readdirSync(path.join(root,'skills')).length,1);
});

// Known pre-bilingual router fixture; offline and independent of Git history.
const legacyRouter = "---\nname: specspire\ndescription: Gu\u00eda \u00fanica y progresiva para desarrollar, mantener y entregar software de forma profesional. Orquesta definici\u00f3n de requisitos, especificaci\u00f3n, stack actualizado, dise\u00f1o UI/UX, planificaci\u00f3n, TDD, depuraci\u00f3n, revisi\u00f3n independiente, pruebas, seguridad, CI y entrega; adapta el rigor a la complejidad real.\n---\n\n# Specspire \u2014 una Skill, metodolog\u00eda completa\n\n**Misi\u00f3n:** convertir una petici\u00f3n en software verificable, comprensible y mantenible. No eres una f\u00e1brica de archivos: act\u00faas como l\u00edder t\u00e9cnico que ense\u00f1a una acci\u00f3n a la vez. Esta Skill es **independiente** de Spec Kit, Superpowers y Matt Pocock Skills; adopta principios generales, no copia sus Skills.\n\n## Inicio \u2014 siempre\n\n1. Lee el c\u00f3digo y los documentos existentes: `AGENTS.md`, `PROJECT.md` y `README-DESARROLLO.md` cuando est\u00e9n presentes. **Si faltan** (instalaci\u00f3n solo Skill), no crees archivos autom\u00e1ticamente ni asumas que existe la CLI: establece objetivo, restricciones y siguiente acci\u00f3n en la conversaci\u00f3n; propone guardar el contexto m\u00ednimo solo cuando el desarrollador lo solicite o autorice. Respeta las reglas existentes y la ubicaci\u00f3n real de esta Skill. Si hay r\u00fabrica o requisitos adjuntos, son la fuente prioritaria. Si hay `.specify/`, usa los documentos del Spec Kit oficial en vez de duplicarlos.\n2. Identifica intenci\u00f3n: **nuevo producto, nueva funcionalidad, bug, refactor o entrega**. No obligues a un bug a recorrer todas las fases.\n3. Ajusta el rigor: **ligero** (formulario o tarea), **est\u00e1ndar** (app real) o **cr\u00edtico** (producci\u00f3n sensible/m\u00faltiples servicios). Las comprobaciones se adaptan; **la verdad de la evidencia no se reduce**.\n4. Selecciona la fase y **lee solamente la referencia asociada**. Si se necesita una disciplina transversal, lee su anexo espec\u00edfico.\n5. Responde con cuatro l\u00edneas breves: `Fase` \u00b7 `Qu\u00e9 haremos ahora` \u00b7 `C\u00f3mo se comprueba` \u00b7 `Bloqueo real (si existe)`. No des veinte tareas ni intentes terminar el producto en una sola respuesta.\n\n## Enrutamiento\n\n| Situaci\u00f3n | Documento que debes consultar | Salida m\u00ednima |\n|---|---|---|\n| Preparaci\u00f3n / principios | [00-prepare](references/00-prepare.md) | `PROJECT.md` si existe; si no, contexto en la conversaci\u00f3n |\n| Qu\u00e9 construir / dudas | [01-specify](references/01-specify.md) | `spec.md` con criterios medibles |\n| Stack / arquitectura | [02-plan-design](references/02-plan-design.md) | `plan.md` |\n| UI: dise\u00f1o, implementaci\u00f3n y verificaci\u00f3n | [UI](references/02-ui-quality.md) + [responsive multiplataforma](references/02-responsive-cross-platform.md), obligatorios **solo si hay interfaz**; no cargar para backend o CLI sin UI | Direcci\u00f3n visual y matriz de compatibilidad con evidencia |\n| Desglose y dependencias | [03-tasks](references/03-tasks.md) | `tasks.md` por valor entregable |\n| Implementaci\u00f3n / mejoras | [04-implement](references/04-implement.md) + [est\u00e1ndares](references/08-code-quality.md) | comportamiento + pruebas |\n| Bug / bloqueo t\u00e9cnico | [09-debugging](references/09-debugging.md) | reproducci\u00f3n \u2192 causa \u2192 regresi\u00f3n |\n| Privacidad, datos personales y legal | [privacidad y datos](references/12-data-privacy-compliance.md), obligatorio **solo si trata datos personales, cuentas o rastreadores**; no cargar sin datos de personas | Clasificaci\u00f3n de datos, base de licitud, retenci\u00f3n y avisos contextuales |\n| Verificaci\u00f3n / refactor / seguridad | [05-converge](references/05-converge.md) + [seguridad](references/10-security-operations.md) si procede | `review.md` + evidencias |\n| Varios agentes independientes | [11-agent-collaboration](references/11-agent-collaboration.md) solo si merece la pena | trabajo aislado y revisado |\n| Entrega | [06-deliver](references/06-deliver.md) | README real, PR y demo verificable |\n| Cambios posteriores | [07-maintain](references/07-maintain.md) | actualizar spec afectado + regresi\u00f3n |\n\n## Gates obligatorios\n\n1. **Entendimiento:** objetivo, alcance fuera de proyecto y aceptaci\u00f3n observables. No inventar requisitos; preguntar solo lo imprescindible. Distinguir decisiones o riesgos pendientes de bloqueos reales que efectivamente impiden avanzar.\n2. **Dise\u00f1o:** elegir el stack m\u00e1s simple que cumpla restricciones, **verificando fuentes oficiales y versiones cuando hay navegaci\u00f3n**; sin navegaci\u00f3n, declarar versiones no verificadas. Para UI, direcci\u00f3n visual aprobable antes de picar componentes. Si hay tratamiento de datos personales, aplicar privacidad desde el dise\u00f1o (minimizaci\u00f3n, base de licitud demostrable y retenci\u00f3n).\n3. **Plan de trabajo:** cada tarea liga requisito, comportamiento y evidencia. El primer corte entrega valor extremo a extremo, sin infraestructura especulativa.\n4. **Construcci\u00f3n:** para comportamiento automatizable, **RED \u2192 GREEN \u2192 REFACTOR**; rojo por causa correcta, verde real, refactor con suite verde. Tests de integraci\u00f3n para fronteras, E2E para recorridos cr\u00edticos. No testear p\u00edxeles con unit tests.\n5. **Revisi\u00f3n:** comparar **dos ejes independientes**: (A) fidelidad al spec y (B) calidad/simplicidad del diff. Buscar deuda y complejidad accidental, no refactorizar por moda.\n6. **Evidencia:** nunca afirmar tests, builds, inspecciones visuales o seguridad sin comandos/salidas reales. `doctor` y `status` comprueban documentaci\u00f3n, no calidad. Si falla, crear tarea correctiva y repetir.\n   Para UI, ejecutar el gate responsive de la matriz acordada; no declarar completada con fallos conocidos ni controles obligatorios BLOCKED/NOT VERIFIED. Un viewport emulado no demuestra safe areas f\u00edsicas o teclado real.\n   Para privacidad, si se tratan datos personales, registrar controles P01\u2013P06 evaluados individualmente en `review.md`. Una decisi\u00f3n de dise\u00f1o no constituye evidencia: controles dise\u00f1ados pero no verificados deben registrarse como NOT VERIFIED (o BLOCKED ante un bloqueo real documentado); solo declarar PASS con evidencia t\u00e9cnica de ejecuci\u00f3n, pruebas o inspecci\u00f3n real (sin asumir certificaci\u00f3n jur\u00eddica autom\u00e1tica). N/A exige justificaci\u00f3n documentada por control y no se infiere por mera ausencia de almacenamiento o red (la ausencia de telemetr\u00eda no descarta encargados). La falta de cookies no demuestra ausencia de tratamiento de datos personales. La ausencia de justificaci\u00f3n en tratamientos reales impide cerrar el gate.\n7. **Entrega:** otra persona puede instalar, ejecutar, entender y comprobar el producto; documentar pendientes de manera honesta.\n\n## Reglas innegociables\n\n- **Sin sobreingenier\u00eda:** no a\u00f1adir servidores, microservicios, contenedores, ORM, estado global ni patrones por prestigio. Una app simple merece una soluci\u00f3n simple.\n- **Seguridad:** no leer/escribir secretos a documentaci\u00f3n p\u00fablica, validar entrada en el l\u00edmite correcto, usar dependencias mantenidas, limitar permisos y nunca fabricar resultados.\n- **Identidad visual:** investigar referencias adecuadas, proponer dos direcciones distinguibles, construir una UI accesible, mobile-first, original y con estados completos. No copiar marcas.\n- **Control humano:** no hacer push, merge, despliegues, migraciones destructivas ni introducir costes sin permiso. Si hay agentes paralelos, aislar por worktrees y revisar su integraci\u00f3n.\n- **Proyectos existentes:** respetar arquitectura, convenciones, tests y especificaciones actuales. Evitar duplicar flujos oficiales de Spec Kit.\n- **Acciones reales:** cuando no puedas ejecutar herramientas, indicar qu\u00e9 falta por verificar y c\u00f3mo comprobarlo; nunca simular que se ha ejecutado.\n\n**Fuentes metodol\u00f3gicas consultadas:** [GitHub Spec Kit](https://github.com/github/spec-kit), [Matt Pocock Skills](https://github.com/mattpocock/skills), [Superpowers](https://github.com/obra/superpowers). Esta implementaci\u00f3n es original y est\u00e1 inspirada en pr\u00e1cticas, no redistribuye sus archivos.\n";

const enNames = names.filter(n => n.includes('/references/')).map(n => n.replace('/references/', '/references/en/'));
const allNames = [...names, ...enNames];
const routerPath = d => path.join(d, '.agents/skills/specspire/SKILL.md');
function legacyInstall(d) {
  for (const n of names) {
    const src = n.startsWith('.agents/') ? path.join(root, n.slice('.agents/'.length)) : path.join(root, 'templates', n);
    mkdirSync(path.dirname(path.join(d, n)), { recursive: true });
    writeFileSync(path.join(d, n), n.endsWith('/SKILL.md') ? legacyRouter : readFileSync(src));
  }
}
test('bilingual init installs exactly 34 files with intact EN and is fully idempotent', () => temp(d => {
  const first = run('init', '--target', d); assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /34 archivos/);
  assert.equal(readdirSync(d, { recursive: true, withFileTypes: true }).filter(e => e.isFile()).length, 34);
  for (const n of enNames) assert.deepEqual(readFileSync(path.join(d,n)), readFileSync(path.join(root,n.slice('.agents/'.length))));
  for (const n of ['AGENTS.md','PROJECT.md','README-DESARROLLO.md']) writeFileSync(path.join(d,n), `Custom ${n}\n`);
  const before = allNames.map(n => readFileSync(path.join(d,n)));
  const second = run('init','--target',d); assert.equal(second.status,0,second.stderr); assert.match(second.stdout,/0 archivos/);
  allNames.forEach((n,i) => assert.deepEqual(readFileSync(path.join(d,n)),before[i]));
  assert.equal(run('doctor','--target',d).status,0);
  rmSync(path.join(d,enNames[0])); const missing=run('doctor','--target',d); assert.equal(missing.status,1); assert.match(missing.stderr,/FALTA.*references\/en/);
}));
test('legacy and migrated legacy require controlled router update without overwrites', () => temp(d => {
  legacyInstall(d);
  const before=names.map(n=>readFileSync(path.join(d,n)));
  let x=run('doctor','--target',d); assert.equal(x.status,2,x.stderr); assert.match(x.stderr,/ACTUALIZACION.*heredada/); assert.doesNotMatch(x.stderr,/CORRUPTO/); assert.doesNotMatch(x.stdout,/PASS/);
  x=run('init','--target',d); assert.equal(x.status,0,x.stderr); assert.match(x.stdout,/15 archivos/); assert.match(x.stdout,/actualizacion manual/i);
  names.forEach((n,i)=>assert.deepEqual(readFileSync(path.join(d,n)),before[i]));
  x=run('doctor','--target',d); assert.equal(x.status,2,x.stderr); assert.match(x.stderr,/parcialmente migrada/); assert.doesNotMatch(x.stderr,/CORRUPTO/);
  writeFileSync(routerPath(d),legacyRouter.replace('name: specspire','name: altered'));
  x=run('doctor','--target',d); assert.equal(x.status,1); assert.match(x.stderr,/CORRUPTO/);
}));
for (const mode of ['wrong-en','no-en','empty-body']) test(`router rejects ${mode} instead of claiming legacy`,()=>temp(d=>{
  assert.equal(run('init','--target',d).status,0);
  let text=readFileSync(routerPath(d),'utf8');
  if(mode==='wrong-en') text=text.replace('references/en/00-prepare.md','references/en/wrong.md');
  if(mode==='no-en') text=text.replaceAll('references/en/','wrong/');
  if(mode==='empty-body') text='---\nname: specspire\ndescription: valid\n---\n';
  writeFileSync(routerPath(d),text); const x=run('doctor','--target',d); assert.equal(x.status,1); assert.match(x.stderr,/CORRUPTO/);
}));
for (const mode of ['missing','empty','extra','wrong-router']) test(`source rejects EN ${mode}`,()=>temp(d=>{
  for(const dir of ['bin','skills','templates']) cpSync(path.join(root,dir),path.join(d,dir),{recursive:true});
  writeFileSync(path.join(d,'package.json'),readFileSync(path.join(root,'package.json')));
  const ref=path.join(d,'skills/specspire/references/en/00-prepare.md');
  if(mode==='missing') rmSync(ref);
  if(mode==='empty') writeFileSync(ref,' ');
  if(mode==='extra') writeFileSync(path.join(path.dirname(ref),'extra.md'),'unexpected');
  if(mode==='wrong-router') { const p=path.join(d,'skills/specspire/SKILL.md'); writeFileSync(p,readFileSync(p,'utf8').replace('references/en/00-prepare.md','references/en/wrong.md')); }
  const x=spawnSync(process.execPath,[path.join(d,'bin/specspire.mjs'),'validate-source'],{encoding:'utf8'}); assert.equal(x.status,1,x.stdout);
}));

for (const mode of ['crlf','missing-es','empty-en','partial-en','altered-router']) test(`legacy classification ${mode}`,()=>temp(d=>{
  legacyInstall(d);
  if(mode==='crlf') writeFileSync(routerPath(d),legacyRouter.replaceAll('\n','\r\n'));
  if(mode==='missing-es') rmSync(path.join(d,names[4]));
  if(mode==='altered-router') writeFileSync(routerPath(d),legacyRouter+'\nAltered instructions.');
  if(mode==='empty-en'||mode==='partial-en') {
    mkdirSync(path.dirname(path.join(d,enNames[0])),{recursive:true});
    writeFileSync(path.join(d,enNames[0]),mode==='empty-en'?'':'One migrated reference');
  }
  const x=run('doctor','--target',d);
  assert.equal(x.status,mode==='crlf'?2:1,x.stderr); assert.doesNotMatch(x.stdout,/PASS/);
  if(mode!=='crlf') assert.doesNotMatch(x.stderr,/ACTUALIZACION:/);
}));
