# Specspire — Final Pre-Push Quality Gate

Fecha: 2026-10-31. Versión: **0.9.0-beta.1**. Objetivo exclusivo: preparar el primer commit/push para ejecutar CI; no aprobar un release público.

## 1. Veredicto ejecutivo

**READY WITH CONDITIONS FOR FIRST PUSH**.

El código y el paquete local permiten avanzar al primer push de validación. La condición previa al **push público** es sanear la ruta de perfil personal contenida en `docs/audits/SPECSPIRE_PRE_RELEASE_AUDIT.md:15`, reemplazándola por una ruta genérica, o excluir ese informe de la publicación. No se aplicó ninguna corrección: esta revisión solo añade el presente informe.

La suite actual registra **45 PASS, 0 FAIL y 3 BLOCKED**. No significa cobertura completa: los symlinks nativos Windows siguen sin poder crearse localmente. CI está configurada para rechazarlos si vuelven a quedar bloqueados. Esos casos justifican ejecutar CI en runners apropiados y no impiden por sí solos subir fuentes para validación.

No se identificó otro defecto funcional concreto que deba corregirse antes de ese primer push. No se autoriza publicación npm, tags, releases ni anuncios de compatibilidad multiplataforma o responsive comprobada.

## 2. Estado real de Git y alcance

- Rama actual `main`, sin commits: `git log -1` informa que la rama aún no tiene commits.
- `git ls-files` no devuelve archivos: índice vacío. Todos los archivos del producto están sin seguimiento; no hay cambios staged.
- `git diff --stat` vacío no demuestra ausencia de trabajo local: todo el árbol es nuevo. El inventario examinó **50 archivos**, excluyendo metadatos internos `.git`, antes de crear este informe; con él son 51.
- `git status --ignored --short` no mostró artefactos ignorados presentes en el repositorio. No se ejecutó add, commit, push, tag ni comandos de configuración.
- Se revisaron los tres informes anteriores, package.json, workflow, Skill, instrucciones de instalación/publicación, tests y el inventario público. Se comprobaron versión, enlaces locales e integridad mediante ejecución.
- No se consultaron almacenes de credenciales, configuración global ni secretos fuera del árbol público. Acceso al remoto, identidad de commit y configuración real de GitHub: **NOT VERIFIED**.

Los informes originales son registros históricos: sus cifras de 13 referencias y resultados anteriores no deben sustituirse por cifras actuales como si hubieran sido observadas entonces.

## 3. Resultados ejecutados

Entorno local de esta revisión: Windows / PowerShell, Node 24.19.0 y npm 11.17.0, según el entorno de trabajo verificado en las etapas previas. Se utiliza npm.cmd sin alterar políticas globales.

| Control | Resultado | Evidencia |
|---|---|---|
| `npm.cmd test` | 45 PASS / 0 FAIL / 3 BLOCKED | 48 tests, 3 skips explícitos por EPERM, duración aproximada 4,2 s |
| `npm.cmd run check` | PASS | 1 Skill, 14 referencias, 3 plantillas de instalación y 5 progresivas |
| `npm.cmd run test:package` | PASS | 43 archivos empaquetados antes de crear este informe; instalación offline dos veces y ejecución del bin instalado |
| Listado real `tar -tf` del tarball | PASS | Incluye `package/skills/specspire/references/02-responsive-cross-platform.md` y las otras 13 referencias |
| `validate-source` de la CLI instalada | PASS | Confirma 14 referencias y las cinco plantillas progresivas |
| `doctor` de la CLI instalada sobre el proyecto del smoke | PASS | 18 archivos utilizables; aviso esperado porque AGENTS.md personalizado no enlaza la Skill |
| Prueba deliberada en modo estricto | FAIL por 3 BLOCKED | Proceso con `SPECSPIRE_REQUIRE_NATIVE_LINKS=1`: salida 1, 0 PASS, 3 FAIL, 0 skips |
| Enlaces locales y contrato responsive | PASS | Incluidos en la suite; no certifica enlaces remotos ni ejecución de UI |
| GitHub Actions / Linux / macOS / otros Node | NOT VERIFIED | No se ejecutó ningún workflow remoto |

El modo estricto se ejercitó con un proceso hijo, sin cambiar variables globales, usando `node --test --test-name-pattern="native symlink" tests/hardening.test.mjs`. Su resultado negativo es esperado para probar que el gate rechaza un bloqueo; no se convierte en aprobación de los controles nativos.

