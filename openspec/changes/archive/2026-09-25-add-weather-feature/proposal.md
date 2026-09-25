## Why

The application needs to provide contextual weather information to users based on their selected country. This enhances the user experience by offering relevant environmental data alongside existing features. To ensure high availability and reliability of this weather data, the system must not rely on a single point of failure and instead implement redundancy using two separate weather data providers.

## What Changes

- Add a country selection feature in the UI dynamically populated by the backend.
- Add a cascading city selection dropdown based on the selected country, supporting dynamic searches.
- Fetch and display the current weather only for the specifically selected city, translating all English descriptions to Spanish.
- Display the selection controls and weather output in a space-saving, compact horizontal layout.
- Implement a robust backend weather service that integrates with both WeatherAPI and OpenWeatherMap.
- Implement a fallback mechanism: if the primary API (e.g., WeatherAPI) fails or returns an error, the system automatically requests data from the secondary API (OpenWeatherMap).
- Add respective test coverage to ensure the fallback logic and new components meet the minimum 80% coverage requirement (exceeded with >92% Backend, >97% Frontend).

## Capabilities

### New Capabilities
- `weather/country-weather`: Displays reference cities for a selected country and shows their current weather.
- `weather/weather-provider`: Handles fetching weather data with redundancy (fallback between WeatherAPI and OpenWeatherMap).

### Modified Capabilities
- `qa/backend-tests.md`: Agregamos casos de prueba de Backend para los servicios de clima y fallback.
- `qa/frontend-tests.md`: Agregamos casos de prueba de Frontend para la UI de clima y selección de país.
- `ui`: Agregamos reglas de interfaz para la carga de datos del clima, manejo de errores y estados vacíos.

## Impact

- **UI**: New country selector component, city weather display component. Modales con backdrop-blur if any dialogs are used.
- **Backend Services**: New integration services for two external APIs (OpenWeatherMap, WeatherAPI), caching/fallback logic.
- **Dependencies**: External API keys will need to be securely managed and injected into the backend.
