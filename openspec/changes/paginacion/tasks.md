## 1. Actualización de Matrices QA

- [ ] 1.1 Modificar el caso antiguo `TC-BA-05` (Listado sin filtros) en `openspec/specs/qa/backend-tests.md` para indicar que retorna paginación.
- [ ] 1.2 Añadir a la matriz Backend los casos `TC-BA-09` (Listado primera página) y `TC-BA-10` (Listado página vacía), llenando sus 7 columnas.
- [ ] 1.3 Añadir a la matriz Frontend los casos `TC-FR-05` (Bloqueo botón Anterior) y `TC-FR-06` (Bloqueo botón Siguiente), llenando sus 6 columnas.

## 2. Implementación Backend (Spring Boot)

- [ ] 2.1 Actualizar `ContactRepository` para asegurar que hereda de `JpaRepository` (que ya incluye soporte para `Pageable`).
- [ ] 2.2 Modificar `ContactService.getContacts()` para recibir un objeto `Pageable` y retornar un `Page<Contact>`.
- [ ] 2.3 Modificar `ContactController.getContacts()` para aceptar `@RequestParam(defaultValue = "0") int page` y `@RequestParam(defaultValue = "10") int size`, y devolver un `Page<ContactDto>`.
- [ ] 2.4 Reemplazar los tests antiguos de listado en `ContactControllerTest.java` por los nuevos métodos de prueba que implementan `TC_BA_09` y `TC_BA_10`. Verificar con `mvn test`.

## 3. Implementación Frontend (Angular)

- [ ] 3.1 Actualizar el DTO / interface `Contact` o crear `PageResponse<T>` en Angular si es necesario, para poder tipar correctamente la respuesta paginada que envía Spring (ej. `content`, `totalElements`, `totalPages`).
- [ ] 3.2 Modificar `ContactService` en Angular para que acepte `page` y `size` y los envíe como parámetros HTTP en la URL.
- [ ] 3.3 Modificar `contact-list.component.ts` para manejar el estado de paginación (`currentPage`, `pageSize`, `totalPages`).
- [ ] 3.4 Agregar al HTML los botones "Anterior" y "Siguiente", enlazando su atributo `disabled` con la lógica de los límites (`page === 0` o `page === totalPages - 1`).
- [ ] 3.5 Implementar los tests `TC_FR_05` y `TC_FR_06` en `contact-list.component.spec.ts` validando visualmente que los botones de paginación están bloqueados. Verificar con los tests de Angular.
