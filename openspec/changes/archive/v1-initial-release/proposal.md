## Why

El proyecto inicial requiere la creación de un sistema de gestión de contactos (CRM básico) que permita almacenar, listar, modificar y eliminar contactos. Es necesario establecer una arquitectura base robusta tanto para el backend como para el frontend, que sirva como punto de partida para futuras expansiones (Paginación, Login, etc.).

## What Changes

- Creación del Backend completo con operaciones CRUD.
- Creación de la Base de Datos con persistencia relacional.
- Creación del Frontend con interfaz gráfica completa.
- Implementación de reglas estrictas de UI (validaciones de formulario y modales).

## Capabilities

### New Capabilities
- `contact-management`: Gestión del ciclo de vida de los contactos (Crear, Leer, Actualizar, Borrar).
- `ui`: Reglas visuales y validaciones de interfaz de usuario.

### Modified Capabilities
*(Ninguna, lanzamiento inicial)*

## Impact

- Se establecen los repositorios base, controladores REST y DTOs en el Backend.
- Se configura la arquitectura de Signals y Standalone Components en el Frontend.
- Queda configurada la base de datos PostgreSQL.
