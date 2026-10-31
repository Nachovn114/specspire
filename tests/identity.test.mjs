import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
test('public naming matches package, CLI and Skill', () => {
  const pkg=JSON.parse(readFileSync(path.join(root,'package.json'),'utf8'));
  assert.equal(pkg.name,'specspire');
  assert.equal(pkg.version,'0.9.0-beta.1');
  assert.equal(pkg.bin.specspire,'./bin/specspire.mjs');
  assert.ok(existsSync(path.join(root,'skills/specspire/SKILL.md')));
  assert.match(readFileSync(path.join(root,'skills/specspire/SKILL.md'),'utf8'), /^---\r?\nname: specspire\r?\n/);
});
test('README supports international discovery and local Spanish guidance',()=>{
  const en=readFileSync(path.join(root,'README.md'),'utf8');
  const es=readFileSync(path.join(root,'README.es.md'),'utf8');
  assert.ok(en.includes('README.es.md'));
  assert.ok(en.includes('docs/QUICKSTART.md'));
  assert.ok(es.includes('docs/WORKFLOW.md'));
});
