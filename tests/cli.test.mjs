import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync, readdirSync } from 'node:fs';
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
  ...['00-prepare','01-specify','02-plan-design','02-ui-quality','02-responsive-cross-platform','03-tasks','04-implement','05-converge','06-deliver','07-maintain','08-code-quality','09-debugging','10-security-operations','11-agent-collaboration'].map(n=>`.agents/skills/specspire/references/${n}.md`)
];
const fill = (d, slug, file, token) => {
  const p = path.join(d, 'specs', slug, file);
  writeFileSync(p, readFileSync(p, 'utf8').replaceAll(token, 'Contenido revisado y verificado por el usuario'));
};

test('source validation: one skill, fourteen references and five feature templates',()=>{
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
  for(const needle of ['08-code-quality.md','09-debugging.md','10-security-operations.md','11-agent-collaboration.md','RED','GREEN','REFACTOR','evidencia','UI']) assert.ok(skill.includes(needle),needle);
  assert.equal(readdirSync(path.join(root,'skills')).length,1);
});
