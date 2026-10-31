# Specspire v0.9.0-beta.1 — Pre-release Engineering Audit

Fecha: 2026-10-31 (America/Santiago). Auditoría independiente, sin correcciones de código.

## 1. Executive Summary

**Veredicto: NOT READY** para recomendar instalación y uso general multiplataforma. La base es pequeña, comprensible y sin dependencias de terceros; la metodología cubre lo prometido y distingue documentación de software verificado. Sin embargo, la suite falla en Windows, CI no cubre ese sistema ni macOS y faltan validaciones de distribución y uso real con agentes.

**Hallazgos: P0: 0 · P1: 3 · P2: 5 · P3: 1.** No se confirmó una evasión de las protecciones de escritura. Esto no equivale a una certificación de seguridad. Los dos errores reportados ocurren preparando fixtures, antes de probar el rechazo de enlaces por la CLI.

Se reprodujo `npm.cmd test`: **21 PASS / 2 FAIL**, 0 omitidas, 23 pruebas. `npm.cmd run check`: **PASS**. Tres diagnósticos adicionales con junctions: **PASS**, sin archivos en el directorio externo. El inventario de `npm pack --dry-run`: **PASS**, 39 archivos antes de agregar este informe; instalación del paquete resultante: **NOT VERIFIED**.

## 2. Environment & Audit Scope

Entorno observado: Windows `10.0.26300`, x64, PowerShell, Node `v24.19.0`, npm `11.17.0`, Git `2.55.0.windows.3`. Workspace: `<workspace>`. No se inspeccionaron credenciales ni configuración privada.

Se revisaron la CLI completa, package.json, tres archivos de tests, única Skill, sus 13 referencias, ocho plantillas, ejemplo, ambos README, ocho documentos de docs, workflow, ignore, licencia, changelog y políticas de contribución y seguridad. Las instrucciones de la Skill se evaluaron como producto, no se activaron para gobernar esta auditoría. No hay AGENTS.md operativo en la raíz; `templates/AGENTS.md` es un artefacto distribuible.

El estado inicial de Git muestra todo el contenido del producto sin seguimiento; no hay un diff versionado utilizable como evidencia de esta versión. No se hicieron commits, instalaciones globales ni publicaciones. Único archivo añadido al repositorio: este informe. Los tests usan sus fixtures temporales y su limpieza existente; los diagnósticos adicionales quedaron en `%TEMP%\specspire-audit-OLcjPZ`, sin limpieza manual ni cambios al producto.

Resultados usados: **PASS** (control concreto ejecutado o inspección estática satisfactoria), **FAIL** (incumplimiento observado), **BLOCKED** (impedimento de ejecución), **NOT VERIFIED** (sin evidencia suficiente). Un PASS estático no demuestra comportamiento en un agente ni en otro sistema operativo.

## 3. Test Results

