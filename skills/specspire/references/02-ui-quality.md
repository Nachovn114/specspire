# Anexo UI/UX · Calidad visual profesional

**Se lee solo cuando el proyecto tiene interfaz.** No conviertas este anexo en un requisito para backend, CLI o APIs.

Para toda UI aplica además el [estándar responsive multiplataforma](02-responsive-cross-platform.md): allí se definen adaptación, safe areas, matriz y gate. Aquí se mantiene la dirección visual; no duplicar ambos procedimientos ni convertir cada aplicación en un dashboard genérico. En mantenimiento conserva la identidad existente salvo rediseño solicitado.

## Procedimiento

1. **Investigación:** revisa 2–3 referencias reales y relevantes, como [Refero Styles](https://styles.refero.design/), [RicoUI Brands](https://design.ricoui.com/brands), [Hallmark](https://www.usehallmark.com/) o [Jakub Skills](https://jakub.kr/skills). Si no tienes acceso, decláralo y no inventes hallazgos.
2. **Identidad:** define tipo de producto, personalidad, público y tareas. Propón al menos dos direcciones **realmente diferentes** (composición, peso, tipografía, densidad, color y estilo de interacción), no solo paletas alternativas.
3. **Diseño:** elige una dirección; registra en `design.md` una escala tipográfica clara, 3–6 tokens semánticos y la anatomía de los componentes necesarios. Usa contenido realista, sin lorem ipsum en entrega.
4. **Estados de experiencia:** entrada, foco, validación, vacío, carga, error, éxito y deshabilitado según correspondan. Mantén mensajes útiles; evita patrones engañosos.
5. **Implementación:** mobile-first, jerarquía perceptible, diseño responsive y targets táctiles razonables. Prioriza semántica HTML, labels, navegación por teclado y contraste.
6. **Revisión:** inspecciona al menos viewport móvil y escritorio cuando tengas navegador; corrige overflow, espaciado, alineación, foco, errores, tipografía y consistencia. Verifica interacción, no solo capturas estáticas.

## Evaluación: no confundir premium con sobreingeniería

- ¿La tarea principal se reconoce en segundos?
- ¿Cada elemento visual aporta función, marca o legibilidad?
- ¿Los estados y errores permiten recuperarse?
- ¿La UI conserva calidad en pantallas pequeñas y con teclado?
- ¿El diseño tiene personalidad sin parecer copia de otra marca?
- ¿El sistema reutiliza tokens y componentes solo cuando realmente lo necesita?

**No hagas:** copiar diseños/activos/licencias ajenas, añadir animación por moda, introducir librerías para un único botón o crear un design system corporativo para una sola pantalla.

**Entregable:** `design.md` breve + evidencia de revisión visual real en `review.md`; si no se pudo probar en navegador, se indica como no verificado.
