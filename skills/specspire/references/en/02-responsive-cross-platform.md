# Cross-Platform Responsive and Adaptive Standard

**Mandatory only if an interface exists.** Do not load for backend or CLI without UI. Complements [visual quality](02-ui-quality.md), without replacing identity or imposing generic dashboards. In existing applications, preserve visual language and correct only what is necessary; adapting does not mean shrinking every component or redesigning the product.

## Procedure and scope

1. Define in `design.md` (or existing UI document) the target matrix: web/PWA or native, OS and versions, browsers/engines, available window size, orientations and input modalities. Record justified exclusions with the developer, without promising every future device.
2. Decide how to redistribute content, navigation and priority when space changes: columns, panels, menus and density. Preserve hierarchy, typography, loading/empty/error/success states and comfortable interactions. Reuse existing visual criteria.
3. Implement only the corresponding technical branch. Document decisions and consulted sources with dates; review real stack compatibility before adopting an API. Without browsing, mark status as NOT VERIFIED.
4. Associate criteria R01–R06 with tasks and tests; execute the gate during implementation and convergence. Record evidence per combination, not a global PASS based on a screenshot or code reading.

## Web and PWA

- **Layout:** mobile-first, breakpoints where content stops working, not by phone models. Grid/Flexbox, fluid sizing and readable limits; Container Queries if a component depends on its container and target support allows. Allow growth by text; avoid rigid heights for variable content.
- **Viewport:** use `<meta name="viewport" content="width=device-width, initial-scale=1">`; do not block zoom with `user-scalable=no` or restrictive limits. Only add `viewport-fit=cover` for deliberate edge-to-edge design and protect its content.
- **Safe Areas:** apply `env(safe-area-inset-top, 0px)`, `right`, `bottom` and `left` on exposed edges. Combine with design spacing, for example `padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px))`. The rem unit is visual spacing, not a hardware measurement. **Forbidden to invent fixed margins to compensate for notch or Dynamic Island.** Do not infer insets from a device model nor add them twice in nested containers. [MDN env](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env).
- **Available height:** `svh` represents small viewport and `dvh` follows its dynamic size; choose stability or adjustment according to user journey and use compatible fallback. Avoid relying solely on `100vh` on a critical screen. Prefer min-height and scrollable content when appropriate. These units do not in themselves guarantee that a virtual keyboard leaves a form visible. [MDN length](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length).
- **Keyboard and focus:** verify active field, errors and submit button when opening/closing keyboard. Maintain reachable scrolling and logical focus. Evaluate `interactive-widget`, VisualViewport or VirtualKeyboard only when need and support are verified; do not assume safe-area-inset-bottom measures the keyboard. [MDN viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport).
- **Overlays:** bottom navigation, fixed/sticky, dropdowns and modals must reserve real space for content and keep controls/focus visible. Verify last scrollable element, open/close behavior, Escape key where applicable and focus restoration. Do not hide errors with `overflow-x: hidden`: fix the root cause of the overflow.
- **Input and windows:** support touch, keyboard and mouse without hover-exclusive actions; maintain function in portrait/landscape, resizable windows, zoom and enlarged text. Test contrast and focus with real states.
- **Foldables/segments:** only if in matrix, evaluate `viewport-segment-*` and available APIs with feature detection and single-window fallback. Verify posture/hinge in an appropriate environment; do not impose experimental APIs on every website. Installed PWA and browser tab are distinct contexts requiring separate evidence.

## Native applications: do not import rules from another platform

| Platform | Mechanisms and verification |
|---|---|
| iOS / iPadOS | In UIKit, constraints relative to `safeAreaLayoutGuide` and inset changes; in SwiftUI, Safe Areas system and `safeAreaInset` when adding content at an edge. Do not ignore safe areas for important controls; backgrounds may extend deliberately. Verify Dynamic Type, rotation and keyboard with target SDK. Do not introduce CSS env into native views. |
| Android | Views: WindowInsetsCompat; Compose: WindowInsets according to stack. Distinguish systemBars, displayCutout and IME insets; avoid consuming/applying twice. Review edge-to-edge according to target SDK/OS (guide documents its enforcement starting in Android 15 when targeting SDK 35). Adapt by available window area and window size classes in dp, not by phone/tablet label or CSS px. |
| Windows / WinUI | Fluid XAML layout with auto-sizing panels; VisualStateManager and AdaptiveTrigger when layouts must change. Test actual window size, system scaling, applicable keyboard/mouse/touch. Do not transfer Android dp thresholds or UIKit Safe Areas to WinUI. |

