# Ecosistema Synapse OS

Esta carpeta (`.synapse`) contiene la configuración principal, scripts y automatizaciones (Git Hooks) que conectan tu código con Notion y NotebookLM.

## ¿Por qué está todo en esta carpeta?
Has solicitado centralizar todo el ecosistema en un solo lugar. Al ponerlo en la carpeta `.synapse` y configurar Git para que use `.synapse/hooks` como el directorio de hooks (`git config core.hooksPath .synapse/hooks`), logramos lo siguiente:
1. **Sincronización en Git:** Todo lo que está en esta carpeta se subirá a GitHub/GitLab. Si trabajas desde otra computadora o con otro desarrollador, la automatización viajará con el código.
2. **Agnóstico al IDE:** Los scripts funcionan a nivel de Git, por lo que **Cursor, Antigravity, o incluso tu terminal** dispararán la actualización de Notion sin necesidad de extensiones.

## Estructura
- `hooks/post-checkout`: Se ejecuta cuando cambias de rama. Detecta si la rama se llama `feature/TASK-XXX` y actualiza la tarea en Notion a "In Progress".
- `hooks/post-merge`: Se ejecuta al fusionar ramas (merge a `main`). Lee los IDs de las tareas de los commits y los actualiza a "Done" en Notion.
- `sync_notion_state.js`: El script (escrito en Node.js) que los hooks utilizan para conectarse a la API de Notion. Lee el token localmente desde tu configuración MCP para no exponer secretos.

## Instrucciones de la IA
Además de esta carpeta, hay archivos en la raíz que instruyen a la IA:
- `.cursorrules`: Le dice a Cursor que lea el protocolo de sincronización.
- `SYNC_PROTOCOL.md`: Le dice a la IA cómo buscar información en Notion y cómo usar los cuadernos de NotebookLM con el prefijo `[Synapse]`.

¡Con esta estructura, tu Software OS está completamente modularizado y sincronizado!
