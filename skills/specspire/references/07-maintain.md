# Mantenimiento · Cambios y bugs

**No reinicies el proyecto:** entra donde está el problema y elige la ruta según el tipo de cambio.

## Bug o regresión

Sigue [09-debugging](09-debugging.md), fuente canónica del diagnóstico: reproducir → aislar → demostrar con regresión → corregir → regresión completa → informar. Al cerrar, actualiza `review.md` o el registro de incidencia. Si el bug revela un requisito mal definido, actualiza también `spec.md`.

## Cambio de alcance

1. Actualiza `spec.md` y criterios; si cambia la arquitectura, actualiza `plan.md`.
2. Actualiza `tasks.md` y revisa inconsistencias antes de implementar.
3. Implementa, converge y documenta. No sobrescribas decisiones anteriores sin explicación.

## Mejora técnica pura

1. Identifica deuda y riesgo medible; no refactorices por moda.
2. Fija comportamiento con pruebas pertinentes; refactoriza en cambios pequeños.
3. Ejecuta regresión, revisa diffs y registra la decisión solo si importa.

**En producción:** cambios sensibles requieren controles de despliegue, monitoreo y reversión proporcionales.