## 4. Smoke actualizado y contenido del paquete

Artefactos de esta ejecución: `%TEMP%/specspire-package-SBu5GZ/`, tarball `specspire-0.9.0-beta.1.tgz`. Se conservaron fuera del repositorio para inspección.

El smoke ejecutó pack con caché aislada, instaló el tarball dos veces offline y verificó el shim npm instalado: ayuda, validate-source, init repetido, doctor, next y feature new repetido. Preservó AGENTS.md personalizado y el contenido previo de spec.md. El paquete no declara dependencias runtime. La revisión adicional ejecutó validate-source y doctor directamente desde el paquete instalado y listó el tarball real.

Inventario de distribución: package.json, bin, única Skill y 14 referencias, ocho plantillas, documentación, ejemplo, licencia y políticas. No contiene tests, workflow, caché, node_modules ni el directorio .git. Contiene **los tres informes de auditoría anteriores**, porque package.files incluye docs/. Por tanto, también distribuye la ruta personal identificada. El presente informe no estaba en el tarball ya probado; un pack posterior lo incluirá y tendrá 44 archivos si no cambia ningún otro archivo. Esta diferencia documental no se presenta como un smoke ejecutado de ese futuro paquete.

## 5. Seguridad de contenido público y exclusiones

Se recorrieron los 50 archivos públicos, incluidos ocultos fuera de `.git`, buscando nombres de archivos sensibles y patrones de claves privadas, formatos habituales de tokens GitHub/AWS/API, asignaciones de contraseñas/tokens, correos y rutas de perfiles locales. Solo se imprimieron ubicaciones y categorías de coincidencias, no valores potencialmente secretos.

**PASS acotado:** no hubo coincidencias de credenciales, claves privadas, correos ni nombres sensibles como .env, .npmrc, credentials, archivos key/pem, logs o tarballs en ese inventario. No es una certificación exhaustiva: formatos desconocidos y secretos que parezcan texto ordinario pueden escapar al escaneo. No existe historial de commits local que escanear.

| Archivo o categoría | Resultado / acción antes de publicar |
|---|---|
| `docs/audits/SPECSPIRE_PRE_RELEASE_AUDIT.md:15` | FAIL del criterio de minimización de datos: contiene nombre de perfil del sistema y ruta absoluta. Sanear a `<workspace>` o excluir el informe antes de un push público. Es dato contextual personal, no credencial; no requiere rotación de secretos |
| `docs/audits/SPECSPIRE_REMEDIATION_REPORT.md` | Conserva referencias genéricas `%TEMP%` y sufijos de fixtures; no se detectó credencial ni nombre de perfil. Puede mantenerse como evidencia histórica |
| `docs/audits/SPECSPIRE_RESPONSIVE_STANDARD_REPORT.md` | Puede mantenerse: fuentes, resultados y limitaciones; no se detectó información sensible |
| Identificador del repositorio GitHub en README/package.json | Identidad pública intencional y consistente, no token. Confirmar que corresponde al repositorio elegido antes del push |
| `.env`, variantes, logs, tgz, node_modules | Mantener excluidos. `git check-ignore --no-index` confirmó las reglas; .env.example es la excepción deliberada y no está presente |
| Artefactos del smoke y caché | Fuera del repositorio, no subirlos ni agregarlos forzadamente |
| Metadatos `.git` | No son parte de los archivos a publicar; no copiarlos dentro de ZIPs o paquetes |

`.gitignore` no es un detector universal de secretos y no cubre todos los nombres posibles (.npmrc, pem, etc.). No se encontraron esos archivos; su ausencia no exige agregar reglas como condición de este push. Revisar el inventario staged cuando se autorice crear el commit, especialmente si aparecen archivos nuevos después de este informe.

Excluir un informe de Git por sí solo no garantiza excluirlo de npm si permanece bajo docs/ y package.files lo incluye: revisar también el inventario real de un futuro pack. Sanear el dato en origen evita esa diferencia. No se modificaron ignore ni metadatos de distribución sin autorización.

## 6. CI y tres controles nativos bloqueados

**PASS de configuración y prueba local del gate:** matriz Ubuntu/Windows/macOS × Node 20.0.0/22/24; `permissions: contents: read`; `SPECSPIRE_REQUIRE_NATIVE_LINKS: '1'`; npm test, check y test:package; job agregado `required` con `if: always()` que falla si el resultado de la matriz no es success. No hay continue-on-error ni ruta de publicación.

