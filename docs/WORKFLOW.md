# Flujo de desarrollo — De la idea a la entrega verificada

[English](en/WORKFLOW.md) · [Inicio rápido](QUICKSTART.md) · [Controles de calidad](QUALITY.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)

**Regla de oro:** Una sola acción verificable a la vez. La profundidad del proceso se adapta a la complejidad; la integridad de la evidencia no se negocia.

Este documento explica las siete fases del ciclo de vida de Specspire y demuestra su aplicación práctica mediante un ejemplo real: **"Construir una API de gestión de tareas"**.

---

## Las siete fases de Specspire

```text
Contexto → Especificar → Plan y diseño → Tareas → Construir (TDD) → Verificar → Entregar
```

| Fase | Enfoque | Artefacto mínimo | Criterio para avanzar |
|---|---|---|---|
| **0 · Contexto** | Define problema, usuarios y no-objetivos | `PROJECT.md` (o chat) | Alcance y exclusiones acordados |
| **1 · Especificación** | Historias de usuario y casos borde | `spec.md` | Criterios de aceptación observables, sin ambigüedades |
| **2 · Plan y diseño** | Stack mínimo y arquitectura simple | `plan.md` (`design.md` si UI) | Riesgos evaluados y stack justificado |
| **3 · Tareas** | Desglose en cortes verticales | `tasks.md` | Cada tarea define un resultado y su prueba |
| **4 · Construcción** | Ciclos TDD: RED → GREEN → REFACTOR | Código + tests | Funcionalidad probada con aserciones reales |
| **5 · Convergencia** | Reconciliación de spec vs diff real | `review.md` | Cero discrepancias o desviaciones documentadas |
| **6 · Entrega** | Manual de ejecución y evidencias | README del producto | Un tercero reproduce el proyecto en frío |

> [!NOTE]
> En modo **Solo Skill**, la Fase 0 reside en la conversación hasta que autorices crear un archivo. Ningún artefacto se genera sin tu consentimiento.

---

## Ejemplo guiado: "Construir una API de gestión de tareas"

Veamos cómo avanza una solicitud real a través de las siete fases:

### Fase 0: Contexto y Descubrimiento
- **Petición del desarrollador:** *"Quiero construir una API REST ligera para gestionar tareas personales con Node.js."*
- **Qué hace el agente:** Formula preguntas clave sobre límites, stack y exclusiones. No escribe código ni crea carpetas.
- **Qué decide el desarrollador:** Confirma que será una API HTTP nativa en memoria (sin base de datos externa en esta versión), sin autenticación multiusuario inicial.
- **Artefacto producido:** `PROJECT.md` (o resumen acordado en el chat).
- **Cómo se verifica:** Confirmación explícita del alcance antes de pasar a la siguiente fase.

### Fase 1: Especificación (`spec.md`)
- **Qué hace el agente:** Redacta historias de usuario con criterios observables:
  - `POST /tasks`: crea una tarea con título obligatorio; retorna `201 Created` con id generado.
  - `GET /tasks`: lista las tareas existentes; retorna `200 OK`.
  - Validación: si el título está vacío, retorna `400 Bad Request`.
- **Qué decide el desarrollador:** Revisa que los códigos HTTP y formatos JSON cumplan los requisitos.
- **Artefacto producido:** `specs/task-api/spec.md`.
- **Cómo se verifica:** Cero ambigüedades críticas en los criterios de aceptación.

### Fase 2: Planificación y Arquitectura (`plan.md`)
- **Qué hace el agente:** Propone la arquitectura más simple posible: servidor HTTP nativo (`node:http`), almacenamiento en memoria (`Map`), y test runner integrado (`node:test`).
- **Qué decide el desarrollador:** Aprueba el plan y confirma que no se requieren frameworks externos (como Express o Fastify) para este alcance.
- **Artefacto producido:** `specs/task-api/plan.md` (como no hay interfaz visual, `design.md` no aplica).
- **Cómo se verifica:** Justificación clara del stack contra las restricciones del proyecto.

### Fase 3: Desglose de Tareas (`tasks.md`)
- **Qué hace el agente:** Divide la construcción en tareas verticales e independientes:
  - Tarea 1: Servidor HTTP base y endpoint de salud (`GET /health`).
  - Tarea 2: Creación de tareas (`POST /tasks`) con validación de título.
  - Tarea 3: Listado de tareas (`GET /tasks`).
- **Qué decide el desarrollador:** Valida el orden de implementación y las comprobaciones asociadas.
- **Artefacto producido:** `specs/task-api/tasks.md`.
- **Cómo se verifica:** Cada tarea incluye un comando concreto de verificación.

