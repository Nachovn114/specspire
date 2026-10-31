# Anexo · Protección de datos, privacidad por diseño y cumplimiento legal

> [!NOTE]
> **Marco y vigencia (consulta oficial BCN: 31-10-2026):** En Chile rige actualmente la **Ley N° 19.628**. La reforma integral de la **Ley N° 21.719** fue promulgada y publicada en el Diario Oficial el 13-12-2024, con entrada en vigor fijada para el **01-12-2026** (Art. 1° transitorio); al diseñar software es obligatorio verificar si dicha fecha fue modificada por leyes posteriores. Para proyectos en otras jurisdicciones (ej. GDPR en la UE, LGPD en Brasil, CCPA en California), aplicar exclusivamente la normativa territorial pertinente y no extrapolar leyes chilenas fuera de su ámbito.
>
> **Jurisdicción y aplicabilidad territorial:** No asumir que un sitio está sujeto automáticamente al RGPD por ser accesible desde Europa; evaluar establecimiento en la UE, oferta explícitamente dirigida a personas en la UE o seguimiento activo de su comportamiento (Art. 3.2 RGPD), así como el tratamiento concreto. Verificar normativa y vigencia con fuentes oficiales cuando corresponda. No imponer a Chile requisitos propios de la Directiva ePrivacy europea (acceso/escritura en terminal) sin un análisis jurídico fundado en la legislación chilena aplicable.

Este anexo es condicional: se activa **solo si el proyecto trata datos personales** o utiliza cookies y almacenamiento persistente. No cargar para utilidades CLI sin red, algoritmos matemáticos ni software que opere exclusivamente con datos abstractos.

## 1. Criterios de activación y escenarios de tratamiento

La recolección, uso o procesamiento de datos personales constituye tratamiento aun cuando no exista almacenamiento permanente. El agente debe distinguir tres escenarios:

- **Escenario A · Demo local con datos ficticios:** pruebas de interfaz o prototipos que usan datos sintéticos («Juan Pérez», correos de ejemplo). Requiere análisis simplificado; no generar políticas de privacidad ni avisos legales artificiales.
- **Escenario B · Interfaz que procesa datos personales reales solo en memoria:** utilidades que reciben datos reales (ej. formateadores de RUT, calculadoras salariales o validadores en navegador) sin transmitirlos ni persistirlos. Requiere evaluar el tratamiento transitorio: informar con transparencia al usuario en la interfaz sobre el procesamiento local, no enviar datos a terceros, no persistir en disco/cookies y no registrar PII en logs. No asumir exención automática de principios de licitud y finalidad.
- **Escenario C · Aplicación con persistencia, transmisión o terceros:** sistemas que almacenan en base de datos, transmiten por red o consumen APIs externas. Requiere evaluar la totalidad de los controles P01–P06, bases de licitud, encargados y documentación legal correspondiente.

### Proporcionalidad y delimitación por dominio
- **Datos públicos de personas identificables:** No clasificar automáticamente datos públicos de deportistas u otras personas identificables como ajenos a la protección de datos; el carácter público de la información no extingue su condición de dato personal ni exime de los principios de licitud y exactitud. Requieren evaluación contextual, pero no debe asignarse automáticamente una base jurídica concreta. Los términos y condiciones comerciales no son una obligación universal de privacidad.
- **Gobernanza contextual y no universal:** No declarar obligaciones universales de Registro de Actividades de Tratamiento (RAT) ni de Contrato de Encargo (DPA) sin verificar el supuesto aplicable. Deben determinarse las funciones reales de responsable, encargado y terceros independientes. No todo proveedor de datos, hosting o API es automáticamente encargado del tratamiento.
- **Distinción entre decisión pendiente, riesgo pendiente y bloqueo real:** No declarar que elegir Google Analytics, Meta Pixel, un proveedor de datos o una arquitectura específica impide comenzar la Fase 1 si esas decisiones pueden investigarse durante la especificación o diseño. No convertir decisiones de arquitectura clínica o de integración técnica (ej. HL7/FHIR, modelo de nube, tipo de firma electrónica) en bloqueos anticipados para comenzar la especificación cuando todavía puedan investigarse en etapas posteriores de diseño. Distinguir con precisión:
  - *Decisión pendiente:* alternativa técnica o funcional por definir que puede madurar progresivamente durante la especificación o diseño sin paralizar el inicio de la fase.
  - *Riesgo pendiente:* amenaza técnica o jurídica identificada que requiere salvaguardas o mitigación antes de producción, pero que no impide formular requisitos.
  - *Bloqueo real:* ausencia de datos esenciales de entrada, contradicción insalvable de requisitos o impedimento técnico/normativo documentado que efectivamente impide avanzar a la siguiente acción ejecutable.
