# Guía de desarrollo — tu proyecto

**Un paso a la vez.** Marca una fase solo cuando tengas evidencia; el agente debe explicarte la siguiente acción, no hacer todo de golpe.

## Comienza aquí

```text
Activa specspire. Lee AGENTS.md, PROJECT.md y README-DESARROLLO.md.
Este es mi proyecto: [describe el objetivo o pega el enunciado].
Identifica la fase actual. Indícame solo una acción y cómo verificarla.
No añadas frameworks, carpetas ni dependencias innecesarias.
```

## Tablero de avance

- [ ] **0 · Preparar** — Completa [PROJECT.md](PROJECT.md): objetivo, alcance y restricciones.
- [ ] **1 · Especificar** — Escribe comportamientos y criterios observables (`spec.md`).
- [ ] **2 · Planificar** — Elige stack mínimo; si hay UI, define dirección visual (`plan.md`, `design.md` opcional).
- [ ] **3 · Organizar** — Divide en tareas con dependencia y criterio de prueba (`tasks.md`).
- [ ] **4 · Implementar** — Una tarea por vez, test rojo → verde → refactor cuando corresponda.
- [ ] **5 · Verificar** — Comprueba requisitos, tests, código y UI según alcance (`review.md`).
- [ ] **6 · Entregar** — README del producto, resultados reales y pendientes claros.

## Si tienes la CLI disponible

```bash
specspire next
specspire feature new nombre-funcionalidad
specspire feature plan nombre-funcionalidad
specspire feature design nombre-funcionalidad  # solo con UI
specspire feature tasks nombre-funcionalidad
specspire feature review nombre-funcionalidad
specspire status
```

Si no está en tu PATH, usa `node RUTA_AL_KIT/bin/specspire.mjs` como prefijo.

**Antes de terminar:** verifica requisitos, errores importantes, ejecución, pruebas pertinentes y documentación. Si no hubo ejecución real, escribe **pendiente de verificar**.

**Bug:** reproduce → diagnostica → corrige → comprueba regresión. **Tarea académica:** la rúbrica tiene prioridad.
