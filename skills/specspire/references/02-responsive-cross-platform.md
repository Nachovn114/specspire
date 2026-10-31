# Estándar responsive y adaptativo multiplataforma

**Obligatorio solo si hay interfaz.** No cargar para backend o CLI sin UI. Complementa la [calidad visual](02-ui-quality.md), sin reemplazar identidad ni imponer dashboards genéricos. En aplicaciones existentes conserva el lenguaje visual y corrige únicamente lo necesario; adaptar no es reducir todos los componentes ni rediseñar el producto.

## Procedimiento y alcance

1. Define en `design.md` (o el documento UI existente) la matriz objetivo: web/PWA o nativo, OS y versiones, navegadores/motores, tamaño de ventana disponible, orientaciones y modalidades de entrada. Registra exclusiones justificadas con el desarrollador, sin prometer cualquier dispositivo futuro.
2. Decide cómo redistribuir contenido, navegación y prioridad al cambiar espacio: columnas, paneles, menús y densidad. Conserva jerarquía, tipografía, estados de carga/vacío/error/éxito e interacciones cómodas. Reutiliza los criterios visuales existentes.
3. Implementa únicamente la rama técnica correspondiente. Documenta decisiones y fuentes consultadas con fecha; revisa compatibilidad del stack real antes de adoptar una API. Sin navegación, marca la vigencia como NOT VERIFIED.
4. Asocia los criterios R01–R06 a tareas y pruebas; ejecuta el gate al implementar y al converger. Registra evidencia por combinación, no un PASS global basado en una captura o en leer código.

## Web y PWA

- **Layout:** mobile-first, breakpoints donde el contenido deja de funcionar, no por modelos de teléfono. Grid/Flexbox, tamaños fluidos y límites legibles; Container Queries si un componente depende de su contenedor y el soporte objetivo lo permite. Permite crecimiento por texto; evita alturas rígidas para contenido variable.
- **Viewport:** usa `<meta name="viewport" content="width=device-width, initial-scale=1">`; no bloquees zoom con `user-scalable=no` ni límites restrictivos. Solo añade `viewport-fit=cover` para un diseño edge-to-edge deliberado y protege su contenido.
- **Safe Areas:** aplica `env(safe-area-inset-top, 0px)`, `right`, `bottom` y `left` en los bordes expuestos. Combina con espaciado de diseño, por ejemplo `padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px))`. El rem es espaciado visual, no una medida de hardware. **Prohibido inventar márgenes fijos para compensar notch o Isla Dinámica.** No deduzcas insets de un modelo de dispositivo ni los sumes dos veces en contenedores anidados. [MDN env](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env).
- **Altura disponible:** `svh` representa el viewport pequeño y `dvh` sigue su tamaño dinámico; elige estabilidad o ajuste según el recorrido y usa fallback compatible. Evita depender únicamente de `100vh` en una pantalla crítica. Prefiere min-height y contenido desplazable cuando proceda. Estas unidades no garantizan por sí mismas que el teclado virtual deje visible un formulario. [MDN length](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length).
- **Teclado y foco:** verifica campo activo, errores y botón de envío al abrir/cerrar el teclado. Mantén desplazamiento alcanzable y foco lógico. Evalúa `interactive-widget`, VisualViewport o VirtualKeyboard solo ante una necesidad y soporte comprobados; no asumas que safe-area-inset-bottom mide el teclado. [MDN viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport).
- **Overlays:** navegación inferior, fixed/sticky, dropdowns y modales deben reservar espacio real para el contenido y mantener controles/foco visibles. Comprueba último elemento desplazable, apertura/cierre, Escape cuando aplique y retorno de foco. No tapes errores con `overflow-x: hidden`: corrige el origen del desbordamiento.
- **Entrada y ventanas:** soporta táctil, teclado y ratón sin acciones exclusivas de hover; conserva función en portrait/landscape, ventanas redimensionables, zoom y texto ampliado. Prueba contraste y foco con los estados reales.
- **Plegables/segmentos:** solo si están en la matriz, evalúa `viewport-segment-*` y APIs disponibles con detección de soporte y fallback de una ventana. Verifica postura/bisagra en un entorno adecuado; no impongas APIs experimentales a toda web. PWA instalada y pestaña de navegador son contextos distintos que requieren evidencia propia.

