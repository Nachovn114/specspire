# Inicio rápido — VS Code

**Objetivo:** que una carpeta vacía termine con una guía clara de desarrollo. No se instala un framework por adelantado.

**Necesitas:** Git y Node.js 20+ si vas a usar la CLI; un agente compatible con Skills si quieres asistencia de IA.

Fase 3 implementada y validada localmente en `feat/english-project-templates`, sin fusionar en `main` ni publicar. GitHub Actions y la matriz Node 20.0.0/22/24 en Windows, Linux y macOS siguen pendientes para Fase 3. La versión histórica v0.9.0-beta.1 no incluye esta funcionalidad.

Hay ocho plantillas originales ES y ocho contrapartes EN. `init` instala 34 archivos, no 42: tres documentos del idioma elegido, un router y 30 referencias. El tarball local de Fase 3 contiene 68 archivos; el de Fase 2 contenía 60. El idioma predeterminado es español. Usa `init --lang en` y repite `--lang en` en cada comando `feature`. No hay persistencia ni inferencia de idioma; los documentos existentes se conservan y no se traducen automáticamente.

Idioma: preferencia explícita → petición/contexto inequívocos → español por defecto. Cargar solo referencias pertinentes en el idioma seleccionado; comparar ambas únicamente por traducción, auditoría de equivalencia o mantenimiento bilingüe explícitos.

## 1. Abre el proyecto

En VS Code, abre una carpeta nueva o existente. En Windows:

```powershell
mkdir MiProyecto
cd MiProyecto
code .
```

## 2. Elige cómo instalar Specspire