| Control | Resultado | Evidencia y límite |
|---|---|---|
| `npm test` literal en PowerShell | BLOCKED | La política local rechaza `npm.ps1`; no se modificó la política |
| `npm.cmd test` | FAIL | 23 tests: 21 PASS, 2 FAIL, 0 omitidos; unos 3 segundos |
| `symlinks inside destination are blocked` | FAIL | `EPERM` en `tests/cli.test.mjs:71`, antes de ejecutar init |
| `unsafe existing feature directory symlinks blocked` | FAIL | `EPERM` en `tests/cli.test.mjs:76`, antes de ejecutar feature contra el enlace |
| `npm.cmd run check` | PASS | Una Skill, 13 referencias, 3 plantillas de instalación y 5 de funcionalidad |
| Init, doctor básico, status, creación progresiva | PASS | Tests existentes ejecutados sobre directorios temporales |
| Idempotencia secuencial y preservación | PASS | Dos init conservan AGENTS.md; repetir feature conserva spec |
| Dry-run de init y feature new | PASS | Tests comprueban ausencia del destino o specs; otras etapas no ejecutadas individualmente |
| Slugs de traversal y argumentos inválidos de la suite | PASS | Rechazo con código 1; no prueba todos los nombres/rutas posibles |
| Junction en `.agents`, `specs/form` y ancestro del target | PASS | `lstat().isSymbolicLink() === true`, rechazo código 1, destino externo vacío en los tres casos |
| Symlinks nativos Windows: protección efectiva | BLOCKED | No se pudo construir el fixture; los FAIL de setup no prueban la protección |
| Doctor con SKILL.md vacío | FAIL | Devuelve código 0 y `PASS: 17 archivos... instalados` |
| Next con design.md pendiente | FAIL | Recomienda fase 3 / `feature tasks form` aunque contiene `TODO_DESIGN` |
| Frontmatter LF/CRLF en memoria | FAIL | La expresión real acepta LF y rechaza el mismo texto convertido a CRLF |
| Enlaces Markdown locales, inspección ampliada | PASS | 65 referencias a archivos resueltas, sin destinos faltantes antes de este informe; no valida anchors ni enlaces remotos |
| Pack con caché predeterminada | BLOCKED | EPERM al abrir caché npm del usuario |
| Pack con caché temporal aislada | PASS | `npm.cmd pack --dry-run --json --ignore-scripts --cache <temporal>`: 39 archivos, todos los recursos de runtime presentes |
| Instalación desde tarball, npm remoto o GitHub | NOT VERIFIED | No se instaló ni publicó un paquete; listar contenido no ejecuta instalación |
| Linux, macOS, otros Node, agentes reales | NOT VERIFIED | No hubo runners ni pilotos en esos entornos |

Los diagnósticos extra fueron ejecutados con Node desde stdin, usando el binario original. No se alteraron tests para convertir los dos fallos en PASS.

## 4. Critical Findings

### A01 — P1 — Fixtures de enlaces no portables

- **Archivo/líneas:** `tests/cli.test.mjs:70–77`.
- **Resultado/evidencia:** FAIL; ambos `symlinkSync` lanzan EPERM antes de las aserciones sobre seguridad.
- **Causa confirmada:** la creación de symlinks nativos está denegada en el contexto efectivo de ejecución. El test presupone esa capacidad y no declara tipo de enlace. No se confirmó si la restricción concreta viene de Developer Mode, privilegios, política o aislamiento; no debe atribuirse a una configuración específica sin medirla.
- **Riesgo:** suite inutilizable para contribuyentes Windows normales y protección sin ejercitar. El segundo test solo verifica código 1: un fallo ajeno a seguridad podría satisfacerlo. Además, el directorio llamado `outside` está dentro del propio target, por lo que no demuestra ausencia de escritura fuera del proyecto.
- **Solución mínima:** fixture de directorio con `process.platform === 'win32' ? 'junction' : 'dir'`, destino absoluto y externo al proyecto pero dentro del sandbox temporal. Mantener las comprobaciones de la CLI. Añadir pruebas separadas de symlinks nativos y archivos enlazados.
- **Prueba requerida:** ambos casos rechazan específicamente por enlace, mantienen intacto un sentinel externo y no crean archivos externos. Junctions obligatorias en Windows; enlaces nativos obligatorios en un runner Windows con capacidad explícita y en Linux/macOS. Ver sección 6 para reporting.

### A02 — P1 — CI no respalda el alcance multiplataforma

- **Archivo/líneas:** `.github/workflows/ci.yml:1–14`; `package.json:9–10,25–27`.
- **Resultado/evidencia:** FAIL por inspección: solo Ubuntu con Node 22; no matriz, permisos explícitos ni comprobación de distribución.
- **Causa confirmada:** configuración mínima de un único entorno. El soporte declarado es Node >=20, más amplio que el validado.
- **Riesgo:** un PR puede aprobar mientras Windows falla; macOS y versiones admitidas permanecen sin señal. La ejecución histórica de Actions y reglas del repositorio son NOT VERIFIED.
- **Solución:** matriz Linux/Windows/macOS, versión mínima realmente soportada y versiones seleccionadas de Node; declarar `permissions: contents: read`; impedir aprobación con controles de seguridad obligatorios bloqueados. Comprobar empaquetado e instalación local en fixture.
- **Prueba requerida:** jobs exitosos de cada combinación acordada, recuentos sin pérdidas de cobertura y smoke de la CLI instalada. Si se conserva todo Node 20, comprobar también su versión mínima; el glob de `node --test tests/*.test.mjs` merece verificación en Windows para ese runtime.

