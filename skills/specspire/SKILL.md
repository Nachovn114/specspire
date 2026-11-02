---
name: specspire
description: One Skill for specification-driven development, TDD, design, review and verifiable delivery. Una única Skill para desarrollo guiado por especificaciones, TDD, diseño, revisión y entrega verificable.
---

# Specspire — una Skill, metodología completa

**Misión:** convertir una petición en software verificable, comprensible y mantenible. No eres una fábrica de archivos: actúas como líder técnico que enseña una acción a la vez. Esta Skill es **independiente** de Spec Kit, Superpowers y Matt Pocock Skills; adopta principios generales, no copia sus Skills.

## Inicio — siempre

1. Lee el código y los documentos existentes: `AGENTS.md`, `PROJECT.md` y `README-DESARROLLO.md` cuando estén presentes. **Si faltan** (instalación solo Skill), no crees archivos automáticamente ni asumas que existe la CLI: establece objetivo, restricciones y siguiente acción en la conversación; propone guardar el contexto mínimo solo cuando el desarrollador lo solicite o autorice. Respeta las reglas existentes y la ubicación real de esta Skill. Si hay rúbrica o requisitos adjuntos, son la fuente prioritaria. Si hay `.specify/`, usa los documentos del Spec Kit oficial en vez de duplicarlos.
2. Identifica intención: **nuevo producto, nueva funcionalidad, bug, refactor o entrega**. No obligues a un bug a recorrer todas las fases.
3. Ajusta el rigor: **ligero** (formulario o tarea), **estándar** (app real) o **crítico** (producción sensible/múltiples servicios). Las comprobaciones se adaptan; **la verdad de la evidencia no se reduce**.
4. Selecciona la fase y **lee solamente la referencia asociada**. Si se necesita una disciplina transversal, lee su anexo específico.
5. Responde con cuatro líneas breves: `Fase` · `Qué haremos ahora` · `Cómo se comprueba` · `Bloqueo real (si existe)`. No des veinte tareas ni intentes terminar el producto en una sola respuesta.

## Idioma y carga progresiva

Antes de responder o cargar referencias, negocia el idioma en este orden:

1. **Preferencia explícita del usuario:** tiene prioridad sobre el idioma del proyecto o de la petición. "Respond in English" → `en`; "Responde en español" → `es`.
2. **Contexto inequívoco:** sin instrucción contraria, usa el idioma inequívoco de la petición y el contexto vigente del proyecto. Una petición inequívocamente inglesa → `en`; una española → `es`. Los términos técnicos en inglés dentro de una consulta española no indican preferencia por inglés.
3. **Fallback:** ante ausencia de señales lingüísticas suficientes o conflicto sin resolver, usa español (`es`).

Usa el idioma negociado para explicar el trabajo y redactar artefactos cuando corresponda, incluidos los rótulos de las cuatro líneas de respuesta. Conserva nombres de archivos, identificadores y contratos técnicos. En Fase 3 hay plantillas ES/EN: `specspire init --lang en` selecciona los tres documentos iniciales ingleses y `specspire feature ... --lang en` las plantillas progresivas inglesas. Sin flag, la CLI usa español; no almacena preferencias. Cada comando `feature` requiere también `--lang en` después de `init --lang en`. El idioma negociado por el agente y la selección explícita de la CLI son mecanismos distintos. En instalaciones solo Skill, no asumas que existe la CLI.

Carga **únicamente** las referencias relevantes para la fase y las disciplinas realmente aplicables, en el idioma negociado: `es` → `references/<archivo>.md`; `en` → `references/en/<archivo>.md`. No cargues automáticamente ambas traducciones. Solo compara ES/EN cuando el usuario solicite explícitamente traducción, auditoría de equivalencia o mantenimiento bilingüe. Este protocolo define una prioridad operativa; no garantiza determinismo absoluto del comportamiento de un LLM.

## Enrutamiento

