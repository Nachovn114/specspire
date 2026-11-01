# Fuentes de inspiración y atribuciones

[English README](../README.md) · [Español README](../README.es.md)

Este documento detalla los orígenes conceptuales, metodologías de referencia y enlaces de consulta considerados durante el diseño de Specspire.

## 1. Inspiración conceptual

Specspire implementa procedimientos y código propios. Los siguientes proyectos han servido como referentes metodológicos abiertos:

| Proyecto | Inspiración aplicada | Delimitación propia |
|---|---|---|
| [GitHub Spec Kit](https://github.com/github/spec-kit) | Secuencia metodológica: especificación → plan → tareas → implementación → convergencia. | No copia comandos, código ni plantillas; respeta `.specify/` preexistente sin duplicar. |
| [Matt Pocock Skills](https://github.com/mattpocock/skills) | Clarificación temprana de necesidades, glosario opcional y contratos claros. | Modelo de una sola Skill pública; no adopta ni instala el catálogo de skills individuales. |
| [Superpowers](https://github.com/obra/superpowers) | Disciplina de pruebas primero (RED → GREEN → REFACTOR) y depuración sistemática por hipótesis. | Implementación directa sin obligar al uso de subagentes ni dependencias externas. |
| [OpenSpec](https://github.com/Fission-AI/OpenSpec) | Documentación estructurada por intención y cambios pequeños. | Estructura documental propia integrada con CLI sin dependencias. |
| [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) | Graduación del rigor según la escala del proyecto (ligero, normal, crítico). | No impone múltiples agentes ni ceremonias a tareas sencillas. |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Tokens semánticos, responsive, accesibilidad y estados de interacción. | Estándar responsive propio (R01–R06); no copia reglas ni catálogos de diseño ajenos. |

## 2. Enlaces externos de consulta

- [Refero Styles](https://styles.refero.design/) (patrones y composición de interfaz)
- [RicoUI Brands](https://design.ricoui.com/brands) (referentes de dirección visual)
- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) (orientación para revisión de interfaces web)

Estos enlaces se facilitan únicamente como recursos externos de investigación y consulta de criterios. La inclusión voluntaria de un enlace no implica patrocinio, respaldo mutuo ni autorización para copiar o incorporar imágenes, marcas, estilos protegidos o contenidos de dichos sitios.

## 3. Estado de reutilización de material

La revisión documental realizada no identificó reproducciones sustanciales de contenido de terceros. Este resultado no constituye una certificación jurídica ni una garantía exhaustiva de originalidad. Cualquier reutilización futura deberá respetar las licencias y atribuciones correspondientes bajo la [Licencia MIT](../LICENSE).
