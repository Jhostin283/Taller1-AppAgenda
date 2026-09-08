## Purpose
Reglas de diseño de interfaz (UI/UX) y comportamiento visual del frontend.

### Requirement: Validación Visual Estricta
El sistema SHALL deshabilitar visualmente y funcionalmente cualquier botón de envío si el formulario tiene un error de validación.

#### Scenario: [FR-01] Botón deshabilitado inicialmente
- **WHEN** el formulario está vacío
- **THEN** el botón Guardar Contacto está bloqueado.

#### Scenario: [FR-02] Botón deshabilitado por error
- **WHEN** el usuario borra un campo obligatorio
- **THEN** el botón Guardar Contacto se bloquea inmediatamente.

### Requirement: Navegación Segura
El sistema SHALL proveer mecanismos para escapar de las vistas de edición o creación sin guardar.

#### Scenario: [FR-03] Cancelación
- **WHEN** el usuario hace clic en Cancelar
- **THEN** es redirigido a la lista de contactos sin modificar los datos.

### Requirement: Eliminación Segura
El sistema SHALL advertir explícitamente antes de realizar acciones destructivas usando un Modal de interfaz, prohibiendo las alertas nativas.

#### Scenario: [FR-04] Modal de borrado
- **WHEN** el usuario intenta borrar un contacto
- **THEN** aparece un Modal superpuesto con desenfoque de fondo y no se borra hasta que se confirme.