### A03 — P1 — Distribución y resultado con agentes aún sin demostrar

- **Archivo/líneas:** `README.md:19–30,95–101`; `CHANGELOG.md:14–18`; `docs/PUBLISH.md:33–46`.
- **Resultado/evidencia:** NOT VERIFIED; la propia documentación reconoce que faltan instalación remota y piloto. Pack dry-run solo confirma selección de archivos.
- **Causa confirmada:** todavía no hay evidencia aportada o ejecutada de instalación pública, descubrimiento de Skill ni proyecto completo producido con un agente.
- **Riesgo:** recomendar uso general antes de validar el canal de entrada y la propuesta central. No se afirma que los comandos remotos sean incorrectos.
- **Solución:** primero instalar un tarball local en proyecto temporal; después, cuando exista publicación autorizada, probar GitHub y `npx skills` fijando una revisión. Ejecutar un piloto pequeño en proyecto nuevo y uno existente, con al menos el agente que se anuncie como probado.
- **Prueba requerida:** comandos, revisión exacta, entorno, árbol instalado, activación observada, tareas/aceptación, tests reales y evidencia UI cuando corresponda. Mantener cada canal sin ejecutar como NOT VERIFIED.

### A04 — P2 — La alternativa «solo Skill» presupone archivos del kit completo

- **Archivo/líneas:** `README.md:21–30,41–47`; `skills/specspire/SKILL.md:10–16`; `templates/AGENTS.md:3`.
- **Resultado/evidencia:** FAIL de consistencia estática. La primera alternativa instala solo Skill; el paso siguiente pide abrir README-DESARROLLO.md y leer AGENTS.md y PROJECT.md. Inicio de la Skill los presupone y no define su ausencia.
- **Causa confirmada:** onboarding compartido para dos instalaciones con artefactos distintos.
- **Riesgo:** junior detenido o agente inventando un bootstrap distinto; también se usa una ruta fija aunque el instalador de Skills puede elegir otra ubicación.
- **Solución:** separar brevemente ambos recorridos y definir cómo iniciar contexto con archivos ausentes, sin volver obligatoria la CLI ni duplicar reglas existentes.
- **Prueba requerida:** proyecto vacío con solo la Skill, agente activado y primera especificación viable; proyecto con AGENTS.md propio conservado.

### A05 — P2 — Validación rechaza CRLF válido

- **Archivo/líneas:** `bin/specspire.mjs:198–199`; `tests/docs.test.mjs:30–31`; `tests/identity.test.mjs:13`.
- **Resultado/evidencia:** FAIL; la expresión de validación aplicada en memoria al mismo frontmatter LF/CRLF produce true/false. No existe `.gitattributes` en el inventario.
- **Causa confirmada:** comparación con saltos `\n` literales, sin normalización.
- **Riesgo:** un checkout o editor Windows puede convertir saltos y romper check/identidad sin cambiar el contenido semántico. La conversión por Git en un clon real no se ejecutó.
- **Solución:** normalizar saltos o aceptar `\r?\n`; política explícita de LF para fuentes si se desea. No confundir esta falla con los dos EPERM originales.
- **Prueba requerida:** frontmatter válido LF y CRLF aceptado; nombre o descripción ausentes siguen rechazados; clon Windows con política de saltos representativa.

### A06 — P2 — Doctor confunde existencia con instalación utilizable