## Aplicaciones nativas: no importar reglas de otra plataforma

| Plataforma | Mecanismos y comprobación |
|---|---|
| iOS / iPadOS | En UIKit, constraints respecto de `safeAreaLayoutGuide` y cambios de insets; en SwiftUI, sistema de Safe Areas y `safeAreaInset` cuando se agrega contenido en un borde. No ignorar safe areas para controles importantes; fondos pueden extenderse deliberadamente. Verificar Dynamic Type, rotación y teclado con el SDK objetivo. No introducir CSS env en vistas nativas. |
| Android | Views: WindowInsetsCompat; Compose: WindowInsets según el stack. Distinguir systemBars, displayCutout e IME insets; evitar consumir/aplicar dos veces. Revisar edge-to-edge según target SDK/OS (la guía documenta su aplicación desde Android 15 al apuntar a SDK 35). Adaptar por área de ventana disponible y window size classes en dp, no por etiqueta teléfono/tablet ni por CSS px. |
| Windows / WinUI | Layout XAML fluido con paneles y dimensionamiento automático; VisualStateManager y AdaptiveTrigger cuando deban cambiar disposiciones. Probar tamaño real de ventana, escalado del sistema, teclado/ratón/táctil aplicables. No trasladar umbrales dp de Android ni Safe Areas de UIKit a WinUI. |

Fuentes nativas: [Apple safeAreaLayoutGuide](https://developer.apple.com/documentation/uikit/uiview/safearealayoutguide), [Apple SafeAreaRegions](https://developer.apple.com/documentation/swiftui/safearearegions), [Android insets](https://developer.android.com/develop/ui/compose/system/insets), [Android edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge), [Android window size classes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes), [Microsoft XAML](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml).

## Gate: ejecutar, observar, registrar

Usa Playwright **u otras herramientas ya disponibles**; no instales dependencias solo para cumplir una lista. Para nativo usa el runner y simulador del stack. Define rutas críticas, alturas y contenido representativo, textos largos y errores antes de probar.

| Control | Cobertura y evidencia exigida |
|---|---|
| Viewports web | Considera 320, 360, 390, 430; 768, 1024; 1280, 1440, 1920 **CSS px**. Selecciona los aplicables y documenta exclusiones. No son breakpoints obligatorios ni tamaños nativos. Prueba también inmediatamente antes/después de cada breakpoint real. |
| Continuidad | Redimensionamiento continuo entre mínimos/máximos acordados, ambas orientaciones y alturas reducidas; no perder estado, función o navegación. |
| Interacciones | En cada familia de layout, completar recorrido principal, abrir/cerrar menús/modales/dropdowns, recorrer con Tab/Shift+Tab, probar fixed/sticky y verificar errores/éxito. Capturas complementan, no sustituyen acciones. |
| Accesibilidad web | WCAG 2.2: texto al 200% (1.4.4, con sus excepciones); reflow a 320 CSS px para contenido de desplazamiento vertical (1.4.10, excepciones bidimensionales justificadas); ambas orientaciones salvo necesidad esencial (1.3.4). Revisar teclado, foco no totalmente oculto (2.4.11), contraste 1.4.3/1.4.11 y objetivos 2.5.8 (24×24 CSS px o sus excepciones). Son controles parciales, no certificación completa de WCAG. |
| Zoom real | Probar zoom del navegador y ampliación de texto, además de viewport; cambiar deviceScaleFactor o tamaño de pantalla no equivale a probar zoom. |
| Hardware y teclado | Dispositivo real o simulador adecuado: safe areas, notch/Isla Dinámica, barras dinámicas, teclado/IME, rotación y PWA instalada según matriz. Registrar qué simula y qué no; completar en hardware cuando el simulador no reproduzca el comportamiento. |
| Navegadores | Ejecutar en motores/versiones objetivo disponibles. Emulación móvil en desktop no certifica Safari iOS ni teclado/hardware. Marcar los demás NOT VERIFIED o BLOCKED según causa. |

Fuente de criterios de accesibilidad: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/). La selección de anchos, herramientas y protocolo de evidencia es una política de Specspire, no un mandato de Apple, Google o W3C.

