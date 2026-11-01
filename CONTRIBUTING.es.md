# Contribuir a Specspire

[English](CONTRIBUTING.md) · **Español** · [Volver al README](README.es.md)

Las mejoras deben demostrar que hacen el flujo **más claro y fiable**, no solamente más extenso o complejo.

1. Abre un issue con el problema, un caso real y el resultado esperado.
2. Trabaja en una rama separada; mantén la modificación acotada.
3. Actualiza documentación y pruebas si cambia el instalador o las rutas.
4. Ejecuta `npm test`, `npm run check` y `npm run test:package`; documenta cualquier comprobación pendiente. En PowerShell puedes usar `npm.cmd`.
5. Presenta el PR estructurado con **problema → solución → evidencia → riesgos**.

## Reglas de documentación

- Escribe para alguien que abre el repositorio por primera vez.
- Pon la acción principal antes de la explicación teórica.
- Cada guía debe responder: **qué hago**, **cómo lo hago** y **cómo sé que funcionó**.
- No documentes comandos inexistentes ni afirmes compatibilidad no verificada.
- Enlaces relativos, encabezados claros y ejemplos copiables.

## Contribuciones de terceros y licencias

Para mantener la integridad y el carácter de código abierto de Specspire:

- **Derecho a contribuir:** Quienes colaboran deben contar con derechos suficientes sobre el material aportado y aceptar que las contribuciones destinadas a incorporarse a Specspire puedan distribuirse bajo la [Licencia MIT](LICENSE) del proyecto.
- **Licencias externas y transparencia:** Toda reutilización, adaptación o traducción de documentación, código o instrucciones de skills de terceros debe declararse expresamente en el pull request. Las obligaciones de licencias externas deben ser compatibles con la distribución concreta de Specspire. Las licencias copyleft requieren evaluación caso por caso. Deben conservarse todos los avisos de derechos de autor, licencias de origen y condiciones legalmente exigibles.
- **Material no autorizado y secretos:** No se admite material propietario sin la debida autorización. Las contribuciones nunca deben contener credenciales, claves de API ni datos personales reales.
- **Política de revisión:** Abrir un pull request no certifica automáticamente la originalidad jurídica del contenido; el equipo mantenedor revisa técnicamente la calidad, seguridad y compatibilidad de licencias antes de cada fusión.

## Pruebas y controles de calidad

Los tests nativos de enlaces pueden indicar `BLOCKED` por permisos locales en Windows. Esos casos no son `PASS`: conserva el motivo y el recuento. CI exige su ejecución y falla si están bloqueados; para reproducir ese modo local usa `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` como variable del proceso. No cambies políticas globales para ocultar un fallo.

`test:package` empaqueta e instala offline en un directorio temporal con caché aislada; muestra su ruta y conserva artefactos para inspección. También comprueba el contenido real del tarball: la Skill con sus 15 referencias, plantillas y guías enlazadas deben estar presentes y `docs/audits/` ausente. No publica ni instala globalmente. La matriz configurada cubre Node 20.0.0, 22 y 24 en Linux, Windows y macOS; solo los runs remotos completados permiten declarar cada combinación verificada. Configura el job `required` como check obligatorio de PR después del primer push.

## Evidencia histórica

Los informes de `docs/audits/` (solo en el repositorio de GitHub) registran auditorías fechadas del repositorio. Son historial, no instrucciones operativas para agentes, y se excluyen del paquete npm mediante la lista `files` de `package.json`. No reescribas sus resultados; agrega un informe nuevo cuando corresponda y no incluyas rutas personales ni secretos.
