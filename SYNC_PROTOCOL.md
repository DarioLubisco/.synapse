# Protocolo de Sincronización Automática (IA)

Este proyecto utiliza un sistema de **Arquitectura Híbrida** para mantener el código (Git), las tareas (Notion) y la base de conocimiento (NotebookLM) sincronizados. 

Las tareas mecánicas de Notion (marcar In Progress / Done) se manejan localmente mediante **Git Hooks**. 
Como IA (Cursor, Antigravity, Cline), tu trabajo es proveer el **Contexto Analítico**. Sigue estrictamente estas reglas en tus sesiones de trabajo.

## 1. Identificación de Contexto Activo (Notion)
Antes de planificar cualquier tarea grande o modificar arquitectura:
1. **Verifica la rama actual:** Revisa la rama de Git actual. Si estás en una rama tipo `feature/TASK-XXX`, ese es tu contexto activo.
2. **Consulta la tarea en Notion:** Usa la herramienta MCP de Notion para buscar el ID de la tarea (`TASK-XXX`). Lee la descripción, los criterios de aceptación y los comentarios para entender el objetivo *antes* de escribir código.

## 2. Investigación en NotebookLM
Si la tarea requiere entender arquitectura, requerimientos del cliente o convenciones de proyecto, debes consultar NotebookLM.
**Regla Estricta de Filtrado:** Tienes acceso a decenas de cuadernos del usuario. Para no contaminar el contexto, **DEBES FILTRAR** tu búsqueda y acceder *únicamente* a los cuadernos que contengan el prefijo del proyecto actual.
- **Prefijo de este proyecto:** `[Synapse]`
- Solo puedes consultar fuentes y hacer Q&A sobre los cuadernos cuyo título empiece con `[Synapse]` (ej. `[Synapse] Requerimientos`, `[Synapse] Arquitectura`).

## 3. Minimización de Contexto del Workspace (Evitar Dispersión)
El directorio raíz contiene cientos de scripts de diagnóstico y archivos de datos pesados (como `Inventario.txt` de 1.7MB o scripts `check_*.py`). 
- **Regla de Oro:** **NO** leas, indexes ni analices archivos sueltos en el directorio raíz (`/home/synapse/source/`) a menos que el usuario lo solicite explícitamente.
- **Foco de Verdad:** Tu fuente primaria de verdad para arquitectura, base de datos y reglas de negocio son los cuadernos `[Synapse]` de **NotebookLM** y las notas de arquitectura oficiales. 
- Evita por completo leer archivos temporales, logs (`*.log`), excel (`*.xlsx`) o scripts de diagnóstico (`check_*.py`, `ssh_*.py`, `run_*.py`) para no contaminar tu ventana de contexto con información obsoleta o irrelevante.

## 4. Cierre y Documentación (Diff Arquitectónico)
No modifiques NotebookLM en cada commit o tarea pequeña; eso genera ruido.
Cuando finalices una tarea que haya introducido **cambios arquitectónicos**, dependencias nuevas o refactors importantes:
1. Genera un archivo local llamado `ARCHITECTURE_DIFF.md` resumiendo los cambios a alto nivel.
2. Infórmale al usuario: *"He generado un ARCHITECTURE_DIFF.md con las decisiones de diseño. Cuando termines este hito, súbelo a tu cuaderno '[Synapse] Arquitectura' en NotebookLM para mantener el RAG sincronizado."*
