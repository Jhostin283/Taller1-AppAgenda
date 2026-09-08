## Why

Actualmente, si la base de datos de contactos crece demasiado, el frontend cargará todos los registros a la vez, lo que ralentiza la aplicación y afecta la experiencia del usuario. Es necesario implementar la paginación para cargar los datos en bloques pequeños (ej. de 10 en 10), garantizando el cumplimiento de nuestras estrictas reglas de Calidad (QA).

## What Changes

- Modificar el endpoint `GET /api/contacts` para que acepte parámetros de paginación (`page`, `size`) e implementar pruebas `TC-BA-09` y `TC-BA-10`.
- Modificar el escenario `BA-05` (Listado sin filtros) para que refleje el nuevo formato paginado.
- Actualizar el repositorio de Spring Data JPA para usar `Pageable`.
- Actualizar la respuesta JSON para devolver una página en lugar de una lista plana.
- Modificar el Frontend (Angular) para incluir controles de navegación de páginas (Anterior, Siguiente).
- Implementar validaciones visuales `FR-05` y `FR-06` para bloquear los botones en los extremos e implementar sus respectivas pruebas `TC-FR-05` y `TC-FR-06`.
- Agregar estos casos de prueba a la Matriz de Trazabilidad en `openspec/specs/qa/`.

## Capabilities

### New Capabilities
*(Ninguna. Paginación mejora funcionalidades existentes).*

### Modified Capabilities
- `contact-management`: Modificamos cómo se listan los contactos (eliminando la regla sin filtro).
- `ui`: Añadimos reglas de usabilidad para los controles de paginación.

## Impact

- **QA**: Se agregarán 2 casos de prueba de Backend y 2 de Frontend a las matrices de QA.
- **Backend**: `ContactController`, `ContactService`, `ContactRepository` se actualizarán para incluir soporte de `Pageable`. Los tests de listar deberán actualizarse.
- **Frontend**: El componente `contact-list` requerirá nuevos botones y variables de estado para la página actual. Sus pruebas `.spec.ts` probarán los bloqueos visuales.
