# Arquitectura de Specspire

## Estructura del repositorio

```text
specspire/
├── README.md                       # Entrada única para usuarios
├── docs/                           # Guías cortas por intención
│   └── audits/                     # Informes históricos; solo GitHub, fuera del paquete npm
├── examples/                       # Recorridos reproducibles
├── skills/specspire/
│   ├── SKILL.md                    # Enrutador de tareas del agente
│   └── references/                # Disciplinas técnicas bajo demanda
├── templates/                      # Documentos que se instalan en cada proyecto
│   └── feature/                   # Artefactos de una funcionalidad
├── bin/specspire.mjs               # CLI sin dependencias de terceros
├── tests/                          # Pruebas del instalador
└── .github/workflows/ci.yml        # Validación del repositorio
```

## Separación de responsabilidades

- **`SKILL.md`:** decide el procedimiento según intención y fase. Es la única Skill visible.
- **`references/`:** explica cómo ejecutar requisitos, arquitectura, TDD, UX, debugging, revisión, privacidad y entrega; se lee bajo demanda.
- **`templates/`:** entrega documentos mínimos al proyecto. No crea un framework o backend por defecto.
- **CLI:** copia archivos de forma conservadora, crea plantillas bajo demanda y detecta marcadores pendientes.
- **Tests del kit:** prueban instalación y estructura; **no certifican** productos construidos por los agentes.

## Principios de diseño

1. Una fuente de verdad para cada requisito y decisión.
2. Especificación antes de implementación; cambios siempre trazables.
3. Instrucciones progresivas para no saturar al agente ni al junior.
4. Inversión mínima en infraestructura hasta que aparezca una necesidad real.
5. Sin duplicación del flujo de Spec Kit si `.specify/` ya existe.
6. Aprobación humana para operaciones externas, costosas o irreversibles.

## Limitaciones conocidas y estado de verificación

La instalación remota de la Skill mediante `npx skills add` está verificada (detecta exactamente una Skill pública y 15 referencias), y su activación automática fue probada en Google Antigravity en escenarios controlados de Fase 0. Sin embargo, la compatibilidad con otros agentes (Codex, Cursor, etc.), la instalación remota del kit completo (`npm exec github:`) y el desarrollo de aplicaciones completas de producción continúan sin verificar. Los tests del kit validan estructura, instalación e integridad documental, pero no certifican calidad ni cumplimiento legal de las aplicaciones construidas.
