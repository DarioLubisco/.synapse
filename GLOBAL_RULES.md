# REGLAS GLOBALES DEL SISTEMA (GLOBAL RULES)

## 1. PROHIBICIÓN DE CAMBIOS DESTRUCTIVOS SIN AUTORIZACIÓN
Bajo ninguna circunstancia la IA debe ejecutar comandos destructivos o cambios drásticos en la infraestructura de producción sin solicitar **PERMISO EXPLÍCITO** del usuario. 

### Acciones Estrictamente Prohibidas:
- `docker rm` (Eliminación de contenedores)
- `docker stop` (Detención de servicios críticos a menos que sea una emergencia autorizada)
- Re-creación de contenedores desde cero.
- Eliminación de volúmenes, redes o bases de datos.
- Modificación de variables de entorno persistentes que puedan corromper sesiones activas.

### Procedimiento Obligatorio:
Antes de cualquier cambio que altere el estado de un contenedor o servicio:
1. Explicar el cambio propuesto en detalle.
2. Identificar los riesgos (ej: pérdida de datos en volúmenes anónimos o bases de datos no mapeadas).
3. **Solicitar confirmación al usuario.**
4. No proceder hasta recibir la aprobación directa ("Sí, procede").

*(Añadido tras el incidente crítico del 8 de mayo de 2026, donde la recreación del contenedor evolution-api causó la pérdida de una sesión de WhatsApp de 10 días de esfuerzo).*

## 2. PROTOCOLO DE SINCRONIZACIÓN (Git + Notion + NotebookLM)
Antes de comenzar a resolver cualquier tarea o investigar problemas de arquitectura, **DEBES LEER ESTRICTAMENTE** el archivo [SYNC_PROTOCOL.md](./SYNC_PROTOCOL.md) ubicado en la raíz.
Este protocolo define cómo usar las herramientas MCP (Notion, NotebookLM) para mantener la consistencia del ecosistema de software (Software OS).
