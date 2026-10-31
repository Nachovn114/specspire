# Fase 1 · Entender y especificar

**Resultado:** `specs/<slug>/spec.md` con necesidades, escenarios y límites, sin elegir arquitectura prematuramente.

1. Lee petición, proyecto, código existente y rúbrica. Resume en pocas líneas qué debe lograr el usuario y **qué queda fuera**.
2. Detecta dudas que cambiarían el comportamiento; pregunta solo lo crítico. Usa `[ACLARAR: ...]` para incertidumbres pendientes en vez de suponer respuestas.
3. Extrae historias y requisitos `RF-*` verificables. En cada requisito escribe al menos un ejemplo **Dado / Cuando / Entonces**; incluye un caso de error/límite donde exista.
4. Ordena por valor: la primera historia debe producir un resultado usable de punta a punta, aunque tenga una UI o validación mínima.
5. Para actividades académicas, vincula requisitos a la pauta original. No atribuir criterios ni puntajes inexistentes.
6. Alinea vocabulario del dominio con nombres reales; si la terminología es compleja y repetida, crea `GLOSSARY.md` **solo si ayuda**.
7. Revisa el spec con el usuario en trozos breves antes de diseñar. No preguntar otra vez lo que ya está claro.

**Gate:** requisitos comprobables, alcance finito, errores considerados y ninguna duda bloqueante. No instalar framework durante esta fase.

**Prompt:** «Conviértelo en criterios verificables y un MVP mínimo. Pregunta solo decisiones críticas; señala supuestos sin inventar requisitos».
