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
| **Vía B: Kit completo** (`init` local) | Instala la Skill + CLI de Specspire (`init`, `doctor`, `next`, `feature`) + hasta 34 archivos con 16 plantillas bilingües. Preserva archivos existentes. | Equipos que buscan gobernanza documental persistente (`PROJECT.md`, `AGENTS.md`, `specs/`). |

---

## Vía A — Solo Skill (Recomendada para chat de agentes)

### 1. Instalación mediante Skills CLI

Ejecuta en la raíz de tu proyecto o en tu entorno de desarrollo:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

El instalador detecta el agente disponible o solicita confirmar el directorio de destino específico del agente (por ejemplo `.agents/skills/specspire/`, `.claude/skills/specspire/`, `.cursor/skills/specspire/`, o `.gemini/skills/specspire/`).

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

Para un usuario nuevo, la CLI de Specspire puede ejecutarse de dos formas:

```bash
# Opción 1: Si instalaste el paquete en tu proyecto (npm install -D specspire)
npx specspire init --lang es

# Opción 2: Si clonaste el repositorio de Specspire
node path/to/specspire/bin/specspire.mjs init --lang es
```

`init` crea hasta 34 archivos en el proyecto:
- 3 documentos base del proyecto (`AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md`).
- La Skill completa (`SKILL.md` + 30 referencias técnicas: 15 en español y 15 en inglés).
- Además, deja disponibles 16 plantillas progresivas para los posteriores comandos `feature`.

> [!IMPORTANT]
> **Comportamiento seguro e idempotente:** `init` nunca sobrescribe archivos existentes de forma destructiva. Si ya cuentas con un `PROJECT.md` o `AGENTS.md` personalizado, Specspire lo preserva intacto e informa `EXISTE`.

### 2. Diagnosticar el entorno (`doctor`)

Ejecuta el verificador de integridad documental:

```bash
# Con paquete local o npx
npx specspire doctor

# O con repositorio clonado
node path/to/specspire/bin/specspire.mjs doctor
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
npx specspire next
```

### 4. Ciclo de funcionalidades (`feature`)

Cuando el contexto de `PROJECT.md` esté acordado, crea y avanza funcionalidades progresivamente usando las 16 plantillas progresivas disponibles:

```bash
# 1. Crear especificación de requisitos
npx specspire feature new auth-login --lang es

# 2. Planificar arquitectura (tras completar y revisar spec.md)
npx specspire feature plan auth-login --lang es

# 3. Diseño UI (solo si la funcionalidad tiene interfaz)
npx specspire feature design auth-login --lang es

# 4. Desglose en tareas verificables (tras revisar el plan)
npx specspire feature tasks auth-login --lang es

# 5. Registro de revisión y evidencias
npx specspire feature review auth-login --lang es
```

---

## Actualizar una instalación previa

1. **Haz una copia de seguridad:** Respalda `.agents/skills/specspire/` (o la carpeta de skills de tu agente) y los documentos `PROJECT.md`, `AGENTS.md` y `README-DESARROLLO.md`.
2. **Si usas Solo Skill:** Ejecuta `npx skills check` y luego `npx skills update` para actualizar las referencias.
3. **Si usas Kit completo:** Ejecuta `init` para incorporar nuevas referencias sin pisar las personalizadas.
4. **Verifica con `doctor`:** Ejecuta `doctor` y revisa que retorne código `0`.

---

## Resolución de problemas (Troubleshooting)

| Problema | Causa probable | Solución |
|---|---|---|
| **Skill no descubierta por el agente** | El agente busca en otra carpeta de skills (ej. `.claude/skills/`, `.cursor/skills/`). | Indica en el prompt la ruta explícita o mueve la Skill al directorio indexado por tu entorno. |
| **Error de versión de Node.js** | Node inferior a 20.0.0 (o inferior a 22.20.0 para `npx skills`). | Specspire funciona en Node.js `>= 20.0.0` (LTS 22 o 24 recomendado en CI; Node 20 es EOL desde abril de 2026). La herramienta externa `skills` exige Node.js `>= 22.20.0`. |
| **PowerShell bloquea scripts (`.ps1`)** | Política de ejecución restrictiva en Windows. | Ejecuta mediante `node path/to/specspire/bin/specspire.mjs` o usa `npx.cmd specspire`. |
| **Directorio de instalación incorrecto** | `npx skills` instaló en carpeta global o errónea. | Usa el flag `--target` de `skills` o mueve la carpeta al directorio esperado por tu agente. |
| **Symlink o Junction rechazado** | Specspire bloquea symlinks por seguridad para prevenir path traversal. | Instala siempre en rutas físicas reales de disco sin enlaces simbólicos en la jerarquía. |
| **`doctor` reporta código 1** | Faltan referencias o archivos de plantilla. | Ejecuta `init` para reponer los archivos ausentes sin tocar los existentes (`EXISTE`). |
| **`doctor` reporta código 2** | Se detectó un `SKILL.md` de una versión beta previa. | Revisa el diff contra una instalación limpia e integra los enlaces de enrutamiento bilingües. |
| **Diferencias entre Solo Skill y Kit completo** | Solo Skill no incluye los comandos `specspire` en terminal. | Es el comportamiento diseñado: la Skill guía en chat; el Kit completo añade la CLI y plantillas locales. |

---

Siguiente paso: [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)
