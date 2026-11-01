# Referencia de terminal

Specspire tiene **una sola Skill**, pero su CLI permite instalar el entorno y crear documentos progresivamente. Ningún comando crea por sí solo una aplicación terminada.

| Comando | Para qué sirve |
|---|---|
| `specspire init` | Instalar guía, reglas y Skill; no sobrescribe archivos |
| `specspire init --dry-run` | Mostrar los archivos que se crearían |
| `specspire doctor` | Detectar archivos faltantes, vacíos, no regulares, enlaces y metadatos/referencias inválidos de la Skill |
| `specspire next [slug]` | Orientar sobre el siguiente paso documental |
| `specspire feature new <slug>` | Crear `spec.md` |
| `specspire feature plan <slug>` | Crear `plan.md` si la especificación está preparada |
| `specspire feature design <slug>` | Crear `design.md` solo con interfaz |
| `specspire feature tasks <slug>` | Crear `tasks.md` al completar el plan |
| `specspire feature review <slug>` | Crear `review.md` para registrar evidencias |
| `specspire status` | Mostrar estado de los documentos |
| `specspire validate-source` | Revisar integridad de la Skill fuente |

Todos los comandos aceptan `--target RUTA` cuando corresponda. `slug` admite minúsculas, números y guiones, por ejemplo `formulario-contacto`.

## Contrato bilingüe local (Unreleased)

Una Skill pública y un `SKILL.md`; 15 referencias ES y 15 EN. `init` instala **34 archivos**: 3 documentos base, el router y 30 referencias. Las 5 plantillas progresivas se crean bajo demanda, no forman parte de esos 34 archivos. Fase 3 implementada y validada localmente en `feat/english-project-templates`, sin fusionar en `main` ni publicar. GitHub Actions y la matriz Node 20.0.0/22/24 en Windows, Linux y macOS siguen pendientes para Fase 3. La versión histórica v0.9.0-beta.1 no incluye esta funcionalidad.

Hay ocho plantillas originales ES y ocho contrapartes EN. `init` instala 34 archivos, no 42: tres documentos del idioma elegido, un router y 30 referencias. El tarball local de Fase 3 contiene 68 archivos; el de Fase 2 contenía 60. El idioma predeterminado es español. Usa `init --lang en` y repite `--lang en` en cada comando `feature`. No hay persistencia ni inferencia de idioma; los documentos existentes se conservan y no se traducen automáticamente.

`validate-source` exige ambas colecciones y los 30 enlaces del router. `doctor` distingue:

| Código | Diagnóstico |
|---|---|
| 0 | PASS del contrato bilingüe completo de 34 archivos |
| 2 | Router heredado reconocido, con 15 ES o con EN añadidas; requiere actualización manual y controlada |
| 1 | Instalación incompleta, inválida o corrupta; revisar los errores específicos |

La detección heredada reconoce el contenido conocido del router anterior, normalizando LF/CRLF; no considera heredado cualquier router sin enlaces EN. Un router antiguo personalizado necesita comparación e integración manual, aunque el diagnóstico no lo reconozca como heredado. `init` añade EN ausentes pero **nunca sustituye automáticamente SKILL.md** ni las referencias existentes: añadir EN no completa por sí solo la migración. Consulta el [procedimiento controlado](QUICKSTART.md#actualizar-una-instalación-previa).

Se mantienen escrituras exclusivas, rechazo de symlinks en destinos y ancestros, y rechazo de path traversal en slugs. No desactivar estas defensas para actualizar. Los códigos indican integridad documental, no certificación jurídica ni compatibilidad universal con agentes.

## Sin instalación global

Desde la carpeta del proyecto, con Specspire en una carpeta hermana:

```powershell
node ..\Specspire\bin\specspire.mjs init
node ..\Specspire\bin\specspire.mjs next
```

**Nota:** `doctor`, `status` y `next` interpretan archivos, no verifican automáticamente que se hayan ejecutado tests o que el código esté listo.

`next` muestra un `design.md` pendiente antes de tareas; no exige ese archivo en proyectos sin interfaz. `feature tasks` también rechaza un diseño existente con TODO. Doctor comprueba estructura mínima, no calidad semántica de documentos personalizados.

Las escrituras son exclusivas: si otro proceso crea el archivo final primero, se conserva y se informa `EXISTE`. Init puede quedar parcialmente instalado ante un error posterior; revisa el error y usa doctor antes de reintentar. No elimina ni reemplaza archivos existentes.

Ver [Inicio rápido](QUICKSTART.md).

## Selección explícita de plantillas

```bash
specspire init --lang es
specspire init --lang en
specspire feature new login --lang en
specspire feature plan login --lang en
specspire feature design login --lang en
specspire feature tasks login --lang en
specspire feature review login --lang en
```

Completa y revisa cada documento antes del siguiente comando; design solo corresponde con UI. Valores válidos: `es` y `en`; predeterminado: `es`. Solo init y feature aceptan `--lang`; doctor, status, next y validate-source lo rechazan. Valores ausentes, inválidos o duplicados se rechazan antes de escribir. `--dry-run` simula init o feature sin crear archivos ni directorios y conserva sus validaciones.

Tras `init --lang en`, `feature new login` sin flag genera español. Cambiar el flag solo selecciona fuentes para archivos nuevos: nunca traduce ni reemplaza documentos existentes. `next` reconoce `_Nombre_`, `_Qué problema resuelve_`, `_Name_` y `_What problem it solves_`, sin aceptar --lang. Los placeholders ingleses se reconocen en sus filas de tabla.

El idioma no cambia los códigos 0/1/2 de doctor. Doctor no verifica calidad semántica ni la revisión exacta de documentos personalizados: un router antiguo estructuralmente válido puede no describir Fase 3 y aun pasar. Compara e integra manualmente las actualizaciones documentales.