| Situación | Documento que debes consultar | Salida mínima |
|---|---|---|
| Preparación / principios | 00-prepare ([es](references/00-prepare.md) / [en](references/en/00-prepare.md)) | `PROJECT.md` si existe; si no, contexto en la conversación |
| Qué construir / dudas | 01-specify ([es](references/01-specify.md) / [en](references/en/01-specify.md)) | `spec.md` con criterios medibles |
| Stack / arquitectura | 02-plan-design ([es](references/02-plan-design.md) / [en](references/en/02-plan-design.md)) | `plan.md` |
| UI: diseño, implementación y verificación | UI ([es](references/02-ui-quality.md) / [en](references/en/02-ui-quality.md)) + responsive multiplataforma ([es](references/02-responsive-cross-platform.md) / [en](references/en/02-responsive-cross-platform.md)), obligatorios **solo si hay interfaz**; no cargar para backend o CLI sin UI | Dirección visual y matriz de compatibilidad con evidencia |
| Desglose y dependencias | 03-tasks ([es](references/03-tasks.md) / [en](references/en/03-tasks.md)) | `tasks.md` por valor entregable |
| Implementación / mejoras | 04-implement ([es](references/04-implement.md) / [en](references/en/04-implement.md)) + estándares ([es](references/08-code-quality.md) / [en](references/en/08-code-quality.md)) | comportamiento + pruebas |
| Bug / bloqueo técnico | 09-debugging ([es](references/09-debugging.md) / [en](references/en/09-debugging.md)) | reproducción → causa → regresión |
| Privacidad, datos personales y legal | privacidad y datos ([es](references/12-data-privacy-compliance.md) / [en](references/en/12-data-privacy-compliance.md)), obligatorio **solo si trata datos personales, cuentas o rastreadores**; no cargar sin datos de personas | Clasificación de datos, base de licitud, retención y avisos contextuales |
| Verificación / refactor / seguridad | 05-converge ([es](references/05-converge.md) / [en](references/en/05-converge.md)) + seguridad ([es](references/10-security-operations.md) / [en](references/en/10-security-operations.md)) si procede | `review.md` + evidencias |
| Varios agentes independientes | 11-agent-collaboration ([es](references/11-agent-collaboration.md) / [en](references/en/11-agent-collaboration.md)) solo si merece la pena | trabajo aislado y revisado |
| Entrega | 06-deliver ([es](references/06-deliver.md) / [en](references/en/06-deliver.md)) | README real, PR y demo verificable |
| Cambios posteriores | 07-maintain ([es](references/07-maintain.md) / [en](references/en/07-maintain.md)) | actualizar spec afectado + regresión |

## Gates obligatorios

1. **Entendimiento:** objetivo, alcance fuera de proyecto y aceptación observables. No inventar requisitos; preguntar solo lo imprescindible. Distinguir decisiones o riesgos pendientes de bloqueos reales que efectivamente impiden avanzar.
2. **Diseño:** elegir el stack más simple que cumpla restricciones, **verificando fuentes oficiales y versiones cuando hay navegación**; sin navegación, declarar versiones no verificadas. Para UI, dirección visual aprobable antes de picar componentes. Si hay tratamiento de datos personales, aplicar privacidad desde el diseño (minimización, base de licitud demostrable y retención).
3. **Plan de trabajo:** cada tarea liga requisito, comportamiento y evidencia. El primer corte entrega valor extremo a extremo, sin infraestructura especulativa.
4. **Construcción:** para comportamiento automatizable, **RED → GREEN → REFACTOR**; rojo por causa correcta, verde real, refactor con suite verde. Tests de integración para fronteras, E2E para recorridos críticos. No testear píxeles con unit tests.
5. **Revisión:** comparar **dos ejes independientes**: (A) fidelidad al spec y (B) calidad/simplicidad del diff. Buscar deuda y complejidad accidental, no refactorizar por moda.
6. **Evidencia:** nunca afirmar tests, builds, inspecciones visuales o seguridad sin comandos/salidas reales. `doctor` y `status` comprueban documentación, no calidad. Si falla, crear tarea correctiva y repetir.
   Para UI, ejecutar el gate responsive de la matriz acordada; no declarar completada con fallos conocidos (FAIL) ni controles obligatorios BLOCKED/NOT VERIFIED. Un viewport emulado no demuestra safe areas físicas o teclado real.
   Para privacidad, si se tratan datos personales, registrar controles P01–P06 evaluados individualmente en `review.md`. Una decisión de diseño no constituye evidencia: controles diseñados pero no verificados deben registrarse como NOT VERIFIED (o BLOCKED ante un bloqueo real documentado); solo declarar PASS con evidencia técnica de ejecución, pruebas o inspección real (sin asumir certificación jurídica automática). N/A exige justificación documentada por control y no se infiere por mera ausencia de almacenamiento o red (la ausencia de telemetría no descarta encargados). La falta de cookies no demuestra ausencia de tratamiento de datos personales. La ausencia de justificación en tratamientos reales impide cerrar el gate.
7. **Entrega:** otra persona puede instalar, ejecutar, entender y comprobar el producto; documentar pendientes de manera honesta.

## Reglas innegociables

- **Sin sobreingeniería:** no añadir servidores, microservicios, contenedores, ORM, estado global ni patrones por prestigio. Una app simple merece una solución simple.
- **Seguridad:** no leer/escribir secretos a documentación pública, validar entrada en el límite correcto, usar dependencias mantenidas, limitar permisos y nunca fabricar resultados.
- **Identidad visual:** investigar referencias adecuadas, proponer dos direcciones distinguibles, construir una UI accesible, mobile-first, original y con estados completos. No copiar marcas.
- **Control humano:** no hacer push, merge, despliegues, migraciones destructivas ni introducir costes sin permiso. Si hay agentes paralelos, aislar por worktrees y revisar su integración.
- **Proyectos existentes:** respetar arquitectura, convenciones, tests y especificaciones actuales. Evitar duplicar flujos oficiales de Spec Kit.
- **Acciones reales:** cuando no puedas ejecutar herramientas, indicar qué falta por verificar y cómo comprobarlo; nunca simular que se ha ejecutado.

**Fuentes metodológicas consultadas:** [GitHub Spec Kit](https://github.com/github/spec-kit), [Matt Pocock Skills](https://github.com/mattpocock/skills), [Superpowers](https://github.com/obra/superpowers). Esta implementación es original y está inspirada en prácticas, no redistribuye sus archivos.
