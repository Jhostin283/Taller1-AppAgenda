## ADDED Requirements

### Requirement: Estados de Carga y Errores (Clima)
El sistema SHALL proporcionar feedback visual adecuado al usuario cuando esté solicitando datos meteorológicos, especialmente dada la posibilidad de retardo por el mecanismo de fallback.

#### Scenario: [FR-07] Indicador de carga activo
- **WHEN** el usuario selecciona un país y se inicia la solicitud de clima
- **THEN** se muestra un indicador de carga (spinner o skeleton loader) mientras los datos de WeatherAPI/OpenWeatherMap son obtenidos.

#### Scenario: [FR-08] Error de clima indisponible
- **WHEN** fallan ambos proveedores de clima
- **THEN** la interfaz muestra un mensaje amistoso de error (dentro de un modal o banner) indicando que los datos climáticos no están disponibles en este momento.

### Requirement: Modal de Detalles de Clima
El sistema SHALL mostrar los detalles del clima utilizando modales en lugar de alertas nativas del navegador, aplicando las reglas de diseño globales.

#### Scenario: [FR-09] Modal con backdrop-blur
- **WHEN** el usuario visualiza los detalles ampliados del clima para una ciudad (si aplica, o en alertas de error)
- **THEN** aparece un modal superpuesto con desenfoque de fondo (`backdrop-blur`) y tema "hoja rayada de cuaderno".
