# Specspire — Pre-release Remediation Report

Fecha: 2026-10-31. Versión: 0.9.0-beta.1. Alcance: cambios locales autorizados; sin commits, push, publicación npm ni releases.

## 1. Executive Summary

Se corrigieron los defectos locales del instalador y se reforzaron las pruebas sin nuevas dependencias, frameworks ni cambios de configuración global. Se conserva una única Skill pública y la comprobación de destinos/ancestros; las escrituras ahora son exclusivas.

Suite local: **43 PASS, 0 FAIL, 3 BLOCKED**, 46 casos. Node representa los tres BLOCKED como skips explícitos con motivo EPERM; no se contabilizan como PASS. `check` y smoke del tarball instalado: **PASS**. La prueba deliberada del modo estricto produjo 3 FAIL por los mismos BLOCKED, demostrando que el gate no los acepta.

**READY WITH CONDITIONS** para avanzar a validación de beta, no como certificación de compatibilidad general. Condiciones pendientes: ejecución remota de matriz y controles nativos, canales remotos y pilotos con agentes. No se declara cumplida la cobertura nativa que este entorno no permite ejecutar.

## 2. Hallazgos corregidos por ID

| ID | Resultado y alcance | Estado pendiente |
|---|---|---|
| A01 | PASS: fixtures base usan junction Windows / symlink dir Unix, destino externo hermano y sentinel; rechazo específico y no escritura externa | BLOCKED: tres variantes de symlink nativo Windows; Linux/macOS NOT VERIFIED |
| A02 | PASS: configuración de matriz 3 OS × Node 20.0.0/22/24, permisos de lectura, tests/check/pack y gate agregado | NOT VERIFIED: ejecución remota y protección de rama |
| A03 | PASS: tarball generado, instalado dos veces offline y bin instalado ejecutado | NOT VERIFIED: GitHub/npm público, npx skills y pilotos reales |
| A04 | PASS: documentación distingue solo Skill y kit; Skill establece contexto en conversación si faltan documentos y no presume CLI | NOT VERIFIED: conducta observada de un agente en piloto |
| A05 | PASS: LF/CRLF válidos aceptados; metadatos ausentes, nombre incorrecto y descripción vacía rechazados | NOT VERIFIED: clon Git remoto con conversión de saltos |
| A06 | PASS: doctor distingue incompleta/corrupta, valida archivos regulares no vacíos, enlaces, metadatos y referencias requeridas | No certifica significado ni calidad de instrucciones personalizadas |
| A07 | PASS: next y feature tasks detienen avance ante design.md con TODO; ausencia sigue siendo válida | Ninguno para el defecto reproducido |
| A08 | PASS: COPYFILE_EXCL / wx preservan un archivo creado concurrentemente, probado mediante intercalado controlado | Confinamiento frente a sustitución hostil de ancestros: NOT VERIFIED y fuera de garantía documentada |
| A09 | PASS: Object.hasOwn, error de uso para etapas heredadas, versión desde package.json y tokens compartidos | Se conservan listas independientes de expectativas en tests deliberadamente |

No se considera A01 completamente cerrado, ni A02/A03 verificados en todas sus dimensiones. La corrección textual de A04 no sustituye un piloto.

## 3. Archivos modificados y justificación

| Archivos | Cambio |
|---|---|
| `bin/specspire.mjs` | Metadatos LF/CRLF, doctor, orden UI, validación de etapas, creación exclusiva, revalidación de destino y versión/tokens |
| `package.json` | Lista explícita de tests para evitar expansión de glob dependiente de shell/runtime; comando test:package |
| `.github/workflows/ci.yml` | Matriz, permisos mínimos, seguridad obligatoria, distribución y job required |
| `tests/cli.test.mjs` | Conserva los dos tests originales, mejora fixtures y aserciones; rutas temporales físicas para macOS |
| `tests/hardening.test.mjs` (nuevo) | Seguridad, doctor, metadatos, UI, argumentos y concurrencia |
| `tests/docs.test.mjs` | Cobertura recursiva de Markdown, README español, referencias y plantillas; contrato de onboarding |
| `tests/identity.test.mjs` | Aceptar CRLF sin debilitar la comprobación de identidad |
| `tests/package-smoke.mjs` (nuevo) | Pack e instalación temporal offline, bin real, integridad, comandos e idempotencia |
| `skills/specspire/SKILL.md` | Arranque consciente de documentos ausentes, sin crearlos automáticamente |
| `README.md`, `README.es.md`, `docs/QUICKSTART.md` | Dos recorridos de instalación y troubleshooting real |
| `docs/CLI.md`, `SECURITY.md` | Semántica de doctor/next y límites precisos de filesystem/concurrencia |
| `CONTRIBUTING.md`, `docs/PUBLISH.md` | Verificaciones, BLOCKED y pasos posteriores al primer push |
| Este informe (nuevo) | Evidencia y límites de la remediación |

