import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'bin/specspire.mjs');
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
const temp = fn => {
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'specspire-hardening-')));
  try { return fn(dir); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
};
const ok = x => assert.equal(x.status, 0, x.stderr);
const rejected = x => { assert.equal(x.status, 1, x.stdout); assert.match(x.stderr, /Destino inseguro \(symlink\)/); };
const linkType = process.platform === 'win32' ? 'junction' : 'dir';

for (const kind of ['root', 'ancestor', 'final']) test(`directory link at ${kind} is rejected without external changes`, () => temp(d => {
  const outside = path.join(d, 'outside'), project = path.join(d, 'project');
  fs.mkdirSync(outside);fs.mkdirSync(project);fs.writeFileSync(path.join(outside, 'sentinel'), 'unchanged');
  const link = kind === 'final' ? path.join(project, 'PROJECT.md') : path.join(d, 'linked');
  fs.symlinkSync(outside, link, linkType);
  rejected(run('init', '--target', kind === 'final' ? project : kind === 'root' ? link : path.join(link, 'nested')));
  assert.deepEqual(fs.readdirSync(outside), ['sentinel']);
  assert.equal(fs.readFileSync(path.join(outside, 'sentinel'), 'utf8'), 'unchanged');
}));

for (const kind of ['directory', 'file', 'dangling-file']) test(`native symlink ${kind}: security rejection`, t => temp(d => {
  const project = path.join(d, 'project'), outside = path.join(d, 'outside');
  fs.mkdirSync(project);fs.mkdirSync(outside);fs.writeFileSync(path.join(outside, 'sentinel'), 'unchanged');
  const target = kind === 'directory' ? outside : path.join(outside, kind === 'file' ? 'sentinel' : 'absent');
  const link = path.join(project, kind === 'directory' ? '.agents' : 'PROJECT.md');
  try { fs.symlinkSync(target, link, kind === 'directory' ? 'dir' : 'file'); }
  catch (err) {
    if (process.platform !== 'win32' || !['EPERM', 'EACCES', 'ENOSYS'].includes(err.code)) throw err;
    const reason = `BLOCKED: native ${kind} symlink fixture (${err.code})`;
    if (process.env.CI || process.env.SPECSPIRE_REQUIRE_NATIVE_LINKS === '1') assert.fail(reason);
    t.skip(reason);return;
  }
  rejected(run('init', '--target', project));
  assert.deepEqual(fs.readdirSync(outside), ['sentinel']);
  assert.equal(fs.readFileSync(path.join(outside, 'sentinel'), 'utf8'), 'unchanged');
}));

for (const kind of ['empty', 'directory', 'metadata', 'reference', 'link']) test(`doctor rejects ${kind} installation corruption`, () => temp(d => {
  const project = path.join(d, 'project');ok(run('init', '--target', project));
  const file = path.join(project, '.agents/skills/specspire/SKILL.md');
  if (kind === 'empty') fs.writeFileSync(file, '');
  if (kind === 'metadata') fs.writeFileSync(file, 'not a skill');
  if (kind === 'reference') fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('references/00-prepare.md', 'references/missing.md'));
  if (kind === 'directory' || kind === 'link') {
    fs.unlinkSync(file);
    if (kind === 'directory') fs.mkdirSync(file);
    else { const outside = path.join(d, 'outside');fs.mkdirSync(outside);fs.symlinkSync(outside, file, linkType); }
  }
  const x = run('doctor', '--target', project);assert.equal(x.status, 1);assert.match(x.stderr, /CORRUPTO/);assert.doesNotMatch(x.stdout, /PASS/);
}));

test('doctor accepts personalized guidance and reports missing references', () => temp(d => {
  fs.writeFileSync(path.join(d, 'AGENTS.md'), 'Use our existing project conventions.');
  ok(run('init', '--target', d));ok(run('doctor', '--target', d));
  assert.equal(fs.readFileSync(path.join(d, 'AGENTS.md'), 'utf8'), 'Use our existing project conventions.');
  fs.unlinkSync(path.join(d, '.agents/skills/specspire/references/00-prepare.md'));
  const x = run('doctor', '--target', d);assert.equal(x.status, 1);assert.match(x.stderr, /incompleta/);
}));

for (const mode of ['LF', 'CRLF', 'wrong-name', 'no-name', 'no-description', 'blank-description']) test(`source frontmatter ${mode}`, () => temp(d => {
  for (const dir of ['bin', 'skills', 'templates']) fs.cpSync(path.join(root, dir), path.join(d, dir), { recursive: true });
  fs.copyFileSync(path.join(root, 'package.json'), path.join(d, 'package.json'));
  const file = path.join(d, 'skills/specspire/SKILL.md');
  let content = fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
  if (mode === 'CRLF') content = content.replaceAll('\n', '\r\n');
  if (mode === 'wrong-name') content = content.replace('name: specspire', 'name: other');
  if (mode === 'no-name') content = content.replace('name: specspire\n', '');
  if (mode === 'no-description') content = content.replace(/^description:.*\n/m, '');
  if (mode === 'blank-description') content = content.replace(/^description:.*$/m, 'description:   ');
  fs.writeFileSync(file, content);
  const x = spawnSync(process.execPath, [path.join(d, 'bin/specspire.mjs'), 'validate-source'], { encoding: 'utf8' });
  assert.equal(x.status, ['LF', 'CRLF'].includes(mode) ? 0 : 1, x.stderr);
  if (x.status) assert.match(x.stderr, /frontmatter/);
}));

