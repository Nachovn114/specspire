# Controles de calidad — evidencia antes de aprobar

**No basta con afirmar «está listo».** Cada control exige evidencia observada, proporcional al proyecto. Este documento es el protocolo de evidencia; el orden de las etapas está en el [flujo de desarrollo](WORKFLOW.md).

## Controles

| Control | Evidencia mínima | Si falla |
|---|---|---|
| Requisitos | Escenarios de aceptación revisados | Corregir spec o implementación |
| Pruebas | Resultado reciente del comando real | Reparar fallo y repetir |
| Código | Diff revisado, sin duplicación ni abstracciones injustificadas | Simplificar y volver a comprobar |
| Integración | Flujos críticos ejecutados | Abrir tarea correctiva |
| Seguridad | Entradas, permisos y secretos verificados según riesgo | Corregir antes de entrega |
| Privacidad, cuando aplica | Minimización, base de licitud, retención y avisos (P01–P06) | Corregir flujo o textos antes de entrega |
| UI/UX, cuando aplica | Navegador, responsive, accesibilidad y estados | Registrar hallazgos y volver a probar |
| Reproducibilidad | Instrucciones de arranque probadas | Arreglar README y/o configuración |

## Estados de resultado

Se usa el mismo vocabulario que `review.md` y el estándar responsive:

| Estado | Significado |
|---|---|
| `PASS` | Se ejecutó y el resultado observado cumple el criterio |
| `FAIL` | Se ejecutó y no cumple; requiere tarea correctiva |
| `BLOCKED` | No se pudo ejecutar por una causa identificada (permisos, hardware, entorno) |
| `NOT VERIFIED` | No se ejecutó o no hubo herramienta disponible |

`BLOCKED` y `NOT VERIFIED` nunca cuentan como `PASS`. Un control obligatorio en esos estados impide declarar la tarea completa.

### Aclaración sobre N/A en controles de privacidad

El estado `N/A` está reservado exclusivamente a los controles de privacidad P01–P06 cuando un control específico resulta inaplicable al tratamiento evaluado. Cada uso de `N/A` exige una justificación documentada en la revisión. Está prohibido inferir `N/A` automáticamente por la simple ausencia de backend, almacenamiento permanente, red o cookies: el procesamiento transitorio en memoria sigue constituyendo tratamiento de datos personales, la ausencia de red no demuestra por sí sola inexistencia de terceros encargados y la falta de cookies no descarta operaciones en terminal ni exime de evaluar el tratamiento de datos.

## Pruebas sin simulaciones

Un test rojo útil falla por un requisito que todavía no se implementó, **no** por errores de compilación. Un test verde requiere ejecutar el comando y observar el resultado; la suite general también debe comprobarse antes de cerrar cambios.

Registrar en `review.md`:

```text
Requisito: RF-01
Prueba/acción: npm test
Resultado observado: [salida real]
Estado: PASS / FAIL / BLOCKED / NOT VERIFIED
Evidencia: [log, ruta, captura o comando]
```

No inventes logs, capturas ni métricas.

## Qué no debe imponer Specspire

- Docker, Kubernetes, CI compleja ni autenticación donde no se necesiten.
- Cien pruebas que no verifican comportamiento útil.
- Dependencias nuevas sin una justificación concreta.
- Refactors de código ajeno fuera del alcance del cambio.

La complejidad empresarial se justifica por **necesidades reales**: disponibilidad, operaciones, seguridad, volumen y equipos; no por apariencia de sofisticación.

Más detalles: [Flujo de desarrollo](WORKFLOW.md) · [Diseño UI/UX](DESIGN.md) · [Volver al README](../README.es.md)
