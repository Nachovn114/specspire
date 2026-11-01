import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const markdownFiles = dir => readdirSync(path.join(root, dir), {withFileTypes:true}).flatMap(entry => {
  const name = path.join(dir, entry.name);
  return entry.isDirectory() ? markdownFiles(name) : name.endsWith('.md') ? [name] : [];
});
const files = ['README.md','README.es.md','SECURITY.md','CONTRIBUTING.md','CONTRIBUTING.es.md','CHANGELOG.md',
  ...['docs','skills','templates'].flatMap(markdownFiles)];
test('all referenced local Markdown documents exist',()=>{
  for(const f of files){
    const full=path.join(root,f);
    const content=readFileSync(full,'utf8');
    for(const [,target] of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      assert.ok(existsSync(path.resolve(path.dirname(full),decodeURIComponent(target.split('#')[0]))),`${f} => ${target}`)
    }
  }
});
test('main README offers quickstart, workflow, design, quality and CLI',()=>{
  const md=readFileSync(path.join(root,'README.md'),'utf8');
  assert.ok(md.split('\n').length<120,'README should be a short landing page');
  for(const p of ['docs/QUICKSTART.md','docs/WORKFLOW.md','docs/DESIGN.md','docs/QUALITY.md','docs/CLI.md']) assert.ok(md.includes(p),p);
});
test('single public skill name matches CLI and package',()=>{
  const pkg=JSON.parse(readFileSync(path.join(root,'package.json'),'utf8'));
  assert.equal(pkg.name,'specspire');
  assert.ok(pkg.bin.specspire);
  const md=readFileSync(path.join(root,'skills/specspire/SKILL.md'),'utf8');
  assert.match(md,/^---\r?\nname: specspire\r?\n/m);
});

test('skill-only onboarding does not presume CLI or project documents', () => {
  const skill = readFileSync(path.join(root,'skills/specspire/SKILL.md'),'utf8');
  for (const term of ['Si faltan', 'no crees', 'CLI', 'conversación']) assert.ok(skill.includes(term), term);
  for (const file of ['README.md','README.es.md']) assert.ok(readFileSync(path.join(root,file),'utf8').includes('Skill-only'));
});

test('responsive standard is wired through UI lifecycle and evidence templates', () => {
  const name='02-responsive-cross-platform.md';
  for(const file of ['skills/specspire/SKILL.md', ...['02-plan-design','02-ui-quality','04-implement','05-converge'].map(x=>`skills/specspire/references/${x}.md`)]) {
    assert.ok(readFileSync(path.join(root,file),'utf8').includes(`](${file.endsWith('SKILL.md')?'references/':''}${name})`),file);
  }
  const standard=readFileSync(path.join(root,'skills/specspire/references',name),'utf8');
  for(const term of ['backend o CLI sin UI','viewport-fit=cover','safe-area-inset','svh','dvh','WindowInsets','safeAreaLayoutGuide','WinUI','320','1920','R01','R06','BLOCKED','NOT VERIFIED','2026-10-31']) assert.ok(standard.includes(term),term);
  for(const host of ['developer.apple.com','developer.android.com','learn.microsoft.com','www.w3.org','developer.mozilla.org']) assert.ok(standard.includes(host),host);
  for(const file of ['design.md','review.md']) assert.ok(readFileSync(path.join(root,'templates/feature',file),'utf8').includes('R01–R06'),file);
  assert.equal(readdirSync(path.join(root,'skills')).length,1);
});
