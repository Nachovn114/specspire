# Arquitectura de Specspire

## Estructura del repositorio

```text
specspire/
├── README.md                       # Entrada única para usuarios
├── docs/                           # Guías cortas por intención
│   └── audits/                     # Informes históricos; solo GitHub, fuera del paquete npm
├── skills/specspire/
│   ├── SKILL.md                    # Enrutador de tareas del agente
│   └── references/                # 15 referencias ES; en/ contiene las 15 EN
├── templates/                      # Documentos que se instalan en cada proyecto
│   └── feature/                   # Artefactos de una funcionalidad
├── bin/specspire.mjs               # CLI sin dependencias de terceros
├── tests/                          # Pruebas del instalador
└── .github/workflows/ci.yml        # Validación del repositorio
```

Las rutas adicionales son:

```text
templates/en/
  AGENTS.md
  PROJECT.md
  README-DESARROLLO.md
  feature/
    spec.md
    plan.md
    design.md
    tasks.md
    review.md
```

La CLI selecciona un mapa cerrado de rutas es/en; no usa valores arbitrarios como rutas ni guarda configuración. Conserva {{FEATURE}}, {{DATE}} donde exista, TODO_*, [ACLARAR:, RF-* y los estados de evidencia. El idioma del agente no configura la CLI. Fase 3 empaqueta 68 archivos e instala 34; las escrituras siguen siendo exclusivas y las lecturas verifican destinos y ancestros. No se garantiza ausencia absoluta de carreras TOCTOU.

## Separación de responsabilidades

- **`SKILL.md`:** decide el procedimiento según intención y fase. Es la única Skill visible. Prioriza preferencia explícita, contexto inequívoco y fallback español; carga solo referencias pertinentes del idioma seleccionado.
- **`references/`:** explica cómo ejecutar requisitos, arquitectura, TDD, UX, debugging, revisión, privacidad y entrega; se lee bajo demanda.
- **`templates/`:** entrega documentos mínimos al proyecto. Hay ocho originales ES y ocho contrapartes EN. No crea un framework o backend por defecto.
- **CLI:** copia archivos de forma conservadora, crea plantillas bajo demanda y detecta marcadores pendientes. Deriva rutas ES/EN de una única lista de 15 nombres. `init` instala 34 archivos; `doctor` devuelve 0 para instalación completa, 2 para router heredado reconocido pendiente de migración y 1 para instalación incompleta o inválida.
- **Tests del kit:** prueban instalación y estructura; **no certifican** productos construidos por los agentes.

## Principios de diseño

1. Una fuente de verdad para cada requisito y decisión.
2. Especificación antes de implementación; cambios siempre trazables.
3. Instrucciones progresivas para no saturar al agente ni al junior.
4. Inversión mínima en infraestructura hasta que aparezca una necesidad real.
5. Sin duplicación del flujo de Spec Kit si `.specify/` ya existe.
6. Aprobación humana para operaciones externas, costosas o irreversibles.

## Limitaciones conocidas y estado de verificación

La evidencia histórica de v0.9.0-beta.1 sobre instalación remota de la Skill mediante `npx skills add` está verificada (detecta exactamente una Skill pública y 15 referencias), y su activación automática fue probada en Google Antigravity en escenarios controlados de Fase 0. Sin embargo, la compatibilidad con otros agentes (Codex, Cursor, etc.), la instalación remota del kit completo (`npm exec github:`) y el desarrollo de aplicaciones completas de producción continúan sin verificar. Los tests del kit validan estructura, instalación e integridad documental, pero no certifican calidad ni cumplimiento legal de las aplicaciones construidas.

La implementación bilingüe de Fase 2 contiene 30 referencias (15 ES + 15 EN) y está integrada en `main` mediante el PR #5 (commit [`1ba9c54`](https://github.com/Nachovn114/specspire/commit/1ba9c549142274b4151a025b0f8f8dd0dbf8c8f9)). Cuenta con verificación de tests, tarball offline de 60 archivos y CI completo (9 jobs de matriz en Ubuntu, Windows y macOS sobre Node.js 20.0.0, 22 y 24, más el job required en SUCCESS). Las evaluaciones con agentes registraron 2 PASS y 5 BLOCKED (por cuota) en Codex, y 6 PASS y 1 NOT VERIFIED en Gemini 3.8 Flash; el fallback español ante entrada totalmente ambigua permanece NOT VERIFIED. Fase 3 implementada y validada localmente en `feat/english-project-templates`, sin fusionar en `main` ni publicar. GitHub Actions y la matriz Node 20.0.0/22/24 en Windows, Linux y macOS siguen pendientes para Fase 3. La versión histórica v0.9.0-beta.1 no incluye esta funcionalidad. El código permanece sin publicar en npm y no altera la versión histórica v0.9.0-beta.1. Para migrar sin perder personalizaciones, seguir [Inicio rápido](QUICKSTART.md#actualizar-una-instalación-previa).