- **Archivo/líneas:** `bin/specspire.mjs:81–87,100–110`.
- **Resultado/evidencia:** FAIL; tras init se vació solo SKILL.md de un fixture y doctor devolvió código 0 y PASS.
- **Causa confirmada:** `existsSync` no valida tipo, contenido ni integridad. Init conserva todos los destinos existentes, incluso si son incompatibles.
- **Riesgo:** un usuario recibe señal de instalación correcta aunque no haya instrucciones utilizables. El aviso de que doctor no certifica la aplicación es acertado, pero no soluciona este falso positivo de instalación.
- **Solución:** comprobar archivos regulares legibles, contenido mínimo y referencias locales; informar conflictos sin sobrescribirlos. Mantener separación entre salud de instalación y calidad del producto.
- **Prueba requerida:** archivos vacíos, directorios con nombre de archivo, referencias ausentes y enlaces; instalar sobre documentos personalizados válidos sigue sin sobrescribir.

### A07 — P2 — Next omite un diseño existente sin completar

- **Archivo/líneas:** `bin/specspire.mjs:177–188`; `skills/specspire/SKILL.md:36,47`; `templates/feature/design.md:7–17`.
- **Resultado/evidencia:** FAIL; con spec y plan sin TODO, PROJECT completo y design.md con TODO_DESIGN, next recomienda `feature tasks form`.
- **Causa confirmada:** el orden de next no incluye design.md. Las condiciones de tasks tampoco lo consideran (`bin/specspire.mjs:13`).
- **Riesgo:** guía al junior a saltar un trabajo UI explícitamente abierto. Es un defecto documental de orientación, no una falsa certificación de software: el disclaimer sí existe.
- **Solución:** si existe design.md, reportar sus pendientes antes de tareas; para ausencia, preguntar/indicar aplicabilidad sin obligar a proyectos sin UI. Aclarar cuándo design.md es opcional frente a las referencias que lo exigen para UI.
- **Prueba requerida:** UI con diseño pendiente y completo, proyecto sin UI, y next que conserve avisos de verificación real.

### A08 — P2 — No sobrescritura no es atómica; límite de seguridad concurrente

- **Archivo/líneas:** `bin/specspire.mjs:81–87,121–136`.
- **Resultado/evidencia:** FAIL de garantía estática: se comprueba existencia y luego se usa copyFileSync sin exclusión o writeFileSync con modo predeterminado. Carrera explotada: NOT VERIFIED.
- **Causa confirmada:** separación entre comprobación y uso. Otro proceso podría crear un archivo entre ambos; también podría sustituir un ancestro por un enlace después de secureDestination.
- **Riesgo:** sobrescritura o redirección bajo concurrencia local hostil. No se demostró pérdida de datos ni escape con entradas normales; por ello no se clasifica P0 ni se presenta como exploit confirmado.
- **Solución:** creación exclusiva (`COPYFILE_EXCL` / `wx`) y manejo explícito de EEXIST; documentar que el workspace debe ser confiable. La exclusión de archivo final no resuelve por sí sola la carrera de ancestros: evaluar revalidación y garantías del sistema antes de prometer confinamiento ante procesos hostiles.
- **Prueba requerida:** intercalado controlado entre comprobación y escritura preserva el archivo creado por otro proceso; pruebas de sustitución de ancestro en entorno aislado. Mantener tests secuenciales y de enlaces.

### A09 — P3 — Fuentes repetidas y validación de argumentos poco precisa

- **Archivo/líneas:** `bin/specspire.mjs:7–19,114,150–151,177–182`; `tests/cli.test.mjs:16–19`; `tests/identity.test.mjs:10–13`.
- **Resultado/evidencia:** FAIL de mantenibilidad: versión, referencias y mapa de etapas/tokens se repiten. `feature constructor con --dry-run` y `feature toString con --dry-run` devuelven código 1 por path undefined, no el error de uso previsto.
- **Causa confirmada:** consulta de propiedades heredadas de `stages` y varias listas independientes.
- **Riesgo:** deriva al añadir fases o actualizar versión; mensajes confusos. No se encontró escritura mediante esos argumentos.
- **Solución:** validar con Object.hasOwn y centralizar solo metadatos realmente compartidos; no introducir framework ni separar módulos por tamaño artificial.
- **Prueba requerida:** acciones heredadas rechazadas con error de uso y versión coherente con package.json; todas las fases conservan comportamiento.

