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

La arquitectura de Specspire `v1.0.0` está formalmente publicada y respaldada por 10 controles de CI multiplataforma (Ubuntu, Windows, macOS sobre Node.js 20, 22 y 24, con el gate obligatorio `required` en SUCCESS).

- **Instalación y empaquetado:** El paquete revisado contiene exactamente 68 archivos e instala hasta 34 archivos en el proyecto consumidor (3 documentos base del idioma seleccionado, `SKILL.md` y 30 referencias técnicas: 15 ES + 15 EN). Las 10 plantillas progresivas restantes se generan bajo demanda mediante `feature new`.
- **Modo de distribución:** El repositorio Git, sus tags anotados y las releases de GitHub constituyen el canal oficial de distribución. El paquete no se encuentra publicado en el registro de npm.
- **Interoperabilidad de agentes:** La Skill ha sido verificada en T3 Code / Antigravity ACP y Google Antigravity en escenarios interactivos. No se garantiza obediencia universal en modelos o arquitecturas externas no evaluadas.
- **Historial de auditorías y benchmarks:** Las mediciones históricas de versiones beta, cuotas de entornos y transiciones de desarrollo se preservan intactas en el repositorio GitHub ([`docs/audits/`](https://github.com/Nachovn114/specspire/tree/main/docs/audits)). Para actualizar instalaciones personalizadas sin sobreescrituras destructivas, consulta [Inicio rápido](QUICKSTART.md#actualizar-una-instalación-previa).
