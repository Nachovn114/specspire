# Inicio rápido — VS Code

**Objetivo:** que una carpeta vacía termine con una guía clara de desarrollo. No se instala un framework por adelantado.

**Necesitas:** Git y Node.js 20+ si vas a usar la CLI; un agente compatible con Skills si quieres asistencia de IA.

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
| **Kit completo, copia local** | `AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md` y la Skill en `.agents/skills/specspire/` | Verificado localmente con la suite de tests |
| **Solo Skill** | Solo `SKILL.md` y sus 14 referencias, sin CLI ni documentos de proyecto | Reconocimiento por cada agente sin verificar |
| **Comandos remotos** (`npx skills add`, `npm exec github:`) | Las mismas dos modalidades, desde GitHub | Sin verificar hasta publicar el repositorio |

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

## 5. Verifica la entrega

Pide al agente que ejecute los comandos **del proyecto real** (tests, lint, build, pruebas en navegador cuando aplique), revise el cumplimiento de requisitos y deje constancia de lo que no pudo ejecutar. El protocolo está en [Controles de calidad](QUALITY.md).

**Ejemplo:** [Formulario académico paso a paso](../examples/formulario-academico.md).

## Actualizar una instalación previa

`init` no reemplaza una Skill ni un `AGENTS.md` existentes, así que repetirlo **no actualiza** sus contenidos. Para actualizar de forma controlada desde la carpeta del proyecto:

1. Revisa el [CHANGELOG](../CHANGELOG.md) de la nueva versión.
2. Instala una copia limpia en una carpeta temporal y compárala con la tuya:

   ```powershell
   $nuevo = Join-Path $env:TEMP ('specspire-' + (Get-Date -Format 'yyyyMMddHHmmss'))
   node ..\Specspire\bin\specspire.mjs init --target $nuevo
   git diff --no-index .agents\skills\specspire "$nuevo\.agents\skills\specspire"
   ```

3. Si aceptas los cambios, copia la Skill nueva y ejecuta `doctor`:

   ```powershell
   Copy-Item -Recurse -Force "$nuevo\.agents\skills\specspire\*" .agents\skills\specspire\
   node ..\Specspire\bin\specspire.mjs doctor
   ```

4. Integra a mano lo que te interese de `$nuevo\AGENTS.md` en tu `AGENTS.md`; tus reglas propias se conservan. `PROJECT.md` y `README-DESARROLLO.md` son tuyos: no los reemplaces.

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