## 5. Architecture & Skill Quality

La CLI de 224 líneas es proporcional: parser, validación, operaciones y orientación están en funciones distintas. No hay dependencias runtime/dev ni scripts de instalación que ejecutar. No se justifica reescribirla ni introducir un framework. La duplicación concreta es A09; fuentes de instalación y referencias ya tienen cierta centralización.

| Área solicitada | Referencias | Evaluación estática |
|---|---|---|
| Descubrimiento y constitución | 00-prepare, 01-specify, PROJECT | PASS: dudas explícitas, alcance y rúbrica |
| Especificación y aceptación | 01-specify, spec | PASS: RF, escenarios y errores |
| Stack y arquitectura | 02-plan-design, plan | PASS: fuentes oficiales, fecha, alternativas, fallback offline y reutilización |
| Tareas y dependencias | 03-tasks, tasks | PASS: cortes verticales y trazabilidad |
| Dirección artística y UI/UX | 02-ui-quality, design | PASS: alternativas, estados, teclado, móvil y revisión visual |
| TDD e incrementos | 04-implement | PASS: rojo por causa correcta, verde, refactor y regresión |
| Debugging | 09-debugging | PASS: reproducción e hipótesis antes de corregir |
| Revisión independiente | 05-converge, 08-code-quality, 11-agent-collaboration | PASS: dos ejes; revisores distintos o pases separados si hay capacidad |
| Seguridad y controles | 10-security-operations | PASS: profundidad según datos, infraestructura y riesgo |
| Verificación y entrega | 05-converge, 06-deliver | PASS: evidencia actual, README reproducible, pendientes honestos |
| Mantenimiento | 07-maintain | PASS: actualizar solo documentos afectados |

La Skill tiene 52 líneas útiles y carga referencias bajo demanda; no hay un problema serio de extensión. No hay referencias locales rotas. La cobertura metodológica **no demuestra** que un agente la siga: eso permanece NOT VERIFIED (A03).

Ambigüedades a resolver dentro de A04/A07: documentos de arranque ausentes; design.md «opcional» frente a instrucciones UI obligatorias. La fila de enrutamiento de stack puede interpretarse como condicionada entera a UI; aclarar que solo el anexo visual es condicional. «Una acción por turno» favorece tutoría, pero conviene permitir bloques autorizados por usuarios expertos. Dos direcciones visuales deben ajustarse a mantenimiento de UI existente para evitar rediseño innecesario. Son precisiones de instrucciones, no motivos para añadir más documentos.

## 6. Cross-Platform Compatibility

**Causa de Windows:** el rechazo ocurre en la operación de sistema que crea el enlace. No lo causa secureDestination. Los dos tests están orientados a una protección correcta, pero su setup no es portable. En esta sesión, cambiar únicamente el tipo de fixture a junction permitió ejercitar el mismo guard y confirmar su rechazo en los tres puntos probados.