| Modalidad | Qué obtienes | Estado |
|---|---|---|
| **Kit completo, copia local** | `AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md` y la Skill en `.agents/skills/specspire/` | Fase 2 integrada; Fase 3 validada localmente en la rama, CI pendiente |
| **Solo Skill (local o manual)** | Solo `SKILL.md` y sus 30 referencias (15 ES + 15 EN), sin CLI ni documentos de proyecto | Integrado en `main` (PR #5); evaluado con agentes en Fase 2 (sin publicar en npm) |
| **Remoto: Solo Skill** (`npx skills add`) | Instala la Skill en `.agents/skills/specspire/` desde GitHub | Evidencia histórica v0.9.0-beta.1 (15 ES); instalación remota bilingüe sin verificar |
| **Remoto: Kit completo** (`npm exec github:`) | Instala el kit completo desde el repositorio de GitHub | Sin verificar de extremo a extremo |

**Kit completo.** Con Specspire descargado en una carpeta hermana:

```powershell
node ..\Specspire\bin\specspire.mjs init
node ..\Specspire\bin\specspire.mjs doctor
```

`init` copia tres documentos y la Skill, sin modificar código existente. Repetirlo solo agrega archivos faltantes: nunca sobrescribe los existentes. `doctor` revisa archivos, no ejecuta tests de la aplicación.

**Solo Skill.** Copia la carpeta `skills/specspire/` completa (con `references/`) a la ubicación de Skills que use tu agente; consulta su documentación. No ejecutes los pasos de terminal de esta guía salvo que también decidas instalar el kit.

## 3. Activa la Skill e indica qué vas a construir

Con el kit, completa brevemente `PROJECT.md` o pide al agente que lo haga con los requisitos que le proporciones:

```text
Activa specspire. Lee AGENTS.md, PROJECT.md y README-DESARROLLO.md.
Este es el enunciado: [pega la rúbrica o describe el proyecto].
Propón un alcance mínimo y detecta requisitos ambiguos.
Dime solo la primera tarea y cómo comprobarla.
```

**Si faltan los documentos de contexto** (solo Skill o proyecto existente sin kit), indica la ruta real de `SKILL.md`:

```text
Usa la Skill specspire ubicada en [ruta a SKILL.md].
Mi objetivo es: [descripción]. Restricciones: [stack, plazos, rúbrica].
Establece el contexto en esta conversación y dime la siguiente acción.
No crees archivos sin preguntarme.
```

El agente mantiene el contexto en el chat y solo propone guardar un documento si tú lo autorizas.

## 4. Sigue la guía, sin saltar etapas

Abre `README-DESARROLLO.md`; marca cada casilla después de comprobar la evidencia. Para conocer el siguiente paso documental:

```powershell
node ..\Specspire\bin\specspire.mjs next
```

Para iniciar una funcionalidad **una vez que definiste el contexto**:

```powershell
node ..\Specspire\bin\specspire.mjs feature new formulario-contacto
```

Abre `specs/formulario-contacto/spec.md`, complétalo con el agente y revísalo antes de planificar.

Completa y revisa cada requisito previo antes de avanzar; design solo aplica con UI. Usa la CLI local de esta rama. Si no está en PATH, reemplaza `specspire` por `node ../Specspire/bin/specspire.mjs`. `init --lang es` equivale a init sin flag; para inglés usa --lang en en init y en cada feature.

```bash
specspire feature plan formulario-contacto
specspire feature design formulario-contacto
specspire feature tasks formulario-contacto
specspire feature review formulario-contacto
```

## 5. Verifica la entrega

Pide al agente que ejecute los comandos **del proyecto real** (tests, lint, build, pruebas en navegador cuando aplique), revise el cumplimiento de requisitos y deje constancia de lo que no pudo ejecutar. El protocolo está en [Controles de calidad](QUALITY.md).

## Actualizar una instalación previa

`init` nunca sustituye `SKILL.md`, referencias existentes ni documentos de proyecto. Un router heredado reconocido produce código 2 en `doctor`, antes y después de añadir EN; solo la instalación bilingüe válida produce 0. Archivos faltantes/inválidos producen 1. Un router antiguo personalizado puede no coincidir con la huella heredada conocida: revisarlo manualmente, sin asumir que sea una versión antigua válida.

1. Revisa el [CHANGELOG](../CHANGELOG.md) y selecciona la revisión local deseada. Detén ediciones del agente durante la migración. Usa rutas físicas; inspecciona origen, destino y ancestros por symlinks/junctions. No eludas protecciones ni uses rutas de traversal.
2. Antes de cambiar archivos instalados, respalda íntegramente `.agents/skills/specspire/` (incluidos directorios ocultos) y los tres documentos de proyecto en un directorio físico nuevo y separado. Verifica el contenido del respaldo y registra su ubicación; no reutilices un destino de respaldo existente.
3. Crea una instalación limpia para comparar:

   ```powershell
   $nuevo = Join-Path $env:TEMP ('specspire-review-' + [guid]::NewGuid().ToString())
   node ../Specspire/bin/specspire.mjs init --target $nuevo
   git diff --no-index .agents/skills/specspire "$nuevo/.agents/skills/specspire"
   ```

   Revisa los resultados: código 1 de `git diff --no-index` significa diferencias, no instalación fallida. Detente ante errores reales de comandos.
4. Ejecuta `init` de la CLI local seleccionada sobre el proyecto para añadir solo faltantes. Compara cada referencia existente y el router contra la copia limpia. Integra los cambios aceptados archivo por archivo, preservando personalizaciones deliberadas. Integra el protocolo bilingüe y los 30 enlaces en un router antiguo personalizado; no reemplaces el directorio en bloque. Conserva el contenido propio de `AGENTS.md`, `PROJECT.md` y `README-DESARROLLO.md`.
5. Ejecuta `node ../Specspire/bin/specspire.mjs doctor` y revisa `$LASTEXITCODE`: 0 acredita el contrato documental bilingüe; 2 indica router pendiente; 1 exige corregir los archivos faltantes/inválidos informados. Inspecciona el diff final y conserva el respaldo. Si necesitas revertir, restaura solo archivos revisados desde el respaldo y repite el diagnóstico; restaurar un router heredado no completa el contrato bilingüe.

## Problemas habituales

| Situación | Acción |
|---|---|
| `node` no está disponible | Instala Node.js 20+ o usa un entorno ya preparado |
| PowerShell bloquea `npm.ps1` o `npx.ps1` | Usa `npm.cmd` o `npx.cmd` (por ejemplo `npm.cmd --version`), sin cambiar políticas globales |
| `AGENTS.md` ya existe | Specspire no lo pisa; añade el enlace a `.agents/skills/specspire/SKILL.md` manualmente |
| El agente no reconoce la Skill | Indícale explícitamente la ruta de `SKILL.md`; verifica compatibilidad con ese agente |
| Ya tienes Spec Kit oficial | Usa sus artefactos; Specspire no creará otro árbol paralelo de especificaciones |
| Un comando indica `TODO` | Completa y revisa esa etapa antes de continuar |
| `doctor` indica instalación incompleta o corrupta | Revisa los archivos indicados; `init` repone faltantes pero conserva existentes. Repara conflictos deliberadamente |
| Destino inseguro (symlink) | Usa una ruta física sin enlaces en sus ancestros; no desactives la protección |

[Volver al README](../README.es.md) · [Referencia de la CLI](CLI.md) · [Flujo de desarrollo](WORKFLOW.md)

Un router anterior puede ser estructuralmente válido sin documentar Fase 3. Doctor no detecta todas las diferencias entre revisiones documentales. Compara el router manualmente. Cambiar --lang conserva documentos existentes y puede dejar idiomas mezclados; integra traducciones deliberadamente después del respaldo.
