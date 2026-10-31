# Anexo · Seguridad, fiabilidad y operación proporcionales

**Todos los proyectos:** sin secretos en Git; validar entradas externas; escapar/sanitizar según el contexto; manejar errores sin revelar datos; dependencias justificadas y actualizadas. En entornos compartidos, cerrar sesiones y no guardar credenciales.

**Con cuentas, permisos o datos personales:** revisar control de acceso en servidor, autorización por recurso, almacenamiento seguro, exposición de información, sesiones, rate limiting si el riesgo lo pide y flujo de recuperación. No sustituir políticas reales por ejemplos.

**Con API/base de datos:** contratos y errores, migraciones reversibles, concurrencia, validación del lado servidor, integración y respaldo si aplica. No guardar datos sensibles en logs.

**Con despliegue real:** variables de entorno, pruebas en CI, rollback, health checks, monitoreo y alertas proporcionales. En software crítico, evaluar abuso, amenazas, mínimos privilegios, auditoría y recuperación de incidentes. No afirmar cumplimiento legal por instalar herramientas.

**Puerta de salida:** documentar controles ejecutados, resultados y riesgos sin resolver; no convertir controles opcionales en afirmaciones de seguridad absoluta.
