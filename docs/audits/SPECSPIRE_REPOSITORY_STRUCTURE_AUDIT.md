# Specspire — Open Source Repository Architecture Audit

Fecha: 2026-10-31 · Versión local: 0.9.0-beta.1 · Auditoría exclusivamente de lectura, salvo este entregable.

## 1. Executive Summary

**MINOR CLEANUP RECOMMENDED**. La separación actual entre Skill, referencias, CLI, plantillas, tests y documentación es adecuada. No se justifica dividir la Skill, introducir src/lib, generar documentación, adoptar un monorepo ni imitar la infraestructura de catálogos externos.

El problema principal está en la distribución: package.files incluye docs/ íntegro. Los cuatro informes históricos entran en npm aunque no son necesarios para usar la Skill ni ejecutar la CLI. El paquete observado contiene 44 archivos y 160.818 bytes sin comprimir; 58.806 bytes (36,6 %) corresponden a auditorías. El tamaño absoluto es pequeño: la razón para separarlos es claridad, privacidad y menor exposición de información histórica, no rendimiento.

Recomendación A, **Minimal Professional**: mantener rutas y capacidades, simplificar seis documentos, separar auditorías de npm y sanear el dato personal ya identificado. No recomendar eliminaciones ni movimientos físicos en esta opción.

Conteo de candidatos, sin duplicar categorías: **6 SIMPLIFY; 0 MERGE de archivos completos; 0 MOVE recomendados; 0 REMOVE CANDIDATE**. La alternativa B contempla **1 MOVE opcional** (PUBLISH). La exclusión de npm afecta los cuatro informes previos más este informe: no es eliminación del repositorio. package.json requiere un ajuste de distribución adicional, no se cuenta como documento a simplificar.

## 2. Benchmark de los tres repositorios

Se consultaron vía conector GitHub árboles recursivos, README y archivos auxiliares pertinentes, sin instalar ni ejecutar su contenido. Son observaciones organizativas, no auditorías de su calidad funcional. Árboles observados: Matt `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`; Emil `a81dbca07f2217b7103e510c0f13f8d5b017afc9`; Expo `05754e71d02abe0d2d7a2fb5259ccac41f5ea59c`. Son SHA de árbol retornados por GitHub, no se presentan como commits. Los archivos leídos en main pueden evolucionar.

