# Anexo · Ingeniería y diseño del código

**Se consulta en implementación, revisión o refactor; no para generar carpetas abstractas desde cero.**

1. **Límites claros:** cada módulo tiene una responsabilidad concreta y una interfaz pequeña. Cohesión alta y acoplamiento bajo; no inventar capas ni repositorios genéricos sin una necesidad comprobada.
2. **Lenguaje compartido:** nombres del código, interfaz, tests y especificación expresan el mismo dominio. Si hay ambigüedad repetida, mantener un `GLOSSARY.md` corto; para decisiones estructurales duraderas crear un ADR **solo si realmente ayuda**.
3. **Diseño basado en cambio:** identificar qué funciones cambian juntas; separar efectos de reglas donde simplifique pruebas y comprensión. Preferir código claro a patrones de moda.
4. **Rigurosidad pragmática:** tipos o contratos donde el stack los admite, lint/format acordado, manejo explícito de fallos, validación en fronteras, logs útiles sin datos sensibles.
5. **Refactor acotado:** cuando los tests están verdes, eliminar duplicación real, código muerto, ramas superfluas o nombres engañosos. No rehacer módulos ajenos ni cambiar comportamiento durante un refactor.
6. **Revisión de diff en dos ejes:** (A) requisitos y escenarios de aceptación; (B) calidad, complejidad, pruebas, seguridad y consistencia. Revisores distintos o pases separados con contexto limpio si existe capacidad.
7. **Al cierre:** mostrar qué se modificó, por qué, qué pruebas se ejecutaron y qué riesgos quedan. No aceptar «se ve bien» como evidencia.

**Alertas:** nuevas dependencias no justificadas, abstracciones de un solo uso, múltiples fuentes de verdad, funciones difíciles de probar, comentarios que repiten obviedades y tests que solo confirman mocks.

**Criterio:** alguien puede entender el cambio y modificarlo después con riesgo controlado.