Native sources: [Apple safeAreaLayoutGuide](https://developer.apple.com/documentation/uikit/uiview/safearealayoutguide), [Apple SafeAreaRegions](https://developer.apple.com/documentation/swiftui/safearearegions), [Android insets](https://developer.android.com/develop/ui/compose/system/insets), [Android edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge), [Android window size classes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes), [Microsoft XAML](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml).

## Gate: execute, observe, record

Use Playwright **or other tools already available**; do not install dependencies solely to satisfy a list. For native use stack runner and simulator. Define critical paths, heights and representative content, long texts and errors before testing.

| Control | Coverage and required evidence |
|---|---|
| Web viewports | Consider 320, 360, 390, 430; 768, 1024; 1280, 1440, 1920 **CSS px**. Select applicable ones and document exclusions. They are not mandatory breakpoints nor native sizes. Also test immediately before/after each real breakpoint. |
| Continuity | Continuous resizing between agreed minimums/maximums, both orientations and reduced heights; do not lose state, function or navigation. |
| Interactions | In each layout family, complete primary user journey, open/close menus/modals/dropdowns, navigate with Tab/Shift+Tab, test fixed/sticky and verify errors/success. Screenshots complement, not replace actions. |
| Web accessibility | WCAG 2.2: text at 200% (1.4.4, with exceptions); reflow at 320 CSS px for vertical scrolling content (1.4.10, justified two-dimensional exceptions); both orientations unless essential (1.3.4). Review keyboard, focus not fully obscured (2.4.11), contrast 1.4.3/1.4.11 and target size 2.5.8 (24×24 CSS px or exceptions). These are partial checks, not full WCAG certification. |
| Real zoom | Test browser zoom and text enlargement in addition to viewport; changing deviceScaleFactor or screen size does not equate to testing zoom. |
| Hardware and keyboard | Real device or appropriate simulator: safe areas, notch/Dynamic Island, dynamic bars, keyboard/IME, rotation and installed PWA according to matrix. Record what is simulated and what is not; complete on physical hardware when simulator does not reproduce behavior. |
| Browsers | Execute on target engines/versions available. Mobile emulation on desktop does not certify Safari iOS or keyboard/hardware. Mark others as NOT VERIFIED or BLOCKED according to cause. |

Source for accessibility criteria: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/). The selection of widths, tools and evidence protocol is a Specspire policy, not a mandate from Apple, Google or W3C.

Minimum record in `review.md`: requirement, platform/OS, browser and version, viewport/window and orientation, modality, real device/simulator/emulation, action, observed outcome, log/screenshot and limitation. States: **PASS**, **FAIL**, **BLOCKED**, **NOT VERIFIED**. Static inspection or automated viewport testing **does not** prove physical safe areas or real keyboard. Justify out-of-scope controls without labeling them PASS.

## Mandatory acceptance criteria

- **R01:** important content and actions are not obscured by hardware, system bars or overlays across the agreed matrix.
- **R02:** navigation and controls are reachable and activatable using agreed modalities; no focus traps or critical accessibility errors within scope.
- **R03:** no accidental horizontal overflow; justified two-dimensional regions have dedicated accessible scrolling and do not force the entire document.
- **R04:** forms usable with virtual keyboard: focus, active field, errors and submit button reachable.
- **R05:** no loss of functionality or necessary state when resizing, rotating or enlarging text/zoom; hierarchy and legibility maintained.
- **R06:** each required combination has execution evidence. Do not declare UI complete with known FAIL in R01–R05 nor with mandatory controls BLOCKED/NOT VERIFIED. Fix and repeat; any scope change requires explicit decision, not concealing failures.

## Sources and status

Consultation: **2026-10-31**. Platform guidelines and API documentation are not universal rules; WCAG is a normative recommendation for web content. Revalidate versions/support when applied to a project.

| Official consulted source | Applicability / limitation |
|---|---|
| [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) | Apple design. Full HTML reading blocked by JavaScript and Markdown endpoint not accessible with these tools; indexed official snippets and UIKit consulted. Do not transfer tvOS measurements to iOS nor claim comprehensive HIG review. |
| [Apple UIKit](https://developer.apple.com/documentation/uikit/uiview/safearealayoutguide) / [SwiftUI](https://developer.apple.com/documentation/swiftui/safearearegions) | Native Safe Areas; indexed official content consulted. Confirm availability with target SDK. |
| [Android edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) / [Insets](https://developer.android.com/develop/ui/compose/system/insets) | Bars, cutouts and IME in native Android; does not prescribe web CSS. |
| [Android sizes](https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes) | Size classes by available window in dp; not device detection or web breakpoints. |
| [Microsoft responsive design](https://learn.microsoft.com/windows/uwp/design/layout/responsive-design) / [XAML](https://learn.microsoft.com/en-us/windows/apps/develop/ui/layouts-with-xaml) | UWP link redirects to Windows Apps; adaptive techniques and XAML/WinUI mechanisms. |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Web accessibility; apply criteria, levels and exceptions, without claiming compliance from partial checklist. |
| [MDN env](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env) / [viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport) | Safe areas and web configuration; support for each variable/API must be verified. |
| [MDN length](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) / [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | Viewport units and container adaptation, with fallback according to target browsers. |

