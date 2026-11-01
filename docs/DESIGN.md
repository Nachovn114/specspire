# Dirección de diseño UI/UX

**Objetivo:** interfaces con identidad propia, comprensibles y accesibles; no un conjunto de componentes de moda.

## Flujo de diseño

| Paso | Acción | Resultado comprobable |
|---|---|---|
| 1. Descubrir | Usuarios, tareas, dispositivo y tono de marca | Problema visual definido |
| 2. Investigar | Referencias de productos comparables | 2–3 decisiones justificadas, no imitaciones |
| 3. Proponer | Dos direcciones con criterios distintos | Dirección elegida por el usuario |
| 4. Sistematizar | Tipografía, color semántico, espacio, componentes y estados | `design.md` cuando hay UI |
| 5. Construir | Primero un flujo principal completo | Interacción funcional y responsive |
| 6. Auditar | Revisar móvil, desktop, teclado, estados y contraste | Evidencia visual y defectos registrados |

## Fuentes de inspiración, no dependencias obligatorias

- [RicoUI Brands](https://design.ricoui.com/brands): referentes de marca y dirección visual.
- [Refero Styles](https://styles.refero.design/): patrones y composición de interfaces.
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): orientación para sistemas visuales, tipografía y UX.
- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills): buenas prácticas para revisar interfaces web.

No copies logotipos, layouts completos, imágenes ni estilos de marca protegidos. Documenta **por qué** se eligió cada principio visual.

## Qué revisar antes de aprobar la interfaz

- [ ] Jerarquía clara y una acción principal reconocible.
- [ ] Tipografía legible, espaciado consistente y componentes reutilizados.
- [ ] Estados vacíos, carga, error, éxito, foco y deshabilitado donde correspondan.
- [ ] Móvil y escritorio probados con contenido realista y textos largos.
- [ ] Navegación con teclado, etiquetas asociadas y contraste revisados.
- [ ] Sin emojis como sustituto involuntario de iconografía ni estilos sin sistema.
- [ ] Se probó en navegador o se declaró la inspección pendiente.

**Importante:** un documento `design.md` no sustituye una prueba visual. La apariencia debe revisarse en una aplicación ejecutándose.

Para toda interfaz es obligatorio el [estándar responsive multiplataforma](../skills/specspire/references/02-responsive-cross-platform.md). Define matriz objetivo, rama web/PWA o nativa y evidencia R01–R06. No se declara completa una UI con contenido oculto, navegación inaccesible, overflow accidental, formularios bloqueados por teclado, pérdida de función al redimensionar o accesibilidad crítica pendiente. La emulación de viewport no acredita hardware físico ni teclado real.

Ver también: [Quality gates](QUALITY.md) · [Flujo de desarrollo](WORKFLOW.md).