### Fase 4: Construcción guiada por pruebas (TDD)
- **Qué hace el agente:** Sigue rigurosamente el ciclo RED → GREEN → REFACTOR:
  1. **RED:** Escribe una prueba en `tests/tasks.test.mjs` para `POST /tasks` y ejecuta `node --test`. La prueba falla legítimamente por aserción (`AssertionError`), no por error de sintaxis o importación.
  2. **GREEN:** Implementa el manejador mínimo en `src/server.mjs`. Ejecuta `node --test` y observa que la prueba pasa a verde.
  3. **REFACTOR:** Limpia el código manteniendo la suite de pruebas en verde.
- **Qué decide el desarrollador:** Inspecciona el diff y los resultados reales del comando de pruebas.
- **Artefacto producido:** Código fuente y pruebas automatizadas.
- **Cómo se verifica:** Salida real de la terminal con todas las pruebas pasando.

### Fase 5: Convergencia y Verificación (`review.md`)
- **Qué hace el agente:** Revisa el diff de Git contra `spec.md`, verifica que no haya dependencias no autorizadas y ejecuta los controles de calidad.
- **Qué decide el desarrollador:** Aprueba el diff y autoriza cerrar la funcionalidad.
- **Artefacto producido:** `specs/task-api/review.md` con estados `PASS` y evidencia de terminal.
- **Cómo se verifica:** Reconciliación completa entre requisitos iniciales y código final.

### Fase 6: Entrega
- **Qué hace el agente:** Documenta los comandos de ejecución y prueba en el README del producto y prepara las notas de entrega.
- **Qué decide el desarrollador:** Realiza la prueba de arranque en frío y aprueba el commit final o Pull Request.
- **Artefacto producido:** Documentación de arranque y confirmación de entrega.
- **Cómo se verifica:** Un tercero puede clonar el repositorio, ejecutar `npm test` y verificar el funcionamiento.

---

## Diferencia entre instrucciones del agente y comandos CLI

Es fundamental distinguir qué ejecuta la CLI de Specspire y qué hace el agente de IA:

| Capacidad | CLI de Specspire (`specspire`) | Agente de IA (guiado por `SKILL.md`) |
|---|---|---|
| **Inicialización** | Copia plantillas y la Skill de forma segura e idempotente. | Lee el contexto existente y adopta el protocolo de 4 líneas. |
| **Scaffolding de features** | Crea carpetas `specs/<slug>/` con plantillas predefinidas. | Completa los campos de la especificación con contenido real. |
| **Diagnóstico (`doctor`)** | Valida la integridad documental y física de los archivos. | Interpreta los hallazgos y corrige discrepancias. |
| **Navegación (`next`)** | Informa el siguiente archivo pendiente según reglas. | Propone la siguiente acción técnica dentro de la fase activa. |
| **Desarrollo (TDD)** | No genera código de la aplicación. | Escribe pruebas rojas, implementa código verde y refactoriza. |
| **Ejecución de pruebas** | No ejecuta los tests de tu aplicación. | Ejecuta los comandos del proyecto (`npm test`) y registra la salida real. |

---

## Gestión de cambios y adaptabilidad

No es necesario generar los siete documentos para cada pequeño cambio o corrección de bugs:

| Situación | Flujo recomendado | Referencia técnica |
|---|---|---|
| **Bug o regresión** | Reproduce con un test rojo, identifica la causa raíz, corrige y verifica la regresión. No requiere rehacer todo el plan. | [09-debugging](../skills/specspire/references/09-debugging.md) |
| **Cambio de alcance** | Actualiza únicamente las secciones afectadas de `spec.md` y `tasks.md`. | [07-maintain](../skills/specspire/references/07-maintain.md) |
| **Tratamiento de datos personales** | Aplica principios de privacidad desde el diseño (P01–P06) solo si hay datos personales. | [12-data-privacy-compliance](../skills/specspire/references/12-data-privacy-compliance.md) |
| **Diferencias en `review.md`** | Añade tareas correctivas en `tasks.md` y repite el ciclo Construcción → Verificación. | [05-converge](../skills/specspire/references/05-converge.md) |

---

## Mensaje útil de dirección (Steering Prompt)

Cuando retomes el trabajo con tu agente, utiliza esta instrucción:

```text
Continúa con Specspire desde el estado actual del proyecto.
Lee los documentos de la funcionalidad activa y el código fuente relacionado.
Informa en 4 líneas: fase actual, siguiente acción concreta, evidencia requerida y bloqueos reales.
No saltes fases ni afirmes haber ejecutado pruebas que no corriste.
```

---

Siguiente paso: [Controles de calidad](QUALITY.md) · [Inicio rápido](QUICKSTART.md) · [Referencia CLI](CLI.md) · [Volver al README](../README.es.md)
