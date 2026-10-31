# Anexo · Depuración sistemática

Se activa al encontrar bugs, regresiones, tests intermitentes o problemas de rendimiento.

1. **Reproducir:** anota esperado/observado, entorno y pasos mínimos. Si no se reproduce, no declarar causa ni corrección.
2. **Aislar:** reduce el caso; inspecciona logs, pruebas, límites de datos y últimos cambios. Trabaja hipótesis refutables, no edites a ciegas.
3. **Demostrar:** para bug automatizable crea un test que reproduzca el **síntoma** y falle por la razón correcta (no por import roto, typo o setup).
4. **Corregir:** cambia el mínimo código necesario y ejecuta el caso focalizado; no debilites asserts ni escondas fallos.
5. **Regresión completa:** ejecuta los controles relevantes de integración, build y casos vecinos. Si hay pérdidas de señal, errores intermitentes o performance, recoge evidencia observada del problema real.
6. **Informar:** causa confirmada vs probable, cambios, comandos con resultado, restricciones y riesgos restantes. Para cambios de requisitos, actualiza el spec.

No mezclar varias teorías y arreglos en una sola modificación imposible de atribuir. No prometer que está reparado si no se pudo ejecutar el escenario afectado.