En `tests/hardening.test.mjs`, el catch de capacidad de symlink falla si existe CI o si la variable estricta vale 1; solo fuera de ese modo permite un skip explícito BLOCKED por capacidad conocida en Windows. Se reprodujo la salida no cero. El workflow remoto y la protección de rama siguen **NOT VERIFIED**; configurar un job no equivale a haberlo ejecutado ni a exigirlo mediante branch protection.

Los tres BLOCKED son directorio nativo, archivo nativo y archivo nativo colgante. EPERM ocurre creando el fixture antes de ejercitar la protección. Las junctions y las pruebas de raíces, ancestros y destinos finales sí pasaron. Riesgo residual: falta evidencia de los tres casos nativos y de equivalencia por plataforma. No debilitar las aserciones si fallan en GitHub: identificar la capacidad del runner y obtener uno adecuado.

Riesgos de primera ejecución que deben resolverse en Actions: disponibilidad de Node mínimo en cada imagen, permisos efectivos para enlaces, diferencias de filesystem/shell y smoke en Unix. Si un job falla, pasos posteriores pueden no ejecutarse; esos pasos serán NOT VERIFIED, nunca PASS. La matriz no prueba todas las versiones futuras admitidas por engines >=20.

## 7. Consistencia y documentación

**PASS:** package.json, prueba de identidad y versión de la CLI coinciden en 0.9.0-beta.1; la CLI toma versión del paquete. Una Skill, 14 referencias, tres documentos de bootstrap y cinco plantillas de feature. Init instala **18 archivos** (3 + 1 + 14). Las cinco plantillas de feature se crean bajo demanda, no durante init.

**PASS:** enrutamiento responsive condicionado a UI, integrado en planificación, implementación y convergencia. No constituye evidencia de dispositivos, safe areas físicas, teclado real ni cumplimiento integral de WCAG. Esas validaciones siguen NOT VERIFIED hasta probar una aplicación real.

**PASS con límites:** los README distinguen Skill-only y kit; los comandos locales funcionan y los remotos se presentan como pendientes. GitHub install, npx skills, descubrimiento de agentes y piloto real son NOT VERIFIED. No se ejecutó código remoto descargado. La guía PUBLISH contiene pasos de release como trabajo posterior; este gate no autoriza ejecutarlos.

Las cifras anteriores de 13 referencias y 43 PASS en auditorías históricas son evidencia de versiones previas del árbol, no errores de runtime actual. Mantener fecha y contexto. La documentación de seguridad ya reconoce la carrera de sustitución hostil de ancestros; la exclusión de escritura final no equivale a un sandbox del sistema operativo. Ese límite documentado no bloquea subir fuentes para revisión.

## 8. Condiciones previas y controles posteriores

Antes del primer push público:

1. Autorizar y efectuar saneamiento de la ruta personal del informe original, o excluirlo deliberadamente de Git y de futuros paquetes.
2. Revisar la selección staged del primer commit; comprobar que incluye workflow, fuentes, tests, 14 referencias y documentación esperada, sin archivos privados añadidos posteriormente.
3. Confirmar remoto/visibilidad e identidad del commit por el propietario. Esta sesión no leyó credenciales ni configuró esos datos.

Inmediatamente después del push autorizado:

1. Revisar las nueve combinaciones de Actions y el job required; registrar resultados, fallos, bloqueos y pasos no ejecutados.
2. Exigir ejecución de los tres tests nativos sin skips en los runners; conservar pruebas de rechazo y ausencia de escrituras externas.
3. Confirmar smoke de tarball y 14 referencias en cada combinación; validar checkout y saltos de línea en Windows.
4. Configurar required como control obligatorio de PR y comprobar su comportamiento frente a fallo/cancelación.
5. Habilitar/revisar escaneo de secretos y canal privado de reporte de vulnerabilidades; revisar renderizado y enlaces GitHub.
6. Validar comandos remotos contra una revisión identificada y realizar pilotos de agentes antes de recomendar uso general. La evaluación responsive requiere dispositivos/simuladores y navegadores apropiados, no solo CI de la CLI.

No se encontró una necesidad de instalar herramientas globales, cambiar arquitectura, agregar dependencias o alterar Windows. No se aplicaron correcciones ni se publicaron cambios.

**READY WITH CONDITIONS FOR FIRST PUSH**