- **Fidelidad al alcance:** No incorporar funciones no solicitadas al MVP como requisitos aprobados.

## 2. Clasificación de datos e inventario

- *Identificatorios y de contacto:* nombre, RUT/DNI, email, teléfono, dirección, usuario.
- *Técnicos y de telemetría:* IP, ID de dispositivo, cookies de seguimiento, geolocalización, User-Agent. No asumir que no disponer de cuentas implica no tratar datos personales cuando se procesan identificadores de red o de terminal.
- *Categorías sensibles (Art. 10 Ley 19.628 / Art. 14 Ley 21.719 / Art. 9 GDPR):* salud, biométricos, opiniones políticas, convicciones religiosas o filosóficas. Exigen base legal reforzada o consentimiento expreso calificado.
- *Datos de niños, niñas y adolescentes (específicamente Art. 16 Ley 21.719 / Art. 8 GDPR):* exigen consentimiento de representantes legales o reglas de capacidad progresiva según edad y contexto, con estricta minimización.
- **Minimización y finalidad (Art. 14 quáter Ley 21.719):** recolectar únicamente los campos indispensables para el fin declarado. Distinguir estadísticas agregadas (métricas globales disociadas sin identificación individual) de datos personales individuales o seudónimos.

## 3. Bases de licitud, gobernanza y arquitectura (Arts. 12, 13, 14 quáter, 14 quinquies y 15 bis)

- **Identificar base jurídica por finalidad (Chile: Arts. 12 y 13 Ley 21.719; UE: Art. 6 GDPR):**
  - *Consentimiento (Art. 12):* previo, libre, informado, específico e inequívoco. Demostrable; nunca casilla premarcada ni consentimiento forzado para servicios independientes.
  - *Otras bases (Art. 13):* ejecución de contrato, obligación legal o interés legítimo ponderado con derecho de oposición.
- **Responsable y encargados (Art. 15 bis Ley 21.719 / P05):** identificar al responsable del tratamiento y a los proveedores/APIs externas que actúan como encargados. Deben determinarse las funciones reales de responsable, encargado y terceros independientes; no todo proveedor de datos, hosting o API es automáticamente encargado del tratamiento. La ausencia de internet, APIs o telemetría no demuestra por sí sola que no existan terceros encargados; un tercero puede procesar datos mediante archivos entregados físicamente o mediante ejecución local. Todo tratamiento por encargo requiere contrato (DPA) con instrucciones y deberes de confidencialidad y seguridad. No exigir DPA cuando no intervienen terceros encargados. Si la relación no está confirmada, P05 debe permanecer NOT VERIFIED o BLOCKED cuando exista un bloqueo real documentado; N/A solo corresponde cuando la inaplicabilidad del control está suficientemente justificada.
- **Transferencias internacionales:** registrar destinatario, país, finalidad y salvaguardas cuando salgan datos fuera de la jurisdicción aplicable.
- **Seguridad, seudonimización y flujo de datos (Art. 14 quinquies Ley 21.719):**
  - Prohibido registrar contraseñas, tokens o PII en logs de consola o texto plano.
  - *Seudonimización vs. anonimización:* La seudonimización mediante hash (ej. hash salteado de IP o identificadores) reduce el riesgo técnico, pero no equivale a anonimización plena e irreversible mientras persista posibilidad de reidentificación o correlación; el procesamiento previo de la IP antes del hash constituye tratamiento de datos personales.
