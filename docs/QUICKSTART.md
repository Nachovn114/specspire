# Inicio rápido — Guía de instalación y primer uso

[English](en/QUICKSTART.md) · [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)

**Objetivo:** Guiar a un agente de IA desde una carpeta vacía o proyecto existente hasta una entrega verificable y disciplinada, sin sobreingeniería previa.

**Requisitos previos:**
- **Node.js:** Versión `>= 20.0.0` (Node 20 técnicamente compatible pero en estado EOL desde abril de 2026; Node 22 y 24 LTS comprobados en CI; Node 26 versión actual sin verificar) para la CLI de Specspire y scripts de verificación.
- **Instalador de Skills:** Node.js `>= 22.20.0` si utilizas `npx skills add` (requisito independiente de la herramienta oficial `skills`).
- **Git:** Instalado y accesible en terminal.
- **Agente de IA:** Cualquier entorno compatible con el estándar Agent Skills (T3 Code, Antigravity, Claude Code, Cursor, Codex, Windsurf, Cline, etc.).

---

## Elige tu modalidad de instalación

Specspire ofrece dos vías de adopción complementarias:

| Modalidad | Qué obtienes | Para quién es |
|---|---|---|
| **Vía A: Solo Skill** (`npx skills add`) | Instala `SKILL.md` y 30 referencias técnicas (15 ES + 15 EN) en el directorio de skills del agente. No instala la CLI propia ni crea `PROJECT.md`/`AGENTS.md`. | Desarrolladores que desean asistencia guiada en el chat sin añadir CLI ni plantillas Markdown a su repositorio. |
| **Vía B: Kit completo** (`init` local) | Instala la Skill + CLI de Specspire (`init`, `doctor`, `next`, `feature`) + hasta 34 archivos de proyecto (3 documentos base + 31 archivos de Skill). Dispone de 10 plantillas progresivas de funcionalidades (16 plantillas en total en el kit). Preserva archivos existentes. | Equipos que buscan gobernanza documental persistente (`PROJECT.md`, `AGENTS.md`, `specs/`). |

---

## Vía A — Solo Skill (Recomendada para chat de agentes)

### 1. Instalación mediante Skills CLI

Ejecuta en la raíz de tu proyecto o en tu entorno de desarrollo:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

El instalador detecta el agente disponible o permite especificar el agente mediante la opción oficial `--agent <agente>` (por ejemplo `--agent claude-code`, `--agent cursor`, `--agent codex`):

```bash
# Ejemplo: especificar agente concreto o instalación global
npx skills add Nachovn114/specspire --skill specspire --agent cursor
npx skills add Nachovn114/specspire --skill specspire --global
```

> [!NOTE]
> La modalidad Solo Skill instala la lógica procedural y las referencias técnicas para el agente de IA. No instala la CLI de Specspire en la terminal, no añade el comando `specspire`, ni crea automáticamente `PROJECT.md` o `AGENTS.md` en la raíz del proyecto. El contexto se mantiene de forma conversacional en el chat.

### 2. Verificación de la instalación

Confirma que los archivos existen en tu directorio de skills:

```bash
# Verificar archivo principal de la Skill y referencias (ajustar según carpeta del agente)
ls -la .agents/skills/specspire/SKILL.md
ls -la .agents/skills/specspire/references/
```

Deben figurar `SKILL.md`, 15 referencias en español en `references/` y 15 referencias en inglés en `references/en/`.

### 3. Actualizar o reiniciar el agente

Si tu editor o agente estaba abierto durante la instalación:
- En **T3 Code / Antigravity**: Las skills se recargan automáticamente o al iniciar un nuevo turno de conversación.
- En **Cursor / Claude Code**: Reinicia la ventana o sesión de terminal para asegurar la indexación de la carpeta de skills.

### 4. Instrucción inicial (Primer prompt)

Inicia una conversación con tu agente pegando esta instrucción:

```text
Usa la Skill specspire. Revisa los objetivos de nuestro proyecto e identifica la fase actual antes de escribir código.
```

### 5. Respuesta esperada

Instruye a tu agente a adoptar el formato de estado de 4 líneas y definir los límites antes de crear o modificar archivos:

