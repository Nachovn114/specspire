# Fase 4 · Construir incrementos reales

**Resultado:** un corte vertical funcional, pequeño y probado, sin añadir infraestructura que el requisito no necesita.

1. Elige **una sola tarea** de `tasks.md`. Lee código y tests existentes. Si hay que modificar un API compartido, confirma el contrato y alcance.
2. Para lógica y bugs comprobables: **RED:** escribir test del comportamiento, ejecutarlo y ver que falla por la causa prevista. **GREEN:** escribir el mínimo código que lo pase. **REFACTOR:** mejorar nombres, duplicación o estructura sin variar conducta, volviendo a ejecutar tests.
3. Usa pruebas unitarias para reglas, integración para fronteras y E2E para recorridos principales cuando compensen. Para UI, probar interacción real y accesibilidad, no hacer unit tests cosméticos.
   Si hay UI, aplica el [estándar responsive multiplataforma](02-responsive-cross-platform.md) a cada incremento y prueba la rama web/PWA o nativa de la matriz acordada; no cargarlo para backend o CLI sin UI.
4. Evita dependencias, abstracciones o cambios fuera de alcance. Consulta [ingeniería de código](08-code-quality.md) para decisiones de módulos y revisión.
5. Si aparece un bug difícil, consulta [depuración sistemática](09-debugging.md) y reproduce antes de editar.
6. Inspecciona el diff, ejecuta test + lint + build que existan y reporta **salida observada**. Si no puedes ejecutarlos, deja la tarea como no verificada.
7. Marca la tarea solo cuando los criterios de aceptación tienen evidencia. Si cambia el comportamiento solicitado, actualiza primero el spec.

**Gate:** requisito visible, prueba real y código fácil de mantener. La tarea no pasa por «ya programé todo».

**Prompt:** «Implementa únicamente la siguiente tarea. Demuestra RED correcto, GREEN, REFACTOR y ejecución de verificaciones. Evita código o librerías no solicitadas».