- **Terminales, cookies, analítica y rastreadores (ePrivacy Art. 5(3) / directivas):**
  - *Operaciones en terminal:* Evaluar cualquier lectura o escritura en el equipo terminal (cookies, `localStorage`, `sessionStorage`, scripts o huellas digitales). La falta de cookies no demuestra ausencia de tratamiento de datos personales ni descarta operaciones en terminal.
  - *Técnicas / esenciales:* necesarias para sesión, autenticación, CSRF o almacenamiento de preferencias solicitadas expresamente por el usuario (ej. tema claro/oscuro en `localStorage` sin identificadores de seguimiento); no requieren banner de consentimiento invasivo, basta documentar su uso. El almacenamiento de preferencias solicitado por un usuario puede acogerse a excepciones según la normativa aplicable, sin declarar una exención universal para cualquier localStorage persistente.
  - *Analítica y tecnologías de seguimiento:* No asumir que «sin cookies» equivale a anonimato ni que una analítica cookieless está siempre exenta de consentimiento; evaluar operaciones reales de lectura/escritura en terminales, IP, User-Agent, scripts, píxeles y transferencias.
  - *Gestores de consentimiento (CMP):* No asumir que cualquier herramienta analítica obliga automáticamente a instalar una CMP. No hacer obligatoria una CMP de la IAB para cualquier sitio web y eliminar referencias obsoletas a TCF v2.2 como recomendación vigente en 2026. Si se recomienda una tecnología de consentimiento, verificar su versión, ámbito de aplicación y requisitos concretos. No generar banners de cookies decorativos si el sistema no utiliza rastreadores.
- **Derechos de titulares (ARCOP - Arts. 5 a 9 Ley 21.719):** mecanismos técnicos para atender solicitudes de Acceso, Rectificación, Supresión, Oposición, Bloqueo y Portabilidad.

## 4. Documentación legal contextual (Art. 14 ter) y evaluación de impacto (Art. 15 ter)

El agente redacta borradores ajustados a la realidad técnica, sin inventar datos:
- Las políticas o avisos deben reflejar el tratamiento efectivo, las jurisdicciones aplicables y las obligaciones verificadas.
- **Aviso en punto de recogida:** breve y directo al registrarse o enviar formularios reales.
- **Política de privacidad y cookies:** responsable, fines, destinatarios, retención y derechos.
- **Evaluación de Impacto (EIPD / DPIA - Art. 15 ter Ley 21.719 / Art. 35 GDPR):** obligatoria ante tratamientos de alto riesgo debidamente fundamentados (decisiones automatizadas o perfiles con efectos jurídicos, tratamiento masivo de datos sensibles o vigilancia sistemática). Evaluar razonadamente la necesidad de una EIPD sin declararla obligatoria automáticamente para cualquier proyecto o prototipo.
- **Marcador obligatorio:** todo dato empresarial o legal no confirmado por el usuario debe marcarse como `[ACLARAR: razón social, RUT, dirección o DPD pendiente]`. Nunca inventar personas jurídicas ni identidades corporativas.

## 5. Matriz de evidencia de privacidad (para review.md)

Registrar en `review.md` cuando la funcionalidad trate datos personales (incluso exclusivamente en memoria) o acceda al equipo terminal.

> [!IMPORTANT]
> **Evidencia estricta y distinción de ámbitos:** Nunca marques `PASS` un control basado únicamente en una arquitectura propuesta, ejemplos teóricos, intenciones de diseño o documentos pendientes de implementar. Una decisión de diseño no constituye evidencia de cumplimiento. Asimismo, la verificación técnica de salvaguardas (PASS técnico) no equivale automáticamente a una certificación o validación jurídica de cumplimiento legal.

