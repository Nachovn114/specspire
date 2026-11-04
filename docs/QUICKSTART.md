# Inicio rápido — Guía de instalación y primer uso

[English](en/QUICKSTART.md) · [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)

**Objetivo:** Guiar a un agente de IA desde una carpeta vacía o proyecto existente hasta una entrega verificable y disciplinada, sin sobreingeniería previa.

**Requisitos previos:**
- **Node.js:** Versión `>= 20.0.0` (LTS 20, 22 o 24) para la CLI de Specspire y scripts de verificación.
- **Instalador de Skills:** Node.js `>= 22.20.0` si utilizas `npx skills add` (requisito de la herramienta oficial `skills`).
- **Git:** Instalado y accesible en terminal.
- **Agente de IA:** Cualquier entorno compatible con el estándar Agent Skills (T3 Code, Antigravity, Claude Code, Cursor, Codex, Windsurf, Cline, etc.).

---

## Elige tu modalidad de instalación

Specspire ofrece dos vías de adopción complementarias:

| Modalidad | Qué obtienes | Para quién es |
|---|---|---|
| **Vía A: Solo Skill** (`npx skills add`) | Instala `SKILL.md` y 30 referencias técnicas (15 ES + 15 EN) en `.agents/skills/specspire/`. | Desarrolladores que desean asistencia guiada en el chat sin añadir CLI ni plantillas Markdown a su repositorio. |
| **Vía B: Kit completo** (`init` local) | Instala la Skill + CLI de Specspire (`init`, `doctor`, `next`, `feature`) + 16 plantillas bilingües. | Equipos que buscan gobernanza documental persistente (`PROJECT.md`, `AGENTS.md`, `specs/`). |

---

## Vía A — Solo Skill (Recomendada para chat de agentes)

### 1. Instalación mediante Skills CLI

Ejecuta en la raíz de tu proyecto o en tu entorno de desarrollo:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

El instalador detecta el agente disponible o solicita confirmar el directorio de destino (por defecto `.agents/skills/specspire/`).

> [!NOTE]
> La modalidad Solo Skill instala la lógica procedural y las referencias técnicas para el agente de IA. No instala automáticamente la CLI local de Specspire ni inicializa plantillas Markdown en la raíz del proyecto.

### 2. Verificación de la instalación

Confirma que los archivos existen en tu proyecto:

```bash
# Verificar archivo principal de la Skill y referencias
ls -la .agents/skills/specspire/SKILL.md
ls -la .agents/skills/specspire/references/
```

Deben figurar `SKILL.md`, 15 referencias en español en `references/` y 15 referencias en inglés en `references/en/`.

### 3. Actualizar o reiniciar el agente

Si tu editor o agente estaba abierto durante la instalación:
- En **T3 Code / Antigravity**: Las skills se recargan automáticamente o al iniciar un nuevo turno de conversación.
- En **Cursor / Claude Code**: Reinicia la ventana o sesión de terminal para asegurar la indexación de la carpeta `.agents/skills/`.

### 4. Instrucción inicial (Primer prompt)

Inicia una conversación con tu agente pegando esta instrucción:

```text
Usa la Skill specspire. Revisa los objetivos de nuestro proyecto e identifica la fase actual antes de escribir código.
```

### 5. Respuesta esperada

Tu agente leerá `SKILL.md`, adoptará el protocolo disciplinado de 4 líneas y detendrá cualquier intento de codificación prematura:

```text
Fase: 0 · Contexto y descubrimiento
Qué haremos ahora: Establecer el problema, los usuarios objetivo y las restricciones en esta conversación.
Cómo se comprueba: Confirmar el alcance y los criterios de aceptación contigo antes de crear archivos.
Bloqueo real: Ninguno.
```

### 6. Cómo actualizar la Skill instalada

Para obtener la última versión de la Skill remota:

```bash
npx skills add Nachovn114/specspire --skill specspire --force
```

---

## Vía B — Kit completo (Scaffolding y gobierno con CLI)

Utiliza el kit completo cuando desees persistir especificaciones, planes y tareas en archivos Markdown dentro del repositorio.

### 1. Inicializar el proyecto

Con Specspire disponible localmente o clonado:

```powershell
# En Windows PowerShell (usando node directamente)
node path/to/specspire/bin/specspire.mjs init --lang es

# En Linux / macOS
node path/to/specspire/bin/specspire.mjs init --lang es
```

`init` instala 34 archivos:
- 3 documentos base del proyecto (`AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md`).
- La Skill completa (`SKILL.md` + 30 referencias técnicas).

> [!IMPORTANT]
> **Comportamiento seguro e idempotente:** `init` nunca sobrescribe archivos existentes. Si ya cuentas con un `PROJECT.md` o `AGENTS.md` personalizado, Specspire lo preserva intacto e informa `EXISTE`.

### 2. Diagnosticar el entorno (`doctor`)

Ejecuta el verificador de integridad documental:

```bash
node path/to/specspire/bin/specspire.mjs doctor
```

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

Cuando el contexto de `PROJECT.md` esté acordado, crea y avanza funcionalidades progresivamente:

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

1. **Haz una copia de seguridad:** Respalda `.agents/skills/specspire/` y los documentos `PROJECT.md`, `AGENTS.md` y `README-DESARROLLO.md`.
2. **Ejecuta `init`:** Para incorporar nuevas referencias sin pisar las personalizadas.
3. **Verifica con `doctor`:** Ejecuta `doctor` y revisa que retorne código `0`.

---

## Resolución de problemas (Troubleshooting)

| Problema | Causa probable | Solución |
|---|---|---|
| **Skill no descubierta por el agente** | El agente busca en otra carpeta de skills. | Indica en el prompt la ruta explícita: `"Usa la Skill specspire ubicada en .agents/skills/specspire/SKILL.md"`. |
| **Error de versión de Node.js** | Versión de Node inferior a 20.0.0 (o inferior a 22.20.0 para `npx skills`). | Actualiza Node.js a la versión LTS recomendada (`nvm use 22` o descarga desde nodejs.org). |
| **PowerShell bloquea scripts (`.ps1`)** | Política de ejecución restrictiva en Windows. | Ejecuta mediante `node path/to/specspire/bin/specspire.mjs` o usa `npm.cmd` / `npx.cmd`. |
| **Directorio de instalación incorrecto** | `npx skills` instaló en carpeta global o errónea. | Usa el flag `--target .agents/skills/specspire` o mueve la carpeta al directorio esperado por tu agente. |
| **Symlink o Junction rechazado** | Specspire bloquea symlinks por seguridad para prevenir path traversal. | Instala siempre en rutas físicas reales de disco sin enlaces simbólicos en la jerarquía. |
| **`doctor` reporta código 1** | Faltan referencias o archivos de plantilla. | Ejecuta `init` para reponer los archivos ausentes sin tocar los existentes. |
| **`doctor` reporta código 2** | Se detectó un `SKILL.md` de una versión beta previa. | Revisa el diff contra una instalación limpia e integra los enlaces de enrutamiento bilingües. |
| **Diferencias entre Solo Skill y Kit completo** | Solo Skill no incluye los comandos `specspire` en terminal. | Es el comportamiento diseñado: la Skill guía en chat; el Kit completo añade la CLI y plantillas locales. |

---

Siguiente paso: [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)