El informe de auditoría original permanece como registro histórico sin cambios. El repositorio ya tenía sus fuentes sin seguimiento al inicio; no existe un baseline Git versionado para atribuir un diff de commit.

## 4. Pruebas agregadas o actualizadas

- Los dos tests originales de seguridad ahora crean enlaces a un directorio hermano externo al proyecto, exigen `Destino inseguro (symlink)` y verifican contenido/listado externo intactos.
- Tres pruebas adicionales de enlaces de directorio en raíz, ancestro y destino final; tres de symlinks nativos (directorio, archivo y archivo colgante), con clasificación BLOCKED explícita si el sistema impide preparar el fixture.
- Doctor contra Skill vacía, directorio, metadatos inválidos, referencia inválida y enlace; aceptación de AGENTS personalizado y detección de referencia faltante.
- Seis variantes de frontmatter ejecutan validate-source contra copias aisladas del kit: LF, CRLF, nombre incorrecto, sin nombre, sin descripción y descripción vacía.
- Next con diseño ausente, pendiente y completo; feature tasks rechaza el pendiente. Las pruebas anteriores conservan la progresión sin UI.
- Etapas `constructor`, `toString`, `__proto__` producen errores de uso sin crear specs; versión mostrada coincide con package.json.
- Dos pruebas de carrera insertan un archivo justo antes del copy/write mediante preload de test. Verifican contenido del competidor intacto y mensaje EXISTE; no se añadieron hooks de test al producto.
- Comprobación de enlaces locales ampliada a Markdown recursivo; contrato textual de onboarding. No simula cumplimiento por un agente.
- Smoke ejecuta el shim npm instalado, no el bin de la fuente; valida integridad del paquete, init repetido, doctor, next, feature new repetido y preservación de documentos propios.

## 5. Resultados reales de comandos

Entorno observado: Windows 10.0.26300 x64, Node v24.19.0, npm 11.17.0, PowerShell. Se utilizó npm.cmd sin modificar execution policy.

| Comando/control | Resultado | Evidencia |
|---|---|---|
| `npm.cmd test` | PASS para 43 casos; BLOCKED para 3; 0 FAIL | 46 tests, 3 skips con motivo explícito EPERM en symlinks nativos |
| `npm.cmd run check` | PASS | Una Skill, 13 referencias, 3 plantillas de instalación y 5 progresivas |
| `npm.cmd run test:package`, primer intento | FAIL | Error de quoting en el harness del shim Windows; corregido usando windowsVerbatimArguments en cmd.exe |
| `npm.cmd run test:package`, tras corrección | PASS | Tarball local instalado dos veces; bin instalado, init/doctor/next/feature y preservación comprobados |
| Modo estricto: variable `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` y `node --test --test-name-pattern='native symlink' tests/hardening.test.mjs` | FAIL por 3 BLOCKED | 0 PASS, 3 FAIL, 0 skips: gate rechaza capacidades ausentes. Variable retirada después del comando |
| Comprobación de documentación/enlaces | PASS | Incluida en suite; destinos locales existen. No valida disponibilidad remota ni todos los anchors |

El fallo deliberado del modo estricto no se presenta como test de seguridad aprobado. Demuestra que CI debe fallar en un runner con esa misma restricción. No se modificaron privilegios para eliminarla.

