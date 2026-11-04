# Referencia de terminal (CLI)

[English README](../README.md) · [Inicio rápido](QUICKSTART.md) · [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Volver al README](../README.es.md)

Specspire cuenta con **una única Skill de IA**, pero proporciona una CLI complementaria para inicializar repositorios, comprobar integridad documental y crear plantillas progresivas de funcionalidades.

---

## Comandos disponibles

| Comando | Descripción | Flags admitidos |
|---|---|---|
| `specspire init` | Instala guías de proyecto, reglas y la Skill bilingüe de 34 archivos. | `--lang es\|en`, `--dry-run`, `--target <dir>` |
| `specspire doctor` | Audita la integridad física y documental de la Skill y del proyecto. | `--target <dir>` |
| `specspire next [slug]` | Analiza el estado de los documentos e indica la siguiente acción. | `--target <dir>` |
| `specspire status` | Resume el estado de especificaciones y funcionalidades activas. | `--target <dir>` |
| `specspire feature new <slug>` | Crea `spec.md` para una nueva funcionalidad. | `--lang es\|en`, `--target <dir>` |
| `specspire feature plan <slug>` | Crea `plan.md` tras completar y revisar la especificación. | `--lang es\|en`, `--target <dir>` |
| `specspire feature design <slug>` | Crea `design.md` (únicamente si la funcionalidad incluye UI). | `--lang es\|en`, `--target <dir>` |
| `specspire feature tasks <slug>` | Crea `tasks.md` tras completar el plan y diseño. | `--lang es\|en`, `--target <dir>` |
| `specspire feature review <slug>` | Crea `review.md` para registrar evidencias y controles de calidad. | `--lang es\|en`, `--target <dir>` |
| `specspire validate-source` | Verifica la integridad interna de la Skill fuente. | Ninguno |

El parámetro `<slug>` admite letras minúsculas, números y guiones (por ejemplo `auth-login`, `task-api`).

---

## Ejecución sin instalación global

No es necesario instalar Specspire de forma global en tu sistema. Desde la carpeta de tu proyecto:

```powershell
# En Windows (PowerShell)
node path/to/specspire/bin/specspire.mjs init --lang es
node path/to/specspire/bin/specspire.mjs doctor
node path/to/specspire/bin/specspire.mjs next

# En Linux / macOS
node path/to/specspire/bin/specspire.mjs init --lang es
node path/to/specspire/bin/specspire.mjs doctor
node path/to/specspire/bin/specspire.mjs next
```

---

## Códigos de salida (Exit Codes)

La CLI utiliza códigos de salida semánticos para integrarse limpiamente con scripts y pipelines:

### `specspire doctor`
| Código | Estado | Significado |
|:---:|---|---|
| `0` | **PASS** | Instalación íntegra y contrato bilingüe de 34 archivos verificado (`SKILL.md`, 30 referencias ES/EN y 3 plantillas base). |
| `1` | **FAIL** | Instalación incompleta, dañada o con archivos faltantes/inválidos. Requiere ejecutar `init` o revisar errores. |
| `2` | **MIGRATION REQUIRED** | Se detectó un router `SKILL.md` heredado de una versión previa. Requiere actualización manual controlada. |

### Otros comandos
- `0`: Operación completada con éxito.
- `1`: Error de validación (argumentos inválidos, flags no reconocidos, dependencias de fase insatisfechas o symlinks no permitidos).

---

## Contrato de seguridad e idempotencia

1. **Escrituras seguras y no destructivas:** `init` nunca sobrescribe archivos existentes. Si tu proyecto ya cuenta con un `PROJECT.md` o `AGENTS.md` personalizado, Specspire lo respeta íntegramente y reporta `EXISTE`.
2. **Defensa contra Path Traversal:** Los identificadores de funcionalidad (`<slug>`) son estrictamente validados para impedir rutas relativas maliciosas (`../`) o caracteres de escape.
3. **Bloqueo defensivo de Symlinks:** Specspire rechaza enlaces simbólicos y junctions en destinos o ancestros para garantizar la integridad del sistema de archivos.

---

## Selección de idioma de plantillas (`--lang`)

Specspire incluye soporte nativo para plantillas en español e inglés:

```bash
# Inicializar repositorio en inglés
specspire init --lang en

# Inicializar funcionalidad con plantillas en inglés
specspire feature new task-api --lang en
specspire feature plan task-api --lang en
specspire feature tasks task-api --lang en
specspire feature review task-api --lang en
```

- Valores permitidos: `es` (predeterminado) y `en`.
- Únicamente `init` y los comandos `feature` aceptan el flag `--lang`. Comandos como `doctor`, `status` y `next` analizan los archivos existentes independientemente del idioma seleccionado.
- Cambiar el flag `--lang` selecciona la fuente para archivos nuevos; nunca traduce ni altera documentos ya existentes.

---

## Modo simulación (`--dry-run`)

Para auditar exactamente qué archivos y directorios crearía un comando sin realizar escrituras reales en disco:

```bash
specspire init --dry-run
specspire feature new checkout --dry-run
```

---

Siguiente paso: [Inicio rápido](QUICKSTART.md) · [Flujo de desarrollo](WORKFLOW.md) · [Controles de calidad](QUALITY.md) · [Volver al README](../README.es.md)
