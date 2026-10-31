# Specspire — Responsive Engineering Standard

Fecha: 2026-10-31. Cambios locales, sin dependencias nuevas, commits, push ni releases.

## Resultado

Se añadió una referencia interna, `02-responsive-cross-platform.md`, porque el procedimiento técnico y su matriz de evidencia justifican una unidad consultable propia. Se conserva una única Skill pública, `specspire`, ahora con 14 referencias. La carga es obligatoria para UI y excluye backend/CLI sin interfaz.

La CLI incorpora la referencia en instalación, integridad y doctor; las instalaciones existentes pueden ejecutar init para agregar el archivo faltante, pero los documentos previos se conservan. Para adoptar el nuevo enrutamiento en una instalación existente hay que revisar y actualizar deliberadamente su SKILL.md/referencias personalizados: init no los sobrescribe.

## Archivos modificados

- `skills/specspire/references/02-responsive-cross-platform.md`: nuevo procedimiento, ramas de plataforma, fuentes, matriz y gate R01–R06.
- `skills/specspire/SKILL.md`: enrutamiento condicional UI y gate de evidencia.
- `skills/specspire/references/02-plan-design.md`, `02-ui-quality.md`, `04-implement.md`, `05-converge.md`: integración en diseño, construcción y revisión sin duplicar reglas visuales.
- `templates/feature/design.md`, `templates/feature/review.md`: matriz acordada y registro de resultados por combinación.
- `bin/specspire.mjs`: instalación y validación de la referencia adicional; sin cambios a seguridad de filesystem.
- `tests/cli.test.mjs`: inventario actualizado y regresión que comprueba copia íntegra y detección de referencia ausente por doctor.
- `tests/docs.test.mjs`: contrato de enrutamiento, contenido de seguridad/evidencia, fuentes y plantillas; conserva comprobación de enlaces locales.
- `docs/DESIGN.md`: acceso al estándar y criterios de cierre.
- Este informe: alcance, resultados y límites.

## Reglas y aceptación

Web/PWA: mobile-first, breakpoints por contenido, layouts fluidos, viewport, Safe Areas sin compensaciones físicas inventadas, svh/dvh, teclado virtual, fixed/sticky, orientación, zoom/texto, entrada múltiple y ventanas redimensionables. Container Queries y pantallas segmentadas se usan solo con necesidad y soporte comprobados.

Nativo: UIKit/SwiftUI Safe Areas; Android WindowInsets, displayCutout, IME y clases de ventana; WinUI/XAML adaptable. No se mezclan CSS px, dp ni APIs de plataformas diferentes.

La identidad visual sigue gobernada por 02-ui-quality. Se exige adaptación de navegación, jerarquía y estados, preservando aplicaciones existentes sin rediseños no solicitados.

R01: contenido visible frente a hardware/barras. R02: navegación y controles accesibles. R03: sin overflow horizontal accidental. R04: formularios utilizables con teclado. R05: función, estado y legibilidad conservados al cambiar tamaño/orientación/zoom. R06: evidencia de cada combinación requerida. FAIL conocido o control obligatorio BLOCKED/NOT VERIFIED impide declarar la interfaz completa.

Los anchos 320–1920 CSS px son candidatos de prueba de Specspire, no breakpoints impuestos por un fabricante. La matriz acuerda casos aplicables, alturas, orientaciones y exclusiones. Se requieren interacciones reales además de capturas; viewport emulado no acredita hardware ni teclado físico/virtual real.

## Fuentes oficiales consultadas

Fuentes, fecha y aplicabilidad están registradas en la [referencia del estándar](../../skills/specspire/references/02-responsive-cross-platform.md).

- [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout), [UIKit safeAreaLayoutGuide](https://developer.apple.com/documentation/uikit/uiview/safearealayoutguide) y [SwiftUI SafeAreaRegions](https://developer.apple.com/documentation/swiftui/safearearegions): contenido oficial indexado consultado; HTML completo requiere JavaScript y el endpoint Markdown no pudo leerse. No se afirma revisión íntegra de HIG.
- [Android edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge), [window size classes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes) e [insets](https://developer.android.com/develop/ui/compose/system/insets): guías nativas.
- [Microsoft responsive design](https://learn.microsoft.com/windows/uwp/design/layout/responsive-design) y [XAML layouts](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml): adaptación de aplicaciones Windows; el enlace UWP redirige a Windows Apps.
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/): criterios de accesibilidad web con excepciones, sin certificar conformidad por una lista parcial.
- MDN: [env](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env), [viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport), [length](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) y [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries): mecanismos web y soporte a verificar en cada proyecto.

## Verificación ejecutada

Windows, Node 24.19.0, npm 11.17.0:

| Comando | Resultado observado |
|---|---|
| `npm.cmd test` | 48 tests: 45 PASS, 0 FAIL, 3 BLOCKED (reportados como skips con EPERM explícito) |
| `npm.cmd run check` | PASS: 1 Skill, 14 referencias, 3 plantillas de instalación y 5 progresivas |

Los BLOCKED son los tres tests preexistentes de symlinks nativos Windows; no se modificaron ni silenciaron. CI conserva el requisito de ejecutarlos y falla si están bloqueados. Las nuevas pruebas de instalación, doctor y contrato documental pasaron, junto con los enlaces locales.

## Limitaciones

NOT VERIFIED: aplicación real, Playwright sobre una UI, navegadores objetivo, hardware/notch/Isla Dinámica, teclado real, simuladores, iOS/Android/WinUI y ejecución remota de CI. Este cambio define un procedimiento verificable; no demuestra compatibilidad de una aplicación ni fuerza nuevas herramientas. Las fuentes deben revalidarse contra las versiones del proyecto cuando se implementen sus APIs.

Listo para revisión local del estándar. No se publica ni se modifica el veredicto histórico de las auditorías anteriores.
