<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/brand/logo-with-tagline-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/brand/logo-with-tagline-light.svg">
    <img alt="Specspire — From prompt to proof" src="assets/brand/logo-with-tagline-light.svg" width="560">
  </picture>
</p>

<p align="center">
  <strong>Una Skill bilingüe para agentes de IA: especificación, TDD estricto y entrega basada en evidencias.</strong>
</p>

<p align="center">
  <a href="README.md">English</a> •
  <a href="docs/QUICKSTART.md">Inicio rápido</a> (<a href="docs/en/QUICKSTART.md">en</a>) •
  <a href="docs/WORKFLOW.md">Flujo</a> (<a href="docs/en/WORKFLOW.md">en</a>) •
  <a href="docs/QUALITY.md">Calidad</a> (<a href="docs/en/QUALITY.md">en</a>) •
  <a href="docs/BRAND.md">Marca</a> •
  <a href="docs/case-studies/TASKFLOW_ES_CASE_STUDY.md">Caso de estudio</a>
</p>

<p align="center">
  <a href="https://github.com/Nachovn114/specspire/actions/workflows/ci.yml"><img src="https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencia-MIT-blue.svg" alt="Licencia MIT"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-339933" alt="Node.js 20+">
  <img src="https://img.shields.io/badge/estado-beta-orange" alt="Estado: beta">
</p>

```bash
# Instala la Skill verificada directamente desde GitHub en cualquier proyecto:
npx skills add Nachovn114/specspire --skill specspire
```

> **Aviso Beta:** La matriz de CI en GitHub Actions aprueba en Ubuntu, Windows y macOS (Node.js 20, 22, 24). La instalación remota de la Skill y la activación en Fase 0 con Google Antigravity están verificadas. La instalación remota del kit completo y agentes no testeados continúan **NOT VERIFIED**. Consulta el [Changelog](CHANGELOG.md) para el historial completo.

## Por qué Specspire

Los agentes de IA suelen saltar directo al código, agregar infraestructura innecesaria y reportar pruebas que nunca ejecutaron. Specspire les proporciona un único punto de entrada `SKILL.md` que carga bajo demanda 30 referencias técnicas (15 en español + 15 en inglés) a través de siete fases disciplinadas.

```text
Contexto ➔ Especificar ➔ Plan y diseño ➔ Tareas ➔ Construir (TDD) ➔ Verificar ➔ Entregar
```

1. **Contexto (`PROJECT.md`):** Problema, usuarios, límites y alcance.
2. **Especificar (`spec.md`):** Criterios de aceptación observables y casos borde.
3. **Plan y diseño (`plan.md`, `design.md`):** Arquitectura mínima y [diseño UI responsive](docs/DESIGN.md).
4. **Tareas (`tasks.md`):** Incrementos verticales con comprobación verificable.
5. **Construir (TDD):** Ciclos estrictos RED ➔ GREEN ➔ REFACTOR con pruebas reales.
6. **Verificar (`review.md`):** Reconciliación de requisitos vs realidad; [gates de calidad](docs/QUALITY.md).
7. **Entregar:** Comandos reproducibles, evidencias de ejecución y cierre limpio.

## Cómo empezar

- **Solo Skill remota (Recomendado):** Ejecuta `npx skills add Nachovn114/specspire --skill specspire` y apunta tu agente a `.agents/skills/specspire/SKILL.md`. Ver [Inicio rápido](docs/QUICKSTART.md).
- **Skill-only:** Usa `SKILL.md` directamente en la conversación sin requerir archivos locales del proyecto.
- **Kit completo (Código fuente):** Ejecuta `node ./bin/specspire.mjs init` y `doctor` para inicializar plantillas. Ver [Referencia CLI](docs/CLI.md).

```text
Instrucción para el agente:
"Usa la Skill specspire. Lee AGENTS.md y PROJECT.md.
Quiero desarrollar [funcionalidad]. Identifica la fase actual, propón la siguiente tarea y cómo verificarla."
```

## Compatibilidad verificada y Caso de estudio

| Plataforma / Agente | Estado | Notas |
|---|---|---|
| **Google Antigravity** | PASS | Descubrimiento interactivo y ruteo multiescenario verificados. |
| **Matriz CI (Linux / Windows / macOS)** | PASS | Pruebas automáticas en Node.js 20, 22 y 24. |
| **Codex / Claude Code / Cursor** | NOT VERIFIED | Formato estándar de Skill compatible; pilotos formales pendientes. |

Descubre nuestro piloto real: el <a href="docs/case-studies/TASKFLOW_ES_CASE_STUDY.md">Caso de estudio TaskFlow ES</a> demuestra diseño responsive multidispositivo (320px–1440px), persistencia local y evidencias de desarrollo guiado por pruebas.

## Documentación

| Tema | Español | English |
|---|---|---|
| Inicio rápido | [docs/QUICKSTART.md](docs/QUICKSTART.md) | [docs/en/QUICKSTART.md](docs/en/QUICKSTART.md) |
| Flujo de desarrollo | [docs/WORKFLOW.md](docs/WORKFLOW.md) | [docs/en/WORKFLOW.md](docs/en/WORKFLOW.md) |
| Controles de calidad | [docs/QUALITY.md](docs/QUALITY.md) | [docs/en/QUALITY.md](docs/en/QUALITY.md) |
| Estándares UI y responsive | [docs/DESIGN.md](docs/DESIGN.md) | [docs/DESIGN.md](docs/DESIGN.md) |
| Referencia de la CLI | [docs/CLI.md](docs/CLI.md) | [docs/CLI.md](docs/CLI.md) |
| Manual de marca visual | <a href="docs/BRAND.md">docs/BRAND.md</a> | <a href="docs/BRAND.md">docs/BRAND.md</a> |

[Contribuir](CONTRIBUTING.es.md) • [Seguridad](SECURITY.md) • [Changelog](CHANGELOG.md) • <a href="docs/BRAND.md">Manual de marca</a> • [Licencia MIT](LICENSE)