El smoke crea caché aislada y usa `npm pack --json --ignore-scripts --pack-destination <temp>` e `npm install --offline --ignore-scripts --no-audit --no-fund --no-package-lock <tarball>`; no consulta ni publica paquetes remotos. Artefactos temporales preservados y ruta impresa por cada ejecución. Ejecución exitosa inicial: `%TEMP%\specspire-package-M4EY0D` (40 archivos antes de añadir este informe). El conteo aumenta cuando el propio informe entra en docs; esto no representa pérdida de archivos.

Verificación final repetida tras los cambios de código y documentación: suite **43 PASS / 0 FAIL / 3 BLOCKED**, check **PASS**, smoke **PASS**, 41 archivos empaquetados. Artefactos finales en `%TEMP%\specspire-package-NbYhDn`; también se ejecutó `validate-source` desde el bin instalado para comprobar las cinco plantillas y todas las referencias del tarball.

## 6. Matriz de compatibilidad verificada y pendiente

| Sistema / runtime | CLI y regresiones | Enlaces | Distribución local |
|---|---|---|---|
| Windows / Node 24.19.0 | PASS | Junctions PASS; nativos BLOCKED | PASS |
| Windows / Node 20.0.0 y 22 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |
| Linux / Node 20.0.0, 22 y 24 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |
| macOS / Node 20.0.0, 22 y 24 | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED |

La versión mínima 20.0.0 coincide con engines >=20. Los archivos de test se enumeran explícitamente para no depender del soporte de globs de Node o cmd.exe. El workflow configura las nueve combinaciones; no se ejecutó GitHub Actions desde esta sesión. Las rutas físicas de fixtures evitan aliases temporales legítimos sin relajar la política de secureDestination.

## 7. Riesgos residuales

- Tres variantes nativas siguen BLOCKED por EPERM local; junctions no prueban por equivalencia todos los comportamientos de symlinks nativos.
- Las operaciones de rutas de Node no constituyen un sandbox frente a otro proceso hostil que sustituya ancestros. Revalidar reduce la ventana pero no la elimina; las escrituras exclusivas protegen el archivo final concurrente, no garantizan confinamiento absoluto.
- Doctor verifica estructura mínima e instrucciones no vacías, no semántica del texto ni calidad del proyecto. Conserva documentos personalizados.
- Init puede dejar instalación parcial si detecta un conflicto posterior. No elimina ni sobrescribe para recuperarse; doctor identifica problemas.
- CI puede requerir un runner con capacidad nativa de enlaces; el pipeline fallará si no la tiene. No baja el requisito ni habilita privilegios globales automáticamente.
- Los comandos remotos, descubrimiento de Skill, npm público y pilotos de agentes permanecen NOT VERIFIED. No se declara soporte demostrado para esos canales.
- Package.files incluye docs, incluidos informes de auditoría; revisar el contenido deliberadamente antes de publicar.

## 8. Validaciones necesarias después del primer push

1. Ejecutar y revisar las nueve combinaciones; ningún control nativo obligatorio puede quedar BLOCKED. Conservar logs de cada job.
2. Configurar `required` como check obligatorio de PR y verificar que fallos/cancelaciones de la matriz impiden aprobarlo.
3. Validar instalación desde la revisión GitHub exacta y activación mediante el instalador de Skills; confirmar archivos y ubicación reales.
4. Ejecutar piloto con agente en proyecto nuevo y existente, incluido modo solo Skill; registrar requisitos, pruebas reales y UI si aplica.
5. Comprobar canal privado de seguridad y metadatos públicos. Publicación npm y releases requieren autorización aparte.

## 9. Veredicto actualizado

Los defectos funcionales reproducidos de CRLF, doctor, next y etapas heredadas están corregidos; las carreras del archivo final tienen regresiones ejecutadas. La distribución local ya tiene evidencia real. Los controles pendientes permanecen explícitos y obligatorios en CI.

**READY WITH CONDITIONS**: apto para avanzar a la validación de beta bajo las condiciones anteriores. No equivale a READY FOR BETA sin reservas ni a compatibilidad multiplataforma comprobada. La cobertura nativa Windows y las validaciones remotas no se marcan resueltas. Trabajo detenido sin commit, push ni publicación.
