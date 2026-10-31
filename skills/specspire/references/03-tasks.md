# Fase 3 · Plan de trabajo ejecutable

**Resultado:** `tasks.md` pequeño, ordenado, trazable y apto para un desarrollador junior.

1. Deriva tareas solo de `spec.md`, `plan.md`, `design.md` cuando exista, y del código actual; no inventar infraestructura.
2. Para cada tarea escribe `T01 [RF-01] descripción concreta — prueba/evidencia — dependencias`. Una tarea debe producir comportamiento observable.
3. Empieza por un **corte vertical mínimo** (entrada → validación → respuesta visible) y después amplía casos de error, seguridad y mejoras.
4. Revisa huecos: requisitos sin tareas, tareas sin requisito, dependencias circulares, criterios que nadie prueba y UI sin estados.
5. Paraleliza solo cuando existan tareas de verdad independientes; consultar [orquestación](11-agent-collaboration.md). Una app pequeña no necesita varios agentes.
6. Antes de implementar, comprueba que otra persona podría ejecutar la próxima tarea sin adivinar arquitectura ni el resultado esperado.

**Gate:** cada tarea tiene qué, por qué, resultado comprobable y dependencia. No exigir microtareas absurdas ni limitar número de archivos de forma rígida.

**Prompt:** «Construye backlog por recorridos de usuario, un cambio comprobable por tarea y una primera entrega de punta a punta; elimina pasos que no aporten valor».
