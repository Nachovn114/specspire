# Fase 5 · Convergencia y revisión independiente

**Resultado:** `review.md` con verificación requisito por requisito y pruebas reales, no impresiones.

1. Comparar cada criterio `RF-*` contra archivos, comportamiento ejecutado y evidencia. Diferenciar **verificado**, **pendiente**, **bloqueado** y **no aplica**.
2. Realizar revisión técnica en dos pasadas independientes: **fidelidad al spec** y **calidad del diff** (módulos, duplicaciones, tipos, simplicidad, errores y tests). Consulta [estándares](08-code-quality.md).
3. Ejecutar comandos reales de test, lint, build y regresiones pertinentes; anotar salida, cantidad de fallos y limitaciones. `doctor` o `status` no sustituyen la suite.
4. Revisar seguridad y datos mediante [controles proporcionales](10-security-operations.md). Si trata datos personales o rastreadores, auditar flujos, almacenamiento y avisos mediante [privacidad y datos](12-data-privacy-compliance.md) (controles P01–P06 en `review.md`).
   Si hay UI, inspeccionar al menos viewport móvil y desktop, teclado, foco, contraste, loading/error/success y navegación real. Si falta navegador, decirlo.
   **Solo con UI**, ejecutar también el [gate responsive multiplataforma](02-responsive-cross-platform.md) R01–R06 y registrar evidencia por combinación requerida. No sustituir pruebas físicas/teclado por emulación de viewport; FAIL, BLOCKED o NOT VERIFIED en controles obligatorios impiden declarar la UI completa.
5. Si aparece una brecha, registrar una nueva tarea de corrección con criterio concreto; volver a implementar y **repetir verificación**. No rebajar criterios para cerrar tareas.
6. Antes de declarar «listo», comprobar que las pruebas de la *última versión* realmente pasaron y que el diff final es el revisado.

**Gate:** ningún requisito obligatorio sin evidencia, sin fallos silenciados y riesgos residuales expuestos. Si no converge, seguir el bucle.

**Prompt:** «Revisa el cambio en dos ejes: cumplimiento del spec y calidad de ingeniería. Ejecuta las verificaciones disponibles y registra fallos, evidencia y próximas acciones sin inventar resultados».
