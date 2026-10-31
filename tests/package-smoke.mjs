import assert from 'node:assert/strict';
import { mkdtempSync, realpathSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temp = realpathSync(mkdtempSync(join(tmpdir(), 'specspire-package-')));
console.log(`Package smoke artifacts: ${temp}`);
const npmCli = process.env.npm_execpath;
assert.ok(npmCli && existsSync(npmCli), 'Run through npm run test:package (npm.cmd on PowerShell)');
const cache = join(temp, 'cache');
function npm(args, cwd) {
  const x = spawnSync(process.execPath, [npmCli, ...args, '--cache', cache], {
    cwd, encoding: 'utf8', env: { ...process.env, npm_config_update_notifier: 'false' }
  });
  assert.equal(x.status, 0, `${args.join(' ')}\n${x.stderr}\n${x.stdout}`);
  return x.stdout;
}
const packed = JSON.parse(npm(['pack', '--json', '--ignore-scripts', '--pack-destination', temp], root))[0];
const tarball = join(temp, packed.filename);
// Distribution boundary: real tarball contents, not an inference from package.json "files".
const packedPaths = packed.files.map(f => f.path.replace(/\\/g, '/'));
assert.deepEqual(packedPaths.filter(p => p.startsWith('docs/audits/')), [], 'Historical audit reports must stay out of the npm package');
const refs = packedPaths.filter(p => /^skills\/specspire\/references\/[^/]+\.md$/.test(p));
assert.equal(refs.length, 15, `Expected 15 Skill references, packed ${refs.length}`);
for (const required of ['skills/specspire/SKILL.md', 'bin/specspire.mjs', 'package.json', 'README.md', 'README.es.md', 'LICENSE',
  'templates/AGENTS.md', 'templates/PROJECT.md', 'templates/README-DESARROLLO.md',
  ...['spec', 'plan', 'design', 'tasks', 'review'].map(n => `templates/feature/${n}.md`),
  ...['QUICKSTART', 'CLI', 'WORKFLOW', 'QUALITY', 'DESIGN', 'ARCHITECTURE', 'REFERENCIAS', 'PUBLISH'].map(n => `docs/${n}.md`)])
  assert.ok(packedPaths.includes(required), `Missing from package: ${required}`);
const install = join(temp, 'installation');mkdirSync(install);
writeFileSync(join(install, 'package.json'), JSON.stringify({name:'specspire-smoke',version:'1.0.0',private:true}));
for (let i = 0; i < 2; i++) npm(['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--no-package-lock', tarball], install);
const binary = join(install, 'node_modules/.bin', process.platform === 'win32' ? 'specspire.cmd' : 'specspire');
assert.ok(existsSync(binary));
const installedPkg = join(install, 'node_modules/specspire');
for (const doc of packedPaths.filter(p => p.endsWith('.md'))) {
  for (const [, target] of readFileSync(join(installedPkg, doc), 'utf8').matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    assert.ok(existsSync(join(installedPkg, dirname(doc), decodeURIComponent(target.split('#')[0]))), `${doc} links to a file missing from the package: ${target}`);
  }
}
const project = join(temp, 'project');mkdirSync(project);
writeFileSync(join(project, 'AGENTS.md'), 'Existing project rules: preserve me.');
function cli(args) {
  // cmd.exe only dispatches a fixed npm-generated shim; no user arguments enter shell text.
  const x = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${binary}" ${args.join(' ')}"`], {cwd:project,encoding:'utf8',windowsVerbatimArguments:true})
    : spawnSync(binary, args, {cwd:project,encoding:'utf8'});
  assert.equal(x.status, 0, `${args.join(' ')}\n${x.stderr}\n${x.stdout}`);return x.stdout;
}
assert.match(cli(['--help']), /Specspire/);
assert.match(cli(['validate-source']), /PASS/);
cli(['init']);cli(['init']);assert.match(cli(['doctor']), /PASS/);
assert.match(cli(['next']), /Fase 0/);
cli(['feature','new','smoke']);
const spec = join(project,'specs/smoke/spec.md');writeFileSync(spec,'Preserved feature content.');
cli(['feature','new','smoke']);assert.equal(readFileSync(spec,'utf8'),'Preserved feature content.');
assert.equal(readFileSync(join(project,'AGENTS.md'),'utf8'),'Existing project rules: preserve me.');
assert.equal(Object.keys(JSON.parse(readFileSync(join(install,'node_modules/specspire/package.json'),'utf8')).dependencies || {}).length,0);
console.log(`PASS: packed ${packed.files.length} files (no docs/audits, Skill + 15 references, templates and linked docs present); relative Markdown links resolve in the installed package; installed tarball twice; installed bin, init twice, doctor, next, feature new and preservation verified.`);
