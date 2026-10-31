# Flujo de desarrollo

**Regla:** una acción verificable por vez. La profundidad del proceso depende de la complejidad; su integridad no.

Este documento es el mapa del proceso. Cómo se registra y valida la evidencia de cada gate está en [Controles de calidad](QUALITY.md).

| Etapa | Haz esto | Artefacto mínimo | Para avanzar |
|---|---|---|---|
| **0 · Contexto** | Define problema, usuarios y restricciones | `PROJECT.md` o contexto en el chat | Alcance y exclusiones entendidos |
| **1 · Especificación** | Redacta comportamientos y errores | `spec.md` | Criterios observables, sin ambigüedades críticas |
| **2 · Plan / UI** | Elige la solución más simple, justifica stack | `plan.md`, `design.md` si UI | Riesgos y alternativas razonados |
| **3 · Tareas** | Divide en incrementos verticales | `tasks.md` | Cada tarea tiene resultado y comprobación |
| **4 · Desarrollo** | RED → GREEN → REFACTOR cuando es automatizable | Código + tests | Funcionalidad comprobable, no solo código escrito |
| **5 · Convergencia** | Compara requisitos vs resultado; revisa diff | `review.md` | Defectos corregidos o documentados |
| **6 · Entrega** | Documenta ejecución, pruebas y pendientes | README del producto | Otra persona reproduce el resultado |

En una instalación solo Skill, la etapa 0 vive en la conversación hasta que autorices guardar un documento. El resto de artefactos también se crean con tu acuerdo.

## Decisiones que evitan sobreingeniería

- **Formulario local:** normalmente no necesita servidor, microservicios ni base de datos.
- **Web con persistencia:** incorpora API y almacenamiento cuando exista el requisito.
- **Aplicación en producción:** suma observabilidad, CI/CD y protección proporcional al riesgo.
- **Proyecto académico:** sigue primero la rúbrica y conserva evidencias solicitadas.

## Cambios durante el desarrollo

No reinicies el proceso: entra en la etapa afectada.

| Situación | Qué hacer | Referencia del agente |
|---|---|---|
| Requisito nuevo o cambio de alcance | Actualiza solo los documentos afectados y reevalúa tareas | [07-maintain](../skills/specspire/references/07-maintain.md) |
| Bug o regresión | Reproduce, diagnostica, crea regresión y corrige | [09-debugging](../skills/specspire/references/09-debugging.md) |
| Tratamiento de datos personales o rastreadores | Aplica privacidad desde el diseño, base de licitud y retención | [12-data-privacy-compliance](../skills/specspire/references/12-data-privacy-compliance.md) |
| `review.md` detecta diferencias con la especificación | Crea tareas correctivas y repite desarrollo → verificación | [05-converge](../skills/specspire/references/05-converge.md) |

## Un mensaje útil para el agente

```text
Continúa con Specspire desde el estado actual.
Lee la funcionalidad activa y el código relacionado.
Dime: fase, siguiente acción, evidencia exigida y bloqueo real.
No anticipes fases ni declares resultados que no ejecutaste.
```

Siguiente: [Controles de calidad](QUALITY.md) · [Inicio rápido](QUICKSTART.md) · [Volver al README](../README.es.md)
