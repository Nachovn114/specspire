# Specspire

**Una Skill para agentes de IA: especificación, pruebas primero y entrega verificable.**

[![CI](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg)](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)
![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-339933)
![Estado: beta](https://img.shields.io/badge/estado-beta-orange)

[English](README.md) · [Inicio rápido](docs/QUICKSTART.md) · [Flujo](docs/WORKFLOW.md) · [CLI](docs/CLI.md) · [Ejemplo](examples/formulario-academico.md)

> [!IMPORTANT]
> **Beta — 0.9.0-beta.1.** La CLI, la Skill y el paquete npm han sido validados localmente. La primera ejecución de GitHub Actions aprobó los 9 jobs de la matriz en Linux, Windows y macOS con Node.js 20, 22 y 24 (commit [`5a99bcd`](https://github.com/Nachovn114/specspire/commit/5a99bcd)). La instalación remota, el reconocimiento de la Skill por agentes de IA específicos y los pilotos completos con agentes reales continúan **NOT VERIFIED**.

## Qué es

Los agentes de IA suelen saltar directo al código, añadir infraestructura que nadie pidió y declarar pruebas que no ejecutaron. Specspire les da un único `SKILL.md` que identifica la tarea, ubica la fase actual y carga solo la referencia necesaria: especificar, planificar, diseñar, construir con pruebas primero, verificar contra requisitos y entregar.

Una CLI opcional y sin dependencias instala la guía del proyecto y las plantillas sin tocar archivos existentes. Specspire se inspira en el desarrollo guiado por especificaciones y en prácticas de ingeniería disciplinadas; **no está afiliado** a GitHub Spec Kit, Superpowers ni Matt Pocock Skills.

## Capacidades

- **Una sola Skill pública** con 14 referencias especializadas que se cargan bajo demanda.
- **Especificación antes del código:** criterios de aceptación observables, plan mínimo y stack justificado con fuentes oficiales cuando hay conexión.
- **UI solo cuando hay interfaz:** dirección visual, accesibilidad y matriz de evidencia responsive y multiplataforma.
- **Construcción con pruebas primero:** RED → GREEN → REFACTOR para comportamiento automatizable; depuración sistemática para bugs.
- **Gates con evidencia:** cada resultado se registra como PASS, FAIL, BLOCKED o NOT VERIFIED, nunca inventado.
- **Instalador conservador:** `init` nunca sobrescribe; `doctor` revisa los documentos instalados.
- **Control humano:** sin push, merge, despliegues ni acciones con coste sin permiso explícito.

## Instalación

**Requisitos:** Node.js 20+ para la CLI y un agente de IA capaz de leer Agent Skills.

Con la carpeta `Specspire` junto a tu proyecto, ejecuta desde la carpeta del proyecto:

```powershell
node ..\Specspire\bin\specspire.mjs init
node ..\Specspire\bin\specspire.mjs doctor
```

Esto instala el kit completo: `AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md` y la Skill en `.agents/skills/specspire/`. Repetir `init` solo agrega archivos faltantes; los existentes se conservan tal como están.

<details>
<summary><strong>Instalación remota desde GitHub (aún no verificada)</strong></summary>

Elige **una** cuando el repositorio sea público. Ambos comandos están documentados, pero ninguno se ha verificado de extremo a extremo.

```bash
# Solo la Skill
npx skills add Nachovn114/specspire --skill specspire

# Kit completo: guía, reglas, plantilla de contexto y Skill local
npm exec --yes --package=github:Nachovn114/specspire -- specspire init
```

</details>

- **PowerShell bloquea `npm` o `npx`:** usa `npm.cmd` / `npx.cmd` en lugar de cambiar políticas de ejecución.
- **Actualizar una instalación previa:** `init` no reemplaza una Skill existente ni tu `AGENTS.md`. Sigue la actualización controlada del [inicio rápido](docs/QUICKSTART.md).

## Inicio rápido

**Kit completo:** abre `README-DESARROLLO.md` en tu proyecto y pide al agente:

```text
Activa la Skill specspire. Lee AGENTS.md, PROJECT.md y README-DESARROLLO.md.
Quiero desarrollar [descripción o rúbrica].
Identifica la fase actual y dime solo la siguiente tarea y cómo verificarla.
No introduzcas arquitectura ni dependencias innecesarias.
```

**Skill-only (solo Skill):** indica al agente la ubicación real de `SKILL.md` y define objetivo y restricciones en el chat. No se presupone CLI, `PROJECT.md`, `AGENTS.md` ni guía; el agente mantiene el contexto en la conversación y solo escribe un documento de contexto si lo autorizas.

## Cómo funciona el flujo

```text
Contexto → Especificar → Plan y diseño → Tareas → Construir → Verificar → Entregar
```

Cada fase termina con un gate respaldado por evidencia, y la profundidad se adapta al alcance real: un formulario no necesita microservicios. Los bugs no recorren el ciclo completo: **reproducir → diagnosticar → corregir → prueba de regresión**. La rúbrica académica tiene prioridad. El mapa fase por fase está en [docs/WORKFLOW.md](docs/WORKFLOW.md).

```text
mi-proyecto/
├── AGENTS.md
├── PROJECT.md
├── README-DESARROLLO.md
└── .agents/skills/specspire/
    ├── SKILL.md
    └── references/        # 14 referencias, se cargan según la fase
```

Los documentos por funcionalidad en `specs/<funcionalidad>/` se crean bajo demanda. `doctor`, `status` y `next` revisan documentos, no la corrección de la aplicación ni la calidad UX.

## Documentación

> [!NOTE]
> Este README existe en inglés y español. Las guías de `docs/`, la Skill, sus referencias y las plantillas instaladas están en español. El soporte internacional completo no se ha verificado.

| Quiero… | Guía |
|---|---|
| Instalar e iniciar un proyecto | [Inicio rápido](docs/QUICKSTART.md) |
| Entender las siete fases | [Flujo de desarrollo](docs/WORKFLOW.md) |
| Registrar evidencia antes de aprobar | [Controles de calidad](docs/QUALITY.md) |
| Diseñar una UI accesible y responsive | [Diseño UI/UX](docs/DESIGN.md) |
| Consultar un comando | [Referencia de la CLI](docs/CLI.md) |
| Entender la estructura del repositorio | [Arquitectura](docs/ARCHITECTURE.md) |
| Seguir un ejemplo completo | [Formulario académico](examples/formulario-academico.md) |
| Ver fuentes y atribuciones | [Referencias](docs/REFERENCIAS.md) |

## Contribución, seguridad y licencia

[Contribuir](CONTRIBUTING.md) · [Política de seguridad](SECURITY.md) · [Changelog](CHANGELOG.md) · [Guía de publicación](docs/PUBLISH.md) · [Licencia MIT](LICENSE)