test('next and tasks respect existing pending UI design; absent design remains optional', () => temp(d => {
  ok(run('init', '--target', d));fs.writeFileSync(path.join(d, 'PROJECT.md'), 'Project context defined.');
  ok(run('feature', 'new', 'form', '--target', d));
  const folder = path.join(d, 'specs/form');fs.writeFileSync(path.join(folder, 'spec.md'), 'RF-01: show form.');
  ok(run('feature', 'plan', 'form', '--target', d));fs.writeFileSync(path.join(folder, 'plan.md'), 'Use current stack.');
  assert.match(run('next', 'form', '--target', d).stdout, /feature tasks/);
  ok(run('feature', 'design', 'form', '--target', d));
  assert.match(run('next', 'form', '--target', d).stdout, /Completa design.md/);
  assert.equal(run('feature', 'tasks', 'form', '--target', d).status, 1);
  fs.writeFileSync(path.join(folder, 'design.md'), 'Design approved.');
  assert.match(run('next', 'form', '--target', d).stdout, /feature tasks/);ok(run('feature', 'tasks', 'form', '--target', d));
}));

test('inherited stage names return usage errors', () => temp(d => {
  ok(run('init', '--target', d));
  for (const stage of ['constructor', 'toString', '__proto__']) {
    const x = run('feature', stage, 'form', '--target', d);assert.equal(x.status, 1);assert.match(x.stderr, /Uso: feature/);
  }
  assert.equal(fs.existsSync(path.join(d, 'specs')), false);
  assert.ok(run('--help').stdout.includes(JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).version));
}));

for (const operation of ['copyFileSync', 'writeFileSync']) test(`exclusive ${operation} preserves a concurrent creator`, () => temp(d => {
  const project = path.join(d, 'project');
  if (operation === 'writeFileSync') ok(run('init', '--target', project));
  const dest = operation === 'copyFileSync' ? path.join(project, 'README-DESARROLLO.md') : path.join(project, 'specs/form/spec.md');
  const preload = path.join(d, 'race.cjs');
  fs.writeFileSync(preload, `const fs = require('node:fs'); const { syncBuiltinESMExports } = require('node:module');
const original = fs.${operation}; const write = fs.writeFileSync;
fs.${operation} = (...args) => {
  const dest = ${operation === 'copyFileSync' ? 'args[1]' : 'args[0]'};
  if (dest === ${JSON.stringify(dest)}) write(dest, 'concurrent creator', { flag: 'wx' });
  return original(...args);
}; syncBuiltinESMExports();`);
  const args = operation === 'copyFileSync' ? ['init'] : ['feature', 'new', 'form'];
  const x = spawnSync(process.execPath, ['--require', preload, cli, ...args, '--target', project], { encoding: 'utf8' });
  ok(x);assert.match(x.stdout, /EXISTE/);assert.equal(fs.readFileSync(dest, 'utf8'), 'concurrent creator');
}));

for (const part of ['references','references/en']) test(`init and doctor reject linked ${part}`,()=>temp(d=>{
  const project=path.join(d,'project'), outside=path.join(d,'outside');
  ok(run('init','--target',project)); fs.mkdirSync(outside); fs.writeFileSync(path.join(outside,'sentinel'),'unchanged');
  const linked=path.join(project,'.agents/skills/specspire',part); fs.rmSync(linked,{recursive:true}); fs.symlinkSync(outside,linked,linkType);
  rejected(run('init','--target',project));
  const x=run('doctor','--target',project); assert.equal(x.status,1); assert.match(x.stderr,/symlink/);
  assert.deepEqual(fs.readdirSync(outside),['sentinel']); assert.equal(fs.readFileSync(path.join(outside,'sentinel'),'utf8'),'unchanged');
}));

test('exclusive EN copy preserves a concurrent reference creator',()=>temp(d=>{
  const project=path.join(d,'project');
  const dest=path.join(project,'.agents/skills/specspire/references/en/00-prepare.md');
  const preload=path.join(d,'en-race.cjs');
  fs.writeFileSync(preload,`const fs=require('node:fs'); const {syncBuiltinESMExports}=require('node:module');
const copy=fs.copyFileSync;
fs.copyFileSync=(src,out,flags)=>{ if(out===${JSON.stringify(dest)}) fs.writeFileSync(out,'concurrent EN',{flag:'wx'}); return copy(src,out,flags); }; syncBuiltinESMExports();`);
  const x=spawnSync(process.execPath,['--require',preload,cli,'init','--target',project],{encoding:'utf8'});
  ok(x);assert.match(x.stdout,/EXISTE.*references\/en\/00-prepare/);assert.equal(fs.readFileSync(dest,'utf8'),'concurrent EN');
}));