Registro mínimo en `review.md`: requisito, plataforma/OS, navegador y versión, viewport/ventana y orientación, modalidad, dispositivo real/simulador/emulación, acción, resultado observado, log/captura y limitación. Estados: **PASS**, **FAIL**, **BLOCKED**, **NOT VERIFIED**. Inspección estática o viewport automatizado **no** acredita safe areas físicas ni teclado real. Justificar controles fuera de alcance sin etiquetarlos PASS.

## Criterios de aceptación obligatorios

- **R01:** contenido importante y acciones no quedan ocultos por hardware, barras o overlays en la matriz acordada.
- **R02:** navegación y controles son alcanzables y activables con las modalidades acordadas; no hay trampas de foco ni errores críticos de accesibilidad dentro del alcance.
- **R03:** sin desbordamiento horizontal accidental; regiones bidimensionales justificadas tienen desplazamiento accesible propio y no fuerzan todo el documento.
- **R04:** formularios utilizables con teclado virtual: foco, campo activo, errores y envío alcanzables.
- **R05:** no se pierde funcionalidad ni estado necesario al redimensionar, rotar o ampliar texto/zoom; se mantiene jerarquía y legibilidad.
- **R06:** cada combinación requerida tiene evidencia de ejecución. No declarar completada la UI con FAIL conocido en R01–R05 ni con controles obligatorios BLOCKED/NOT VERIFIED. Corregir y repetir; cualquier cambio de alcance requiere decisión explícita, no ocultar fallos.

## Fuentes y vigencia

Consulta: **2026-10-31**. Guías de plataforma y documentación API no son una norma universal; WCAG es una recomendación normativa para contenido web. Revalidar versiones/soporte cuando se aplique a un proyecto.

| Fuente oficial consultada | Aplicabilidad / límite |
|---|---|
| [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) | Diseño Apple. Lectura HTML completa bloqueada por JavaScript y endpoint Markdown no accesible con estas herramientas; fragmentos oficiales indexados y UIKit consultados. No trasladar medidas de tvOS a iOS ni afirmar revisión íntegra de HIG. |
| [Apple UIKit](https://developer.apple.com/documentation/uikit/uiview/safearealayoutguide) / [SwiftUI](https://developer.apple.com/documentation/swiftui/safearearegions) | Safe Areas nativas; contenido oficial indexado consultado. Confirmar disponibilidad con SDK objetivo. |
| [Android edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) / [Insets](https://developer.android.com/develop/ui/compose/system/insets) | Barras, recortes e IME en Android nativo; no prescribe CSS web. |
| [Android tamaños](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes) | Clases por ventana disponible en dp; no detección de dispositivo ni breakpoints web. |
| [Microsoft responsive design](https://learn.microsoft.com/windows/uwp/design/layout/responsive-design) / [XAML](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml) | El enlace UWP redirige a Windows Apps; técnicas adaptativas y mecanismos XAML/WinUI. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Accesibilidad web; aplicar criterios, niveles y excepciones, sin anunciar conformidad por checklist parcial. |
| [MDN env](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env) / [viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport) | Safe areas y configuración web; soporte de cada variable/API debe comprobarse. |
| [MDN length](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) / [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | Unidades de viewport y adaptación al contenedor, con fallback según navegadores objetivo. |
