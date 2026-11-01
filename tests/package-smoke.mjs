import assert from 'node:assert/strict';
import { mkdtempSync, realpathSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, basename, relative, sep } from 'node:path';
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
const enRefs = packedPaths.filter(p => /^skills\/specspire\/references\/en\/[^/]+\.md$/.test(p));
assert.equal(refs.length, 15, `Expected 15 Spanish references, packed ${refs.length}`);
assert.equal(enRefs.length, 15, `Expected 15 English references, packed ${enRefs.length}`);
assert.deepEqual(enRefs.map(p => basename(p)).sort(), refs.map(p => basename(p)).sort(), 'ES/EN basenames must match exactly');
assert.deepEqual([...new Set(packedPaths.filter(p => p.startsWith('skills/')).map(p => p.split('/')[1]))], ['specspire']);
assert.deepEqual(packedPaths.filter(p => p.endsWith('/SKILL.md')), ['skills/specspire/SKILL.md']);
// Exact reviewed distribution boundary excludes temporary scripts and audit artifacts.
const expectedPaths = [
  'skills/specspire/SKILL.md', ...refs, ...enRefs, 'bin/specspire.mjs', 'package.json',
  ...['README.md', 'README.es.md', 'CONTRIBUTING.md', 'CONTRIBUTING.es.md', 'CHANGELOG.md', 'LICENSE', 'SECURITY.md'],
  ...['AGENTS.md', 'PROJECT.md', 'README-DESARROLLO.md'].map(n => `templates/${n}`),
  ...['spec', 'plan', 'design', 'tasks', 'review'].map(n => `templates/feature/${n}.md`),
  ...['QUICKSTART', 'CLI', 'WORKFLOW', 'QUALITY', 'DESIGN', 'ARCHITECTURE', 'REFERENCIAS', 'PUBLISH', 'I18N_PLAN'].map(n => `docs/${n}.md`),
  ...['QUICKSTART', 'WORKFLOW', 'QUALITY'].map(n => `docs/en/${n}.md`),
];
assert.equal(expectedPaths.length, 60);
assert.deepEqual([...packedPaths].sort(), expectedPaths.sort(), 'Tarball must contain exactly the 60 reviewed distribution files');
const install = join(temp, 'installation');mkdirSync(install);
writeFileSync(join(install, 'package.json'), JSON.stringify({name:'specspire-smoke',version:'1.0.0',private:true}));
for (let i = 0; i < 2; i++) npm(['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--no-package-lock', tarball], install);
const binary = join(install, 'node_modules/.bin', process.platform === 'win32' ? 'specspire.cmd' : 'specspire');
assert.ok(existsSync(binary));
const installedPkg = join(install, 'node_modules/specspire');
const installedSkill = join(installedPkg, 'skills/specspire');
assert.deepEqual(readdirSync(join(installedPkg, 'skills')), ['specspire']);
for (const [folder, expected] of [['references', refs], ['references/en', enRefs]]) {
  assert.deepEqual(readdirSync(join(installedSkill, folder)).filter(n => n.endsWith('.md')).sort(), expected.map(p => basename(p)).sort());
  for (const ref of expected) assert.ok(readFileSync(join(installedPkg, ref), 'utf8').trim(), `Empty packaged reference: ${ref}`);
}
function localLinks(doc) {
  return [...readFileSync(join(installedPkg, doc), 'utf8').matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
    .map(m => m[1]).filter(target => !/^(https?:|mailto:|#)/.test(target));
}
const routerLinks = localLinks('skills/specspire/SKILL.md');
assert.equal(routerLinks.length, 30, 'Bilingual router must have exactly 30 local reference links');
assert.deepEqual(routerLinks.map(target => `skills/specspire/${target}`).sort(), [...refs, ...enRefs].sort());
let englishLinkCount = 0;
for (const doc of packedPaths.filter(p => p.endsWith('.md'))) {
  for (const target of localLinks(doc)) {
    const resolved = resolve(installedPkg, dirname(doc), decodeURIComponent(target.split('#')[0]));
    const rel = relative(installedPkg, resolved);
    assert.ok(rel !== '..' && !rel.startsWith('..' + sep), `${doc} links outside the installed package: ${target}`);
    assert.ok(existsSync(resolved), `${doc} links to a file missing from the package: ${target}`);
    if (enRefs.includes(doc)) englishLinkCount++;
  }
}
assert.equal(englishLinkCount, 14, 'Expected all 14 local English reference links');
const project = join(temp, 'project');mkdirSync(project);
const customDocs = {
  'AGENTS.md': 'Existing project rules: preserve me.',
  'PROJECT.md': '_Nombre_ - Existing project context: preserve me.',
  'README-DESARROLLO.md': 'Existing development guidance: preserve me.',
};
for (const [name, content] of Object.entries(customDocs)) writeFileSync(join(project, name), content);
function cli(args) {
  // cmd.exe only dispatches a fixed npm-generated shim; no user arguments enter shell text.
  const x = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${binary}" ${args.join(' ')}"`], {cwd:project,encoding:'utf8',windowsVerbatimArguments:true})
    : spawnSync(binary, args, {cwd:project,encoding:'utf8'});
  assert.equal(x.status, 0, `${args.join(' ')}\n${x.stderr}\n${x.stdout}`);return x.stdout;
}
assert.match(cli(['--help']), /Specspire/);
assert.match(cli(['validate-source']), /PASS: 1 Skill, 30 referencias \(15 es, 15 en\)/);
assert.match(cli(['init']), /31 archivos/); // Three personalized documents already exist.
function countRegularFiles(dir) {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error(`Entrada symlink inesperada en ${dir}: ${entry.name}`);
    if (entry.isDirectory()) count += countRegularFiles(join(dir, entry.name));
    else if (entry.isFile()) count++;
    else throw new Error(`Entrada no regular inesperada en ${dir}: ${entry.name}`);
  }
  return count;
}
const installedFiles = ['AGENTS.md', 'PROJECT.md', 'README-DESARROLLO.md', '.agents/skills/specspire/SKILL.md',
  ...refs.concat(enRefs).map(p => `.agents/${p}`)];
assert.equal(installedFiles.length, 34);
assert.equal(countRegularFiles(project), 34);
const before = installedFiles.map(p => readFileSync(join(project, p)));
assert.match(cli(['init']), /0 archivos/);
installedFiles.forEach((p, i) => assert.deepEqual(readFileSync(join(project, p)), before[i], `init overwrote ${p}`));
for (const ref of [...refs, ...enRefs]) assert.deepEqual(readFileSync(join(project, '.agents', ref)), readFileSync(join(installedPkg, ref)));
assert.match(cli(['doctor']), /PASS: 34 archivos/);
assert.match(cli(['next']), /Fase 0/);
cli(['feature','new','smoke']);
const spec = join(project,'specs/smoke/spec.md');writeFileSync(spec,'Preserved feature content.');
cli(['feature','new','smoke']);assert.equal(readFileSync(spec,'utf8'),'Preserved feature content.');
for (const [name, content] of Object.entries(customDocs)) assert.equal(readFileSync(join(project, name), 'utf8'), content);
const manifest = JSON.parse(readFileSync(join(installedPkg, 'package.json'), 'utf8'));
for (const field of ['dependencies', 'optionalDependencies', 'peerDependencies']) assert.equal(Object.keys(manifest[field] || {}).length, 0, `Unexpected runtime dependency field: ${field}`);
console.log(`PASS: packed ${packed.files.length} files; one Skill, 30 references (15 es, 15 en), exact basename parity, 30 router links and ${englishLinkCount} EN links resolved; no audit artifacts or temporary scripts; offline tarball install twice, validate-source, 34 installed project files, init twice, doctor, next, feature and preservation verified; zero runtime dependencies.`);
