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
- **`references/`:** explica cómo ejecutar requisitos, arquitectura, TDD, UX, debugging, revisión y entrega; se lee bajo demanda.
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

## Limitaciones conocidas

La compatibilidad del reconocimiento automático de la Skill depende del agente. La instalación remota desde GitHub queda pendiente de validación hasta publicar el repositorio. Los resultados de los tests de la CLI no predicen calidad UI/UX ni de arquitectura de las aplicaciones generadas.
