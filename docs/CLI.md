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