```text
Fase: 0 · Contexto y descubrimiento
Qué haremos ahora: Establecer el problema, los usuarios objetivo y las restricciones en esta conversación.
Cómo se comprueba: Confirmar el alcance y los criterios de aceptación contigo antes de crear archivos.
Bloqueo real (si existe): Ninguno.
```

### 6. Cómo actualizar la Skill instalada

Para gestionar y actualizar las skills instaladas mediante el gestor oficial `skills`:

```bash
# Listar las skills instaladas y sus rutas
npx skills list

# Comprobar si existen actualizaciones remotas
npx skills check

# Actualizar las skills a la versión más reciente
npx skills update
```

> [!WARNING]
> Si realizaste personalizaciones locales en los archivos de la Skill, haz una copia de respaldo antes de ejecutar `npx skills update`, ya que el gestor externo actualizará el contenido del directorio de la Skill.

---

## Vía B — Kit completo (Scaffolding y gobierno con CLI)

Utiliza el kit completo cuando desees persistir especificaciones, planes y tareas en archivos Markdown dentro del repositorio y auditar la integridad documental con la CLI de Specspire.

### 1. Inicializar el proyecto

La ruta principal y verificable para ejecutar la CLI es clonar el repositorio de GitHub:

```bash
# Opción 1 (Recomendada y reproducible): Desde repositorio clonado de GitHub
git clone https://github.com/Nachovn114/specspire.git
node path/to/specspire/bin/specspire.mjs init --lang es

# Opción 2: Si el paquete se enlaza localmente o tras su futura publicación en npm
npx specspire init --lang es
```

> [!NOTE]
> **Disponibilidad en npm:** El paquete `specspire` no cuenta con una versión pública publicada en el registro de npm (estado 404 verificado; nombre disponible para publicación oficial por el titular). Por ello, la vía principal y reproducible para utilizar la CLI es clonar el repositorio de GitHub o enlazarlo localmente. Los comandos que invocan `npx specspire` aplican tras enlazar el paquete en el proyecto o tras su publicación oficial futura.

`init` crea **hasta 34 archivos** en el proyecto:
- 3 documentos base del proyecto (`AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md`) seleccionados del idioma elegido (`--lang es` o `--lang en`) a partir de las 6 plantillas base disponibles (3 ES + 3 EN).
- La Skill completa (31 archivos: `SKILL.md` + 30 referencias técnicas: 15 en español y 15 en inglés).
- Las 10 plantillas progresivas de funcionalidades (5 ES + 5 EN: `spec`, `plan`, `design`, `tasks`, `review`, que completan las 16 plantillas totales del kit) no se copian en `init`, sino que son generadas bajo demanda por los comandos posteriores `feature`.

> [!IMPORTANT]
> **Comportamiento seguro e idempotente:** `init` nunca sobrescribe archivos existentes de forma destructiva. Si ya cuentas con un `PROJECT.md` o `AGENTS.md` personalizado, Specspire lo preserva intacto e informa `EXISTE`.

### 2. Diagnosticar el entorno (`doctor`)

Ejecuta el verificador de integridad documental:

```bash
# Con repositorio clonado (recomendado)
node path/to/specspire/bin/specspire.mjs doctor

# O con paquete enlazado localmente / npx
npx specspire doctor
```

> [!NOTE]
> `doctor` comprueba exclusivamente la estructura documental, la presencia de archivos y la integridad de enlaces del proyecto. No evalúa la calidad del código fuente de tu aplicación ni los resultados de sus pruebas.

Códigos de salida de `doctor`:
- `0`: PASS — Instalación íntegra y contrato bilingüe verificado (34 archivos).
- `1`: FAIL — Archivos faltantes, dañados o symlinks no permitidos.
- `2`: MIGRATION REQUIRED — Router heredado reconocido; requiere actualización manual.

### 3. Consultar la siguiente acción (`next`)

Para saber qué paso documental corresponde según el estado de tus archivos:

```bash
node path/to/specspire/bin/specspire.mjs next
```

### 4. Ciclo de funcionalidades (`feature`)

Cuando el contexto de `PROJECT.md` esté acordado, crea y avanza funcionalidades progresivamente usando las 10 plantillas progresivas de funcionalidades disponibles (5 ES y 5 EN):