| Referencia | Organización y distribución observadas | Práctica aplicable / límite |
|---|---|---|
| [Matt Pocock](https://github.com/mattpocock/skills) | Catálogo bajo skills/engineering y skills/productivity, documentación por audiencia, scripts auxiliares, metadatos de plugins, Changesets y package.json privado. README combina instalación por agente y catálogo. Workflows de release/triage; no se deduce una suite de runtime por un archivo llamado tests.md. | Separar instrucciones de instalación y actualización; especialización por intención y fuente clara de decisiones. No copiar categorías, plugins ni Changesets para una única Skill y una CLI pequeña. |
| [Emil Kowalski](https://github.com/emilkowalski/skills) | README con propuesta, comando de instalación y catálogo; skills/ y dos cheatsheets en raíz. El árbol observado no contiene package.json raíz, .github/workflows ni una suite automatizada convencional. Esto no demuestra ausencia de verificación externa. | Entrada directa y referencias especializadas. Su simplicidad editorial no justifica quitar tests o CI a una CLI que escribe archivos. |
| [Expo](https://github.com/expo/skills) | Skills bajo plugins/, metadatos de marketplace y skills.sh, README con opciones de instalación y actualización; scripts de límites/enrutamiento/versiones, tests/fixtures, workflows GitHub/EAS y submódulo eval-harness. package.json raíz privado. | Diferenciar distribución y contenido, verificar enrutamiento y usar fixtures reales. No incorporar Bun, EAS, plugins ni evaluaciones costosas por analogía: responden a otro producto. |

Fuentes específicas: [README Matt](https://github.com/mattpocock/skills/blob/main/README.md), [package Matt](https://github.com/mattpocock/skills/blob/main/package.json), [README Emil](https://github.com/emilkowalski/skills/blob/main/README.md), [README Expo](https://github.com/expo/skills/blob/main/README.md), [check Expo](https://github.com/expo/skills/blob/main/.github/workflows/check.yml), [package Expo](https://github.com/expo/skills/blob/main/package.json).

No hay un patrón universal de «menos archivos = mejor». Specspire tiene una responsabilidad adicional: instalar archivos y preservar proyectos. Su superficie de pruebas y distribución npm debe mantenerse aunque otro catálogo no la tenga. No se copió contenido externo.

## 3. Inventario y análisis de estructura

Inventario recursivo real, incluidos ocultos, excluyendo únicamente .git: **51 archivos / 187.112 bytes**, antes de este informe (52 archivos después). No se encontraron artefactos temporales dentro del árbol. El tarball de diagnóstico y el snapshot de hashes se guardaron fuera del repo, en `%TEMP%/specspire-structure-Smy9Cv/`.

| Grupo actual | Cantidad | Propósito y consumidores comprobados |
|---|---:|---|
| Raíz: .gitignore, package.json, README.md, README.es.md, CHANGELOG.md, CONTRIBUTING.md, SECURITY.md, LICENSE | 8 | Git, npm, identidad/legal, descubrimiento y colaboradores. README enlaza documentación, políticas y ejemplo; tests comprueban rutas e identidad |
| .github/workflows/ci.yml | 1 | GitHub ejecuta scripts npm, matriz y gate estricto; fuera de npm |
| bin/specspire.mjs | 1 | Entrada bin de package.json y ejecución Node local; todos los comandos, instalación y orientación |
| skills/specspire/SKILL.md + references | 15 | Única entrada pública y 14 disciplinas; enlazadas por Skill, instaladas/validadas por CLI y verificadas por tests |
| templates raíz + feature | 8 | Tres documentos copiados por init y cinco plantillas de etapas consumidas por feature |
| docs raíz | 8 | ARCHITECTURE, CLI, DESIGN, PUBLISH, QUALITY, QUICKSTART, REFERENCIAS, WORKFLOW: enlaces desde README y entre guías; tests documentales |
| docs/audits | 4 | PRE_RELEASE_AUDIT, REMEDIATION_REPORT, RESPONSIVE_STANDARD_REPORT, FINAL_PRE_PUSH_REPORT: evidencia histórica de mantenimiento; no consumo runtime |
| examples/formulario-academico.md | 1 | Recorrido hipotético enlazado por README/quickstart/diseño; no es aplicación ni fixture ejecutable |
| tests | 5 | cli.test, docs.test, identity.test, hardening.test y package-smoke; scripts npm y CI los ejecutan |

Dependencias concretas: `bin/specspire.mjs:8–19` declara referencias/etapas/destinos; sources copia templates y Skill; validate-source verifica todos. El runtime no lee docs/, examples/, CONTRIBUTING ni auditorías. `tests/docs.test.mjs` recorre docs, examples, skills y templates, y comprueba cinco rutas específicas desde README. `tests/cli.test.mjs` mantiene expectativas de instalación independientes y comprueba la referencia responsive íntegra. `tests/hardening.test.mjs` copia bin/skills/templates/package.json a fixtures. package-smoke se llama desde npm y CI, no desde node --test. No está huérfano por no terminar en .test.mjs.

No se encontraron archivos funcionales sin consumidor conocido. Las auditorías carecen de consumidor de ejecución, pero tienen lectores humanos y valor histórico: no son código muerto. Las guías no necesitan un consumidor runtime para justificar su existencia. El reconocimiento de Skills por agentes remotos sigue NOT VERIFIED.

## 4. Clasificación por archivo o grupo

Categorías aplicadas a la organización del repositorio, separadas de qué entra en npm. Riesgo y pruebas futuras se detallan también en sección 12.

| Ubicación actual | Clase / propuesta | Razón y riesgo | Dependencias afectadas |
|---|---|---|---|
| README.md | SIMPLIFY, conservar ruta | Sacar protagonismo de publicación y acortar fases repetidas; no perder propuesta, instalación ni advertencias | Tests docs/identity, enlaces npm |
| README.es.md | SIMPLIFY, conservar ruta | Mantener entrada española equivalente, compartir destinos de instrucciones; evitar deriva bilingüe | Identity, lectores españoles |
| package.json | KEEP; ajustar files por separado | Contrato npm/bin/scripts/versiones. Sin dependencias no se justifica añadir lockfile solo por apariencia | npm pack, CLI que lee versión, smoke, CI |
| .gitignore | KEEP | Exclusiones útiles; no es detector completo de secretos | Git; npm debe tener política propia |
| LICENSE | KEEP | Obligación legal y vínculo desde README | Distribución y atribución |
| CHANGELOG.md | KEEP | Historial de versión; agregar cambios reales en siguiente edición autorizada, sin reescribir resultados históricos | Lectores/releases; versión |
| CONTRIBUTING.md | KEEP | Verificaciones y límites para colaboradores; ya es breve | README y comandos de CI |
| SECURITY.md | KEEP | Riesgos y reporte; concretar canal privado cuando exista | README, usuarios del paquete |
| .github/workflows/ci.yml | KEEP | Matriz y gate contra BLOCKED, no ceremonia ornamental | Scripts npm y runner |
| bin/specspire.mjs | KEEP | 256 líneas no justifican una jerarquía src/lib; funciones delimitan tareas | Todos los comandos, rutas y seguridad |
| skills/specspire/SKILL.md | KEEP | Router y gates comunes; no debe absorber detalles de los anexos | CLI valida enlaces, tests y agentes |
| references/00-prepare.md | KEEP | Constitución/contexto; salida distinta a spec | Skill, PROJECT |
| references/01-specify.md | KEEP | Requisitos y aceptación | Skill, spec, plan |
| references/02-plan-design.md | KEEP | Stack/arquitectura; delega detalle visual y responsive | Skill, plan/design |
| references/02-ui-quality.md | KEEP | Dirección artística y calidad visual, no adaptabilidad técnica | Diseño/implementación/review |
| references/02-responsive-cross-platform.md | KEEP | Rama técnica y gate por plataforma; más extenso pero condicional | 4 referencias, Skill, CLI, tests, docs/DESIGN |
| references/03-tasks.md | KEEP | Dependencias y cortes verticales | Skill, tasks |
| references/04-implement.md | KEEP | TDD e implementación incremental | Skill, código/calidad |
| references/05-converge.md | KEEP | Verificación contra requisitos y bucle correctivo | Skill, review |
| references/06-deliver.md | KEEP | Handoff y reproducibilidad | Skill y README del producto |
| references/07-maintain.md | SIMPLIFY, mantener nombre | Resumir el caso bug y remitir a 09-debugging; conservar alcance/refactor | Routing, expectativas de 14 referencias |
| references/08-code-quality.md | KEEP | Disciplina transversal de código | Implementación y convergencia |
| references/09-debugging.md | KEEP | Fuente canónica del diagnóstico | Skill y futura remisión desde 07 |
| references/10-security-operations.md | KEEP | Amplio por riesgo, breve; no hay evidencia que justifique dividir | Convergencia y controles |
| references/11-agent-collaboration.md | KEEP | Opcional, aislamiento/integración; evita cargarlo para tareas pequeñas | Skill y 03-tasks |
| templates/AGENTS.md | SIMPLIFY | Repite TDD, UI, stack, evidencia de Skill; conservar enlace, prioridad y reglas mínimas | Init, personalizaciones existentes, tests |
| templates/PROJECT.md | KEEP | Contexto/constitución del usuario, diferente de política del agente | Init, next, feature |
| templates/README-DESARROLLO.md | KEEP | Guía instalada, necesaria sin acceder al repositorio fuente | Init, next y test de fases |
| templates/feature/spec.md | KEEP | Requisitos | feature new/plan/design |
| templates/feature/plan.md | KEEP | Solución y stack | feature plan/tasks |
| templates/feature/design.md | KEEP | UI/matriz; condicional, no vaciar por ser opcional | feature design/tasks/next |
| templates/feature/tasks.md | KEEP | Trabajo trazable | feature tasks/review |
| templates/feature/review.md | KEEP | Evidencia, no equivalente a tareas | review y gate responsive |
| docs/QUICKSTART.md | KEEP | Procedimiento de inicio y resolución de problemas | README, WORKFLOW, CLI |
| docs/CLI.md | KEEP | Referencia operativa de comandos | README/quickstart y usuarios |
| docs/WORKFLOW.md | SIMPLIFY | Tabla canónica humana y cambios de fase; reducir prosa duplicada de QUALITY | README, quickstart, QUALITY |
| docs/QUALITY.md | SIMPLIFY | Evidencia canónica; unificar vocabulario con estados actuales sin perder controles | WORKFLOW, DESIGN y README |
| docs/DESIGN.md | KEEP | Entrada humana con enlace al estándar, distinto al protocolo del agente | README, QUALITY, ejemplo |
| docs/ARCHITECTURE.md | KEEP | Mapa para colaboradores; no hace falta wiki adicional | README |
| docs/REFERENCIAS.md | KEEP | Atribuciones y fuentes; no es otra dependencia instalada | README y lectores |
| docs/PUBLISH.md | KEEP en A; MOVE opcional en B a docs/maintainers/PUBLISH.md | Audiencia mantenedor; mover ahora cuesta enlaces sin ganancia funcional | Ambos README, tests de links, empaquetado |
| docs/audits/ (4 previos) | KEEP como archivo histórico; excluir de npm | Evidencia fechada, no reglas activas. Sanear ruta personal sin borrar conclusiones | Pack incluye docs; ningún comando runtime los lee |
| examples/formulario-academico.md | KEEP | Onboarding concreto y declarado hipotético; aún no es piloto demostrado | README/QUICKSTART/DESIGN |
| tests/cli.test.mjs | KEEP | Contratos de instalación/etapas, no eliminar por solapamiento parcial | npm test, CLI |
| tests/docs.test.mjs | KEEP | Enlaces/enrutamiento/documentos; ajustar referencias si se reorganiza | npm test y documentación |
| tests/identity.test.mjs | KEEP | Nombre/versión/idiomas: solapamiento pequeño, coste mínimo | package/Skill/README |
| tests/hardening.test.mjs | KEEP | Seguridad, metadatos, concurrencia y BLOCKED estricto | npm test, CI |
| tests/package-smoke.mjs | KEEP | Paquete instalado, frontera distinta a tests de fuente | test:package y CI |

MERGE de archivos y REMOVE CANDIDATE: **ninguno con evidencia suficiente**. NOT VERIFIED se aplica al comportamiento de agentes/instalación remota, no convierte en prescindibles sus archivos. Este informe se agrega al grupo histórico y debe seguir su política de distribución.

## 5. Redundancias confirmadas

1. **Siete fases** en ambos README, docs/WORKFLOW y guía instalada. Dos audiencias justifican la guía instalada; en el repo, WORKFLOW puede ser la explicación canónica y README una síntesis. No unir idiomas ni eliminar onboarding.
2. **TDD, mínimos de stack, UI y evidencia** en templates/AGENTS y Skill. Reducir AGENTS a instrucciones de entrada y autoridad evita dos políticas que puedan divergir. No retirar el enlace a Skill ni reglas de preservación.
3. **Ciclo de bug** en 07-maintain y 09-debugging. El primero debe enrutar; el segundo detallar. Esto permite reducir texto, no borrar una referencia ni cambiar nombres.
4. **Gates humanos** en WORKFLOW/QUALITY/DESIGN. Mantener mapa, protocolo de evidencia y checklist visual separados, pero remitir en vez de repetir procedimientos completos. QUALITY todavía usa estados narrativos mientras el estándar responsive usa PASS/FAIL/BLOCKED/NOT VERIFIED: uniformar su traducción, no reescribir logs anteriores.
5. **Metadatos declarativos repetidos** entre refs de CLI, enlaces de Skill e inventario de tests. Parte es comprobación independiente deliberada; hacer que tests importen exactamente la misma lista puede ocultar omisiones. No introducir generador ni manifiesto nuevo sin un fallo real de mantenimiento.

Las cuatro auditorías repiten resultados para preservar contexto temporal; no fusionarlas como si describieran una sola ejecución. Un enlace desde CONTRIBUTING puede indicar dónde está la evidencia más reciente, sin crear otro documento que vuelva a resumirla. El historial no debe gobernar al agente como instrucciones operativas.

## 6. Arquitectura de la Skill

**Mantener una Skill pública y 14 referencias.** La intención del producto es un flujo integrado, no una colección independiente por framework. Ninguna referencia requiere privilegios, runtime o ciclo de distribución propios que justifique otra Skill. La CLI permanece auxiliar e independiente: copia/valida documentos y no ejecuta la metodología.

El router es entendible; las referencias cortas no son fragmentación inútil si se cargan por fase. El anexo responsive (12.323 bytes) es el mayor: separar ramas nativas en más archivos aumentaría enlaces y cambios al instalador sin evidencia de ahorro suficiente. En cambio, la lectura debe limitarse a UI y a la rama del proyecto; conservar fuente/fecha y límites de hardware.

UI-quality y responsive no duplican responsabilidad: el primero define dirección artística; el segundo geometría, plataformas y evidencia. 04/08 separan ejecución y estándares; 05/06 separan verificación y entrega. 10-security es amplio pero proporcional y compacto. 11-collaboration no se activa por defecto.

Solo Skill: el inicio actual permite contexto en conversación cuando faltan documentos y no presupone CLI. Sin embargo, 00-prepare sigue describiendo PROJECT.md como salida y un prompt que pide completarlo. **Ambigüedad residual**, no rotura de instalación demostrada: aclarar en una futura edición que los artefactos respetan la autorización y documentos existentes definidos en Inicio. La ruta solo Skill y el descubrimiento real mediante npx skills/agentes permanecen **NOT VERIFIED**; la integridad textual no demuestra un piloto. No proponer otra Skill para resolver esto.

## 7. Experiencia README y documentación

La propuesta se entiende rápido: una Skill, flujo de ingeniería y CLI opcional. README principal tiene 104 líneas y enlaces por intención; no necesita otra landing page. Inglés como puerta de entrada y guías en español son una decisión válida si se anuncia claramente; no es soporte internacional íntegro probado.

Mejoras editoriales concretas: conservar un camino local verificable y distinguirlo de comandos remotos pendientes; reducir las tablas de fases en portada; desplazar «publicar este repositorio» al enlace de contribución; explicar idioma de guías y actualización conservadora. El detalle de safe areas, amenazas de filesystem y matrices pertenece a referencias/SECURITY, no al README.

Instalar y actualizar no son lo mismo: init no sobrescribe Skill ni AGENTS existentes. Cualquier cambio de rutas o consolidación tiene que documentar revisión manual de instalaciones previas; repetir init no actualiza sus políticas. El informe responsive ya lo dice, pero esa instrucción debe estar en el quickstart operativo, no depender de leer una auditoría.

No fusionar QUICKSTART con CLI: uno es recorrido, otro consulta. No eliminar el ejemplo por ser hipotético: desarrollar después un piloto verificable aporta más que reemplazarlo por teoría. No recomendar banners/badges adicionales ni un sitio de documentación.

Enlaces locales: prueba ejecutada PASS. Benchmark externo: tres repositorios accesibles; no se probaron todos los enlaces externos de todas las guías, por tanto su disponibilidad completa es NOT VERIFIED.

## 8. Separación GitHub / npm

| Clase | Contenido | Decisión de distribución |
|---|---|---|
| A. Skill | SKILL.md + 14 referencias | Necesario para solo Skill y kit; conservar rutas relativas completas |
| B. CLI | bin/specspire.mjs, package.json, templates y contenido A | Necesario: CLI resuelve archivos desde la raíz del paquete; no mover sin migración |
| C. Desarrollo | 5 tests, workflow, .gitignore | GitHub, fuera de npm (ya ocurre) |
| D. Colaboración/usuario | README, licencia, seguridad, changelog, CONTRIBUTING, docs raíz, ejemplo | No todo es runtime, pero los enlaces locales justifican conservarlo inicialmente |
| E. Histórico | docs/audits/* | GitHub saneado, fuera de npm; sin borrar evidencia |

**Evidencia nueva:** npm pack real, no solo inferencia de files, produjo `specspire-0.9.0-beta.1.tgz`, 44 archivos y 160.818 bytes sin comprimir. Incluye los cuatro informes: 27.558, 12.048, 6.277 y 12.923 bytes respectivamente. No incluye tests/CI. El presente informe no existía al empaquetar y sería un quinto informe distribuido en un próximo pack si no cambia la política.

Propuesta mínima: sustituir `docs/` en files por una selección de guías de usuario raíz (por ejemplo docs/*.md, tras comprobar su resultado real), dejando docs/audits fuera. Conservar CONTRIBUTING y PUBLISH por ahora: eliminarlos del paquete mientras README los enlaza rompería navegación local. No crear .npmignore además de files si una única allowlist basta. Tampoco establecer private:true: eso impediría la futura ruta npm que se quiere conservar.

Excluir también PUBLISH/CONTRIBUTING del paquete es técnicamente posible, pero exige convertir sus enlaces públicos a destinos GitHub válidos o rediseñar navegación. No es la primera limpieza recomendada. Mantener solo una política explícita y verificar ausencias tanto como presencias en el smoke futuro. La edición de files no cambia el contrato de comandos.

## 9. Seguridad de publicación

El informe original, `docs/audits/SPECSPIRE_PRE_RELEASE_AUDIT.md:15`, todavía contiene una ruta de perfil Windows personal. Sanear ese dato a `<workspace>` antes del push público, sin modificar conclusiones ni resultados. No reproducir el nombre del perfil en informes nuevos. Excluir de npm no resuelve la exposición en GitHub.

Las demás auditorías usan mayormente `%TEMP%` y sufijos de fixtures: son evidencia contextual, no credenciales. Mantener fuera logs crudos y archivos temporales. No se accedió a credenciales externas. El escaneo acotado anterior no encontró secretos, pero no se transforma en garantía universal ni en un análisis nuevo exhaustivo de secretos en esta auditoría estructural.

Git sigue mostrando fuentes sin seguimiento; no hay baseline de commits. Para comprobar no modificación se guardaron hashes de los 51 archivos antes de escribir este informe. Los futuros cambios deben revisar también selección staged y contenido npm; Git ignore y npm files tienen propósitos diferentes.

## 10. Dos estructuras propuestas

### A. Minimal Professional — recomendada

```text
specspire/
├── README.md, README.es.md
├── package.json, .gitignore
├── LICENSE, SECURITY.md, CONTRIBUTING.md, CHANGELOG.md
├── .github/workflows/ci.yml
├── bin/specspire.mjs
├── skills/specspire/
│   ├── SKILL.md
│   └── references/                 # las 14 actuales
├── templates/
│   ├── AGENTS.md, PROJECT.md, README-DESARROLLO.md
│   └── feature/                    # las 5 actuales
├── tests/                          # los 5 actuales
├── examples/formulario-academico.md
└── docs/
    ├── QUICKSTART.md, CLI.md, WORKFLOW.md, QUALITY.md
    ├── DESIGN.md, ARCHITECTURE.md, REFERENCIAS.md, PUBLISH.md
    └── audits/                     # evidencia histórica; solo GitHub
```

Diferencia real: ninguna ruta cambia; seis documentos reducen duplicación y files deja de incluir auditorías. Saneamiento de la ruta personal y aclaraciones de actualización/idioma dentro de documentos existentes. Sin generadores ni configuración adicional.

### B. Maintainable Open Source — alternativa, no recomendada ahora

```text
specspire/
├── raíz, .github/, bin/, skills/, templates/, tests/, examples/
│   # mismos archivos y contratos que A
└── docs/
    ├── QUICKSTART.md, CLI.md, WORKFLOW.md, QUALITY.md
    ├── DESIGN.md, ARCHITECTURE.md, REFERENCIAS.md
    ├── maintainers/PUBLISH.md       # único movimiento físico
    └── audits/                     # archivo histórico, fuera de npm
```

La separación de mantenedores sería útil si aparecen más procedimientos operativos. Hoy mover un único documento obliga a cambiar ambos README, enlaces, inventario del paquete y referencias históricas donde sean enlaces activos. Si se excluye de npm, README debe enlazar su versión GitHub; si se conserva, files debe incluir la nueva ubicación. No introducir un stub permanente y dos fuentes de instrucciones sin necesidad. Auditorías conservan rutas para evitar migraciones innecesarias.

## 11. Recomendación definitiva

Adoptar **A: Minimal Professional**. Los cinco cambios de mayor valor son:

1. Excluir docs/audits de npm mediante files y una aserción explícita del contenido empaquetado.
2. Sanear la ruta personal del informe original manteniendo evidencia histórica.
3. Simplificar README inglés/español y separar instalación/uso de mantenimiento/publicación, conservando enlaces operativos.
4. Reducir reglas duplicadas de templates/AGENTS y remitir el ciclo bug de 07-maintain a 09-debugging; mantener 14 referencias.
5. Alinear WORKFLOW/QUALITY, aclarar actualización conservadora y resolver la ambigüedad de artefactos en modo solo Skill; no añadir más documentos.

Riesgo de reorganización: enlaces rotos, recursos omitidos del paquete, instalaciones existentes que no reciben el nuevo router y tests debilitados al centralizar sus expectativas. Cambiar nombres/número de referencias afecta código, frontmatter/enlaces, inventario instalado y doctor. Evitar esos cambios proporciona más valor que una reducción nominal de archivos.

## 12. Plan de limpieza de mínimo riesgo

No aplicado; requiere autorización posterior.

| Orden / propuesta | Verificación necesaria después del cambio |
|---|---|
| 1. Sanear dato personal, conservar informes | Escaneo acotado sin imprimir secretos, revisión de diff y `node --test tests/docs.test.mjs` |
| 2. Cambiar files para excluir auditorías | `npm.cmd run test:package`, listado real del tarball; comprobar 14 referencias y 8 plantillas presentes, auditorías ausentes, enlaces locales del paquete conservados |
| 3. Simplificar los seis documentos | `npm.cmd test`, `npm.cmd run check`; revisar manualmente el recorrido español/inglés y gates, no solo presencia de palabras |
| 4. Aclarar actualización y solo Skill | Pruebas documentales y piloto autorizado en proyecto vacío/existente sin CLI; declarar NOT VERIFIED hasta observar agente |
| 5. Si se elige B contra recomendación | Actualizar consumidores de PUBLISH, repetir enlaces sobre fuente y paquete, smoke y revisión de URL pública antes de retirar ruta |
| Cierre de cualquier limpieza | Suite completa, check, smoke y CI estricta remota; preservación de archivos, seguridad de enlaces, idempotencia y CLI completa |

**Verificaciones ejecutadas en esta auditoría:** inventario recursivo y dependencias; benchmark GitHub; pack real PASS; `node --test tests/docs.test.mjs`: 5 PASS; `npm.cmd run check`: PASS, una Skill/14 referencias. No se repitió la suite funcional completa ni instalación del tarball: su última evidencia sigue siendo el informe final pre-push (45 PASS, 0 FAIL, 3 BLOCKED); no se presenta como resultado nuevo. CI remota, agentes y hardware responsive siguen NOT VERIFIED.

El único archivo nuevo del repositorio es este informe. No se movieron/eliminaron documentos, modificó código, instaló dependencia, realizó commit ni ejecutó push.

**MINOR CLEANUP RECOMMENDED**
