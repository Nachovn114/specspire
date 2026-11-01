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

Una Skill pública y un `SKILL.md`; 15 referencias ES y 15 EN. `init` instala **34 archivos**: 3 documentos base, el router y 30 referencias. Las 5 plantillas progresivas se crean bajo demanda, no forman parte de esos 34 archivos. Todas las plantillas siguen en español; no existe `--lang` en Fase 2.

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
