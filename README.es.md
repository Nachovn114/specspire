# Specspire

**Una Skill para agentes de IA: especificación, pruebas primero y entrega verificable.**

[English](README.md) · **Español** · [Inicio rápido](docs/QUICKSTART.md) ([en](docs/en/QUICKSTART.md)) · [Flujo](docs/WORKFLOW.md) ([en](docs/en/WORKFLOW.md)) · [Controles](docs/QUALITY.md) ([en](docs/en/QUALITY.md)) · [CLI](docs/CLI.md)

[![CI](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg)](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)
![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-339933)
![Estado: beta](https://img.shields.io/badge/estado-beta-orange)

```bash
# Instala la Skill verificada directamente desde GitHub en cualquier proyecto:
npx skills add Nachovn114/specspire --skill specspire
```

> [!IMPORTANT]
> **Beta — 0.9.0-beta.1.** La CLI, la Skill, el paquete npm y GitHub Actions CI aprobaron los 9 jobs de la matriz en Linux, Windows y macOS con Node.js 20, 22 y 24 (commit [`f599ebd`](https://github.com/Nachovn114/specspire/commit/f599ebdd29aabdf6f12e55b005714e11e142880e)). La instalación remota de la Skill con `npx skills add` y la activación en Fase 0 con Google Antigravity están verificadas. La instalación remota del kit completo (`npm exec github:`), agentes no probados y pilotos completos de producción continúan **NOT VERIFIED**. Las pruebas locales de empaquetado verifican únicamente la estructura del tarball y no implican publicación en el registro npm.

## Qué es

Los agentes de IA suelen saltar directo al código, añadir infraestructura que nadie pidió y declarar pruebas que no ejecutaron. Specspire les da un único `SKILL.md` que identifica la tarea, ubica la fase actual y carga solo la referencia necesaria: especificar, planificar, diseñar, construir con pruebas primero, verificar contra requisitos y entregar.

Una CLI opcional y sin dependencias instala la guía del proyecto y las plantillas sin tocar archivos existentes. Specspire se inspira en el desarrollo guiado por especificaciones y en prácticas de ingeniería disciplinadas; **no está afiliado** a GitHub Spec Kit, Superpowers ni Matt Pocock Skills.

## Las siete fases

```text
Contexto → Especificar → Plan y diseño → Tareas → Construir → Verificar → Entregar
```

1. **Contexto:** Problema, usuarios, límites y alcance (`PROJECT.md` o contexto en el chat).
2. **Especificar:** Criterios de aceptación observables y casos de error (`spec.md`).
3. **Plan y diseño:** Arquitectura mínima, justificación de stack y matriz UI (`plan.md`, `design.md`).
4. **Tareas:** Incrementos verticales medibles con criterios de comprobación (`tasks.md`).
5. **Construir:** Pruebas primero (RED → GREEN → REFACTOR) o depuración sistemática.
6. **Verificar:** Comparación de requisitos vs realidad y revisión de diff (`review.md`).
7. **Entregar:** Instrucciones reproducibles de ejecución, evidencias y cierre.

## Capacidades

- **Una sola Skill pública** con 15 referencias especializadas que se cargan bajo demanda.
- **Privacidad desde el diseño:** Gate contextual (P01–P06) con marco chileno (Ley 19.628 / 21.719), GDPR, LGPD y CCPA.
- **Especificación antes del código:** Criterios observables, plan mínimo y stack justificado.
- **UI y accesibilidad:** Dirección visual, responsive y matrices de evidencia multiplataforma.
- **Pruebas primero:** Tests reales; resultados registrados como PASS, FAIL, BLOCKED o NOT VERIFIED.
- **Seguridad conservadora:** `init` nunca sobrescribe; protección contra symlinks y path traversal.
- **Control humano:** Sin push, merge, despliegues ni acciones con coste sin permiso explícito.

## Inicio rápido

**Solo Skill remota (recomendado):** Ejecuta `npx skills add Nachovn114/specspire --skill specspire`. Indica a tu agente `.agents/skills/specspire/SKILL.md`.

**Kit completo (local):** Ejecuta `node ../Specspire/bin/specspire.mjs init` y `doctor`. Abre `README-DESARROLLO.md` y pide al agente:

```text
Activa la Skill specspire. Lee AGENTS.md, PROJECT.md y README-DESARROLLO.md.
Quiero desarrollar [descripción]. Identifica la fase actual y dime solo la siguiente tarea y cómo verificarla.
```

**Skill-only (solo Skill):** Indica al agente la ruta a `SKILL.md` y define restricciones en chat. Sin archivos de proyecto asumidos; el contexto vive en la conversación.

## Documentación

Las guías principales cuentan con versiones en inglés bajo `docs/en/` y en español bajo `docs/`. Consulta el [plan de internacionalización](docs/I18N_PLAN.md).

| Tema | Español | English |
|---|---|---|
| Inicio rápido | [docs/QUICKSTART.md](docs/QUICKSTART.md) | [docs/en/QUICKSTART.md](docs/en/QUICKSTART.md) |
| Flujo de desarrollo | [docs/WORKFLOW.md](docs/WORKFLOW.md) | [docs/en/WORKFLOW.md](docs/en/WORKFLOW.md) |
| Controles de calidad | [docs/QUALITY.md](docs/QUALITY.md) | [docs/en/QUALITY.md](docs/en/QUALITY.md) |
| Diseño UI/UX y responsive | [docs/DESIGN.md](docs/DESIGN.md) | [docs/DESIGN.md (es)](docs/DESIGN.md) |
| Referencia de la CLI | [docs/CLI.md](docs/CLI.md) | [docs/CLI.md (es)](docs/CLI.md) |
| Arquitectura del repositorio | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | [docs/ARCHITECTURE.md (es)](docs/ARCHITECTURE.md) |

[Contribuir](CONTRIBUTING.es.md) · [Seguridad](SECURITY.md) · [Changelog](CHANGELOG.md) · [Publicación](docs/PUBLISH.md) · [Licencia MIT](LICENSE)
