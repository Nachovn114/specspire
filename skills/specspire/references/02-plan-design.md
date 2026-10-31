# Fase 2 · Planificar y diseñar

**Resultado:** `plan.md` explica la solución mínima; `design.md` solo cuando hay interfaz.

1. Lee spec, constitución, rúbrica y código real. Respeta el stack obligatorio; si existe un proyecto, prioriza reutilizar su tecnología antes de sugerir migraciones.
2. **Si el stack NO está definido**, recomienda uno con el procedimiento «Selección de stack» de abajo y registra la decisión en `plan.md`. Nunca selecciones un framework solo por popularidad o por ser nuevo.
3. Define recorrido vertical mínimo: entrada → validación → resultado; contratos, esquema de datos o infraestructura **solo cuando la función lo exige**.
4. Explica cada dependencia o capa añadida. Considera errores, seguridad, accesibilidad, pruebas, rendimiento y restricciones reales.
5. **Si hay UI:** investigar 2 referencias relevantes (Refero/RicoUI/etc.), identificar patrón útil y diferencia propia; escribir dirección visual en `design.md` (tipografía, jerarquía, tokens, estados, contenido, mobile-first). No copiar diseños ni marcas.
6. Para aplicar una auditoría visual completa, consulta [02-ui-quality.md](02-ui-quality.md) solo en proyectos con UI.
   En ese caso lee también el [estándar responsive multiplataforma](02-responsive-cross-platform.md): define matriz, rama web/nativa, criterios R01–R06 y pruebas antes de implementar. Conserva el diseño existente cuando no se pidió rediseñarlo.
7. Verifica coherencia **spec ↔ plan ↔ restricciones**; devuelve al spec los cambios de intención autorizados.

## Selección de stack (solo si aplica)

- **Contexto:** tipo de aplicación, usuarios, funcionalidades, complejidad, presupuesto, alojamiento, dispositivos, equipo, experiencia y restricciones académicas.
- **Investigación actual:** cuando el agente tenga navegación, comprueba documentación oficial, versiones estables, notas de lanzamiento, soporte/LTS, requisitos de runtime, compatibilidad y avisos de seguridad. Anota **fecha y enlaces verificables**. No infieras que la última versión es la más conveniente.
- **Sin acceso a Internet:** declara «versiones no verificadas en vivo», no inventes versiones ni estado de mantenimiento; señala la comprobación pendiente antes de instalar.
- **Comparación breve:** presenta máximo **tres opciones** (preferida, alternativa razonable y mínima sin framework cuando tenga sentido); compara adecuación, complejidad, comunidad/mantenimiento, seguridad, accesibilidad, pruebas, coste y despliegue. No hay que puntuar factores irrelevantes.
- **Decisión:** ofrece **una recomendación principal y por qué**; justifica también qué NO se necesita (p. ej. backend, base de datos, estado global, Docker, SSR). En proyectos existentes, propone cambios solo con beneficios claros y riesgos evaluados.
- **Aprobación:** antes de instalar dependencias o generar estructura extensa, confirma los requisitos y la elección del usuario cuando cambie compromisos relevantes o genere costes.
- **Registro:** incluye resumen de esta decisión en el `plan.md` existente; no crees otro documento por defecto. Comprueba compatibilidad con la rúbrica y el entorno disponible.

**Gate:** alguien puede ejecutar el plan sin decisiones fundamentales pendientes; tecnologías justificadas y versiones comprobadas o explícitamente pendientes; para UI hay estados normal, error, carga, vacío y éxito según contexto.

**Prompt:** «Antes de planificar, recomienda un stack actual si no hay uno fijado, verifica versiones en fuentes oficiales cuando puedas y compara alternativas sin sobreingeniería. Diseña el camino más simple que satisfaga la especificación; si hay UI, propón identidad visual profesional y crea design.md. Explica lo que descartaste».
