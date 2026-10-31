# Anexo · Orquestación de agentes (opcional)

**Para un formulario pequeño, usar solo un agente.** Paralelizar si hay al menos dos tareas independientes y las herramientas admiten sesiones aisladas.

1. Separar responsabilidades: planificación/contratos, implementación y revisión. No hacer que dos agentes editen la misma carpeta o los mismos archivos simultáneamente.
2. Crear rama y **git worktree por tarea** si el entorno lo soporta. Evitar copiar credenciales entre worktrees. Cada agente recibe spec, tarea, archivos permitidos y pruebas de aceptación.
3. La implementación devuelve diff, pruebas realmente ejecutadas y riesgos; la revisión independiente contrasta el spec y estándares antes del merge.
4. Integración secuencial: resolver conflictos, ejecutar la suite conjunta, analizar contratos y revisar diff total. Ningún agente aprueba automáticamente su propio trabajo.
5. Si la herramienta no ofrece worktrees/subagentes, mantener el mismo proceso de forma secuencial. La calidad vale más que concurrencia.
6. Push, merge, despliegue y acciones con coste son decisiones del propietario; no automatizarlas sin autorización.

**Checklist:** aislamiento confirmado · responsables claros · pruebas por rama · revisión independiente · integración final probada.
