## Context
Implementaremos la paginación de los contactos respetando la **Regla de Oro de Trazabilidad (1:1:1)** establecida en la iteración `v1-automated-tests`. Esto significa que cada nuevo requerimiento tendrá su caso en la tabla QA y su método `@Test` o `it()` explícito en el código.

## Goals / Non-Goals
**Goals:**
- Implementar `Pageable` en Spring Data JPA (Backend).
- Modificar el controlador para devolver un objeto `Page` (Backend).
- Implementar controles visuales de paginación en `contact-list` (Frontend).
- Reflejar las adiciones en las matrices de QA.

**Non-Goals:**
- No se implementarán filtros de búsqueda ni ordenamiento dinámico por columnas en esta fase; solo paginación básica.

## Decisions

### 1. Actualizaciones de Arquitectura QA
- Se ha creado la carpeta temporal `openspec/changes/paginacion/specs/qa/` para albergar los **Delta Specs** de calidad, siguiendo exactamente la misma metodología que con los requerimientos (BDD).
- El delta `backend-tests.md` modifica la fila `TC-BA-05` y añade `TC-BA-09` y `TC-BA-10` con la estructura estricta de 7 columnas.
- El delta `frontend-tests.md` añade `TC-FR-05` y `TC-FR-06` con la estructura estricta de 6 columnas.

### 2. Decisiones Backend
- El endpoint `GET /api/contacts` recibirá dos `RequestParam` opcionales: `page` (default 0) y `size` (default 10).
- Spring Data JPA `PagingAndSortingRepository` se usará automáticamente a través de la interfaz extendida de `JpaRepository`.
- **Mapeo QA**: Las pruebas usarán `@Nested class ListarContactos` actualizando los nombres a `TC_BA_09_listadoPrimeraPagina_retorna200` y `TC_BA_10_listadoPaginaVacia_retorna200`.

### 3. Decisiones Frontend
- El componente `contact-list.component.ts` agregará variables `currentPage`, `pageSize` y `totalElements`.
- Se añadirán botones `<button>` debajo de la tabla.
- **Mapeo QA**: Se añadirán los tests en `contact-list.component.spec.ts` respetando la Co-localización y usando las firmas `TC_FR_05...` y `TC_FR_06...`.
