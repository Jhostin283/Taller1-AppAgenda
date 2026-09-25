## 1. Backend: Configuration & DTOs

- [x] 1.1 Create `CityWeatherResponse` DTO and related models. Verify by running `mvn clean compile` to ensure classes compile correctly.
- [x] 1.2 Add configurations for WeatherAPI and OpenWeatherMap keys in `application.properties`. Verify by ensuring the context loads without errors using a basic `@SpringBootTest`.

## 2. Backend: Weather Provider Integration

- [x] 2.1 Create the `WeatherProviderService` interface. Verify by checking compilation.
- [x] 2.2 Implement `WeatherApiProvider` class to fetch data from WeatherAPI. Verify by writing unit tests mocking the `RestTemplate` (or `WebClient`) and checking if it maps data correctly, achieving at least 80% coverage on this class.
- [x] 2.3 Implement `OpenWeatherMapProvider` class to fetch data from OpenWeatherMap. Verify by writing unit tests mocking the HTTP client, achieving at least 80% coverage on this class.
- [x] 2.4 Implement `ResilientWeatherService` that calls `WeatherApiProvider` and falls back to `OpenWeatherMapProvider` on error. Verify by writing unit tests that simulate an exception from the primary provider and assert the secondary is called, achieving at least 80% coverage.

## 3. Backend: REST Controller

- [x] 3.1 Create `WeatherController` exposing `GET /api/weather/{country}`. Verify by writing Spring MVC tests (`@WebMvcTest`) to assert the correct HTTP status and JSON response format, achieving 80% coverage.

## 4. Frontend: Environment & Services

- [x] 4.1 Update Angular `environment.ts` (if needed) and add `WeatherService` using `HttpClient` to call the new backend endpoint. Verify by writing Jasmine tests (`ng test`) mocking the `HttpTestingController` to ensure the correct URL is called.

## 5. Frontend: UI Components

- [x] 5.1 Create `CountrySelectorComponent` (Standalone, strict forms) to select a country. Verify by running `ng test` to ensure form validation and value emission works correctly.
- [x] 5.2 Create `CityWeatherListComponent` using `Signals` to display the list of reference cities and their weather data. Verify by writing tests checking if the Signal updates reflect in the DOM correctly.
- [x] 5.3 Integrate both components in a main view o modal (with `backdrop-blur`). Verify visually using `ng serve` and verifying the "hoja rayada de cuaderno" theme is applied correctly, and write unit tests for component interaction.