Node documenta tipos `dir`, `file` y `junction` en Windows y requisitos de rutas para junctions. Microsoft documenta que la creación no elevada de symlinks mediante el flag correspondiente requiere Developer Mode. Estas fuentes explican el mecanismo; no prueban cuál política estaba activa en esta máquina: [Node fs](https://nodejs.org/docs/latest-v24.x/api/fs.html#fssymlinksynctarget-path-type), [Microsoft CreateSymbolicLinkW](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createsymboliclinkw).

Corrección propuesta, **no implementada**:

1. Crear target y directorio externo como hermanos bajo un fixture temporal; usar junction absoluta en Windows y symlink `dir` en Unix para los dos casos base.
2. Afirmar tipo de enlace, rechazo específico, código no cero y ausencia de escrituras externas, incluido sentinel intacto.
3. Conservar pruebas adicionales de symlinks nativos Windows, incluidos archivos y enlaces colgantes cuando el sistema lo permita. Junctions no sustituyen todas sus propiedades.
4. Probar también root enlazado, ancestro enlazado y enlace final. No flexibilizar secureDestination para conseguir verde.
5. Si un setup nativo falla por capacidad conocida, registrarlo como BLOCKED con código y razón. Una omisión del runner debe mapearse a BLOCKED en el informe; nunca retornar silenciosamente ni contarlo como PASS. CI de seguridad debe fallar si falta un caso obligatorio; disponer de un job con capacidad explícita para probarlo.

Linux y macOS no se ejecutaron. La política actual rechaza cualquier ancestro symlink, incluso legítimo. En macOS debe comprobarse el uso de rutas temporales resueltas frente a aliases del sistema; no eliminar esa protección para acomodar el fixture. UNC, otras unidades, filesystem de red y rutas largas: NOT VERIFIED.

## 7. Security & CI/CD

Aspectos favorables: slugs excluyen separadores y traversal; destinos se construyen bajo target; lstat recorre destino y ancestros; errores terminan con código 1; no hay shell ni red en la CLI; no instala frameworks ni dependencias. `--target` autoriza una raíz distinta al cwd: no es por sí mismo una escritura fuera del proyecto autorizado.

Límites: la contención lexical no usa `isAbsolute(relativePath)` para el caso general entre unidades Windows, pero no se identificó una ruta de CLI que permita construir ese destino con los slugs actuales. No se clasifica como escape demostrado. Lecturas de doctor/status/next y prerrequisitos no están igualmente protegidas contra enlaces; no escriben esos destinos, pero no deben usarse como validación de confinamiento. Init puede dejar documentos ya creados si descubre un conflicto posterior: informar instalación parcial y permitir recuperación, sin borrar ni sobreescribir automáticamente.

`.gitignore` excluye `.env`, variantes, logs, tgz y node_modules; la lista positiva de package.files limita distribución. No se inspeccionaron almacenes de secretos y no se declara «repositorio libre de secretos». Al incluir `docs/`, el paquete también incluirá este informe cuando vuelva a empaquetarse: revisar deliberadamente el contenido antes de publicar.

LICENSE MIT y metadatos están presentes y coherentes. SECURITY.md ofrece reporte privado si GitHub lo habilita, pero el canal alternativo no tiene dirección concreta: configurar un canal operativo antes de recomendar recepción de vulnerabilidades. No se verificó configuración remota. Actions usa tags v4, no SHA; fijar revisiones revisadas mejora reproducibilidad. Ausencia de `permissions` explícitos no prueba permisos de escritura efectivos: depende de ajustes del repositorio.

Checks obligatorios recomendados para PR: suite en matriz acordada, check de fuentes, prueba de enlaces y ausencia de escritura externa con cobertura obligatoria completa, empaquetado más smoke de instalación local, y enlaces locales. Un job agregador debe rechazar fallos o capacidades obligatorias bloqueadas. Protección de rama y ejecución real de Actions: NOT VERIFIED. No hace falta CI de despliegue para esta CLI ni dependencias de lint añadidas solo por formalidad.

## 8. Documentation & Developer Experience

La jerarquía es clara: README como entrada, quickstart operativo y guías por intención. Quickstart ofrece primer proyecto, activación, next y troubleshooting; el ejemplo es explícitamente hipotético, lo cual evita fingir un piloto. Sin embargo, no demuestra una aplicación terminada (A03).

README inglés y español describen el mismo producto y admiten limitaciones. La ruta inglesa deriva a documentación, plantillas y Skill en español: añadir una nota de idioma y traducir al menos el onboarding si se promete soporte práctico internacional. No hace falta duplicar todas las referencias.

Mejoras operativas: separar solo Skill/kit (A04); explicar `npm.cmd` y `npx.cmd` cuando PowerShell bloquee los scripts, sin recomendar desactivar políticas globales; añadir diagnóstico de enlaces y recuperación de init parcial; mostrar el prefijo Node para todos los comandos cuando no están en PATH. Los comandos cortos del manual son convenciones válidas, pero npm exec init no implica instalación permanente del binario.

No se recomienda eliminar documentos útiles ni crear manuales teóricos. Mantener WORKFLOW como mapa, QUALITY como evidencia y DESIGN como verificación visual; evitar repetir su texto en README y AGENTS. Mantener PUBLISH para mantenedores, con paso previo de controles locales y revisión del contenido de `git add .`; no interpretar sus instrucciones como autorización de publicación.

El test de enlaces actual omite README.es.md, referencias internas y plantillas; la comprobación ampliada encontró 65 enlaces válidos, pero no anchors ni disponibilidad externa. Ampliar la cobertura existente en lugar de introducir un framework de documentación.

| Ruta de distribución | Resultado | Qué está demostrado |
|---|---|---|
| Ejecutar fuente mediante Node | PASS | Comandos y límites detallados en sección 3, sobre este árbol Windows |
| Copia/ZIP manual | NOT VERIFIED | Estructura compatible por inspección; no se descargó/extrajo un ZIP de release |
| Clonación GitHub | NOT VERIFIED | No se clonó un remoto; importan saltos de línea y archivos realmente versionados |
| npm exec desde GitHub | NOT VERIFIED | Sintaxis documentada; sin instalación remota observada |
| Paquete npm | NOT VERIFIED | Solo inventario dry-run PASS; publicación, disponibilidad del nombre y ejecución del bin instalado no comprobadas |
| `npx skills add ...` | NOT VERIFIED | Descubrimiento, destino, enlaces y activación no ejecutados |

No se ejecutó código remoto descargado. Para reproducibilidad, validar e identificar tag/commit y versión del instalador; ejecutar una rama flotante y un `npx` sin versión no fija el contenido futuro.

## 9. Prioritized Remediation Plan

| Orden | ID / severidad | Acción concreta | Dependencia | Evidencia para cerrar |
|---|---|---|---|---|
| 1 | A01 / P1 | Fixtures portables y asserts de seguridad completos | Ninguna | Junctions y symlinks con cobertura explícita |
| 2 | A02 / P1 | Matriz y checks requeridos; permisos mínimos | A01; incorporar A05 | Resultados por OS/runtime sin bloqueos obligatorios |
| 3 | A03 / P1 | Smoke de tarball y pilotos; luego canales remotos | A01, A02, A04; publicación remota requiere autorización | Instalación y proyecto real reproducidos |
| 4 | A04 / P2 | Resolver onboarding solo Skill | Ninguna; antes del piloto | Arranque sin documentos del kit y preservación de proyecto existente |
| 5 | A05 / P2 | Aceptar CRLF y definir política de saltos | Ninguna; antes de matriz final | LF/CRLF y clon Windows |
| 6 | A06 / P2 | Doctor valida salud mínima de archivos | Ninguna | Instalación vacía/corrupta rechazada, personalizados preservados |
| 7 | A07 / P2 | Next respeta diseño pendiente | Ninguna | UI pendiente/completa y proyecto sin UI |
| 8 | A08 / P2 | Escrituras exclusivas y límite de confianza documentado | Ninguna | Carrera controlada sin sobrescritura; límite de ancestros explícito |
| 9 | A09 / P3 | Validación propia de etapas y metadatos compartidos | Después de correcciones funcionales | Errores útiles y consistencia de versión/etapas |

Implementar cambios acotados y repetir solo controles afectados más suite final. No reducir requisitos de seguridad para obtener un recuento verde. Los remotos pueden validarse después de una publicación preliminar autorizada, pero no anunciarse como soportados antes de esa evidencia.

## 10. Release Readiness Verdict

No hay P0 demostrado y el diseño permite una corrección pequeña de los dos tests. Aun así, **21/23 no cumple la salida de calidad** y la compatibilidad pública depende de canales y agentes todavía sin validar. Para reevaluar: resolver P1, corregir los defectos de onboarding y portabilidad que afecten los pilotos, registrar riesgos P2 restantes y aportar evidencia por plataforma/canal anunciado.

Esta auditoría no autoriza cambios, commits, push ni releases. No se implementó ninguna corrección. Se detiene aquí a la espera de autorización del propietario para la fase de remediación.

**NOT READY**
