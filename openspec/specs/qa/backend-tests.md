# Casos de Prueba - Backend (Spring Boot)

Este documento define las validaciones estrictas y operaciones HTTP que deben ser probadas a nivel de API. Los identificadores usan el prefijo **BE** (Backend).

| ID | Escenario | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Código HTTP | Archivo de Prueba |
|---|---|---|---|---|---|---|
| **TC-BA-01** | Creación exitosa | Base de datos activa | Se envía JSON válido | El contacto se guarda en DB | `201 Created` | `ContactControllerTest.java` |
| **TC-BA-02** | Validación de correo | Formulario con datos | Se envía un correo inválido (ej. sin `@`) | El sistema rechaza la petición | `400 Bad Request` | `ContactControllerTest.java` |
| **TC-BA-03** | Validación de teléfono | Formulario con datos | Se envía un teléfono con letras | El sistema rechaza la petición | `400 Bad Request` | `ContactControllerTest.java` |
| **TC-BA-04** | Correo duplicado | Existe un correo "a@a.com" | Se envía un POST con "a@a.com" | El sistema detecta colisión | `409 Conflict` | `ContactControllerTest.java` |
| **TC-BA-05** | Listado sin filtros | Hay 2 contactos en DB | Se llama a `GET /api/contacts` | Retorna JSON con arreglo | `200 OK` | `ContactControllerTest.java` |
| **TC-BA-06** | Contacto existente | Existe contacto ID=1 | Se llama a `GET /api/contacts/1` | Retorna el detalle del contacto | `200 OK` | `ContactControllerTest.java` |
| **TC-BA-07** | Actualización de datos | Existe contacto ID=1 | Se llama a `PUT /api/contacts/1` | Sobrescribe el registro | `200 OK` | `ContactControllerTest.java` |
| **TC-BA-08** | Eliminación exitosa | Existe contacto ID=1 | Se llama a `DELETE /api/contacts/1` | Se borra permanentemente | `204 No Content` | `ContactControllerTest.java` |
