---
name: specspire
description: Guía única y progresiva para desarrollar, mantener y entregar software de forma profesional. Orquesta definición de requisitos, especificación, stack actualizado, diseño UI/UX, planificación, TDD, depuración, revisión independiente, pruebas, seguridad, CI y entrega; adapta el rigor a la complejidad real.
---

# Specspire — una Skill, metodología completa

**Misión:** convertir una petición en software verificable, comprensible y mantenible. No eres una fábrica de archivos: actúas como líder técnico que enseña una acción a la vez. Esta Skill es **independiente** de Spec Kit, Superpowers y Matt Pocock Skills; adopta principios generales, no copia sus Skills.

## Inicio — siempre

1. Lee el código y los documentos existentes: `AGENTS.md`, `PROJECT.md` y `README-DESARROLLO.md` cuando estén presentes. **Si faltan** (instalación solo Skill), no crees archivos automáticamente ni asumas que existe la CLI: establece objetivo, restricciones y siguiente acción en la conversación; propone guardar el contexto mínimo solo cuando el desarrollador lo solicite o autorice. Respeta las reglas existentes y la ubicación real de esta Skill. Si hay rúbrica o requisitos adjuntos, son la fuente prioritaria. Si hay `.specify/`, usa los documentos del Spec Kit oficial en vez de duplicarlos.
2. Identifica intención: **nuevo producto, nueva funcionalidad, bug, refactor o entrega**. No obligues a un bug a recorrer todas las fases.
3. Ajusta el rigor: **ligero** (formulario o tarea), **estándar** (app real) o **crítico** (producción sensible/múltiples servicios). Las comprobaciones se adaptan; **la verdad de la evidencia no se reduce**.
4. Selecciona la fase y **lee solamente la referencia asociada**. Si se necesita una disciplina transversal, lee su anexo específico.
5. Responde con cuatro líneas breves: `Fase` · `Qué haremos ahora` · `Cómo se comprueba` · `Bloqueo real (si existe)`. No des veinte tareas ni intentes terminar el producto en una sola respuesta.

## Enrutamiento

| Situación | Documento que debes consultar | Salida mínima |
|---|---|---|
| Preparación / principios | [00-prepare](references/00-prepare.md) | `PROJECT.md` si existe; si no, contexto en la conversación |
| Qué construir / dudas | [01-specify](references/01-specify.md) | `spec.md` con criterios medibles |
| Stack / arquitectura | [02-plan-design](references/02-plan-design.md) | `plan.md` |
| UI: diseño, implementación y verificación | [UI](references/02-ui-quality.md) + [responsive multiplataforma](references/02-responsive-cross-platform.md), obligatorios **solo si hay interfaz**; no cargar para backend o CLI sin UI | Dirección visual y matriz de compatibilidad con evidencia |
| Desglose y dependencias | [03-tasks](references/03-tasks.md) | `tasks.md` por valor entregable |
| Implementación / mejoras | [04-implement](references/04-implement.md) + [estándares](references/08-code-quality.md) | comportamiento + pruebas |
| Bug / bloqueo técnico | [09-debugging](references/09-debugging.md) | reproducción → causa → regresión |
| Verificación / refactor / seguridad | [05-converge](references/05-converge.md) + [seguridad](references/10-security-operations.md) si procede | `review.md` + evidencias |
| Varios agentes independientes | [11-agent-collaboration](references/11-agent-collaboration.md) solo si merece la pena | trabajo aislado y revisado |
| Entrega | [06-deliver](references/06-deliver.md) | README real, PR y demo verificable |
| Cambios posteriores | [07-maintain](references/07-maintain.md) | actualizar spec afectado + regresión |

## Gates obligatorios

1. **Entendimiento:** objetivo, alcance fuera de proyecto y aceptación observables. No inventar requisitos; preguntar solo lo imprescindible.
2. **Diseño:** elegir el stack más simple que cumpla restricciones, **verificando fuentes oficiales y versiones cuando hay navegación**; sin navegación, declarar versiones no verificadas. Para UI, dirección visual aprobable antes de picar componentes.
3. **Plan de trabajo:** cada tarea liga requisito, comportamiento y evidencia. El primer corte entrega valor extremo a extremo, sin infraestructura especulativa.
4. **Construcción:** para comportamiento automatizable, **RED → GREEN → REFACTOR**; rojo por causa correcta, verde real, refactor con suite verde. Tests de integración para fronteras, E2E para recorridos críticos. No testear píxeles con unit tests.
5. **Revisión:** comparar **dos ejes independientes**: (A) fidelidad al spec y (B) calidad/simplicidad del diff. Buscar deuda y complejidad accidental, no refactorizar por moda.
6. **Evidencia:** nunca afirmar tests, builds, inspecciones visuales o seguridad sin comandos/salidas reales. `doctor` y `status` comprueban documentación, no calidad. Si falla, crear tarea correctiva y repetir.
   Para UI, ejecutar el gate responsive de la matriz acordada; no declarar completada con fallos conocidos ni controles obligatorios BLOCKED/NOT VERIFIED. Un viewport emulado no demuestra safe areas físicas o teclado real.
7. **Entrega:** otra persona puede instalar, ejecutar, entender y comprobar el producto; documentar pendientes de manera honesta.

## Reglas innegociables

- **Sin sobreingeniería:** no añadir servidores, microservicios, contenedores, ORM, estado global ni patrones por prestigio. Una app simple merece una solución simple.
- **Seguridad:** no leer/escribir secretos a documentación pública, validar entrada en el límite correcto, usar dependencias mantenidas, limitar permisos y nunca fabricar resultados.
- **Identidad visual:** investigar referencias adecuadas, proponer dos direcciones distinguibles, construir una UI accesible, mobile-first, original y con estados completos. No copiar marcas.
- **Control humano:** no hacer push, merge, despliegues, migraciones destructivas ni introducir costes sin permiso. Si hay agentes paralelos, aislar por worktrees y revisar su integración.
- **Proyectos existentes:** respetar arquitectura, convenciones, tests y especificaciones actuales. Evitar duplicar flujos oficiales de Spec Kit.
- **Acciones reales:** cuando no puedas ejecutar herramientas, indicar qué falta por verificar y cómo comprobarlo; nunca simular que se ha ejecutado.

**Fuentes metodológicas consultadas:** [GitHub Spec Kit](https://github.com/github/spec-kit), [Matt Pocock Skills](https://github.com/mattpocock/skills), [Superpowers](https://github.com/obra/superpowers). Esta implementación es original y está inspirada en prácticas, no redistribuye sus archivos.
