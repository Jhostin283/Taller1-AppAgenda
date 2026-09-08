## ADDED Requirements

### Requirement: Paginación Segura
El sistema SHALL proporcionar controles visuales para navegar entre páginas, bloqueando interacciones fuera de los límites lógicos.

#### Scenario: [FR-05] Límite inferior de paginación
- **WHEN** el usuario se encuentra en la primera página (`page=0`)
- **THEN** el botón "Anterior" muestra `opacity-50`, cursor prohibido y está funcionalmente deshabilitado.

#### Scenario: [FR-06] Límite superior de paginación
- **WHEN** el usuario se encuentra en la última página
- **THEN** el botón "Siguiente" muestra `opacity-50`, cursor prohibido y está funcionalmente deshabilitado.
