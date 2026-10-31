# Contribuir a Specspire

Las mejoras deben demostrar que hacen el flujo **más claro y fiable**, no solamente más extenso.

1. Abre un issue con el problema, un caso real y el resultado esperado.
2. Trabaja en una rama separada; mantén la modificación acotada.
3. Actualiza documentación y pruebas si cambia el instalador o las rutas.
4. Ejecuta `npm test`, `npm run check` y `npm run test:package`; documenta cualquier comprobación pendiente. En PowerShell puedes usar `npm.cmd`.
5. Presenta el PR con **problema → solución → evidencia → riesgos**.

## Reglas de documentación

- Escribe para alguien que abre el repositorio por primera vez.
- Pon la acción principal antes de la explicación teórica.
- Cada guía debe responder: **qué hago**, **cómo lo hago** y **cómo sé que funcionó**.
- No documentes comandos inexistentes ni afirmes compatibilidad no verificada.
- Enlaces relativos, encabezados claros y ejemplos copiables.

No copies Skills externas sin revisar sus licencias y condiciones de atribución.

Los tests nativos de enlaces pueden indicar BLOCKED por permisos locales. Esos casos no son PASS: conserva el motivo y el recuento. CI exige su ejecución y falla si están bloqueados; para reproducir ese modo local usa `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` como variable del proceso. No cambies políticas globales para ocultar un fallo.

`test:package` empaqueta e instala offline en un directorio temporal con caché aislada; muestra su ruta y conserva artefactos para inspección. También comprueba el contenido real del tarball: la Skill con sus 15 referencias, plantillas y guías enlazadas deben estar presentes y `docs/audits/` ausente. No publica ni instala globalmente. La matriz configurada cubre Node 20.0.0, 22 y 24 en Linux, Windows y macOS; solo los runs remotos completados permiten declarar cada combinación verificada. Configura el job `required` como check obligatorio de PR después del primer push.

## Evidencia histórica

Los informes de `docs/audits/` (solo en el repositorio de GitHub) registran auditorías fechadas del repositorio. Son historial, no instrucciones operativas para agentes, y se excluyen del paquete npm mediante la lista `files` de `package.json`. No reescribas sus resultados; agrega un informe nuevo cuando corresponda y no incluyas rutas personales ni secretos.
