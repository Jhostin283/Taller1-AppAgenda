# OpenSpec Architecture

Este directorio contiene la documentación viva y las especificaciones arquitectónicas del proyecto gestionadas mediante [OpenSpec](https://openspec.dev/).

En lugar de tener documentos estáticos que se desactualizan, usamos este sistema para que tanto humanos como agentes de IA (como Antigravity) entiendan las reglas de negocio, los flujos de QA y los procesos de trabajo antes de tocar una sola línea de código.

## Estructura de Carpetas

### 📁 `specs/` (La Fuente de la Verdad)
Aquí viven las especificaciones actuales y activas de la aplicación (los "Contratos de Comportamiento"). 
Están organizadas por "Capacidades" (Capabilities):
- `contact-management/spec.md`: Reglas del CRUD, validaciones de backend y base de datos (Usa identificadores `BA-XX`).
- `ui/spec.md`: Reglas estrictas de experiencia de usuario, botones y modales (Usa identificadores `FR-XX`).

#### 📁 `specs/qa/` (Matriz de Calidad y Trazabilidad)
Documentación de Aseguramiento de Calidad separada de las lógicas puras. Contiene los Casos de Prueba (Test Cases) que validan los specs.
- `backend-tests.md`: Matriz de 7 columnas para probar APIs (`TC-BA-XX`).
- `frontend-tests.md`: Matriz de 6 columnas para probar UI (`TC-FR-XX`).
- **Regla:** Mapeo perfecto 1:1:1 entre Spec -> QA -> Código.

### 📁 `changes/` (Laboratorio de Nuevas Funcionalidades)
Aquí se diseñan las nuevas características **antes** de programarlas. Cada nueva funcionalidad (ej. `paginacion`) tiene su propia subcarpeta activa con 4 archivos:
1. `proposal.md`: Qué se va a hacer y por qué.
2. `specs/<capacidad>/spec.md`: Las nuevas reglas que se van a añadir o modificar.
3. `design.md`: Cómo se va a programar (decisiones técnicas, arquitectura, QA).
4. `tasks.md`: El paso a paso (checklist) para el desarrollador.

#### 📁 `changes/archive/` (Historial de Funcionalidades Terminadas)
Contiene las carpetas de las funcionalidades que ya fueron programadas, verificadas y fusionadas. Actúa como una bitácora histórica de cómo se diseñó y construyó cada pieza del proyecto en el pasado (ej. `v1-initial-release`, `v1-automated-tests`).

### ⚖️ Regla de Impacto de Funcionalidades (Híbridas vs Unilaterales)
Cuando se crea una nueva funcionalidad en `changes/`, los requerimientos y los casos de prueba (QA) generados deben ser proporcionales a las capas que afecta:
- **Funcionalidad Híbrida (Backend y Frontend):** Si el cambio afecta a ambas partes (ej. la Paginación de contactos), los Delta Specs deben crear requerimientos tanto en `specs/contact-management/spec.md` (BA-XX) como en `specs/ui/spec.md` (FR-XX). A su vez, se deben detallar y añadir los casos de prueba en las dos matrices de QA (`qa/backend-tests.md` y `qa/frontend-tests.md`) y programar ambas implementaciones en el código fuente.
- **Funcionalidad Unilateral (Solo Backend o Solo Frontend):** Si el cambio es puramente visual (ej. rediseño de colores), solo se modificará el Spec del Frontend (`FR-XX`) y solo se programarán pruebas para Frontend en la matriz `qa/frontend-tests.md`. Si es puramente de datos (ej. un nuevo cálculo de cronjob), solo afectará al Backend (`BA-XX`). Nunca se debe forzar la creación de pruebas en capas no afectadas.

### 📄 `config.yaml`
Es el archivo de configuración maestro de OpenSpec. Le dice a las herramientas y agentes de IA cómo deben comportarse (stack tecnológico, reglas de diseño, prohibición de alertas nativas, etc.).

---

## Evolución Histórica y Metodología

Para entender cómo programar en este repositorio, es vital entender las fases por las que ha pasado el proyecto. Toda nueva característica debe heredar la madurez de la fase actual:

### Fase 1: MVP Funcional (`v1-initial-release`)
El proyecto nació con la creación de la arquitectura base Fullstack (Spring Boot + Angular + PostgreSQL). Se construyeron las funcionalidades primarias del CRUD (Crear, Listar, Actualizar, Eliminar) guiadas por reglas de negocio, pero **sin un marco de pruebas automatizadas**.

### Fase 2: Gobierno de Calidad y TDD (`v1-automated-tests`)
Para asegurar la escalabilidad, se detuvo el desarrollo de nuevas funciones y se implementó una **Arquitectura de QA estricta**. Se introdujeron:
- Las matrices de pruebas en `specs/qa/`.
- La adopción obligatoria de JUnit (Backend) y Jasmine/Karma (Frontend).
- **La Regla de Oro (1:1:1):** Ningún código se aprueba si no existe su caso de prueba, y ningún caso de prueba existe si no está vinculado a una regla de negocio.

### Fase 3: Madurez (Actual)
A partir de este punto (empezando con características como la `paginacion`),  se trabaja bajo la metodología de "Desarrollo Guiado por Especificaciones y Pruebas" (Spec & Test-Driven Development). **Cualquier nueva funcionalidad propuesta DEBE incluir obligatoriamente el diseño de sus Delta Specs de QA y su correspondiente código de test antes de dar la característica por terminada.**

> **💡 ¿Cómo funcionan los Delta Specs de QA en la práctica?**
> Cuando creas una funcionalidad (ej. `changes/paginacion`), debes crear subcarpetas `specs/qa/` dentro de ese "laboratorio". Ahí redactas archivos con bloques `## ADDED Test Cases` o `## MODIFIED Test Cases`. 
> Durante el desarrollo, el programador se guía por esos Delta Specs para escribir el código. Una vez terminada la programación, al ejecutar el comando `/opsx-archive`, el sistema fusionará (inyectará) esas filas nuevas directamente en las matrices principales (`openspec/specs/qa/...`), manteniendo la Fuente de la Verdad siempre actualizada y sin esfuerzo manual.

---

## Flujo de Trabajo (OpenSpec Workflow)

El ciclo de vida del desarrollo usando OpenSpec se basa en comandos secuenciales ejecutados por el Agente (IA) para gobernar el desarrollo. El orden natural es el siguiente:

### 1. `/opsx-propose` (Planificación inicial)
**Propósito:** Proponer una nueva funcionalidad.
**Acción:** El agente escucha tus requerimientos y genera automáticamente los 4 artefactos en `changes/<feature>` (`proposal.md`, `design.md`, `tasks.md` y `specs/`). Aún no se toca el código fuente.

### 2. `/opsx-update` (Iteración del Diseño)
**Propósito:** Refinar el plan propuesto.
**Acción:** Si luego de leer la propuesta decides cambiar la arquitectura o la base de datos, ejecutas este comando. El agente revisa y actualiza los documentos de planificación para que sean coherentes antes de empezar a programar.

### 3. `/opsx-apply` (Implementación)
**Propósito:** ¡Escribir el código real!
**Acción:** El agente lee exhaustivamente `design.md` y `tasks.md`, implementa el código en la aplicación (Backend/Frontend), ejecuta pruebas y va marcando con `[x]` las tareas completadas en el `tasks.md`.

### 4. `/opsx-sync` (Sincronización Intermedia) - *Opcional*
**Propósito:** Fusionar solo la documentación temporalmente.
**Acción:** Sincroniza las reglas de la nueva funcionalidad (Delta Specs) hacia la carpeta `specs/` principal, sin mandar la funcionalidad completa al archivo. Útil en proyectos muy grandes.

### 5. `/opsx-archive` (Cierre y Limpieza)
**Propósito:** Terminar oficialmente la funcionalidad.
**Acción:** Una vez que el código funciona y las pruebas pasan, este comando consolida las reglas nuevas en `specs/` y mueve toda la carpeta de `changes/<feature>` hacia `changes/archive/`. El laboratorio queda limpio para la próxima funcionalidad.
