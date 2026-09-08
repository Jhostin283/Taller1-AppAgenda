## MODIFIED Test Cases

| ID | Escenario (Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Código HTTP | Archivo de Prueba |
|---|---|---|---|---|---|---|
| TC-BA-05 | BA-05: Listado sin filtros | Existen contactos en BD | GET `/api/contacts` (sin parámetros) | JSON con formato de Paginación (`content`, `totalElements`, etc.) con la primera página por defecto | 200 | `ContactControllerTest.java` |

## ADDED Test Cases

| ID | Escenario (Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Código HTTP | Archivo de Prueba |
|---|---|---|---|---|---|---|
| TC-BA-09 | BA-09: Listado de primera página | Existen al menos 15 contactos en BD | GET `/api/contacts?page=0&size=10` | JSON con `content` (10 items), `totalElements` (15), `totalPages` (2), `number` (0) | 200 | `ContactControllerTest.java` |
| TC-BA-10 | BA-10: Listado de página vacía | Existen 5 contactos en BD | GET `/api/contacts?page=1&size=10` | JSON con `content` vacío (`[]`), `totalElements` (5) | 200 | `ContactControllerTest.java` |
