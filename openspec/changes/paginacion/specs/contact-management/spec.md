## MODIFIED Requirements

### Requirement: Listar Contactos
El sistema SHALL devolver la lista de contactos registrados de forma paginada para evitar saturación de memoria.

#### [MODIFIED] Scenario: [BA-05] Listado sin filtros (Paginado)
- **WHEN** se solicita el listado de contactos sin filtros de búsqueda (ej. `?page=0&size=10`)
- **THEN** el sistema devuelve 200 OK y el primer bloque de la colección envuelto en un objeto de Paginación.

#### [ADDED] Scenario: [BA-09] Listado de primera página
- **WHEN** se solicita `GET /api/contacts?page=0&size=10`
- **THEN** el sistema devuelve 200 OK y el primer bloque de contactos junto con metadatos de paginación.

#### [ADDED] Scenario: [BA-10] Listado de página vacía
- **WHEN** se solicita una página que excede el total de elementos (ej. `page=99`)
- **THEN** el sistema devuelve 200 OK y un arreglo vacío de contenido.
