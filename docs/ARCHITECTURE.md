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

## Separación de responsabilidades

- **`SKILL.md`:** decide el procedimiento según intención y fase. Es la única Skill visible. Prioriza preferencia explícita, contexto inequívoco y fallback español; carga solo referencias pertinentes del idioma seleccionado.
- **`references/`:** explica cómo ejecutar requisitos, arquitectura, TDD, UX, debugging, revisión, privacidad y entrega; se lee bajo demanda.
- **`templates/`:** entrega documentos mínimos al proyecto. Siguen en español durante Fase 2. No crea un framework o backend por defecto.
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

La rama bilingüe contiene 30 referencias y se verifica localmente mediante tests y tarball offline de 60 archivos. Su CI y los pilotos reales de negociación ES/EN siguen pendientes; la evidencia histórica no los sustituye. Fase 3 (plantillas inglesas y `--lang`) sigue futura. Para migrar sin perder personalizaciones, seguir [Inicio rápido](QUICKSTART.md#actualizar-una-instalación-previa).
