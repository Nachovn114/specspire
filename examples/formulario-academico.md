# Ejemplo práctico: formulario académico

Este caso es **hipotético**. Si el docente exige algo distinto, su rúbrica manda.

**Objetivo:** formulario de contacto con nombre, correo y mensaje, que funciona en móvil y escritorio.

| Fase | Qué hace el estudiante | Qué revisa antes de avanzar |
|---|---|---|
| 0 · Contexto | Define alcance en `PROJECT.md` | No pide API, BD ni login |
| 1 · Especificación | Crea `spec.md` con campos y errores | Valores válidos e inválidos descritos |
| 2 · Diseño | Elige HTML semántico + CSS + JS si bastan | Diseño responsive, tipografía, estados |
| 3 · Tareas | Divide validación, feedback y presentación | Cada tarea es verificable |
| 4 · Construcción | Implementa un comportamiento por vez | Pruebas y validación funcional |
| 5 · Revisión | Comprueba formulario, teclado y móvil | Resultados reales en `review.md` |
| 6 · Entrega | README con instrucciones | Un compañero lo puede ejecutar |

## Paso 1 — En terminal

Si Specspire está en una carpeta hermana:

```powershell
mkdir MiFormulario
cd MiFormulario
node ..\Specspire\bin\specspire.mjs init
```

## Paso 2 — En el chat del agente

```text
Activa specspire. Mi rúbrica exige un formulario de contacto con
nombre, correo y mensaje, validación de campos y diseño responsive.
Comienza con la fase 0; dame solo una tarea y su verificación.
No agregues backend ni persistencia si no se necesitan.
```

## Paso 3 — Después de definir el alcance

```powershell
node ..\Specspire\bin\specspire.mjs feature new formulario-contacto
```

Trabaja sobre `specs/formulario-contacto/spec.md`. Recién después el agente propone el plan y la dirección visual.

> El kit crea guías y plantillas. No entrega una aplicación hecha ni certifica sus pruebas.
