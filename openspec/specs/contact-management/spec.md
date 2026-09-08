## Purpose
Gestión de contactos (CRUD) en el sistema.

### Requirement: Crear Contacto
El sistema SHALL permitir registrar nuevos contactos con validación estricta de formato y restricciones lógicas.

#### Scenario: [BA-01] Creación exitosa
- **WHEN** se envían datos válidos (nombre, apellido, correo único)
- **THEN** el sistema retorna 201 Created y el ID del contacto.

#### Scenario: [BA-02] Validación fallida (Correo)
- **WHEN** se envía un correo inválido (sin @)
- **THEN** el sistema retorna 400 Bad Request.

#### Scenario: [BA-03] Validación fallida (Teléfono)
- **WHEN** el teléfono contiene letras
- **THEN** el sistema retorna 400 Bad Request.

#### Scenario: [BA-04] Correo duplicado
- **WHEN** se envía un correo que ya existe en otro contacto
- **THEN** el sistema retorna 409 Conflict.

### Requirement: Listar Contactos
El sistema SHALL devolver la lista de todos los contactos registrados.

#### Scenario: [BA-05] Listado sin filtros
- **WHEN** se solicita el listado de contactos
- **THEN** el sistema devuelve 200 OK y el arreglo de todos los contactos.

### Requirement: Consultar Detalles
El sistema SHALL permitir recuperar un contacto específico mediante su ID.

#### Scenario: [BA-06] Contacto existente
- **WHEN** se solicita un ID existente
- **THEN** el sistema devuelve 200 OK y los datos del contacto.

### Requirement: Actualizar Contacto
El sistema SHALL permitir actualizar los datos de un contacto existente.

#### Scenario: [BA-07] Actualización de datos
- **WHEN** se envían datos válidos para un ID existente
- **THEN** el sistema sobrescribe la entidad y retorna 200 OK.

### Requirement: Eliminar Contacto
El sistema SHALL permitir borrar físicamente (hard delete) un registro.

#### Scenario: [BA-08] Eliminación exitosa
- **WHEN** se solicita borrar un ID existente
- **THEN** el sistema lo elimina de PostgreSQL y retorna 204 No Content.
