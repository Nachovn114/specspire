# Specspire — reglas del agente

1. **Entrada:** activa solo `.agents/skills/specspire/SKILL.md`; es la autoridad del flujo y decide qué referencia cargar según la fase. Consulta `PROJECT.md` y `README-DESARROLLO.md`.
2. **Prioridad:** instrucciones del usuario, requisitos o rúbrica confirmados y seguridad > `spec.md` vigente > restricciones del proyecto > sugerencias del agente. No inventes funcionalidad.
3. **Proyecto existente:** respeta su arquitectura, convenciones y pruebas. Si existe `.specify/`, conserva los artefactos de Spec Kit oficial y no dupliques especificaciones.
4. **Ritmo:** una acción verificable por turno. TDD, UI, stack, privacidad y seguridad siguen las reglas de la Skill; no las redefinas aquí.
5. **Evidencia:** no declares tests, builds, revisiones visuales ni seguridad sin ejecución real. Una prueba pendiente no es un éxito.
6. **Control humano:** sin push, merge, deploy, migraciones destructivas ni acciones con coste sin permiso.
7. **Cierre breve:** **Fase → Siguiente acción → Evidencia observada → Bloqueo**.

<!-- Añade debajo las reglas propias de tu proyecto. Specspire no sobrescribe este archivo al repetir init. -->