### Jerarquía de madurez y distinción técnica:
1. **Requisito especificado:** Delimitado en `spec.md` con criterios observables.
2. **Control diseñado:** Planteado en `plan.md` o arquitectura.
3. **Control implementado:** Código, configuración y textos funcionales en el proyecto.
4. **Control efectivamente verificado:** Demostrado con evidencia ejecutable, pruebas automatizadas o inspección técnica real.

### Evaluación individual de controles P01–P06:
Los controles P01–P06 se evalúan individualmente según el tratamiento específico y no en bloque. Por ejemplo:
- Una CLI que procesa logs personales en memoria requiere P01 (inventario y finalidad), P02 (base de licitud) y P03 (medidas de seguridad sin PII en logs ni salidas).
- P04 puede ser N/A si no existen tecnologías de cookies o rastreo aplicables en el terminal.
- P05: la ausencia de internet, APIs o telemetría no demuestra por sí sola que no existan terceros encargados (un tercero puede procesar datos mediante archivos entregados físicamente o mediante ejecución local). Deben determinarse las funciones reales de responsable, encargado y terceros independientes; no todo proveedor de datos, hosting o API es automáticamente encargado del tratamiento. Si la relación no está confirmada, P05 debe permanecer NOT VERIFIED o BLOCKED cuando exista un bloqueo real documentado; N/A solo corresponde cuando la inaplicabilidad del control está suficientemente justificada.

### Estados formales:
- **PASS:** Control implementado y efectivamente verificado con evidencia técnica real de ejecución, tests o inspección de almacenamiento/red (no equivale automáticamente a certificación jurídica).
- **FAIL:** Control verificado que presenta fallas, vulnerabilidades o incumplimientos demostrados.
- **BLOCKED:** Verificación bloqueada por dependencia externa o técnica documentada.
- **NOT VERIFIED:** Control especificado o diseñado pero pendiente de implementación o de comprobación real.
- **N/A:** El control específico no resulta aplicable al tratamiento evaluado, con justificación documentada. **Regla de no inferencia:** No se puede inferir N/A únicamente por ausencia de almacenamiento, cuentas, backend, conexión a internet o cookies; el procesamiento transitorio en memoria sigue constituyendo tratamiento de datos personales, la ausencia de red no demuestra por sí sola inexistencia de encargados, y la falta de cookies no demuestra ausencia de tratamiento de datos personales.

| Control | Criterio de verificación | Estado | Evidencia requerida para PASS |
|---|---|---|---|
| P01 | Inventario de datos, escenario (A/B/C) y finalidad documentada | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Inventario verificado en código/contratos; campos indispensables vs solicitados |
| P02 | Base de licitud (consentimiento granular o base legal demostrable) | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Flujo de consentimiento o base legal implementado y probado, sin casillas premarcadas |
| P03 | Medidas técnicas de seguridad (sin PII en logs, almacenamiento seguro) | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Tests automatizados de no-fuga en logs/salidas, cifrado verificado y configs revisadas |
| P04 | Cookies y rastreadores (consentimiento previo si hay analítica/marketing) | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Inspección real de `Application/Storage` y `Network` (0 cookies no esenciales sin consentimiento previo) |
| P05 | Encargados y transferencias externas mapeados con salvaguardas | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Funciones de responsable/encargado delimitadas, tráfico o flujos físicos verificados y contratos DPA formalizados cuando intervienen encargados |
| P06 | Documentos legales contextuales coherentes con la implementación | PASS / FAIL / BLOCKED / NOT VERIFIED / N/A | Avisos y textos revisados contra el comportamiento real publicado, sin datos falsos |

**Aviso de límites profesionales:** Specspire proporciona apoyo en arquitectura de software, trazabilidad técnica y borradores estructurados. No constituye asesoramiento jurídico formal ni certifica cumplimiento legal automático; los tratamientos de riesgo y políticas finales requieren revisión por un especialista legal.
