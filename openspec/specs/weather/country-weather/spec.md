## Purpose
Permite a los usuarios seleccionar un país y posteriormente una ciudad específica para ver su información climática actual o pronosticada, evitando la sobrecarga de datos.

## Requirements

### Requirement: Selección de País
El sistema SHALL proporcionar una manera para que el usuario seleccione un país de una lista predefinida.

#### Scenario: [FR-12] Usuario selecciona un país
- **WHEN** el usuario selecciona un país del selector
- **THEN** el sistema obtiene y llena un selector secundario con las ciudades de referencia para ese país específico.

### Requirement: Selección de Ciudad y Visualización del Clima
El sistema SHALL permitir al usuario seleccionar una ciudad específica de la lista generada y mostrar sus datos climáticos.

#### Scenario: [FR-13] Visualización del clima de una ciudad específica
- **WHEN** el usuario selecciona una ciudad específica y solicita el clima
- **THEN** el sistema obtiene y muestra las condiciones climáticas actuales (temperatura, descripción) exclusivamente para esa ciudad.

### Requirement: UI y Traducciones en Español
El sistema SHALL presentar toda la información climática y los elementos de la interfaz en español.

#### Scenario: [FR-14] Traducción de las respuestas de la API del clima
- **GIVEN** la API externa devuelve descripciones o el backend las procesa
- **WHEN** los datos del clima son presentados al usuario
- **THEN** el sistema muestra estas descripciones en español (ej. "Soleado", "Lluvia ligera") y el icono de clima apropiado.

### Requirement: Diseño Horizontal Compacto
El sistema SHALL mostrar los controles de selección y los datos del clima en un diseño compacto y horizontal para preservar el espacio vertical en la vista principal de la agenda.

#### Scenario: [FR-15] Rendereo de la tarjeta horizontal
- **WHEN** el componente de clima es renderizado en la agenda
- **THEN** los controles y datos MUST acoplarse horizontalmente.

### Requirement: Normalización de Datos de la API de Clima
El backend SHALL normalizar la respuesta de diferentes proveedores en un único formato predecible.

#### Scenario: [BA-14] Mapeo de proveedores
- **WHEN** el backend consume un proveedor externo
- **THEN** MUST normalizar la carga útil (payload) a un formato con city, country, temperature (Celsius) y description.
- **AND** MUST extraer la temperatura desde current.temp_c (WeatherAPI) o main.temp (OpenWeatherMap).
- **AND** MUST extraer la descripción desde current.condition.text o weather[0].description y descartar datos secundarios como humedad o viento para ahorrar memoria y cumplir con el diseño compacto.
