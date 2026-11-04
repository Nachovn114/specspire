<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Nachovn114/specspire/main/assets/brand/logo-with-tagline-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Nachovn114/specspire/main/assets/brand/logo-with-tagline-light.svg">
    <img alt="Specspire — From prompt to proof" src="https://raw.githubusercontent.com/Nachovn114/specspire/main/assets/brand/logo-with-tagline-light.svg" width="560">
  </picture>
</p>

<p align="center">
  <strong>From prompt to proof. Una Skill para agentes de IA: desarrollo de software verificable.</strong>
</p>

<p align="center">
  <a href="README.md">English</a> •
  <a href="docs/QUICKSTART.md">Inicio rápido</a> (<a href="docs/en/QUICKSTART.md">en</a>) •
  <a href="docs/WORKFLOW.md">Flujo</a> (<a href="docs/en/WORKFLOW.md">en</a>) •
  <a href="docs/QUALITY.md">Calidad</a> (<a href="docs/en/QUALITY.md">en</a>) •
  <a href="https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md">Marca</a> •
  <a href="https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/TASKFLOW_ES_CASE_STUDY.md">Casos de estudio</a>
</p>

<p align="center">
  <a href="https://github.com/Nachovn114/specspire/actions/workflows/ci.yml"><img src="https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencia-MIT-blue.svg" alt="Licencia MIT"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-339933" alt="Node.js 20+">
</p>

Specspire evita que los agentes de IA salten de inmediato al código, inventen arquitectura no solicitada o alucinen ejecuciones de pruebas. Proporciona un único punto de entrada bajo el estándar Agent Skills (`SKILL.md`) que enruta dinámicamente a 30 referencias técnicas a lo largo de siete fases disciplinadas.

---

## Instalación rápida

Agrega la Skill verificada a tu repositorio o entorno de agente:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

Requiere Node.js `>= 22.20.0` para el instalador CLI de `skills`. Alternativamente, copia la carpeta `skills/specspire/` en el directorio de skills de tu agente.

---

## Pruébalo

Una vez instalada, indica a tu agente en cualquier conversación:

```text
Usa la Skill specspire. Revisa los objetivos de nuestro proyecto e identifica la fase actual antes de escribir código.
```

Tu agente se detiene, adopta el protocolo de 4 líneas y establece los límites antes de modificar archivos:

```text
Fase: 0 · Contexto y descubrimiento
Siguiente acción: Revisar la definición del problema, usuarios objetivo y no-objetivos en la conversación.
Comprobación: Confirmar el alcance acordado con el desarrollador antes de crear archivos.
Bloqueo real: Ninguno.
```

---

## Cómo funciona

Specspire organiza el desarrollo de software en siete fases verificables con compuertas de aprobación humana:

```text
Contexto → Especificar → Plan y diseño → Tareas → Construir (TDD) → Verificar → Entregar
```

1. **Contexto (`PROJECT.md`):** Límites del problema, usuarios objetivo, restricciones y no-objetivos explícitos.
2. **Especificar (`spec.md`):** Historias de usuario con criterios de aceptación observables y casos borde.
3. **Plan y diseño (`plan.md`, `design.md`):** Arquitectura mínima, justificación del stack y [diseño UI responsive](docs/DESIGN.md).
4. **Tareas (`tasks.md`):** Incrementos verticales con comprobación verificable y compuertas de completitud.
5. **Construir (TDD):** Ciclos estrictos RED → GREEN → REFACTOR; las pruebas fallan por requisitos, no por errores de importación.
6. **Verificar (`review.md`):** Reconciliación de requisitos contra el diff; ejecución de [controles de calidad](docs/QUALITY.md) y privacidad (P01–P06).
7. **Entregar:** Comandos de ejecución reproducibles, manuales de arranque en frío y evidencias de auditoría.

---

## Modo Skill-only vs Kit completo

Specspire se adapta a tu flujo de trabajo:

| Característica | Modo Skill-only | Modo Kit completo |
|---|---|---|
| **Ideal para** | Adopción rápida en el chat de cualquier agente de código | Gestión completa de especificaciones a nivel de repositorio |
| **Comando de instalación** | `npx skills add Nachovn114/specspire --skill specspire` | `node ./bin/specspire.mjs init --lang es` |
| **Archivos instalados** | `.agents/skills/specspire/` (Skill + 30 referencias) | Skill + CLI (`doctor`, `next`, `feature`) + 16 plantillas |
| **Almacenamiento de contexto** | Memoria conversacional en el chat | Documentos Markdown (`PROJECT.md`, `AGENTS.md`, `specs/`) |
| **Sobrescribe archivos** | Nunca | Nunca; los archivos existentes del proyecto se preservan |

---

## Casos de estudio reales

Specspire ha sido evaluado y validado en implementaciones de referencia del mundo real:

- [**Caso de estudio TaskFlow ES**](https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/TASKFLOW_ES_CASE_STUDY.md): Cliente web responsive (320px–1440px), controles de privacidad local (P01–P06) y suites de pruebas Vitest/Playwright E2E.
- [**Caso de estudio LogLens CLI**](https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/LOGLENS_CLI_CASE_STUDY.md): Analizador de logs en streaming con cero dependencias runtime, CLI POSIX y 40 aserciones nativas del test runner de Node.js.

---

## Documentación

| Guía | Español | English |
|---|---|---|
| Inicio rápido | [docs/QUICKSTART.md](docs/QUICKSTART.md) | [docs/en/QUICKSTART.md](docs/en/QUICKSTART.md) |
| Flujo de siete fases | [docs/WORKFLOW.md](docs/WORKFLOW.md) | [docs/en/WORKFLOW.md](docs/en/WORKFLOW.md) |
| Controles de calidad y evidencia | [docs/QUALITY.md](docs/QUALITY.md) | [docs/en/QUALITY.md](docs/en/QUALITY.md) |
| Estándares UI y responsive | [docs/DESIGN.md](docs/DESIGN.md) | [docs/DESIGN.md](docs/DESIGN.md) |
| Referencia de la CLI | [docs/CLI.md](docs/CLI.md) | [docs/CLI.md](docs/CLI.md) |
| Manual de marca visual | <a href="https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md">docs/BRAND.md</a> | <a href="https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md">docs/BRAND.md</a> |

---

## Compatibilidad y Requisitos

- **Entorno de ejecución:** Node.js `>= 20.0.0` (LTS 20, 22, 24). Cero dependencias runtime (`dependencies: {}`).
- **Instalador de Skills:** `npx skills` requiere Node.js `>= 22.20.0`.
- **Matriz de plataformas:** Validado en Ubuntu, macOS y Windows.

| Plataforma / Agente | Estado | Notas |
|---|---|---|
| **T3 Code / Antigravity ACP** | PASS | Ciclo completo de 7 fases verificado en pilotos web y CLI. |
| **Google Antigravity** | PASS | Descubrimiento interactivo y ruteo multiescenario verificados. |
| **Matriz CI (Linux / Windows / macOS)** | PASS | Matriz automatizada de pruebas unitarias, CLI, empaquetado y enlaces en Node.js 20, 22, 24. |
| **OpenAI Codex** | BLOCKED | CLI 0.166.0 y estructura de Skill verificadas; inferencia bloqueada por cuota de cuenta. |
| **Claude Code / Cursor** | NOT VERIFIED | Formato estándar de Agent Skills compatible; sin ejecución automatizada verificada. |

---

## Contribuir, Seguridad y Licencia

Specspire es un proyecto de código abierto que fomenta la participación de la comunidad:

- [Guía de contribución](CONTRIBUTING.es.md) ([en](CONTRIBUTING.md))
- [Política de seguridad](SECURITY.md)
- [Registro de cambios (Changelog)](CHANGELOG.md)
- [Manual de marca](https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md)
- [Licencia MIT](LICENSE)