```bash
# 1. Crear especificación de requisitos
node path/to/specspire/bin/specspire.mjs feature new auth-login --lang es

# 2. Planificar arquitectura (tras completar y revisar spec.md)
node path/to/specspire/bin/specspire.mjs feature plan auth-login --lang es

# 3. Diseño UI (solo si la funcionalidad tiene interfaz)
node path/to/specspire/bin/specspire.mjs feature design auth-login --lang es

# 4. Desglose en tareas verificables (tras revisar el plan)
node path/to/specspire/bin/specspire.mjs feature tasks auth-login --lang es

# 5. Registro de revisión y evidencias
node path/to/specspire/bin/specspire.mjs feature review auth-login --lang es
```

---

## Actualizar una instalación previa

### Si usas Solo Skill:
1. **Comprobar y actualizar:** Ejecuta `npx skills check` y luego `npx skills update` para incorporar las referencias actualizadas.
2. **Respaldo previo:** Si modificaste archivos dentro del directorio de la Skill, haz una copia de seguridad antes de actualizar, ya que el gestor externo puede sobrescribirlos.

### Si usas Kit completo:
`init` añade archivos ausentes pero nunca sobrescribe archivos existentes (`EXISTE`). Para actualizar una instalación donde las referencias o el router han cambiado:
1. **Haz una copia de seguridad:** Respalda los documentos de tu proyecto (`PROJECT.md`, `AGENTS.md`, `README-DESARROLLO.md`) y la carpeta de la Skill (`.agents/skills/specspire/`).
2. **Genera una copia limpia de comparación:** Inicializa la nueva versión en una carpeta temporal para comparar cambios (`node path/to/specspire/bin/specspire.mjs init --target temp-compare`).
3. **Revisa las diferencias:** Inspecciona con `git diff` las diferencias en `SKILL.md` y en las referencias técnicas de `references/` y `references/en/`.
4. **Actualización controlada de referencias:** Actualiza de forma selectiva las referencias técnicas y los enlaces del router `SKILL.md`. No realices reemplazos masivos de carpetas personalizadas ni toques los documentos del proyecto. Si únicamente se añadieron referencias nuevas que no existían, ejecutar `init` las incorporará de forma segura.
5. **Verifica con `doctor`:** Ejecuta `doctor` y confirma que devuelva código `0` (PASS).

---

## Resolución de problemas (Troubleshooting)

| Problema | Causa probable | Solución |
|---|---|---|
| **Skill no descubierta por el agente** | El agente busca en otra carpeta de skills (ej. `.claude/skills/`, `.cursor/skills/`). | Indica en el prompt la ruta explícita o mueve la Skill al directorio indexado por tu entorno. |
| **Error de versión de Node.js** | Node inferior a 20.0.0 (o inferior a 22.20.0 para `npx skills`). | Specspire funciona en Node.js `>= 20.0.0` (LTS 22 o 24 recomendado en CI; Node 20 es EOL desde abril de 2026). La herramienta externa `skills` exige Node.js `>= 22.20.0`. |
| **PowerShell bloquea scripts (`.ps1`)** | Política de ejecución restrictiva en Windows. | Ejecuta mediante `node path/to/specspire/bin/specspire.mjs` o usa `npx.cmd specspire`. |
| **Directorio de instalación incorrecto** | `npx skills` instaló en carpeta global o errónea. | Usa las opciones oficiales de `skills` como `--agent <agente>` (ej. `--agent cursor`), `--global` o `--copy` para dirigir la instalación, o mueve la carpeta manualmente. Ten en cuenta que `--target <dir>` es una opción propia de la CLI de Specspire, no del gestor `skills`. |
| **Symlink o Junction rechazado** | Specspire bloquea symlinks por seguridad para prevenir path traversal. | Instala siempre en rutas físicas reales de disco sin enlaces simbólicos en la jerarquía. |
| **`doctor` reporta código 1** | Faltan referencias o archivos de plantilla. | Ejecuta `init` para reponer los archivos ausentes sin tocar los existentes (`EXISTE`). |
| **`doctor` reporta código 2** | Se detectó un `SKILL.md` de una versión beta previa. | Revisa el diff contra una instalación limpia e integra los enlaces de enrutamiento bilingües. |
| **Diferencias entre Solo Skill y Kit completo** | Solo Skill no incluye los comandos `specspire` en terminal. | Es el comportamiento diseñado: la Skill guía en chat; el Kit completo añade la CLI y plantillas locales. |

---

Siguiente paso: [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)
